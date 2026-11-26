'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { analyze, priorities, type Check, type FetchResult, type Report, type Status } from '../tools/analyze';
import { cleanDomain, countries, countryOf, type BacklinksResponse, type DomainResponse } from './shared';
import { compact, downloadCsv, Empty, ErrorNote, fmt, Icon, IntentPill, LiveOnly, money, Score, Spinner, store } from './ui';
import type { Saved } from './keyword-view';

// Domain Overview, Backlinks, Site Audit and Saved Keywords views.

function useDomainLookup<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function run(target: string, loc?: number) {
    const host = cleanDomain(target);
    if (!host) { setError('Enter a domain such as example.com.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`/api/seo-suite/${endpoint}?target=${encodeURIComponent(host)}${loc ? `&loc=${loc}` : ''}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setData(json);
    } catch (e) { setData(null); setError(e instanceof Error ? e.message : 'Something went wrong.'); }
    finally { setLoading(false); }
  }
  return { data, loading, error, run };
}

function DomainForm({ onSubmit, loading, withCountry, label }: { onSubmit: (d: string, loc: number) => void; loading: boolean; withCountry?: boolean; label: string }) {
  const [d, setD] = useState('');
  const [loc, setLoc] = useState(countries[0].code);
  return <form className="ss-card ss-searchbar" onSubmit={(e: FormEvent) => { e.preventDefault(); onSubmit(d, loc); }}>
    <label className="ss-field ss-field-grow">
      <span className="sr-only">{label}</span>
      <Icon name="globe" />
      <input value={d} onChange={e => setD(e.target.value)} placeholder="example.com" autoComplete="off" inputMode="url" />
    </label>
    {withCountry && <label className="ss-field ss-select"><span className="sr-only">Country</span>
      <select value={loc} onChange={e => setLoc(Number(e.target.value))}>{countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}</select>
    </label>}
    <button className="ss-btn ss-btn-primary" type="submit" disabled={loading}>{loading ? 'Analyzing…' : 'Analyze'}</button>
  </form>;
}

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return <div className="ss-card ss-kpi"><span>{label}</span><b>{value}</b>{hint && <small>{hint}</small>}</div>;
}

// ---------- Domain Overview ----------
export function DomainView({ live, goAudit }: { live: boolean | null; goAudit: () => void }) {
  const { data, loading, error, run } = useDomainLookup<DomainResponse>('domain');
  if (live === false) return <LiveOnly what="Domain Overview">
    <p>Meanwhile, run a free crawl-level check of any page:</p>
    <button type="button" className="ss-btn ss-btn-primary" onClick={goAudit}>Open the Site Audit</button>
  </LiveOnly>;
  const o = data?.overview;
  const dist = o ? [
    { label: '#1', n: o.pos1 }, { label: '2–3', n: o.pos2to3 }, { label: '4–10', n: o.pos4to10 }, { label: '11–20', n: o.pos11to20 },
  ] : [];
  const top = Math.max(1, ...dist.map(d => d.n));
  return <>
    <DomainForm label="Domain to analyze" withCountry loading={loading} onSubmit={run} />
    {error && <ErrorNote message={error} />}
    {loading && <Spinner label="Pulling organic data…" />}
    {!data && !loading && !error && <Empty icon="globe" title="See how any domain performs in Google">
      <p>Enter your site or a competitor’s to see organic keywords, estimated traffic, ranking positions and the keywords that bring the most visits.</p>
    </Empty>}
    {data && <>
      <div className="ss-kpis">
        <Kpi label="Organic keywords" value={fmt(o?.keywords)} />
        <Kpi label="Est. monthly traffic" value={compact(o?.traffic)} hint="Estimated visits from Google" />
        <Kpi label="Top 3 positions" value={fmt(o ? o.pos1 + o.pos2to3 : null)} />
        <Kpi label="Page 1 positions" value={fmt(o ? o.pos1 + o.pos2to3 + o.pos4to10 : null)} />
      </div>
      <div className="ss-results">
        <div className="ss-main-col">
          <div className="ss-card ss-table-card">
            <div className="ss-table-bar">
              <b>Top keywords</b><span className="ss-muted">{data.target}</span><span className="ss-grow" />
              <button type="button" className="ss-link-btn" onClick={() => downloadCsv(`${data.target}-keywords.csv`, ['Keyword', 'Position', 'Volume', 'Est. traffic', 'URL'], data.keywords.map(k => [k.keyword, k.position, k.volume, k.traffic, k.url]))}><Icon name="download" size={16} /> Export</button>
            </div>
            <div className="ss-table-wrap"><table className="ss-table">
              <thead><tr><th className="ss-left">Keyword</th><th>Pos.</th><th>Volume</th><th>Traffic</th><th className="ss-left">URL</th></tr></thead>
              <tbody>
                {data.keywords.map(k => <tr key={k.keyword + k.url}>
                  <td className="ss-left ss-kw ss-cap">{k.keyword}</td><td>{k.position ?? '–'}</td><td>{fmt(k.volume)}</td><td>{fmt(k.traffic)}</td>
                  <td className="ss-left ss-url">{k.url ? <a href={k.url} target="_blank" rel="noopener noreferrer nofollow">{k.url.replace(/^https?:\/\/(www\.)?/, '')}</a> : '–'}</td>
                </tr>)}
                {!data.keywords.length && <tr><td colSpan={5} className="ss-none">No ranking keywords found for this domain in this country.</td></tr>}
              </tbody>
            </table></div>
          </div>
        </div>
        <aside className="ss-side-col">
          <section className="ss-card ss-panel">
            <h3 className="ss-panel-title">Ranking positions</h3>
            <ul className="ss-bars ss-bars-static">{dist.map(d => <li key={d.label}><div>
              <span className="ss-bar-label">{d.label}</span><span className="ss-bar"><i style={{ width: `${(d.n / top) * 100}%` }} /></span><b>{fmt(d.n)}</b>
            </div></li>)}</ul>
          </section>
        </aside>
      </div>
    </>}
  </>;
}

// ---------- Backlinks ----------
export function BacklinksView({ live, goAudit }: { live: boolean | null; goAudit: () => void }) {
  const { data, loading, error, run } = useDomainLookup<BacklinksResponse>('backlinks');
  if (live === false) return <LiveOnly what="Backlinks">
    <p>Need a link-building plan now? Our team can review your profile.</p>
    <a className="ss-btn ss-btn-primary" href="/backlinks-digital-pr-services">See link-building services</a>
    <button type="button" className="ss-btn ss-btn-ghost" onClick={goAudit}>Open the Site Audit</button>
  </LiveOnly>;
  const s = data?.summary;
  return <>
    <DomainForm label="Domain to check" loading={loading} onSubmit={d => run(d)} />
    {error && <ErrorNote message={error} />}
    {loading && <Spinner label="Counting links…" />}
    {!data && !loading && !error && <Empty icon="link" title="Check any domain’s backlink profile">
      <p>See domain rank, total backlinks, referring domains and the strongest sites linking in.</p>
    </Empty>}
    {data && <>
      <div className="ss-kpis">
        <Kpi label="Domain rank" value={s?.rank == null ? '–' : String(s.rank)} hint="0–100 scale" />
        <Kpi label="Backlinks" value={compact(s?.backlinks)} />
        <Kpi label="Referring domains" value={compact(s?.referringDomains)} />
        <Kpi label="Referring IPs" value={compact(s?.referringIps)} />
        <Kpi label="Broken backlinks" value={compact(s?.broken)} />
      </div>
      <div className="ss-card ss-table-card">
        <div className="ss-table-bar">
          <b>Top referring domains</b><span className="ss-muted">{data.target}</span><span className="ss-grow" />
          <button type="button" className="ss-link-btn" onClick={() => downloadCsv(`${data.target}-referring-domains.csv`, ['Domain', 'Rank', 'Backlinks', 'First seen'], data.domains.map(d => [d.domain, d.rank, d.backlinks, d.firstSeen]))}><Icon name="download" size={16} /> Export</button>
        </div>
        <div className="ss-table-wrap"><table className="ss-table">
          <thead><tr><th className="ss-left">Referring domain</th><th>Rank</th><th>Backlinks</th><th>First seen</th></tr></thead>
          <tbody>
            {data.domains.map(d => <tr key={d.domain}>
              <td className="ss-left ss-kw">{d.domain}</td><td><Score value={d.rank} /></td><td>{fmt(d.backlinks)}</td><td>{d.firstSeen ? d.firstSeen.slice(0, 10) : '–'}</td>
            </tr>)}
            {!data.domains.length && <tr><td colSpan={4} className="ss-none">No referring domains found.</td></tr>}
          </tbody>
        </table></div>
      </div>
    </>}
  </>;
}

// ---------- Site Audit (free: uses /api/fetch-page and the shared checks) ----------
const statusIcon: Record<Status, string> = { pass: '✓', warn: '!', fail: '✕', info: 'i' };
const statusLabel: Record<Status, string> = { pass: 'Passed', warn: 'Warning', fail: 'Failed', info: 'Info' };

function Ring({ score }: { score: number }) {
  const size = 120, r = 50, c = 2 * Math.PI * r;
  const tone = score >= 80 ? 'good' : score >= 50 ? 'mid' : 'bad';
  return <figure className={`ss-ring ss-ring-${tone}`}>
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r={r} className="ss-ring-track" />
      <circle cx="60" cy="60" r={r} className="ss-ring-value" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} transform="rotate(-90 60 60)" />
    </svg>
    <span>{score}</span>
    <figcaption>SEO score</figcaption>
  </figure>;
}

export function AuditView({ initialUrl, nonce }: { initialUrl: string; nonce: number }) {
  const [url, setUrl] = useState(initialUrl);
  const [kw, setKw] = useState('');
  const [report, setReport] = useState<(Report & { finalUrl: string }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setUrl(initialUrl); if (initialUrl) void run(initialUrl, ''); }, [nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  async function run(target: string, keyword: string) {
    let t = target.trim();
    if (!t) { setError('Enter a page URL to audit.'); return; }
    if (!/^https?:\/\//i.test(t)) t = `https://${t}`;
    setLoading(true); setError('');
    try {
      const res = await fetch(`/api/fetch-page?url=${encodeURIComponent(t)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      const r = json as FetchResult;
      setReport({ ...analyze(r, keyword.trim()), finalUrl: r.finalUrl });
    } catch (e) { setReport(null); setError(e instanceof Error ? e.message : 'Something went wrong.'); }
    finally { setLoading(false); }
  }

  const groups = useMemo(() => {
    const m = new Map<string, Check[]>();
    for (const c of report?.checks ?? []) m.set(c.group, [...(m.get(c.group) ?? []), c]);
    return [...m.entries()];
  }, [report]);
  const fixes = report ? priorities(report.checks).slice(0, 6) : [];

  return <>
    <form className="ss-card ss-searchbar" onSubmit={e => { e.preventDefault(); void run(url, kw); }}>
      <label className="ss-field ss-field-grow"><span className="sr-only">Page URL</span><Icon name="audit" />
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" inputMode="url" autoComplete="off" />
      </label>
      <label className="ss-field ss-field-kw"><span className="sr-only">Target keyword (optional)</span><Icon name="search" />
        <input value={kw} onChange={e => setKw(e.target.value)} placeholder="Target keyword (optional)" autoComplete="off" />
      </label>
      <button className="ss-btn ss-btn-primary" type="submit" disabled={loading}>{loading ? 'Auditing…' : 'Audit page'}</button>
    </form>
    {error && <ErrorNote message={error} />}
    {loading && <Spinner label="Fetching and checking the page…" />}
    {!report && !loading && !error && <Empty icon="audit" title="Audit any page in seconds">
      <p>Checks status codes, redirects, robots.txt (including AI crawlers), indexing, titles, headings, links, images, schema and more, then ranks what to fix first.</p>
    </Empty>}
    {report && <div className="ss-results">
      <div className="ss-main-col">
        <div className="ss-card ss-audit-head">
          <Ring score={report.score} />
          <div>
            <h3>{report.data.title || 'Untitled page'}</h3>
            <a className="ss-muted" href={report.finalUrl} target="_blank" rel="noopener noreferrer nofollow">{report.finalUrl}</a>
            <p className="ss-counts">
              {(['fail', 'warn', 'pass'] as Status[]).map(s => <span key={s} className={`ss-count ss-count-${s}`}>{report.counts[s]} {statusLabel[s].toLowerCase()}</span>)}
            </p>
          </div>
        </div>
        {groups.map(([group, items]) => <details key={group} className="ss-card ss-check-group" open={items.some(c => c.status === 'fail')}>
          <summary><b>{group}</b><span className="ss-muted">{items.filter(c => c.status === 'pass').length}/{items.length} passed</span></summary>
          <ul>{items.map(c => <li key={c.id} className={`ss-check-item is-${c.status}`}>
            <span className="ss-check-icon" title={statusLabel[c.status]} aria-label={statusLabel[c.status]}>{statusIcon[c.status]}</span>
            <div><b>{c.title}</b><p>{c.detail}</p>{c.fix && <p className="ss-fix">Fix: {c.fix}</p>}</div>
          </li>)}</ul>
        </details>)}
      </div>
      <aside className="ss-side-col">
        <section className="ss-card ss-panel">
          <h3 className="ss-panel-title">Fix these first</h3>
          {fixes.length ? <ol className="ss-fixes">{fixes.map(c => <li key={c.id} className={`is-${c.status}`}><b>{c.title}</b><span>{c.fix ?? c.detail}</span></li>)}</ol>
            : <p className="ss-muted">No failing or warning checks. Nice work.</p>}
        </section>
        <section className="ss-card ss-panel ss-cta-panel">
          <h3>Want the full-site version?</h3>
          <p>This checks one page. Our team audits every URL, benchmarks competitors and hands you a prioritized plan.</p>
          <a className="ss-btn ss-btn-primary ss-btn-block" href="/#contact">Get a free expert audit</a>
        </section>
      </aside>
    </div>}
  </>;
}

// ---------- Saved Keywords ----------
export function SavedView({ saved, setSaved, research }: { saved: Saved[]; setSaved: (s: Saved[]) => void; research: (q: string, loc: number) => void }) {
  function remove(s: Saved) { const next = saved.filter(x => x !== s); store.set('ss-saved', next); setSaved(next); }
  if (!saved.length) return <Empty icon="bookmark" title="No saved keywords yet">
    <p>Tick keywords in Keyword Research and choose Save. They stay in this browser so you can build a list across several searches.</p>
  </Empty>;
  return <div className="ss-card ss-table-card">
    <div className="ss-table-bar">
      <b>{saved.length} saved keyword{saved.length === 1 ? '' : 's'}</b><span className="ss-muted">Stored in this browser only</span><span className="ss-grow" />
      <button type="button" className="ss-link-btn" onClick={() => downloadCsv('saved-keywords.csv', ['Keyword', 'Country', 'Volume', 'CPC (USD)', 'Difficulty', 'Intent', 'Saved'], saved.map(s => [s.keyword, countryOf(s.loc).name, s.volume, s.cpc, s.difficulty, s.intent, s.savedAt.slice(0, 10)]))}><Icon name="download" size={16} /> Export</button>
      <button type="button" className="ss-link-btn" onClick={() => { if (confirmClear()) { store.set('ss-saved', []); setSaved([]); } }}><Icon name="trash" size={16} /> Clear all</button>
    </div>
    <div className="ss-table-wrap"><table className="ss-table">
      <thead><tr><th className="ss-left">Keyword</th><th>Country</th><th>Volume</th><th>CPC</th><th>Score</th><th>Intent</th><th><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>{saved.map(s => <tr key={`${s.keyword}-${s.loc}`}>
        <td className="ss-left ss-kw"><button type="button" className="ss-cap" onClick={() => research(s.keyword, s.loc)}>{s.keyword}</button></td>
        <td>{countryOf(s.loc).gl.toUpperCase()}</td><td>{fmt(s.volume)}</td><td>{s.cpc == null ? '–' : money(s.cpc)}</td><td><Score value={s.difficulty} /></td><td><IntentPill intent={s.intent} /></td>
        <td><button type="button" className="ss-icon-btn" aria-label={`Remove ${s.keyword}`} onClick={() => remove(s)}><Icon name="x" size={15} /></button></td>
      </tr>)}</tbody>
    </table></div>
  </div>;
}

// Clearing is a destructive action on the visitor's own list; ask once.
function confirmClear() {
  try { return window.confirm('Remove all saved keywords from this browser?'); } catch { return true; }
}

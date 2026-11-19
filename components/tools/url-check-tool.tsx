'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { analyze, priorities, scoreOf, type Check, type FetchResult, type Report, type Status } from './analyze';

// One component for the three URL-based tools:
//  - 'onpage'    On-Page SEO Checker   (search preview, heading outline, on-page checks)
//  - 'technical' Technical SEO Checker (redirect chain, robots.txt, headers, technical checks)
//  - 'audit'     SEO Audit Tool        (scores, prioritized fixes, every check)
// A ?url=…&keyword=… query string pre-fills the form and runs the check, so tools can link to each other.

type Mode = 'onpage' | 'technical' | 'audit';

const icon: Record<Status, string> = { pass: '✓', warn: '!', fail: '✕', info: 'i' };
const label: Record<Status, string> = { pass: 'Passed', warn: 'Warning', fail: 'Failed', info: 'Info' };

function Ring({ score, size = 112, caption }: { score: number; size?: number; caption?: string }) {
  const r = size / 2 - 9, c = 2 * Math.PI * r;
  const tone = score >= 80 ? 'good' : score >= 50 ? 'mid' : 'bad';
  return <figure className={`ring ring-${tone}`} style={{ width: size }}>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} className="ring-track" />
      <circle cx={size / 2} cy={size / 2} r={r} className="ring-value" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>
    <span className="ring-num">{score}</span>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function CheckList({ checks }: { checks: Check[] }) {
  const groups = useMemo(() => {
    const m = new Map<string, Check[]>();
    for (const c of checks) m.set(c.group, [...(m.get(c.group) ?? []), c]);
    return [...m.entries()];
  }, [checks]);
  return <div className="check-groups">
    {groups.map(([group, items]) => <section key={group} className="check-group" aria-label={group}>
      <h3>{group}</h3>
      <ul>{items.map(c => <li key={c.id} className={`check check-${c.status}`}>
        <span className="check-icon" aria-label={label[c.status]} title={label[c.status]}>{icon[c.status]}</span>
        <div>
          <b>{c.title}</b>
          <p>{c.detail}</p>
          {c.fix && <p className="check-fix"><strong>Fix:</strong> {c.fix}</p>}
        </div>
      </li>)}</ul>
    </section>)}
  </div>;
}

function reportText(url: string, rep: Report, checks: Check[]) {
  const lines = [`SEO report for ${url}`, `Score: ${scoreOf(checks)}/100`, ''];
  for (const c of priorities(checks)) lines.push(`[${label[c.status].toUpperCase()}] ${c.title}${c.fix ? ` — Fix: ${c.fix}` : ''}`);
  lines.push('', `Checked ${new Date().toLocaleString()} with the free SEO tools at https://searchenginexperts.com/seo-tools`);
  return lines.join('\n');
}

export function UrlCheckTool({ mode }: { mode: Mode }) {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<FetchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<'all' | 'issues'>('all');

  const run = async (target: string, kw: string) => {
    setError(''); setResult(null); setCopied(false);
    if (!target.trim()) { setError('Enter a page URL, for example https://example.com/services'); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/fetch-page?url=${encodeURIComponent(target.trim())}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setResult(json);
      const q = new URLSearchParams({ url: target.trim(), ...(kw.trim() ? { keyword: kw.trim() } : {}) });
      window.history.replaceState(null, '', `?${q}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const u = q.get('url'), k = q.get('keyword') ?? '';
    if (u) { setUrl(u); setKeyword(k); run(u, k); }
  }, []);

  const report = useMemo(() => (result ? analyze(result, mode === 'technical' ? '' : keyword) : null), [result, keyword, mode]);
  const scoped = useMemo(() => !report ? [] : mode === 'audit' ? report.checks : report.checks.filter(c => c.scope === mode), [report, mode]);
  const shown = filter === 'issues' ? scoped.filter(c => c.status === 'fail' || c.status === 'warn') : scoped;

  const submit = (e: FormEvent) => { e.preventDefault(); run(url, keyword); };
  const copy = async () => {
    if (!result || !report) return;
    try { await navigator.clipboard.writeText(reportText(result.finalUrl, report, scoped)); setCopied(true); } catch { setCopied(false); }
  };
  const qs = result ? `?${new URLSearchParams({ url: result.requestedUrl, ...(keyword ? { keyword } : {}) })}` : '';
  const auditMail = result ? `mailto:arslantariq082@gmail.com?subject=${encodeURIComponent(`Full SEO audit request: ${new URL(result.finalUrl).hostname}`)}&body=${encodeURIComponent(`Hi Arslan,\n\nI ran the free SEO tool on ${result.finalUrl} (score ${report ? scoreOf(scoped) : '–'}/100) and would like a full expert audit.\n\nName:\nBusiness:\nMain goal (leads, sales, local visibility…):\n`)}` : '';

  return <div className="tool">
    <form className="tool-form" onSubmit={submit} noValidate>
      <div className="tool-fields">
        <label className="tool-field tool-field-url">
          <span>Page URL</span>
          <input type="url" inputMode="url" autoComplete="url" placeholder="https://example.com/page" value={url} onChange={e => setUrl(e.target.value)} required />
        </label>
        {mode !== 'technical' && <label className="tool-field">
          <span>Target keyword <em>(optional)</em></span>
          <input type="text" placeholder="e.g. emergency plumber" value={keyword} onChange={e => setKeyword(e.target.value)} />
        </label>}
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Checking…' : mode === 'audit' ? 'Run free audit' : 'Check page'}</button>
      </div>
      <p className="tool-note">We fetch the page once from our server, as a crawler would, without running JavaScript. Nothing is stored.</p>
    </form>

    <div aria-live="polite">
      {loading && <div className="tool-loading"><span className="spinner" aria-hidden="true" />Fetching the page, robots.txt and sitemap…</div>}
      {error && <p className="tool-error" role="alert">{error}</p>}
    </div>

    {result && report && <div className="tool-result">
      <div className="result-head">
        <div className="result-scores">
          {mode === 'audit'
            ? <><Ring score={scoreOf(report.checks)} size={132} caption="Overall" /><Ring score={scoreOf(report.checks.filter(c => c.scope === 'technical'))} size={92} caption="Technical" /><Ring score={scoreOf(report.checks.filter(c => c.scope === 'onpage'))} size={92} caption="On-page" /></>
            : <Ring score={scoreOf(scoped)} caption={mode === 'onpage' ? 'On-page score' : 'Technical score'} />}
        </div>
        <div className="result-meta">
          <p className="result-url"><a href={result.finalUrl} target="_blank" rel="noopener noreferrer nofollow">{result.finalUrl}</a></p>
          <p className="result-facts"><span>HTTP {result.status}</span><span>{result.timeMs} ms</span><span>{Math.round(result.bytes / 1024)} KB</span><span>{result.redirects.length} redirect{result.redirects.length === 1 ? '' : 's'}</span></p>
          <p className="result-counts">
            <span className="c-fail">{scoped.filter(c => c.status === 'fail').length} failed</span>
            <span className="c-warn">{scoped.filter(c => c.status === 'warn').length} warnings</span>
            <span className="c-pass">{scoped.filter(c => c.status === 'pass').length} passed</span>
          </p>
          <div className="result-actions">
            <button type="button" className="btn btn-ghost" onClick={copy}>{copied ? 'Copied ✓' : 'Copy report'}</button>
            <button type="button" className="btn btn-ghost" onClick={() => window.print()}>Save as PDF</button>
          </div>
        </div>
      </div>

      {mode === 'onpage' && <div className="result-panels">
        <section className="panel">
          <h3>Search result preview</h3>
          <div className="serp">
            <span className="serp-url">{new URL(result.finalUrl).hostname}{new URL(result.finalUrl).pathname !== '/' ? ` › ${new URL(result.finalUrl).pathname.split('/').filter(Boolean).join(' › ')}` : ''}</span>
            <span className="serp-title">{report.data.title ? (report.data.title.length > 62 ? `${report.data.title.slice(0, 60)}…` : report.data.title) : 'No title tag'}</span>
            <span className="serp-desc">{report.data.description ? (report.data.description.length > 158 ? `${report.data.description.slice(0, 155)}…` : report.data.description) : 'No meta description — Google will pick text from the page.'}</span>
          </div>
          <p className="panel-note">An approximation. Google may rewrite titles and descriptions to match the search.</p>
        </section>
        <section className="panel">
          <h3>Heading outline</h3>
          {report.data.headings.length
            ? <ol className="outline">{report.data.headings.slice(0, 40).map((h, i) => <li key={i} style={{ paddingLeft: (h.level - 1) * 14 }}><span>H{h.level}</span>{h.text || <em>(empty)</em>}</li>)}</ol>
            : <p className="panel-note">No headings found in the HTML.</p>}
        </section>
      </div>}

      {mode === 'technical' && <div className="result-panels">
        <section className="panel">
          <h3>Redirect chain</h3>
          <ol className="chain">
            {result.redirects.map(r => <li key={r.url}><span className="code">{r.status}</span>{r.url}</li>)}
            <li><span className="code ok">{result.status}</span>{result.finalUrl}</li>
          </ol>
        </section>
        <section className="panel">
          <h3>Response headers</h3>
          <dl className="headers">{Object.entries(result.headers).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </section>
        {result.robots.body && <section className="panel panel-wide">
          <h3>robots.txt <a href={result.robots.url} target="_blank" rel="noopener noreferrer nofollow">open ↗</a></h3>
          <pre className="robots">{result.robots.body.slice(0, 3000)}{result.robots.body.length > 3000 ? '\n…' : ''}</pre>
        </section>}
      </div>}

      {mode === 'audit' && priorities(scoped).length > 0 && <section className="panel priorities">
        <h3>Fix these first</h3>
        <ol>{priorities(scoped).slice(0, 6).map(c => <li key={c.id} className={`check-${c.status}`}><b>{c.title}</b>{c.fix && <span>{c.fix}</span>}</li>)}</ol>
      </section>}

      <div className="result-filter" role="group" aria-label="Show">
        <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All checks ({scoped.length})</button>
        <button type="button" aria-pressed={filter === 'issues'} onClick={() => setFilter('issues')}>Issues only ({scoped.filter(c => c.status === 'fail' || c.status === 'warn').length})</button>
      </div>
      <CheckList checks={shown} />

      <div className="tool-next">
        {mode !== 'audit' && <a href={`/seo-tools/seo-audit-tool${qs}`}>Run the full SEO audit on this page →</a>}
        {mode !== 'onpage' && <a href={`/seo-tools/on-page-seo-checker${qs}`}>Check on-page SEO →</a>}
        {mode !== 'technical' && <a href={`/seo-tools/technical-seo-checker${qs}`}>Check technical SEO →</a>}
      </div>

      <div className="post-cta tool-cta">
        <div>
          <p className="eyebrow">Free expert audit</p>
          <h2>Want the whole site reviewed by a specialist?</h2>
          <p>Get a full crawl, competitor and keyword gap analysis, and a prioritized plan — free, with no commitment.</p>
        </div>
        <a href={auditMail} className="btn">Request my expert audit <span aria-hidden="true">→</span></a>
      </div>
    </div>}
  </div>;
}

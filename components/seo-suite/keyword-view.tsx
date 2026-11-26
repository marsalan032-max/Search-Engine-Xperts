'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { countries, countryOf, type Intent, type KeywordResponse, type KeywordRow, type SerpResponse } from './shared';
import { dec, downloadCsv, Empty, ErrorNote, fmt, Icon, IntentPill, money, Score, Spinner, store, TrendChart } from './ui';

// Keyword Research view: search bar, recent searches, seed summary, ideas table, trend and SERP panels.

type Sort = 'volume' | 'cpc' | 'competition' | 'difficulty' | 'keyword';
type Recent = { q: string; loc: number };
export type Saved = { keyword: string; volume: number | null; cpc: number | null; difficulty: number | null; intent: Intent; loc: number; savedAt: string };

const intents: Intent[] = ['Informational', 'Commercial', 'Transactional', 'Navigational', 'Local'];
const googleUrl = (q: string, gl: string) => `https://www.google.com/search?q=${encodeURIComponent(q)}&gl=${gl}`;
const trendsUrl = (q: string, gl: string) => `https://trends.google.com/trends/explore?date=today%2012-m&geo=${gl.toUpperCase()}&q=${encodeURIComponent(q)}`;

export function KeywordView({ live, initial, onSaved, onAudit }: {
  live: boolean | null;
  initial: { q: string; loc: number };
  onSaved: (rows: Saved[]) => void;
  onAudit: (url: string) => void;
}) {
  const [q, setQ] = useState(initial.q);
  const [loc, setLoc] = useState(initial.loc);
  const [data, setData] = useState<(KeywordResponse & { loc: number }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recent, setRecent] = useState<Recent[]>([]);
  const [serp, setSerp] = useState<SerpResponse | null>(null);
  const [serpState, setSerpState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [serpError, setSerpError] = useState('');
  const [sort, setSort] = useState<Sort>('volume');
  const [desc, setDesc] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [include, setInclude] = useState('');
  const [exclude, setExclude] = useState('');
  const [intent, setIntent] = useState<Intent | ''>('');
  const [minVol, setMinVol] = useState('');
  const [maxKd, setMaxKd] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');

  useEffect(() => { setRecent(store.get<Recent[]>('ss-recent', [])); }, []);
  useEffect(() => { if (initial.q) void run(initial.q, initial.loc); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2600); return () => clearTimeout(t); }, [toast]);

  async function run(keyword: string, location: number) {
    const k = keyword.trim().toLowerCase();
    if (!k) { setError('Enter a keyword to research.'); return; }
    setLoading(true); setError(''); setSelected(new Set()); setSerp(null); setSerpState('idle');
    const params = new URLSearchParams({ view: 'keywords', q: k, loc: String(location) });
    history.replaceState(null, '', `?${params}`);
    try {
      const res = await fetch(`/api/seo-suite/keywords?q=${encodeURIComponent(k)}&loc=${location}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setData({ ...(json as KeywordResponse), loc: location });
      const next = [{ q: k, loc: location }, ...store.get<Recent[]>('ss-recent', []).filter(r => !(r.q === k && r.loc === location))].slice(0, 8);
      store.set('ss-recent', next); setRecent(next);
      if (json.mode === 'live') void loadSerp(k, location);
    } catch (e) {
      setData(null); setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally { setLoading(false); }
  }

  async function loadSerp(k: string, location: number) {
    setSerpState('loading');
    try {
      const res = await fetch(`/api/seo-suite/serp?q=${encodeURIComponent(k)}&loc=${location}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Couldn’t load the search results.');
      setSerp(json); setSerpState('idle');
    } catch (e) { setSerpError(e instanceof Error ? e.message : 'Couldn’t load the search results.'); setSerpState('error'); }
  }

  const submit = (e: FormEvent) => { e.preventDefault(); void run(q, loc); };
  const removeRecent = (r: Recent) => { const next = recent.filter(x => x !== r); setRecent(next); store.set('ss-recent', next); };

  const rows = useMemo(() => {
    if (!data) return [];
    const inc = include.trim().toLowerCase(), exc = exclude.trim().toLowerCase();
    const mv = Number(minVol) || 0, mk = maxKd === '' ? 101 : Number(maxKd);
    const list = data.rows.filter(r =>
      (!inc || inc.split(',').every(w => r.keyword.includes(w.trim()))) &&
      (!exc || !exc.split(',').some(w => w.trim() && r.keyword.includes(w.trim()))) &&
      (!intent || r.intent === intent) &&
      (data.mode === 'basic' || ((r.volume ?? 0) >= mv && (r.difficulty ?? 0) <= mk)));
    const dir = desc ? -1 : 1;
    return [...list].sort((a, b) => {
      if (sort === 'keyword' || data.mode === 'basic') return a.keyword.localeCompare(b.keyword) * (sort === 'keyword' ? -dir : 1);
      return ((a[sort] ?? -1) - (b[sort] ?? -1)) * dir;
    });
  }, [data, include, exclude, intent, minVol, maxKd, sort, desc]);

  const intentMix = useMemo(() => {
    const m = new Map<Intent, number>();
    for (const r of data?.rows ?? []) m.set(r.intent, (m.get(r.intent) ?? 0) + 1);
    return intents.map(i => ({ intent: i, count: m.get(i) ?? 0 })).filter(i => i.count);
  }, [data]);

  const country = countryOf(data?.loc ?? loc);
  const filtersOn = Boolean(include || exclude || intent || minVol || maxKd);

  function sortBy(s: Sort) { if (sort === s) setDesc(!desc); else { setSort(s); setDesc(s !== 'keyword'); } }
  function th(s: Sort, label: string, cls = '') {
    const active = sort === s;
    return <th className={cls} aria-sort={active ? (desc ? 'descending' : 'ascending') : 'none'}>
      <button type="button" onClick={() => sortBy(s)}>{label}{active && <span aria-hidden="true">{desc ? ' ↓' : ' ↑'}</span>}</button>
    </th>;
  }

  function toggle(k: string) { const s = new Set(selected); if (s.has(k)) s.delete(k); else s.add(k); setSelected(s); }
  function toggleAll() { setSelected(selected.size === rows.length ? new Set() : new Set(rows.map(r => r.keyword))); }

  function save(list: KeywordRow[]) {
    const now = new Date().toISOString();
    const current = store.get<Saved[]>('ss-saved', []);
    const add = list.filter(r => !current.some(c => c.keyword === r.keyword && c.loc === (data?.loc ?? loc)))
      .map(r => ({ keyword: r.keyword, volume: r.volume, cpc: r.cpc, difficulty: r.difficulty, intent: r.intent, loc: data?.loc ?? loc, savedAt: now }));
    const next = [...add, ...current];
    store.set('ss-saved', next); onSaved(next);
    setToast(add.length ? `Saved ${add.length} keyword${add.length === 1 ? '' : 's'}` : 'Already in Saved Keywords');
    setSelected(new Set());
  }

  function exportCsv() {
    if (!data) return;
    const pick = selected.size ? rows.filter(r => selected.has(r.keyword)) : rows;
    downloadCsv(`keywords-${data.seed.keyword.replace(/\W+/g, '-')}.csv`, ['Keyword', 'Volume', 'CPC (USD)', 'Competition', 'Difficulty', 'Intent'],
      pick.map(r => [r.keyword, r.volume, r.cpc, r.competition, r.difficulty, r.intent]));
  }

  return <>
    <form className="ss-card ss-searchbar" onSubmit={submit} role="search">
      <label className="ss-field ss-field-grow">
        <span className="sr-only">Seed keyword</span>
        <Icon name="search" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Enter a keyword, e.g. seo services" maxLength={80} autoComplete="off" />
      </label>
      <label className="ss-field ss-select">
        <span className="sr-only">Country</span>
        <select value={loc} onChange={e => setLoc(Number(e.target.value))}>
          {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>
      </label>
      <button className="ss-btn ss-btn-primary" type="submit" disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
    </form>

    {recent.length > 0 && <div className="ss-recent">
      <p className="ss-recent-label"><Icon name="back" size={15} /> Recent searches</p>
      <div className="ss-card ss-chips">
        {recent.map(r => <span key={`${r.q}-${r.loc}`} className={`ss-chip${data && data.seed.keyword === r.q && data.loc === r.loc ? ' is-active' : ''}`}>
          <button type="button" onClick={() => { setQ(r.q); setLoc(r.loc); void run(r.q, r.loc); }} title={countryOf(r.loc).name}>{r.q}</button>
          <button type="button" className="ss-chip-x" aria-label={`Remove ${r.q} from recent searches`} onClick={() => removeRecent(r)}><Icon name="x" size={13} /></button>
        </span>)}
      </div>
    </div>}

    {error && <ErrorNote message={error} />}
    {loading && !data && <Spinner label="Finding keyword ideas…" />}

    {!data && !loading && !error && <Empty icon="search" title="Start with a seed keyword">
      <p>Type a product, service or topic. You’ll get keyword ideas {live ? 'with search volume, CPC, difficulty and intent, plus the 12-month trend and the current top 10 on Google' : 'from real Google searches, tagged by intent, ready to save or export'}.</p>
      <div className="ss-try">Try: {['local seo', 'seo audit', 'shopify seo'].map(s => <button key={s} type="button" onClick={() => { setQ(s); void run(s, loc); }}>{s}</button>)}</div>
    </Empty>}

    {data && <div className={`ss-results${loading ? ' is-loading' : ''}`}>
      <div className="ss-main-col">
        <div className="ss-card ss-seed">
          <h3 className="ss-cap">{data.seed.keyword}</h3>
          {data.mode === 'live' ? <>
            <Score value={data.seed.difficulty} />
            <span className="ss-sep" />
            <span className="ss-metric">Vol <b>{fmt(data.seed.volume)}</b></span>
            <span className="ss-metric">CPC <b>{money(data.seed.cpc)}</b></span>
            <span className="ss-metric">Comp <b>{dec(data.seed.competition)}</b></span>
          </> : <>
            <span className="ss-sep" />
            <span className="ss-metric">Ideas <b>{fmt(data.rows.length)}</b></span>
            <span className="ss-metric">{country.name}</span>
          </>}
          <IntentPill intent={data.seed.intent} />
        </div>

        <div className="ss-card ss-table-card">
          <div className="ss-table-bar">
            <button type="button" className={`ss-link-btn${filtersOn ? ' is-on' : ''}`} onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}><Icon name="filters" size={16} /> Filters{filtersOn ? ' •' : ''}</button>
            <span className="ss-muted">Showing {fmt(rows.length)} keyword{rows.length === 1 ? '' : 's'}</span>
            <span className="ss-grow" />
            {selected.size > 0 && <button type="button" className="ss-link-btn" onClick={() => save(rows.filter(r => selected.has(r.keyword)))}><Icon name="bookmark" size={16} /> Save {selected.size}</button>}
            <button type="button" className="ss-link-btn" onClick={exportCsv}><Icon name="download" size={16} /> Export</button>
          </div>

          {showFilters && <div className="ss-filters">
            <label>Include words<input value={include} onChange={e => setInclude(e.target.value)} placeholder="e.g. free, tool" /></label>
            <label>Exclude words<input value={exclude} onChange={e => setExclude(e.target.value)} placeholder="e.g. jobs, course" /></label>
            <label>Intent<select value={intent} onChange={e => setIntent(e.target.value as Intent | '')}><option value="">Any</option>{intents.map(i => <option key={i}>{i}</option>)}</select></label>
            {data.mode === 'live' && <>
              <label>Min volume<input inputMode="numeric" value={minVol} onChange={e => setMinVol(e.target.value.replace(/\D/g, ''))} placeholder="0" /></label>
              <label>Max difficulty<input inputMode="numeric" value={maxKd} onChange={e => setMaxKd(e.target.value.replace(/\D/g, ''))} placeholder="100" /></label>
            </>}
            {filtersOn && <button type="button" className="ss-link-btn" onClick={() => { setInclude(''); setExclude(''); setIntent(''); setMinVol(''); setMaxKd(''); }}>Clear</button>}
          </div>}

          <div className="ss-table-wrap">
            <table className="ss-table">
              <thead><tr>
                <th className="ss-check"><input type="checkbox" aria-label="Select all keywords" checked={rows.length > 0 && selected.size === rows.length} onChange={toggleAll} /></th>
                {th('keyword', 'Keyword', 'ss-left')}
                {data.mode === 'live' ? <>
                  {th('volume', 'Volume')}{th('cpc', 'CPC')}{th('competition', 'Comp.')}{th('difficulty', 'Score')}
                </> : <th>Check demand</th>}
                <th>Intent</th>
              </tr></thead>
              <tbody>
                {rows.slice(0, 300).map(r => <tr key={r.keyword} className={selected.has(r.keyword) ? 'is-selected' : ''}>
                  <td className="ss-check"><input type="checkbox" aria-label={`Select ${r.keyword}`} checked={selected.has(r.keyword)} onChange={() => toggle(r.keyword)} /></td>
                  <td className="ss-left ss-kw"><button type="button" className="ss-cap" onClick={() => { setQ(r.keyword); void run(r.keyword, data.loc); }} title="Research this keyword">{r.keyword}</button></td>
                  {data.mode === 'live' ? <>
                    <td>{fmt(r.volume)}</td><td>{r.cpc == null ? '–' : r.cpc.toFixed(2)}</td><td>{dec(r.competition)}</td><td><Score value={r.difficulty} /></td>
                  </> : <td className="ss-links">
                    <a href={trendsUrl(r.keyword, country.gl)} target="_blank" rel="noopener noreferrer">Trends</a>
                    <a href={googleUrl(r.keyword, country.gl)} target="_blank" rel="noopener noreferrer">Google</a>
                  </td>}
                  <td><IntentPill intent={r.intent} /></td>
                </tr>)}
                {!rows.length && <tr><td colSpan={7} className="ss-none">No keywords match these filters.</td></tr>}
              </tbody>
            </table>
          </div>
          {data.mode === 'basic' && <p className="ss-foot-note">Ideas come from Google Autocomplete, so every one is a phrase people really type. Intent is estimated from the wording; open Trends to compare demand.</p>}
        </div>
      </div>

      <aside className="ss-side-col">
        {data.mode === 'live' && data.trend.length > 1 ? <section className="ss-card ss-panel">
          <h3 className="ss-panel-title">Search Trends <span>{monthLabel(data.trend[0])} – {monthLabel(data.trend.at(-1)!)}</span></h3>
          <TrendChart points={data.trend} />
        </section> : <section className="ss-card ss-panel">
          <h3 className="ss-panel-title">Intent mix <span>{fmt(data.rows.length)} ideas</span></h3>
          <ul className="ss-bars">
            {intentMix.map(m => <li key={m.intent}>
              <button type="button" onClick={() => { setIntent(intent === m.intent ? '' : m.intent); setShowFilters(true); }} aria-pressed={intent === m.intent}>
                <span className="ss-bar-label"><IntentPill intent={m.intent} /> {m.intent}</span>
                <span className="ss-bar"><i style={{ width: `${(m.count / Math.max(1, data.rows.length)) * 100}%` }} /></span>
                <b>{m.count}</b>
              </button>
            </li>)}
          </ul>
          <a className="ss-btn ss-btn-ghost ss-btn-block" href={trendsUrl(data.seed.keyword, country.gl)} target="_blank" rel="noopener noreferrer"><Icon name="chart" size={16} /> 12-month trend on Google Trends</a>
        </section>}

        <section className="ss-card ss-panel ss-serp">
          <h3 className="ss-panel-title"><Icon name="globe" size={17} /> SERP Analysis <span>{data.seed.keyword}{serp?.rows.length ? ` · ${serp.rows.length} organic results` : ''}</span></h3>
          {data.mode === 'live' ? <>
            {serpState === 'loading' && <Spinner label="Loading the live top 10…" />}
            {serpState === 'error' && <ErrorNote message={serpError} />}
            {serp && <>
              <div className="ss-serp-actions">
                <button type="button" className="ss-link-btn" onClick={() => downloadCsv(`serp-${data.seed.keyword.replace(/\W+/g, '-')}.csv`, ['Position', 'Title', 'URL', 'Domain'], serp.rows.map(r => [r.rank, r.title, r.url, r.domain]))}><Icon name="download" size={15} /> Export</button>
                {serp.features.length > 0 && <span className="ss-muted">Also on page: {serp.features.slice(0, 4).map(f => f.replace(/_/g, ' ')).join(', ')}</span>}
              </div>
              <ol className="ss-serp-list">
                {serp.rows.map(r => <li key={`${r.rank}-${r.url}`}>
                  <span className="ss-rank">{r.rank}</span>
                  <div>
                    <a href={r.url} target="_blank" rel="noopener noreferrer nofollow">{r.title} <Icon name="ext" size={13} /></a>
                    <span className="ss-muted">{r.domain}</span>
                  </div>
                  <button type="button" className="ss-mini" onClick={() => onAudit(r.url)} title="Run the site audit on this page">Audit</button>
                </li>)}
              </ol>
            </>}
          </> : <div className="ss-serp-basic">
            <p>See who ranks for “{data.seed.keyword}” right now, then audit the top page to learn what you need to beat.</p>
            <a className="ss-btn ss-btn-ghost ss-btn-block" href={googleUrl(data.seed.keyword, country.gl)} target="_blank" rel="noopener noreferrer"><Icon name="ext" size={16} /> Open the live Google results</a>
            <button type="button" className="ss-btn ss-btn-ghost ss-btn-block" onClick={() => onAudit('')}><Icon name="audit" size={16} /> Audit a ranking page</button>
          </div>}
        </section>
      </aside>
    </div>}

    {toast && <div className="ss-toast" role="status">{toast}</div>}
  </>;
}

function monthLabel(p: { year: number; month: number }) {
  return `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][p.month - 1]} ${p.year}`;
}

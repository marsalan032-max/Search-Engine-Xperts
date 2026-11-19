'use client';

import { useMemo, useState, type FormEvent } from 'react';

// Keyword Research Tool. Runs entirely in the browser; nothing is sent anywhere.
// 1) Ideas: seed keyword × modifier lists, each tagged with a likely search intent.
// 2) Group: clusters a pasted keyword list by shared core words.
// No search volumes: those need paid data. Each idea links to Google Trends and a Google search instead.

type Intent = 'Informational' | 'Commercial' | 'Transactional' | 'Local';
type Idea = { keyword: string; type: string; intent: Intent };

const year = new Date().getFullYear();

// Templates: "{s}" is replaced by the seed keyword. Written so every idea reads like a real search.
const modifiers: { type: string; templates: string[] }[] = [
  { type: 'Questions', templates: ['what is {s}', 'how much does {s} cost', 'how long does {s} take', 'how to choose {s}', 'how to find {s}', 'is {s} worth it', 'do i need {s}', 'when do you need {s}', '{s} questions to ask'] },
  { type: 'Comparison', templates: ['best {s}', 'top {s}', '{s} vs', '{s} alternatives', '{s} comparison', '{s} reviews', '{s} pros and cons'] },
  { type: 'Commercial', templates: ['cheap {s}', 'affordable {s}', 'professional {s}', '{s} price', '{s} cost', '{s} services', '{s} company', '{s} quote', '{s} deals', '{s} for small business'] },
  { type: 'Local', templates: ['{s} near me', '{s} in my area', '{s} open now'] },
  { type: 'Research', templates: ['{s} guide', '{s} tips', '{s} examples', '{s} checklist', '{s} template', '{s} ideas', '{s} benefits', '{s} for beginners', '{s} step by step', `{s} in ${year}`] },
];

const intentRules: [Intent, RegExp][] = [
  ['Local', /\b(near me|in my area|open now|nearby|local)\b/],
  ['Informational', /^(what|how|why|when|which|who|is|are|can|do|does|should)\b/],
  ['Transactional', /\b(buy|price|prices|pricing|cost|costs|cheap|affordable|quote|hire|order|deal|deals|discount|coupon|services?|company|agency|book|for sale)\b/],
  ['Commercial', /\b(best|top|vs|versus|review|reviews|alternatives?|comparison|compare|pros and cons|professional)\b/],
  ['Informational', /.*/],
];
export const intentOf = (kw: string): Intent => intentRules.find(([, re]) => re.test(kw.toLowerCase()))![0];

function ideasFor(seed: string, place: string): Idea[] {
  const s = seed.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!s) return [];
  const out: Idea[] = [];
  for (const m of modifiers) for (const t of m.templates) {
    const keyword = t.replace('{s}', s);
    out.push({ keyword, type: m.type, intent: intentOf(keyword) });
  }
  const p = place.trim().toLowerCase();
  if (p) for (const k of [`${s} ${p}`, `${s} in ${p}`, `best ${s} in ${p}`, `${s} ${p} price`]) out.push({ keyword: k, type: 'Local', intent: 'Local' });
  return [...new Map(out.map(i => [i.keyword, i])).values()];
}

// ---------- grouping ----------
// 1) reduce each keyword to its words, minus filler words, simple plurals and a few synonyms;
// 2) drop words shared by most of the list (usually the seed, e.g. "roof repair"), since they don't separate topics;
// 3) group keywords whose remaining words contain a shorter keyword's remaining words.
const stop = new Set('a an the and or of for to in on at by with from is are be can do does did how what why when which who whom my your our i you it this that'.split(' '));
const synonyms: Record<string, string> = { price: 'cost', prices: 'cost', pricing: 'cost', costs: 'cost', fee: 'cost', fees: 'cost', rates: 'cost', rate: 'cost', reviews: 'review', affordable: 'cheap', inexpensive: 'cheap', firm: 'company', companies: 'company', agency: 'company', agencies: 'company', provider: 'company', contractor: 'company', contractors: 'company' };
const words = (kw: string) => [...new Set(kw.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w && !stop.has(w))
  .map(w => synonyms[w] ?? (w.length > 4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w)).map(w => synonyms[w] ?? w))];

export function groupKeywords(list: string[]) {
  const kws = [...new Set(list.map(k => k.trim().toLowerCase().replace(/\s+/g, ' ')).filter(Boolean))];
  const tokenised = kws.map(k => ({ k, w: words(k) }));
  const df = new Map<string, number>();
  for (const t of tokenised) for (const w of t.w) df.set(w, (df.get(w) ?? 0) + 1);
  const common = kws.length >= 5 ? new Set([...df].filter(([, n]) => n / kws.length > 0.6).map(([w]) => w)) : new Set<string>();
  const items = tokenised.map(t => ({ k: t.k, c: t.w.filter(w => !common.has(w)) }))
    .sort((a, b) => a.c.length - b.c.length || a.k.length - b.k.length);

  const clusters: { head: string; core: string[]; keywords: string[] }[] = [];
  for (const it of items) {
    let best: (typeof clusters)[number] | undefined, bestScore = 0;
    for (const cl of clusters) {
      if (!cl.core.length) { if (!it.c.length) { best = cl; break; } continue; }
      const shared = cl.core.filter(w => it.c.includes(w)).length;
      const contains = shared === cl.core.length;
      const score = shared / Math.max(cl.core.length, it.c.length);
      if ((contains || score >= 0.67) && score > bestScore) { best = cl; bestScore = score; }
    }
    if (best) best.keywords.push(it.k);
    else clusters.push({ head: it.k, core: it.c, keywords: [it.k] });
  }
  return clusters
    .map(c => ({ ...c, head: c.core.length ? c.head : `${[...common].join(' ') || c.head} (general)`, intents: [...new Set(c.keywords.map(intentOf))] }))
    .sort((a, b) => b.keywords.length - a.keywords.length);
}

const csv = (rows: string[][]) => rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
function download(name: string, text: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

const intents: Intent[] = ['Informational', 'Commercial', 'Transactional', 'Local'];

export function KeywordTool() {
  const [tab, setTab] = useState<'ideas' | 'group'>('ideas');
  const [seed, setSeed] = useState('');
  const [place, setPlace] = useState('');
  const [submitted, setSubmitted] = useState<{ seed: string; place: string } | null>(null);
  const [show, setShow] = useState<Intent | 'All'>('All');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [list, setList] = useState('');
  const [groups, setGroups] = useState<ReturnType<typeof groupKeywords> | null>(null);

  const ideas = useMemo(() => (submitted ? ideasFor(submitted.seed, submitted.place) : []), [submitted]);
  const visible = show === 'All' ? ideas : ideas.filter(i => i.intent === show);

  const onIdeas = (e: FormEvent) => { e.preventDefault(); setSubmitted({ seed, place }); setSelected(new Set()); setShow('All'); };
  const onGroup = (e: FormEvent) => { e.preventDefault(); setGroups(groupKeywords(list.split(/\n|,/))); };
  const toggle = (k: string) => setSelected(s => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const sendToGroup = () => { setList([...(selected.size ? selected : new Set(visible.map(i => i.keyword)))].join('\n')); setTab('group'); setGroups(null); };

  return <div className="tool">
    <div className="tool-tabs" role="tablist" aria-label="Keyword tool mode">
      <button role="tab" type="button" aria-selected={tab === 'ideas'} onClick={() => setTab('ideas')}>Find keyword ideas</button>
      <button role="tab" type="button" aria-selected={tab === 'group'} onClick={() => setTab('group')}>Group keywords</button>
    </div>

    {tab === 'ideas' && <div role="tabpanel">
      <form className="tool-form" onSubmit={onIdeas}>
        <div className="tool-fields">
          <label className="tool-field tool-field-url"><span>Seed keyword</span>
            <input type="text" placeholder="e.g. roof repair" value={seed} onChange={e => setSeed(e.target.value)} required maxLength={80} /></label>
          <label className="tool-field"><span>City or area <em>(optional)</em></span>
            <input type="text" placeholder="e.g. Lahore" value={place} onChange={e => setPlace(e.target.value)} maxLength={60} /></label>
          <button className="btn btn-primary" type="submit">Find ideas</button>
        </div>
        <p className="tool-note">Runs in your browser. No sign-up, nothing stored. Search volumes aren’t included; use the Trends link to compare interest.</p>
      </form>

      {submitted && ideas.length > 0 && <div className="tool-result">
        <div className="kw-bar">
          <div className="result-filter" role="group" aria-label="Filter by intent">
            {(['All', ...intents] as const).map(i => <button key={i} type="button" aria-pressed={show === i} onClick={() => setShow(i)}>
              {i} ({i === 'All' ? ideas.length : ideas.filter(x => x.intent === i).length})</button>)}
          </div>
          <div className="result-actions">
            <button type="button" className="btn btn-ghost" onClick={sendToGroup}>Group {selected.size ? `${selected.size} selected` : 'these'} →</button>
            <button type="button" className="btn btn-ghost" onClick={() => download(`keywords-${submitted.seed.replace(/\W+/g, '-')}.csv`, csv([['Keyword', 'Type', 'Intent'], ...visible.map(i => [i.keyword, i.type, i.intent])]))}>Export CSV</button>
          </div>
        </div>
        <div className="post-table kw-table"><table>
          <caption>Keyword ideas for {submitted.seed}</caption>
          <thead><tr><th scope="col"><span className="sr-only">Select</span></th><th scope="col">Keyword</th><th scope="col">Type</th><th scope="col">Intent</th><th scope="col">Check demand</th></tr></thead>
          <tbody>{visible.map(i => <tr key={i.keyword}>
            <td><input type="checkbox" aria-label={`Select ${i.keyword}`} checked={selected.has(i.keyword)} onChange={() => toggle(i.keyword)} /></td>
            <th scope="row">{i.keyword}</th>
            <td>{i.type}</td>
            <td><span className={`intent intent-${i.intent.toLowerCase()}`}>{i.intent}</span></td>
            <td className="kw-links">
              <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(i.keyword)}`} target="_blank" rel="noopener noreferrer nofollow">Trends ↗</a>
              <a href={`https://www.google.com/search?q=${encodeURIComponent(i.keyword)}`} target="_blank" rel="noopener noreferrer nofollow">SERP ↗</a>
            </td>
          </tr>)}</tbody>
        </table></div>
        <aside className="post-callout">
          <p className="t">Which page should each intent get?</p>
          <p><b>Informational</b>: a guide or blog post. <b>Commercial</b>: a comparison or “best” page. <b>Transactional</b>: a service, product or pricing page. <b>Local</b>: a location page and your Google Business Profile.</p>
        </aside>
      </div>}
    </div>}

    {tab === 'group' && <div role="tabpanel">
      <form className="tool-form" onSubmit={onGroup}>
        <label className="tool-field"><span>Keywords (one per line or comma-separated)</span>
          <textarea rows={8} placeholder={'roof repair cost\nhow much does roof repair cost\nroof repair near me\nemergency roof repair\nflat roof repair'} value={list} onChange={e => setList(e.target.value)} required /></label>
        <div className="tool-fields"><button className="btn btn-primary" type="submit">Group keywords</button></div>
      </form>

      {groups && <div className="tool-result">
        <div className="kw-bar">
          <p className="result-facts"><span>{groups.reduce((n, g) => n + g.keywords.length, 0)} keywords</span><span>{groups.length} groups</span></p>
          <div className="result-actions">
            <button type="button" className="btn btn-ghost" onClick={() => download('keyword-groups.csv', csv([['Group (suggested page)', 'Keyword', 'Intent'], ...groups.flatMap(g => g.keywords.map(k => [g.head, k, intentOf(k)]))]))}>Export CSV</button>
          </div>
        </div>
        <div className="kw-groups">
          {groups.map(g => <section key={g.head} className="panel">
            <h3>{g.head} <small>{g.keywords.length} keyword{g.keywords.length === 1 ? '' : 's'}</small></h3>
            <p className="kw-intents">{g.intents.map(i => <span key={i} className={`intent intent-${i.toLowerCase()}`}>{i}</span>)}</p>
            {g.intents.length > 1 && <p className="panel-note">Mixed intent: check the search results. If they show different page types, split this group.</p>}
            <ul>{g.keywords.map(k => <li key={k}>{k}</li>)}</ul>
          </section>)}
        </div>
      </div>}
    </div>}
  </div>;
}

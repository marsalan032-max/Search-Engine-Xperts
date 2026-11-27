'use client';
import { useState } from 'react';
import { formatUpdateDate, typeLabels, type AlgoUpdate, type UpdateType } from './updates';

// The update collection: type filter, year jump links, then every update grouped by year (newest first).
// Server-rendered with everything visible; the filter only narrows the list on the page.

const groupOf = (u: AlgoUpdate) => { const y = Number(u.date.slice(0, 4)); return y <= 2016 ? '2011–2016' : String(y); };
const groupId = (g: string) => `year-${g.replace('–', '-')}`;

export function UpdateTimeline({ updates }: { updates: AlgoUpdate[] }) {
  const [type, setType] = useState<UpdateType | null>(null);
  const shown = type ? updates.filter(u => u.type === type) : updates;
  const groups: { name: string; items: AlgoUpdate[] }[] = [];
  for (const u of shown) {
    const g = groupOf(u);
    const last = groups[groups.length - 1];
    if (last?.name === g) last.items.push(u); else groups.push({ name: g, items: [u] });
  }
  const label = typeLabels.find(t => t.type === type)?.label;

  return <div className="ga-tl">
    <div className="ga-controls">
      <div className="ga-filter" role="group" aria-label="Filter by update type">
        <button type="button" aria-pressed={type === null} onClick={() => setType(null)}>All updates</button>
        {typeLabels.map(t => <button key={t.type} type="button" aria-pressed={type === t.type} onClick={() => setType(t.type)}>{t.label}</button>)}
      </div>
      <nav className="ga-years" aria-label="Jump to year">
        {groups.map(g => <a key={g.name} href={`#${groupId(g.name)}`}>{g.name}</a>)}
      </nav>
      <p className="ga-count" aria-live="polite">Showing {shown.length} {label ? label.toLowerCase() : 'updates'}</p>
    </div>

    {groups.map(g => <section key={g.name} id={groupId(g.name)} className="ga-year" aria-labelledby={`${groupId(g.name)}-h`}>
      <h2 id={`${groupId(g.name)}-h`} className="ga-year-h"><span>{g.name}</span><small>{g.items.length} update{g.items.length > 1 ? 's' : ''}</small></h2>
      <ol className="ga-list">
        {g.items.map(u => <li key={u.id} id={u.id} className={`ga-item${u.status === 'Announced' ? ' is-next' : ''}`}>
          <time dateTime={u.date} className="ga-date">
            <b>{formatUpdateDate(u.date).split(',')[0]}</b><span>{u.date.slice(0, 4)}</span>
          </time>
          <article className="ga-card">
            <div className="ga-tags">
              <span className={`ga-type t-${u.type.toLowerCase().replace(' ', '-')}`}>{u.type === 'Content' ? 'Helpful content & reviews' : u.type}</span>
              {u.status === 'Announced' && <span className="ga-status next">Announced · coming in December</span>}
              {u.status === 'Rolling out' && <span className="ga-status live">Rolling out</span>}
            </div>
            <h3>{u.name}</h3>
            <p>{u.summary}</p>
            {u.rollout && <p className="ga-meta"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{u.status === 'Announced' ? 'Announced' : 'Rollout'}: {u.rollout}</p>}
          </article>
        </li>)}
      </ol>
    </section>)}
  </div>;
}

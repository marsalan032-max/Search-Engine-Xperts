'use client';
import { useState } from 'react';
import { typeLabels, type AlgoUpdate, type UpdateType } from './updates';
import { UpdateCard } from './update-card';

// The update collection: topic pills (same style as the blog index), year jump links, then every update
// as a linked card (UpdateCard) in a 3-column grid, grouped by year, newest first. Server-rendered with everything visible;
// the pills only narrow the list on the page.

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
      <div className="bx-pills ga-pills" role="group" aria-label="Filter by update type">
        <button type="button" aria-pressed={type === null} onClick={() => setType(null)}>All updates</button>
        {typeLabels.map(t => <button key={t.type} type="button" aria-pressed={type === t.type} onClick={() => setType(t.type)}>{t.label}</button>)}
      </div>
      <nav className="ga-years" aria-label="Jump to year">
        <span>Jump to:</span>
        {groups.map(g => <a key={g.name} href={`#${groupId(g.name)}`}>{g.name}</a>)}
      </nav>
      <p className="ga-count" aria-live="polite">Showing {shown.length} {label ? label.toLowerCase() : 'updates'}</p>
    </div>

    {groups.map(g => <section key={g.name} id={groupId(g.name)} className="ga-year" aria-labelledby={`${groupId(g.name)}-h`}>
      <h2 id={`${groupId(g.name)}-h`} className="ga-year-h">{g.name}<small>{g.items.length} update{g.items.length > 1 ? 's' : ''}</small></h2>
      <div className="bx-grid ga-grid">
        {g.items.map(u => <UpdateCard key={u.id} u={u} anchor />)}
      </div>
    </section>)}
  </div>;
}

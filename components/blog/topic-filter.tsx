'use client';
import { Fragment, useRef, useState, type ReactNode } from 'react';

// Blog index topic pills. Each pill filters the "Latest" grid on the same page instead of linking away.
// The featured block between the pills and the grid is passed in as children so it stays server-rendered.

export type TopicCard = { key: string; category: string; node: ReactNode };

export function TopicFilter({ head, topics, cards, children, allLabel = 'All articles' }: { head: ReactNode; topics: string[]; cards: TopicCard[]; children: ReactNode; allLabel?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const latest = useRef<HTMLElement>(null);
  const shown = active ? cards.filter(c => c.category === active) : cards;

  const choose = (topic: string | null) => {
    setActive(topic);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    latest.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return <>
    <div className="wrap bx-head">
      {head}
      <nav className="bx-pills" aria-label="Filter articles by topic">
        <button type="button" aria-pressed={active === null} onClick={() => choose(null)}>{allLabel}</button>
        {topics.map(t => <button key={t} type="button" aria-pressed={active === t} onClick={() => choose(t)}>{t}</button>)}
      </nav>
    </div>

    {children}

    <section ref={latest} id="latest" className="bx-band" aria-labelledby="latest-title">
      <div className="wrap">
        <h2 id="latest-title" className="bx-title">{active ? `${active} Articles` : 'Latest'}</h2>
        <p className="bx-count" aria-live="polite">{shown.length} article{shown.length === 1 ? '' : 's'}{active ? ` in ${active}` : ''}</p>
        <div className="bx-grid">
          {shown.map(c => <Fragment key={c.key}>{c.node}</Fragment>)}
        </div>
      </div>
    </section>
  </>;
}

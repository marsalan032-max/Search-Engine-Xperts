'use client';

import { useEffect, useState } from 'react';

// Table of contents that highlights the section currently being read.
export function TableOfContents({ items, share }: { items: { id: string; label: string }[]; share?: React.ReactNode }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map(i => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const onScroll = () => {
      const line = 140; // just below the sticky header
      let active = sections[0].id;
      for (const s of sections) if (s.getBoundingClientRect().top - line <= 0) active = s.id;
      setCurrent(active);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return <nav aria-label="Table of contents" className="toc">
    <div className="toc-head"><p>Table of Contents</p>{share}</div>
    <ol>
      {items.map((item, i) => <li key={item.id}>
        <a href={`#${item.id}`} aria-current={current === item.id ? 'location' : undefined}>
          <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{item.label}
        </a>
      </li>)}
    </ol>
  </nav>;
}

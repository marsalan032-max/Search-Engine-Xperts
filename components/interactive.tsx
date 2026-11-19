'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import questions from './faq-data.json';
import { menu } from './menu';

// True on desktop pointers (mouse/trackpad) at the width where the full nav shows.
const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (min-width: 921px)').matches;

const Chevron = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);

// On pages other than the homepage, pass base="/" so in-page links such as
// "#contact" become "/#contact" and still reach the homepage sections.
export function Header({ base = '' }: { base?: string } = {}) {
  const to = (href: string) => (base && href.startsWith('#') && href.length > 1 ? `${base}${href}` : href);
  const [open, setOpen] = useState(false);              // mobile menu panel
  const [active, setActive] = useState<string | null>(null); // open dropdown
  const navRef = useRef<HTMLElement>(null);

  // Close any open dropdown on outside click/tap or Escape.
  useEffect(() => {
    if (!active) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [active]);

  const closeAll = () => { setOpen(false); setActive(null); };

  return <header><div className="wrap nav">
    <a href={base || '#top'} className="logo"><svg className="mk" aria-hidden="true"><use href="#mark" /></svg><div><b>Search Engine</b><b className="x">Xperts<span className="logo-dot">.</span></b></div></a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="navigation" onClick={() => { setOpen(!open); setActive(null); }}>{open ? '✕' : '☰'}</button>
    <nav id="navigation" ref={navRef} className={`links ${open ? 'mobile-open' : ''}`} aria-label="Main navigation">
      {menu.map(item => {
        if (!item.children) {
          return <div className="navitem" key={item.label}><a href={to(item.href)} className="navlink" onClick={closeAll}>{item.label}</a></div>;
        }
        const isOpen = active === item.label;
        const menuId = `menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        return <div
          className="navitem"
          key={item.label}
          onMouseEnter={() => { if (canHover()) setActive(item.label); }}
          onMouseLeave={() => { if (canHover()) setActive(a => (a === item.label ? null : a)); }}
        >
          <button
            className="navlink"
            aria-expanded={isOpen}
            aria-controls={menuId}
            // A mouse click while hover already opened the menu keeps it open;
            // keyboard (detail === 0) and touch taps toggle it.
            onClick={e => setActive(a => (e.detail > 0 && canHover()) ? item.label : (a === item.label ? null : item.label))}
          >{item.label} <Chevron /></button>
          {isOpen && <div id={menuId} className="dropdown visible">
            {item.children.map(c => <a key={c.label} href={to(c.href)} onClick={closeAll}>{c.label}</a>)}
          </div>}
        </div>;
      })}
    </nav>
    <a href={to('#contact')} className="btn btn-primary nav-cta">Free Consultation</a>
  </div></header>;
}

export function AuditForm() {
  const [website,setWebsite] = useState('');
  const [error,setError] = useState('');
  const [ready,setReady] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const url = new URL(/^https?:\/\//i.test(website.trim()) ? website.trim() : `https://${website.trim()}`);
      if (!['http:','https:'].includes(url.protocol) || !url.hostname.includes('.') || /\s/.test(website)) throw new Error();
      setError('');setReady(true);
    } catch {setError('Please enter a valid website, such as yoursite.com.');setReady(false);}
  }
  const email = `mailto:arslantariq082@gmail.com?subject=${encodeURIComponent('Free SEO audit request')}&body=${encodeURIComponent(`Hi Arslan,\n\nI would like a free SEO audit for ${website.trim()}.\n\nMy business goals are:\n`)}`;
  return <div className="audit-container"><form className="audit" onSubmit={submit} noValidate>
    <span className="input-globe" aria-hidden="true">◎</span><input aria-label="Your website URL" aria-invalid={!!error} aria-describedby={error ? 'audit-error' : 'audit-hint'} type="text" inputMode="url" value={website} onChange={e=>{setWebsite(e.target.value);setReady(false);setError('');}} placeholder="Enter your website URL" required />
    <button className="btn btn-primary" type="submit">Get free audit <span aria-hidden="true">↗</span></button>
  </form><p id="audit-hint" className="audit-hint">✓ Personalized insights <span>✓ No commitment</span></p>
    {error && <p id="audit-error" className="form-error" role="alert">{error}</p>}
    {ready && <div className="audit-ready" role="status"><b>Your website is ready for a review.</b><p>Send your request to Arslan using your email app.</p><a href={email}>Email my audit request →</a></div>}
  </div>;
}

export function FAQ() {
  const [active,setActive] = useState<number|null>(0);
  return <div className="faq">{questions.map((item,i)=><div key={item.question} className={`faq-item ${active===i?'open':''}`}><h3><button id={`question-${i}`} className="faq-q" aria-expanded={active===i} aria-controls={`answer-${i}`} onClick={()=>setActive(active===i?null:i)}>{item.question}<span className="ico" aria-hidden="true">{active===i?'−':'+'}</span></button></h3><div id={`answer-${i}`} role="region" aria-labelledby={`question-${i}`} hidden={active!==i} className="faq-answer"><p>{item.answer}</p></div></div>)}</div>;
}

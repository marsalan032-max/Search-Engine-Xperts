'use client';

import { useEffect, useRef, useState } from 'react';
import { KeywordView, type Saved } from './keyword-view';
import { AuditView, BacklinksView, DomainView, SavedView } from './other-views';
import { countries } from './shared';
import { Icon, store } from './ui';

// The SEO Suite app shell: sidebar navigation + one view at a time.
// The view and search live in the query string (?view=keywords&q=…&loc=…) so results can be shared.

type View = 'keywords' | 'domain' | 'backlinks' | 'audit' | 'saved';

const views: Record<View, { title: string; dek: string; icon: string; section: 'Research' | 'My site' }> = {
  keywords: { title: 'Keyword Research', dek: 'Discover keyword ideas, search demand, and ranking opportunities.', icon: 'search', section: 'Research' },
  domain: { title: 'Domain Overview', dek: 'Organic keywords, estimated traffic and top pages for any domain.', icon: 'globe', section: 'Research' },
  backlinks: { title: 'Backlinks', dek: 'Domain rank, backlinks and the strongest referring domains.', icon: 'link', section: 'Research' },
  audit: { title: 'Site Audit', dek: 'Technical and on-page checks for any URL, ranked by what to fix first.', icon: 'audit', section: 'My site' },
  saved: { title: 'Saved Keywords', dek: 'Your shortlist from every search, ready to export.', icon: 'bookmark', section: 'My site' },
};
const order: View[] = ['keywords', 'domain', 'backlinks', 'audit', 'saved'];

export function SuiteApp() {
  const [view, setView] = useState<View>('keywords');
  const [live, setLive] = useState<boolean | null>(null);
  const [initial, setInitial] = useState<{ q: string; loc: number } | null>(null);
  const [kwKey, setKwKey] = useState(0);
  const [saved, setSaved] = useState<Saved[]>([]);
  const [audit, setAudit] = useState({ url: '', nonce: 0 });
  const [navOpen, setNavOpen] = useState(false);
  const kwSearch = useRef('?view=keywords'); // the keyword search's URL, restored when returning to that view

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const v = p.get('view') as View | null;
    if (v && v in views) setView(v);
    setInitial({ q: p.get('q') ?? '', loc: Number(p.get('loc')) || countries[0].code });
    if (v === 'audit' && p.get('url')) setAudit({ url: p.get('url')!, nonce: 1 });
    setSaved(store.get<Saved[]>('ss-saved', []));
    fetch('/api/seo-suite/status').then(r => r.json()).then(j => setLive(Boolean(j.live))).catch(() => setLive(false));
  }, []);

  function go(v: View) {
    if (view === 'keywords' && location.search) kwSearch.current = location.search;
    setView(v); setNavOpen(false);
    history.replaceState(null, '', v === 'keywords' ? kwSearch.current : `?view=${v}`);
    if (window.scrollY > 0) window.scrollTo({ top: 0 });
  }
  function research(q: string, loc: number) { setInitial({ q, loc }); setKwKey(k => k + 1); go('keywords'); }
  function auditUrl(url: string) { setAudit(a => ({ url, nonce: a.nonce + 1 })); go('audit'); }

  const v = views[view];
  return <div className={`ss-app${navOpen ? ' nav-open' : ''}`}>
    <aside className="ss-sidebar" aria-label="SEO Suite navigation">
      <div className="ss-brand">
        <a href="/" className="ss-logo" aria-label="Search Engine Xperts home">
          <span className="ss-logo-mark" aria-hidden="true">SX</span>
          <span><b>SEO Suite</b><small>searchenginexperts.com</small></span>
        </a>
        <button type="button" className="ss-nav-toggle" aria-label={navOpen ? 'Close menu' : 'Open menu'} aria-expanded={navOpen} onClick={() => setNavOpen(!navOpen)}><Icon name={navOpen ? 'x' : 'menu'} /></button>
      </div>
      <nav className="ss-nav">
        {(['Research', 'My site'] as const).map(section => <div key={section}>
          <p className="ss-nav-label">{section}</p>
          {order.filter(k => views[k].section === section).map(k => <button key={k} type="button" className={`ss-nav-item${view === k ? ' is-active' : ''}`} aria-current={view === k ? 'page' : undefined} onClick={() => go(k)}>
            <Icon name={views[k].icon} /> {views[k].title}
            {k === 'saved' && saved.length > 0 && <span className="ss-badge">{saved.length}</span>}
            {(k === 'domain' || k === 'backlinks') && live === false && <span className="ss-nav-lock" title="Needs live data"><Icon name="lock" size={14} /></span>}
          </button>)}
        </div>)}
        <div>
          <p className="ss-nav-label">Experts</p>
          <a className="ss-nav-item" href="/#contact"><Icon name="star" /> Free expert audit</a>
          <a className="ss-nav-item" href="/seo-tools"><Icon name="grid" /> All free SEO tools</a>
          <a className="ss-nav-item" href="#about-suite"><Icon name="serp" /> How it works</a>
        </div>
      </nav>
      <div className="ss-sidebar-foot">
        <p className={`ss-status${live ? ' is-live' : ''}`}><i aria-hidden="true" />{live == null ? 'Checking data…' : live ? 'Live search data' : 'Autocomplete data'}</p>
        <a className="ss-nav-item" href="/"><Icon name="home" /> Back to website</a>
      </div>
    </aside>

    <main id="ss-main" className="ss-main">
      <div className="ss-main-inner">
        <div className="ss-head">
          <h1 className="ss-h1">Free SEO Suite <span>by Search Engine Xperts</span></h1>
          <h2 className="ss-title">{v.title}</h2>
          <p className="ss-dek">{v.dek}</p>
        </div>
        {/* Views stay mounted so switching back keeps results; only the active one is shown. */}
        <div hidden={view !== 'keywords'}>{initial && <KeywordView key={kwKey} live={live} initial={initial} onSaved={setSaved} onAudit={auditUrl} />}</div>
        <div hidden={view !== 'domain'}><DomainView live={live} goAudit={() => go('audit')} /></div>
        <div hidden={view !== 'backlinks'}><BacklinksView live={live} goAudit={() => go('audit')} /></div>
        <div hidden={view !== 'audit'}><AuditView initialUrl={audit.url} nonce={audit.nonce} /></div>
        {view === 'saved' && <SavedView saved={saved} setSaved={setSaved} research={research} />}
      </div>
    </main>
  </div>;
}

import footer from './footer.json';

// Shared pieces used by every React page: the logo symbol definitions and the footer.
// The home page itself lives in components/home/home-page.tsx.

export function BrandDefinitions() { return (<>
<svg width="0" height="0" style={{"position": "absolute"}} aria-hidden="true"><defs>
<linearGradient id="mkg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A6CFF"></stop><stop offset="1" stopColor="#2A48C8"></stop></linearGradient>
<symbol id="mark" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="url(#mkg)"></rect><path d="M9.5 26.5l6-6 4.5 3.5 8.5-10.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="28.5" cy="13.5" r="2.8" fill="#fff"></circle></symbol>
</defs></svg>
</>); }

// Footer content lives in footer.json (shared with the static service pages); styles in app/footer.css.
const icons = {
  phone: 'M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02z',
  mail: 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm8 7.2L4.8 7v10h14.4V7z',
  linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z',
};
const Icon = ({ d, size = 16 }: { d: string; size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>;

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap">
      <div className="sf-grid">
        <div className="sf-brand">
          <a href="/" className="logo"><svg className="mk" aria-hidden="true"><use href="#mark" /></svg><div><b>Search Engine</b><b className="x">Xperts</b></div></a>
          <p className="sf-blurb">{footer.blurb}</p>
          <ul className="sf-contact">
            <li><Icon d={icons.phone} /><a href={footer.phone.href}>{footer.phone.label}</a></li>
            <li><Icon d={icons.mail} /><a href={footer.email.href}>{footer.email.label}</a></li>
          </ul>
          <div className="sf-social">
            {footer.social.map(s => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer me" aria-label={s.title} title={s.title}><Icon d={icons.linkedin} size={18} /></a>)}
            <span className="sf-rating">{footer.ratings}</span>
          </div>
        </div>
        {footer.columns.map(col => <nav className="sf-col" key={col.title} aria-label={col.title}>
          <h2>{col.title}</h2>
          <ul>{col.links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
        </nav>)}
      </div>
      <div className="sf-bottom">
        <p>© {new Date().getFullYear()} Search Engine Xperts. All rights reserved.</p>
        <nav aria-label="Footer">
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/#contact">Contact</a>
          <a href="#main">Back to top ↑</a>
        </nav>
      </div>
    </div>
  </footer>;
}

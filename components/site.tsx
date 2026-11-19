// Shared pieces used by every React page: the logo symbol definitions and the footer.
// The home page itself lives in components/home/home-page.tsx.

export function BrandDefinitions() { return (<>
<svg width="0" height="0" style={{"position": "absolute"}} aria-hidden="true"><defs>
<linearGradient id="mkg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A6CFF"></stop><stop offset="1" stopColor="#2A48C8"></stop></linearGradient>
<symbol id="mark" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="url(#mkg)"></rect><path d="M9.5 26.5l6-6 4.5 3.5 8.5-10.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="28.5" cy="13.5" r="2.8" fill="#fff"></circle></symbol>
</defs></svg>
</>); }

export function Footer({ home = '#top' }: { home?: string } = {}) { return (<>
<footer><div className="wrap row">
<a href={home} className="logo"><svg className="mk"><use href="#mark"></use></svg><div><b>Search Engine</b><b className="x">Xperts</b></div></a>
<div className="fl">© 2026 Search Engine Xperts · SEO &amp; AI Search Agency</div>
</div></footer>
</>); }

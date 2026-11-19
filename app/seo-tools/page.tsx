import type { Metadata } from 'next';
import { siteUrl } from '../../components/blog/posts';
import { tools } from '../../components/tools/tool-list';
import { guides } from '../../components/learn/guides';
import { brandTitle } from '../../components/seo-title';

const url = `${siteUrl}/seo-tools`;
const title = 'Free SEO Tools: Audit, On-Page, Technical & Keywords';
const description = 'Free SEO tools, no sign-up: an instant SEO audit with a score, on-page and technical SEO checkers, and a keyword research tool with intent grouping.';

export const metadata: Metadata = {
  title: brandTitle(title),
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Search Engine Xperts', title, description, images: [{ url: `${siteUrl}/images/learn/seo-tools.png`, width: 1600, height: 900 }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${siteUrl}/images/learn/seo-tools.png`] },
};

const icons: Record<string, React.ReactNode> = {
  'keyword-research-tool': <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
  'technical-seo-checker': <><path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z" /></>,
  'on-page-seo-checker': <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  'seo-audit-tool': <><path d="M4 19V5M4 19h16" /><path d="M8 15l3-4 3 2 5-6" /></>,
};

// Hub order puts the audit first: it's the most useful starting point.
const order = ['seo-audit-tool', 'on-page-seo-checker', 'technical-seo-checker', 'keyword-research-tool'];

export default function SeoToolsHub() {
  const list = order.map(s => tools.find(t => t.slug === s)!);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url, name: title, description,
        isPartOf: { '@type': 'WebSite', name: 'Search Engine Xperts', url: `${siteUrl}/` },
        mainEntity: { '@type': 'ItemList', itemListElement: list.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `${url}/${t.slug}`, name: t.name })) },
      },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'SEO Tools', item: url },
      ] },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="wrap hub">
      <nav aria-label="Breadcrumb" className="crumbs"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">SEO Tools</span></nav>
      <div className="hub-head">
        <p className="eyebrow">Free SEO tools</p>
        <h1>Free SEO tools to audit, check and research</h1>
        <p className="dek">The same checks we run at the start of every client project, free to use with no sign-up. Enter a URL to see what’s holding a page back, or research keywords for your next page.</p>
        <form className="hub-quick" action="/seo-tools/seo-audit-tool" method="get">
          <label htmlFor="quick-url" className="sr-only">Page URL to audit</label>
          <input id="quick-url" name="url" type="url" inputMode="url" placeholder="https://example.com" required />
          <button className="btn btn-primary" type="submit">Run free audit</button>
        </form>
      </div>

      <div className="tool-cards">
        {list.map(t => <a key={t.slug} href={`/seo-tools/${t.slug}`} className="tool-card">
          <span className="tool-card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[t.slug]}</svg></span>
          <h2>{t.name}</h2>
          <p>{t.short}</p>
          <i>Open the tool →</i>
        </a>)}
      </div>

      <section className="hub-path" aria-labelledby="how-title">
        <p className="eyebrow">How they fit together</p>
        <h2 className="hub-h2" id="how-title">A simple workflow</h2>
        <ol>
          <li><span className="hub-step">01</span><div><h3>Audit</h3><p>Start with the SEO audit on your most important page to get a score and a ranked list of fixes.</p></div></li>
          <li><span className="hub-step">02</span><div><h3>Fix the foundations</h3><p>Use the technical checker to confirm redirects, robots.txt, canonicals and indexing are right.</p></div></li>
          <li><span className="hub-step">03</span><div><h3>Choose the right keyword</h3><p>Use the keyword tool to find the terms and intent each page should target.</p></div></li>
          <li><span className="hub-step">04</span><div><h3>Optimize the page</h3><p>Run the on-page checker with your target keyword and work through the warnings.</p></div></li>
        </ol>
      </section>

      <section className="hub-tools" aria-labelledby="guides-title">
        <p className="eyebrow">Learn SEO</p>
        <h2 className="hub-h2" id="guides-title">Guides to go with the tools</h2>
        <div className="next-grid">
          {guides.filter(g => ['technical-seo', 'local-seo', 'ai-seo'].includes(g.slug)).map(g => <a key={g.slug} href={`/learn-seo/${g.slug}`}><span className="kicker">{g.category}</span><b>{g.title}</b><span>{g.dek}</span><i>Read the guide →</i></a>)}
        </div>
      </section>

      <div className="post-cta hub-cta">
        <div>
          <p className="eyebrow">Free expert audit</p>
          <h2>Want a specialist to review the whole site?</h2>
          <p>Tools check one page at a time. A full audit covers every page, your competitors and the keywords you’re missing.</p>
        </div>
        <a href="/#contact" className="btn">Get my free audit <span aria-hidden="true">→</span></a>
      </div>
    </section>
  </>;
}

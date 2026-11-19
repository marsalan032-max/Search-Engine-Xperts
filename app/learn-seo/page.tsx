import type { Metadata } from 'next';
import { guides } from '../../components/learn/guides';
import { siteUrl } from '../../components/blog/posts';
import { tools } from '../../components/tools/tool-list';
import { brandTitle } from '../../components/seo-title';
import { HomeCrumb } from '../../components/home-crumb';

const url = `${siteUrl}/learn-seo`;
const title = 'Learn SEO: Free Guides from Fundamentals to AI Search';
const description = 'Free, practical SEO guides on local, ecommerce, Shopify, mobile and technical SEO, link building, advanced strategy and AI search visibility.';

export const metadata: Metadata = {
  title: brandTitle(title),
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Search Engine Xperts', title, description, images: [{ url: `${siteUrl}/images/learn/learn-seo.png`, width: 1600, height: 900 }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${siteUrl}/images/learn/learn-seo.png`] },
};

// Suggested reading order for someone starting out.
const path = [
  { step: 'Foundations', text: 'Make sure search engines can crawl, render and index your site, on phones first.', slugs: ['technical-seo', 'mobile-seo'] },
  { step: 'Your business model', text: 'Apply SEO to how you sell: a local service area, an online store or a Shopify catalog.', slugs: ['local-seo', 'ecommerce-seo', 'shopify-seo'] },
  { step: 'Authority', text: 'Earn the links and mentions that tell Google and AI systems you can be trusted.', slugs: ['link-building'] },
  { step: 'Growth', text: 'Go beyond the basics and get cited in AI Overviews, AI Mode and ChatGPT.', slugs: ['advanced-seo-strategies', 'ai-seo'] },
];

export default function LearnSeoHub() {
  const bySlug = Object.fromEntries(guides.map(g => [g.slug, g]));
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url, name: title, description,
        isPartOf: { '@type': 'WebSite', name: 'Search Engine Xperts', url: `${siteUrl}/` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `${url}/${g.slug}`, name: g.title })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Learn SEO', item: url },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="wrap hub">
      <nav aria-label="Breadcrumb" className="crumbs"><HomeCrumb /><span aria-hidden="true">/</span><span aria-current="page">Learn SEO</span></nav>
      <div className="hub-head">
        <p className="eyebrow">Learn SEO</p>
        <h1>Free SEO guides, from fundamentals to AI search</h1>
        <p className="dek">Practical, step-by-step guides based on 7+ years of hands-on SEO for local businesses and online stores. No jargon for its own sake, no fluff — just what works and how to do it.</p>
        <div className="hub-stats" aria-label="At a glance">
          <span><b>{guides.length}</b> in-depth guides</span>
          <span><b>{tools.length}</b> free SEO tools</span>
          <span><b>100%</b> free, no sign-up</span>
        </div>
      </div>

      <h2 className="hub-h2" id="all-guides">All SEO guides</h2>
      <div className="index-grid">
        {guides.map(g => <a key={g.slug} href={`/learn-seo/${g.slug}`} className="index-card">
          <img src={g.image.src} alt="" width={g.image.width} height={g.image.height} loading="lazy" />
          <div>
            <span className="kicker">{g.category}</span>
            <h3>{g.title}</h3>
            <p>{g.dek}</p>
            <small>{g.readTime}</small>
          </div>
        </a>)}
      </div>

      <section className="hub-path" aria-labelledby="path-title">
        <p className="eyebrow">Where to start</p>
        <h2 className="hub-h2" id="path-title">A suggested learning path</h2>
        <ol>
          {path.map((p, i) => <li key={p.step}>
            <span className="hub-step">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{p.step}</h3>
              <p>{p.text}</p>
              <p className="hub-links">{p.slugs.map(s => <a key={s} href={`/learn-seo/${s}`}>{bySlug[s].category} guide →</a>)}</p>
            </div>
          </li>)}
        </ol>
      </section>

      <section className="hub-tools" aria-labelledby="tools-title">
        <p className="eyebrow">Put it into practice</p>
        <h2 className="hub-h2" id="tools-title">Free SEO tools</h2>
        <div className="next-grid four">
          {tools.map(t => <a key={t.slug} href={`/seo-tools/${t.slug}`}><span className="kicker">Free tool</span><b>{t.name}</b><span>{t.short}</span><i>Open the tool →</i></a>)}
        </div>
      </section>

      <div className="post-cta hub-cta">
        <div>
          <p className="eyebrow">Free SEO audit</p>
          <h2>Rather have an expert look at your site?</h2>
          <p>Get a no-commitment audit with the issues and opportunities that matter most for your business, ranked by impact.</p>
        </div>
        <a href="/#contact" className="btn">Get my free audit <span aria-hidden="true">→</span></a>
      </div>
    </section>
  </>;
}

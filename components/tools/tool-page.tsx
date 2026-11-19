import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { siteUrl } from '../blog/posts';
import { getTool, tools, type ToolInfo } from './tool-list';
import { brandTitle } from '../seo-title';

// Shared page frame for each /seo-tools/<slug> page: heading, the interactive tool,
// then explanatory content, FAQs and related links, with WebApplication + FAQ + breadcrumb schema.

export function toolMetadata(slug: string): Metadata {
  const t = getTool(slug)!;
  const url = `${siteUrl}/seo-tools/${t.slug}`;
  return {
    title: brandTitle(t.metaTitle),
    description: t.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, siteName: 'Search Engine Xperts', title: t.name, description: t.short, images: [{ url: `${siteUrl}/images/learn/seo-tools.png`, width: 1600, height: 900 }] },
    twitter: { card: 'summary_large_image', title: t.name, description: t.short, images: [`${siteUrl}/images/learn/seo-tools.png`] },
  };
}

export function ToolPage({ tool, children }: { tool: ToolInfo; children: ReactNode }) {
  const url = `${siteUrl}/seo-tools/${tool.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#app`,
        name: tool.name, url, description: tool.description,
        applicationCategory: 'BusinessApplication', operatingSystem: 'Any (web browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Search Engine Xperts', url: `${siteUrl}/` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'SEO Tools', item: `${siteUrl}/seo-tools` },
          { '@type': 'ListItem', position: 3, name: tool.name, item: url },
        ],
      },
      { '@type': 'FAQPage', mainEntity: tool.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
    ],
  };
  const others = tools.filter(t => t.slug !== tool.slug);

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="wrap tool-page">
      <nav aria-label="Breadcrumb" className="crumbs"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/seo-tools">SEO Tools</a><span aria-hidden="true">/</span><span aria-current="page">{tool.menuLabel}</span></nav>
      <div className="hub-head">
        <p className="eyebrow">Free SEO tool</p>
        <h1>{tool.name}</h1>
        <p className="dek">{tool.intro}</p>
      </div>

      {children}

      <div className="tool-content post-body">
        <section id="what-it-checks">
          <h2>What this tool checks</h2>
          <div className="post-cards">{tool.checks.map(c => <div className="post-card" key={c.title}><h3>{c.title}</h3><p>{c.text}</p></div>)}</div>
        </section>
        <section id="how-to-use">
          <h2>How to use the results</h2>
          <ol className="post-steps">{tool.howTo.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
        </section>
        <section id="faq">
          <h2>Frequently asked questions</h2>
          <div className="post-faq">{tool.faqs.map(f => <details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div>
        </section>
      </div>
    </section>

    <section aria-labelledby="related-title" className="post-next">
      <div className="wrap">
        <p className="eyebrow">Keep going</p>
        <h2 id="related-title">Related tools and guides</h2>
        <div className="next-grid">
          {tool.related.map(r => <a key={r.href} href={r.href}><span className="kicker">{r.href.startsWith('/seo-tools') ? 'Free tool' : r.href.startsWith('/learn-seo') ? 'Guide' : 'Service'}</span><b>{r.label}</b><span>{r.text}</span><i>Open →</i></a>)}
        </div>
        <p className="tool-others">More free tools: {others.map((t, i) => <span key={t.slug}>{i ? ' · ' : ''}<a href={`/seo-tools/${t.slug}`}>{t.menuLabel}</a></span>)}</p>
      </div>
    </section>
  </>;
}

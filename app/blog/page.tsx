import type { Metadata } from 'next';
import { formatDate, posts, siteUrl } from '../../components/blog/posts';

export const metadata: Metadata = {
  title: 'SEO Blog: Strategy, Pricing & AI Search Guides | Search Engine Xperts',
  description: 'Practical SEO guides from Arslan Tariq on strategy, pricing, technical SEO, local SEO and AI search visibility.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: { type: 'website', url: `${siteUrl}/blog`, siteName: 'Search Engine Xperts', title: 'SEO Blog | Search Engine Xperts', description: 'Practical SEO guides on strategy, pricing, technical SEO and AI search visibility.' },
};

export default function BlogIndex() {
  return <section className="wrap blog-index">
    <nav aria-label="Breadcrumb" className="crumbs"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">SEO Blog</span></nav>
    <p className="eyebrow">SEO blog</p>
    <h1>Guides for smarter search decisions</h1>
    <p className="dek">Practical, no-fluff articles on SEO strategy, pricing, technical SEO and AI search.</p>
    <div className="index-grid">
      {posts.map(p => <a key={p.slug} href={`/blog/${p.slug}`} className="index-card">
        <img src={p.image.src} alt="" width={p.image.width} height={p.image.height} loading="lazy" />
        <div>
          <span className="kicker">{p.category}</span>
          <h2>{p.title}</h2>
          <p>{p.dek}</p>
          <small><time dateTime={p.published}>{formatDate(p.published)}</time> · {p.readTime}</small>
        </div>
      </a>)}
    </div>
  </section>;
}

import type { Metadata } from 'next';
import './blog-index.css';
import { author, formatDate, posts, siteUrl } from '../../components/blog/posts';
import { guides } from '../../components/learn/guides';
import { HomeCrumb } from '../../components/home-crumb';

// Blog collection page (/blog): topic pills, a featured story with three picks beside it, every article in a
// "Latest" grid (each card ends with the author and the date), then the Learn SEO guides as topic tiles.
// Articles come from the blog posts and Learn SEO guides, so new ones appear here automatically.

type Item = (typeof posts)[number] & { href: string };

const all: Item[] = [
  ...posts.map(p => ({ ...p, href: `/blog/${p.slug}` })),
  ...guides.map(g => ({ ...g, href: `/learn-seo/${g.slug}` })),
].sort((a, b) => b.published.localeCompare(a.published));

// The featured story and the three picks beside it. Falls back to the newest articles if a slug is missing.
const pick = (slug: string) => all.find(a => a.href.endsWith(`/${slug}`));
const chosen = ['ai-seo', 'local-seo', 'how-much-does-seo-cost-for-an-agency', 'ecommerce-seo'].map(pick).filter((a): a is Item => !!a);
const top = chosen.length === 4 ? chosen : all.slice(0, 4);
const [featured, ...side] = top;

const pills = [
  { label: 'All articles', href: '#latest' },
  ...['ai-seo', 'local-seo', 'ecommerce-seo', 'shopify-seo', 'technical-seo', 'link-building', 'how-much-does-seo-cost-for-an-agency']
    .map(pick).filter((a): a is Item => !!a).map(a => ({ label: a.category, href: a.href })),
];

const role = 'AI SEO Specialist & Founder of Search Engine Xperts';

export const metadata: Metadata = {
  title: 'SEO Blog: Local SEO, Ecommerce & AI Search Guides | Search Engine Xperts',
  description: 'Practical SEO articles and guides by Arslan Tariq on local SEO, ecommerce SEO, technical SEO, link building, SEO pricing and AI search visibility.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: { type: 'website', url: `${siteUrl}/blog`, siteName: 'Search Engine Xperts', title: 'SEO Blog | Search Engine Xperts', description: 'Practical SEO articles and guides on local SEO, ecommerce SEO, technical SEO and AI search visibility.' },
};

const Calendar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>;
const Clock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;

// "Arslan Tariq in Local SEO" line used on the featured story and the side picks.
const ByLine = ({ a }: { a: Item }) => <span className="bx-byline"><b>{author.name}</b> in {a.category}</span>;

// Author row at the foot of every card: photo, name, role, calendar and date.
const AuthorRow = ({ a }: { a: Item }) => <div className="bx-author">
  <img src={author.photo} alt="" width="44" height="44" loading="lazy" />
  <span className="bx-author-name"><b>{author.name}</b>{role}</span>
  <span className="bx-date"><Calendar /><time dateTime={a.published}>{formatDate(a.published)}</time></span>
</div>;

function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/blog#page`,
        url: `${siteUrl}/blog`,
        name: 'SEO Blog',
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: all.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${siteUrl}${a.href}`, name: a.title })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'SEO Blog', item: `${siteUrl}/blog` },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

export default function BlogIndex() {
  return <div className="bx">
    <Schema />

    {/* ---------- title + topic pills ---------- */}
    <div className="wrap bx-head">
      <nav aria-label="Breadcrumb" className="crumbs"><HomeCrumb /><span aria-hidden="true">/</span><span aria-current="page">SEO Blog</span></nav>
      <h1>SEO Blog</h1>
      <p className="bx-dek">Practical answers to your SEO, local search and AI visibility questions.</p>
      <nav className="bx-pills" aria-label="Topics">
        {pills.map(p => <a key={p.href} href={p.href}>{p.label}</a>)}
      </nav>
    </div>

    {/* ---------- featured story + three picks ---------- */}
    <section className="wrap bx-feature" aria-label="Featured articles">
      <a href={featured.href} className="bx-hero">
        <img src={featured.image.src} alt="" width={featured.image.width} height={featured.image.height} fetchPriority="high" />
        <h2>{featured.title}</h2>
        <ByLine a={featured} />
        <p>{featured.dek}</p>
        <span className="bx-tag">{featured.category}</span>
      </a>
      <ul className="bx-side">
        {side.map(a => <li key={a.href}>
          <a href={a.href}>
            <div>
              <h3>{a.title}</h3>
              <ByLine a={a} />
              <p>{a.dek}</p>
              <span className="bx-tag">{a.category}</span>
            </div>
            <img src={a.image.src} alt="" width="96" height="96" loading="lazy" />
          </a>
        </li>)}
      </ul>
    </section>

    {/* ---------- every article ---------- */}
    <section id="latest" className="bx-band" aria-labelledby="latest-title">
      <div className="wrap">
        <h2 id="latest-title" className="bx-title">Latest</h2>
        <div className="bx-grid">
          {all.map(a => <a key={a.href} href={a.href} className="bx-card">
            <img src={a.image.src} alt="" width={a.image.width} height={a.image.height} loading="lazy" />
            <div className="bx-card-body">
              <span className="bx-meta"><span>{a.category}</span><span><Clock /> {a.readTime.replace(' read', '')}</span></span>
              <h3>{a.title}</h3>
              <p>{a.dek}</p>
              <AuthorRow a={a} />
            </div>
          </a>)}
        </div>
      </div>
    </section>

    {/* ---------- guides as topic tiles ---------- */}
    <section className="wrap bx-topics" aria-labelledby="topics-title">
      <h2 id="topics-title" className="bx-title">SEO Guides</h2>
      <div className="bx-tiles">
        {guides.map((g, i) => <a key={g.slug} href={`/learn-seo/${g.slug}`} className="bx-tile">
          <span className={`bx-tile-art t${i % 4}`}><span>{g.category}</span></span>
          <h3>{g.title}</h3>
          <ByLine a={{ ...g, href: '' }} />
          <p>{g.dek}</p>
        </a>)}
      </div>
      <a className="bx-more" href="/learn-seo">See all guides</a>
    </section>
  </div>;
}

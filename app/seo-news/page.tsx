import type { Metadata } from 'next';
import { getAuthor, siteUrl } from '../../components/blog/posts';
import { HomeCrumb } from '../../components/home-crumb';
import { TopicFilter } from '../../components/blog/topic-filter';
import { newsOrder } from '../../components/news/articles';
import { newsPublished, newsTopics, type NewsMeta } from '../../components/news/news-meta';
import { formatUpdateDate, updatePath, updates } from '../../components/algo/updates';

// SEO news collection page (/seo-news), laid out like the blog index: topic pills that filter the story grid,
// a featured story with three picks beside it, every story in a "Latest" grid, then the latest Google updates.
// Stories live in components/news; new ones appear here automatically, newest first.

const url = `${siteUrl}/seo-news`;
const title = 'Latest SEO News: Google Updates, AI Search & Search Console';
const description = 'The latest SEO news, explained: Google core updates, AI Mode and AI Overviews, ChatGPT search, Search Console changes and local SEO, with what to do next.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Search Engine Xperts', title: 'Latest SEO News | Search Engine Xperts', description, images: [{ url: `${siteUrl}/images/news/${newsOrder[0].slug}.png`, width: 1600, height: 900 }] },
  twitter: { card: 'summary_large_image', title: 'Latest SEO News | Search Engine Xperts', description },
};

const href = (m: NewsMeta) => `/seo-news/${m.slug}`;
const img = (m: NewsMeta) => `/images/news/${m.slug}.png`;
const topics = newsTopics.filter(t => newsOrder.some(m => m.topic === t));
const [featured, ...side] = newsOrder.slice(0, 4);
const author = getAuthor(undefined);
const latestUpdates = updates.slice(0, 3);

const Calendar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>;

// "Google Updates · Nov 24, 2026" line on the featured story and side picks.
const ByLine = ({ m }: { m: NewsMeta }) => <span className="bx-byline"><b>{m.topic}</b> · <time dateTime={m.date}>{formatUpdateDate(m.date)}</time></span>;

function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: 'SEO News',
        description,
        dateModified: newsPublished,
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: newsOrder.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `${siteUrl}${href(m)}`, name: m.title })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'SEO News', item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

export default function SeoNews() {
  return <div className="bx nx">
    <Schema />

    <TopicFilter
      head={<>
        <nav aria-label="Breadcrumb" className="crumbs"><HomeCrumb /><span aria-hidden="true">/</span><span aria-current="page">SEO News</span></nav>
        <h1>SEO News</h1>
        <p className="bx-dek">The search changes that matter for your traffic, explained in plain English with what to do next.</p>
      </>}
      topics={topics}
      allLabel="All news"
      cards={newsOrder.map(m => ({ key: m.slug, category: m.topic, node: <a href={href(m)} className="bx-card">
        <img src={img(m)} alt="" width="1600" height="900" loading="lazy" />
        <div className="bx-card-body">
          <span className="bx-meta"><span>{m.topic}</span><span><time dateTime={m.date}>{formatUpdateDate(m.date)}</time></span></span>
          <h3>{m.title}</h3>
          <p>{m.dek}</p>
          <div className="bx-author">
            <img src={author.photo} alt="" width="44" height="44" loading="lazy" />
            <span className="bx-author-name"><b>{author.name}</b>{author.headline}</span>
            <span className="bx-date"><Calendar /><time dateTime={newsPublished}>{formatUpdateDate(newsPublished)}</time></span>
          </div>
        </div>
      </a> }))}
    >
      {/* ---------- featured story + three picks ---------- */}
      <section className="wrap bx-feature" aria-label="Top stories">
        <a href={href(featured)} className="bx-hero">
          <img src={img(featured)} alt="" width="1600" height="900" fetchPriority="high" />
          <h2>{featured.title}</h2>
          <ByLine m={featured} />
          <p>{featured.dek}</p>
          <span className="bx-tag">{featured.topic}</span>
        </a>
        <ul className="bx-side">
          {side.map(m => <li key={m.slug}>
            <a href={href(m)}>
              <div>
                <h3>{m.title}</h3>
                <ByLine m={m} />
                <p>{m.dek}</p>
                <span className="bx-tag">{m.topic}</span>
              </div>
              <img src={img(m)} alt="" width="96" height="96" loading="lazy" />
            </a>
          </li>)}
        </ul>
      </section>
    </TopicFilter>

    {/* ---------- latest Google updates ---------- */}
    <section className="wrap nx-updates" aria-labelledby="updates-title">
      <h2 id="updates-title" className="bx-title">Latest Google Updates</h2>
      <p className="bx-sub">Every confirmed ranking update, with dates, rollout times and what to do.</p>
      <ul>
        {latestUpdates.map(u => <li key={u.id}>
          <a href={updatePath(u)}>
            <span className="nx-when"><b>{formatUpdateDate(u.date).split(',')[0]}</b>{u.date.slice(0, 4)}</span>
            <span className="nx-what"><b>{u.name}</b><small>{u.status === 'Announced' ? 'Announced, not live yet' : u.rollout ? `Rollout: ${u.rollout}` : u.type}</small></span>
            <i aria-hidden="true">→</i>
          </a>
        </li>)}
      </ul>
      <a className="bx-more" href="/google-algorithm-updates">See every Google algorithm update</a>
    </section>
  </div>;
}

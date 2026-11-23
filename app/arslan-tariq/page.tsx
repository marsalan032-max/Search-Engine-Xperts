import type { Metadata } from 'next';
import { author, formatDate, posts, siteUrl } from '../../components/blog/posts';
import { guides } from '../../components/learn/guides';

// Author page (/arslan-tariq), in the style of a blog author page:
// a brand band with the photo on the left and the introduction on the right, then every article he has written.
// Articles are read from the blog posts and Learn SEO guides, so new ones appear here automatically.

const url = `${siteUrl}/arslan-tariq`;
const email = 'arslantariq082@gmail.com';
const linkedin = author.profiles.find(p => p.label === 'LinkedIn')?.href ?? 'https://www.linkedin.com/in/seo-expert-arslan-tariq/';
const tagline = 'AI SEO Specialist | Helping Local Businesses Get 10x More Leads from Google, Maps & AI Search with My Proven AEO & GEO Strategy';

const articles = [
  ...posts.map(p => ({ ...p, href: `/blog/${p.slug}` })),
  ...guides.map(g => ({ ...g, href: `/learn-seo/${g.slug}` })),
].sort((a, b) => b.published.localeCompare(a.published));

export const metadata: Metadata = {
  title: 'Arslan Tariq, AI SEO Specialist | Search Engine Xperts',
  description: 'Arslan Tariq is an AI SEO specialist helping local businesses get more leads from Google, Google Maps and AI search. Read his latest SEO guides and articles.',
  alternates: { canonical: url },
  openGraph: {
    type: 'profile', url, siteName: 'Search Engine Xperts', firstName: 'Arslan', lastName: 'Tariq',
    title: 'Arslan Tariq, AI SEO Specialist',
    description: 'Helping local businesses get more leads from Google, Maps and AI search with AEO and GEO.',
    images: [{ url: `${siteUrl}${author.photo}`, width: 400, height: 400, alt: 'Arslan Tariq' }],
  },
  twitter: { card: 'summary', title: 'Arslan Tariq, AI SEO Specialist', description: 'Helping local businesses get more leads from Google, Maps and AI search.', images: [`${siteUrl}${author.photo}`] },
};

const LinkedInIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>;
const MailIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
const Clock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;

function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: 'Arslan Tariq, AI SEO Specialist',
        mainEntity: { '@id': `${siteUrl}/#arslan-tariq` },
        isPartOf: { '@id': `${siteUrl}/#website` },
        hasPart: articles.map(a => ({ '@type': 'Article', headline: a.title, url: `${siteUrl}${a.href}`, datePublished: a.published })),
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#arslan-tariq`,
        name: 'Arslan Tariq',
        jobTitle: 'AI SEO Specialist',
        description: tagline,
        url,
        image: `${siteUrl}${author.photo}`,
        worksFor: { '@id': `${siteUrl}/#organization` },
        knowsAbout: ['Search engine optimization', 'AI search optimization', 'Answer engine optimization (AEO)', 'Generative engine optimization (GEO)', 'Local SEO', 'Ecommerce SEO', 'Technical SEO'],
        sameAs: author.profiles.map(p => p.href),
      },
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Search Engine Xperts', url: `${siteUrl}/` },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Arslan Tariq', item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

export default function ArslanTariqPage() {
  return <>
    <Schema />

    {/* ---------- author band: photo left, introduction right ---------- */}
    <section className="pf-band" aria-labelledby="pf-title">
      <div className="wrap pf-band-grid">
        <div className="pf-photo">
          <img src={author.photo} alt="Arslan Tariq, AI SEO specialist and founder of Search Engine Xperts" width="400" height="400" fetchPriority="high" />
        </div>
        <div className="pf-intro">
          <p className="pf-hi">Hi, I’m</p>
          <h1 id="pf-title">Arslan Tariq</h1>
          <p className="pf-role">AI SEO Specialist &amp; Founder of <a href="/">Search Engine Xperts</a></p>
          <p className="pf-bio">I help local businesses get 10x more leads from Google, Maps &amp; AI search with my proven AEO &amp; GEO strategy. With 7+ years in SEO, I also help eCommerce brands grow organic traffic, rankings and sales through data-driven SEO.</p>
          <div className="pf-foot">
            <div className="pf-count"><b>{articles.length}</b><span>Total<br />articles</span></div>
            <div className="pf-count"><b>7+</b><span>Years<br />in SEO</span></div>
            <div className="pf-follow">
              <span>Follow the expert:</span>
              <a href={linkedin} target="_blank" rel="noopener noreferrer me" aria-label="Arslan Tariq on LinkedIn"><LinkedInIcon /></a>
              <a href={`mailto:${email}`} aria-label={`Email Arslan at ${email}`}><MailIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ---------- articles ---------- */}
    <section className="wrap pf-articles" aria-labelledby="articles-title">
      <h2 id="articles-title">Recent Articles From Arslan</h2>
      <p className="pf-sub">The latest SEO guides and articles written by Arslan.</p>
      <div className="pf-grid">
        {articles.map(a => <a key={a.href} href={a.href} className="pf-card">
          <img src={a.image.src} alt="" width={a.image.width} height={a.image.height} loading="lazy" />
          <div className="pf-card-body">
            <span className="pf-meta"><span>{a.category}</span><span><Clock /> {a.readTime.replace(' read', '')}</span></span>
            <h3>{a.title}</h3>
            <p>{a.dek}</p>
            <div className="pf-by">
              <img src={author.photo} alt="" width="36" height="36" loading="lazy" />
              <span><b>Arslan Tariq</b>AI SEO Specialist</span>
              <time dateTime={a.published}>{formatDate(a.published)}</time>
            </div>
          </div>
        </a>)}
      </div>
    </section>
  </>;
}

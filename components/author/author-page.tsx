import type { Metadata } from 'next';
import { formatDate, getAuthor, posts, siteUrl } from '../blog/posts';
import type { AuthorKey } from '../blog/authors';
import { guides } from '../learn/guides';

// Author page template (/arslan-tariq, /saboor-nasir…): a navy band with the photo on the left and the
// introduction on the right, then every article the author has written. Articles are read from the blog posts
// and Learn SEO guides (matched on their `author`), so new ones appear here automatically.

export const articlesBy = (key: AuthorKey) => [
  ...posts.map(p => ({ ...p, href: `/blog/${p.slug}` })),
  ...guides.map(g => ({ ...g, href: `/learn-seo/${g.slug}` })),
].filter(a => (a.author ?? 'arslan') === key)
  .sort((a, b) => b.published.localeCompare(a.published));

export function authorMetadata(key: AuthorKey): Metadata {
  const a = getAuthor(key);
  const url = `${siteUrl}${a.url}`;
  const title = `${a.name}, ${a.shortTitle}`;
  const image = `${siteUrl}${a.photo}`;
  return {
    title: `${title} | Search Engine Xperts`,
    description: a.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile', url, siteName: 'Search Engine Xperts', firstName: a.firstName, lastName: a.lastName,
      title, description: a.metaDescription,
      images: [{ url: image, width: a.photoSize, height: a.photoSize, alt: a.name }],
    },
    twitter: { card: 'summary', title, description: a.metaDescription, images: [image] },
  };
}

const LinkedInIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>;
const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
const LinkIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>;
const Clock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;

export function AuthorPage({ authorKey }: { authorKey: AuthorKey }) {
  const a = getAuthor(authorKey);
  const url = `${siteUrl}${a.url}`;
  const articles = articlesBy(authorKey);
  const follow = [
    ...a.profiles.map(p => ({ href: p.href, label: `${a.name} on ${p.label}`, icon: p.label === 'LinkedIn' ? <LinkedInIcon /> : <LinkIcon />, external: true })),
    ...(a.email ? [{ href: `mailto:${a.email}`, label: `Email ${a.firstName} at ${a.email}`, icon: <MailIcon />, external: false }] : []),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: `${a.name}, ${a.shortTitle}`,
        mainEntity: { '@id': `${siteUrl}/#${a.id}` },
        isPartOf: { '@id': `${siteUrl}/#website` },
        ...(articles.length ? { hasPart: articles.map(p => ({ '@type': 'Article', headline: p.title, url: `${siteUrl}${p.href}`, datePublished: p.published })) } : {}),
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#${a.id}`,
        name: a.name,
        jobTitle: a.jobTitle,
        description: a.tagline,
        url,
        image: `${siteUrl}${a.photo}`,
        worksFor: { '@id': `${siteUrl}/#organization` },
        knowsAbout: a.knowsAbout,
        ...(a.profiles.length ? { sameAs: a.profiles.map(p => p.href) } : {}),
      },
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Search Engine Xperts', url: `${siteUrl}/` },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: a.name, item: url },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

    {/* ---------- author band: photo left, introduction right ---------- */}
    <section className="pf-band" aria-labelledby="pf-title">
      <div className="wrap pf-band-grid">
        <div className="pf-photo">
          <img src={a.photo} alt={`${a.name}, ${a.jobTitle}`} width={a.photoSize} height={a.photoSize} fetchPriority="high" />
        </div>
        <div className="pf-intro">
          <p className="pf-hi">Hi, I’m</p>
          <h1 id="pf-title">{a.name}</h1>
          <p className="pf-role">{a.headline.replace(/Search Engine Xperts$/, '')}<a href="/">Search Engine Xperts</a></p>
          <p className="pf-bio">{a.intro}</p>
          {follow.length > 0 && <div className="pf-foot">
            <div className="pf-follow">
              <span>Follow the expert:</span>
              {follow.map(f => <a key={f.href} href={f.href} aria-label={f.label} {...(f.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}>{f.icon}</a>)}
            </div>
          </div>}
        </div>
      </div>
    </section>

    {/* ---------- articles ---------- */}
    <section className="wrap pf-articles" aria-labelledby="articles-title">
      <h2 id="articles-title">Recent Articles From {a.firstName}</h2>
      {articles.length > 0 ? <>
        <p className="pf-sub">The latest SEO guides and articles written by {a.firstName}.</p>
        <div className="pf-grid">
          {articles.map(p => <a key={p.href} href={p.href} className="pf-card">
            <img src={p.image.src} alt="" width={p.image.width} height={p.image.height} loading="lazy" />
            <div className="pf-card-body">
              <span className="pf-meta"><span>{p.category}</span><span><Clock /> {p.readTime.replace(' read', '')}</span></span>
              <h3>{p.title}</h3>
              <p>{p.dek}</p>
              <div className="pf-by">
                <img src={a.photo} alt="" width="36" height="36" loading="lazy" />
                <span><b>{a.name}</b>{a.shortTitle}</span>
                <time dateTime={p.published}>{formatDate(p.published)}</time>
              </div>
            </div>
          </a>)}
        </div>
      </> : <div className="pf-empty">
        <p>{a.firstName}’s first articles are on the way.</p>
        <span>In the meantime, read the latest from the Search Engine Xperts team.</span>
        <a className="btn btn-primary" href="/blog">Read the SEO blog</a>
      </div>}
    </section>
  </>;
}

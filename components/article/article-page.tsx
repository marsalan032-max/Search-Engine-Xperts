import type { Metadata } from 'next';
import type { Post } from '../blog/types';
import { author, formatDate, siteUrl } from '../blog/posts';
import { TableOfContents } from '../blog/toc';
import { AskAI, AskAIButton } from '../blog/ask-ai';
import { articleChunks } from '../blog/chunks';
import { brandTitle } from '../seo-title';

// Shared article template for blog posts (/blog/<slug>) and Learn SEO guides (/learn-seo/<slug>).
// `section` decides the breadcrumb, the canonical path and the schema type.

export type ArticleSection = {
  name: string;                         // breadcrumb label, e.g. "SEO Blog"
  path: string;                         // e.g. "/blog"
  schemaType: 'BlogPosting' | 'Article';
};

export const articleUrl = (section: ArticleSection, post: Post) => `${siteUrl}${section.path}/${post.slug}`;

export function articleMetadata(section: ArticleSection, post: Post): Metadata {
  const url = articleUrl(section, post);
  return {
    title: brandTitle(post.metaTitle),
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: author.name, url: `${siteUrl}/#about` }],
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: 'article', url, siteName: 'Search Engine Xperts',
      title: post.title, description: post.dek,
      publishedTime: post.published, modifiedTime: post.modified, authors: [author.name],
      images: [{ url: `${siteUrl}${post.image.src}`, width: post.image.width, height: post.image.height, alt: post.image.alt }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.dek, images: [`${siteUrl}${post.image.src}`] },
  };
}

const Icon = ({ d }: { d: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
);
const linkedin = 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z';
const xLogo = 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z';

function Share({ url, title }: { url: string; title: string }) {
  return <span className="share">
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Icon d={linkedin} /></a>
    <a href={`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><Icon d={xLogo} /></a>
  </span>;
}

const defaultCta = {
  eyebrow: 'Free SEO audit',
  heading: 'Want a budget built on your numbers?',
  text: 'Get a no-commitment audit with a scope and estimate based on your market, competitors and the gap to close.',
  label: 'Get my free audit',
  href: '/#contact',
};

const defaultNext = [
  { kicker: 'Service', title: 'AI SEO Services', text: 'Get cited in Google AI Overviews, ChatGPT and Perplexity on top of proven organic SEO.', href: '/ai-seo-services', label: 'Explore the service' },
  { kicker: 'Case studies', title: 'Real projects, real rankings', text: 'See what retainers produced for e-commerce, finance and local service clients.', href: '/#work', label: 'View results' },
  { kicker: 'Process', title: 'How an engagement runs', text: 'The five-step process from audit and strategy to authority building and reporting.', href: '/#process', label: 'See the process' },
];

export function ArticlePage({ post, section }: { post: Post; section: ArticleSection }) {
  const url = articleUrl(section, post);
  const { Body } = post;
  const cta = post.cta ?? defaultCta;
  const next = post.next ?? defaultNext;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': section.schemaType,
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        image: `${siteUrl}${post.image.src}`,
        datePublished: post.published,
        dateModified: post.modified,
        mainEntityOfPage: url,
        author: { '@id': `${siteUrl}/#arslan-tariq` },
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#arslan-tariq`,
        name: author.name,
        jobTitle: author.jobTitle,
        url: `${siteUrl}/#about`,
        image: `${siteUrl}${author.photo}`,
        worksFor: { '@id': `${siteUrl}/#organization` },
        ...(author.profiles.length ? { sameAs: author.profiles.map(p => p.href) } : {}),
      },
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Search Engine Xperts', url: `${siteUrl}/` },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: section.name, item: `${siteUrl}${section.path}` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      },
    ],
  };

  const share = <Share url={url} title={post.title} />;

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <article className="wrap post-wrap">
      <div className="post-grid">
        <div className="post-main">
          <div className="post-header">
            <nav aria-label="Breadcrumb" className="crumbs">
              <a href="/">Home</a><span aria-hidden="true">/</span>
              <a href={section.path}>{section.name}</a><span aria-hidden="true">/</span>
              <span aria-current="page">{post.category}</span>
            </nav>
            <p className="eyebrow">{post.eyebrow}</p>
            <h1>{post.title}</h1>
            <p className="dek">{post.dek}</p>
            <div className="byline">
              <a href="#author" className="who">
                <img src={author.photo} alt="" width="48" height="48" />
                <span><b>{author.name}</b><small>{author.jobTitle}</small></span>
              </a>
              <div className="meta">
                <span><time dateTime={post.published}>{formatDate(post.published)}</time></span>
                {post.modified !== post.published && <span>Updated <time dateTime={post.modified}>{formatDate(post.modified)}</time></span>}
                <span>{post.readTime}</span>
                {share}
              </div>
            </div>
          </div>

          <figure className="post-figure">
            <img src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} fetchPriority="high" />
            {post.image.caption && <figcaption>{post.image.caption}</figcaption>}
          </figure>

          <aside aria-labelledby="takeaways-title" className="takeaways">
            <h2 id="takeaways-title">Key Takeaways</h2>
            <ul>{post.takeaways.map(t => <li key={t}>{t}</li>)}</ul>
          </aside>

          <details className="toc-mobile">
            <summary>In this article</summary>
            <TableOfContents items={post.toc} />
          </details>

          <div className="post-body">
            <Body />
            <section id="faq">
              <h2>Frequently asked questions</h2>
              <div className="post-faq">
                {post.faqs.map(f => <details key={f.question}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>)}
              </div>
            </section>
          </div>

          <div className="post-cta">
            <div>
              <p className="eyebrow">{cta.eyebrow}</p>
              <h2>{cta.heading}</h2>
              <p>{cta.text}</p>
            </div>
            <a href={cta.href} className="btn">{cta.label} <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <aside className="post-side">
          <TableOfContents items={post.toc} share={share} />
          {post.askSuggestions && <AskAIButton>Ask AI about this article</AskAIButton>}
          <a className="pref-source" href="https://www.google.com/preferences/source?q=searchenginexperts.com" target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">G</span>Add us as a preferred source on Google <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </article>

    <section id="author" aria-labelledby="author-title" className="post-author">
      <div className="wrap">
        <img src={author.photo} alt={`${author.name}, ${author.jobTitle}`} width="128" height="128" loading="lazy" />
        <div>
          <p className="eyebrow">About the author</p>
          <h2 id="author-title">{author.name}</h2>
          <p className="role">{author.jobTitle} at Search Engine Xperts</p>
          <p>{author.bio}</p>
          <div className="author-links">
            <a href="/#about" className="btn btn-primary">Read full bio <span aria-hidden="true">→</span></a>
            {author.profiles.map(p => <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer me" className="btn btn-ghost">{p.label}</a>)}
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="next-title" className="post-next">
      <div className="wrap">
        <p className="eyebrow">Keep exploring</p>
        <h2 id="next-title">Put this into practice</h2>
        <div className="next-grid">
          {next.map(n => <a key={n.href} href={n.href}><span className="kicker">{n.kicker}</span><b>{n.title}</b><span>{n.text}</span><i>{n.label} →</i></a>)}
        </div>
      </div>
    </section>

    {post.askSuggestions && <AskAI title={post.title} suggestions={post.askSuggestions} chunks={articleChunks(post)} headings={Object.fromEntries(post.toc.map(t => [t.id, t.label]))} />}
  </>;
}

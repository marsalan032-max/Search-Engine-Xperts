import type { Metadata } from 'next';
import { siteUrl } from '../../components/blog/posts';
import { brandTitle } from '../../components/seo-title';
import { HomeCrumb } from '../../components/home-crumb';
import { HeroArt } from '../../components/algo/hero-art';
import { UpdateTimeline } from '../../components/algo/timeline';
import { dashboardUrl, formatUpdateDate, updates } from '../../components/algo/updates';

// /google-algorithm-updates: a collection page of every confirmed Google ranking update, newest first.
// The list lives in components/algo/updates.ts; add new updates there and this page, its schema and the sitemap follow.

const url = `${siteUrl}/google-algorithm-updates`;
const title = 'Google Algorithm Updates: Full History & 2026 Timeline';
const description = 'Every confirmed Google algorithm update, newest first: the November 2026 core update, the announced December 2026 update, spam updates and landmark changes.';
const image = `${siteUrl}/images/learn/google-algorithm-updates.png`;

export const metadata: Metadata = {
  title: brandTitle(title),
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Search Engine Xperts', title, description, images: [{ url: image, width: 1600, height: 900 }] },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
};

const next = updates.find(u => u.status === 'Announced');
const latest = updates.find(u => u.status === 'Complete')!;
const thisYear = updates.filter(u => u.date.startsWith('2026') && u.status !== 'Announced').length;

const steps = [
  { h: 'Wait for the rollout to finish', p: 'Rankings move around while an update rolls out. Check Google’s Search Status Dashboard and judge the impact only once the update is marked complete.' },
  { h: 'Compare like-for-like weeks', p: 'In Search Console, compare a full week after the rollout ended with a week before it started. Look at clicks and average position, not one day’s numbers.' },
  { h: 'Find what actually moved', p: 'Filter by page and query. A drop across the whole site points to quality or trust; a drop on a few pages usually means competitors now answer those searches better.' },
  { h: 'Improve the pages, not the tricks', p: 'Review the affected pages against Google’s people-first content guidance: first-hand experience, clear answers, accurate facts and a good page experience. Gains often show at the next core update.' },
];

const kinds = [
  { k: 'Core updates', p: 'Broad changes to how Google assesses relevance and quality across all sites. They are not aimed at any one type of site, and there is no single fix for a drop.' },
  { k: 'Spam updates', p: 'Improvements to SpamBrain and other systems that catch pages breaking Google’s spam policies, such as link schemes, scaled content abuse and cloaking.' },
  { k: 'Helpful content & reviews', p: 'Systems that reward original, people-first content and in-depth reviews. Since March 2024 the helpful content system is part of the core ranking systems.' },
  { k: 'Page experience', p: 'Signals about how a page works for visitors: Core Web Vitals, HTTPS, mobile-friendliness and no intrusive pop-ups.' },
];

const faqs = [
  { q: 'What is a Google algorithm update?', a: 'A change to the systems Google uses to rank search results. Google makes thousands of small changes every year and only announces the larger ones that can noticeably shift rankings, such as core updates and spam updates.' },
  { q: 'What was the latest Google algorithm update?', a: `The latest completed update is the ${latest.name}, which started on ${formatUpdateDate(latest.date)} and took ${latest.rollout}. ${next ? `Google has also announced the ${next.name}, scheduled for December 2026 with no start date yet.` : ''}`.trim() },
  { q: 'How often does Google release core updates?', a: 'In recent years, three or four times a year: three in 2025, and four in 2026 once the announced December update rolls out. Google also makes smaller core updates throughout the year without announcing them.' },
  { q: 'How long does an algorithm update take to roll out?', a: 'Most core updates finish in about two weeks. On Google’s dashboard, rollouts range from under a day (the March 2026 spam update) to 45 days (the March 2024 core update).' },
  { q: 'My traffic dropped after an update. What should I do?', a: 'Wait until the rollout is complete, then compare a week after it with a week before it in Search Console. Find which pages and queries lost visibility, and improve those pages so they answer the search better than the pages now ranking. Avoid quick fixes like mass-deleting content or buying links.' },
  { q: 'Can a site recover from a core update?', a: 'Yes. Improvements are often reflected at the next core update, though smaller, unannounced updates can also bring gains in between. Recovery depends on the pages genuinely becoming more helpful, not on technical tweaks alone.' },
];

function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url, name: title, description,
        isPartOf: { '@type': 'WebSite', name: 'Search Engine Xperts', url: `${siteUrl}/` },
        primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1600, height: 900 },
        mainEntity: {
          '@type': 'ItemList',
          itemListOrder: 'https://schema.org/ItemListOrderDescending',
          numberOfItems: updates.length,
          itemListElement: updates.map((u, i) => ({ '@type': 'ListItem', position: i + 1, name: u.name, url: `${url}#${u.id}` })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Google Algorithm Update', item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

export default function GoogleAlgorithmUpdates() {
  return <>
    <Schema />
    <section className="wrap ga-hero">
      <nav aria-label="Breadcrumb" className="crumbs"><HomeCrumb /><span aria-hidden="true">/</span><span aria-current="page">Google Algorithm Update</span></nav>
      <div className="ga-banner">
        <div className="ga-banner-copy">
          <h1>Google Algorithm Update</h1>
          <p className="ga-banner-dek">Every confirmed change to how Google ranks websites, from the latest core update back to Panda. Each update shows the official start date, how long it took to roll out and what it changed.</p>
          <div className="ga-hero-cta">
            <a href="#updates" className="btn ga-btn-light">See all updates <span aria-hidden="true">↓</span></a>
            <a href="#impact" className="btn ga-btn-outline">Was my site affected?</a>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>

    <section className="wrap ga-glance" aria-label="At a glance">
      <a href={`#${latest.id}`} className="ga-stat">
        <span className="kicker">Latest update</span>
        <b>{latest.name}</b>
        <span>Rolled out {formatUpdateDate(latest.date)}, took {latest.rollout}</span>
      </a>
      {next && <a href={`#${next.id}`} className="ga-stat is-next">
        <span className="kicker">Coming next</span>
        <b>{next.name}</b>
        <span>Announced {formatUpdateDate(next.date)}, release in December</span>
      </a>}
      <div className="ga-stat">
        <span className="kicker">Confirmed in 2026</span>
        <b>{thisYear} ranking updates</b>
        <span>Core, spam and Discover updates so far</span>
      </div>
    </section>

    <section className="ga-band" id="updates" aria-labelledby="updates-title">
      <div className="wrap">
        <p className="eyebrow">Update history</p>
        <h2 className="hub-h2" id="updates-title">Every Google algorithm update, newest first</h2>
        <p className="ga-sub">Filter by type or jump to a year. Dates from December 2021 onward match Google’s <a href={dashboardUrl} rel="noopener">Search Status Dashboard</a>; earlier entries are the landmark updates Google announced before the dashboard existed.</p>
        <UpdateTimeline updates={updates} />
      </div>
    </section>

    <section className="wrap ga-section" aria-labelledby="kinds-title">
      <p className="eyebrow">Know the difference</p>
      <h2 className="hub-h2" id="kinds-title">The main types of Google update</h2>
      <div className="ga-kinds">
        {kinds.map(k => <div key={k.k}><h3>{k.k}</h3><p>{k.p}</p></div>)}
      </div>
    </section>

    <section className="wrap ga-section" id="impact" aria-labelledby="impact-title">
      <p className="eyebrow">After an update</p>
      <h2 className="hub-h2" id="impact-title">How to tell if an update affected your site</h2>
      <ol className="ga-steps">
        {steps.map((s, i) => <li key={s.h}><span className="hub-step">{String(i + 1).padStart(2, '0')}</span><div><h3>{s.h}</h3><p>{s.p}</p></div></li>)}
      </ol>
      <p className="ga-tools">Need a quick check? Run our free <a href="/seo-tools/seo-audit-tool">SEO audit tool</a> or the <a href="/seo-tools/technical-seo-checker">technical SEO checker</a> on the pages that dropped.</p>
    </section>

    <section className="wrap ga-section" id="faq" aria-labelledby="faq-title">
      <h2 className="hub-h2" id="faq-title">Frequently asked questions</h2>
      <div className="post-faq">
        {faqs.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
      </div>
    </section>

    <section className="wrap">
      <div className="post-cta ga-cta">
        <div>
          <p className="eyebrow">Hit by an update?</p>
          <h2>Get an expert review of your traffic drop</h2>
          <p>We’ll compare your data before and after the update and show you which pages to fix first. Free, no commitment.</p>
        </div>
        <a href="/#contact" className="btn">Get my free audit <span aria-hidden="true">→</span></a>
      </div>
    </section>
  </>;
}

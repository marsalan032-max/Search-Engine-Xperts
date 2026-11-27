import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { author, siteUrl } from '../../../components/blog/posts';
import { brandTitle } from '../../../components/seo-title';
import { HomeCrumb } from '../../../components/home-crumb';
import { guidance } from '../../../components/algo/guidance';
import { UpdateCard } from '../../../components/algo/update-card';
import {
  dashboardUrl, endDate, formatUpdateDate, getUpdate, neighbours, onDashboard, sameType, typeLabels, typeName, updatePath, updates,
  type AlgoUpdate,
} from '../../../components/algo/updates';

// /google-algorithm-updates/<id>: one page per update in components/algo/updates.ts.
// Facts come from the data file; the "what this type of update means" and "what to do" copy from components/algo/guidance.ts.

type Props = { params: Promise<{ id: string }> };

const reviewed = '2026-11-27';            // when the update pages were last checked against Google's dashboard
const image = `${siteUrl}/images/learn/google-algorithm-updates.png`;

export const dynamicParams = false;       // unknown ids return 404
export const generateStaticParams = () => updates.map(u => ({ id: u.id }));

const metaTitle = (u: AlgoUpdate) => `${u.name}: ${u.status === 'Announced' ? 'What Google Announced' : 'Dates & What Changed'}`;
function metaDescription(u: AlgoUpdate) {
  const end = endDate(u);
  const when = u.status === 'Announced' ? `Announced ${formatUpdateDate(u.date)}.` : `Started ${formatUpdateDate(u.date)}${end ? `, completed ${formatUpdateDate(end)}` : ''}.`;
  const first = u.summary.match(/^.*?\.(\s|$)/)?.[0].trim() ?? u.summary;
  const text = `${u.name}: ${when} ${first}`;
  return text.length <= 158 ? text : `${text.slice(0, 155).replace(/\s+\S*$/, '')}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = getUpdate((await params).id);
  if (!u) return {};
  const url = `${siteUrl}${updatePath(u)}`;
  const title = metaTitle(u);
  const description = metaDescription(u);
  return {
    title: brandTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, siteName: 'Search Engine Xperts', title, description, images: [{ url: image, width: 1600, height: 900 }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

function faqsFor(u: AlgoUpdate) {
  const end = endDate(u);
  const list: { q: string; a: string }[] = [];
  if (u.status === 'Announced') {
    list.push({ q: `When will the ${u.name} start?`, a: `Google announced it on ${formatUpdateDate(u.date)} and said it is scheduled for release in December 2026, without giving a start date. Google will confirm the release on its Search Status Dashboard when the rollout begins.` });
  } else {
    list.push({ q: `When did the ${u.name} start?`, a: `It started on ${formatUpdateDate(u.date)}.${end ? ` Google marked it complete on ${formatUpdateDate(end)}.` : ''}` });
    if (u.rollout) list.push({ q: `How long did the ${u.name} take to roll out?`, a: `${u.rollout}${onDashboard(u) ? ', according to Google’s Search Status Dashboard' : ''}.` });
  }
  list.push({ q: `What did the ${u.name} change?`, a: u.summary });
  const g = guidance[u.type];
  list.push({ q: `What should I do if the ${u.name} affected my site?`, a: `${g.steps[0].p} ${g.steps[1].p}` });
  return list;
}

export default async function UpdatePage({ params }: Props) {
  const u = getUpdate((await params).id);
  if (!u) notFound();
  const url = `${siteUrl}${updatePath(u)}`;
  const end = endDate(u);
  const { newer, older } = neighbours(u);
  const related = sameType(u).filter(x => x !== newer && x !== older).slice(0, 3);
  const g = guidance[u.type];
  const faqs = faqsFor(u);
  const label = typeLabels.find(t => t.type === u.type)!.label;
  const planned = u.release ? new Date(`${u.release}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : undefined;
  const dek = u.status === 'Announced'
    ? `Google announced this update on ${formatUpdateDate(u.date)}${planned ? ` for release in ${planned}` : ''}. Here is what Google has said so far and how to prepare.`
    : `${u.date < '2021-12-01' ? 'A landmark Google update' : 'A Google update'} that started on ${formatUpdateDate(u.date)}${end ? ` and finished on ${formatUpdateDate(end)}` : ''}. Here is what changed, who it affected and what to do if your traffic moved.`;

  const facts: [string, string][] = [
    ['Type', `${typeName(u.type)}${u.type === 'Core' || u.type === 'Spam' ? ' update' : ''}`],
    [u.status === 'Announced' ? 'Announced' : 'Started', formatUpdateDate(u.date)],
    ...(planned ? [['Planned release', planned] as [string, string]] : []),
    ...(end ? [['Completed', formatUpdateDate(end)] as [string, string]] : []),
    ...(u.rollout ? [['Rollout', u.rollout] as [string, string]] : []),
    ['Status', u.status === 'Announced' ? 'Not live yet' : u.status === 'Complete' ? 'Complete' : 'Confirmed by Google'],
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: u.name,
        description: metaDescription(u),
        image,
        datePublished: reviewed,
        dateModified: reviewed,
        mainEntityOfPage: url,
        about: { '@type': 'Thing', name: u.name },
        author: { '@id': `${siteUrl}/#${author.id}` },
        publisher: { '@id': `${siteUrl}/#organization` },
        isPartOf: { '@id': `${siteUrl}/google-algorithm-updates#page` },
      },
      { '@type': 'Person', '@id': `${siteUrl}/#${author.id}`, name: author.name, jobTitle: author.jobTitle, url: `${siteUrl}${author.url}`, worksFor: { '@id': `${siteUrl}/#organization` } },
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Search Engine Xperts', url: `${siteUrl}/` },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Google Algorithm Update', item: `${siteUrl}/google-algorithm-updates` },
          { '@type': 'ListItem', position: 3, name: u.name, item: url },
        ],
      },
      { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="wrap ga-hero">
      <nav aria-label="Breadcrumb" className="crumbs">
        <HomeCrumb /><span aria-hidden="true">/</span>
        <a href="/google-algorithm-updates">Google Algorithm Update</a><span aria-hidden="true">/</span>
        <span aria-current="page">{u.name}</span>
      </nav>
      <div className="ga-banner ga-banner-post">
        <div className="ga-banner-copy">
          <div className="ga-banner-tags">
            <span className="ga-chip">{typeName(u.type)}{u.type === 'Core' || u.type === 'Spam' ? ' update' : ''}</span>
            {u.status === 'Announced' && <span className="ga-chip is-next">Coming in December</span>}
          </div>
          <h1>{u.name}</h1>
          <p className="ga-banner-dek">{dek}</p>
        </div>
        <dl className="ga-facts">
          <p className="ga-facts-h">Key facts</p>
          {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{k === 'Status' ? <i className={u.status === 'Announced' ? 'ga-soon' : 'ga-done'}>{v}</i> : v}</dd></div>)}
          {onDashboard(u) && <a href={dashboardUrl} rel="noopener" className="ga-facts-src">Source: Google Search Status Dashboard ↗</a>}
        </dl>
      </div>
      <p className="ga-byline">
        <img src={author.photo} alt="" width="36" height="36" />
        <span>By <a href={author.url}>{author.name}</a>, {author.jobTitle}. Last reviewed <time dateTime={reviewed}>{formatUpdateDate(reviewed)}</time>.</span>
      </p>
    </section>

    <article className="wrap ga-post">
      <section aria-labelledby="what-h">
        <h2 id="what-h">What happened</h2>
        <p>{u.summary}</p>
        {u.details?.map(d => <p key={d}>{d}</p>)}
      </section>

      <section aria-labelledby="type-h">
        <h2 id="type-h">What {u.type === 'Other' ? 'this kind of change' : `a ${typeName(u.type).toLowerCase()} update`} means</h2>
        {g.about.map(p => <p key={p}>{p}</p>)}
      </section>

      <section aria-labelledby="todo-h">
        <h2 id="todo-h">{u.status === 'Announced' ? 'How to prepare' : 'What to do if your traffic changed'}</h2>
        <ol className="ga-steps ga-steps-post">
          {g.steps.map((s, i) => <li key={s.h}><span className="hub-step">{String(i + 1).padStart(2, '0')}</span><div><h3>{s.h}</h3><p>{s.p}</p></div></li>)}
        </ol>
        <p className="ga-tools">Check the pages that moved with our free <a href="/seo-tools/seo-audit-tool">SEO audit tool</a> and <a href="/seo-tools/technical-seo-checker">technical SEO checker</a>.</p>
      </section>

      <section aria-labelledby="faq-h">
        <h2 id="faq-h">Frequently asked questions</h2>
        <div className="post-faq">
          {faqs.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </div>
      </section>
    </article>

    <section className="ga-band ga-related" aria-labelledby="around-h">
      <div className="wrap">
        <h2 className="hub-h2" id="around-h">Updates before and after</h2>
        <div className="bx-grid ga-grid">
          {older && <UpdateCard u={older} kicker="Previous update" />}
          {newer && <UpdateCard u={newer} kicker="Next update" />}
        </div>
        {related.length > 0 && <>
          <h2 className="hub-h2 ga-related-h">More {label.toLowerCase()}</h2>
          <div className="bx-grid ga-grid">{related.map(r => <UpdateCard key={r.id} u={r} />)}</div>
        </>}
        <a className="bx-more" href="/google-algorithm-updates">See every Google algorithm update</a>
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

import type { Metadata } from 'next';
import { author, siteUrl } from '../../components/blog/posts';
import { modules } from '../../components/course/local-seo-modules';
import { ModuleArt } from '../../components/course/module-art';
import { CourseCta } from '../../components/course/course-cta';
import { HomeCrumb } from '../../components/home-crumb';

// Free Local SEO Course (/local-seo-course): hero with the course pitch and a map-pack illustration, the nine
// modules as illustrated cards (each opens its own page, app/local-seo-course/[module]), then a call-to-action
// banner. Module content lives in components/course.

const url = `${siteUrl}/local-seo-course`;
const title = 'Free Local SEO Course to Get Found on Google';
const description = 'A free local SEO course in nine practical modules: Google Business Profile, local website SEO, content, citations, reviews, technical SEO and reporting, with a checklist for each step.';

export const metadata: Metadata = {
  title: `${title} | Search Engine Xperts`,
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Search Engine Xperts', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

const Icon = {
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>,
  mic: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>,
  directions: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5 21.5 12 12 21.5 2.5 12z" /><path d="M9 14v-2.5a1.5 1.5 0 0 1 1.5-1.5H15m-2-2 2 2-2 2" /></svg>,
  save: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M6 3h12v18l-6-4.5L6 21z" /></svg>,
  web: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.8 3.2 2.8 14.8 0 18M12 3c-2.8 3.2-2.8 14.8 0 18" /></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12C11.2 17.6 6.4 12.8 0 12 6.4 11.2 11.2 6.4 12 0z" /></svg>,
};

// Map-pack illustration: browser window, search bar, "Position 1" badge and a business listing card.
function Illustration() {
  return <div className="lc-art" aria-hidden="true">
    <i className="lc-spark s1">{Icon.sparkle}</i><i className="lc-spark s2">{Icon.sparkle}</i>
    <i className="lc-spark s3">{Icon.sparkle}</i><i className="lc-spark s4">{Icon.sparkle}</i>
    <div className="lc-browser">
      <div className="lc-dots"><b /><b /><b /></div>
      <div className="lc-bar" />
      <div className="lc-cols"><span /><span /><span /></div>
    </div>
    <div className="lc-search">
      <i className="lc-ico">{Icon.search}</i><span className="lc-caret" /><i className="lc-mic">{Icon.mic}</i>
      <svg className="lc-cursor" viewBox="0 0 24 24"><path d="M5 2v18l5-5 3.5 7 3-1.5L13 13.5h7z" fill="#0B1437" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
    </div>
    <div className="lc-badge">Position 1 <small>↑24</small></div>
    <div className="lc-listing">
      <div className="lc-row"><span className="lc-line w1" /><span className="lc-line w2" /></div>
      <div className="lc-stars">{Icon.star}{Icon.star}{Icon.star}{Icon.star}{Icon.star}</div>
      <div className="lc-shop"><span className="lc-awning" /><span className="lc-door">{Icon.sparkle}</span></div>
      <div className="lc-row lc-chips"><span className="on" /><span /><span /><span /></div>
      <div className="lc-actions">
        <span>{Icon.phone}</span><span>{Icon.directions}</span><span>{Icon.save}</span><span>{Icon.web}</span>
      </div>
    </div>
  </div>;
}

function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${url}#course`,
        name: 'Free Local SEO Course',
        description,
        url,
        inLanguage: 'en',
        isAccessibleForFree: true,
        provider: { '@type': 'Organization', name: 'Search Engine Xperts', url: `${siteUrl}/` },
        instructor: { '@id': `${siteUrl}/#${author.id}` },
        offers: { '@type': 'Offer', category: 'Free', price: 0, priceCurrency: 'USD' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online' },
        syllabusSections: modules.map(m => ({ '@type': 'Syllabus', name: m.title, description: m.summary, url: `${url}/${m.slug}` })),
      },
      { '@type': 'Person', '@id': `${siteUrl}/#${author.id}`, name: author.name, url: `${siteUrl}${author.url}` },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Free Local SEO Course', item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

export default function LocalSeoCourse() {
  return <>
    <Schema />

    {/* ---------- hero ---------- */}
    <section className="lc-top" aria-labelledby="lc-title">
      <div className="wrap lc-top-grid">
        <div>
          <nav aria-label="Breadcrumb" className="lc-crumbs"><HomeCrumb /><span aria-hidden="true">/</span><span aria-current="page">Free Local SEO Course</span></nav>
          <h1 id="lc-title">Free Local SEO Course to Get Found on Google</h1>
          <p className="lc-intro">Learn how to turn more local searches into customers. Nine short, practical modules take you from your Google Business Profile to reviews, local content and reporting, with a checklist for every step.</p>
          <div className="lc-ctas">
            <a className="lc-btn" href={`/local-seo-course/${modules[0].slug}`}>Start the free course</a>
            <a className="lc-link" href="#modules">See all 9 modules</a>
          </div>
          <p className="lc-note">Free · No sign-up · Available now in English</p>
        </div>
        <Illustration />
      </div>
    </section>

    {/* ---------- modules ---------- */}
    <section id="modules" className="lc-overview" aria-labelledby="overview-title">
      <div className="wrap">
        <h2 id="overview-title" className="lc-h2">Course modules</h2>
        <p className="lc-sub">Nine short modules, in the order we work through local SEO with our own clients.</p>
        <ol className="lc-cards">
          {modules.map((m, i) => <li key={m.slug}>
            <a href={`/local-seo-course/${m.slug}`}>
              <ModuleArt index={i} className="lc-card-art" />
              <div className="lc-card-body">
                <span className="lc-card-meta"><span className="lc-num">Module {i + 1}</span>{m.lessons.length} lessons · Checklist</span>
                <h3>{m.title}</h3>
                <p>{m.summary}</p>
                <i>Start module →</i>
              </div>
            </a>
          </li>)}
        </ol>
      </div>
    </section>

    <CourseCta />
  </>;
}

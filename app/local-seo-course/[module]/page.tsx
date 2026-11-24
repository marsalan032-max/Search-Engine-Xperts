import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { author, siteUrl } from '../../../components/blog/posts';
import { modules } from '../../../components/course/local-seo-modules';
import { ModuleArt } from '../../../components/course/module-art';
import { CourseCta } from '../../../components/course/course-cta';
import { HomeCrumb } from '../../../components/home-crumb';

// One Local SEO Course module (/local-seo-course/<slug>): header with the cover illustration, the lessons and
// checklist beside the module list, previous/next module links, and the course call-to-action banner.

type Props = { params: Promise<{ module: string }> };

const courseUrl = `${siteUrl}/local-seo-course`;
const find = (slug: string) => modules.findIndex(m => m.slug === slug);

export const dynamicParams = false; // unknown modules return 404
export const generateStaticParams = () => modules.map(m => ({ module: m.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = find((await params).module);
  if (i < 0) return {};
  const m = modules[i];
  const url = `${courseUrl}/${m.slug}`;
  const title = `Module ${i + 1}: ${m.title}`;
  return {
    title: `${title} | Free Local SEO Course`,
    description: `${m.summary} Module ${i + 1} of the free Local SEO Course by Search Engine Xperts.`,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, siteName: 'Search Engine Xperts', title, description: m.summary },
  };
}

const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12l5 5L20 6" /></svg>;

export default async function CourseModule({ params }: Props) {
  const i = find((await params).module);
  if (i < 0) notFound();
  const m = modules[i];
  const prev = modules[i - 1];
  const next = modules[i + 1];
  const url = `${courseUrl}/${m.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        '@id': `${url}#module`,
        name: m.title,
        description: m.summary,
        url,
        inLanguage: 'en',
        isAccessibleForFree: true,
        learningResourceType: 'Course module',
        position: i + 1,
        isPartOf: { '@type': 'Course', '@id': `${courseUrl}#course`, name: 'Free Local SEO Course', url: courseUrl },
        author: { '@type': 'Person', '@id': `${siteUrl}/#${author.id}`, name: author.name, url: `${siteUrl}${author.url}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Free Local SEO Course', item: courseUrl },
          { '@type': 'ListItem', position: 3, name: `Module ${i + 1}`, item: url },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

    {/* ---------- module header ---------- */}
    <section className="lm-top" aria-labelledby="lm-title">
      <div className="wrap lm-top-grid">
        <div>
          <nav aria-label="Breadcrumb" className="lc-crumbs">
            <HomeCrumb /><span aria-hidden="true">/</span><a href="/local-seo-course">Free Local SEO Course</a><span aria-hidden="true">/</span><span aria-current="page">Module {i + 1}</span>
          </nav>
          <span className="lc-pill">Module {i + 1} of {modules.length}</span>
          <h1 id="lm-title">{m.title}</h1>
          <p className="lm-intro">{m.intro}</p>
          <p className="lm-meta">
            <img src={author.photo} alt="" width="28" height="28" />
            <span>By <a href={author.url}>{author.name}</a> · {m.lessons.length} lessons · Checklist</span>
          </p>
        </div>
        <ModuleArt index={i} className="lm-art" />
      </div>
    </section>

    {/* ---------- lessons ---------- */}
    <div className="wrap lc-course">
      <nav className="lc-toc" aria-label="Course modules">
        <p>Course modules</p>
        <ol>{modules.map((x, j) => <li key={x.slug}>
          <a href={`/local-seo-course/${x.slug}`} {...(j === i ? { 'aria-current': 'page' as const } : {})}><span>{j + 1}</span>{x.title}</a>
        </li>)}</ol>
      </nav>

      <article className="lm-body">
        {m.lessons.map((l, k) => <section key={l.title} className="lc-lesson">
          <span className="lm-step">Lesson {k + 1}</span>
          <h2>{l.title}</h2>
          <p>{l.text}</p>
          {l.points && <ul>{l.points.map(p => <li key={p}>{p}</li>)}</ul>}
        </section>)}

        <div className="lc-check">
          <b>Your checklist</b>
          <ul>{m.checklist.map(c => <li key={c}><span><Check /></span>{c}</li>)}</ul>
        </div>

        {m.further && <p className="lm-further"><a href={m.further.href}>{m.further.label} →</a></p>}

        <nav className="lm-pager" aria-label="Module navigation">
          {prev
            ? <a href={`/local-seo-course/${prev.slug}`}><small>← Previous: Module {i}</small><b>{prev.title}</b></a>
            : <a href="/local-seo-course"><small>← Back to</small><b>All course modules</b></a>}
          {next
            ? <a className="lm-next" href={`/local-seo-course/${next.slug}`}><small>Next: Module {i + 2} →</small><b>{next.title}</b></a>
            : <a className="lm-next" href="/local-seo-course"><small>Course complete</small><b>Back to all modules →</b></a>}
        </nav>
      </article>
    </div>

    <CourseCta />
  </>;
}

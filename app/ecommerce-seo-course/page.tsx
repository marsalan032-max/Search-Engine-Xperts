import type { Metadata } from 'next';
import { author, siteUrl } from '../../components/blog/posts';
import { ecomModules, isEcomReleased, releasedEcomModules } from '../../components/course/ecommerce-seo-modules';
import { EcomModuleArt } from '../../components/course/ecommerce-module-art';
import { CourseCta } from '../../components/course/course-cta';
import { CertificateArt } from '../../components/course/certificate-art';
import { testimonials } from '../../components/home/testimonials';
import { HomeCrumb } from '../../components/home-crumb';

// Advanced Ecommerce SEO Course (/ecommerce-seo-course): hero with a product rich result and product card,
// course at a glance, who it is for, the ten modules (all "coming soon" until releasedEcomModules is raised),
// the certificate, client reviews, a call-to-action banner and the FAQ. Same styles as the Local SEO Course.

const url = `${siteUrl}/ecommerce-seo-course`;
const title = 'Advanced Ecommerce SEO Course';
const metaTitle = 'Advanced Ecommerce SEO Course (Free) | Search Engine Xperts';
const description = 'A free, advanced ecommerce SEO course in ten modules: audits at scale, faceted navigation, category and product pages, structured data, Merchant Center, AI shopping and revenue tracking.';
const lessonCount = ecomModules.reduce((n, m) => n + m.lessons.length, 0);

export const metadata: Metadata = {
  title: metaTitle,
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Search Engine Xperts', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

const waitlist = `mailto:${author.email}?subject=${encodeURIComponent('Ecommerce SEO Course waitlist')}&body=${encodeURIComponent('Hi Arslan,\n\nPlease let me know when the Advanced Ecommerce SEO Course opens.\n\nName:\nStore URL and platform:\nRough number of products:\n')}`;

const glance = [
  { b: `${ecomModules.length} modules`, s: `${lessonCount} lessons with checklists` },
  { b: 'Advanced', s: 'Built for people who know the SEO basics' },
  { b: 'Free', s: 'No sign-up, no payment' },
  { b: 'Certificate', s: 'Ecommerce SEO Expert on completion' },
];

const forYou = [
  'In-house SEOs and marketers running stores with hundreds or thousands of products',
  'Agency teams and freelancers who manage ecommerce clients',
  'Store owners on Shopify, WooCommerce, Magento or a custom platform who already know the basics',
];
const before = [
  { t: 'Comfortable with SEO fundamentals', s: 'Keywords, title tags, internal links and Search Console should feel familiar.' },
  { t: 'Access to your store’s data', s: 'Search Console and GA4 at least; a crawler such as Screaming Frog helps for the audit module.' },
  { t: 'New to ecommerce SEO?', s: 'Read our free ecommerce SEO guide first, then come back for the advanced material.', href: '/learn-seo/ecommerce-seo', link: 'Read the guide' },
];

const outcomes = ['Win and keep ecommerce SEO clients as a freelancer or agency', 'Grow organic revenue for your own store', 'Stand out to brands hiring for ecommerce SEO'];

const faqs = [
  { q: 'When does the course open?', a: 'The modules are being written now and will be released one by one. Join the waitlist and we’ll email you when the first module goes live.' },
  { q: 'Is the course really free?', a: 'Yes. Like our Local SEO Course, every module will be free to read, with no sign-up and no payment.' },
  { q: 'Why is it called advanced?', a: 'It skips the basics and focuses on the problems large stores actually have: crawl control for faceted navigation, product data at scale, structured data and Merchant Center, JavaScript storefronts, migrations and measuring SEO in revenue.' },
  { q: 'Does it work for Shopify, WooCommerce and Magento?', a: 'Yes. The principles apply to every platform, and lessons call out where a platform handles something differently, such as Shopify’s collection URLs or WooCommerce’s product variations.' },
  { q: 'How do I get the Ecommerce SEO Expert certificate?', a: 'Finish all ten modules and their checklists, then request your certificate by email. Arslan reviews each request and sends the certificate to you.' },
  { q: 'Can you do my ecommerce SEO for me instead?', a: 'Yes. Search Engine Xperts runs ecommerce SEO for online stores. Request a free audit and we’ll show you which fixes would move revenue first.' },
];

const Icon = {
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>,
  quote: <svg viewBox="0 0 32 24" fill="currentColor"><path d="M0 24V14C0 6 4 1.6 12 0l1.4 3.4C9 4.8 7 7.6 6.8 11H12v13Zm19 0V14c0-8 4-12.4 12-14l1 3.4c-4.4 1.4-6.4 4.2-6.6 7.6H31v13Z" /></svg>,
};

const F = 'Poppins,sans-serif';
const Star = ({ x, y, s = 1, fill = '#F5A524' }: { x: number; y: number; s?: number; fill?: string }) =>
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0-8 2.4-2.6 8.2-2.1 3.8 1.8 5.1 7.6 0 4.6-5.1 7.6-3.8 1.8-8.2-2.1-2.4-2.6Z" fill={fill} />;

// Hero illustration: a search results page where the store's product result shows rating, price and stock
// (a product rich result), a product card with add-to-cart in front, and a cart badge. Decorative.
function Illustration() {
  return <svg className="ec-art" viewBox="0 0 520 440" fill="none" fontFamily={F} aria-hidden="true">
    <defs>
      <filter id="ec-sh" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0B1437" floodOpacity=".16" /></filter>
    </defs>

    {/* results page */}
    <g filter="url(#ec-sh)"><rect x="10" y="26" width="400" height="300" rx="18" fill="#fff" /></g>
    {[0, 1, 2].map(i => <circle key={i} cx={32 + i * 13} cy={46} r={4} fill="#E5EAF8" />)}
    <rect x="30" y="64" width="360" height="38" rx="19" fill="#F6F8FD" stroke="#E5EAF8" />
    <circle cx="52" cy="83" r="7" stroke="#345DF7" strokeWidth="2.4" /><path d="M57 88l5 5" stroke="#345DF7" strokeWidth="2.4" strokeLinecap="round" />
    <text x="72" y="88" fontSize="13" fill="#1B2342">trail running shoes</text>
    <rect x="197" y="75" width="1.6" height="16" fill="#345DF7" />

    <rect x="24" y="116" width="372" height="104" rx="14" fill="#F5F7FF" stroke="#345DF7" strokeWidth="1.6" />
    <text x="42" y="140" fontSize="10.5" fill="#69739A">yourstore.com › running › trail</text>
    <text x="42" y="162" fontSize="15" fontWeight="600" fill="#2A48C8">Trail Running Shoes for Men &amp; Women</text>
    {[0, 1, 2, 3, 4].map(s => <Star key={s} x={48 + s * 14} y={183} s={.68} />)}
    <text x="118" y="187" fontSize="11" fill="#4B5370">4.8 (1,248)</text>
    <text x="190" y="187" fontSize="11" fill="#4B5370">· From $89.00</text>
    <rect x="42" y="196" width="60" height="18" rx="9" fill="#E5F6EE" />
    <text x="72" y="209" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0E7A50">In stock</text>
    <text x="110" y="209" fontSize="10" fill="#69739A">Free delivery · 30-day returns</text>

    {[0, 1].map(i => <g key={i} transform={`translate(42 ${242 + i * 40})`}>
      <rect width="110" height="7" rx="3.5" fill="#E5EAF8" />
      <rect y="14" width={[230, 200][i]} height="10" rx="5" fill="#CDD8F8" />
    </g>)}

    {/* product card */}
    <g filter="url(#ec-sh)"><rect x="300" y="170" width="200" height="250" rx="18" fill="#fff" /></g>
    <rect x="316" y="186" width="168" height="108" rx="12" fill="#F1F4FD" />
    <path d="M346 266c18-2 30-10 44-22 6-5 14-6 20-2l18 10c10 6 22 8 36 8v14h-118Z" fill="#345DF7" />
    <path d="M346 266h118v8a6 6 0 0 1-6 6H352a6 6 0 0 1-6-6Z" fill="#0B1437" />
    <path d="M396 246l8 6M404 241l8 6M412 237l8 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <text x="316" y="316" fontSize="13" fontWeight="600" fill="#0B1437">Trail Runner Pro</text>
    {[0, 1, 2, 3, 4].map(s => <Star key={s} x={322 + s * 13} y={333} s={.6} />)}
    <text x="316" y="360" fontSize="17" fontWeight="700" fill="#0B1437">$89.00</text>
    {['#0B1437', '#345DF7', '#F5A524'].map((f, i) => <circle key={f} cx={426 + i * 18} cy={355} r={7} fill={f} stroke={i === 1 ? '#fff' : 'none'} strokeWidth="2" />)}
    <rect x="316" y="374" width="168" height="32" rx="16" fill="#345DF7" />
    <text x="400" y="395" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#fff">Add to cart</text>

    {/* cart badge */}
    <g transform="translate(456 92)">
      <circle r="30" fill="#0B1437" />
      <path d="M-14-8h4l4 16h14l4-11H-7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="-3" cy="13" r="2.4" fill="#fff" /><circle cx="9" cy="13" r="2.4" fill="#fff" />
      <circle cx="18" cy="-18" r="11" fill="#F5A524" stroke="#fff" strokeWidth="3" />
      <text x="18" y="-14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0B1437">3</text>
    </g>

    {/* rich result label */}
    <g transform="translate(272 102)">
      <rect width="112" height="30" rx="15" fill="#0B1437" />
      <path transform="translate(20 15) scale(.55)" d="M0-12C1.2-3.6 3.6-1.2 12 0 3.6 1.2 1.2 3.6 0 12-1.2 3.6-3.6 1.2-12 0-3.6-1.2-1.2-3.6 0-12Z" fill="#7D95FF" />
      <text x="34" y="20" fontSize="11.5" fontWeight="600" fill="#fff">Rich result</text>
    </g>

    {[[476, 26, 1], [24, 360, .8], [290, 18, .6]].map(([x, y, s], i) =>
      <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M0-12C1.2-3.6 3.6-1.2 12 0 3.6 1.2 1.2 3.6 0 12-1.2 3.6-3.6 1.2-12 0-3.6-1.2-1.2-3.6 0-12Z" fill="#C9D6FB" />)}
  </svg>;
}

function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${url}#course`,
        name: title,
        description,
        url,
        inLanguage: 'en',
        educationalLevel: 'Advanced',
        coursePrerequisites: 'Familiarity with SEO fundamentals: keywords, title tags, internal linking and Google Search Console.',
        isAccessibleForFree: true,
        provider: { '@type': 'Organization', name: 'Search Engine Xperts', url: `${siteUrl}/` },
        instructor: { '@id': `${siteUrl}/#${author.id}` },
        offers: { '@type': 'Offer', category: 'Free', price: 0, priceCurrency: 'USD' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online' },
        syllabusSections: ecomModules.map((m, i) => ({ '@type': 'Syllabus', name: m.title, description: m.summary, ...(isEcomReleased(i) ? { url: `${url}/${m.slug}` } : {}) })),
      },
      { '@type': 'Person', '@id': `${siteUrl}/#${author.id}`, name: author.name, url: `${siteUrl}${author.url}` },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

export default function EcommerceSeoCourse() {
  const open = releasedEcomModules > 0;
  return <>
    <Schema />

    {/* ---------- hero ---------- */}
    <section className="lc-top" aria-labelledby="lc-title">
      <div className="wrap lc-top-grid">
        <div>
          <nav aria-label="Breadcrumb" className="lc-crumbs"><HomeCrumb /><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
          <span className="ec-level">Advanced level · Coming soon</span>
          <h1 id="lc-title">{title}</h1>
          <p className="lc-intro">Go beyond the basics. Learn how to audit large catalogues, control faceted navigation, build category and product pages that rank, win rich results and Merchant Center listings, and prove SEO’s value in revenue.</p>
          <div className="lc-ctas">
            {open
              ? <a className="lc-btn" href={`/ecommerce-seo-course/${ecomModules[0].slug}`}>Start the course</a>
              : <a className="lc-btn" href={waitlist}>Join the waitlist</a>}
            <a className="lc-link" href="#modules">See all {ecomModules.length} modules</a>
          </div>
          <p className="lc-note">Free · No sign-up · Modules released one by one</p>
        </div>
        <Illustration />
      </div>
    </section>

    {/* ---------- at a glance ---------- */}
    <section className="wrap ec-glance" aria-label="Course at a glance">
      {glance.map(g => <div key={g.b}><b>{g.b}</b><span>{g.s}</span></div>)}
    </section>

    {/* ---------- who it is for ---------- */}
    <section className="wrap ec-fit" aria-labelledby="fit-title">
      <div>
        <p className="lc-eyebrow">Is this course for you?</p>
        <h2 id="fit-title" className="lc-h2">Built for people who already know SEO and work on online stores</h2>
        <ul className="lc-outcomes">{forYou.map(o => <li key={o}><span>{Icon.check}</span>{o}</li>)}</ul>
      </div>
      <div className="ec-before">
        <p className="ec-before-h">Before you start</p>
        {before.map(b => <div key={b.t}>
          <b>{b.t}</b>
          <p>{b.s}</p>
          {b.href && <a href={b.href}>{b.link} →</a>}
        </div>)}
      </div>
    </section>

    {/* ---------- modules ---------- */}
    <section id="modules" className="lc-overview" aria-labelledby="overview-title">
      <div className="wrap">
        <h2 id="overview-title" className="lc-h2">Course modules</h2>
        <p className="lc-sub">Ten modules in the order we work on online stores with our own clients. {open ? '' : 'They are being written now and will open one by one. '}Each module ends with a checklist you apply to your store.</p>
        <ol className="lc-cards">
          {ecomModules.map((m, i) => {
            const body = <>
              <EcomModuleArt index={i} className="lc-card-art" />
              <div className="lc-card-body">
                <span className="lc-card-meta"><span className="lc-num">Module {i + 1}</span>{m.lessons.length} lessons · Checklist</span>
                <h3>{m.title}</h3>
                <p>{m.summary}</p>
                <ul className="ec-lessons">{m.lessons.map(l => <li key={l}>{l}</li>)}</ul>
                {isEcomReleased(i) ? <i>Start module →</i> : <span className="lc-soon">{Icon.lock} Coming soon</span>}
              </div>
            </>;
            return <li key={m.slug}>
              {isEcomReleased(i) ? <a href={`/ecommerce-seo-course/${m.slug}`}>{body}</a> : <div className="lc-locked ec-locked">{body}</div>}
            </li>;
          })}
          {!open && <li className="ec-wait">
            <div>
              <p className="ec-wait-k">Opening soon</p>
              <h3>Be first in when module 1 opens</h3>
              <p>Join the waitlist and we’ll email you once, the day the first module goes live. No newsletter, no spam.</p>
            </div>
            <ul className="ec-wait-list">
              {[`${ecomModules.length} modules, ${lessonCount} lessons`, 'A checklist for every module', 'Ecommerce SEO Expert certificate', 'Free, with no sign-up'].map(x => <li key={x}><span>{Icon.check}</span>{x}</li>)}
            </ul>
            <a className="ec-wait-btn" href={waitlist}>Join the waitlist</a>
          </li>}
        </ol>
      </div>
    </section>

    {/* ---------- certificate ---------- */}
    <section className="lc-cert" aria-labelledby="cert-title">
      <div className="wrap lc-cert-grid">
        <div>
          <h2 id="cert-title" className="lc-h2">Become a certified Ecommerce SEO Expert</h2>
          <p className="lc-cert-text">Finish all ten modules and you’ll have the skills online stores pay for: technical control of large catalogues, category and product pages that win commercial searches, and reporting that ties SEO to revenue. Complete the course to earn your Search Engine Xperts <b>Ecommerce SEO Expert</b> certificate.</p>
          <ul className="lc-outcomes">{outcomes.map(o => <li key={o}><span>{Icon.check}</span>{o}</li>)}</ul>
          <div className="lc-ctas">
            <a className="lc-btn" href={waitlist}>Join the waitlist</a>
            <a className="lc-link" href="/local-seo-course">Start the free Local SEO Course now</a>
          </div>
        </div>
        <CertificateArt cert={{
          title: 'ECOMMERCE SEO EXPERT',
          label: 'Ecommerce SEO Expert certificate with Technical SEO, Product & Category Pages and Revenue Growth specialist badges',
          left: ['Technical', 'SEO'], mid: ['Product &', 'Category', 'Pages'], right: ['Revenue', 'Growth'],
        }} />
      </div>
    </section>

    {/* ---------- reviews ---------- */}
    <section className="lc-reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <h2 id="reviews-title" className="lc-h2">What clients say about working with Arslan</h2>
        <p className="lc-sub">Real reviews from businesses Arslan has helped grow through SEO.</p>
        <div className="lc-review-grid">
          {testimonials.map(t => <figure key={t.n}>
            <i className="lc-quote">{Icon.quote}</i>
            <blockquote>{t.q}</blockquote>
            <figcaption><span className="lc-avatar">{t.i}</span><span><b>{t.n}</b>{t.r}</span></figcaption>
          </figure>)}
        </div>
      </div>
    </section>

    <CourseCta copy={{
      heading: 'Rather have your ecommerce SEO done for you?',
      text: 'We’ll audit your store’s categories, product pages and technical setup and show you the fixes that move organic revenue first, free.',
      label: 'Get a free ecommerce SEO audit',
    }} />

    {/* ---------- FAQ ---------- */}
    <section className="wrap lc-faq" aria-labelledby="faq-title">
      <div>
        <p className="lc-eyebrow">About the course</p>
        <h2 id="faq-title" className="lc-h2">Frequently Asked Questions</h2>
      </div>
      <div>
        {faqs.map(f => <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>)}
      </div>
    </section>
  </>;
}

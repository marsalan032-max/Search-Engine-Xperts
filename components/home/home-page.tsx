import { Header, AuditForm, FAQ } from '../interactive';
import { BrandDefinitions, Footer } from '../site';
import { services } from '../services';
import { projects } from './projects';
import { tools } from '../tools/tool-list';
import questions from '../faq-data.json';

// Home page (/). Sections, top to bottom:
// hero → results cards → services (with sub-services) → portfolio → why us → process
// → reviews → free tools & guides → FAQ → contact.
// Anchor ids (#results, #services, #work, #process, #reviews, #faq, #contact) are used by the header menu
// and by links on other pages; keep them stable.

const site = 'https://searchenginexperts.com';
const email = 'arslantariq082@gmail.com';
const phone = '+923478724400';

const Check = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12l5 5L20 6" /></svg>;
const Arrow = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const Star = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>;

function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: 'Search Engine Xperts',
        url: `${site}/`,
        logo: `${site}/apple-icon.png`,
        image: `${site}/images/learn/home.png`,
        description: 'SEO and AI search agency helping local businesses, online stores and growing brands rank on Google, win the map pack and get cited in AI answers.',
        email,
        telephone: phone,
        founder: { '@type': 'Person', '@id': `${site}/#arslan-tariq`, name: 'Arslan Tariq', jobTitle: 'Founder & SEO Lead', image: `${site}/images/arslan-tariq.png` },
        knowsAbout: ['Search engine optimization', 'Local SEO', 'Ecommerce SEO', 'AI search optimization', 'Link building', 'Content marketing'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'SEO services',
          itemListElement: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${s.name} services`, url: `${site}${s.href ?? '/'}`, description: s.description } })),
        },
      },
      { '@type': 'WebSite', '@id': `${site}/#website`, url: `${site}/`, name: 'Search Engine Xperts', publisher: { '@id': `${site}/#organization` } },
      { '@type': 'FAQPage', '@id': `${site}/#faq`, mainEntity: questions.map(q => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })) },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

/* ---------- hero: everything that matters fits in the first screen ---------- */
function Hero() {
  return <section className="h-hero" id="top" aria-labelledby="hero-title">
    <div className="wrap h-hero-grid">
      <div className="h-hero-copy">
        <p className="h-pill"><span className="h-live" aria-hidden="true" />Search Engine Xperts · SEO &amp; AI Search Agency</p>
        <h1 id="hero-title">Get found on Google &amp; AI search. <span>Get more customers.</span></h1>
        <p className="h-lead">We help local businesses, online stores and growing brands rank higher, win the map pack and get cited in AI answers — with results you can verify.</p>
        <AuditForm />
        <ul className="h-proof" aria-label="Ratings and results">
          <li><b><Star /> 4.9</b><span>Trustpilot</span></li>
          <li><b><Star /> 5.0</b><span>Clutch</span></li>
          <li><b>840+</b><span>top-3 keywords</span></li>
          <li><b>7+ yrs</b><span>in SEO</span></li>
        </ul>
      </div>

      <div className="h-board" aria-label="Recent client results">
        <div className="h-board-bar"><span className="h-dots" aria-hidden="true"><i /><i /><i /></span><span>Client results · Google Search Console</span></div>
        <div className="h-feature">
          <div className="h-feature-head">
            <div><span className="h-kicker">E-commerce · Roller Skate USA</span><b>Organic clicks, year over year</b></div>
            <span className="h-up">+1,994%</span>
          </div>
          <div className="h-bars" role="img" aria-label="Organic clicks grew from 310 to 6,490 a year later">
            <div className="h-bar h-bar-before"><span style={{ height: '5%' }} /><b>310</b><small>Before</small></div>
            <div className="h-bar"><span style={{ height: '100%' }} /><b>6.49K</b><small>After</small></div>
            <div className="h-feature-side">
              <span className="h-kicker">Avg. position</span>
              <b>60.9 <i aria-hidden="true">→</i> 9.2</b>
              <span className="h-kicker">Top-3 keywords</span>
              <b>257</b>
            </div>
          </div>
        </div>
        <ul className="h-minis">
          <li><span className="h-kicker">Shuraa · Dubai</span><b>465</b><small>top-3 keywords</small></li>
          <li><span className="h-kicker">DFW Turf</span><b>Map pack</b><small>local rankings</small></li>
          <li><span className="h-kicker">Personal Drivers</span><b>Cited</b><small>in AI Overviews</small></li>
        </ul>
        <a href="#work" className="h-board-link">See all client results <Arrow /></a>
      </div>
    </div>
  </section>;
}

// Headline result for each client, shown as image cards right after the hero.
const highlights: Record<string, { value: string; label: string }> = {
  'Roller Skate USA': { value: '+1,994%', label: 'Organic clicks from Google' },
  'Shuraa': { value: '465', label: 'Keywords in Google’s top 3' },
  'DFW Turf Solutions': { value: '76', label: 'Local keywords in the top 3' },
  'Personal Drivers': { value: 'Cited', label: 'Source in Google AI Overviews' },
};
const slug = (name: string) => `project-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

function Results() {
  return <section className="h-results" id="results" aria-labelledby="results-title">
    <div className="wrap">
      <div className="h-results-head">
        <h2 id="results-title">The SEO Agency That Puts Businesses on Top of <span>Google &amp; AI Search</span></h2>
        <p>Helping businesses rank higher, get cited and grow from organic search</p>
      </div>
      <ul className="h-rcards">
        {projects.map(p => {
          const h = highlights[p.name];
          return <li key={p.name} className="h-rcard">
            <a href={`#${slug(p.name)}`} aria-label={`${p.name}: ${h.value} ${h.label}. See the project`}>
              <span className="h-rcard-img">
                <img src={p.image.src.replace('.webp', '-700.webp')} alt="" width="700" height={Math.round(p.image.height * 700 / p.image.width)} loading="lazy" decoding="async" />
                <span className="h-rcard-stat"><b>{h.value}</b><span>{h.label}</span></span>
              </span>
              <span className="h-rcard-name"><span>{p.name}</span><small>{p.industry.split(' · ')[0]}</small></span>
            </a>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}

/* ---------- services with sub-services ---------- */
function Services() {
  return <section className="h-section h-tint" id="services" aria-labelledby="services-title">
    <div className="wrap">
      <div className="h-head h-center">
        <p className="eyebrow">Our SEO services</p>
        <h2 id="services-title">Every service you need to rank, get cited and grow</h2>
        <p>Six core services, each covering the specialist work behind it — from technical fixes and content to links, local listings and AI search.</p>
      </div>
      <div className="h-services">
        {services.map(s => <article className="h-svc" id={s.id} key={s.id}>
          <div className="h-svc-top"><span className="h-svc-ic">{s.icon}</span><h3><a href={s.href ?? '#contact'}>{s.name}</a></h3></div>
          <p>{s.description}</p>
          <ul>{s.sub.map(x => <li key={x}><a href={`${s.href}#services`}><Check />{x}</a></li>)}</ul>
          <a className="h-more" href={s.href ?? '#contact'}>Explore {s.name} services <Arrow /></a>
        </article>)}
      </div>
      <p className="h-services-note">Not sure where to start? <a href="/seo-tools/seo-audit-tool">Run our free SEO audit tool</a> or <a href="#contact">book a free consultation</a>.</p>
    </div>
  </section>;
}

/* ---------- portfolio ---------- */
function Portfolio() {
  return <section className="h-section" id="work" aria-labelledby="work-title">
    <div className="wrap">
      <div className="h-head h-split">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h2 id="work-title">Real projects. Real rankings. Real growth.</h2>
        </div>
        <p>Four clients across e-commerce, professional services, local service and transportation. Full data is available on request.</p>
      </div>
      <div className="h-projects">
        {projects.map(p => <article className="h-project" id={slug(p.name)} key={p.name}>
          <div className="h-shot">
            <div className="h-shot-bar"><span className="h-dots" aria-hidden="true"><i /><i /><i /></span><span>{p.url.replace('https://', '')}</span></div>
            <img src={p.image.src} srcSet={`${p.image.src.replace('.webp', '-700.webp')} 700w, ${p.image.src} 1400w`} sizes="(max-width: 1020px) calc(100vw - 72px), 540px" alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" decoding="async" />
            {p.inset && <img className="h-inset" src={p.inset.src} alt={p.inset.alt} width={p.inset.width} height={p.inset.height} loading="lazy" decoding="async" />}
          </div>
          <div className="h-project-body">
            <span className="h-kicker">{p.industry}</span>
            <h3>{p.name}</h3>
            <p><strong>Challenge:</strong> {p.challenge}</p>
            <p><strong>What we did:</strong> {p.solution}</p>
            <dl className="h-metrics">{p.metrics.map(m => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>
            <div className="h-project-foot">
              <span className="h-tags">{p.services.map(s => <a key={s.label} href={s.href}>{s.label}</a>)}</span>
              <span className="h-links">
                <a href={p.url} target="_blank" rel="noopener">Visit site ↗</a>
                <a href={`mailto:${email}?subject=${encodeURIComponent(`${p.name} case study request`)}`}>Request case study</a>
              </span>
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

/* ---------- why us ---------- */
const reasons = [
  { t: 'Senior, hands-on work', d: 'Your account is run by an experienced SEO lead — not handed to a junior team or a reseller.' },
  { t: 'Strategy tied to revenue', d: 'We prioritize the keywords, pages and fixes that bring leads and sales, not vanity rankings.' },
  { t: 'Built for Google and AI search', d: 'Every page is structured to rank in classic results and to be cited in AI Overviews and ChatGPT.' },
  { t: 'Results you can verify', d: 'Plain-English reporting from Search Console and analytics — every ranking, click and lead.' },
];

function WhyUs() {
  return <section className="h-section h-why" id="approach" aria-labelledby="why-title">
    <div className="wrap h-why-grid">
      <div className="h-why-photo">
        <img src="/images/analytics-workspace.jpg" alt="Analytics dashboard used to review client search traffic" width="900" height="600" loading="lazy" decoding="async" />
        <div className="h-why-badge"><b>16K+</b><span>monthly clicks for featured clients</span></div>
      </div>
      <div>
        <p className="eyebrow">Why Search Engine Xperts</p>
        <h2 id="why-title">Good rankings are just the beginning.</h2>
        <p className="h-sub">More visibility, better leads and a stronger business. We connect every part of your search strategy to the results that actually matter.</p>
        <ul className="h-reasons">{reasons.map(r => <li key={r.t}><span className="h-tick"><Check /></span><div><b>{r.t}</b><p>{r.d}</p></div></li>)}</ul>
        <a href="#contact" className="btn btn-primary">Book a free strategy call <Arrow /></a>
      </div>
    </div>
  </section>;
}

/* ---------- process ---------- */
const steps = [
  { t: 'Discovery & audit', d: 'Technical, content and backlink audit to find what’s holding you back.' },
  { t: 'Keyword & strategy', d: 'High-intent keywords mapped to a prioritized roadmap aimed at revenue.' },
  { t: 'On-page & content', d: 'Pages optimized and content published that ranks, reads well and converts.' },
  { t: 'Authority & links', d: 'Quality backlinks and digital PR that build the trust Google rewards.' },
  { t: 'Track & scale', d: 'Transparent reporting, then doubling down on what works.' },
];

function Process() {
  return <section className="h-section h-process" id="process" aria-labelledby="process-title">
    <div className="wrap">
      <div className="h-head h-center">
        <p className="eyebrow">How it works</p>
        <h2 id="process-title">A proven SEO process, built to compound</h2>
        <p>One repeatable, data-backed system. Every step builds on the last, so growth keeps stacking month after month.</p>
      </div>
      <ol className="h-steps">{steps.map((s, i) => <li key={s.t}><span>{String(i + 1).padStart(2, '0')}</span><h3>{s.t}</h3><p>{s.d}</p></li>)}</ol>
    </div>
  </section>;
}

/* ---------- reviews ---------- */
const testimonials = [
  { q: 'We went from nowhere to the first page in three months. The leads haven’t stopped since.', n: 'James Miller', r: 'Founder · Personal Drivers', i: 'JM' },
  { q: 'Clear reporting, real rankings. Arslan explains everything and delivers on every promise.', n: 'Sara Khan', r: 'Marketing Lead · Shuraa', i: 'SK' },
  { q: 'Our phone rings off the hook now. The map-pack ranking alone paid for itself.', n: 'David Turner', r: 'Owner · DFW Turf', i: 'DT' },
];
const platformReviews = [
  { q: 'Best SEO decision we made. Traffic up, leads up, and the communication is first-class.', n: 'Michael R.', via: 'Trustpilot' },
  { q: 'Strategic, transparent and genuinely results-driven. Ranked us in a tough niche.', n: 'Aisha N.', via: 'Clutch' },
  { q: 'Delivered exactly what was promised, on time. Our organic revenue doubled.', n: 'Daniel P.', via: 'Trustpilot' },
];

function Reviews() {
  return <section className="h-section h-tint" id="reviews" aria-labelledby="reviews-title">
    <div className="wrap">
      <div className="h-head h-split">
        <div>
          <p className="eyebrow">Client reviews</p>
          <h2 id="reviews-title">Rated excellent by the businesses we work with</h2>
        </div>
        <div className="h-ratings">
          <div className="h-rating"><b>4.9</b><div><span className="h-stars tp" aria-label="4.9 out of 5 stars">★★★★★</span><small>Trustpilot · 120+ reviews</small></div></div>
          <div className="h-rating"><b>5.0</b><div><span className="h-stars cl" aria-label="5 out of 5 stars">★★★★★</span><small>Clutch · Top-rated</small></div></div>
        </div>
      </div>
      <div className="h-quotes">
        {testimonials.map(t => <figure key={t.n} className="h-quote h-quote-main">
          <blockquote>“{t.q}”</blockquote>
          <figcaption><span className="h-av" aria-hidden="true">{t.i}</span><span><b>{t.n}</b><small>{t.r}</small></span></figcaption>
        </figure>)}
        {platformReviews.map(t => <figure key={t.n} className="h-quote">
          <span className="h-stars tp" aria-label="5 out of 5 stars">★★★★★</span>
          <blockquote>“{t.q}”</blockquote>
          <figcaption><span><b>{t.n}</b><small>via {t.via}</small></span></figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}

/* ---------- free tools & guides ---------- */
function Resources() {
  return <section className="h-section h-tint" id="resources" aria-labelledby="resources-title">
    <div className="wrap">
      <div className="h-head h-split">
        <div>
          <p className="eyebrow">Free SEO tools &amp; guides</p>
          <h2 id="resources-title">Check your site and learn SEO — free</h2>
        </div>
        <p>The same checks we run at the start of every project, plus practical guides from fundamentals to AI search. No sign-up.</p>
      </div>
      <div className="h-tools">
        {tools.map(t => <a key={t.slug} href={`/seo-tools/${t.slug}`} className="h-tool"><span className="h-kicker">Free tool</span><b>{t.name.replace('Free ', '')}</b><span>{t.short}</span><i>Open the tool <Arrow /></i></a>)}
      </div>
      <p className="h-services-note"><a href="/learn-seo">Browse all free SEO guides</a> — local, ecommerce, Shopify, technical, link building and AI SEO.</p>
    </div>
  </section>;
}

function Questions() {
  return <section className="h-section" id="faq" aria-labelledby="faq-title">
    <div className="wrap">
      <div className="h-head h-center">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-title">Questions, answered</h2>
        <p>What business owners ask most before we start working together.</p>
      </div>
      <FAQ />
    </div>
  </section>;
}

function Contact() {
  return <section className="h-section h-contact-wrap" id="contact" aria-labelledby="contact-title">
    <div className="wrap">
      <div className="h-contact">
        <div>
          <p className="eyebrow">Free consultation</p>
          <h2 id="contact-title">Let’s grow your traffic, leads and sales</h2>
          <p>Tell us about your business and we’ll send a free audit with the first fixes that will move the needle. No commitment.</p>
          <a href={`mailto:${email}?subject=${encodeURIComponent('Free SEO consultation')}`} className="btn btn-light">Book a free consultation <Arrow /></a>
        </div>
        <ul>
          <li><span>Phone / WhatsApp</span><a href={`tel:${phone}`}>+92 347 8724400</a></li>
          <li><span>Email</span><a href={`mailto:${email}`}>{email}</a></li>
        </ul>
      </div>
    </div>
  </section>;
}

export default function HomePage() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <BrandDefinitions />
    <Schema />
    <Header />
    <main id="main" className="home">
      <Hero /><Results /><Services /><Portfolio /><WhyUs /><Process /><Reviews /><Resources /><Questions /><Contact />
    </main>
    <Footer />
  </>;
}

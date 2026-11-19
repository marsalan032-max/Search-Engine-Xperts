import { Header, AuditForm, FAQ } from '../interactive';
import { BrandDefinitions, Footer } from '../site';
import { services } from '../services';
import { projects } from './projects';
import { badges, reviewPlatforms, reviewerInitials } from './recognition';
import { Doodle, Note, SketchDefs, Underline } from './hand';
import { tools } from '../tools/tool-list';
import questions from '../faq-data.json';

// Home page (/). Sections, top to bottom:
// hero (with review strip) → recognized by → results cards → services (with sub-services) → portfolio → why us → process
// → reviews → free tools & guides → FAQ → contact.
// Anchor ids (#results, #services, #work, #process, #reviews, #faq, #contact) are used by the header menu
// and by links on other pages; keep them stable.

const site = 'https://searchenginexperts.com';
const email = 'arslantariq082@gmail.com';
const phone = '+923478724400';

const Check = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12l5 5L20 6" /></svg>;
const Arrow = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

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
        founder: { '@type': 'Person', '@id': `${site}/#arslan-tariq`, name: 'Arslan Tariq', jobTitle: 'Founder & SEO Lead', image: `${site}/images/arslan-tariq.png`, sameAs: ['https://www.linkedin.com/in/seo-expert-arslan-tariq/'] },
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
        <h1 id="hero-title">We help businesses get <Underline>found</Underline> on Google and in AI search.</h1>
        <p className="h-lead">We fix what’s holding your website back, write pages your customers actually want to read, and send you a short report every month so you can see exactly what changed.</p>
        <AuditForm />
        <ul className="h-proof" aria-label="Results">
          <li><b>840+</b><span>top-3 keywords</span></li>
          <li><b>16K+</b><span>monthly clicks</span></li>
          <li><b>+1,994%</b><span>best traffic lift</span></li>
          <li><b>7+ yrs</b><span>in SEO</span></li>
        </ul>
      </div>

      <div className="h-board" aria-label="Recent client results">
        <Note arrow="down-left" className="h-note-hero">page 6 → page 1<br />for Roller Skate USA</Note>
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
    <div className="wrap">
      <div className="h-revstrip" aria-label="Client review ratings">
        {reviewPlatforms.map(p => <a key={p.name} className="h-rev" href={p.href ?? '#reviews'} {...(p.href ? { target: '_blank', rel: 'noopener' } : {})}>
          <span className="h-rev-name">{p.name}</span>
          <span className="h-rev-num">
            <b>{p.count ?? p.rating}</b>
            <span className="h-rev-meta"><span className="h-rev-stars" aria-label={`${p.rating} out of 5 stars`}>★★★★★</span><small>{p.count ? `Reviews · ${p.rating}` : 'Rating'}</small></span>
          </span>
        </a>)}
        <a className="h-rev h-rev-people" href="#reviews">
          <span className="h-avs" aria-hidden="true">{reviewerInitials.map(i => <i key={i}>{i}</i>)}</span>
          <span className="h-rev-link">Read our client reviews <span aria-hidden="true">↗</span></span>
          <span className="h-rev-stars h-rev-stars-lg" aria-label="5 out of 5 stars">★★★★★</span>
        </a>
      </div>
    </div>
  </section>;
}

function Recognition() {
  if (!badges.length) return null;
  return <section className="h-recog" aria-labelledby="recog-title">
    <div className="wrap">
      <h2 id="recog-title">Recognized by</h2>
      <ul>
        {badges.map(b => {
          const inner = b.image
            ? <img src={b.image} alt={`${b.name}${b.detail ? ` — ${b.detail}` : ''}`} width={b.width ?? 160} height={b.height ?? 120} loading="lazy" decoding="async" />
            : <span className="h-recog-tile"><b>{b.name}</b>{b.detail && <small>{b.detail}</small>}</span>;
          return <li key={b.name}>{b.href ? <a href={b.href} target="_blank" rel="noopener" aria-label={`${b.name}: view profile`}>{inner}</a> : inner}</li>;
        })}
      </ul>
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
        <h2 id="results-title">A few of the businesses <Underline>we’ve helped</Underline></h2>
        <p>Real numbers from real client projects. Tap a card to see what we did.</p>
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
        <p className="eyebrow">what we do</p>
        <h2 id="services-title">How we can help</h2>
        <p>Most clients start with one of these. Not sure which one you need? Send us your website and we’ll tell you honestly.</p>
      </div>
      <div className="h-services">
        {services.map(s => <article className="h-svc" id={s.id} key={s.id}>
          <div className="h-svc-top"><span className="h-svc-ic">{s.icon}</span><h3><a href={s.href ?? '#contact'}>{s.name}</a></h3></div>
          <p>{s.description}</p>
          <ul>{s.sub.map(x => <li key={x}><a href={`${s.href}#services`}><Check />{x}</a></li>)}</ul>
          <a className="h-more" href={s.href ?? '#contact'}>Explore {s.name} services <Arrow /></a>
        </article>)}
      </div>
      <p className="h-services-note">Want to check your site yourself first? <a href="/seo-tools/seo-audit-tool">Try our free SEO audit tool</a>, or <a href="#contact">just ask us</a>.</p>
    </div>
  </section>;
}

/* ---------- portfolio ---------- */
function Portfolio() {
  return <section className="h-section" id="work" aria-labelledby="work-title">
    <div className="wrap">
      <div className="h-head h-split">
        <div>
          <p className="eyebrow">our work</p>
          <h2 id="work-title">Recent projects</h2>
        </div>
        <p>Four very different businesses: an online store, a Dubai consultancy, a Dallas turf installer and a driver service. Here’s what was going wrong and what we changed.</p>
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
  { t: 'You talk to the person doing the work', d: 'No account managers passing messages along. Your questions go to the person working on your site.' },
  { t: 'We care about enquiries, not just rankings', d: 'A ranking is nice. A phone call or an order is better, so that’s what we track and report on.' },
  { t: 'Ready for AI search too', d: 'We write and structure pages so Google, ChatGPT and other AI tools can understand them and quote them.' },
  { t: 'Reports you’ll actually read', d: 'One short monthly report: what we did, what moved and what’s next. The numbers come straight from your Search Console.' },
];

function WhyUs() {
  return <section className="h-section h-why" id="approach" aria-labelledby="why-title">
    <div className="wrap h-why-grid">
      <div className="h-why-photo">
        <img src="/images/analytics-workspace.jpg" alt="Analytics dashboard used to review client search traffic" width="900" height="600" loading="lazy" decoding="async" />
        <div className="h-why-badge"><b>16K+</b><span>monthly clicks for featured clients</span></div>
      </div>
      <div>
        <p className="eyebrow">why clients stay</p>
        <h2 id="why-title">Good SEO should be easy to understand</h2>
        <p className="h-sub">You shouldn’t need to be an expert to know whether your SEO is working. Here’s how we keep it simple.</p>
        <ul className="h-reasons">{reasons.map(r => <li key={r.t}><span className="h-tick"><Check /></span><div><b>{r.t}</b><p>{r.d}</p></div></li>)}</ul>
        <a href="#contact" className="btn btn-primary">Book a free strategy call <Arrow /></a>
      </div>
    </div>
  </section>;
}

/* ---------- process ---------- */
const steps = [
  { t: 'Audit', d: 'We go through your site, your competitors and your backlinks to find what’s holding you back.', i: 'audit' },
  { t: 'Plan', d: 'We pick the keywords worth going after and put the fixes in order, biggest impact first.', i: 'plan' },
  { t: 'Fix and write', d: 'We sort out the technical problems and improve or write the pages that matter most.', i: 'write' },
  { t: 'Build trust', d: 'We earn links and mentions from websites your customers already read.', i: 'links' },
  { t: 'Report and repeat', d: 'Each month you see what moved, and we put more effort into what’s working.', i: 'grow' },
];

function Process() {
  return <section className="h-section h-process" id="process" aria-labelledby="process-title">
    <div className="wrap">
      <div className="h-head h-center">
        <p className="eyebrow">how we work</p>
        <h2 id="process-title">Five steps, nothing complicated</h2>
        <p>You’ll always know which step we’re on and why.</p>
      </div>
      <ol className="h-steps">{steps.map((s, i) => <li key={s.t}><Doodle name={s.i} /><span className="h-step-no">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>)}</ol>
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
          <p className="eyebrow">kind words</p>
          <h2 id="reviews-title">What our clients say</h2>
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
          <p className="eyebrow">free stuff</p>
          <h2 id="resources-title">Free tools and guides</h2>
        </div>
        <p>Want to look at your own site first? These are the same checks we run at the start of every project. No sign-up needed.</p>
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
        <p className="eyebrow">good questions</p>
        <h2 id="faq-title">Questions people ask us</h2>
        <p>If yours isn’t here, just send us a message.</p>
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
          <p className="eyebrow">say hello</p>
          <h2 id="contact-title">Tell us about your business</h2>
          <p>Send us your website and what you’d like to improve. We’ll reply with a free audit and the first few things we’d fix. No pressure to sign up.</p>
          <a href={`mailto:${email}?subject=${encodeURIComponent('Free SEO consultation')}`} className="btn btn-light">Email us <Arrow /></a>
          <a href="https://wa.me/923478724400" className="btn h-wa" target="_blank" rel="noopener">Chat on WhatsApp</a>
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
    <SketchDefs />
    <Schema />
    <Header />
    <main id="main" className="home">
      <Hero /><Recognition /><Results /><Services /><Portfolio /><WhyUs /><Process /><Reviews /><Resources /><Questions /><Contact />
    </main>
    <Footer />
  </>;
}

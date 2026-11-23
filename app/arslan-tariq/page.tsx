import type { Metadata } from 'next';
import { author, posts, siteUrl } from '../../components/blog/posts';
import { guides } from '../../components/learn/guides';
import { projects } from '../../components/home/projects';
import { services } from '../../components/services';
import { HomeCrumb } from '../../components/home-crumb';

// Founder profile page (/arslan-tariq). Layout: navy intro band with the photo card on the left and the
// introduction on the right; below it the sticky profile card stays on the left while the sections scroll on the right.
// Bio, results and reviews come from the same data as the rest of the site, so they stay in step.

const url = `${siteUrl}/arslan-tariq`;
const email = 'arslantariq082@gmail.com';
const phone = { label: '+92 347 8724400', href: 'tel:+923478724400' };
const linkedin = author.profiles.find(p => p.label === 'LinkedIn')?.href ?? 'https://www.linkedin.com/in/seo-expert-arslan-tariq/';
const callMail = `mailto:${email}?subject=${encodeURIComponent('Free strategy call request')}&body=${encodeURIComponent('Hi Arslan,\n\nI would like to book a free strategy call.\n\nMy website:\nMy business and location:\nMain goal (more calls, map-pack rankings, AI search visibility…):\n')}`;
const auditMail = `mailto:${email}?subject=${encodeURIComponent('Website review request')}&body=${encodeURIComponent('Hi Arslan,\n\nCould you take a look at my website?\n\nWebsite:\nWhat I would like to improve:\n')}`;

const tagline = 'AI SEO Specialist | Helping Local Businesses Get 10x More Leads from Google, Maps & AI Search with My Proven AEO & GEO Strategy';

export const metadata: Metadata = {
  title: 'Arslan Tariq, AI SEO Specialist | Search Engine Xperts',
  description: 'Arslan Tariq is an AI SEO specialist helping local businesses get more leads from Google, Google Maps and AI search with a proven AEO and GEO strategy.',
  alternates: { canonical: url },
  openGraph: {
    type: 'profile', url, siteName: 'Search Engine Xperts', firstName: 'Arslan', lastName: 'Tariq',
    title: 'Arslan Tariq, AI SEO Specialist',
    description: 'Helping local businesses get more leads from Google, Maps and AI search with AEO and GEO.',
    images: [{ url: `${siteUrl}${author.photo}`, width: 400, height: 400, alt: 'Arslan Tariq' }],
  },
  twitter: { card: 'summary', title: 'Arslan Tariq, AI SEO Specialist', description: 'Helping local businesses get more leads from Google, Maps and AI search.', images: [`${siteUrl}${author.photo}`] },
};

const stats = [
  { value: '7+ yrs', label: 'in SEO' },
  { value: '840+', label: 'top-3 keywords' },
  { value: '4.9', label: 'Trustpilot' },
  { value: '5.0', label: 'Clutch' },
];

const focus = [
  { title: 'Google Search', text: 'Technical, on-page and content SEO so your service pages rank for the searches that bring in work.' },
  { title: 'Google Maps', text: 'Google Business Profile, citations, reviews and location pages to win the map pack and “near me” searches.' },
  { title: 'AI search', text: 'AEO and GEO so ChatGPT, Perplexity and Google AI Overviews can find, trust and recommend your business.' },
  { title: 'Leads, not vanity metrics', text: 'Reporting from Search Console and your enquiries, so you can see what each change did.' },
];

const reviews = [
  { q: 'We went from nowhere to the first page in three months. The leads haven’t stopped since.', n: 'James Miller', r: 'Founder · Personal Drivers' },
  { q: 'Clear reporting, real rankings. Arslan explains everything and delivers on every promise.', n: 'Sara Khan', r: 'Marketing Lead · Shuraa' },
  { q: 'Our phone rings off the hook now. The map-pack ranking alone paid for itself.', n: 'David Turner', r: 'Owner · DFW Turf' },
];

const guideSlugs = ['ai-seo', 'local-seo', 'technical-seo'];
const reading = [
  ...guideSlugs.flatMap(s => guides.filter(g => g.slug === s)).map(g => ({ kind: 'Guide', title: g.title, text: g.dek, time: g.readTime, href: `/learn-seo/${g.slug}` })),
  ...posts.map(p => ({ kind: 'Blog', title: p.title, text: p.dek, time: p.readTime, href: `/blog/${p.slug}` })),
];

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'results', label: 'Results' },
  { id: 'services', label: 'Services' },
  { id: 'guides', label: 'Free guides' },
  { id: 'contact', label: 'Contact' },
];

const LinkedInIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>;
const MailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>;
const Check = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12l5 5L20 6" /></svg>;
const Star = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>;

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
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#arslan-tariq`,
        name: 'Arslan Tariq',
        jobTitle: 'AI SEO Specialist',
        description: tagline,
        url,
        image: `${siteUrl}${author.photo}`,
        email: `mailto:${email}`,
        worksFor: { '@id': `${siteUrl}/#organization` },
        knowsAbout: ['Search engine optimization', 'AI search optimization', 'Answer engine optimization (AEO)', 'Generative engine optimization (GEO)', 'Local SEO', 'Google Business Profile', 'Ecommerce SEO', 'Technical SEO'],
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

    {/* ---------- intro band: photo on the left, introduction on the right ---------- */}
    <section className="pf-band" aria-labelledby="pf-title">
      <div className="wrap pf-band-grid">
        <div className="pf-photo">
          <img src={author.photo} alt="Arslan Tariq, AI SEO specialist and founder of Search Engine Xperts" width="400" height="400" fetchPriority="high" />
        </div>
        <div className="pf-intro">
          <nav aria-label="Breadcrumb" className="pf-crumbs"><HomeCrumb /><span aria-hidden="true">/</span><span aria-current="page">Arslan Tariq</span></nav>
          <p className="pf-hi">Hi, I’m</p>
          <h1 id="pf-title">Arslan Tariq</h1>
          <p className="pf-role">AI SEO Specialist <span aria-hidden="true">·</span> Founder of <a href="/">Search Engine Xperts</a></p>
          <p className="pf-lead">Helping local businesses get <em>10x more leads</em> from Google, Maps &amp; AI search with my proven AEO &amp; GEO strategy.</p>
          <ul className="pf-stats" aria-label="Experience and ratings">
            {stats.map(s => <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>)}
          </ul>
          <div className="pf-follow">
            <span>Connect with me</span>
            <a href={linkedin} target="_blank" rel="noopener noreferrer me" aria-label="Arslan Tariq on LinkedIn"><LinkedInIcon /></a>
            <a href={`mailto:${email}`} aria-label={`Email Arslan at ${email}`}><MailIcon /></a>
            <a href={phone.href} aria-label={`Call Arslan on ${phone.label}`}><PhoneIcon /></a>
          </div>
        </div>
      </div>
    </section>

    <div className="wrap pf-body">
      {/* ---------- left: profile card that stays in view ---------- */}
      <aside className="pf-side" aria-label="Work with Arslan">
        <div className="pf-card">
          <b className="pf-card-name">Arslan Tariq</b>
          <p className="pf-card-role">AI SEO Specialist</p>
          <p className="pf-card-text">Want more calls from Google, Maps and AI search? Tell me about your business and I’ll show you where the leads are.</p>
          <a className="btn btn-primary" href={callMail}>Book a free strategy call</a>
          <a className="btn btn-ghost" href="/#contact">Get a free SEO audit</a>
          <ul className="pf-card-contact">
            <li><a href={linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon /> LinkedIn</a></li>
            <li><a href={`mailto:${email}`}><MailIcon /> Email</a></li>
            <li><a href={phone.href}><PhoneIcon /> Call</a></li>
          </ul>
        </div>
      </aside>

      {/* ---------- right: sections ---------- */}
      <div className="pf-main">
        <nav className="pf-tabs" aria-label="On this page">
          {tabs.map(t => <a key={t.id} href={`#${t.id}`}>{t.label}</a>)}
        </nav>

        <section id="about" aria-labelledby="about-title" className="pf-sec">
          <h2 id="about-title" className="sr-only">About Arslan Tariq</h2>
          <div className="pf-prose">
            <p>I’m Arslan Tariq, an AI SEO specialist and the founder of Search Engine Xperts. For more than seven years I’ve helped local businesses grow their online visibility and turn it into qualified leads, and I work with eCommerce brands to grow organic traffic, rankings and sales.</p>
            <p><b>My mission is simple: when someone near you searches for what you do, your business should be the answer.</b></p>
            <p>That search no longer happens in one place. Your customers still Google you, but they also compare options on Google Maps and ask ChatGPT, Perplexity and Google’s AI Overviews who to call. I build visibility across all three.</p>
            <p>My AEO and GEO strategy is how I do it. <b>Answer engine optimization (AEO)</b> structures your pages so search engines and AI assistants can lift a clear, accurate answer from them. <b>Generative engine optimization (GEO)</b> builds the entity signals, citations and mentions that make AI models trust your brand enough to name it. Both sit on solid technical, local and on-page SEO, because AI answers still lean on pages that rank.</p>
          </div>

          <h3 className="pf-h3">What I focus on</h3>
          <ul className="pf-focus">
            {focus.map(f => <li key={f.title}><span className="pf-tick"><Check /></span><div><b>{f.title}</b><p>{f.text}</p></div></li>)}
          </ul>

          <p className="pf-label">Businesses I’ve helped grow</p>
          <ul className="pf-clients">
            {projects.map(p => <li key={p.name}>{p.name}</li>)}
          </ul>
        </section>

        <section id="results" aria-labelledby="results-title" className="pf-sec">
          <h2 id="results-title">Results</h2>
          <p className="pf-sub">Real client projects, measured in Google Search Console.</p>
          <div className="pf-grid">
            {projects.map(p => <article key={p.name} className="pf-tile pf-case">
              <img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" />
              <div className="pf-tile-body">
                <span className="pf-pill">{p.industry}</span>
                <h3>{p.name}</h3>
                <p className="pf-metric"><b>{p.metrics[0].value}</b> {p.metrics[0].label}</p>
                <p>{p.challenge}</p>
                <div className="pf-tile-foot">
                  <span className="pf-tags">{p.services.map(s => s.label).join(' · ')}</span>
                  <a href="/#work">View project →</a>
                </div>
              </div>
            </article>)}
          </div>

          <h3 className="pf-h3">What clients say</h3>
          <div className="pf-reviews">
            {reviews.map(r => <figure key={r.n}>
              <span className="pf-stars" aria-label="5 out of 5 stars"><Star /><Star /><Star /><Star /><Star /></span>
              <blockquote>{r.q}</blockquote>
              <figcaption><b>{r.n}</b>{r.r}</figcaption>
            </figure>)}
          </div>
        </section>

        <section id="services" aria-labelledby="services-title" className="pf-sec">
          <h2 id="services-title">How I can help</h2>
          <p className="pf-sub">Done-for-you SEO, delivered by me and the Search Engine Xperts team.</p>
          <div className="pf-grid">
            {services.map(s => <a key={s.id} href={s.href ?? `/#${s.id}`} className="pf-tile pf-link">
              <div className="pf-tile-body">
                <span className="pf-icon">{s.icon}</span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="pf-tile-foot"><span className="pf-tags">{s.sub.slice(0, 2).join(' · ')}</span><i>Explore →</i></div>
              </div>
            </a>)}
          </div>
        </section>

        <section id="guides" aria-labelledby="guides-title" className="pf-sec">
          <h2 id="guides-title">Free guides</h2>
          <p className="pf-sub">Practical, no-fluff reading from my work with clients.</p>
          <div className="pf-grid">
            {reading.map(r => <a key={r.href} href={r.href} className="pf-tile pf-link">
              <div className="pf-tile-body">
                <span className="pf-meta"><span className="pf-pill pf-pill-green">{r.kind}</span>{r.time}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                <div className="pf-tile-foot"><span className="pf-tags">By Arslan Tariq</span><i>Read →</i></div>
              </div>
            </a>)}
          </div>
          <a className="btn btn-ghost pf-more" href="/learn-seo">All SEO guides</a>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="pf-sec">
          <h2 id="contact-title">Contact</h2>
          <p className="pf-sub">Free, no-commitment, and you speak to me directly.</p>
          <div className="pf-grid">
            <div className="pf-tile">
              <div className="pf-tile-body">
                <span className="pf-meta"><span className="pf-pill">Strategy call</span>Free</span>
                <h3>Not sure yet? Book a call with me.</h3>
                <p>We’ll look at where your leads come from today and where Google, Maps and AI search could add more.</p>
                <div className="pf-tile-foot"><span className="pf-tags">{phone.label}</span><a href={callMail}>Book a call →</a></div>
              </div>
            </div>
            <div className="pf-tile">
              <div className="pf-tile-body">
                <span className="pf-meta"><span className="pf-pill">Website review</span>Free</span>
                <h3>Prefer email? Send me your website.</h3>
                <p>I’ll reply with the first things I would fix and what they could mean for your rankings.</p>
                <div className="pf-tile-foot"><span className="pf-tags">{email}</span><a href={auditMail}>Send an email →</a></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </>;
}

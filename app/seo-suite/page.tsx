import type { Metadata } from 'next';
import './suite.css';
import { siteUrl } from '../../components/blog/posts';
import { brandTitle } from '../../components/seo-title';
import { BrandDefinitions, Footer } from '../../components/site';
import { SuiteApp } from '../../components/seo-suite/suite-app';

// /seo-suite: the full-screen SEO Suite (keyword research, SERP, domain overview, backlinks,
// site audit, saved keywords), followed by a short explainer, FAQs and a call to action.
// Live metrics need DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD (see app/api/seo-suite/_lib/server.ts).

const url = `${siteUrl}/seo-suite`;
const title = 'Free SEO Suite: Keyword Research, SERP & Site Audit Tool';
const description = 'Free all-in-one SEO suite: keyword ideas with intent, search trends, live SERP analysis, domain overview, backlinks and a one-click site audit. No sign-up.';

export const metadata: Metadata = {
  title: brandTitle(title),
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Search Engine Xperts', title, description, images: [{ url: `${siteUrl}/images/learn/seo-tools.png`, width: 1600, height: 900 }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${siteUrl}/images/learn/seo-tools.png`] },
};

const features = [
  { title: 'Keyword Research', text: 'Turn one seed keyword into well over a hundred real searches, each tagged with its search intent. With live data, see volume, CPC, competition and keyword difficulty side by side.' },
  { title: 'Search Trends', text: 'A 12-month demand curve for the seed keyword, so you can spot seasonality before you plan content or campaigns.' },
  { title: 'SERP Analysis', text: 'The current top 10 on Google for your keyword, with one click to audit any ranking page and see what it does well.' },
  { title: 'Domain Overview', text: 'Organic keywords, estimated traffic and ranking positions for your site or any competitor, with the keywords that bring the most visits.' },
  { title: 'Backlinks', text: 'Domain rank, total backlinks, referring domains and the strongest sites linking in, exportable for outreach planning.' },
  { title: 'Site Audit', text: 'Status codes, redirects, robots.txt (including AI crawlers), indexing, titles, headings, links and schema, ranked by what to fix first.' },
];

const steps = [
  'Search a seed keyword for your product, service or topic, and pick the country you want to rank in.',
  'Filter the ideas by intent, words to include or exclude and, with live data, minimum volume and maximum difficulty.',
  'Tick the keywords worth targeting and save them. Your list builds across searches and exports to CSV.',
  'Check the SERP for each target, then audit the top-ranking page to see the bar you need to clear.',
  'Audit your own page against the same keyword and work through the “Fix these first” list.',
];

const faqs = [
  { question: 'Is the SEO Suite really free?', answer: 'Yes. There is no sign-up and no trial. Keyword ideas, intent tagging, saved keywords, CSV export and the site audit are free to use. Live metrics such as search volume, difficulty and backlinks come from a paid data provider, so they are limited to a fair number of lookups per visitor each hour.' },
  { question: 'Where does the keyword data come from?', answer: 'Keyword ideas come from Google Autocomplete, which means every idea is a phrase people actually type into Google. When live data is switched on, volume, CPC, competition, difficulty, trends, SERPs, domain and backlink metrics come from DataForSEO, a data provider used by many professional SEO platforms.' },
  { question: 'How is search intent decided?', answer: 'With live data, intent comes from the provider’s classification of each keyword. Otherwise it is estimated from the wording: “how” and “what” suggest informational searches, “best” and “vs” commercial research, “price” and “hire” transactional intent and “near me” local intent. Always confirm by looking at what currently ranks.' },
  { question: 'What does the Score column mean?', answer: 'It is keyword difficulty on a 0 to 100 scale: an estimate of how hard it is to reach the top 10, based mainly on the strength of the pages already ranking. Green scores are realistic for newer sites; orange and red usually need strong content plus backlinks.' },
  { question: 'Is my data stored?', answer: 'Searches are processed to return results and cached briefly to keep the tool fast; they are not tied to you. Recent searches and saved keywords are kept only in your own browser, and you can clear them at any time.' },
  { question: 'How is this different from your other free SEO tools?', answer: 'The individual tools each do one job in depth. The Suite brings keyword research, SERP checks, competitor data and the audit into one workspace so you can go from idea to action without switching pages.' },
];

export default function SeoSuitePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#app`,
        name: 'Free SEO Suite', url, description,
        applicationCategory: 'BusinessApplication', operatingSystem: 'Any (web browser)',
        featureList: features.map(f => f.title),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Search Engine Xperts', url: `${siteUrl}/` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'SEO Tools', item: `${siteUrl}/seo-tools` },
          { '@type': 'ListItem', position: 3, name: 'SEO Suite', item: url },
        ],
      },
      { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
    ],
  };

  return <div className="ss-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#ss-main">Skip to the tool</a>
    <BrandDefinitions />
    <SuiteApp />

    <section id="about-suite" className="ss-about" aria-labelledby="about-title">
      <div className="ss-about-inner">
        <p className="ss-eyebrow">How it works</p>
        <h2 id="about-title">Everything you need to find, check and win a keyword</h2>
        <p className="ss-lede">The SEO Suite puts the research steps we run at the start of every client project into one free workspace: find the right keywords, see who ranks, size up competitors and fix the pages that should be ranking.</p>

        <div className="ss-feature-grid">
          {features.map(f => <div key={f.title} className="ss-feature"><h3>{f.title}</h3><p>{f.text}</p></div>)}
        </div>

        <h2>From keyword idea to a page that ranks</h2>
        <ol className="ss-steps">{steps.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>

        <h2>Frequently asked questions</h2>
        <div className="ss-faq">{faqs.map(f => <details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div>

        <div className="ss-cta">
          <div>
            <h2>Want us to turn this research into rankings?</h2>
            <p>Our team builds the keyword map, fixes the technical issues and creates the content and links that move you up. Start with a free audit of your site.</p>
          </div>
          <div className="ss-cta-actions">
            <a className="ss-btn ss-btn-primary" href="/#contact">Get a free SEO audit</a>
            <a className="ss-btn ss-btn-ghost" href="/seo-tools">More free SEO tools</a>
          </div>
        </div>

        <p className="ss-credit">Interface inspired by <a href="https://github.com/every-app/open-seo" target="_blank" rel="noopener noreferrer">OpenSEO</a>, an open-source SEO platform (MIT licence).</p>
      </div>
    </section>
    <Footer />
  </div>;
}

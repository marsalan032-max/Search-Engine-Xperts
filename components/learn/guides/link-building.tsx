import type { Post } from '../../blog/types';

// Learn SEO guide: Link Building. Headings with an `id` must match the entries in `toc`.
// Commercial query lives on /backlinks-digital-pr-services.

const faqs = [
  {
    question: 'What is link building?',
    answer: 'Link building is the process of earning links from other websites to yours. Search engines treat relevant links from trusted sites as evidence that your content is useful and credible, so links remain one of the signals that help pages rank. Modern link building focuses on earning links through content, data, relationships and PR rather than buying or trading them.',
  },
  {
    question: 'Is buying backlinks against Google’s rules?',
    answer: 'Yes. Buying or selling links that pass ranking credit is a violation of Google’s spam policies. Paid placements, sponsored posts and affiliate links are fine when they are marked with rel="sponsored" (or nofollow), because they then don’t pass ranking credit. Unmarked paid links risk being ignored by Google’s systems or triggering a manual action.',
  },
  {
    question: 'How many backlinks do I need to rank?',
    answer: 'There is no fixed number. It depends on the links your competitors for that query have, how relevant and trusted those links are, and how good your content is. Compare the referring domains of the pages ranking in the top five for your target query; that gives a realistic benchmark. One link from a respected publication in your industry can outweigh hundreds of low-quality ones.',
  },
  {
    question: 'Do nofollow links help SEO?',
    answer: 'Google treats nofollow, sponsored and ugc attributes as hints, and they generally pass little or no ranking credit. They can still be valuable: they send referral traffic, build brand awareness and lead to followed links when other writers discover you. A natural link profile includes a mix of both.',
  },
  {
    question: 'Should I use the disavow tool?',
    answer: 'Rarely. Google says most sites never need it, because its systems already ignore most spammy links. Use disavow only if you have a manual action for unnatural links, or if you know someone built large numbers of paid or manipulative links to your site in the past and you can’t get them removed.',
  },
  {
    question: 'How long does link building take to show results?',
    answer: 'New links usually take weeks to a few months to be discovered and reflected in rankings. Link building works best as a steady, ongoing effort tied to content worth linking to, rather than a burst of activity. Campaigns based on original data or strong PR angles can earn dozens of links in a few weeks when they land.',
  },
];

const quality = [
  { signal: 'Relevance', good: 'A site and page about your topic or industry', weak: 'Unrelated “general” blogs that cover everything' },
  { signal: 'Trust and traffic', good: 'A real publication or business with genuine readers', weak: 'Sites that exist only to sell guest posts' },
  { signal: 'Editorial placement', good: 'A link inside the article where it helps the reader', weak: 'Footer, sidebar or author-bio links on many sites' },
  { signal: 'Anchor text', good: 'Natural: your brand, the page title or a descriptive phrase', weak: 'The same exact-match keyword over and over' },
  { signal: 'Uniqueness', good: 'A site that links to few others and chose you', weak: 'A page with dozens of outbound links to unrelated sites' },
];

const tactics = [
  { name: 'Digital PR with original data', text: 'Publish a survey, study or analysis with a clear headline finding, then pitch it to journalists and writers who cover the topic. The most scalable way to earn authoritative links.' },
  { name: 'Expert commentary', text: 'Answer journalist requests on platforms such as Qwoted and Featured, and build direct relationships with reporters in your niche. Quick, specific quotes from genuine experts get used.' },
  { name: 'Linkable assets', text: 'Free tools, calculators, templates, statistics pages and definitive guides that people reference naturally when they write about the topic.' },
  { name: 'Unlinked brand mentions', text: 'Find articles that mention your business or products without linking, and ask the author to add a link. A high success rate because they already chose to mention you.' },
  { name: 'Broken link building', text: 'Find broken links on relevant resource pages, create or point to a genuinely better replacement on your site, and let the site owner know.' },
  { name: 'Partnerships and community', text: 'Suppliers, partners, associations, events, sponsorships and local organizations you really work with often list and link to you.' },
];

function Body() {
  return <>
    <p className="post-intro">Links from other websites are still one of the clearest signals that a page deserves to rank. But the way links are earned has changed. Bulk directories, link exchanges and paid guest-post networks now create more risk than value. The links that move rankings today are the ones that are hardest to get: editorial links from relevant, trusted sites that chose to reference you.</p>
    <p>This guide explains what makes a link valuable, which tactics earn those links safely, how to run outreach that gets replies, and what to avoid under Google’s spam policies.</p>

    <section id="why-links-matter">
      <h2>Why links still matter</h2>
      <p>Google uses links to discover new pages and as one of many signals of authority and relevance. A link from a respected site in your industry works like a recommendation. Links also matter beyond Google: AI assistants and answer engines draw heavily on well-known, frequently cited sources, so the mentions and links that build authority also make your brand more likely to be referenced in AI answers.</p>
      <p>Links are not a substitute for good content. They amplify pages that already deserve to rank. Before building links to a page, make sure it is the best answer for its query.</p>
    </section>

    <section id="link-quality">
      <h2>What makes a good backlink</h2>
      <p>One relevant editorial link can outweigh hundreds of weak ones. Judge every opportunity on these signals:</p>
      <div className="post-table"><table>
        <caption>Signals of a strong versus weak backlink</caption>
        <thead><tr><th scope="col">Signal</th><th scope="col">Strong</th><th scope="col">Weak</th></tr></thead>
        <tbody>{quality.map(q => <tr key={q.signal}><th scope="row">{q.signal}</th><td>{q.good}</td><td>{q.weak}</td></tr>)}</tbody>
      </table></div>
      <p>Third-party metrics such as Domain Rating or Authority Score are useful for quick filtering, but they are estimates from SEO tools, not Google metrics. A highly relevant site with modest metrics is usually a better target than an unrelated high-score site.</p>
    </section>

    <section id="tactics">
      <h2>Link building tactics that work</h2>
      <p>These tactics earn editorial links and keep working after updates because they create a real reason to link:</p>
      <div className="post-cards">
        {tactics.map(t => <div className="post-card" key={t.name}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a4 4 0 005.6 0l2.4-2.4a4 4 0 00-5.6-5.6L11 6.5" /><path d="M14 11a4 4 0 00-5.6 0L6 13.4a4 4 0 005.6 5.6L13 17.5" /></svg>
          <h3>{t.name}</h3>
          <p>{t.text}</p>
        </div>)}
      </div>
      <h3>Guest posting, done properly</h3>
      <p>Writing for respected publications in your industry is still worthwhile when the goal is reaching their readers. Google’s policies target large-scale guest posting with keyword-rich anchor links — content written mainly to get links. Write genuinely useful pieces for sites with real audiences, and accept a brand or author-bio link rather than insisting on exact-match anchors.</p>
    </section>

    <section id="outreach">
      <h2>How to run outreach that gets replies</h2>
      <ol className="post-steps">
        <li><span>01</span>Start with an asset or angle worth linking to; outreach can’t rescue a weak page.</li>
        <li><span>02</span>Build a targeted list: writers and sites that have covered this exact topic recently.</li>
        <li><span>03</span>Find the right person, not a generic info@ address.</li>
        <li><span>04</span>Write a short, personal email: why it’s relevant to their readers, the key finding, and the link.</li>
        <li><span>05</span>Follow up once after a few days, then stop.</li>
        <li><span>06</span>Track sends, replies and links won, and refine the angle based on what gets picked up.</li>
      </ol>
      <aside className="post-callout">
        <p className="t">Lead with value for their readers</p>
        <p>Editors don’t link to help your SEO. They link because it makes their article better. Every pitch should answer one question: why does this improve what they publish?</p>
      </aside>
    </section>

    <section id="avoid">
      <h2>What to avoid: link spam</h2>
      <p>Google’s spam policies describe link schemes that can lead to links being ignored or to manual actions. Avoid:</p>
      <ul className="post-list">
        <li>Buying or selling links that pass ranking credit, including paid guest posts without a <code>rel="sponsored"</code> attribute</li>
        <li>Excessive link exchanges (“link to me and I’ll link to you”)</li>
        <li>Private blog networks and sites built only to link out</li>
        <li>Large-scale article marketing or guest posting with keyword-rich anchor text</li>
        <li>Automated programs or services that create links to your site</li>
        <li>Low-quality directory and bookmark site links</li>
      </ul>
      <p>Mark paid, sponsored and affiliate links with <code>rel="sponsored"</code>, and user-generated links such as forum posts and comments with <code>rel="ugc"</code>.</p>
    </section>

    <section id="measure">
      <h2>How to measure link building</h2>
      <div className="post-table"><table>
        <caption>Link building metrics worth tracking</caption>
        <thead><tr><th scope="col">Metric</th><th scope="col">Why it matters</th></tr></thead>
        <tbody>
          <tr><th scope="row">Relevant referring domains won</th><td>Number of new, relevant sites linking to you each month</td></tr>
          <tr><th scope="row">Rankings and clicks of linked pages</th><td>Whether the links are moving the pages you built them for</td></tr>
          <tr><th scope="row">Referral traffic and conversions</th><td>Good links send visitors who become customers</td></tr>
          <tr><th scope="row">Brand mentions and branded searches</th><td>PR success shows up as more people searching for you by name</td></tr>
        </tbody>
      </table></div>
    </section>
  </>;
}

export const guide: Post = {
  slug: 'link-building',
  title: 'Link Building: How to Earn Backlinks That Move Rankings (Without Penalties)',
  metaTitle: 'Link Building Guide: Earn Backlinks Safely',
  description: 'Learn link building that works: what makes a quality backlink, digital PR, linkable assets, outreach that gets replies and what Google treats as spam.',
  dek: 'The links that move rankings are the hardest to get. Here is how to earn them, and what to stay away from.',
  eyebrow: 'Learn SEO · Links',
  category: 'Link Building',
  published: '2026-11-19',
  modified: '2026-11-19',
  readTime: '11 min read',
  image: { src: '/images/learn/link-building.png', alt: 'Link building guide cover: chain links connecting trusted websites', width: 1600, height: 900 },
  takeaways: [
    'Relevance, trust and editorial placement matter far more than the number of links.',
    'Digital PR with original data, expert commentary and linkable assets earn links safely at scale.',
    'Buying links that pass ranking credit breaks Google’s spam policies; mark paid links rel="sponsored".',
    'Outreach works when it explains why the link improves the publisher’s content.',
    'Measure relevant referring domains, rankings of linked pages, referral traffic and branded search.',
  ],
  toc: [
    { id: 'why-links-matter', label: 'Why links still matter' },
    { id: 'link-quality', label: 'What makes a good backlink' },
    { id: 'tactics', label: 'Tactics that work' },
    { id: 'outreach', label: 'Outreach that gets replies' },
    { id: 'avoid', label: 'What to avoid' },
    { id: 'measure', label: 'Measuring link building' },
    { id: 'faq', label: 'FAQs' },
  ],
  faqs,
  askSuggestions: [
    {
      question: 'What makes a backlink valuable?',
      answer: `Judge links on:
- **Relevance**: a site about your topic
- **Trust**: a real publication with real readers
- **Placement**: inside the content, where it helps the reader
- **Anchor text**: natural, not repeated exact-match keywords`,
      section: 'link-quality',
    },
    {
      question: 'Which link building tactics are safest?',
      answer: 'Digital PR with original data, expert commentary for journalists, linkable assets such as tools and statistics pages, reclaiming unlinked brand mentions, broken link building and real partnerships. Each creates a genuine reason to link.',
      section: 'tactics',
    },
    {
      question: 'What counts as link spam?',
      answer: `Google's spam policies cover:
- Buying or selling links that pass ranking credit
- Excessive link exchanges
- Private blog networks
- Large-scale guest posting with keyword-rich anchors
- Automated link creation and low-quality directories`,
      section: 'avoid',
    },
  ],
  cta: { eyebrow: 'Backlinks & digital PR', heading: 'Want links from sites your buyers read?', text: 'Get a free backlink gap analysis showing which sites link to your competitors and the campaigns that could win them for you.', label: 'Get my link audit', href: '/backlinks-digital-pr-services' },
  next: [
    { kicker: 'Service', title: 'Backlinks & Digital PR', text: 'Real outreach and PR campaigns that earn authoritative links.', href: '/backlinks-digital-pr-services', label: 'Explore the service' },
    { kicker: 'Guide', title: 'Advanced SEO Strategies', text: 'Original data, topical maps and other tactics past the basics.', href: '/learn-seo/advanced-seo-strategies', label: 'Read the guide' },
    { kicker: 'Free tool', title: 'On-Page SEO Checker', text: 'Make sure the page you build links to is fully optimized first.', href: '/seo-tools/on-page-seo-checker', label: 'Check a page' },
  ],
  Body,
};

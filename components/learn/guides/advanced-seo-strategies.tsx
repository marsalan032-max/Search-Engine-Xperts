import type { Post } from '../../blog/types';

// Learn SEO guide: Advanced SEO Strategies. Headings with an `id` must match the entries in `toc`.

const faqs = [
  {
    question: 'What counts as an advanced SEO strategy?',
    answer: 'Advanced strategies are the ones that only pay off once the basics — crawlable pages, sound on-page optimization and a reasonable content base — are in place. They include topical mapping, data-led content refreshes, internal link optimization at scale, entity and brand building, careful programmatic SEO, SERP feature targeting and conversion work on organic landing pages.',
  },
  {
    question: 'Is programmatic SEO risky?',
    answer: 'It is when it produces many near-identical pages with little unique value. Google’s spam policies specifically target scaled content abuse — pages generated at volume mainly to rank. Programmatic SEO works when each page is built on genuinely useful, unique data that answers a real search, such as live prices, availability, statistics or reviews for that specific item or place.',
  },
  {
    question: 'How do I find striking-distance keywords?',
    answer: 'In Google Search Console’s Performance report, filter for queries with an average position between roughly 8 and 20 and meaningful impressions. Those are pages Google already considers relevant but that sit just off page one or low on it. Improving the content, title and internal links for those pages is often the fastest traffic gain available.',
  },
  {
    question: 'How often should I update old content?',
    answer: 'Review your top pages at least twice a year and any page whose clicks have fallen for several months. Update facts, prices, screenshots and examples, fill gaps that newer competitors cover, and change the modified date only when the content meaningfully changes. Pages that no longer serve a purpose can be merged into stronger ones and redirected.',
  },
  {
    question: 'Do these strategies still matter with AI search?',
    answer: 'Yes. AI Overviews, AI Mode and assistants like ChatGPT draw on pages that are already well indexed, clearly structured and trusted. Topical depth, entity clarity, original data and brand mentions are exactly what make a site a likely source for those answers. Our AI SEO guide covers the extra steps specific to AI search.',
  },
];

const strategies = [
  'Build a topical map before you write anything else',
  'Mine Search Console for striking-distance queries',
  'Refresh and consolidate decaying content',
  'Optimize internal links with data, not instinct',
  'Strengthen your entity and brand signals',
  'Use programmatic SEO only with unique data',
  'Target SERP features deliberately',
  'Publish original data and research',
  'Use log files to see how Google really crawls you',
  'Optimize organic landing pages for conversion',
];

function Body() {
  return <>
    <p className="post-intro">Once a site is technically sound, has its main pages optimized and publishes content regularly, growth often slows. The easy wins are gone. What separates sites that keep growing is how they use data they already have, how deliberately they structure topics and links, and whether they create things competitors can’t copy.</p>
    <p>These ten strategies assume you have the basics covered. If you don’t, start with our <a href="/learn-seo/technical-seo">technical SEO checklist</a> first.</p>
    <ol className="post-steps">{strategies.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>

    <section id="topical-maps">
      <h2>1. Build a topical map before you write</h2>
      <p>A topical map is a planned structure of every subject your site should cover to be seen as an authority on its core topic, organized into pillar pages and supporting articles that link to each other. It replaces the habit of picking blog topics one at a time.</p>
      <ul className="post-list">
        <li>List the core topics tied to what you sell, then every subtopic and question buyers research before purchasing.</li>
        <li>Group keywords by the intent behind them, so each page targets one clear need; our <a href="/seo-tools/keyword-research-tool">keyword research tool</a> can group a keyword list for you.</li>
        <li>Assign one URL per group, mark what already exists, and fill the gaps in order of business value.</li>
        <li>Link supporting articles up to their pillar and across to siblings, using descriptive anchors.</li>
      </ul>
      <p>Topical depth helps Google understand that your site covers a subject thoroughly, and it gives every new page a home in the internal link structure from day one.</p>
    </section>

    <section id="striking-distance">
      <h2>2. Mine Search Console for striking-distance queries</h2>
      <p>The fastest traffic gains usually come from pages that already rank on the edge of page one. In Search Console’s Performance report, export queries with an average position of about 8–20 and solid impressions, then for each one:</p>
      <ol className="post-steps">
        <li><span>01</span>Check which page ranks and whether it is the right page for that query.</li>
        <li><span>02</span>Compare the page with the top three results: what questions, data or formats do they include that you don’t?</li>
        <li><span>03</span>Add the missing substance, and work the query naturally into a heading where it fits.</li>
        <li><span>04</span>Rewrite the title tag to match the query and the reason to click.</li>
        <li><span>05</span>Add two or three internal links to the page from relevant, strong pages.</li>
      </ol>
      <p>Also look for pages with high impressions but low click-through rate for their position. A better title and meta description can lift clicks without any change in ranking.</p>
    </section>

    <section id="content-refresh">
      <h2>3. Refresh and consolidate decaying content</h2>
      <p>Most content loses traffic over time as competitors publish newer, better pages and facts go out of date. A regular refresh cycle protects traffic you already earned.</p>
      <div className="post-table"><table>
        <caption>What to do with each type of underperforming page</caption>
        <thead><tr><th scope="col">Situation</th><th scope="col">Action</th></tr></thead>
        <tbody>
          <tr><th scope="row">Traffic declining, topic still relevant</th><td>Update facts, examples and structure; add what newer competitors cover</td></tr>
          <tr><th scope="row">Several thin pages on the same topic</th><td>Merge into one comprehensive page and 301-redirect the others</td></tr>
          <tr><th scope="row">Two pages competing for the same query</th><td>Pick the stronger one, merge the best content in, redirect the other</td></tr>
          <tr><th scope="row">No traffic, no links, no business purpose</th><td>Remove it (404/410) or noindex it if it serves users but not search</td></tr>
        </tbody>
      </table></div>
    </section>

    <section id="internal-links">
      <h2>4. Optimize internal links with data</h2>
      <p>Internal links are the strongest ranking lever fully under your control. Instead of adding links by instinct:</p>
      <ul className="post-list">
        <li>Find your pages with the most external backlinks and make sure they link to your priority commercial pages.</li>
        <li>Identify priority pages with few internal links pointing to them, and add contextual links from related content.</li>
        <li>Use descriptive, varied anchor text that tells users and search engines what the target page covers.</li>
        <li>Remove links to redirected, broken or noindexed URLs so crawlers spend time on pages that count.</li>
      </ul>
    </section>

    <section id="entity-brand">
      <h2>5. Strengthen your entity and brand signals</h2>
      <p>Search engines and AI systems increasingly understand the web as entities — people, organizations, products, places — and the relationships between them. A business that is clearly defined and consistently described across the web is easier to trust and to cite.</p>
      <ul className="post-list">
        <li>Use <code>Organization</code> and <code>Person</code> structured data with <code>sameAs</code> links to your real profiles.</li>
        <li>Keep your business name, description, founders and contact details consistent across your site, social profiles, directories and press.</li>
        <li>Show real expertise: author pages with credentials, first-hand experience in content, and named experts reviewing important pages.</li>
        <li>Earn mentions in publications and communities your audience trusts; branded search demand follows.</li>
      </ul>
    </section>

    <section id="programmatic">
      <h2>6. Programmatic SEO, done carefully</h2>
      <p>Programmatic SEO creates many pages from a template and a dataset, such as “[software] alternatives”, “[city] average rent” or “[product A] vs [product B]”. Done well, it serves thousands of real long-tail searches. Done badly, it is scaled content abuse, which Google’s spam policies target directly.</p>
      <aside className="post-callout">
        <p className="t">The test for a programmatic page</p>
        <p>Would this page still be useful if it were the only result for its query? If each page has unique data that answers the search — prices, specifications, statistics, availability, reviews — it can work. If pages differ only by a swapped keyword, they won’t.</p>
      </aside>
      <p>Launch in batches, check how many pages Google indexes and how they perform, and improve the template before scaling further.</p>
    </section>

    <section id="serp-features">
      <h2>7. Target SERP features deliberately</h2>
      <p>Results pages now include featured snippets, “People also ask”, videos, images, local packs, product listings and AI Overviews. Check which features appear for your priority queries and shape content to compete for them:</p>
      <ul className="post-list">
        <li><strong>Featured snippets and AI answers:</strong> a question-style heading followed by a direct, two-to-three sentence answer, then detail.</li>
        <li><strong>People also ask:</strong> cover related questions in clearly marked sections or an FAQ.</li>
        <li><strong>Video results:</strong> short, well-titled videos embedded on relevant pages with <code>VideoObject</code> schema.</li>
        <li><strong>Product and merchant results:</strong> complete product structured data and a Merchant Center feed.</li>
      </ul>
    </section>

    <section id="original-data">
      <h2>8. Publish original data and research</h2>
      <p>Original research — surveys, analysis of your own anonymized data, tests and benchmarks — is the content that earns links and citations on its own. Journalists, bloggers and AI systems all need sources for statistics. One solid annual study can earn more authority than a year of standard blog posts. See our <a href="/learn-seo/link-building">link building guide</a> for how to promote it.</p>
    </section>

    <section id="log-files">
      <h2>9. Use log files to see how Google crawls you</h2>
      <p>Server logs record every request Googlebot makes. On larger sites they reveal what crawl reports can’t: sections Google ignores, parameter URLs eating crawl activity, slow responses, and how quickly new pages are discovered. Filter logs for verified Googlebot requests and compare where crawl activity goes with where your valuable pages are.</p>
    </section>

    <section id="conversion">
      <h2>10. Optimize organic landing pages for conversion</h2>
      <p>More traffic only matters if it turns into leads or sales. Look at your top organic landing pages in analytics and ask whether a visitor from that query can see the answer and the next step on the first screen. Clear calls to action, trust signals near them, fast load times and forms that ask only for what you need often lift results more than another ranking position.</p>
    </section>
  </>;
}

export const guide: Post = {
  slug: 'advanced-seo-strategies',
  title: 'Advanced SEO Strategies: 10 Tactics for Sites That Have Mastered the Basics',
  metaTitle: '10 Advanced SEO Strategies for Sites Past the Basics',
  description: '10 advanced SEO strategies: topical maps, striking-distance keywords, content refreshes, internal links, entity SEO, programmatic SEO and more.',
  dek: 'When the easy wins are gone, growth comes from using your own data, structuring topics deliberately and creating what competitors can’t copy.',
  eyebrow: 'Learn SEO · Advanced',
  category: 'Advanced SEO',
  published: '2026-11-19',
  modified: '2026-11-19',
  readTime: '12 min read',
  image: { src: '/images/learn/advanced-seo-strategies.png', alt: 'Advanced SEO strategies guide cover: connected topic map with growth chart', width: 1600, height: 900 },
  takeaways: [
    'Plan content with a topical map so every page has a clear intent and a place in the link structure.',
    'Pages ranking around positions 8–20 in Search Console are usually the fastest traffic wins.',
    'Refresh, merge or remove decaying content on a regular cycle instead of only publishing new pages.',
    'Programmatic SEO works only when each page carries unique, useful data.',
    'Original research earns links and AI citations that standard content rarely does.',
  ],
  toc: [
    { id: 'topical-maps', label: 'Topical maps' },
    { id: 'striking-distance', label: 'Striking-distance queries' },
    { id: 'content-refresh', label: 'Content refresh and consolidation' },
    { id: 'internal-links', label: 'Internal link optimization' },
    { id: 'entity-brand', label: 'Entity and brand signals' },
    { id: 'programmatic', label: 'Programmatic SEO' },
    { id: 'serp-features', label: 'SERP features' },
    { id: 'original-data', label: 'Original data' },
    { id: 'log-files', label: 'Log file analysis' },
    { id: 'conversion', label: 'Conversion optimization' },
    { id: 'faq', label: 'FAQs' },
  ],
  faqs,
  askSuggestions: [
    {
      question: 'What is the quickest advanced SEO win?',
      answer: `Usually striking-distance queries:
- In Search Console, filter queries at average positions ~8–20 with solid impressions
- Check the ranking page is the right one
- Add what the top results cover that you don't
- Sharpen the title and add internal links`,
      section: 'striking-distance',
    },
    {
      question: 'When does programmatic SEO work?',
      answer: 'When every page carries unique, useful data that answers the search — prices, specs, statistics, availability or reviews. Pages that only swap a keyword count as scaled content abuse under Google’s spam policies.',
      section: 'programmatic',
    },
    {
      question: 'What should I do with old, declining posts?',
      answer: `Match the action to the situation:
- Still relevant: update facts and fill gaps
- Several thin pages on one topic: merge and redirect
- Two pages competing: keep the stronger, redirect the other
- No traffic, links or purpose: remove or noindex`,
      section: 'content-refresh',
    },
  ],
  cta: { eyebrow: 'SEO strategy', heading: 'Ready for growth beyond the basics?', text: 'Get a free strategy session: we’ll review your Search Console data and show the three opportunities worth the most traffic.', label: 'Book a strategy call', href: '/#contact' },
  next: [
    { kicker: 'Guide', title: 'AI SEO Guide', text: 'How to get cited in AI Overviews, AI Mode, ChatGPT and Perplexity.', href: '/learn-seo/ai-seo', label: 'Read the guide' },
    { kicker: 'Service', title: 'SEO Content Writing', text: 'Topical maps and expert content built to rank and convert.', href: '/seo-content-writing-services', label: 'Explore the service' },
    { kicker: 'Free tool', title: 'Keyword Research Tool', text: 'Expand and group keywords by intent for your topical map.', href: '/seo-tools/keyword-research-tool', label: 'Find keywords' },
  ],
  Body,
};

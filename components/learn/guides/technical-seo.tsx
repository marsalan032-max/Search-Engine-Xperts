import type { Post } from '../../blog/types';

// Learn SEO guide: Technical SEO. Headings with an `id` must match the entries in `toc`.

const faqs = [
  {
    question: 'What is technical SEO?',
    answer: 'Technical SEO is the work that makes sure search engines can find, crawl, render and index your pages, and that those pages load quickly and securely. It covers robots.txt, XML sitemaps, status codes, redirects, canonical tags, JavaScript rendering, site speed, mobile experience, structured data and international settings such as hreflang.',
  },
  {
    question: 'Does robots.txt stop a page from being indexed?',
    answer: 'No. robots.txt controls crawling, not indexing. A blocked URL can still be indexed (usually without a description) if other pages link to it. To keep a page out of search results, allow crawling and use a noindex meta tag or X-Robots-Tag header, or protect it with a login. Google has to crawl the page to see the noindex.',
  },
  {
    question: 'Should every page have a canonical tag?',
    answer: 'It is good practice to give every indexable page a self-referencing canonical tag with its absolute, preferred URL. That protects against duplicates created by tracking parameters and alternate paths. Remember that canonicals are a strong hint, not a command: if your internal links, sitemap and redirects point elsewhere, Google may choose a different canonical.',
  },
  {
    question: 'How often should I run a technical SEO audit?',
    answer: 'Run a full crawl-based audit at least quarterly, and always before and after a redesign, migration or platform change. In between, check Search Console’s Pages and Core Web Vitals reports monthly. Large or frequently changing sites benefit from automated weekly crawls and alerts for spikes in errors or noindexed pages.',
  },
  {
    question: 'Is crawl budget something I need to worry about?',
    answer: 'Usually only on large sites. Google’s guidance says crawl budget mainly matters for very large sites (around a million pages or more) and for sites with 10,000 or more pages whose content changes daily. For smaller sites, focus on making important pages discoverable through internal links and sitemaps, and avoid generating endless parameter URLs.',
  },
  {
    question: 'Do Core Web Vitals affect rankings?',
    answer: 'They are part of the page experience signals Google uses, but relevance and content quality matter far more. A fast page won’t outrank a much more relevant one. Where competing pages are similarly relevant, better Core Web Vitals can help, and they nearly always improve conversion rates.',
  },
];

const pipeline = [
  { stage: 'Discover', question: 'Can Google find the URL?', checks: 'Internal links, XML sitemap, backlinks' },
  { stage: 'Crawl', question: 'Is Google allowed to fetch it, and does it respond well?', checks: 'robots.txt, status codes, server speed, redirects' },
  { stage: 'Render', question: 'Can Google see the content after JavaScript runs?', checks: 'Rendered HTML, blocked resources, client-side links' },
  { stage: 'Index', question: 'Is the page eligible and chosen for the index?', checks: 'noindex, canonicals, duplicates, content quality' },
  { stage: 'Rank & serve', question: 'Is the experience good once people arrive?', checks: 'Core Web Vitals, HTTPS, mobile, structured data' },
];

const statusCodes = [
  { code: '200', meaning: 'OK', note: 'What every indexable page should return' },
  { code: '301 / 308', meaning: 'Permanent redirect', note: 'Use for moved pages; passes signals to the target' },
  { code: '302 / 307', meaning: 'Temporary redirect', note: 'Only when the move really is temporary' },
  { code: '404 / 410', meaning: 'Not found / gone', note: 'Fine for removed pages with no replacement' },
  { code: '5xx', meaning: 'Server error', note: 'Fix quickly; persistent errors slow crawling and drop pages' },
];

const checklist = [
  'robots.txt allows all important pages and the CSS/JS needed to render them',
  'An XML sitemap lists only canonical, indexable URLs that return 200, and is submitted in Search Console',
  'Every important page is linked from at least one other indexable page, ideally within three clicks of home',
  'No internal links point to redirects, 404s or non-canonical URLs',
  'Redirects go straight to the final URL in one hop, with no chains or loops',
  'Each indexable page has a self-referencing canonical and a unique title',
  'No important page carries a stray noindex (check templates and HTTP headers)',
  'Primary content and links are present in the rendered HTML, not only after user interaction',
  'HTTPS everywhere, with HTTP and non-preferred hostnames redirecting to one version',
  'Core Web Vitals pass for your main templates on mobile',
  'Structured data validates without errors in the Rich Results Test',
  'hreflang tags (if used) are reciprocal and point to canonical URLs',
];

function Body() {
  return <>
    <p className="post-intro">Great content can’t rank if search engines can’t reach it, render it or decide which version to index. Technical SEO is the foundation underneath everything else: when it’s right, nobody notices; when it breaks, whole sections of a site can drop out of search overnight.</p>
    <p>This guide follows the path a page takes through Google — discovery, crawling, rendering, indexing and serving — and explains what to check at each stage. It finishes with a checklist you can work through on any site.</p>

    <section id="how-search-works">
      <h2>How search engines process a page</h2>
      <p>Every technical SEO issue blocks one stage of this pipeline. Diagnosing problems gets much easier when you ask which stage is failing.</p>
      <div className="post-table"><table>
        <caption>The stages a URL passes through, and what to check at each</caption>
        <thead><tr><th scope="col">Stage</th><th scope="col">Question</th><th scope="col">What to check</th></tr></thead>
        <tbody>{pipeline.map(p => <tr key={p.stage}><th scope="row">{p.stage}</th><td>{p.question}</td><td>{p.checks}</td></tr>)}</tbody>
      </table></div>
      <p>Search Console’s URL Inspection tool shows where a specific URL stands: whether it was discovered, when it was last crawled, how it rendered, whether it is indexed and which canonical Google chose.</p>
    </section>

    <section id="crawlability">
      <h2>Crawlability: robots.txt, sitemaps and internal links</h2>
      <h3>robots.txt</h3>
      <p>robots.txt sits at the root of your domain and tells crawlers which paths they may fetch. Use it to stop crawlers wasting time on infinite spaces such as internal search results, sort parameters and calendar pages. Don’t use it to hide pages from search results; that is what noindex is for. And never block the CSS and JavaScript files Google needs to render your pages.</p>
      <h3>XML sitemaps</h3>
      <p>A sitemap lists the URLs you want indexed. Keep it clean: only canonical, indexable pages that return 200. A sitemap full of redirects and noindexed pages tells Google your sitemap can’t be trusted. Include an accurate <code>lastmod</code> date when content meaningfully changes; Google ignores the <code>priority</code> and <code>changefreq</code> fields.</p>
      <h3>Internal links</h3>
      <p>Internal links are how both users and crawlers discover pages and how authority flows through a site. Use normal <code>&lt;a href&gt;</code> links (not click handlers), descriptive anchor text, and make sure no important page is an orphan with zero internal links pointing to it.</p>
    </section>

    <section id="status-redirects">
      <h2>Status codes and redirects</h2>
      <p>The HTTP status code tells crawlers what happened when they requested a URL.</p>
      <div className="post-table"><table>
        <caption>Status codes that matter for SEO</caption>
        <thead><tr><th scope="col">Code</th><th scope="col">Meaning</th><th scope="col">SEO note</th></tr></thead>
        <tbody>{statusCodes.map(s => <tr key={s.code}><th scope="row">{s.code}</th><td>{s.meaning}</td><td>{s.note}</td></tr>)}</tbody>
      </table></div>
      <ul className="post-list">
        <li><strong>Soft 404s:</strong> pages that say “not found” or are nearly empty but return 200. Return a real 404, or add useful content.</li>
        <li><strong>Redirect chains:</strong> A → B → C wastes crawl time and loses users on slow connections. Point every redirect straight at the final URL.</li>
        <li><strong>Internal links to redirects:</strong> update links to point at the final URL rather than relying on the redirect.</li>
      </ul>
      <p>Our free <a href="/seo-tools/technical-seo-checker">technical SEO checker</a> shows the status code and full redirect chain for any URL.</p>
    </section>

    <section id="indexing">
      <h2>Indexing: noindex, canonicals and duplicates</h2>
      <p>Being crawled isn’t the same as being indexed. Google chooses which pages to index, and which of several similar URLs to treat as the main version.</p>
      <ul className="post-list">
        <li><strong>noindex</strong> (meta robots or <code>X-Robots-Tag</code> header) removes a page from results. Audit templates regularly; a stray noindex left from a staging site is one of the most damaging and common mistakes.</li>
        <li><strong>Canonical tags</strong> tell Google which URL you prefer among duplicates. Use absolute URLs, point to an indexable 200 page, and keep internal links, sitemaps and redirects consistent with it.</li>
        <li><strong>Duplicate sources</strong> include HTTP and HTTPS, www and non-www, trailing slashes, uppercase letters, tracking parameters and printer versions. Redirect or canonicalize each to one version.</li>
      </ul>
      <p>In Search Console’s Pages report, “Crawled – currently not indexed” and “Discovered – currently not indexed” usually point to quality or internal-linking problems rather than a technical block. Improve or consolidate those pages and link to them from relevant, stronger pages.</p>
    </section>

    <section id="rendering">
      <h2>JavaScript and rendering</h2>
      <p>Google renders JavaScript, but rendering happens after crawling and can be delayed, and other search engines and AI crawlers often don’t render at all. The safest pattern is to put the main content, headings, links and structured data in the initial HTML response.</p>
      <ul className="post-list">
        <li>Prefer server-side rendering or static generation for pages that need to rank.</li>
        <li>Make sure links are real <code>&lt;a href&gt;</code> elements, not buttons that change the URL with JavaScript.</li>
        <li>Don’t rely on content that only loads after a click, scroll or hover.</li>
        <li>Compare the raw HTML with the rendered HTML in URL Inspection; anything only in the rendered version depends on JavaScript.</li>
      </ul>
    </section>

    <section id="performance">
      <h2>Speed, Core Web Vitals and HTTPS</h2>
      <p>Core Web Vitals measure loading (LCP, good at 2.5 seconds or less), responsiveness (INP, good at 200 ms or less) and visual stability (CLS, good at 0.1 or less) for real users. Check them in Search Console by template group and diagnose with PageSpeed Insights. Our <a href="/learn-seo/mobile-seo">mobile SEO guide</a> covers the fixes that matter most.</p>
      <p>Serve the whole site over HTTPS with a valid certificate, redirect HTTP to HTTPS in one hop, and consider an HSTS header so browsers always use the secure version.</p>
    </section>

    <section id="structured-data-international">
      <h2>Structured data and international SEO</h2>
      <h3>Structured data</h3>
      <p>Schema markup in JSON-LD helps search engines understand what a page is about — an organization, a product, an article, a local business — and can make it eligible for rich results. Mark up only what is visible on the page, and validate it with Google’s Rich Results Test.</p>
      <h3>hreflang for multilingual sites</h3>
      <p>If you have versions of a page for different languages or countries, hreflang tags tell Google which version to show to which users. Every version must list all the others and itself, and each tag must point to a canonical, indexable URL. Missing return links are the most common hreflang error.</p>
    </section>

    <section id="checklist">
      <h2>Technical SEO checklist</h2>
      <p>Work through this list on any site. Fix items that affect many pages (templates, robots.txt, redirects) before one-off issues.</p>
      <ol className="post-steps">{checklist.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
      <aside className="post-callout">
        <p className="t">Prioritize by impact, not by count</p>
        <p>A crawler might report 4,000 missing alt attributes and one noindex on your main category template. The noindex matters more. Rank issues by the traffic and revenue of the pages they affect.</p>
      </aside>
    </section>
  </>;
}

export const guide: Post = {
  slug: 'technical-seo',
  title: 'Technical SEO: The Complete Checklist for Crawling, Indexing and Speed',
  metaTitle: 'Technical SEO Guide & Checklist: Crawling, Indexing, Speed',
  description: 'Technical SEO checklist: robots.txt, sitemaps, status codes, redirects, canonicals, JavaScript rendering, Core Web Vitals, schema and hreflang.',
  dek: 'Follow a page from discovery to search results, find where it’s getting stuck, and fix the foundations that every ranking depends on.',
  eyebrow: 'Learn SEO · Technical',
  category: 'Technical SEO',
  published: '2026-11-19',
  modified: '2026-11-19',
  readTime: '13 min read',
  image: { src: '/images/learn/technical-seo.png', alt: 'Technical SEO guide cover: crawl pipeline from discovery to index', width: 1600, height: 900 },
  takeaways: [
    'Diagnose issues by stage: discover, crawl, render, index, serve. URL Inspection shows where a page stands.',
    'robots.txt controls crawling, not indexing; use noindex to keep pages out of results.',
    'Keep sitemaps, internal links, redirects and canonicals pointing at the same preferred URLs.',
    'Put main content, links and schema in the initial HTML instead of relying on client-side JavaScript.',
    'Fix template-level problems first; they affect hundreds of pages at once.',
  ],
  toc: [
    { id: 'how-search-works', label: 'How search engines process a page' },
    { id: 'crawlability', label: 'Crawlability' },
    { id: 'status-redirects', label: 'Status codes and redirects' },
    { id: 'indexing', label: 'Indexing and canonicals' },
    { id: 'rendering', label: 'JavaScript and rendering' },
    { id: 'performance', label: 'Speed and HTTPS' },
    { id: 'structured-data-international', label: 'Schema and hreflang' },
    { id: 'checklist', label: 'Technical SEO checklist' },
    { id: 'faq', label: 'FAQs' },
  ],
  faqs,
  askSuggestions: [
    {
      question: 'Why is my page not indexed?',
      answer: `Check each stage in turn:
- **Discovered?** Is it linked internally and in the sitemap?
- **Crawlable?** Is it blocked in robots.txt, or returning an error?
- **Indexable?** Does it carry noindex, or canonicalize to another URL?
- **Chosen?** "Crawled – currently not indexed" usually means a quality or internal-linking problem.
URL Inspection in Search Console shows which stage is failing.`,
      section: 'indexing',
    },
    {
      question: 'Does robots.txt remove pages from Google?',
      answer: 'No. robots.txt only controls crawling; blocked URLs can still be indexed if they are linked. Use a noindex meta tag or X-Robots-Tag header, and allow crawling so Google can see it.',
      section: 'crawlability',
    },
    {
      question: 'What should be in my XML sitemap?',
      answer: 'Only canonical, indexable URLs that return 200, with accurate lastmod dates. Leave out redirects, noindexed pages and duplicates. Google ignores priority and changefreq.',
      section: 'crawlability',
    },
  ],
  cta: { eyebrow: 'Technical SEO audit', heading: 'Not sure what’s holding your site back?', text: 'Get a free technical audit with every issue ranked by the traffic it affects and a clear fix for each.', label: 'Get my free audit', href: '/#contact' },
  next: [
    { kicker: 'Free tool', title: 'Technical SEO Checker', text: 'Status codes, redirects, robots.txt, canonicals and indexability for any URL.', href: '/seo-tools/technical-seo-checker', label: 'Check a URL' },
    { kicker: 'Free tool', title: 'SEO Audit Tool', text: 'A scored technical and on-page audit with prioritized fixes.', href: '/seo-tools/seo-audit-tool', label: 'Run an audit' },
    { kicker: 'Guide', title: 'Mobile SEO Guide', text: 'Mobile-first indexing, Core Web Vitals and usability on phones.', href: '/learn-seo/mobile-seo', label: 'Read the guide' },
  ],
  Body,
};

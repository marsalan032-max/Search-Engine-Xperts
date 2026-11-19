import type { Post } from '../../blog/types';

// Learn SEO guide: Mobile SEO. Headings with an `id` must match the entries in `toc`.

const faqs = [
  {
    question: 'What is mobile SEO?',
    answer: 'Mobile SEO is the work of making sure a website ranks and performs well for people searching on phones. Because Google now uses the mobile version of a page for crawling and indexing, mobile SEO covers both the mobile experience (layout, speed, usability) and making sure the mobile version contains all the content, links and structured data that should be indexed.',
  },
  {
    question: 'Does Google still have a separate desktop index?',
    answer: 'No. Google completed its move to mobile-first indexing in 2024, so it crawls and indexes sites with its smartphone crawler. What your mobile page shows is effectively what Google indexes. Desktop rankings are still reported separately because results can differ by device, but they are based on the same mobile-first index.',
  },
  {
    question: 'Is a separate m-dot site bad for SEO?',
    answer: 'It is not penalized, but it is harder to maintain correctly. Separate mobile URLs need matching content, bidirectional annotations and careful redirects, and mistakes are common. A responsive design that serves the same HTML at the same URL to every device is simpler and is what Google recommends for most sites.',
  },
  {
    question: 'How do I test if my site is mobile friendly?',
    answer: 'Google retired its standalone Mobile-Friendly Test, so use Lighthouse in Chrome DevTools or PageSpeed Insights for a lab check, the URL Inspection tool in Search Console to see the page as Googlebot renders it, and the Core Web Vitals report for real-user data. Then test on a real mid-range phone over a normal mobile connection.',
  },
  {
    question: 'Do pop-ups hurt mobile rankings?',
    answer: 'Intrusive interstitials that cover the main content when someone arrives from search can hurt how the page is evaluated and almost always hurt conversions. Legally required banners, such as cookie consent or age verification, and small banners that use a reasonable amount of screen space are fine.',
  },
];

const checklist = [
  'Use responsive design with a correct viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">',
  'Serve the same main content, headings, internal links, images and structured data on mobile as on desktop',
  'Keep body text at a readable size (16px is a good baseline) without needing to zoom',
  'Make buttons and links easy to tap, around 48px, with space between neighbouring targets',
  'Put the main action — call, book, add to cart — within easy reach of the thumb',
  'Avoid full-screen pop-ups on arrival; use small banners for offers and newsletters',
  'Don’t block CSS, JavaScript or images in robots.txt; Google needs them to render the page',
  'Test every key template on a real mid-range phone, not only in a desktop browser',
];

function Body() {
  return <>
    <p className="post-intro">For most websites, more than half of search visits now come from phones, and Google crawls and indexes the web with a smartphone crawler. If something is missing, slow or hard to use on mobile, it is missing, slow or hard to use as far as search is concerned.</p>
    <p>This guide explains what mobile-first indexing means in practice, how to check that your mobile pages contain everything that should rank, how to meet Core Web Vitals on real phones, and the usability details that decide whether mobile visitors convert or leave.</p>

    <section id="mobile-first-indexing">
      <h2>What mobile-first indexing means</h2>
      <p>Mobile-first indexing means Google predominantly uses the mobile version of a page’s content for indexing and ranking. Google completed the switch for the whole web in 2024. There is no separate desktop index to fall back on.</p>
      <p>The practical consequence is simple: <strong>anything that only appears on desktop may as well not exist for search</strong>. Common examples include:</p>
      <ul className="post-list">
        <li>Text hidden from the mobile template “to keep it clean”, such as product details or FAQs</li>
        <li>Navigation links and footer links removed on mobile, which weakens internal linking</li>
        <li>Structured data that only the desktop template outputs</li>
        <li>Images that are lazy-loaded in a way that only triggers on desktop scroll or hover</li>
        <li>Different title tags, meta descriptions or canonical tags between mobile and desktop versions</li>
      </ul>
      <p>Collapsing content into tabs or accordions on mobile is fine. Google indexes content that is in the HTML even if it is hidden behind a tap. The problem is content that isn’t delivered to mobile at all.</p>
    </section>

    <section id="content-parity">
      <h2>Check content parity between mobile and desktop</h2>
      <p>If your site is fully responsive (same HTML for every device), parity is mostly guaranteed. If you use adaptive serving or separate mobile URLs, check it on purpose.</p>
      <ol className="post-steps">
        <li><span>01</span>Pick your most important templates: home, category or service pages, product pages, articles.</li>
        <li><span>02</span>In Search Console, run URL Inspection and view the rendered HTML and screenshot of the tested page.</li>
        <li><span>03</span>Compare headings, body text, internal links, images and structured data with the desktop version.</li>
        <li><span>04</span>Fix anything missing at the template level, then request indexing for a sample and monitor.</li>
      </ol>
      <p>Our free <a href="/seo-tools/on-page-seo-checker">on-page SEO checker</a> fetches a page the way a crawler does and lists its title, headings, links, images and schema, which makes quick comparisons easy.</p>
    </section>

    <section id="page-speed">
      <h2>Mobile speed and Core Web Vitals</h2>
      <p>Phones have slower processors and less reliable connections than desktops, so performance problems show up there first. Google’s Core Web Vitals measure the experience real Chrome users have, and the thresholds are the same for mobile and desktop:</p>
      <div className="post-table"><table>
        <caption>Core Web Vitals thresholds (assessed at the 75th percentile of visits)</caption>
        <thead><tr><th scope="col">Metric</th><th scope="col">Measures</th><th scope="col">Good</th><th scope="col">Poor</th></tr></thead>
        <tbody>
          <tr><th scope="row">Largest Contentful Paint (LCP)</th><td>Loading of the main content</td><td>2.5 s or less</td><td>Over 4 s</td></tr>
          <tr><th scope="row">Interaction to Next Paint (INP)</th><td>Responsiveness to taps and clicks</td><td>200 ms or less</td><td>Over 500 ms</td></tr>
          <tr><th scope="row">Cumulative Layout Shift (CLS)</th><td>Visual stability while loading</td><td>0.1 or less</td><td>Over 0.25</td></tr>
        </tbody>
      </table></div>
      <h3>The fixes that usually matter most on mobile</h3>
      <ul className="post-list">
        <li><strong>LCP:</strong> serve correctly sized, compressed images (WebP or AVIF), don’t lazy-load the main hero image, preload it, and reduce server response time with caching or a CDN.</li>
        <li><strong>INP:</strong> cut and defer JavaScript, especially third-party chat, tracking and A/B testing scripts; break long tasks into smaller pieces so taps respond quickly.</li>
        <li><strong>CLS:</strong> set width and height on images and embeds, reserve space for ads and banners, and avoid injecting content above what people are already reading.</li>
      </ul>
      <p>Use field data from Search Console or PageSpeed Insights to decide what to fix, and lab tools like Lighthouse to diagnose why. Good Core Web Vitals won’t outrank more relevant content, but when pages are otherwise comparable, a faster page has the edge, and it nearly always converts better.</p>
    </section>

    <section id="mobile-usability">
      <h2>Mobile usability: design for thumbs</h2>
      <p>Google removed its Mobile Usability report from Search Console, but the underlying issues still cost you visitors. Use this checklist for every key template:</p>
      <ol className="post-steps">{checklist.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
      <aside className="post-callout">
        <p className="t">Intrusive interstitials</p>
        <p>Full-screen pop-ups that cover the content as soon as a visitor arrives from search frustrate users and can count against the page. Cookie notices and age gates required by law are fine; newsletter takeovers are not worth the risk.</p>
      </aside>
    </section>

    <section id="mobile-search-behaviour">
      <h2>How mobile search behaviour differs</h2>
      <p>People search differently on phones, and pages that match that behaviour win more clicks and more conversions.</p>
      <ul className="post-list">
        <li><strong>More local intent.</strong> “Near me”, “open now” and directions searches are mostly mobile. Local businesses should keep their Google Business Profile complete; see our <a href="/learn-seo/local-seo">local SEO guide</a>.</li>
        <li><strong>Shorter attention.</strong> The answer, price or main action should be visible in the first screen. Long introductions push the useful part below the fold.</li>
        <li><strong>Click-to-call and maps.</strong> Make phone numbers tappable links and addresses link to maps.</li>
        <li><strong>Voice and conversational queries.</strong> Questions phrased naturally (“how much does a boiler service cost”) favour pages with clear question-style headings and direct answers.</li>
      </ul>
    </section>

    <section id="testing">
      <h2>How to test and monitor mobile SEO</h2>
      <div className="post-table"><table>
        <caption>Tools for mobile SEO checks</caption>
        <thead><tr><th scope="col">Tool</th><th scope="col">Use it for</th></tr></thead>
        <tbody>
          <tr><th scope="row">Search Console: URL Inspection</th><td>See the page as Google’s smartphone crawler renders it</td></tr>
          <tr><th scope="row">Search Console: Core Web Vitals</th><td>Real-user LCP, INP and CLS by template group</td></tr>
          <tr><th scope="row">PageSpeed Insights / Lighthouse</th><td>Lab diagnostics and specific performance fixes</td></tr>
          <tr><th scope="row">Search Console: Performance (device filter)</th><td>Compare mobile and desktop clicks, CTR and position</td></tr>
          <tr><th scope="row">A real mid-range phone</th><td>The experience most visitors actually have</td></tr>
        </tbody>
      </table></div>
      <p>If mobile CTR or conversion rate is well below desktop for the same pages, the mobile experience is usually the reason. Start there before creating more content.</p>
    </section>
  </>;
}

export const guide: Post = {
  slug: 'mobile-seo',
  title: 'Mobile SEO: How to Optimize Your Site for Mobile-First Indexing',
  metaTitle: 'Mobile SEO Guide: Optimize for Mobile-First Indexing',
  description: 'Learn mobile SEO: what mobile-first indexing means, content parity, Core Web Vitals thresholds, mobile usability, and how to test your site on phones.',
  dek: 'Google indexes the mobile version of your site. Here is how to make sure that version has everything that should rank, loads fast and converts.',
  eyebrow: 'Learn SEO · Mobile',
  category: 'Mobile SEO',
  published: '2026-11-19',
  modified: '2026-11-19',
  readTime: '10 min read',
  image: { src: '/images/learn/mobile-seo.png', alt: 'Mobile SEO guide cover: smartphone showing a fast-loading search result', width: 1600, height: 900 },
  takeaways: [
    'Google indexes the mobile version of every site; content missing on mobile is missing from search.',
    'Accordions and tabs are fine; content not delivered to mobile at all is the problem.',
    'Core Web Vitals “good” thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile.',
    'Design for thumbs: readable text, 48px tap targets, the main action in reach and no arrival pop-ups.',
    'Compare mobile and desktop CTR and conversions in Search Console to find where mobile loses visitors.',
  ],
  toc: [
    { id: 'mobile-first-indexing', label: 'What mobile-first indexing means' },
    { id: 'content-parity', label: 'Check content parity' },
    { id: 'page-speed', label: 'Speed and Core Web Vitals' },
    { id: 'mobile-usability', label: 'Mobile usability' },
    { id: 'mobile-search-behaviour', label: 'Mobile search behaviour' },
    { id: 'testing', label: 'Testing and monitoring' },
    { id: 'faq', label: 'FAQs' },
  ],
  faqs,
  askSuggestions: [
    {
      question: 'What are the Core Web Vitals thresholds?',
      answer: `Good scores, measured at the 75th percentile of real visits:
- **LCP** (loading): 2.5 seconds or less
- **INP** (responsiveness): 200 ms or less
- **CLS** (visual stability): 0.1 or less`,
      section: 'page-speed',
    },
    {
      question: 'Is hidden content in accordions indexed?',
      answer: 'Yes. Content inside tabs or accordions is indexed as long as it is in the HTML delivered to mobile. The problem is content that the mobile version does not include at all.',
      section: 'mobile-first-indexing',
    },
    {
      question: 'How do I check what Google sees on mobile?',
      answer: 'Use URL Inspection in Search Console and view the rendered HTML and screenshot. Compare headings, text, links, images and structured data with your desktop version, and fix gaps at the template level.',
      section: 'content-parity',
    },
  ],
  cta: { eyebrow: 'Free SEO audit', heading: 'Losing visitors on mobile?', text: 'Get a free audit of your mobile templates, Core Web Vitals and usability, with the fixes ranked by impact.', label: 'Get my free audit', href: '/#contact' },
  next: [
    { kicker: 'Guide', title: 'Technical SEO Checklist', text: 'Crawling, indexing, rendering, speed and structured data in one checklist.', href: '/learn-seo/technical-seo', label: 'Read the guide' },
    { kicker: 'Free tool', title: 'On-Page SEO Checker', text: 'See any page’s title, headings, links, images and schema as a crawler does.', href: '/seo-tools/on-page-seo-checker', label: 'Check a page' },
    { kicker: 'Guide', title: 'Local SEO Guide', text: 'Most “near me” searches happen on phones. Win the map pack.', href: '/learn-seo/local-seo', label: 'Read the guide' },
  ],
  Body,
};

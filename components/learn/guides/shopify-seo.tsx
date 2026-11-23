import type { Post } from '../../blog/types';

// Learn SEO guide: Shopify SEO. Headings with an `id` must match the entries in `toc`.

const faqs = [
  {
    question: 'Is Shopify good for SEO?',
    answer: 'Yes. Shopify handles much of the technical foundation for you: HTTPS, an automatic XML sitemap, canonical tags on duplicate product URLs, editable titles and meta descriptions, and mobile-friendly themes. Its limits — fixed URL folders, collection-based product paths and app bloat — are manageable once you know them. Most Shopify stores that struggle in search do so because of thin collection pages and slow themes, not the platform.',
  },
  {
    question: 'Can I change Shopify’s URL structure?',
    answer: 'Not the folders. Products always live under /products/, collections under /collections/, pages under /pages/ and blog posts under /blogs/. You can edit the handle (the last part of the URL) for every item. Choose short, descriptive handles and set up a redirect whenever you change one; Shopify offers to create it automatically.',
  },
  {
    question: 'How do I edit robots.txt on Shopify?',
    answer: 'Add a robots.txt.liquid template to your theme from the code editor. Shopify’s default rules already block cart, checkout, internal search and filtered tag combinations, so only add rules when you have a confirmed crawling problem, and have them reviewed. To keep a single page out of search results, use a noindex meta tag instead of robots.txt.',
  },
  {
    question: 'Do Shopify SEO apps help?',
    answer: 'Some do specific jobs well, such as image compression, structured data or bulk meta editing. Many duplicate what Shopify or your theme already does, and every app that injects scripts can slow the store. Install apps for a defined job, check page speed before and after, and remove the app’s code completely when you uninstall it.',
  },
  {
    question: 'Should I use the Shopify blog?',
    answer: 'Yes, if you publish content your customers actually search for: buying guides, how-to articles, comparisons and care advice that link to your collections and products. The built-in blog is basic but adequate for SEO. Avoid publishing short, generic posts just to have a blog; a few genuinely useful guides perform better than dozens of thin ones.',
  },
];

const defaults = [
  { feature: 'XML sitemap', status: 'Automatic at /sitemap.xml', action: 'Submit it in Search Console' },
  { feature: 'Canonical tags', status: 'Added by most themes', action: 'Check product pages reached via collections' },
  { feature: 'robots.txt', status: 'Sensible defaults; editable via robots.txt.liquid', action: 'Leave alone unless there’s a crawl problem' },
  { feature: 'Titles and descriptions', status: 'Editable per item', action: 'Write unique ones for collections and best sellers' },
  { feature: 'Structured data', status: 'Varies by theme', action: 'Test product pages in the Rich Results Test' },
  { feature: 'Redirects', status: 'Built-in URL redirect manager', action: 'Redirect every changed handle and removed product' },
];

const speed = [
  'Choose a lightweight, well-maintained theme and avoid stacking several page-builder apps',
  'Audit installed apps; remove any you don’t use and clean up leftover code in theme files',
  'Compress and correctly size images; Shopify’s CDN serves modern formats when images are rendered with its image filters',
  'Limit autoplay videos, sliders and pop-ups above the fold',
  'Load chat widgets, reviews and tracking scripts after the main content where the app allows it',
  'Compare Core Web Vitals in Search Console before and after every theme or app change',
];

function Body() {
  return <>
    <p className="post-intro">Shopify gets the SEO basics right out of the box, which is why many store owners assume there is nothing left to do. In practice, the stores that win organic traffic on Shopify do three things the platform doesn’t do for them: they turn collections into real landing pages, they keep product URLs and internal links clean, and they protect speed from theme and app bloat.</p>
    <p>This guide covers what Shopify handles automatically, its known SEO quirks and how to work around them, and the collection, product, content and speed work that moves rankings.</p>

    <section id="shopify-defaults">
      <h2>What Shopify handles for you</h2>
      <p>Start by understanding the defaults, so you spend time on the gaps rather than re-doing what already works.</p>
      <div className="post-table"><table>
        <caption>Shopify SEO defaults and what to do with them</caption>
        <thead><tr><th scope="col">Feature</th><th scope="col">Default</th><th scope="col">Your action</th></tr></thead>
        <tbody>{defaults.map(d => <tr key={d.feature}><th scope="row">{d.feature}</th><td>{d.status}</td><td>{d.action}</td></tr>)}</tbody>
      </table></div>
      <p>Connect Google Search Console on day one and submit the sitemap. It is the only reliable way to see which pages Google indexes, which queries bring visitors and where problems appear.</p>
    </section>

    <section id="duplicate-urls">
      <h2>Fix duplicate product URLs</h2>
      <p>Shopify’s most discussed SEO quirk is that a product can be reached at its clean URL and at a collection-based URL:</p>
      <ul className="post-list">
        <li><code>/products/black-trail-shoe</code> — the canonical product URL</li>
        <li><code>/collections/trail-shoes/products/black-trail-shoe</code> — the same page reached through a collection</li>
      </ul>
      <p>Shopify adds a canonical tag on the collection version pointing to the clean URL, so this is not a disaster. But many themes link to the collection version from every collection grid, which means your internal links point at the duplicate and Google has to rely on the canonical hint to sort it out.</p>
      <p>The cleaner fix is in the theme: in the product card snippet, link with <code>{'{{ product.url }}'}</code> instead of <code>{'{{ product.url | within: collection }}'}</code>. Every collection then links directly to the canonical product URL. Test on a duplicate theme first, and check that breadcrumbs still behave as you expect.</p>
      <aside className="post-callout">
        <p className="t">Other duplicate sources to check</p>
        <p>Variant parameters (<code>?variant=</code>), the <code>/collections/all</code> page, tag-filtered collection URLs and paginated collections can all create extra URLs. Shopify’s canonicals and default robots.txt cover most of them; check the Pages report in Search Console for anything indexed that shouldn’t be.</p>
      </aside>
    </section>

    <section id="collections">
      <h2>Turn collections into landing pages</h2>
      <p>Collections are Shopify’s category pages and usually the best pages to target broad commercial searches such as “organic cotton baby clothes”. Most stores leave them as a heading and a grid.</p>
      <ol className="post-steps">
        <li><span>01</span>Match each important collection to one search term, and set its title tag and H1 around that term.</li>
        <li><span>02</span>Write a short introduction (two to four sentences) that helps shoppers choose, shown near the top of the grid.</li>
        <li><span>03</span>Add buying advice and FAQs below the grid, using a metafield or a section your theme supports.</li>
        <li><span>04</span>Link related collections to each other, and link to collections from navigation, product pages and blog posts.</li>
        <li><span>05</span>Create new collections for combinations with real search demand instead of relying on tag filters.</li>
      </ol>
      <p>Don’t publish a collection for every tag or minor attribute. Twenty strong collections with unique copy outperform two hundred empty ones.</p>
    </section>

    <section id="product-pages">
      <h2>Optimize Shopify product pages</h2>
      <ul className="post-list">
        <li><strong>Handles:</strong> short and descriptive (<code>/products/merino-hiking-sock</code>), without SKU codes or stop words.</li>
        <li><strong>Titles and meta descriptions:</strong> edit them in the “Search engine listing” section; don’t leave the default product title plus store name on every page.</li>
        <li><strong>Descriptions:</strong> replace supplier text on your best sellers with original copy covering fit, materials, use cases and care.</li>
        <li><strong>Images:</strong> descriptive file names before upload, and alt text that describes the image.</li>
        <li><strong>Reviews:</strong> use a review app that renders reviews in the page HTML and outputs rating structured data.</li>
        <li><strong>Structured data:</strong> run a product URL through Google’s Rich Results Test; many themes output Product schema but miss brand, GTIN or availability.</li>
      </ul>
      <p>For the wider principles of category and product optimization, see our <a href="/learn-seo/ecommerce-seo">ecommerce SEO guide</a>.</p>
    </section>

    <section id="speed-apps">
      <h2>Speed, themes and apps</h2>
      <p>Speed is where Shopify stores most often slip. Every app that adds a script to the storefront costs loading time, and many leave code behind after they are uninstalled.</p>
      <ol className="post-steps">{speed.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
    </section>

    <section id="content-international">
      <h2>Content, blog and international stores</h2>
      <h3>Use the blog to support collections</h3>
      <p>The Shopify blog is well suited to buying guides, comparisons and how-to content that answers questions shoppers ask before they buy. Each article should link to the collections and products it relates to, so it passes authority and sends readers toward a purchase.</p>
      <h3>Selling in several countries</h3>
      <p>Shopify Markets can create country or language versions of your store using subfolders or domains and adds hreflang tags between them. Translate and localize content properly; machine-translated product pages with unchanged prices and shipping details convert poorly and may not rank.</p>
    </section>

    <section id="migration">
      <h2>Migrating to Shopify without losing rankings</h2>
      <p>Moving from WooCommerce, Magento or another platform almost always changes URLs, because Shopify’s folders are fixed. A migration done without planning is one of the most common causes of sudden traffic loss.</p>
      <ol className="post-steps">
        <li><span>01</span>Crawl the old site and export every URL that gets traffic or has backlinks.</li>
        <li><span>02</span>Map each old URL to the most relevant new URL, one to one where possible.</li>
        <li><span>03</span>Import the redirects into Shopify’s URL redirect manager before launch.</li>
        <li><span>04</span>Carry over titles, meta descriptions, copy and structured data for important pages.</li>
        <li><span>05</span>After launch, submit the new sitemap, test a sample of redirects and watch the Pages report daily for a few weeks.</li>
      </ol>
      <p>Check any old URL’s redirect chain and status code with our free <a href="/seo-tools/technical-seo-checker">technical SEO checker</a>.</p>
    </section>
  </>;
}

export const guide: Post = {
  slug: 'shopify-seo',
  title: 'Shopify SEO: A Practical Guide to Ranking Your Store',
  metaTitle: 'Shopify SEO Guide: How to Rank Your Shopify Store',
  description: 'Shopify SEO guide: fix duplicate product URLs, optimize collections and products, speed up themes and apps, edit robots.txt and migrate safely.',
  dek: 'Shopify gets the basics right. These are the collection, product, speed and URL fixes that separate stores that rank from stores that don’t.',
  eyebrow: 'Learn SEO · Shopify',
  category: 'Shopify SEO',
  author: 'saboor',
  published: '2026-11-19',
  modified: '2026-11-19',
  readTime: '11 min read',
  image: { src: '/images/learn/shopify-seo.png', alt: 'Shopify SEO guide cover: shopping bag with collection and product pages', width: 1600, height: 900 },
  takeaways: [
    'Shopify handles HTTPS, sitemaps, canonicals and sensible robots.txt defaults; focus on what it doesn’t do.',
    'Link product cards to /products/ URLs, not collection-based paths, so internal links point at the canonical.',
    'Collections are your category landing pages: give important ones unique titles, intros and FAQs.',
    'Every storefront app costs speed; audit apps and leftover code regularly.',
    'Platform migrations change URLs; map and redirect every valuable old URL before launch.',
  ],
  toc: [
    { id: 'shopify-defaults', label: 'What Shopify handles for you' },
    { id: 'duplicate-urls', label: 'Fix duplicate product URLs' },
    { id: 'collections', label: 'Collections as landing pages' },
    { id: 'product-pages', label: 'Product pages' },
    { id: 'speed-apps', label: 'Speed, themes and apps' },
    { id: 'content-international', label: 'Content and international' },
    { id: 'migration', label: 'Migrating to Shopify' },
    { id: 'faq', label: 'FAQs' },
  ],
  faqs,
  askSuggestions: [
    {
      question: 'How do I fix duplicate product URLs on Shopify?',
      answer: 'Shopify canonicalizes collection-based product URLs to /products/ automatically, but many themes still link to the duplicate. In the product card snippet, link with product.url instead of product.url | within: collection, so every grid links straight to the canonical URL. Test on a duplicate theme first.',
      section: 'duplicate-urls',
    },
    {
      question: 'How should I optimize collection pages?',
      answer: `Treat important collections as landing pages:
- One main search term per collection, used in the title and H1
- A short introduction near the grid
- Buying advice and FAQs below the grid
- Links between related collections and from blog posts`,
      section: 'collections',
    },
    {
      question: 'Do apps slow down Shopify stores?',
      answer: 'Often, yes. Each app that adds storefront scripts costs loading time, and many leave code behind after uninstalling. Install apps for a defined job, compare Core Web Vitals before and after, and remove leftover code.',
      section: 'speed-apps',
    },
  ],
  cta: { eyebrow: 'Ecommerce SEO services', heading: 'Want your Shopify store found by more buyers?', text: 'Get a free Shopify SEO audit covering collections, duplicate URLs, apps, speed and structured data.', label: 'Get my Shopify audit', href: '/ecommerce-seo-services' },
  next: [
    { kicker: 'Service', title: 'Ecommerce SEO Services', text: 'Shopify and ecommerce SEO that turns collections and products into revenue.', href: '/ecommerce-seo-services', label: 'Explore the service' },
    { kicker: 'Guide', title: 'Ecommerce SEO Guide', text: 'Keyword research, architecture, filters and schema for any store platform.', href: '/learn-seo/ecommerce-seo', label: 'Read the guide' },
    { kicker: 'Free tool', title: 'Technical SEO Checker', text: 'Check status codes, redirects, canonicals and robots rules for any URL.', href: '/seo-tools/technical-seo-checker', label: 'Check a URL' },
  ],
  Body,
};

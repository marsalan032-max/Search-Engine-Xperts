import type { Post } from '../../blog/types';

// Learn SEO guide: Ecommerce SEO. Headings with an `id` must match the entries in `toc`.
// Targets "ecommerce SEO guide" / "how to do SEO for an online store". Commercial query lives on /ecommerce-seo-services.

const faqs = [
  {
    question: 'What is ecommerce SEO?',
    answer: 'Ecommerce SEO is the process of making an online store’s category pages, product pages and supporting content rank in search results for the terms shoppers use when they are ready to buy or comparing options. It covers keyword research by purchase intent, site architecture, on-page optimization, technical control of filters and duplicates, structured data and authority building.',
  },
  {
    question: 'Should I focus on category pages or product pages?',
    answer: 'For most stores, category pages first. They target broader, higher-volume searches such as “women’s trail running shoes”, they collect internal links naturally, and they stay live when individual products sell out. Product pages win long-tail searches with brand and model names, so give your best sellers unique descriptions and let the rest follow a strong template.',
  },
  {
    question: 'Can I use the manufacturer’s product descriptions?',
    answer: 'You can, but every other retailer selling the same product is using the same text, so it gives Google no reason to rank your page over theirs. Rewrite descriptions for your top-selling and highest-margin products first, adding what shoppers actually want to know: sizing advice, use cases, comparisons, care instructions and answers to common questions.',
  },
  {
    question: 'What should I do with out-of-stock products?',
    answer: 'If the product is coming back, keep the page live, mark it as out of stock in your structured data and suggest alternatives. If it is permanently discontinued, redirect it to the closest replacement product or its category when there is a clear match. If there is no relevant replacement, letting it return a 404 or 410 is fine.',
  },
  {
    question: 'How do I stop filter pages causing SEO problems?',
    answer: 'Decide which filter combinations deserve to be indexable landing pages (for example “black leather sofas”) and give those static URLs with their own titles and copy. Keep the rest out of the index and, on large catalogs, stop search engines crawling them with robots.txt rules or by building filters that do not create new crawlable URLs.',
  },
  {
    question: 'How long does ecommerce SEO take?',
    answer: 'Technical fixes on an established store can lift traffic within one to three months once Google recrawls the affected pages. Building category authority and content that competes with large marketplaces typically takes six to twelve months. Stores with thousands of products and clean architecture tend to compound faster because each improvement applies across many pages.',
  },
];

const architecture = [
  { level: 'Home page', example: '/', job: 'Brand searches; links to top categories' },
  { level: 'Category', example: '/running-shoes/', job: 'Broad commercial terms (“running shoes”)' },
  { level: 'Subcategory', example: '/running-shoes/trail/', job: 'Specific commercial terms (“trail running shoes”)' },
  { level: 'Product', example: '/products/brand-model-x/', job: 'Brand, model and long-tail terms' },
  { level: 'Buying guides', example: '/guides/how-to-choose-trail-shoes/', job: 'Research terms; links into categories' },
];

const productChecklist = [
  'A unique title tag with product name, key attribute and brand, under about 60 characters',
  'An original description that answers sizing, fit, materials, use cases and care, not just the manufacturer’s spec sheet',
  'Several high-quality images with descriptive file names and alt text, including in-use shots',
  'Visible price, availability, delivery and returns information near the buy button',
  'Customer reviews and questions displayed on the page, so they are part of the indexed content',
  'Product structured data with price, availability, brand, GTIN or MPN, and review ratings where you have them',
  'Links to the parent category and to related or complementary products',
];

function Body() {
  return <>
    <p className="post-intro">Online stores face a different SEO problem from service businesses. Instead of ten pages, you may have ten thousand, created by templates, filters and product feeds. Small decisions — how filters create URLs, how categories are named, whether descriptions are unique — repeat across every page and decide whether the whole catalog ranks or sinks.</p>
    <p>This guide covers the parts of ecommerce SEO that matter most: researching keywords by purchase intent, structuring categories, optimizing category and product pages, controlling filters and duplicates, adding structured data and building authority. It works whether you run on Shopify, WooCommerce, Magento or a custom platform.</p>

    <section id="keyword-research">
      <h2>Keyword research for online stores</h2>
      <p>Ecommerce keyword research starts with intent. The same product can be searched in very different ways depending on how close the shopper is to buying:</p>
      <div className="post-table"><table>
        <caption>Ecommerce search intent and the page that should rank</caption>
        <thead><tr><th scope="col">Intent</th><th scope="col">Example search</th><th scope="col">Best page type</th></tr></thead>
        <tbody>
          <tr><th scope="row">Browsing a category</th><td>trail running shoes for women</td><td>Category or subcategory</td></tr>
          <tr><th scope="row">Specific product</th><td>brand model x size 8 black</td><td>Product page</td></tr>
          <tr><th scope="row">Comparison</th><td>brand x vs brand y trail shoes</td><td>Comparison guide linking to both products</td></tr>
          <tr><th scope="row">Research</th><td>how to choose trail running shoes</td><td>Buying guide linking to categories</td></tr>
        </tbody>
      </table></div>
      <p>Good sources of ecommerce keywords include your own site search logs (the exact words customers type), marketplace autocomplete on Amazon and similar sites, competitor category names, Google Search Console queries where you already get impressions, and the “People also ask” questions for your main categories. Our free <a href="/seo-tools/keyword-research-tool">keyword research tool</a> turns a seed term into modifier-based ideas grouped by intent.</p>
      <p>Map each keyword group to one page. If two category pages target “men’s running shoes” and “running shoes for men”, merge them; they compete with each other rather than with your rivals.</p>
    </section>

    <section id="site-architecture">
      <h2>Site architecture and category structure</h2>
      <p>Architecture decides how authority flows through the store and how easily both shoppers and search engines find products. A clear hierarchy usually looks like this:</p>
      <div className="post-table"><table>
        <caption>A typical ecommerce site hierarchy</caption>
        <thead><tr><th scope="col">Level</th><th scope="col">Example URL</th><th scope="col">Search job</th></tr></thead>
        <tbody>{architecture.map(a => <tr key={a.level}><th scope="row">{a.level}</th><td><code>{a.example}</code></td><td>{a.job}</td></tr>)}</tbody>
      </table></div>
      <ul className="post-list">
        <li><strong>Keep important pages shallow.</strong> Every product should be reachable within three or four clicks of the home page through normal links, not only through internal search.</li>
        <li><strong>Name categories the way shoppers search.</strong> “Sofas” beats “Living Room Seating Solutions” because that is what people type.</li>
        <li><strong>Create subcategories when demand exists.</strong> If enough people search for “corner sofas”, it deserves its own page rather than being a filter on the sofa category.</li>
        <li><strong>Use breadcrumbs.</strong> They help shoppers move up the hierarchy, add internal links and can appear in search results with <code>BreadcrumbList</code> markup.</li>
      </ul>
    </section>

    <section id="category-pages">
      <h2>Optimize category pages</h2>
      <p>Category pages are usually the highest-value SEO pages in a store, and the most neglected. Many are just a heading and a product grid, which gives Google little to understand and gives shoppers little help choosing.</p>
      <h3>What a strong category page includes</h3>
      <ul className="post-list">
        <li>A title tag and H1 that match the main search term, written for people (“Women’s Trail Running Shoes”, not “Shoes – Category – Store”)</li>
        <li>A short introduction above or beside the grid that helps shoppers choose: key types, who each suits, price ranges</li>
        <li>Links to relevant subcategories and to the most useful filtered views</li>
        <li>A longer buying-advice section and FAQs below the grid, for shoppers who scroll and need help deciding</li>
        <li>Products sorted with best sellers and in-stock items first, so the page is useful when people land on it</li>
      </ul>
      <aside className="post-callout">
        <p className="t">Write for the shopper, not the word count</p>
        <p>A 120-word introduction that explains the real differences between product types does more than 1,000 words of filler at the bottom of the page. Add copy where it helps someone decide.</p>
      </aside>
    </section>

    <section id="product-pages">
      <h2>Optimize product pages</h2>
      <p>Product pages win long-tail and branded searches and do the final job of converting the visit. Use this checklist on your top sellers first, then improve the template so every product benefits:</p>
      <ol className="post-steps">{productChecklist.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
      <p>Variants deserve attention. If colour or size variants each have their own URL, decide whether they should rank separately. Usually they should not: one product URL with the variant selected through a parameter, and a canonical pointing to the main product, keeps signals in one place. If a variant has its own search demand (a specific colour that people search for by name), it can justify a separate indexable page.</p>
    </section>

    <section id="technical">
      <h2>Technical ecommerce SEO: filters, duplicates and crawl</h2>
      <p>Most serious ecommerce SEO problems are technical, and most come from three sources.</p>
      <h3>Faceted navigation (filters)</h3>
      <p>Filters for size, colour, brand, price and sort order can create millions of URL combinations from a few hundred products. Search engines waste time crawling them and may index thin, near-duplicate pages. The fix is to decide deliberately:</p>
      <ul className="post-list">
        <li><strong>Indexable filters:</strong> combinations with real search demand (“black leather sofas”) get static URLs, unique titles, a short introduction and internal links.</li>
        <li><strong>Everything else:</strong> sort orders, price sliders and multi-select combinations should not be crawlable at scale. Block them in robots.txt or build filters so they do not generate new links.</li>
      </ul>
      <h3>Duplicate and near-duplicate URLs</h3>
      <p>Products reachable through several category paths, tracking parameters and printer or session URLs all create duplicates. Link to one clean product URL everywhere, and use canonical tags on the variants. Remember that a canonical tag is a hint: if your internal links point to the duplicate, Google may choose it anyway.</p>
      <h3>Pagination and speed</h3>
      <p>Give paginated category pages their own crawlable URLs (<code>?page=2</code>) with normal links between them, and don’t canonicalize every page back to page one, or products on later pages may never be discovered. Large images, review widgets and tracking scripts make stores slow; check Core Web Vitals for your category and product templates in Search Console. Our <a href="/seo-tools/technical-seo-checker">technical SEO checker</a> shows status codes, canonicals and indexing directives for any URL.</p>
    </section>

    <section id="structured-data">
      <h2>Structured data for products</h2>
      <p>Product structured data helps Google show price, availability, ratings and shipping information in search results and in shopping surfaces. Add it to every product page, generated from the same data that renders the page so the two never disagree.</p>
      <div className="post-table"><table>
        <caption>Structured data types for online stores</caption>
        <thead><tr><th scope="col">Type</th><th scope="col">Where</th><th scope="col">Key properties</th></tr></thead>
        <tbody>
          <tr><th scope="row"><code>Product</code> + <code>Offer</code></th><td>Product pages</td><td>name, image, brand, gtin/mpn, price, priceCurrency, availability</td></tr>
          <tr><th scope="row"><code>AggregateRating</code> / <code>Review</code></th><td>Products with genuine reviews</td><td>ratingValue, reviewCount</td></tr>
          <tr><th scope="row"><code>BreadcrumbList</code></th><td>Category and product pages</td><td>The path from home to the page</td></tr>
          <tr><th scope="row"><code>Organization</code></th><td>Home page</td><td>Name, logo, contact details, returns policy</td></tr>
        </tbody>
      </table></div>
      <p>Connecting Google Merchant Center with a product feed adds another route into Google’s shopping results, including free listings. Keep the feed’s prices and availability in sync with the site.</p>
    </section>

    <section id="content-authority">
      <h2>Content and authority for stores</h2>
      <p>Category pages compete against marketplaces and large retailers with far more links. Two things help a smaller store close that gap.</p>
      <p><strong>Content that earns links and supports categories.</strong> Buying guides, comparison pages, sizing tools and original data (for example, “we tested 30 trail shoes on the same route”) attract links that product pages rarely earn. Each piece should link to the categories it supports.</p>
      <p><strong>Brand demand and digital PR.</strong> Mentions in relevant publications, gift guides and industry roundups build authority and send buyers directly. Our <a href="/learn-seo/link-building">link building guide</a> covers the tactics that work without risking penalties.</p>
    </section>
  </>;
}

export const guide: Post = {
  slug: 'ecommerce-seo',
  title: 'Ecommerce SEO: The Complete Guide to Ranking Category and Product Pages',
  metaTitle: 'Ecommerce SEO Guide: Rank Category & Product Pages',
  description: 'Ecommerce SEO guide: keyword research by intent, site architecture, category and product pages, filters, duplicate URLs, product schema and links.',
  dek: 'How online stores turn high-intent searches into sales, from keyword research and category structure to filters, schema and links.',
  eyebrow: 'Learn SEO · Ecommerce',
  category: 'Ecommerce SEO',
  published: '2026-11-19',
  modified: '2026-11-19',
  readTime: '13 min read',
  image: { src: '/images/learn/ecommerce-seo.png', alt: 'Ecommerce SEO guide cover: product grid with a rising sales chart', width: 1600, height: 900 },
  takeaways: [
    'Map every keyword group to one page type based on purchase intent; avoid two pages competing for the same term.',
    'Category pages are usually the biggest opportunity: add helpful copy, subcategory links and sensible sorting.',
    'Rewrite manufacturer descriptions for best sellers first, then improve the product template for everything else.',
    'Decide which filter combinations deserve indexable pages and stop the rest being crawled at scale.',
    'Product structured data and a synced Merchant Center feed open extra visibility in shopping results.',
  ],
  toc: [
    { id: 'keyword-research', label: 'Keyword research for stores' },
    { id: 'site-architecture', label: 'Site architecture' },
    { id: 'category-pages', label: 'Category pages' },
    { id: 'product-pages', label: 'Product pages' },
    { id: 'technical', label: 'Filters, duplicates and crawl' },
    { id: 'structured-data', label: 'Product structured data' },
    { id: 'content-authority', label: 'Content and authority' },
    { id: 'faq', label: 'FAQs' },
  ],
  faqs,
  askSuggestions: [
    {
      question: 'How do I handle filter URLs?',
      answer: `Decide deliberately:
- **Indexable filters**: combinations people search for (e.g. "black leather sofas") get static URLs, unique titles and copy
- **Everything else**: sort orders, price sliders and multi-select combinations should not be crawlable at scale; block them in robots.txt or build filters that don't create new links`,
      section: 'technical',
    },
    {
      question: 'What makes a category page rank?',
      answer: `A strong category page has:
- A title and H1 that match the main search term
- A short, helpful introduction near the grid
- Links to subcategories and useful filtered views
- Buying advice and FAQs below the grid
- Best sellers and in-stock items sorted first`,
      section: 'category-pages',
    },
    {
      question: 'Which schema should product pages have?',
      answer: 'Product with an Offer (price, currency, availability), brand and GTIN or MPN; AggregateRating when you have genuine reviews; and BreadcrumbList. Generate it from the same data that renders the page so they never disagree.',
      section: 'structured-data',
    },
  ],
  cta: { eyebrow: 'Ecommerce SEO services', heading: 'Is your catalog working as hard as it could?', text: 'Get a free store audit covering categories, filters, duplicates, product templates and the revenue opportunity in your niche.', label: 'Get my store audit', href: '/ecommerce-seo-services' },
  next: [
    { kicker: 'Service', title: 'Ecommerce SEO Services', text: 'Category, product and technical SEO for stores, built to grow revenue.', href: '/ecommerce-seo-services', label: 'Explore the service' },
    { kicker: 'Guide', title: 'Shopify SEO Guide', text: 'Platform-specific fixes for duplicate URLs, collections, apps and speed.', href: '/learn-seo/shopify-seo', label: 'Read the guide' },
    { kicker: 'Free tool', title: 'Keyword Research Tool', text: 'Expand a seed keyword into ideas grouped by search intent.', href: '/seo-tools/keyword-research-tool', label: 'Find keywords' },
  ],
  Body,
};

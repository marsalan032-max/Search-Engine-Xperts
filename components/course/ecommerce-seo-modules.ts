// Syllabus of the Advanced Ecommerce SEO Course (/ecommerce-seo-course). One entry per module, in order.
// No module is released yet: the course page shows every module as "Coming soon" with its lesson titles,
// and there are no module pages or sitemap entries until a module is released.

export type EcomModule = {
  slug: string;          // future page address: /ecommerce-seo-course/<slug>
  title: string;
  summary: string;
  lessons: string[];     // lesson titles, shown on the course page
};

// How many modules are released. Raise it (and add module pages) to open the next module.
export const releasedEcomModules = 0;
export const isEcomReleased = (index: number) => index < releasedEcomModules;

export const ecomModules: EcomModule[] = [
  {
    slug: 'ecommerce-seo-audit',
    title: 'Audit a Store at Scale',
    summary: 'Find the template-level problems that hold back thousands of pages at once, and rank fixes by revenue.',
    lessons: ['Crawl a large store without missing templates', 'Read the page indexing report like an SEO', 'Find duplicate, thin and orphaned product pages', 'Prioritise fixes by revenue impact'],
  },
  {
    slug: 'keyword-research-by-intent',
    title: 'Keyword Research by Purchase Intent',
    summary: 'Turn site search, marketplace suggestions and competitor categories into a keyword map built for buyers.',
    lessons: ['Sort keywords by purchase intent', 'Mine site search and marketplace suggestions', 'Map one keyword cluster to one page', 'Spot and fix keyword cannibalisation'],
  },
  {
    slug: 'site-architecture-faceted-navigation',
    title: 'Architecture and Faceted Navigation',
    summary: 'Design a category structure Google can crawl, and decide which filters deserve their own indexable pages.',
    lessons: ['Design a shallow category hierarchy', 'Decide which filter pages should be indexed', 'Control crawling of parameters and sort orders', 'Breadcrumbs and internal links that pass authority'],
  },
  {
    slug: 'category-pages-that-rank',
    title: 'Category Pages That Rank and Convert',
    summary: 'Build the pages that win broad commercial searches: copy, layout, pagination and seasonal categories.',
    lessons: ['What a ranking category page contains', 'Write category copy that helps shoppers decide', 'Pagination and product sorting done right', 'Seasonal and evergreen category pages'],
  },
  {
    slug: 'product-pages-at-scale',
    title: 'Product Pages at Scale',
    summary: 'Templates, unique descriptions and variant handling for catalogues with thousands of SKUs.',
    lessons: ['Product page templates that scale', 'Unique descriptions for thousands of SKUs', 'Variants: one URL or many?', 'Reviews, Q&A and user-generated content'],
  },
  {
    slug: 'structured-data-merchant-center',
    title: 'Structured Data and Merchant Center',
    summary: 'Win rich results, merchant listings and free listings with accurate product data Google trusts.',
    lessons: ['Product, Offer and Review structured data', 'Merchant listings and free listings in Google', 'Keep price and availability in sync', 'Shipping and return policy markup'],
  },
  {
    slug: 'technical-ecommerce-seo',
    title: 'Technical SEO for Online Stores',
    summary: 'JavaScript storefronts, stock changes, Core Web Vitals and platform migrations without losing traffic.',
    lessons: ['JavaScript rendering on modern storefronts', 'Out-of-stock and discontinued products', 'Core Web Vitals for product and category templates', 'Platform migrations without losing traffic'],
  },
  {
    slug: 'content-and-ai-shopping',
    title: 'Content and AI Shopping Visibility',
    summary: 'Buying guides and comparisons that rank, feed your categories and get your products into AI answers.',
    lessons: ['Buying guides and comparison content', 'Get products into AI Overviews and AI Mode', 'Internal links from content to categories', 'Refresh content before peak season'],
  },
  {
    slug: 'links-and-digital-pr-for-stores',
    title: 'Authority, Links and Digital PR',
    summary: 'Earn the links and brand mentions that lift category pages, not just the homepage, without penalties.',
    lessons: ['Digital PR that earns links to a store', 'Link building for categories, not just the homepage', 'Brand mentions and reviews off-site', 'Avoid link schemes Google penalises'],
  },
  {
    slug: 'measure-organic-revenue',
    title: 'Measure and Forecast Organic Revenue',
    summary: 'Track SEO in revenue, not just rankings, and forecast the return of the work before you do it.',
    lessons: ['Track organic revenue in GA4', 'Segment Search Console by page type', 'Forecast the value of SEO work', 'Report results to stakeholders'],
  },
];

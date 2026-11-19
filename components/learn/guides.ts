import type { Post } from '../blog/types';
import { guide as localSeo } from './guides/local-seo';
import { guide as ecommerceSeo } from './guides/ecommerce-seo';
import { guide as mobileSeo } from './guides/mobile-seo';
import { guide as shopifySeo } from './guides/shopify-seo';
import { guide as technicalSeo } from './guides/technical-seo';
import { guide as advancedSeo } from './guides/advanced-seo-strategies';
import { guide as linkBuilding } from './guides/link-building';
import { guide as aiSeo } from './guides/ai-seo';

// Learn SEO guides, published at /learn-seo/<slug>. They share the blog's Post shape and article template.
// The order here is the order on the /learn-seo hub and in the header menu.
// Each guide targets the informational query ("what is local SEO", "how to…"); the matching
// service page targets the commercial query ("local SEO services"), so the two don't compete.
export const guides: Post[] = [localSeo, ecommerceSeo, mobileSeo, shopifySeo, technicalSeo, advancedSeo, linkBuilding, aiSeo];

export const getGuide = (slug: string) => guides.find(g => g.slug === slug);

// Short labels for the header menu, in the same order as the original design.
export const guideMenu = [
  { label: 'Local SEO', slug: 'local-seo' },
  { label: 'Ecommerce SEO', slug: 'ecommerce-seo' },
  { label: 'Mobile SEO', slug: 'mobile-seo' },
  { label: 'Shopify SEO', slug: 'shopify-seo' },
  { label: 'Technical SEO', slug: 'technical-seo' },
  { label: 'Advanced SEO Strategies', slug: 'advanced-seo-strategies' },
  { label: 'Link Building', slug: 'link-building' },
  { label: 'AI SEO', slug: 'ai-seo' },
];

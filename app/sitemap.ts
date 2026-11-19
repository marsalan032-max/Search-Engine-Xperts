import type { MetadataRoute } from 'next';
import { posts } from '../components/blog/posts';
import { guides } from '../components/learn/guides';
import { tools } from '../components/tools/tool-list';

const base = 'https://searchenginexperts.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    ...[
      'ai-seo-services',
      'local-seo-services',
      'gmb-optimization-services',
      'ecommerce-seo-services',
      'backlinks-digital-pr-services',
      'seo-content-writing-services',
    ].map(slug => ({ url: `${base}/${slug}`, changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: `${base}/learn-seo`, changeFrequency: 'monthly', priority: 0.8 },
    ...guides.map(g => ({ url: `${base}/learn-seo/${g.slug}`, lastModified: g.modified, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${base}/seo-tools`, changeFrequency: 'monthly', priority: 0.8 },
    ...tools.map(t => ({ url: `${base}/seo-tools/${t.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: p.modified, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}

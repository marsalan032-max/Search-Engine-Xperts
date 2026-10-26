import type { MetadataRoute } from 'next';
import { posts } from '../components/blog/posts';

const base = 'https://searchenginexperts.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/ai-seo-services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: p.modified, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}

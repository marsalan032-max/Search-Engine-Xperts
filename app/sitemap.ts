import type { MetadataRoute } from 'next';

const base = 'https://searchenginexperts.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/ai-seo-services`, changeFrequency: 'monthly', priority: 0.9 },
  ];
}

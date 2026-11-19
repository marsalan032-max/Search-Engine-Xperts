import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/ only serves the free SEO tools' page fetcher; it has nothing to index.
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://searchenginexperts.com/sitemap.xml',
  };
}

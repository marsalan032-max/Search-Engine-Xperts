import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone service pages are static HTML in /public, served at clean URLs.
  async rewrites() {
    return [{ source: '/ai-seo-services', destination: '/ai-seo-services.html' }];
  },
  async redirects() {
    // Keep one canonical URL for the page.
    return [{ source: '/ai-seo-services.html', destination: '/ai-seo-services', permanent: true }];
  },
};

export default nextConfig;

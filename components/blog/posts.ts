import type { Post } from './types';
import { post as seoAgencyCost } from './posts/how-much-does-seo-cost-for-an-agency';

// Every blog post. To publish a new one, add a file in ./posts and list it here;
// its page, the blog index and the sitemap pick it up automatically.
export const posts: Post[] = [seoAgencyCost].sort((a, b) => b.published.localeCompare(a.published));

export const getPost = (slug: string) => posts.find(p => p.slug === slug);

export const siteUrl = 'https://searchenginexperts.com';

export const author = {
  name: 'Arslan Tariq',
  jobTitle: 'SEO Manager & Content Strategist',
  photo: '/images/arslan-tariq.png',
  bio: 'Arslan Tariq has 7+ years of SEO experience, helping local businesses grow their online visibility and generate more qualified leads. He also works with eCommerce brands to drive organic traffic, improve search rankings, and increase sales through data-driven SEO strategies.',
  // Add real profile URLs (LinkedIn, YouTube, X…) here; they render as icons and feed the schema `sameAs`.
  profiles: [] as { label: string; href: string }[],
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

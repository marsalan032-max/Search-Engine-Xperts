import type { Post } from './types';
import { authors } from './authors';
import { post as seoAgencyCost } from './posts/how-much-does-seo-cost-for-an-agency';

// Every blog post. To publish a new one, add a file in ./posts and list it here;
// its page, the blog index and the sitemap pick it up automatically.
export const posts: Post[] = [seoAgencyCost].sort((a, b) => b.published.localeCompare(a.published));

export const getPost = (slug: string) => posts.find(p => p.slug === slug);

export const siteUrl = 'https://searchenginexperts.com';

// The site's main author. Other authors live in ./authors; articles pick theirs with `author: '<id>'`.
export { authors, authorList, getAuthor } from './authors';
export const author = authors.arslan;

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

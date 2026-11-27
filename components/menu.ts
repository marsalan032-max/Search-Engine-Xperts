import { services } from './services';

// Main navigation, matching the approved design.
// Items with `children` render as dropdowns. Replace the "#" placeholders
// with real page URLs as those pages are published.

export type MenuLink = { label: string; href: string };
export type MenuItem = MenuLink & { children?: MenuLink[] };

export const menu: MenuItem[] = [
  {
    label: 'Services',
    href: '#services',
    children: services.map(s => ({ label: s.name, href: s.href ?? `#${s.id}` })),
  },
  { label: 'Projects', href: '#work' },
  {
    label: 'SEO Tools',
    href: '/seo-tools',
    children: [
      { label: 'Keyword Research', href: '/seo-tools/keyword-research-tool' },
      { label: 'Technical SEO', href: '/seo-tools/technical-seo-checker' },
      { label: 'On-Page Analysis', href: '/seo-tools/on-page-seo-checker' },
      { label: 'SEO Audit', href: '/seo-tools/seo-audit-tool' },
      { label: 'All free SEO tools →', href: '/seo-tools' },
    ],
  },
  {
    label: 'Learn SEO',
    href: '/learn-seo',
    children: [
      { label: 'Local SEO', href: '/local-seo-course' }, // the free Local SEO Course; the guide stays at /learn-seo/local-seo
      { label: 'Ecommerce SEO', href: '/ecommerce-seo-course' }, // the Advanced Ecommerce SEO Course; the guide stays at /learn-seo/ecommerce-seo
      { label: 'Mobile SEO', href: '/learn-seo/mobile-seo' },
      { label: 'Shopify SEO', href: '/learn-seo/shopify-seo' },
      { label: 'Technical SEO', href: '/learn-seo/technical-seo' },
      { label: 'Advanced SEO Strategies', href: '/learn-seo/advanced-seo-strategies' },
      { label: 'Link Building', href: '/learn-seo/link-building' },
      { label: 'AI SEO', href: '/learn-seo/ai-seo' },
      { label: 'All SEO guides →', href: '/learn-seo' },
    ],
  },
  {
    label: 'News',
    href: '#',
    children: [
      { label: 'Google Algorithm Updates', href: '/google-algorithm-updates' },
      { label: 'New Features', href: '#' },
      { label: 'Latest News', href: '#' },
    ],
  },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Blogs', href: '/blog' },
      { label: 'Ebooks', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'PPT', href: '#' },
    ],
  },
];

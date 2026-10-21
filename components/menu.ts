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
    children: services.map(s => ({ label: s.name, href: `#${s.id}` })),
  },
  { label: 'Projects', href: '#work' },
  {
    label: 'SEO Tools',
    href: '#',
    children: [
      { label: 'Keyword Research', href: '#' },
      { label: 'Technical SEO', href: '#' },
      { label: 'On-Page Analysis', href: '#' },
      { label: 'SEO Audit', href: '#' },
    ],
  },
  {
    label: 'Learn SEO',
    href: '#',
    children: [
      { label: 'Local SEO', href: '#' },
      { label: 'Ecommerce SEO', href: '#' },
      { label: 'Mobile SEO', href: '#' },
      { label: 'Shopify SEO', href: '#' },
      { label: 'Technical SEO', href: '#' },
      { label: 'Advanced SEO Strategies', href: '#' },
      { label: 'Link Building', href: '#' },
      { label: 'AI SEO', href: '#' },
    ],
  },
  {
    label: 'News',
    href: '#',
    children: [
      { label: 'Google Algorithm Updates', href: '#' },
      { label: 'New Features', href: '#' },
      { label: 'Latest News', href: '#' },
    ],
  },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Blogs', href: '#' },
      { label: 'Ebooks', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'PPT', href: '#' },
    ],
  },
];

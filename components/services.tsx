import type { ReactNode } from 'react';

// Single source of truth for every service.
// The Services section on the home page AND the header "Services" dropdown
// both read from this list, so adding, removing or renaming a service here
// updates both places automatically.

export type Service = {
  id: string;          // anchor id on the home page (#service-1, …)
  name: string;        // card title and dropdown label
  description: string; // card copy
  icon: ReactNode;
};

const svg = (children: ReactNode) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    {children}
  </svg>
);

export const services: Service[] = [
  {
    id: 'service-1',
    name: 'AI SEO',
    description: "Optimize for AI Overviews, ChatGPT and answer engines — so you're cited where buyers now search.",
    icon: svg(<><path d="M12 3l1.8 4.4L18 9.2l-4.2 1.8L12 15l-1.8-4L6 9.2l4.2-1.8z" /><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" /></>),
  },
  {
    id: 'service-2',
    name: 'Local SEO',
    description: 'Win the map pack and “near me” searches with location pages, citations and reviews that convert.',
    icon: svg(<><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  },
  {
    id: 'service-3',
    name: 'GMB Optimization',
    description: 'A fully optimized Google Business Profile — posts, photos, Q&A and reviews that earn the top spot.',
    icon: svg(<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 15l3-4 2.5 3L17 9" /><circle cx="8" cy="8.5" r="1.2" /></>),
  },
  {
    id: 'service-4',
    name: 'Ecommerce SEO',
    description: 'Product, category and technical SEO that turns high-intent searches into sales — at scale.',
    icon: svg(<><path d="M5 7h15l-1.5 9h-12z" /><path d="M5 7L4 3H2" /><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></>),
  },
  {
    id: 'service-5',
    name: 'Backlinks & Digital PR',
    description: 'Earn high-authority links and press mentions through real outreach — the trust signals Google rewards.',
    icon: svg(<><path d="M10 13a4 4 0 005.6 0l2.4-2.4a4 4 0 00-5.6-5.6L11 6.5" /><path d="M14 11a4 4 0 00-5.6 0L6 13.4a4 4 0 005.6 5.6L13 17.5" /></>),
  },
  {
    id: 'service-6',
    name: 'SEO Content Writing',
    description: 'Search-optimized articles and pages that rank, read well and turn visitors into customers.',
    icon: svg(<><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>),
  },
];

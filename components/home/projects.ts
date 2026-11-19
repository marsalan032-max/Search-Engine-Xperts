// Portfolio projects shown on the home page (#work).
// Figures match the results slider on the service pages (public/*-services.html, #results).

export type Project = {
  name: string;
  url: string;
  industry: string;
  image: { src: string; width: number; height: number; alt: string };
  inset?: { src: string; width: number; height: number; alt: string }; // e.g. an AI Overview screenshot
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  services: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: 'Roller Skate USA',
    url: 'https://rollerskateusa.com',
    industry: 'E-commerce · United States',
    image: { src: '/images/case-studies/roller-skate-usa.webp', width: 1400, height: 973, alt: 'Roller Skate USA online store home page' },
    challenge: 'An established skate store was buried around page 6 of Google for the brands it sells.',
    solution: 'Category and product pages rebuilt around how skaters search, a stronger technical foundation and coverage across 1,587 tracked keywords.',
    metrics: [
      { value: '+1,994%', label: 'organic clicks (310 → 6.49K)' },
      { value: '60.9 → 9.2', label: 'average Google position' },
      { value: '257', label: 'keywords in the top 3' },
    ],
    services: [{ label: 'Ecommerce SEO', href: '/ecommerce-seo-services' }, { label: 'Technical SEO', href: '/learn-seo/technical-seo' }],
  },
  {
    name: 'Shuraa',
    url: 'https://shuraa.com',
    industry: 'Business setup · Dubai, UAE',
    image: { src: '/images/case-studies/shuraa.webp', width: 1400, height: 623, alt: 'Shuraa business setup website home page' },
    challenge: 'A crowded UAE market with hundreds of high-intent visa, licence and company formation searches.',
    solution: 'Topic clusters around visas, licences and company formation, with every service page answering what founders ask before they buy.',
    metrics: [
      { value: '10.3K', label: 'organic clicks in the period' },
      { value: '465', label: 'keywords in the top 3' },
      { value: '128K', label: 'impressions at avg. position 7' },
    ],
    services: [{ label: 'SEO Content Writing', href: '/seo-content-writing-services' }, { label: 'On-page SEO', href: '/seo-tools/on-page-seo-checker' }],
  },
  {
    name: 'DFW Turf Solutions',
    url: 'https://dfwturf.com',
    industry: 'Local service · Dallas–Fort Worth',
    image: { src: '/images/case-studies/dfw-turf-solutions.webp', width: 1400, height: 650, alt: 'DFW Turf Solutions artificial turf installer website' },
    challenge: 'A turf installer competing with many Dallas contractors for city and “near me” searches.',
    solution: 'Local SEO with Google Business Profile optimization, service and service-area pages, and content that answers homeowners’ questions.',
    metrics: [
      { value: '76', label: 'keywords in the top 3' },
      { value: 'Local pack', label: 'rankings for turf installation' },
      { value: '618', label: 'keywords tracked across DFW' },
    ],
    services: [{ label: 'Local SEO', href: '/local-seo-services' }, { label: 'GMB Optimization', href: '/gmb-optimization-services' }],
  },
  {
    name: 'Personal Drivers',
    url: 'https://personaldrivers.com',
    industry: 'Transportation · United States',
    image: { src: '/images/case-studies/personal-drivers.webp', width: 1400, height: 908, alt: 'Personal Drivers website home page' },
    inset: { src: '/images/case-studies/personal-drivers-ai-overview.webp', width: 757, height: 414, alt: 'Google AI Overview citing Personal Drivers as a source' },
    challenge: 'A nationwide driver service that needed to be found — and cited by AI answers — for long-distance travel searches.',
    solution: 'Fast, technically clean pages and structured service content that gives direct, citable answers.',
    metrics: [
      { value: 'Cited', label: 'as a source in Google AI Overviews' },
      { value: '46', label: 'keywords in the top 3' },
      { value: '100/100', label: 'PageSpeed, desktop and mobile' },
    ],
    services: [{ label: 'AI SEO', href: '/ai-seo-services' }, { label: 'Technical SEO', href: '/learn-seo/technical-seo' }],
  },
];

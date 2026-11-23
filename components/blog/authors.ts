// Everyone who writes for the site. Each author gets a profile page at `url` (see components/author/author-page.tsx).
// To credit an article to someone other than Arslan, set `author: '<id>'` on the post or guide.

export type Author = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  jobTitle: string;      // role on article pages ("About the author") and in the Person schema
  headline: string;      // role under the name on author pages and on blog cards
  shortTitle: string;    // role in the author page <title>
  tagline: string;       // one-line description in the Person schema
  metaDescription: string;
  photo: string;         // square, at least 400×400 for the author page
  photoSize: number;
  url: string;           // profile page path
  bio: string;           // "About the author" box on articles
  intro: string;         // paragraph on the author page
  knowsAbout: string[];
  email?: string;
  // Real profile URLs only (LinkedIn, X…). They render as "Follow" icons and feed the schema `sameAs`.
  profiles: { label: string; href: string }[];
};

export const authors = {
  arslan: {
    id: 'arslan-tariq',
    name: 'Arslan Tariq',
    firstName: 'Arslan',
    lastName: 'Tariq',
    jobTitle: 'SEO Manager & Content Strategist',
    headline: 'AI SEO Specialist & Founder of Search Engine Xperts',
    shortTitle: 'AI SEO Specialist',
    tagline: 'AI SEO Specialist | Helping Local Businesses Get 10x More Leads from Google, Maps & AI Search with My Proven AEO & GEO Strategy',
    metaDescription: 'Arslan Tariq is an AI SEO specialist helping local businesses get more leads from Google, Google Maps and AI search. Read his latest SEO guides and articles.',
    photo: '/images/arslan-tariq-2026.jpg',
    photoSize: 400,
    url: '/arslan-tariq',
    bio: 'Arslan Tariq has 7+ years of SEO experience, helping local businesses grow their online visibility and generate more qualified leads. He also works with eCommerce brands to drive organic traffic, improve search rankings, and increase sales through data-driven SEO strategies.',
    intro: 'I help local businesses get 10x more leads from Google, Maps & AI search with my proven AEO & GEO strategy. I also help eCommerce brands grow organic traffic, rankings and sales through data-driven SEO.',
    knowsAbout: ['Search engine optimization', 'AI search optimization', 'Answer engine optimization (AEO)', 'Generative engine optimization (GEO)', 'Local SEO', 'Ecommerce SEO', 'Technical SEO'],
    email: 'arslantariq082@gmail.com',
    profiles: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/seo-expert-arslan-tariq/' }],
  },
  saboor: {
    id: 'saboor-nasir',
    name: 'Saboor Nasir',
    firstName: 'Saboor',
    lastName: 'Nasir',
    jobTitle: 'SEO & Meta Ads Specialist',
    headline: 'SEO & Meta Ads Specialist at Search Engine Xperts',
    shortTitle: 'SEO & Meta Ads Specialist',
    tagline: 'SEO & Meta Ads Specialist at Search Engine Xperts',
    metaDescription: 'Saboor Nasir is an SEO & Meta Ads Specialist at Search Engine Xperts, helping businesses grow with search engine optimization and Facebook & Instagram ads.',
    photo: '/images/saboor-nasir.jpg',
    photoSize: 200,
    url: '/saboor-nasir',
    bio: 'Saboor Nasir is an SEO & Meta Ads Specialist at Search Engine Xperts. He combines search engine optimization with Facebook and Instagram advertising to help businesses reach more of the right customers.',
    intro: 'I help businesses grow with SEO and Meta Ads working together: organic rankings that keep bringing in customers, and Facebook & Instagram campaigns that reach the right people while SEO builds.',
    knowsAbout: ['Search engine optimization', 'Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Paid social advertising', 'Local SEO'],
    profiles: [],
  },
} satisfies Record<string, Author>;

export type AuthorKey = keyof typeof authors;
export const authorList: Author[] = Object.values(authors);
export const getAuthor = (key?: AuthorKey): Author => authors[key ?? 'arslan'];

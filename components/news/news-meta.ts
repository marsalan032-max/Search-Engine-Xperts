// SEO news stories shown on /seo-news, newest first. Plain data (no JSX) so the cover script
// (scripts/covers/build_news_covers.py) can read it; each story's body lives in ./articles.tsx under the same slug.
// To add a story: add its entry here (newest first) and its body in ./articles.tsx, then run the cover script.

export type NewsTopic = 'Google Updates' | 'AI Search' | 'Search Console' | 'Local SEO' | 'Ecommerce';

export type NewsMeta = {
  slug: string;          // URL: /seo-news/<slug>
  title: string;         // H1 and card title
  description: string;   // meta description
  dek: string;           // standfirst under the H1
  topic: NewsTopic;
  date: string;          // YYYY-MM-DD: when the news happened (used for order and shown on cards)
  source: string;        // main source, shown on the cover
};

export const newsTopics: NewsTopic[] = ['Google Updates', 'AI Search', 'Search Console', 'Local SEO', 'Ecommerce'];

// When the stories were written and published on this site.
export const newsPublished = '2026-11-27';

export const newsMeta: NewsMeta[] = [
  {
    slug: 'google-preannounces-december-2026-core-update',
    title: 'Google Announces the December 2026 Core Update Before It Goes Live',
    description: 'Google posted its December 2026 core update weeks before release, a first for a core update. Here is what it targets and how to prepare.',
    dek: 'For the first time, Google has told site owners about a core update before the rollout starts. It targets complex queries and personalised results.',
    topic: 'Google Updates',
    date: '2026-11-24',
    source: 'Google Search Status Dashboard',
  },
  {
    slug: 'google-search-ranking-hub',
    title: 'Google Opens a Search Ranking Hub With Its Ranking Principles and a Feedback Route',
    description: 'Google’s new Search ranking hub sets out three ranking principles, a way to send feedback on updates through Search Console, and a UK indexing appeal.',
    dek: 'Three new documentation pages explain how Google says it ranks every type of result, how it announces updates, and how site owners can send feedback.',
    topic: 'Google Updates',
    date: '2026-11-24',
    source: 'Google Search Central',
  },
  {
    slug: 'november-2026-core-update-complete',
    title: 'Google’s November 2026 Core Update Has Finished Rolling Out',
    description: 'The November 2026 core update ran from 10 to 24 November. Here is when to check your data, and why the holiday weekend complicates it.',
    dek: 'The third core update of 2026 took just under 14 days. The first full week to compare falls over Thanksgiving, Black Friday and Cyber Monday.',
    topic: 'Google Updates',
    date: '2026-11-24',
    source: 'Google Search Status Dashboard',
  },
  {
    slug: 'gemini-4-hydrogen-ai-mode',
    title: 'Gemini 4 Hydrogen Becomes the Default Model in Google’s AI Mode',
    description: 'Google calls Gemini 4 Hydrogen its biggest model upgrade to Search yet. It now powers AI Mode and the hardest AI Overviews questions.',
    dek: 'Google rolled out a new Gemini model in Search two days into the November core update. Here is what changed for AI Mode and AI Overviews.',
    topic: 'AI Search',
    date: '2026-11-12',
    source: 'Google',
  },
  {
    slug: 'search-console-api-branded-queries',
    title: 'Search Console API Adds Branded Query, Multimodal and Multi-Filter Data',
    description: 'The Search Analytics API can now split branded and non-branded queries, report Google Lens and Circle to Search traffic, and filter several countries at once.',
    dek: 'Three features that were already in the Search Console interface are now available through the API, which matters for anyone reporting at scale.',
    topic: 'Search Console',
    date: '2026-11-16',
    source: 'Google Search Central Blog',
  },
  {
    slug: 'search-console-generative-ai-report-bug',
    title: 'Search Console Undercounted AI Overview and AI Mode Impressions for Three Days',
    description: 'Google confirmed a logging error lowered impressions in the Generative AI performance report from 9 to 11 November 2026, as the core update began.',
    dek: 'If your AI impressions dipped just as the November core update started, the cause may be a reporting bug rather than a real loss of visibility.',
    topic: 'Search Console',
    date: '2026-11-12',
    source: 'Search Console data anomalies',
  },
  {
    slug: 'chatgpt-search-volume-20-percent-of-google',
    title: 'OpenAI Says ChatGPT Search Volume Is About a Fifth of Google’s',
    description: 'OpenAI says ChatGPT handles roughly one-fifth as many search-like queries as Google. Here is what the figure measures, and what it does not.',
    dek: 'The claim is a big number for AI search, but it counts searches differently from Google and does not measure traffic sent to websites.',
    topic: 'AI Search',
    date: '2026-11-03',
    source: 'OpenAI',
  },
  {
    slug: 'chatgpt-shopping-documentation-change',
    title: 'OpenAI Quietly Rewords How ChatGPT Describes Its Shopping Results',
    description: 'OpenAI removed a line saying ChatGPT product results are not influenced by OpenAI partnerships. What the change means for online stores.',
    dek: 'A small edit to the “Shopping with ChatGPT Search” documentation has store owners asking how products are chosen for ChatGPT’s shopping results.',
    topic: 'Ecommerce',
    date: '2026-11-20',
    source: 'OpenAI documentation',
  },
  {
    slug: 'google-business-profile-booking-links',
    title: 'Google Business Profile Lets Owners Choose Which Booking Links Appear',
    description: 'Business owners can now choose which appointment and reservation partner links show on their Google Business Profile, and appeals move to one form.',
    dek: 'Two Business Profile changes give local businesses more control over how customers book with them from Google Search and Maps.',
    topic: 'Local SEO',
    date: '2026-11-23',
    source: 'Search Engine Roundtable',
  },
];

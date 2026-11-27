// Google algorithm updates shown on /google-algorithm-updates, newest first.
// Dates and rollout lengths for December 2021 onward come from Google's Search Status Dashboard
// (https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history). Earlier entries are the
// well-documented landmark updates Google announced before the dashboard existed.
// To add an update: put it at the top, newest first. The page, filters and schema pick it up automatically.

export type UpdateType = 'Core' | 'Spam' | 'Content' | 'Page experience' | 'Other';

export type AlgoUpdate = {
  id: string;            // anchor on the page: /google-algorithm-updates#<id>
  name: string;
  type: UpdateType;
  date: string;          // YYYY-MM-DD: rollout start (or announcement date when status is 'Announced')
  rollout?: string;      // how long the rollout took
  status?: 'Announced' | 'Rolling out' | 'Complete';
  release?: string;      // YYYY-MM: planned release month for an announced update (shown on its card)
  summary: string;
  details?: string[];    // extra paragraphs for the update's own page
};

export const dashboardUrl = 'https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history';

export const updates: AlgoUpdate[] = [
  // ---------- 2026 ----------
  { id: 'december-2026-core-update', name: 'December 2026 core update', type: 'Core', date: '2026-11-24', status: 'Announced', release: '2026-12',
    summary: 'Google posted this on its Search Status Dashboard weeks before release, something it had not done for a core update before. Google says it will improve how Search understands and ranks results for longer, more complex queries, and refine personalized results for people who have personalization turned on. It applies to all locations and languages and is scheduled for December 2026, with no start date yet.',
    details: ['Google posted the notice on 24 November 2026, less than an hour after it marked the November 2026 core update complete. There is no start date yet: Google will add a “released” entry to its Search Status Dashboard on the day the rollout begins.', 'Until that entry appears, ranking changes in early December should not be blamed on this update. Use the quiet period to finish reviewing your November results, so you have a clean baseline when the December rollout starts.'] },
  { id: 'november-2026-core-update', name: 'November 2026 core update', type: 'Core', date: '2026-11-10', rollout: '13 days, 20 hours', status: 'Complete',
    summary: 'The third broad core update of 2026, released globally in all languages. Google called it a regular update and gave no new guidance. It finished on 24 November, just before Black Friday, so online stores should compare full weeks of data before reacting to any change.',
    details: ['Google posted the release on its Search Status Dashboard at 10:07 PST on 10 November and shared it on LinkedIn. The dashboard marked the rollout complete at 06:03 PST on 24 November, after 13 days and 20 hours.', 'It was the eighth ranking update Google confirmed in 2026, following core updates in March and May. Google suggests comparing performance against the week before the rollout began, so for this update compare a full week after 24 November with 3 to 9 November.'] },
  { id: 'september-2026-spam-update', name: 'September 2026 spam update', type: 'Spam', date: '2026-09-24', rollout: '13 days, 16 hours', status: 'Complete',
    summary: 'The fourth spam update of the year and by far the longest, finishing on 8 October. Spam updates improve the automated systems that find and demote pages breaking Google’s spam policies.',
    details: ['It started on 24 September and was marked complete on 8 October. That made it far longer than the June and August spam updates, which each finished in under three days.', '2026 had four confirmed spam updates, compared with a single spam update in 2025.'] },
  { id: 'august-2026-spam-update', name: 'August 2026 spam update', type: 'Spam', date: '2026-08-18', rollout: '2 days, 16 hours', status: 'Complete',
    summary: 'A short global spam update that completed in under three days.',
    details: ['It started on 18 August and was marked complete on 21 August, two months after the June spam update.'] },
  { id: 'june-2026-spam-update', name: 'June 2026 spam update', type: 'Spam', date: '2026-06-24', rollout: '2 days, 1 hour', status: 'Complete',
    summary: 'A global spam update that completed in about two days, the second of four spam updates in 2026.',
    details: ['It started on 24 June and was marked complete on 26 June. It was the first spam update since the March 2026 spam update.'] },
  { id: 'may-2026-core-update', name: 'May 2026 core update', type: 'Core', date: '2026-05-21', rollout: '11 days, 21 hours', status: 'Complete',
    summary: 'The second broad core update of 2026, arriving less than two months after the March update. It completed on 2 June.',
    details: ['It started on 21 May and was marked complete on 2 June, after 11 days and 21 hours, less than two months after the March 2026 core update finished.'] },
  { id: 'march-2026-core-update', name: 'March 2026 core update', type: 'Core', date: '2026-03-27', rollout: '12 days, 4 hours', status: 'Complete',
    summary: 'The first broad core update of 2026, released three days after the March spam update. It completed on 8 April.',
    details: ['It started on 27 March and was marked complete on 8 April, after 12 days and 4 hours. It began two days after the March spam update finished, so check page-level data to separate the effects of the two.'] },
  { id: 'march-2026-spam-update', name: 'March 2026 spam update', type: 'Spam', date: '2026-03-24', rollout: '19 hours, 30 minutes', status: 'Complete',
    summary: 'The shortest rollout on Google’s dashboard: finished in under a day.',
    details: ['It started on 24 March and was marked complete on 25 March, after 19 hours and 30 minutes, the shortest rollout listed on Google’s Search Status Dashboard.'] },
  { id: 'february-2026-discover-update', name: 'February 2026 Discover update', type: 'Other', date: '2026-02-05', rollout: '21 days, 17 hours', status: 'Complete',
    summary: 'A core update for Google Discover only, not regular search results. It started with English-language users in the US before expanding to more countries and languages. Publishers that rely on Discover traffic felt it most.',
    details: ['It was the first core update aimed only at the Discover feed. Google updated its Discover guidance alongside it, and the rollout took 21 days and 17 hours, finishing on 27 February.', 'Regular search rankings were not part of this update, so a change in Search Console’s Search results report around this time has a different cause.'] },

  // ---------- 2025 ----------
  { id: 'december-2025-core-update', name: 'December 2025 core update', type: 'Core', date: '2025-12-11', rollout: '18 days, 2 hours', status: 'Complete',
    summary: 'The third core update of 2025. Around its release Google updated its documentation to confirm it also makes smaller core updates throughout the year without announcing them.',
    details: ['It started on 11 December and was marked complete on 29 December, after 18 days and 2 hours, overlapping the holiday shopping season.', 'Google’s documentation update around this time is worth remembering when you analyse traffic: ranking shifts between named core updates can come from smaller, unannounced core updates.'] },
  { id: 'august-2025-spam-update', name: 'August 2025 spam update', type: 'Spam', date: '2025-08-26', rollout: '26 days, 15 hours', status: 'Complete',
    summary: 'The only spam update of 2025, and one of the longest spam rollouts at almost four weeks.' },
  { id: 'june-2025-core-update', name: 'June 2025 core update', type: 'Core', date: '2025-06-30', rollout: '16 days, 18 hours', status: 'Complete',
    summary: 'The second core update of 2025, completed on 17 July.' },
  { id: 'march-2025-core-update', name: 'March 2025 core update', type: 'Core', date: '2025-03-13', rollout: '13 days, 21 hours', status: 'Complete',
    summary: 'A regular core update aimed at showing more relevant, satisfying content from all kinds of sites, including smaller creators.' },

  // ---------- 2024 ----------
  { id: 'december-2024-spam-update', name: 'December 2024 spam update', type: 'Spam', date: '2024-12-19', rollout: '7 days, 2 hours', status: 'Complete',
    summary: 'A global spam update that began the week after the December core update.' },
  { id: 'december-2024-core-update', name: 'December 2024 core update', type: 'Core', date: '2024-12-12', rollout: '6 days, 4 hours', status: 'Complete',
    summary: 'Started one week after the November core update finished. Google said it came from improvements to a different core system, and it is one of the shortest core rollouts on record.' },
  { id: 'november-2024-core-update', name: 'November 2024 core update', type: 'Core', date: '2024-11-11', rollout: '23 days, 13 hours', status: 'Complete',
    summary: 'A broad core update that ran for more than three weeks, finishing on 5 December.' },
  { id: 'august-2024-core-update', name: 'August 2024 core update', type: 'Core', date: '2024-08-15', rollout: '19 days, 4 hours', status: 'Complete',
    summary: 'Google said it used feedback from the March 2024 update and aimed to better reward useful content from small and independent sites.' },
  { id: 'june-2024-spam-update', name: 'June 2024 spam update', type: 'Spam', date: '2024-06-20', rollout: '7 days, 1 hour', status: 'Complete',
    summary: 'A global spam update. Google noted it was not the algorithmic part of its site reputation abuse policy.' },
  { id: 'site-reputation-abuse-2024', name: 'Site reputation abuse enforcement', type: 'Spam', date: '2024-05-06',
    summary: 'Google began manual actions against “parasite SEO”: third-party pages published on trusted sites mainly to borrow the host site’s ranking signals.',
    details: ['Google later expanded its guidance to make clear that a host site’s involvement or oversight does not make third-party content that exploits its ranking signals acceptable.'] },
  { id: 'march-2024-spam-update', name: 'March 2024 spam update', type: 'Spam', date: '2024-03-05', rollout: '14 days, 21 hours', status: 'Complete',
    summary: 'Started enforcing new spam policies against scaled content abuse (mass-produced pages, with or without AI) and expired domain abuse.',
    details: ['It launched alongside three new spam policies: expired domain abuse, scaled content abuse and site reputation abuse. Enforcement of the site reputation abuse policy began in May 2024.'] },
  { id: 'march-2024-core-update', name: 'March 2024 core update', type: 'Core', date: '2024-03-05', rollout: '45 days', status: 'Complete',
    summary: 'The longest core update on record. It folded the helpful content system into Google’s core ranking systems, and Google said the change would cut unhelpful, unoriginal results by around 40%.',
    details: ['Google described it as more complex than usual, changing several core systems at once and folding the helpful content system into core ranking. It took 45 days to finish, the longest rollout on the dashboard.', 'Once it was complete, Google said the combined changes had cut low-quality, unoriginal content in search results by 45%.'] },

  // ---------- 2023 ----------
  { id: 'november-2023-reviews-update', name: 'November 2023 reviews update', type: 'Content', date: '2023-11-08', rollout: '29 days', status: 'Complete',
    summary: 'The last reviews update Google announced. After it, Google said improvements to how it assesses reviews would happen regularly without separate announcements.' },
  { id: 'november-2023-core-update', name: 'November 2023 core update', type: 'Core', date: '2023-11-02', rollout: '25 days, 21 hours', status: 'Complete',
    summary: 'Released less than a month after the October core update, improving a different core system.' },
  { id: 'october-2023-core-update', name: 'October 2023 core update', type: 'Core', date: '2023-10-05', rollout: '13 days, 23 hours', status: 'Complete',
    summary: 'Rolled out alongside the October spam update, so many sites saw both at once.' },
  { id: 'october-2023-spam-update', name: 'October 2023 spam update', type: 'Spam', date: '2023-10-04', rollout: '15 days, 12 hours', status: 'Complete',
    summary: 'Prompted by user reports of spam in several languages, it targeted cloaking, hacked sites, auto-generated and scraped content.' },
  { id: 'september-2023-helpful-content-update', name: 'September 2023 helpful content update', type: 'Content', date: '2023-09-14', rollout: '13 days, 11 hours', status: 'Complete',
    summary: 'The last standalone helpful content update. Google also changed its guidance from content “written by people” to content “created for people”, softening its position on AI-assisted writing.',
    details: ['Many independent publishers reported large traffic losses after this update. In March 2024 Google folded the helpful content system into its core ranking systems, so it no longer runs as a separate update.'] },
  { id: 'august-2023-core-update', name: 'August 2023 core update', type: 'Core', date: '2023-08-22', rollout: '16 days, 3 hours', status: 'Complete',
    summary: 'A broad core update completed on 7 September.' },
  { id: 'april-2023-reviews-update', name: 'April 2023 reviews update', type: 'Content', date: '2023-04-12', rollout: '13 days, 2 hours', status: 'Complete',
    summary: 'Expanded the product reviews system to reviews of all kinds, including services, businesses, destinations and media.' },
  { id: 'march-2023-core-update', name: 'March 2023 core update', type: 'Core', date: '2023-03-15', rollout: '13 days, 7 hours', status: 'Complete',
    summary: 'The first core update of 2023.' },
  { id: 'february-2023-product-reviews-update', name: 'February 2023 product reviews update', type: 'Content', date: '2023-02-21', rollout: '14 days', status: 'Complete',
    summary: 'Extended the product reviews system to more languages beyond English.' },

  // ---------- 2022 ----------
  { id: 'december-2022-link-spam-update', name: 'December 2022 link spam update', type: 'Spam', date: '2022-12-14', rollout: '29 days', status: 'Complete',
    summary: 'Used SpamBrain, Google’s AI spam-detection system, to find both sites buying links and sites set up to pass outgoing links, and to cancel the value of those links.' },
  { id: 'december-2022-helpful-content-update', name: 'December 2022 helpful content update', type: 'Content', date: '2022-12-05', rollout: '38 days', status: 'Complete',
    summary: 'Made the helpful content system global and available in all languages.' },
  { id: 'october-2022-spam-update', name: 'October 2022 spam update', type: 'Spam', date: '2022-10-19', rollout: '2 days', status: 'Complete',
    summary: 'A short global spam update.' },
  { id: 'september-2022-product-reviews-update', name: 'September 2022 product reviews update', type: 'Content', date: '2022-09-20', rollout: '6 days', status: 'Complete',
    summary: 'Another refinement of how Google rewards in-depth, first-hand product reviews.' },
  { id: 'september-2022-core-update', name: 'September 2022 core update', type: 'Core', date: '2022-09-12', rollout: '14 days', status: 'Complete',
    summary: 'Arrived while the first helpful content update was still finishing.' },
  { id: 'august-2022-helpful-content-update', name: 'August 2022 helpful content update', type: 'Content', date: '2022-08-25', rollout: '15 days', status: 'Complete',
    summary: 'The first helpful content update: a site-wide signal against content made mainly to rank rather than to help people. English only at launch.',
    details: ['It introduced a site-wide signal: if a site had a lot of unhelpful content, its other pages could also rank lower. Google said recovery could take months, because the classifier kept checking whether unhelpful content had been removed or improved.'] },
  { id: 'july-2022-product-reviews-update', name: 'July 2022 product reviews update', type: 'Content', date: '2022-07-27', rollout: '6 days', status: 'Complete',
    summary: 'A further update to the product reviews system.' },
  { id: 'may-2022-core-update', name: 'May 2022 core update', type: 'Core', date: '2022-05-25', rollout: '15 days', status: 'Complete',
    summary: 'The first core update of 2022.' },
  { id: 'march-2022-product-reviews-update', name: 'March 2022 product reviews update', type: 'Content', date: '2022-03-23', rollout: '14 days', status: 'Complete',
    summary: 'Continued rewarding reviews that show real testing, original photos and comparisons.' },
  { id: 'page-experience-desktop-2022', name: 'Page experience update for desktop', type: 'Page experience', date: '2022-02-22', rollout: '9 days', status: 'Complete',
    summary: 'Brought page experience signals, including Core Web Vitals and HTTPS, to desktop rankings after the mobile rollout in 2021.' },

  // ---------- 2021 ----------
  { id: 'december-2021-product-reviews-update', name: 'December 2021 product reviews update', type: 'Content', date: '2021-12-01', rollout: '20 days', status: 'Complete',
    summary: 'The first update listed on Google’s Search Status Dashboard. It refined how Google rewards detailed, first-hand product reviews.' },
  { id: 'november-2021-core-update', name: 'November 2021 core update', type: 'Core', date: '2021-11-17', rollout: 'About 2 weeks', status: 'Complete',
    summary: 'A broad core update released just before the holiday shopping season.' },
  { id: 'july-2021-link-spam-update', name: 'July 2021 link spam update', type: 'Spam', date: '2021-07-26', rollout: 'About 2 weeks', status: 'Complete',
    summary: 'Targeted unnatural links, including sponsored and affiliate links without the right link attributes.' },
  { id: 'july-2021-core-update', name: 'July 2021 core update', type: 'Core', date: '2021-07-01', rollout: '11 days', status: 'Complete',
    summary: 'The second half of a two-part core update Google started in June.' },
  { id: 'page-experience-update-2021', name: 'Page experience update', type: 'Page experience', date: '2021-06-15', rollout: 'About 2.5 months', status: 'Complete',
    summary: 'Made Core Web Vitals (loading, interactivity and visual stability) part of mobile ranking, alongside HTTPS, mobile-friendliness and no intrusive pop-ups.',
    details: ['It also removed the AMP requirement for Google’s Top Stories carousel, so any page that met Google News policies could appear there.'] },
  { id: 'june-2021-core-update', name: 'June 2021 core update', type: 'Core', date: '2021-06-02', rollout: '10 days', status: 'Complete',
    summary: 'The first of two back-to-back core updates; Google said some improvements were not ready and would follow in July.' },
  { id: 'april-2021-product-reviews-update', name: 'April 2021 product reviews update', type: 'Content', date: '2021-04-08', status: 'Complete',
    summary: 'The first product reviews update, rewarding in-depth reviews over thin summaries of a manufacturer’s specs.' },

  // ---------- 2020 ----------
  { id: 'december-2020-core-update', name: 'December 2020 core update', type: 'Core', date: '2020-12-03', rollout: '13 days', status: 'Complete',
    summary: 'A broad core update released during the busy holiday period.' },
  { id: 'may-2020-core-update', name: 'May 2020 core update', type: 'Core', date: '2020-05-04', rollout: '14 days', status: 'Complete',
    summary: 'A large core update during the first months of the pandemic, when search behaviour was already shifting.' },
  { id: 'january-2020-core-update', name: 'January 2020 core update', type: 'Core', date: '2020-01-13', rollout: 'About 4 days', status: 'Complete',
    summary: 'The first core update of 2020.' },

  // ---------- 2019 ----------
  { id: 'bert-2019', name: 'BERT', type: 'Other', date: '2019-10-25',
    summary: 'A language model that helps Google understand the context of words in a query, especially longer, conversational searches. At launch Google said it affected about one in ten English searches in the US.',
    details: ['BERT stands for Bidirectional Encoder Representations from Transformers. It reads a word in the context of the words around it, which helps with prepositions such as “for” and “to” that can change a query’s meaning. Google also used it to improve featured snippets.'] },
  { id: 'september-2019-core-update', name: 'September 2019 core update', type: 'Core', date: '2019-09-24', status: 'Complete',
    summary: 'A broad core update that took several days to roll out fully.' },
  { id: 'june-2019-core-update', name: 'June 2019 core update', type: 'Core', date: '2019-06-03', rollout: '5 days', status: 'Complete',
    summary: 'Google gave a day’s notice on social media before this one went live, a first at the time.' },
  { id: 'march-2019-core-update', name: 'March 2019 core update', type: 'Core', date: '2019-03-12', status: 'Complete',
    summary: 'A broad core update confirmed by Google, the first of three core updates in 2019.' },

  // ---------- 2018 ----------
  { id: 'august-2018-core-update', name: 'August 2018 core update (“Medic”)', type: 'Core', date: '2018-08-01', status: 'Complete',
    summary: 'Nicknamed “Medic” because health and finance sites saw large swings. It pushed the industry to focus on expertise, authority and trust.',
    details: ['Google said there was no specific fix for sites that lost rankings, and pointed site owners to its quality rater guidelines. Its effect on health, finance and other “your money or your life” sites put expertise and trust at the centre of SEO.'] },
  { id: 'speed-update-2018', name: 'Speed Update', type: 'Page experience', date: '2018-07-09', status: 'Complete',
    summary: 'Made page speed a ranking factor for mobile searches, affecting only the slowest pages.',
    details: ['Google said it would affect only a small share of queries and that intent still mattered: a slow page with the best answer could still rank well.'] },
  { id: 'mobile-first-indexing-2018', name: 'Mobile-first indexing rollout', type: 'Page experience', date: '2018-03-26',
    summary: 'Google began indexing and ranking sites based on their mobile version rather than desktop.',
    details: ['Google moved sites over in batches over several years, notifying site owners in Search Console as their site switched.'] },

  // ---------- 2016 and earlier ----------
  { id: 'penguin-4-2016', name: 'Penguin 4.0', type: 'Spam', date: '2016-09-23',
    summary: 'Penguin became part of the core algorithm and started working in real time, devaluing spammy links rather than demoting whole sites.',
    details: ['Because Penguin now ran in real time, sites no longer had to wait for the next Penguin refresh to recover after cleaning up their links.'] },
  { id: 'rankbrain-2015', name: 'RankBrain', type: 'Other', date: '2015-10-26',
    summary: 'Google revealed it was using machine learning to interpret searches, especially queries it had never seen before.',
    details: ['Google said in 2015 that RankBrain had become the third most important signal for ranking results.'] },
  { id: 'mobile-friendly-update-2015', name: 'Mobile-friendly update', type: 'Page experience', date: '2015-04-21',
    summary: 'Gave a ranking boost to mobile-friendly pages in mobile search results.',
    details: ['Nicknamed “Mobilegeddon” before launch, it worked page by page and affected mobile searches only.'] },
  { id: 'https-ranking-signal-2014', name: 'HTTPS as a ranking signal', type: 'Page experience', date: '2014-08-06',
    summary: 'Google confirmed secure HTTPS connections as a light ranking signal.',
    details: ['At launch Google said the signal affected fewer than 1% of queries worldwide, while encouraging all sites to move to HTTPS.'] },
  { id: 'pigeon-2014', name: 'Pigeon', type: 'Other', date: '2014-07-24',
    summary: 'Tied local search results more closely to Google’s web ranking signals and improved distance and location ranking.' },
  { id: 'hummingbird-2013', name: 'Hummingbird', type: 'Other', date: '2013-09-26',
    summary: 'A rewrite of Google’s core algorithm to understand the meaning of whole queries instead of matching individual keywords.',
    details: ['Google announced it at its 15th birthday event in September 2013, saying it had already been running for about a month.'] },
  { id: 'penguin-2012', name: 'Penguin', type: 'Spam', date: '2012-04-24',
    summary: 'Targeted manipulative link building and keyword stuffing, hitting sites that relied on paid or low-quality links.',
    details: ['Google said it affected about 3.1% of English-language queries. Later versions were refreshed periodically until Penguin 4.0 made it real-time in 2016.'] },
  { id: 'panda-2011', name: 'Panda', type: 'Content', date: '2011-02-24',
    summary: 'Demoted thin, low-quality and content-farm pages. It changed how sites thought about content quality and later became part of the core algorithm.',
    details: ['Google said the first release affected around 12% of US search queries. Panda was refreshed many times before it became part of Google’s core ranking algorithm.'] },
];

export const typeLabels: { type: UpdateType; label: string }[] = [
  { type: 'Core', label: 'Core updates' },
  { type: 'Spam', label: 'Spam updates' },
  { type: 'Content', label: 'Helpful content & reviews' },
  { type: 'Page experience', label: 'Page experience' },
  { type: 'Other', label: 'Other' },
];

export const formatUpdateDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// ---------- helpers for the update pages ----------

export const getUpdate = (id: string) => updates.find(u => u.id === id);
export const updatePath = (u: AlgoUpdate) => `/google-algorithm-updates/${u.id}`;
export const typeName = (t: UpdateType) => (t === 'Content' ? 'Helpful content' : t);

// Completion date from the dashboard rollout length ("13 days, 20 hours", "19 hours, 30 minutes", "45 days"):
// start date + whole days, plus one more day when the remainder is 12 hours or more.
export function endDate(u: AlgoUpdate): string | undefined {
  if (!u.rollout || u.status !== 'Complete') return;
  const d = /(\d+) days?/.exec(u.rollout), h = /(\d+) hours?/.exec(u.rollout);
  if (!d && !h) return;
  if (/about/i.test(u.rollout)) return;
  const days = (d ? Number(d[1]) : 0) + (h && Number(h[1]) >= 12 ? 1 : 0);
  const end = new Date(`${u.date}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + days);
  return end.toISOString().slice(0, 10);
}

// Newer and older neighbours in the full list, and other updates of the same type.
export function neighbours(u: AlgoUpdate) {
  const i = updates.indexOf(u);
  return { newer: updates[i - 1], older: updates[i + 1] };
}
export const sameType = (u: AlgoUpdate, n = 3) => updates.filter(x => x.type === u.type && x.id !== u.id).slice(0, n);

// Updates from December 2021 onward are listed on Google's Search Status Dashboard.
export const onDashboard = (u: AlgoUpdate) => u.date >= '2021-12-01';

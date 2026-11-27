import type { UpdateType } from './updates';

// Per-type copy for the individual update pages: what this kind of update is, and what to do if it moved your traffic.

export const guidance: Record<UpdateType, { about: string[]; steps: { h: string; p: string }[] }> = {
  Core: {
    about: [
      'A core update is a broad change to the systems Google uses to judge how relevant and useful pages are. It does not target a type of site or a specific mistake, so a drop does not mean your site broke a rule. More often, other pages are now judged a better answer for the same searches.',
      'Google releases several named core updates a year and makes smaller, unannounced core changes in between.',
    ],
    steps: [
      { h: 'Wait for the rollout to finish', p: 'Rankings can rise and fall several times during a rollout. Judge the impact only once Google marks the update complete.' },
      { h: 'Compare full weeks', p: 'In Search Console, compare a week after the rollout ended with the week before it started. Look at clicks and average position by page and by query.' },
      { h: 'Study the pages that now outrank you', p: 'For the queries you lost, look at what the top results offer that your page does not: first-hand experience, clearer answers, fresher facts, better structure.' },
      { h: 'Improve the content, then be patient', p: 'Update or merge weak pages rather than deleting them in bulk. Improvements are often recognised at a later core update.' },
    ],
  },
  Spam: {
    about: [
      'A spam update improves SpamBrain and Google’s other automated systems that detect pages breaking its spam policies, such as link schemes, scaled content abuse, cloaking, hacked content and thin affiliate pages.',
      'If a spam update lowers links pointing to your site, any boost those links were giving disappears. That loss is not reversed when you remove them.',
    ],
    steps: [
      { h: 'Check for a manual action', p: 'Open Security & Manual Actions in Search Console. A manual action tells you exactly which policy Google applied and lets you request a review after fixing it.' },
      { h: 'Review against Google’s spam policies', p: 'Look honestly at bought or exchanged links, mass-produced pages, doorway pages and third-party content hosted on your site.' },
      { h: 'Check for hacked or injected content', p: 'Search for unfamiliar pages, spam keywords or redirects on your domain, and fix any security issue Search Console reports.' },
      { h: 'Build value the clean way', p: 'Replace lost link equity with links earned through useful content and digital PR, and remove or improve pages created mainly to rank.' },
    ],
  },
  Content: {
    about: [
      'These updates changed how Google rewards original, people-first content and in-depth reviews. Since March 2024 the helpful content system is part of Google’s core ranking systems, and reviews improvements happen without separate announcements.',
      'They favour pages that show first-hand experience, real testing and clear expertise over summaries that add nothing new.',
    ],
    steps: [
      { h: 'Find thin and unhelpful pages', p: 'List pages with few clicks, high bounce or content that mostly repeats other sites. These can weigh on how Google sees the whole site.' },
      { h: 'Show real experience', p: 'Add original photos, test results, examples and the details only someone who used the product or service would know.' },
      { h: 'Make authorship clear', p: 'Show who wrote each page, why they are qualified, and when it was last reviewed.' },
      { h: 'Improve, merge or remove', p: 'Rewrite pages worth keeping, merge overlapping ones and retire pages that serve no reader. Then give Google time to reassess.' },
    ],
  },
  'Page experience': {
    about: [
      'Page experience covers how a page works for visitors: loading speed, responsiveness and visual stability (Core Web Vitals), mobile-friendliness, HTTPS and no intrusive pop-ups.',
      'Google treats these as supporting signals. A great page experience will not outrank a more relevant answer, but it can make the difference between similar pages.',
    ],
    steps: [
      { h: 'Check the Core Web Vitals report', p: 'Search Console groups URLs by template, showing which pages fail Largest Contentful Paint, Interaction to Next Paint or Cumulative Layout Shift.' },
      { h: 'Fix the heaviest templates first', p: 'Compress images, cut unused scripts and third-party tags, and reserve space for images and ads so the layout does not jump.' },
      { h: 'Test on a real phone', p: 'Make sure text is readable, buttons are easy to tap and nothing covers the main content.' },
      { h: 'Keep HTTPS clean', p: 'Serve every page over HTTPS with no mixed-content warnings, and redirect old HTTP URLs.' },
    ],
  },
  Other: {
    about: [
      'Some of Google’s biggest changes are not core or spam updates: new language models such as RankBrain and BERT, changes to local results, or updates for a single surface such as Discover.',
      'They usually change how Google understands searches and where results appear, more than how it judges your site’s quality.',
    ],
    steps: [
      { h: 'Check which surface changed', p: 'Use Search Console’s search type filter (Web, Discover, News, Image) to see where traffic moved.' },
      { h: 'Look at query intent', p: 'If longer or conversational queries changed, make sure your pages answer the question directly, in natural language.' },
      { h: 'Strengthen the basics', p: 'Clear headings, structured data and up-to-date business details help Google match your pages to the right searches.' },
      { h: 'Track over several weeks', p: 'These changes often settle gradually. Compare weekly trends rather than single days.' },
    ],
  },
};

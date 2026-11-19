// The free SEO tools: one entry per tool page at /seo-tools/<slug>.
// Order = order on the /seo-tools hub and in the header "SEO Tools" menu.

export type ToolInfo = {
  slug: string;
  menuLabel: string;   // label in the header menu (matches the approved design)
  name: string;        // H1 and card title
  metaTitle: string;
  description: string; // meta description
  short: string;       // one-line summary for cards
  intro: string;       // paragraph under the H1
  checks: { title: string; text: string }[];
  howTo: string[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string; text: string }[];
};

export const tools: ToolInfo[] = [
  {
    slug: 'keyword-research-tool',
    menuLabel: 'Keyword Research',
    name: 'Free Keyword Research Tool',
    metaTitle: 'Free Keyword Research Tool: Ideas & Intent Grouping',
    description: 'Free keyword research tool: turn a seed keyword into question, comparison, commercial and local ideas, tag search intent and group keywords. CSV export.',
    short: 'Expand a seed keyword into ideas by intent, and group keyword lists into topic clusters.',
    intro: 'Enter a seed keyword to get question, comparison, commercial and local variations, each tagged with its likely search intent. Or paste your own keyword list and group it into clusters, one per page you should build. Everything runs in your browser; nothing is stored.',
    checks: [
      { title: 'Keyword ideas', text: 'Combines your seed with the modifiers people actually use: questions (how, what, why), comparisons (vs, alternatives), commercial terms (best, price, near me) and research terms (guide, checklist, examples).' },
      { title: 'Search intent', text: 'Tags each idea as informational, commercial, transactional or local, so you know whether it needs a guide, a comparison page, a service page or a location page.' },
      { title: 'Keyword grouping', text: 'Clusters a pasted list by its shared core words, suggests the head term for each cluster and flags groups that mix intents and may need separate pages.' },
      { title: 'Validation links', text: 'Each idea links to Google Trends and a Google search, so you can check real interest and see what already ranks before you write.' },
    ],
    howTo: [
      'Start with a short seed (two or three words) that describes what you sell or teach.',
      'Filter by intent and keep ideas that match a page you could genuinely create.',
      'Check demand: open Google Trends from the table, or compare with your Search Console queries.',
      'Paste your shortlist into “Group keywords” to see which terms belong on the same page.',
      'Export to CSV and map each cluster to one URL in your content plan.',
    ],
    faqs: [
      { question: 'Does this tool show search volume?', answer: 'No. Search volume needs paid data sources, and estimates from free tools are often far off. The tool focuses on finding and organizing ideas; use Google Trends (linked for every idea), Google Keyword Planner or your own Search Console data to compare demand.' },
      { question: 'How is search intent decided?', answer: 'By the words in the keyword. Terms like “how”, “what” and “guide” signal informational intent; “best”, “vs” and “review” signal commercial research; “price”, “buy”, “hire” and “services” signal transactional intent; “near me” and place names signal local intent. Always confirm by looking at what currently ranks.' },
      { question: 'How does keyword grouping work?', answer: 'Each keyword is reduced to its core words (removing filler words and simple plurals). Keywords whose core words contain a shorter keyword’s core words are grouped under it. It is a fast first pass; review the groups and merge or split them where the search results suggest otherwise.' },
      { question: 'Is my data saved?', answer: 'No. The keyword tool runs entirely in your browser. Nothing you type is sent to our server or stored.' },
    ],
    related: [
      { label: 'Advanced SEO Strategies', href: '/learn-seo/advanced-seo-strategies', text: 'Turn keyword groups into a topical map.' },
      { label: 'On-Page SEO Checker', href: '/seo-tools/on-page-seo-checker', text: 'Check a page against its target keyword.' },
      { label: 'SEO Content Writing', href: '/seo-content-writing-services', text: 'Have the content written for you.' },
    ],
  },
  {
    slug: 'technical-seo-checker',
    menuLabel: 'Technical SEO',
    name: 'Free Technical SEO Checker',
    metaTitle: 'Free Technical SEO Checker: Redirects, Robots & Indexing',
    description: 'Free technical SEO checker: status code, redirect chain, robots.txt for Googlebot and AI crawlers, noindex, canonical, sitemap, HTTPS and more.',
    short: 'Status codes, redirects, robots.txt, noindex, canonicals, sitemap, HTTPS and AI crawler access.',
    intro: 'Enter any URL to see how search engine crawlers experience it: the response, the full redirect chain, whether robots.txt lets Googlebot and AI crawlers in, indexing directives, canonical, sitemap, security and mobile basics.',
    checks: [
      { title: 'Response and redirects', text: 'HTTP status, every hop in the redirect chain with its status code, server response time, HTML size and compression.' },
      { title: 'Crawling and indexing', text: 'robots.txt rules for Googlebot, meta robots and X-Robots-Tag noindex, canonical tag, XML sitemap discovery, and whether content depends on JavaScript.' },
      { title: 'Security and mobile', text: 'HTTPS, HTTP-to-HTTPS redirect, HSTS, mixed content, the viewport tag and the language attribute.' },
      { title: 'AI and search crawlers', text: 'Whether robots.txt allows Bingbot, OAI-SearchBot (ChatGPT search), PerplexityBot, GPTBot and Google-Extended.' },
    ],
    howTo: [
      'Check your most important URLs first: home page, top service or category pages, and key landing pages.',
      'Fix red items immediately; a noindex or robots.txt block on a page you want ranked is urgent.',
      'Shorten redirect chains and update internal links to point at the final URL.',
      'Confirm in Google Search Console with URL Inspection, which shows how Google itself sees the page.',
    ],
    faqs: [
      { question: 'Why does my result differ from Google Search Console?', answer: 'Our checker fetches the page once, from our server, without running JavaScript. Search Console shows Google’s own crawl and render, which may happen at a different time, from different locations and with JavaScript executed. Use this tool for quick checks and Search Console as the final word.' },
      { question: 'Some sites return an error. Why?', answer: 'Some websites block automated requests through firewalls or bot protection, and some take longer than our 10-second limit. If a site you own is blocked, check that your security settings aren’t also blocking search engine crawlers.' },
      { question: 'Does this check Core Web Vitals?', answer: 'No. Core Web Vitals come from real Chrome users. Use Google PageSpeed Insights or the Core Web Vitals report in Search Console for those. The response time shown here is a rough server-speed indicator only.' },
      { question: 'Do you store the URLs I check?', answer: 'No. The page is fetched, returned to your browser for analysis and not saved.' },
    ],
    related: [
      { label: 'Technical SEO Guide', href: '/learn-seo/technical-seo', text: 'The complete crawling, indexing and speed checklist.' },
      { label: 'SEO Audit Tool', href: '/seo-tools/seo-audit-tool', text: 'Combine technical and on-page checks into a scored audit.' },
      { label: 'AI SEO Guide', href: '/learn-seo/ai-seo', text: 'Which AI crawlers to allow, and why.' },
    ],
  },
  {
    slug: 'on-page-seo-checker',
    menuLabel: 'On-Page Analysis',
    name: 'Free On-Page SEO Checker',
    metaTitle: 'Free On-Page SEO Checker: Analyze Any Page',
    description: 'Free on-page SEO checker: search preview, title and meta description length, H1 and headings, links, image alt text, schema and keyword placement.',
    short: 'Title, meta description, headings, content, links, images, schema and target keyword placement.',
    intro: 'Enter a URL and, optionally, the keyword you want it to rank for. You’ll get a search result preview, the page’s heading outline and a check of every on-page element, with a specific fix for anything that needs work.',
    checks: [
      { title: 'Title and description', text: 'Length and content of the title tag and meta description, with a preview of how the result may look in Google.' },
      { title: 'Headings and content', text: 'The H1, the full heading outline, skipped heading levels and visible word count.' },
      { title: 'Links and images', text: 'Internal and external link counts, nofollow links, links without text and images missing alt attributes.' },
      { title: 'Schema and sharing', text: 'JSON-LD and microdata types found (and invalid JSON), plus Open Graph tags for social sharing.' },
      { title: 'Target keyword', text: 'Whether your keyword appears in the title, H1, meta description, URL, first 100 words and an H2.' },
    ],
    howTo: [
      'Enter the page URL and the main keyword you want that page to rank for.',
      'Read the search preview: would you click it? Rewrite the title and description if not.',
      'Check the heading outline reads like a clear table of contents for the topic.',
      'Work through warnings in order; keyword placement matters less than answering the searcher’s question well.',
    ],
    faqs: [
      { question: 'What is a good title tag length?', answer: 'About 50–60 characters usually displays in full. Google truncates by pixel width rather than characters, so treat it as a guide: put the most important words first and make every word count.' },
      { question: 'Does keyword density matter?', answer: 'Not as a target. Use your main phrase where it naturally fits — title, H1, introduction and a heading — and then write for the reader with related terms and real detail. Repeating a phrase to hit a percentage can make content worse.' },
      { question: 'Why is the word count different from what I see?', answer: 'The checker counts visible text in the HTML it receives, including navigation and footer text, and excludes content that only appears after JavaScript runs. Use it as a relative indicator.' },
      { question: 'Is a meta description a ranking factor?', answer: 'No, but it often becomes the snippet under your title, so a clear, compelling description can increase clicks. Google may rewrite it to match the query.' },
    ],
    related: [
      { label: 'Keyword Research Tool', href: '/seo-tools/keyword-research-tool', text: 'Find the right target keyword first.' },
      { label: 'Technical SEO Checker', href: '/seo-tools/technical-seo-checker', text: 'Make sure the page can be crawled and indexed.' },
      { label: 'SEO Content Writing', href: '/seo-content-writing-services', text: 'Pages written to rank and convert.' },
    ],
  },
  {
    slug: 'seo-audit-tool',
    menuLabel: 'SEO Audit',
    name: 'Free SEO Audit Tool',
    metaTitle: 'Free SEO Audit Tool: Instant Website SEO Score',
    description: 'Free instant SEO audit for any page: an overall score, technical and on-page scores, and a prioritized list of fixes with clear instructions.',
    short: 'A scored technical and on-page audit with the fixes ranked by impact.',
    intro: 'Get an instant SEO score for any page, split into technical and on-page scores, with every issue ranked by how much it matters and a specific fix for each. Save the report as a PDF or copy it into your task list.',
    checks: [
      { title: 'Overall SEO score', text: 'A weighted score out of 100: critical items such as indexability and the H1 count more than minor ones such as HSTS.' },
      { title: 'Technical checks', text: 'Status code, redirects, robots.txt, noindex, canonical, sitemap, HTTPS, compression, JavaScript reliance, viewport and AI crawler access.' },
      { title: 'On-page checks', text: 'Title, meta description, headings, word count, internal links, image alt text, Open Graph, structured data and optional keyword placement.' },
      { title: 'Prioritized fixes', text: 'Failures and warnings sorted by impact, so you know what to fix first.' },
    ],
    howTo: [
      'Audit your home page and your three most valuable landing pages.',
      'Fix the top priorities first; one critical fix is worth more than ten minor ones.',
      'Re-run the audit after changes to confirm the fix.',
      'For a full-site review with competitor and keyword analysis, request an expert audit.',
    ],
    faqs: [
      { question: 'How is the SEO score calculated?', answer: 'Each check has a weight from 1 (minor) to 3 (critical). A pass earns the full weight, a warning half and a failure nothing; informational items don’t count. The score is the total earned as a percentage of the maximum. It measures technical and on-page health, not how well the page will rank against competitors.' },
      { question: 'Does a score of 100 mean I’ll rank first?', answer: 'No. A high score means the page has no technical or on-page barriers. Rankings also depend on relevance, content quality, competition, links and brand trust, which no single-page audit can measure.' },
      { question: 'Does it audit my whole website?', answer: 'It audits one URL at a time, plus site-wide files (robots.txt and the XML sitemap). For a full crawl of every page, competitor gaps and a prioritized roadmap, request a free expert audit.' },
      { question: 'Can I share the report?', answer: 'Yes. Use “Save as PDF” to download it, or “Copy report” to paste the list of fixes into an email or project tool.' },
    ],
    related: [
      { label: 'Technical SEO Guide', href: '/learn-seo/technical-seo', text: 'Understand every technical item in the audit.' },
      { label: 'Local SEO Services', href: '/local-seo-services', text: 'Have a specialist fix it for you.' },
      { label: 'Learn SEO', href: '/learn-seo', text: 'Free guides from fundamentals to AI search.' },
    ],
  },
];

export const getTool = (slug: string) => tools.find(t => t.slug === slug);

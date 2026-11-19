import type { Post } from '../../blog/types';

// Learn SEO guide: AI SEO. Headings with an `id` must match the entries in `toc`.
// Targets "what is AI SEO" / "how to rank in AI Overviews". Commercial query lives on /ai-seo-services.

const faqs = [
  {
    question: 'What is AI SEO?',
    answer: 'AI SEO is the practice of making your brand and content visible in AI-generated answers — Google’s AI Overviews and AI Mode, ChatGPT search, Perplexity, Microsoft Copilot and similar tools — as well as in traditional search results. It is also called generative engine optimization (GEO) or answer engine optimization (AEO). It builds on standard SEO and adds a focus on being a clear, citable, trusted source.',
  },
  {
    question: 'Is AI SEO different from regular SEO?',
    answer: 'Mostly it is the same work with different emphasis. Google says there are no extra requirements to appear in AI Overviews or AI Mode beyond being indexed and eligible for a snippet. What changes is that answers are assembled from passages, so clear structure, direct answers, original information and a well-known brand matter more, while ranking first for one keyword matters less.',
  },
  {
    question: 'Does llms.txt help with AI visibility?',
    answer: 'Not for Google. Google’s own guide to optimizing for its generative AI features says you don’t need llms.txt or other AI-specific files, and that Google Search ignores them. Chrome’s Lighthouse has an experimental check for it aimed at AI browsing agents, so it can be a harmless extra, but it doesn’t replace what matters: crawlable pages, clear content, structured data and authority.',
  },
  {
    question: 'Should I block AI crawlers?',
    answer: 'That depends on your goals, and the crawlers differ. Blocking a search crawler such as OAI-SearchBot or PerplexityBot can remove you from that product’s answers. Blocking a training crawler such as GPTBot or the Google-Extended token limits use for model training. Google-Extended does not affect whether you appear in Google Search or AI Overviews. Decide crawler by crawler.',
  },
  {
    question: 'How do I measure AI search visibility?',
    answer: 'Use several signals together: referral traffic from chatgpt.com, perplexity.ai and similar sources in analytics; Search Console’s Generative AI report, which shows impressions in AI Overviews and AI Mode by page; regular manual checks of priority questions across AI tools; brand mention tracking tools that sample AI answers; and growth in branded search, which often follows AI exposure.',
  },
  {
    question: 'Can small businesses appear in AI answers?',
    answer: 'Yes. AI answers for local and niche questions often cite smaller specialists, local directories, review platforms and forum discussions. A complete Google Business Profile, consistent listings, genuine reviews and pages that answer specific customer questions clearly give small businesses a real chance.',
  },
];

const surfaces = [
  { name: 'Google AI Overviews', how: 'AI summary at the top of regular results, with linked sources', basis: 'Google’s index and ranking systems' },
  { name: 'Google AI Mode', how: 'Conversational search with follow-up questions and linked sources', basis: 'Google’s index, with many related searches run in the background' },
  { name: 'ChatGPT search', how: 'Answers with citations inside ChatGPT', basis: 'Its own search crawler and third-party search partners' },
  { name: 'Perplexity', how: 'Answer engine with numbered source citations', basis: 'Its own crawler and index' },
  { name: 'Microsoft Copilot', how: 'Assistant answers with citations', basis: 'Bing’s index' },
];

const contentSteps = [
  'Open each section with a direct answer of two or three sentences, then add detail, evidence and examples',
  'Use question-style headings that match how people ask (“How much does a boiler service cost?”)',
  'Keep facts specific and current: numbers, dates, prices, named sources and a visible “updated” date',
  'Add what only you know: first-hand experience, original data, case results, expert opinions and photos',
  'Use tables and lists for comparisons and steps; they are easy to extract and quote accurately',
  'Cover follow-up questions on the same page so it answers the whole conversation, not just one query',
];

function Body() {
  return <>
    <p className="post-intro">Search is no longer only a list of ten links. Google now answers many questions with AI Overviews and AI Mode, and a growing number of people ask ChatGPT, Perplexity or Copilot instead of searching at all. These tools read the web, assemble an answer and cite a handful of sources. Being one of those sources is the goal of AI SEO.</p>
    <p>This guide explains how AI search chooses sources, the technical access every AI crawler needs, how to structure content so it can be quoted, how to build the brand signals AI systems rely on, and how to measure results. If you want this handled for you, see our <a href="/ai-seo-services">AI SEO services</a>.</p>

    <section id="what-is-ai-seo">
      <h2>What AI SEO means</h2>
      <p>AI SEO (also called GEO, generative engine optimization, or AEO, answer engine optimization) is about visibility inside AI-generated answers. The main places those answers appear:</p>
      <div className="post-table"><table>
        <caption>Where AI answers appear and where their sources come from</caption>
        <thead><tr><th scope="col">Surface</th><th scope="col">How it answers</th><th scope="col">Where sources come from</th></tr></thead>
        <tbody>{surfaces.map(s => <tr key={s.name}><th scope="row">{s.name}</th><td>{s.how}</td><td>{s.basis}</td></tr>)}</tbody>
      </table></div>
      <p>Two things stand out. First, most of these products depend on a conventional search index — Google’s, Bing’s or their own — so pages that aren’t indexed and ranking reasonably well rarely get cited. Second, answers are built from passages, not whole pages, so a page can be cited for one well-written paragraph even if it doesn’t rank first.</p>
    </section>

    <section id="how-ai-chooses-sources">
      <h2>How AI search chooses its sources</h2>
      <p>The systems differ, but the sources they cite tend to share the same qualities:</p>
      <ul className="post-list">
        <li><strong>Relevant passages:</strong> a section that directly answers the question or a closely related sub-question.</li>
        <li><strong>Retrievable and indexed:</strong> the page can be crawled by that product’s crawler and appears in the index it uses.</li>
        <li><strong>Trusted and well known:</strong> brands and sites that are mentioned and linked widely across the web, and consistent in what they say.</li>
        <li><strong>Specific and current:</strong> concrete facts, numbers and dates are easier to cite than general statements.</li>
        <li><strong>Distinct information:</strong> first-hand experience, original data and expert views add something other sources don’t.</li>
      </ul>
      <aside className="post-callout">
        <p className="t">Google’s position</p>
        <p>Google’s guide to optimizing for its generative AI features (published on Search Central in May 2026) says the same SEO best practices apply to AI Overviews and AI Mode: pages need to be indexed and eligible to show a snippet, and special AI files or markup aren’t required. There is no separate “AI ranking factor” to chase.</p>
      </aside>
    </section>

    <section id="technical-access">
      <h2>Technical access for AI crawlers</h2>
      <p>If a crawler can’t reach and read a page, nothing else matters. Check:</p>
      <div className="post-table"><table>
        <caption>Main crawlers and what blocking them affects</caption>
        <thead><tr><th scope="col">User agent / token</th><th scope="col">Used for</th><th scope="col">If you block it</th></tr></thead>
        <tbody>
          <tr><th scope="row">Googlebot</th><td>Google Search, including AI Overviews and AI Mode</td><td>You disappear from Google Search</td></tr>
          <tr><th scope="row">Google-Extended</th><td>Use of content for Gemini model training and grounding</td><td>No effect on Google Search or AI Overviews</td></tr>
          <tr><th scope="row">Bingbot</th><td>Bing and Copilot answers</td><td>You disappear from Bing and Copilot</td></tr>
          <tr><th scope="row">OAI-SearchBot</th><td>ChatGPT search results</td><td>Your pages can’t be shown as ChatGPT search sources</td></tr>
          <tr><th scope="row">GPTBot</th><td>OpenAI model training</td><td>Content isn’t used for training; search is unaffected</td></tr>
          <tr><th scope="row">PerplexityBot</th><td>Perplexity’s search index</td><td>Reduced presence in Perplexity answers</td></tr>
        </tbody>
      </table></div>
      <ul className="post-list">
        <li>Check robots.txt and any firewall or bot-protection rules; CDN “block AI bots” settings sometimes block search crawlers you want.</li>
        <li>Put main content in the initial HTML. Many AI crawlers don’t run JavaScript, so client-rendered content may be invisible to them.</li>
        <li>Keep pages fast and returning 200; slow or failing pages are skipped.</li>
        <li>Add structured data (<code>Organization</code>, <code>Article</code>, <code>Product</code>, <code>FAQPage</code>, <code>LocalBusiness</code>) so facts about you are unambiguous.</li>
      </ul>
      <p>Our free <a href="/seo-tools/technical-seo-checker">technical SEO checker</a> shows whether your robots.txt allows the main search and AI crawlers to fetch a URL.</p>
    </section>

    <section id="content-structure">
      <h2>Structure content so it can be quoted</h2>
      <p>AI systems extract passages. Content that is easy to extract accurately is easier to cite. Apply these patterns to your key pages:</p>
      <ol className="post-steps">{contentSteps.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
      <p>This is not about writing for robots. The same structure helps busy human readers find answers fast, which is why it tends to improve engagement and conversion too.</p>
    </section>

    <section id="brand-authority">
      <h2>Build brand authority and mentions</h2>
      <p>AI answers lean heavily on sources that are widely referenced. Your brand’s presence across the web matters as much as your own pages.</p>
      <ul className="post-list">
        <li><strong>Earn mentions in trusted publications</strong> through digital PR and expert commentary; see our <a href="/learn-seo/link-building">link building guide</a>.</li>
        <li><strong>Be present where AI looks for opinions:</strong> review platforms, industry directories, comparison articles, and genuine participation in forums and communities such as Reddit and Quora.</li>
        <li><strong>Keep your entity consistent:</strong> same name, description, services and facts across your site, Google Business Profile, LinkedIn, Wikidata where appropriate, and directories.</li>
        <li><strong>Show real people and expertise:</strong> author bios with credentials, named experts and first-hand evidence strengthen trust signals for both search engines and AI.</li>
      </ul>
    </section>

    <section id="measure">
      <h2>How to measure AI search visibility</h2>
      <div className="post-table"><table>
        <caption>Ways to track AI search performance</caption>
        <thead><tr><th scope="col">Signal</th><th scope="col">How to track it</th></tr></thead>
        <tbody>
          <tr><th scope="row">AI referral traffic</th><td>Analytics referrals from chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com</td></tr>
          <tr><th scope="row">Google AI features</th><td>Search Console’s Generative AI report (impressions in AI Overviews and AI Mode by page); clicks from these features are counted in the main Performance report</td></tr>
          <tr><th scope="row">Citation share</th><td>A fixed list of priority questions checked monthly across AI tools, or a brand-tracking tool that samples AI answers</td></tr>
          <tr><th scope="row">Brand demand</th><td>Branded search impressions in Search Console</td></tr>
          <tr><th scope="row">Lead quality</th><td>Ask “how did you hear about us?” — many prospects now say ChatGPT or Google’s AI answer</td></tr>
        </tbody>
      </table></div>
      <p>Expect AI answers to send fewer but often better-qualified visitors: people who click through from an AI answer have usually already compared options.</p>
    </section>
  </>;
}

export const guide: Post = {
  slug: 'ai-seo',
  title: 'AI SEO: How to Get Cited in AI Overviews, AI Mode and ChatGPT',
  metaTitle: 'AI SEO Guide: Get Cited in AI Overviews & ChatGPT',
  description: 'AI SEO guide: how AI Overviews, AI Mode, ChatGPT and Perplexity choose sources, plus crawler access, content structure and tracking AI visibility.',
  dek: 'How AI search chooses the sources it cites, and the technical, content and brand work that makes your site one of them.',
  eyebrow: 'Learn SEO · AI search',
  category: 'AI SEO',
  published: '2026-11-19',
  modified: '2026-11-19',
  readTime: '12 min read',
  image: { src: '/images/learn/ai-seo.png', alt: 'AI SEO guide cover: AI answer panel citing website sources', width: 1600, height: 900 },
  takeaways: [
    'Most AI answers rely on a conventional search index; pages that aren’t indexed and competitive rarely get cited.',
    'Google says AI Overviews and AI Mode need no special optimization beyond SEO best practices.',
    'Check crawler by crawler: blocking a search crawler removes you from answers; blocking a training crawler doesn’t.',
    'Lead sections with direct answers, use specific facts and add information only you have.',
    'Brand mentions, reviews and a consistent entity across the web drive AI citations.',
  ],
  toc: [
    { id: 'what-is-ai-seo', label: 'What AI SEO means' },
    { id: 'how-ai-chooses-sources', label: 'How AI chooses sources' },
    { id: 'technical-access', label: 'Technical access for AI crawlers' },
    { id: 'content-structure', label: 'Content that can be quoted' },
    { id: 'brand-authority', label: 'Brand authority and mentions' },
    { id: 'measure', label: 'Measuring AI visibility' },
    { id: 'faq', label: 'FAQs' },
  ],
  faqs,
  askSuggestions: [
    {
      question: 'How do I get cited in AI Overviews?',
      answer: `There's no separate AI ranking factor. Focus on:
- Being indexed and competitive in regular search
- Sections that open with a direct answer
- Specific, current facts and original information
- Brand mentions and trust across the web`,
      section: 'how-ai-chooses-sources',
    },
    {
      question: 'Which AI crawlers should I allow?',
      answer: `It depends on the crawler:
- **Googlebot, Bingbot, OAI-SearchBot, PerplexityBot**: search crawlers; blocking them removes you from those answers
- **GPTBot, Google-Extended**: training-related; blocking them doesn't affect search visibility`,
      section: 'technical-access',
    },
    {
      question: 'How can I track traffic from ChatGPT?',
      answer: 'Look for referrals from chatgpt.com (and perplexity.ai, copilot.microsoft.com, gemini.google.com) in analytics. Pair that with monthly checks of priority questions across AI tools and branded search growth in Search Console.',
      section: 'measure',
    },
  ],
  cta: { eyebrow: 'AI SEO services', heading: 'Is your brand showing up in AI answers?', text: 'Get a free AI visibility check: where you’re cited today across Google AI, ChatGPT and Perplexity, and what it takes to be cited more.', label: 'Get my AI visibility check', href: '/ai-seo-services' },
  next: [
    { kicker: 'Service', title: 'AI SEO Services', text: 'Get cited in AI Overviews, ChatGPT and Perplexity on top of proven SEO.', href: '/ai-seo-services', label: 'Explore the service' },
    { kicker: 'Free tool', title: 'Technical SEO Checker', text: 'See whether robots.txt lets Google, Bing and AI crawlers reach a page.', href: '/seo-tools/technical-seo-checker', label: 'Check a URL' },
    { kicker: 'Guide', title: 'Advanced SEO Strategies', text: 'Entity signals, original data and topical depth that AI answers favor.', href: '/learn-seo/advanced-seo-strategies', label: 'Read the guide' },
  ],
  Body,
};

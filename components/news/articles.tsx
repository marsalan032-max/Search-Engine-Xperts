import type { Post } from '../blog/types';
import { newsMeta, newsPublished, type NewsMeta } from './news-meta';

// Bodies of the SEO news stories on /seo-news/<slug>, keyed by slug. Each story becomes a Post and is shown with
// the same article template as the blog (components/article/article-page.tsx). Facts and links are in each story's
// Sources section; quotes are kept short and everything else is in our own words.

type Story = Pick<Post, 'takeaways' | 'toc' | 'faqs'> & { readTime: string; sources: { label: string; href: string }[]; body: React.ReactNode };

const A = ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>;

const stories: Record<string, Story> = {
  'google-preannounces-december-2026-core-update': {
    readTime: '4 min read',
    takeaways: [
      'Google announced the December 2026 core update on 24 November, before the rollout began, which it had not done for a core update before.',
      'Google says the update improves how Search understands and ranks content for longer, more complex queries, plus personalised results for people who have personalisation on.',
      'There is no start date yet. Google will post a release entry on its Search Status Dashboard when the rollout begins.',
      'Use the gap to finish reviewing the November core update, so you have a clean baseline when December’s update starts.',
    ],
    toc: [
      { id: 'what-google-announced', label: 'What Google announced' },
      { id: 'why-now', label: 'Why Google is giving notice now' },
      { id: 'what-to-do', label: 'What to do before it starts' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'Is the December 2026 core update live?', answer: 'Not yet. Google said it is scheduled for December 2026 and will confirm the start on its Search Status Dashboard when the rollout begins.' },
      { question: 'What will the December 2026 core update change?', answer: 'Google says it focuses on understanding and ranking relevant content, including for longer and more complex queries, and on better personalised results for users who have personalisation turned on.' },
      { question: 'Should I change my site before it starts?', answer: 'There is nothing specific to optimise for. Finish reviewing the November update, fix pages that clearly underperform, and record a baseline week so you can measure December’s impact.' },
    ],
    sources: [
      { label: 'Google Search Status Dashboard: ranking history', href: 'https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history' },
      { label: 'Search Engine Land: Google preannounced the December 2026 core update', href: 'https://searchengineland.com/google-preannounced-the-december-2026-core-update-but-it-is-not-live-or-active-yet-502947' },
      { label: 'Search Engine Roundtable: December 2026 core update preannounced', href: 'https://www.seroundtable.com/google-december-2026-core-update-42615.html' },
    ],
    body: <>
      <section id="what-google-announced">
        <h2>What Google announced</h2>
        <p>On 24 November 2026, less than an hour after it marked the November 2026 core update complete, Google added a new entry to its Search Status Dashboard: a December 2026 core update, scheduled for December but not yet live.</p>
        <p>Google said the update concerns how its systems understand and rank relevant content, including longer and more complex queries, and that it will improve personalised results for people who have personalisation turned on. Like other core updates, it applies to all locations and languages, and Google’s usual guidance on core updates applies.</p>
        <p>Google has published plenty of core updates, but this is the first time it has listed one on the dashboard weeks before release. There is no start date or expected rollout length yet.</p>
      </section>
      <section id="why-now">
        <h2>Why Google is giving notice now</h2>
        <p>The same day, Google published a new Search ranking hub that explains how it announces ranking and policy changes. Coverage of the announcement links the advance notice to the UK Competition and Markets Authority’s fair ranking conduct requirement for Google Search, which takes effect on 17 December 2026 and includes advance notice of certain ranking changes.</p>
        <p>In practice, that means site owners may see more updates announced ahead of time from now on, not only this one.</p>
      </section>
      <section id="what-to-do">
        <h2>What to do before it starts</h2>
        <ul className="post-list">
          <li>Finish your November review first. Compare a full week after 24 November with the week before 10 November, keeping the holiday weekend in mind.</li>
          <li>Record a clean baseline: export Search Console performance by page type in the week before the December rollout begins.</li>
          <li>Check pages that answer long, multi-part questions. Make sure they answer the whole question clearly, not just the head term.</li>
          <li>Don’t blame early-December ranking changes on this update until Google confirms it has started.</li>
        </ul>
        <p>Track every confirmed update on our <A href="/google-algorithm-updates">Google algorithm update</A> page, and see the full entry for the <A href="/google-algorithm-updates/december-2026-core-update">December 2026 core update</A>.</p>
      </section>
    </>,
  },

  'google-search-ranking-hub': {
    readTime: '5 min read',
    takeaways: [
      'Google added a Search ranking hub to Search Central on 24 November 2026, with three new pages on ranking principles, update notices and feedback.',
      'Its three principles: users come first, the same standard for every type of result (including AI Overviews), and rigorous testing.',
      'Verified site owners can send feedback on a significant update with Search Console’s Submit Feedback button, naming the update as a hashtag.',
      'From 17 December, UK-serving sites that were manually removed from the index in full get a dedicated appeal route.',
    ],
    toc: [
      { id: 'whats-new', label: 'What Google published' },
      { id: 'principles', label: 'The three ranking principles' },
      { id: 'feedback', label: 'How to send feedback on an update' },
      { id: 'uk-appeal', label: 'The UK indexing appeal' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'Does the ranking hub list Google’s ranking factors?', answer: 'No. It explains broad principles and links to existing documentation, but it does not publish a list of ranking signals or how they are weighted.' },
      { question: 'Will feedback through Search Console get my rankings fixed?', answer: 'No. Google says it reviews feedback in aggregate to find systemic issues and does not make manual adjustments for individual URLs.' },
      { question: 'Who can use the UK indexing appeal?', answer: 'Sites that provide content, goods or services to users in the UK and were manually excluded from Google’s index as a whole. The route opens on 17 December 2026.' },
    ],
    sources: [
      { label: 'Google Search Central: Our principles for ranking results', href: 'https://developers.google.com/search/docs/ranking/principles-for-ranking-results' },
      { label: 'Relevant Audience: Google Search ranking hub, principles and feedback', href: 'https://www.relevantaudience.com/seo/google-search-ranking-hub-principles-feedback/' },
      { label: 'PPC Land: Google publishes its search ranking principles', href: 'https://ppc.land/google-publishes-its-search-ranking-principles-23-days-before-a-uk-deadline/' },
    ],
    body: <>
      <section id="whats-new">
        <h2>What Google published</h2>
        <p>On 24 November 2026, Google added a ranking section to its Search Central documentation. A new hub page ties together three new pages: Google’s principles for ranking results, how it keeps site owners informed about ranking updates, and how to submit feedback about ranking changes. It also links to existing guides on how ranking works and how to debug traffic drops.</p>
      </section>
      <section id="principles">
        <h2>The three ranking principles</h2>
        <h3>Users come first</h3>
        <p>Search is meant to serve people looking for information, and Google says it prioritises helpful, reliable content made to benefit people. This restates the people-first guidance site owners already know.</p>
        <h3>The same standard for every type of result</h3>
        <p>Google says web listings, AI Overviews, carousels, images and videos are all judged by how useful they are for the query, with no result type given preferential treatment. It says manual ranking adjustments are limited to legal compliance and its content policies for Search.</p>
        <h3>Rigorous testing</h3>
        <p>Changes are measured for usefulness across the whole results page, using the public Search Quality Rater Guidelines and independent raters. Google says it does not launch a change it cannot show makes results better.</p>
      </section>
      <section id="feedback">
        <h2>How to send feedback on an update</h2>
        <p>When Google rolls out a significant ranking change or actionable policy update listed on the Search Status Dashboard, verified site owners can use the Submit Feedback button in Search Console. The submission has to name the update as a hashtag, for example <code>#NovemberCoreUpdate2026</code>.</p>
        <p>Google asks for specifics: Performance report data, exact queries with country and language, affected and competing URLs, and timing. Feedback is reviewed in aggregate to spot systemic problems, so treat it as a way to flag issues, not a way to recover rankings for one page.</p>
      </section>
      <section id="uk-appeal">
        <h2>The UK indexing appeal</h2>
        <p>From 17 December 2026, sites that serve users in the UK and were manually excluded from Google’s index as a whole get a dedicated appeal route. The link is inactive until then. The date matches when the UK Competition and Markets Authority’s fair ranking requirement for Google Search takes effect.</p>
        <p>The same day Google also pre-announced its <A href="/seo-news/google-preannounces-december-2026-core-update">December 2026 core update</A>, the first core update it has announced ahead of time.</p>
      </section>
    </>,
  },

  'november-2026-core-update-complete': {
    readTime: '4 min read',
    takeaways: [
      'Google’s November 2026 core update started on 10 November and was marked complete on 24 November, after 13 days and 20 hours.',
      'It was the third core update of 2026, after March and May, and Google called it a regular update.',
      'Google suggests comparing a full week after the rollout with the week before it, which puts the comparison over Thanksgiving, Black Friday and Cyber Monday.',
      'Online stores should compare against the same holiday period last year as well as the week before the update.',
    ],
    toc: [
      { id: 'what-happened', label: 'What happened' },
      { id: 'when-to-check', label: 'When to check your data' },
      { id: 'holiday-data', label: 'Reading holiday data' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'When did the November 2026 core update finish?', answer: 'Google marked the rollout complete on 24 November 2026, 13 days and 20 hours after it began on 10 November.' },
      { question: 'When should I compare my Search Console data?', answer: 'Once a full week has passed after 24 November, compare it with the week before 10 November. For stores, also compare with the same holiday week last year.' },
      { question: 'Is another core update coming?', answer: 'Yes. Google has pre-announced a December 2026 core update, scheduled for December with no start date yet.' },
    ],
    sources: [
      { label: 'Google Search Status Dashboard: November 2026 core update', href: 'https://status.search.google.com/incidents/WLxcJyC6jMWMfryxsKMc' },
      { label: 'Search Engine Land: November 2026 core update rollout is now complete', href: 'https://searchengineland.com/google-november-2026-core-update-rollout-is-now-complete-502268' },
      { label: 'Search Engine Journal: Google confirms November 2026 core update is complete', href: 'https://www.searchenginejournal.com/google-november-2026-core-update-complete/598751/' },
    ],
    body: <>
      <section id="what-happened">
        <h2>What happened</h2>
        <p>Google released the November 2026 core update at 10:07 PST on 10 November and marked it complete at 06:03 PST on 24 November. It applied globally and in all languages, and Google described it as a regular update meant to surface relevant, satisfying content from all kinds of sites, with no new guidance.</p>
        <p>It was Google’s third core update of 2026, following the March and May updates, and the eighth ranking update Google confirmed this year. Two days into the rollout, Google also made <A href="/seo-news/gemini-4-hydrogen-ai-mode">Gemini 4 Hydrogen</A> the default model in AI Mode, so AI search visibility may have moved for a different reason in the same fortnight.</p>
      </section>
      <section id="when-to-check">
        <h2>When to check your data</h2>
        <p>Google recommends waiting until a rollout ends, then comparing a full week afterwards with the week before it started. For this update, that means comparing the week after 24 November with 3 to 9 November, broken down by page and query rather than looking at sitewide totals alone.</p>
      </section>
      <section id="holiday-data">
        <h2>Reading holiday data</h2>
        <p>The first full week after the rollout includes US Thanksgiving, Black Friday on 27 November and Cyber Monday on 30 November. Demand swings that week, so a rise or fall in clicks may have nothing to do with rankings.</p>
        <ul className="post-list">
          <li>Watch average position and impressions for your key queries, not just clicks.</li>
          <li>Compare against the same holiday week last year as well as the week before the update.</li>
          <li>Segment by page type, such as categories, products and guides, to see what actually moved.</li>
        </ul>
        <p>See the full timeline on our <A href="/google-algorithm-updates/november-2026-core-update">November 2026 core update</A> page.</p>
      </section>
    </>,
  },

  'gemini-4-hydrogen-ai-mode': {
    readTime: '3 min read',
    takeaways: [
      'Google rolled out Gemini 4 Hydrogen in Search globally on 12 November 2026 and called it the biggest model upgrade to Search yet.',
      'Hydrogen is now the default model in AI Mode, and Google says it handles the hardest questions in AI Overviews.',
      'It arrived two days into the November core update, so AI visibility changes that fortnight may have two causes.',
      'Google has not said the model change affects regular web rankings.',
    ],
    toc: [
      { id: 'what-changed', label: 'What changed' },
      { id: 'why-it-matters', label: 'Why it matters for SEO' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'What is Gemini 4 Hydrogen?', answer: 'A Gemini model Google released on 12 November 2026. It is now the default model in AI Mode and is used for the hardest questions in AI Overviews.' },
      { question: 'Does Gemini 4 Hydrogen change organic rankings?', answer: 'Google has not said so. Commentators expect it mainly to affect AI Overviews and AI Mode, while the November core update affected regular rankings at the same time.' },
    ],
    sources: [
      { label: 'Search Engine Land: Google Search gets major upgrade with Gemini 4 Hydrogen', href: 'https://searchengineland.com/google-search-gets-major-upgrade-with-gemini-4-hydrogen-501867' },
      { label: 'SE Ranking: AI Overviews updates history', href: 'https://seranking.com/blog/ai-overviews/' },
    ],
    body: <>
      <section id="what-changed">
        <h2>What changed</h2>
        <p>On 12 November 2026 Google released Gemini 4 Hydrogen and put it straight into Search for all users globally, describing it as the “biggest model upgrade to Search yet.” Hydrogen became the default model in AI Mode, and Google says AI Overviews now use it for the hardest questions.</p>
        <p>Google highlighted better understanding of nuanced, multi-part questions and richer language understanding across every language AI Mode supports. Two days earlier, Google had made Gemini 4 Carbon available in AI Mode for Google AI Ultra subscribers.</p>
      </section>
      <section id="why-it-matters">
        <h2>Why it matters for SEO</h2>
        <p>The model that writes an AI answer also influences which pages it cites. A new default model can change which sources appear in AI Overviews and AI Mode, even when your organic rankings stay the same.</p>
        <p>Hydrogen landed two days into the <A href="/seo-news/november-2026-core-update-complete">November 2026 core update</A>. If your AI impressions moved between 10 and 24 November, check the Generative AI performance report alongside your regular Performance report, and keep in mind the <A href="/seo-news/search-console-generative-ai-report-bug">reporting bug from 9 to 11 November</A>.</p>
        <p>For tactics on earning citations in AI answers, see our <A href="/learn-seo/ai-seo">AI SEO guide</A>.</p>
      </section>
    </>,
  },

  'search-console-api-branded-queries': {
    readTime: '4 min read',
    takeaways: [
      'On 16 November 2026, Google added three features to the Search Console Search Analytics API.',
      'You can now split branded and non-branded queries, get Google Lens and Circle to Search data, and filter several countries or devices in one request.',
      'Branded data in the API starts on 21 February 2026 and is only available for top-level properties with enough query and impression volume.',
      'All three features were already in the Search Console interface; the change brings them to reporting tools and dashboards.',
    ],
    toc: [
      { id: 'whats-new', label: 'What’s new in the API' },
      { id: 'limits', label: 'Limits to know' },
      { id: 'why-it-matters', label: 'Why it matters' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'How far back does branded query data go in the API?', answer: 'Branded query data in the Search Analytics API starts on 21 February 2026.' },
      { question: 'Can I edit how Google classifies branded queries?', answer: 'No. Google applies the branded or non-branded classification itself, and the API reference describes no way to review or change it.' },
    ],
    sources: [
      { label: 'PPC Land: Search Console API now splits brand traffic', href: 'https://ppc.land/googles-search-console-api-now-splits-brand-traffic-back-to-february-21/' },
    ],
    body: <>
      <section id="whats-new">
        <h2>What’s new in the API</h2>
        <p>Google announced the changes in a Search Central Blog post on 16 November 2026 and updated the Search Analytics API reference the same day. All three work through the <code>searchanalytics.query</code> method.</p>
        <h3>Branded and non-branded queries</h3>
        <p>A new <code>brandedClassification</code> dimension returns BRANDED or NON_BRANDED, so you can compare brand demand with the searches you win on content and products.</p>
        <h3>Google Lens and Circle to Search</h3>
        <p>Setting the type parameter to <code>webMultimodal</code> returns performance from Google Lens, Circle to Search on Android and image uploads in Google Search. Google says this data will also reach BigQuery bulk exports, without a date.</p>
        <h3>Several countries or devices in one request</h3>
        <p>A new <code>filterLists</code> field matches several countries or devices at once, instead of one request per value.</p>
      </section>
      <section id="limits">
        <h2>Limits to know</h2>
        <ul className="post-list">
          <li>Branded data starts on 21 February 2026 and only covers top-level properties with sufficient query and impression volume. Ineligible properties get no rows back.</li>
          <li>The branded filter only supports “equals” and cannot be combined with a query filter in the same request.</li>
          <li>The same dimension cannot appear in both <code>filters</code> and <code>filterLists</code>.</li>
        </ul>
      </section>
      <section id="why-it-matters">
        <h2>Why it matters</h2>
        <p>Brand searches often hide what is really happening to organic performance. A drop in non-branded clicks after a core update can be masked by steady brand demand, and the reverse. Splitting the two in automated reports makes update analysis far clearer, especially for stores and agencies reporting across many sites.</p>
      </section>
    </>,
  },

  'search-console-generative-ai-report-bug': {
    readTime: '3 min read',
    takeaways: [
      'Google confirmed a logging error lowered impressions in Search Console’s Generative AI performance report for 9 to 11 November 2026.',
      'Google says it affected data logging only, not how sites appeared in AI Overviews or AI Mode.',
      'The window overlaps the start of the November 2026 core update on 10 November, so don’t read a dip on those days as an update effect.',
      'It is the second logging issue in the Search version of the AI report, after one that started on 13 August 2026.',
    ],
    toc: [
      { id: 'what-happened', label: 'What happened' },
      { id: 'what-to-do', label: 'What to do with your data' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'Did the bug change my site’s visibility in AI Overviews?', answer: 'No. Google says the issue affected data logging only, so it changed what the report shows, not how your pages appeared.' },
      { question: 'Which dates are affected?', answer: '9 to 11 November 2026, in the Generative AI performance report for Search.' },
    ],
    sources: [
      { label: 'Google Search Console Help: Data anomalies in Search Console', href: 'https://support.google.com/webmasters/answer/6211453' },
      { label: 'Search Engine Roundtable: Generative AI performance report data bug, Nov 9–11', href: 'https://www.seroundtable.com/google-generative-ai-performance-report-data-bug-42527.html' },
    ],
    body: <>
      <section id="what-happened">
        <h2>What happened</h2>
        <p>Google added an entry to its Search Console data anomalies page: a logging error decreased impressions in the Generative AI performance report in Search for 9 to 11 November 2026. Google says the issue affects data logging only, and the report shows an annotation on the affected dates.</p>
        <p>The Generative AI performance report, launched in June 2026 and available to all sites since the end of August, shows impressions from AI Overviews and AI Mode. It does not report clicks.</p>
      </section>
      <section id="what-to-do">
        <h2>What to do with your data</h2>
        <ul className="post-list">
          <li>Exclude 9 to 11 November from any before-and-after comparison of AI impressions.</li>
          <li>Don’t attribute a dip on those days to the <A href="/seo-news/november-2026-core-update-complete">November 2026 core update</A>, which began on 10 November.</li>
          <li>Add a note to client reports so a temporary dip isn’t read as lost AI visibility.</li>
        </ul>
      </section>
    </>,
  },

  'chatgpt-search-volume-20-percent-of-google': {
    readTime: '4 min read',
    takeaways: [
      'OpenAI’s Adam Fry said ChatGPT’s search-like queries are now roughly one-fifth of Google’s query volume.',
      'OpenAI counts a search each time a question sends ChatGPT to the web, a different definition from Google’s.',
      'OpenAI did not say where its Google figure came from, so treat the ratio as a company claim, not market share.',
      'The figure measures queries, not the traffic ChatGPT sends to websites, which outside data puts far behind Google.',
    ],
    toc: [
      { id: 'what-openai-said', label: 'What OpenAI said' },
      { id: 'what-it-measures', label: 'What the figure measures' },
      { id: 'what-to-do', label: 'What it means for your SEO' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'Does ChatGPT have 20% of the search market?', answer: 'No. OpenAI compared the volume of search-like queries in ChatGPT with Google’s query volume. That is not a market share figure, and OpenAI did not give a source for Google’s number.' },
      { question: 'Should I stop focusing on Google?', answer: 'No. Google still sends far more traffic to websites. Treat ChatGPT as an additional channel and make sure your key pages can be found and cited there too.' },
    ],
    sources: [
      { label: 'Search Engine Roundtable: OpenAI says ChatGPT is at 20% of Google search volume', href: 'https://www.seroundtable.com/chatgpt-20-percent-google-search-volume-42451.html' },
      { label: 'Search Engine Journal: Google’s search volume is about 5x ChatGPT’s, OpenAI says', href: 'https://www.searchenginejournal.com/googles-search-volume-is-about-5x-chatgpts-openai-says/' },
      { label: 'Ahrefs: ChatGPT has 12% of Google’s search volume', href: 'https://ahrefs.com/blog/chatgpt-has-12-percent-of-googles-search-volume/' },
    ],
    body: <>
      <section id="what-openai-said">
        <h2>What OpenAI said</h2>
        <p>At a press event in early November 2026, Adam Fry, OpenAI’s consumer product lead for ChatGPT, said ChatGPT’s volume of search-like queries is now roughly one-fifth of Google’s. He also said ChatGPT grew from one billion to 1.2 billion weekly users in about two months.</p>
      </section>
      <section id="what-it-measures">
        <h2>What the figure measures</h2>
        <p>OpenAI counts a search each time a question sends ChatGPT to the web. That is a narrower, different definition from a query typed into Google, and OpenAI did not say where its Google volume figure came from. Earlier in 2026, Ahrefs estimated ChatGPT at around 12% of Google’s search volume using its own definition, and found Google sends far more traffic to websites.</p>
        <p>So the number shows that AI search is now a real channel, not that ChatGPT has taken a fifth of Google’s market or a fifth of its traffic.</p>
      </section>
      <section id="what-to-do">
        <h2>What it means for your SEO</h2>
        <ul className="post-list">
          <li>Check that OpenAI’s search crawler can reach your important pages in robots.txt.</li>
          <li>Make key pages easy to quote: clear answers near the top, accurate facts, visible authors and dates.</li>
          <li>Track referral traffic from ChatGPT in analytics alongside Google organic, rather than assuming either way.</li>
        </ul>
        <p>Our <A href="/learn-seo/ai-seo">AI SEO guide</A> covers how to get cited in ChatGPT and Google’s AI features.</p>
      </section>
    </>,
  },

  'chatgpt-shopping-documentation-change': {
    readTime: '3 min read',
    takeaways: [
      'OpenAI changed its “Shopping with ChatGPT Search” documentation in the week before 24 November 2026.',
      'The old text said product results were selected independently and not influenced by OpenAI partnerships; that last part was removed.',
      'The documentation still says product results are not ads, and now points to its own description of how products and merchants are chosen.',
      'Stores should keep product data accurate and crawlable, and watch for any partner programmes that affect visibility.',
    ],
    toc: [
      { id: 'what-changed', label: 'What changed' },
      { id: 'what-it-means', label: 'What it means for stores' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'Are ChatGPT product results ads now?', answer: 'The documentation still says product results are not ads. What was removed is the statement that they are not influenced by any OpenAI partnerships.' },
      { question: 'Has OpenAI explained the change?', answer: 'The coverage we reviewed included no statement from OpenAI about the change.' },
    ],
    sources: [
      { label: 'AdExchanger: OpenAI’s new shopping strategy', href: 'https://www.adexchanger.com/daily-news-roundup/tuesday-24112026/' },
    ],
    body: <>
      <section id="what-changed">
        <h2>What changed</h2>
        <p>In the week before 24 November 2026, OpenAI edited its “Shopping with ChatGPT Search” documentation, a change first reported by AI Visibility Journal and picked up by AdExchanger.</p>
        <p>The documentation used to say product results were selected independently by ChatGPT, were not ads, and were not influenced by any OpenAI partnerships. It now says product results are not ads and refers readers to its description of how products and merchants are selected. A line promising links to sites where people can learn more or buy was also shortened to showing available ways to purchase.</p>
        <p>The coverage we reviewed included no statement from OpenAI explaining the change.</p>
      </section>
      <section id="what-it-means">
        <h2>What it means for stores</h2>
        <p>Nothing about this edit tells merchants to change their product pages, but it leaves room for partnerships to play a part in which products ChatGPT shows. If that happens, organic product visibility in ChatGPT could become less predictable.</p>
        <ul className="post-list">
          <li>Keep product titles, prices, availability and structured data accurate on your own site.</li>
          <li>Make sure AI crawlers can reach product and category pages you want recommended.</li>
          <li>Watch OpenAI’s merchant documentation for programmes that affect how products are chosen.</li>
        </ul>
        <p>Our free <A href="/ecommerce-seo-course">Advanced Ecommerce SEO Course</A> will cover AI shopping visibility in depth.</p>
      </section>
    </>,
  },

  'google-business-profile-booking-links': {
    readTime: '3 min read',
    takeaways: [
      'Business owners can now choose which appointment booking and dining reservation partner links appear on their Google Business Profile.',
      'Search Engine Roundtable reported the change from a LinkedIn post by Google’s Lisa Landsman on 23 November 2026.',
      'The Business Profile appeals process has also been reduced to a single form.',
      'Check your profile’s booking links so customers land on the booking flow you prefer.',
    ],
    toc: [
      { id: 'what-changed', label: 'What changed' },
      { id: 'what-to-do', label: 'What to do' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs: [
      { question: 'Where do I manage booking links on my Business Profile?', answer: 'Open your Business Profile from Google Search and select Booking, or from Google Maps choose Edit profile and the booking option. You can add links and set a preferred one.' },
      { question: 'Why do links I didn’t add appear on my profile?', answer: 'Third-party providers with an authorised partnership with your business can add and update booking links automatically. The new control lets you choose which of these appear.' },
    ],
    sources: [
      { label: 'L3AD Solutions brief, 24 November 2026 (citing Search Engine Roundtable)', href: 'https://l3adsolutions.com/briefs/2026-11-24' },
      { label: 'SEO Forum: Google wraps November core update and ships Business Profile changes', href: 'https://seoforum.com/news/google-finishes-its-november-2026-core-update-and-ships-several-search-profiles-and-ads' },
      { label: 'Google Business Profile Help: Manage your local business links', href: 'https://support.google.com/business/answer/6218037' },
    ],
    body: <>
      <section id="what-changed">
        <h2>What changed</h2>
        <p>Google Business Profile owners can now choose which appointment booking and dining reservation partner links appear on their profile. Search Engine Roundtable reported the change from a LinkedIn post by Google’s Lisa Landsman on 23 November 2026.</p>
        <p>Until now, booking partners with an authorised relationship with a business could add links that appeared automatically. The new control lets the business decide which partner links customers see. Separately, the Business Profile appeals flow has been reduced from a multi-step process to a single form.</p>
      </section>
      <section id="what-to-do">
        <h2>What to do</h2>
        <ul className="post-list">
          <li>Open your profile’s booking section and remove partner links you no longer use.</li>
          <li>Set your preferred booking link, ideally one that goes straight to the right service rather than a generic page.</li>
          <li>Test the booking journey on a phone, the way most local customers will use it.</li>
        </ul>
        <p>Our free <A href="/local-seo-course">Local SEO Course</A> walks through optimising every part of your Business Profile.</p>
      </section>
    </>,
  },
};

const cta = {
  eyebrow: 'Stay ahead of changes',
  heading: 'Want help reacting to search changes?',
  text: 'We’ll review how this change affects your site and show you the first fixes that protect your traffic. Free, no commitment.',
  label: 'Get my free audit',
  href: '/#contact',
};

export const newsOrder = [...newsMeta].sort((a, b) => b.date.localeCompare(a.date));

export function newsPost(m: NewsMeta): Post {
  const s = stories[m.slug];
  const i = newsOrder.indexOf(m);
  const others = [newsOrder[i + 1], newsOrder[i - 1]].filter(Boolean).slice(0, 2);
  return {
    slug: m.slug,
    title: m.title,
    metaTitle: m.title,
    description: m.description,
    dek: m.dek,
    eyebrow: m.topic,
    category: m.topic,
    published: newsPublished,
    modified: newsPublished,
    readTime: s.readTime,
    image: { src: `/images/news/${m.slug}.png`, alt: `${m.title} (SEO News, ${m.topic})`, width: 1600, height: 900 },
    takeaways: s.takeaways,
    toc: [...s.toc.filter(t => t.id !== 'faq'), { id: 'sources', label: 'Sources' }, { id: 'faq', label: 'Frequently asked questions' }],
    faqs: s.faqs,
    cta,
    next: [
      ...others.map(o => ({ kicker: o.topic, title: o.title, text: o.dek, href: `/seo-news/${o.slug}`, label: 'Read the story' })),
      { kicker: 'SEO News', title: 'All the latest SEO news', text: 'Google updates, AI search, Search Console and local SEO news in one place.', href: '/seo-news', label: 'See all news' },
    ],
    Body: () => <>
      {s.body}
      <section id="sources">
        <h2>Sources</h2>
        <ul className="post-list news-sources">{s.sources.map(src => <li key={src.href}><a href={src.href} rel="noopener">{src.label}</a></li>)}</ul>
      </section>
    </>,
  };
}

export const getNews = (slug: string) => newsMeta.find(m => m.slug === slug);

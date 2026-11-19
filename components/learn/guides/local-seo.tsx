import type { Post } from '../../blog/types';

// Learn SEO guide: Local SEO. Headings with an `id` must match the entries in `toc`.
// Targets "what is local SEO" / "local SEO guide". The commercial query lives on /local-seo-services.

const faqs = [
  {
    question: 'What is local SEO in simple terms?',
    answer: 'Local SEO is the work that helps a business appear when people nearby search for what it offers — in the Google map pack, in Google Maps and in the regular results below them. It combines a well-managed Google Business Profile, a website with clear location and service pages, consistent business listings and a steady flow of genuine reviews.',
  },
  {
    question: 'How long does local SEO take to work?',
    answer: 'Fixes to your Google Business Profile, such as the primary category or missing services, can change map visibility within weeks. Building the reviews, local links and location content that lift you above established competitors usually takes three to six months, longer in crowded markets like legal, dental or home services in large cities.',
  },
  {
    question: 'Do I need a physical address for local SEO?',
    answer: 'You need a real location where you meet customers or a real service area you travel to. Service-area businesses such as plumbers or cleaners can hide their street address in Google Business Profile and list the areas they serve instead. Virtual offices and co-working addresses you do not staff are against Google’s guidelines and are a common cause of suspended profiles.',
  },
  {
    question: 'Can I rank in the map pack for a city I am not located in?',
    answer: 'It is difficult. Distance from the searcher is one of the three factors Google uses for local results, so a business 30 miles away rarely shows in the map pack for “near me” searches in another city. You can still rank in the regular organic results for that city with a genuinely useful location page, local proof such as projects and reviews, and links from local sources.',
  },
  {
    question: 'Should I respond to every Google review?',
    answer: 'Yes, where practical. Replies show prospective customers that you are active and that you handle problems professionally. Keep replies to negative reviews short, factual and calm, and take the detail offline. Never offer discounts or gifts in exchange for reviews, and do not filter who you ask so only happy customers are invited — both break Google’s review policies.',
  },
  {
    question: 'Are citations and directories still important?',
    answer: 'Less than they were, but consistency still matters. A handful of accurate listings on the platforms your customers and Google rely on — Apple Business Connect, Bing Places, Yelp, Facebook and the main directories for your industry and country — is worth more than hundreds of low-quality directory submissions. Fix wrong names, addresses and phone numbers first.',
  },
];

const factors = [
  { name: 'Relevance', text: 'How well your profile and website match what was searched. Your primary category, services, products, description and on-page content all feed this.' },
  { name: 'Distance', text: 'How far your location is from the searcher or from the place named in the query. You cannot change this, which is why map visibility varies across a city.' },
  { name: 'Prominence', text: 'How well known and trusted the business is: review count and rating, links and mentions across the web, and how strong your website is in organic search.' },
];

const gbpSteps = [
  'Choose the most specific primary category that describes your main service, then add secondary categories only for services you actually offer',
  'Complete every field: hours, holiday hours, phone, website link, service areas, attributes, services and products with descriptions',
  'Upload real photos of your team, premises, vehicles and finished work every month; stock images add nothing',
  'Publish updates for offers, events and recent projects to keep the profile active and give searchers a reason to call',
  'Answer common customer questions in your description, services and website so people find the information quickly',
  'Use UTM tags on the website and booking links so Google Business Profile traffic shows separately in analytics',
];

const citations = [
  'Google Business Profile and Apple Business Connect (the two map ecosystems most phones use)',
  'Bing Places, which also feeds several AI assistants and voice tools',
  'Facebook, Yelp and the main directory in your country',
  'Industry platforms: for example Houzz or Checkatrade for trades, Avvo for lawyers, Healthgrades or Doctoralia for clinics',
  'Your local chamber of commerce, trade associations and sponsorship pages, which double as genuine local links',
];

function Body() {
  return <>
    <p className="post-intro">When someone searches “emergency plumber”, “dentist near me” or “best pizza in Lahore”, Google shows a map with three businesses before any regular website appears. Those three spots receive a large share of the calls, direction requests and website visits for that search. Local SEO is the work that earns them.</p>
    <p>This guide explains how Google chooses local results, then walks through the parts you control: your Google Business Profile, your website’s location and service pages, reviews, listings and local links. It ends with how to measure progress so you can tell whether the work is producing calls and customers, not just rankings.</p>

    <section id="what-is-local-seo">
      <h2>What is local SEO?</h2>
      <p>Local SEO is the practice of improving how visible a business is in searches with local intent. Those searches show up in three places:</p>
      <ul className="post-list">
        <li><strong>The local pack</strong> (map pack): the map and three business listings near the top of the results</li>
        <li><strong>Google Maps</strong>: searches made directly in the Maps app, often on mobile and often moments before a visit</li>
        <li><strong>Local organic results</strong>: the regular blue links below the map, where your location and service pages compete</li>
      </ul>
      <p>The first two depend mostly on your Google Business Profile. The third depends on your website. Strong local businesses work on both, because each supports the other: a strong website adds prominence to the profile, and a busy, well-reviewed profile sends people to the website.</p>
      <p>Local SEO matters for any business that serves customers in a defined area: shops, restaurants, clinics, law firms, trades, agencies and multi-location brands. If people search for you with a city name, a neighbourhood or “near me”, it applies to you.</p>
    </section>

    <section id="ranking-factors">
      <h2>How Google ranks local results</h2>
      <p>Google says local results are based mainly on three things. Every local SEO task you do improves one of them.</p>
      <div className="post-table"><table>
        <caption>The three local ranking factors Google names</caption>
        <thead><tr><th scope="col">Factor</th><th scope="col">What it means</th></tr></thead>
        <tbody>{factors.map(f => <tr key={f.name}><th scope="row">{f.name}</th><td>{f.text}</td></tr>)}</tbody>
      </table></div>
      <p>Two practical consequences follow. First, rankings in the map pack are not one number: you might rank first for searchers two streets away and not appear for searchers across town. Track visibility across a grid of points, not from a single location. Second, the factors you can change are relevance and prominence, so that is where effort goes.</p>
      <aside className="post-callout">
        <p className="t">Keyword-stuffed business names work until they don’t</p>
        <p>Adding “Best Plumber Lahore” to your business name can lift rankings briefly, but it breaks Google’s guidelines, and competitors can report it. Suspended profiles can take weeks to restore. Use your real-world business name.</p>
      </aside>
    </section>

    <section id="google-business-profile">
      <h2>Optimize your Google Business Profile</h2>
      <p>Your Google Business Profile is the single biggest lever in local search. Most profiles are claimed and then left alone, which is why a methodical clean-up often produces the fastest gains.</p>
      <ol className="post-steps">{gbpSteps.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
      <h3>Get the primary category right</h3>
      <p>The primary category has more influence on which searches you appear for than any other field. Look at which category the top three businesses for your main search use; you can see it under their name in Google Maps. If you are a “Personal injury attorney” listed as “Law firm”, you are telling Google you are less relevant than you are.</p>
      <h3>Services and products are content</h3>
      <p>The services and products sections let you describe what you do in your customers’ words. Add each service with a short, plain description. This is also where many businesses discover gaps: if you do not list “boiler repair”, do not expect to be shown for it.</p>
      <p>If you would rather have this handled for you, our <a href="/gmb-optimization-services">Google Business Profile optimization service</a> covers the full set-up and monthly management.</p>
    </section>

    <section id="website">
      <h2>Build location and service pages that rank</h2>
      <p>Your website supports the profile and competes in the organic results underneath the map. Three page types do most of the work:</p>
      <h3>Service pages</h3>
      <p>One page per core service, each focused on a single job your customers search for. A plumber needs separate pages for leak detection, boiler repair and drain unblocking, not one “Plumbing services” page listing all of them. Each page should explain the service, price ranges or what affects price, the process, the areas you cover, and proof such as photos, reviews and case studies.</p>
      <h3>Location pages</h3>
      <p>If you serve several towns or have several branches, a page for each can rank for “service + place” searches. The test for a good location page is whether it would still be useful if you removed the town name. Include real local detail: jobs completed in the area, local team members, directions, parking, area-specific pricing or regulations. Pages that only swap the city name are thin content and rarely rank for long.</p>
      <h3>Consistent business details and schema</h3>
      <p>Show your business name, address and phone number in the same format as your Google Business Profile, usually in the footer and on the contact page. Add <code>LocalBusiness</code> structured data (or a more specific type such as <code>Dentist</code> or <code>Plumber</code>) with your address, phone, opening hours and geo-coordinates. Schema does not guarantee rankings, but it removes any doubt about who and where you are.</p>
    </section>

    <section id="reviews">
      <h2>Earn more (and better) reviews</h2>
      <p>Reviews influence both prominence and conversions. People compare star ratings and read recent reviews before they call, so a steady flow matters more than a one-off push.</p>
      <ul className="post-list">
        <li><strong>Ask every customer, at the right moment.</strong> Right after a job is finished or a problem is solved, send a short message with your direct review link.</li>
        <li><strong>Make it effortless.</strong> A QR code at the counter, a link in the invoice email and a follow-up text two days later all raise response rates.</li>
        <li><strong>Encourage detail.</strong> Asking customers to mention the service they used produces reviews that describe your work in natural language, which helps relevance.</li>
        <li><strong>Reply to all of them.</strong> Thank positive reviewers by name and respond to criticism calmly, with a way to resolve it.</li>
      </ul>
      <p>Two things to avoid: offering incentives for reviews, and “review gating” (screening customers and only inviting the happy ones to Google). Both break Google’s policies and can lead to reviews being removed.</p>
    </section>

    <section id="citations-links">
      <h2>Citations and local links</h2>
      <p>A citation is any mention of your business name, address and phone number online. Their main job today is consistency: conflicting phone numbers or old addresses confuse customers and search engines. Start with the platforms that matter most:</p>
      <ul className="post-list">{citations.map(c => <li key={c}>{c}</li>)}</ul>
      <p>Local links carry more weight than directory listings. The best ones come from real involvement in your community: sponsoring a youth team or local event, joining business associations, partnering with complementary businesses, being quoted in local news, or publishing useful local data such as average repair costs in your city. These links are hard for competitors to copy, which is why they last.</p>
    </section>

    <section id="measure">
      <h2>How to measure local SEO results</h2>
      <p>Rankings are a means, not the goal. Track the numbers that connect to revenue:</p>
      <div className="post-table"><table>
        <caption>Local SEO metrics worth tracking</caption>
        <thead><tr><th scope="col">Metric</th><th scope="col">Where to find it</th><th scope="col">Why it matters</th></tr></thead>
        <tbody>
          <tr><th scope="row">Calls, direction requests, website clicks</th><td>Google Business Profile performance</td><td>Direct actions from the map pack and Maps</td></tr>
          <tr><th scope="row">Map visibility across a grid</th><td>A local rank-tracking grid tool</td><td>Shows how far your visibility extends from your location</td></tr>
          <tr><th scope="row">Organic clicks for “service + city” queries</th><td>Google Search Console</td><td>Measures how your location and service pages perform</td></tr>
          <tr><th scope="row">Review count, rating and velocity</th><td>Your profile, tracked monthly</td><td>Prominence and conversion trust</td></tr>
          <tr><th scope="row">Leads and booked jobs from organic</th><td>Analytics with UTM tags, call tracking, CRM</td><td>The number that pays for the work</td></tr>
        </tbody>
      </table></div>
      <p>Review these monthly. If calls rise while rankings hold, the work is succeeding. If rankings rise but calls do not, look at your photos, reviews, hours and the first screen of your landing pages before chasing more positions. To check your pages for technical and on-page issues, run them through our free <a href="/seo-tools/seo-audit-tool">SEO audit tool</a>.</p>
    </section>
  </>;
}

export const guide: Post = {
  slug: 'local-seo',
  title: 'What Is Local SEO? A Complete Guide for Small Businesses',
  metaTitle: 'What Is Local SEO? Complete Guide for Small Businesses',
  description: 'Learn how local SEO works: how Google ranks the map pack, and how to optimize your Google Business Profile, location pages, reviews and citations.',
  dek: 'How Google chooses the businesses in the map pack, and the step-by-step work that gets you calls from local searches.',
  eyebrow: 'Learn SEO · Local',
  category: 'Local SEO',
  published: '2026-11-19',
  modified: '2026-11-19',
  readTime: '12 min read',
  image: { src: '/images/learn/local-seo.png', alt: 'Local SEO guide cover: map pin above three ranked business listings', width: 1600, height: 900 },
  takeaways: [
    'Google ranks local results on relevance, distance and prominence; you can influence relevance and prominence.',
    'The primary category, services and photos in your Google Business Profile are the fastest wins.',
    'Separate service pages and genuinely local location pages win the organic results under the map.',
    'A steady flow of detailed, unincentivized reviews beats a one-off review campaign.',
    'Measure calls, direction requests and booked jobs, not just map rankings.',
  ],
  toc: [
    { id: 'what-is-local-seo', label: 'What is local SEO?' },
    { id: 'ranking-factors', label: 'How Google ranks local results' },
    { id: 'google-business-profile', label: 'Optimize your Google Business Profile' },
    { id: 'website', label: 'Location and service pages' },
    { id: 'reviews', label: 'Earn more reviews' },
    { id: 'citations-links', label: 'Citations and local links' },
    { id: 'measure', label: 'Measure local SEO results' },
    { id: 'faq', label: 'FAQs' },
  ],
  faqs,
  askSuggestions: [
    {
      question: 'What should I fix first in my Google Business Profile?',
      answer: `Start with the fields that most affect which searches you appear for:
- **Primary category**: match the most specific category for your main service
- **Services and products**: list each service you offer with a short description
- **Photos**: add real photos of your team, premises and work, then keep adding monthly
Then complete hours, service areas and attributes.`,
      section: 'google-business-profile',
    },
    {
      question: 'How does Google decide who shows in the map pack?',
      answer: `Google names three factors:
- **Relevance**: how well your profile and site match the search
- **Distance**: how close you are to the searcher
- **Prominence**: reviews, links, mentions and organic strength
You can't change distance, so local SEO work focuses on relevance and prominence.`,
      section: 'ranking-factors',
    },
    {
      question: 'Do location pages still work?',
      answer: 'Yes, if each page is genuinely useful for that area: real jobs completed there, local team members, directions, area-specific pricing or rules. Pages that only swap the city name are thin content and rarely rank for long.',
      section: 'website',
    },
  ],
  cta: { eyebrow: 'Local SEO services', heading: 'Want more calls from Google Maps?', text: 'Get a free local visibility audit covering your profile, map rankings across your area and the gaps against your top competitors.', label: 'Get my local audit', href: '/local-seo-services' },
  next: [
    { kicker: 'Service', title: 'Local SEO Services', text: 'Map pack rankings, location pages, citations and reviews, managed for you.', href: '/local-seo-services', label: 'Explore the service' },
    { kicker: 'Service', title: 'Google Business Profile Optimization', text: 'Full profile set-up, posts, photos and review management.', href: '/gmb-optimization-services', label: 'See what’s included' },
    { kicker: 'Free tool', title: 'SEO Audit Tool', text: 'Check any page on your site for technical and on-page issues in seconds.', href: '/seo-tools/seo-audit-tool', label: 'Run a free audit' },
  ],
  Body,
};

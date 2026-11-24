// Content of the free Local SEO Course (/local-seo-course). One entry per module, in order.
// Each module: a one-line summary (course card), an intro, three short lessons and a checklist.
// The course page lists the modules as cards; each module has its own page at /local-seo-course/<slug>.

export type Lesson = { title: string; text: string; points?: string[] };
export type Module = {
  id: string;
  slug: string;          // page address: /local-seo-course/<slug>
  title: string;
  summary: string;
  intro: string;
  lessons: Lesson[];
  checklist: string[];
  further?: { label: string; href: string };
};

// How many modules are released. Modules after this show as "Coming soon" on the course page, have no page yet,
// and stay out of the sitemap. Raise it to release the next module.
export const releasedModules = 1;
export const isReleased = (index: number) => index < releasedModules;

export const modules: Module[] = [
  {
    id: 'module-1',
    slug: 'why-google-shows-some-businesses-first',
    title: 'Why Google Shows Some Businesses First',
    summary: 'How the map pack works and the three things Google uses to rank local businesses.',
    intro: 'Before you change anything, it helps to know what Google is looking for. When someone searches for a service “near me” or in a city, Google picks a handful of businesses to show. Those spots are not random, and most of what decides them is in your control.',
    lessons: [
      {
        title: 'Where local results appear',
        text: 'A local search usually shows three things: the map pack (the map with three businesses under it), the regular organic results below it, and more and more often an AI Overview at the top. Each one is a separate chance to be found, and each one leans on the same signals.',
      },
      {
        title: 'The three local ranking factors',
        text: 'Google says local results are based mainly on three things:',
        points: [
          'Relevance: how well your business matches what the person searched for.',
          'Distance: how far your business is from the searcher or the location in the search.',
          'Prominence: how well known and trusted your business is, from reviews, links, mentions and your website.',
        ],
      },
      {
        title: 'See where you stand today',
        text: 'Search for your main services the way a customer would, in a private browser window, from inside your service area. Note who appears in the map pack and why: their categories, how many reviews they have, and what their website says. That is your starting benchmark.',
      },
    ],
    checklist: [
      'List your 5–10 most valuable services',
      'Search each one with your city or “near me”',
      'Write down the top 3 businesses for each search',
      'Note their review counts, ratings and main category',
    ],
  },
  {
    id: 'module-2',
    slug: 'google-business-profile',
    title: 'Make Your Google Business Profile Irresistible',
    summary: 'Set up and optimize the profile that powers your map pack listing.',
    intro: 'Your Google Business Profile is the listing that shows in the map pack and on Google Maps. For most local businesses it brings in more calls than the website does, so it deserves the most attention.',
    lessons: [
      {
        title: 'Get the basics exactly right',
        text: 'Claim and verify your profile, then fill in every field. Use your real-world business name only: adding keywords or cities to the name breaks Google’s guidelines and can get the profile suspended. Keep your address or service area, phone number, hours and holiday hours accurate.',
      },
      {
        title: 'Choose categories carefully',
        text: 'Your primary category is one of the strongest relevance signals you control. Pick the one that best describes your main service, then add secondary categories for the other services you really offer. Check which categories the top-ranking competitors use.',
      },
      {
        title: 'Make people want to choose you',
        text: 'Once you appear, the profile has to win the click or call.',
        points: [
          'Add your services and products, with short descriptions.',
          'Write a clear business description (up to 750 characters) that says what you do and where.',
          'Upload real photos of your team, work, vehicles and premises, and keep adding new ones.',
          'Publish updates and offers so the profile looks active.',
        ],
      },
    ],
    checklist: [
      'Profile claimed and verified',
      'Business name matches your real signage',
      'Primary and secondary categories reviewed',
      'Services, description, hours and photos complete',
    ],
    further: { label: 'Read the full Local SEO guide', href: '/learn-seo/local-seo' },
  },
  {
    id: 'module-3',
    slug: 'local-website-seo',
    title: 'Make Your Website Show Up in Local Searches',
    summary: 'On-page changes that tell Google what you do and where you do it.',
    intro: 'Your website backs up your Google Business Profile. Google compares the two, and a site that clearly states your services and locations strengthens both your map pack and organic rankings.',
    lessons: [
      {
        title: 'One page per service',
        text: 'Give each main service its own page instead of listing everything on one. Each page should explain the service, who it is for, the areas you cover, your prices or how pricing works, and how to get in touch.',
      },
      {
        title: 'Say where you work, clearly',
        text: 'Put the service and the city in the places Google reads first:',
        points: [
          'Title tag and main heading, for example “Emergency Plumber in Dallas”.',
          'Your business name, address and phone number in the footer, matching your profile exactly.',
          'A contact page with an embedded map and your service area.',
        ],
      },
      {
        title: 'Add LocalBusiness structured data',
        text: 'Structured data (schema) describes your business in a format search engines and AI assistants read directly: name, address, phone, hours, area served and reviews. Add it to your homepage and contact page and test it with Google’s Rich Results Test.',
      },
    ],
    checklist: [
      'A dedicated page for each main service',
      'Service + city in titles and headings',
      'Name, address and phone match the profile',
      'LocalBusiness schema added and tested',
    ],
  },
  {
    id: 'module-4',
    slug: 'local-content',
    title: 'Create Relevant Content That Gets You Found',
    summary: 'Location pages, project stories and answers that win local searches.',
    intro: 'Content is how you rank for more searches than the handful your service pages cover, and how you show Google and AI search that you are the local expert.',
    lessons: [
      {
        title: 'Build useful location pages',
        text: 'If you serve several towns, a page for each can help, but only if each one is genuinely different: local projects, local prices, the neighbourhoods you cover, local reviews. Pages that only swap the town name are doorway pages, which Google’s spam policies target.',
      },
      {
        title: 'Show your work',
        text: 'Write short project stories and case studies: the problem, what you did, the result, and where it was. They prove experience, give you natural local keywords, and are the kind of first-hand content AI answers like to cite.',
      },
      {
        title: 'Answer the questions customers ask',
        text: 'Collect the questions you hear on the phone, then answer each one clearly on your site: costs, timings, what to expect, how to choose. Put the direct answer first, then the detail.',
      },
    ],
    checklist: [
      'List the towns or areas you want to rank in',
      'One genuinely local page per key area',
      'At least 3 project stories with locations',
      'An FAQ section built from real customer questions',
    ],
  },
  {
    id: 'module-5',
    slug: 'local-citations',
    title: 'Get Listed Everywhere That Matters',
    summary: 'Citations and directories that build trust in your business details.',
    intro: 'A citation is any listing of your business name, address and phone number (NAP) on another site. Consistent citations confirm to Google that your business is real and where you say it is.',
    lessons: [
      {
        title: 'Start with the core platforms',
        text: 'Claim your listings on the platforms people and search engines use most:',
        points: [
          'Apple Business Connect (Apple Maps and Siri) and Bing Places.',
          'Yelp, Facebook and your main industry directories.',
          'Your local chamber of commerce and trade associations.',
        ],
      },
      {
        title: 'Keep every detail identical',
        text: 'Use exactly the same name, address and phone number everywhere, written the same way as on your Google Business Profile. Different phone numbers or old addresses send mixed signals and can confuse customers.',
      },
      {
        title: 'Clean up what already exists',
        text: 'Search for your business name, old addresses and old phone numbers to find outdated or duplicate listings, then update or remove them. In the US, data aggregators such as Data Axle and Foursquare feed many smaller directories, so fixing them fixes a lot at once.',
      },
    ],
    checklist: [
      'NAP written down in one exact format',
      'Apple, Bing, Yelp and Facebook listings claimed',
      'Top industry directories added',
      'Duplicates and old details fixed',
    ],
  },
  {
    id: 'module-6',
    slug: 'customer-reviews',
    title: 'Turn Customer Reviews Into More Sales',
    summary: 'Get more reviews, respond well, and use them to win the next customer.',
    intro: 'Reviews influence both where you rank and whether people choose you. A steady flow of recent, genuine reviews beats a big batch from two years ago.',
    lessons: [
      {
        title: 'Make asking a habit',
        text: 'Ask every happy customer, right after the job, with a direct link to your review form. A text message or QR code on the invoice works better than hoping they find you. Ask all customers, not only the happy ones: offering rewards for reviews or filtering who you ask goes against Google’s policies.',
      },
      {
        title: 'Respond to every review',
        text: 'Thank people for positive reviews and mention the service you provided. Reply to negative reviews calmly and quickly, offer to fix the problem offline, and never argue. Future customers read your replies as much as the reviews.',
      },
      {
        title: 'Put reviews to work',
        text: 'Feature your best reviews on your service pages and in quotes, and use recurring complaints to improve the business. Reviews that mention specific services and places also help your relevance.',
      },
    ],
    checklist: [
      'Short review link created',
      'Review request sent after every job',
      'Every review answered within 48 hours',
      'Best reviews added to your website',
    ],
  },
  {
    id: 'module-7',
    slug: 'technical-local-seo',
    title: 'Handle the Technical Stuff',
    summary: 'Make sure Google can crawl, load and understand your site on mobile.',
    intro: 'You do not need to be a developer, but a few technical basics decide whether all your other work gets seen. Most local searches happen on phones, so mobile comes first.',
    lessons: [
      {
        title: 'Get indexed',
        text: 'Set up Google Search Console, submit your XML sitemap and check the Pages report to make sure your service and location pages are indexed. Fix any page marked “noindex” or blocked in robots.txt by mistake.',
      },
      {
        title: 'Fast and mobile-friendly',
        text: 'Your site should load quickly and work perfectly on a phone:',
        points: [
          'Compress images and remove heavy plugins or scripts you do not need.',
          'Check Core Web Vitals in Search Console or PageSpeed Insights.',
          'Make your phone number a tap-to-call link and keep the contact form short.',
        ],
      },
      {
        title: 'Secure and tidy',
        text: 'Use HTTPS everywhere, fix broken links and redirect old URLs to their new pages. Avoid publishing near-identical location pages, which can compete with each other.',
      },
    ],
    checklist: [
      'Search Console set up and sitemap submitted',
      'Key pages indexed',
      'Mobile speed checked and images compressed',
      'HTTPS on, broken links fixed',
    ],
    further: { label: 'Read the Technical SEO checklist', href: '/learn-seo/technical-seo' },
  },
  {
    id: 'module-8',
    slug: 'local-seo-reporting',
    title: 'Prove Your Results With Numbers',
    summary: 'Track calls, leads and rankings so you know what is working.',
    intro: 'Local SEO should show up as more calls, more enquiries and more customers. Measuring the right things tells you what is working and where to spend your time next.',
    lessons: [
      {
        title: 'Google Business Profile performance',
        text: 'Your profile’s Performance report shows calls, direction requests, website clicks and the searches people used to find you. Check it monthly and compare with the same month last year.',
      },
      {
        title: 'Website traffic and leads',
        text: 'Use Search Console to see which local searches bring visitors to which pages, and Google Analytics to count form submissions and calls as conversions. Add UTM tags to the website link on your profile so you can see that traffic separately.',
      },
      {
        title: 'Track calls and rankings',
        text: 'Call tracking shows which channel each call came from; use the tracking number as the primary number on your profile and keep your main number as an additional one so your details stay consistent. A local rank grid shows how your map pack position changes across your service area.',
      },
    ],
    checklist: [
      'Baseline numbers recorded for this month',
      'Conversions set up in Google Analytics',
      'UTM tags on the profile website link',
      'Monthly report: calls, leads, rankings',
    ],
  },
  {
    id: 'module-9',
    slug: 'local-seo-growth-system',
    title: 'Set Up Systems That Keep You Growing',
    summary: 'A simple monthly routine so results keep building.',
    intro: 'Local SEO is not a one-off project. The businesses that stay at the top keep doing the basics every month. Turn the course into a routine you can hand to your team.',
    lessons: [
      {
        title: 'Weekly',
        text: 'Ask for reviews after every job, reply to new reviews, and add fresh photos or an update to your Google Business Profile.',
      },
      {
        title: 'Monthly',
        text: 'Publish at least one new piece of content (a project story, an FAQ answer or an improved service page), check your Performance and Search Console numbers, and look at what top competitors changed.',
      },
      {
        title: 'Quarterly',
        text: 'Review your categories and services, audit your citations for errors, refresh your most important pages, and set the next quarter’s priorities from your numbers.',
      },
    ],
    checklist: [
      'Weekly review and profile routine assigned',
      'Monthly content and reporting slot in the calendar',
      'Quarterly audit date set',
      'Results reviewed and next priorities chosen',
    ],
  },
];

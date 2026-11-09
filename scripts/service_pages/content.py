"""Copy for every generated service page.

Strings are HTML fragments: write &amp; for "&" and use <b>, <mark> or <a> where needed.
Business claims (stats, case studies) match what the AI SEO page and homepage already publish.
"""
from kit import icon, vt_prompt, vt_list, STARS

STATS = [('7+', 'years in organic search'), ('840+', 'top-3 keywords ranked'), ('16K+', 'monthly organic clicks')]
WHO_RUNS = ('user', 'Who runs your account', 'Junior account manager', 'Senior strategist, start to finish')
TACTICS = ('shield', 'Tactics', 'Shortcuts that risk rankings', 'White-hat only, built to last')

# Small map used in the Local SEO / GMB mockups.
def mini_map(cls, dark=False):
    bg = '#16276a' if dark else '#E9EEFC'
    road = 'rgba(255,255,255,.14)' if dark else '#fff'
    block = 'rgba(255,255,255,.05)' if dark else '#DCE4FB'
    return f'''<svg class="{cls}" viewBox="0 0 320 92" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="320" height="92" fill="{bg}"/>
            <g fill="{block}"><rect x="12" y="10" width="70" height="30" rx="4"/><rect x="100" y="8" width="90" height="34" rx="4"/><rect x="210" y="12" width="96" height="26" rx="4"/><rect x="20" y="56" width="80" height="28" rx="4"/><rect x="120" y="54" width="70" height="30" rx="4"/><rect x="214" y="52" width="88" height="34" rx="4"/></g>
            <g stroke="{road}" stroke-width="7" fill="none"><path d="M0 48h320"/><path d="M92 0v92"/><path d="M200 0v92"/></g>
            <g><circle cx="150" cy="30" r="9" fill="#345DF7"/><circle cx="150" cy="30" r="3.5" fill="#fff"/><path d="M150 39l-4-6h8z" fill="#345DF7"/></g>
            <g fill="#9DB2FF"><circle cx="60" cy="68" r="5"/><circle cx="252" cy="24" r="5"/><circle cx="262" cy="70" r="5"/></g>
          </svg>'''


# ======================================================================
# LOCAL SEO
# ======================================================================
LOCAL = {
    'slug': 'local-seo-services',
    'title': 'Local SEO Services: Win the Map Pack | Search Engine Xperts',
    'og_title': 'Local SEO Services: Win the Map Pack and “Near Me” Searches',
    'description': 'Local SEO services that put your business in Google’s map pack, local results and AI answers for “near me” searches. Get a free local SEO audit.',
    'crumb': 'Local SEO Services',
    'service_type': 'Local SEO Services',
    'schema_description': 'Local SEO services covering local SEO strategy and audits, Google Business Profile optimization, location and service-area pages, citation building and NAP cleanup, review strategy, local link building, local schema and multi-location SEO.',
    'mobile_cta': 'Get My Free Local SEO Audit',
    'cases_order': ['DFW Turf Solutions', 'Personal Drivers', 'Shuraa', 'Roller Skate USA'],
    'case_subject': 'Local%20SEO%20case%20study%20request',
    'hero': {
        'tag_icon': 'pin', 'tag': 'Local rankings built on 7+ years of organic search',
        'h1': 'Local SEO: Win the Map Pack and Every “Near Me” Search.',
        'lead': 'We make your business the obvious local choice in Google Maps, the local 3-pack and AI answers, so nearby customers call you, not the competitor down the road.',
        'cta': 'Get My Local SEO Audit', 'cta2': 'See Our Local SEO Framework',
        'stats': STATS,
        'float': ('pin', 'Ranking in the local pack', 'dfwturf.com'),
        'visual': f'''      {vt_prompt('emergency plumber near me')}
      <div class="vt-box">
        <div class="vt-ah">{icon('pin', 13, '2.1')} Local results</div>
        {mini_map('vt-map', dark=True)}
        <div class="vt-biz"><span class="vt-fav">Y</span><div><b>YourBrand Plumbing</b><small>{STARS} 4.9 (212) · Open 24 hours</small></div><span class="vt-rank">#1</span></div>
      </div>
      {vt_list('Local visibility', 'Sample tracking view', [
          ('pin', 'Map pack', 'Top 3 for core services', 'cited', 'Top 3'),
          ('search', 'Local organic results', 'Service + city pages', 'cited', 'Page 1'),
          ('star', 'Reviews', 'New reviews every week', 'ment', 'Growing'),
          ('spark', 'AI answers', 'Gemini &amp; AI Overviews', 'track', 'In progress'),
      ])}''',
    },
    'trust': [('pin', 'Google Maps &amp; the local 3-pack'), ('store', 'Google Business Profile'),
              ('star', 'Citations, reviews &amp; NAP consistency'), ('shield', 'White-hat, sustainable tactics')],
    'landscape': {
        'eyebrow': 'Why local SEO now',
        'h2': 'Local Buyers Decide Before They Visit Your Website',
        'p': 'Most local searches end in a call, a direction request or a visit, often straight from the map results. If you are not in the top three, you are close to invisible to people who are ready to buy.',
        'stages': [
            ('Search', 'Someone searches nearby', '“Near me”, city-name and service searches happen on phones, often minutes before a purchase.'),
            ('Compare', 'The map pack decides', 'Google shows three businesses with ratings, hours and photos above the organic results.'),
            ('Trust', 'Reviews and details', 'Buyers scan star ratings, recent reviews, photos and opening hours to judge who to trust.'),
            ('Act', 'They call or visit', 'The top result gets the call, the booking or the visit. The rest rarely get a look.'),
        ],
    },
    'definition': {
        'h2': 'What Is Local SEO?',
        'p': ['Local SEO is the practice of improving a business’s visibility in location-based searches: the Google map pack, Google Maps, local organic results and, increasingly, AI answers to questions like “best dentist near me”. It covers your Google Business Profile, location and service-area pages, citations, reviews and local links.',
              'Google says local results are based mainly on <b>relevance</b> (how well you match the search), <b>distance</b> (how close you are to the searcher) and <b>prominence</b> (how well known and well reviewed you are). You can’t move your address, but you can strengthen relevance and prominence, and that is where we focus.'],
        'entity': ('Your business', 'local entity', ['Services', 'Reviews', 'Address', 'Citations', 'Service area', 'Photos'],
                   'Google connects these signals to decide who ranks locally'),
        'left': {'label': 'Foundation', 'title': 'Organic SEO', 'items': ['Keyword-targeted service pages', 'Technical site health', 'Content &amp; topical depth', 'Backlinks &amp; authority', 'Broad, non-local rankings']},
        'right': {'label': 'Local layer', 'title': 'Local SEO', 'items': ['Map pack &amp; Google Maps rankings', 'Google Business Profile optimization', 'NAP consistency &amp; citations', 'Review volume, recency &amp; replies', 'Location &amp; service-area pages']},
        'note': '<b>Local SEO works best on a strong website.</b> The map pack leans heavily on your Google Business Profile, but your website’s relevance, content and links feed prominence too. We improve both together.',
    },
    'shots': {
        'h2': 'Where Local Customers Find You',
        'p': 'Three places nearby buyers make their choice. Our work aims to put your business at the top of each one.',
        'shots': [
            ('Search results', 'g', f'''          <div class="g-search"><span>emergency plumber in dallas</span>{icon('search', 14, '2.4')}</div>
          <div class="g-tabs"><b>All</b><span>Maps</span><span>Images</span><span>News</span></div>
          <div class="lp">
            {mini_map('lp-map')}
            <div class="lp-row on"><div><b>YourBrand Plumbing</b><small>{STARS} 4.9 (212) · Plumber · Open 24 hours</small></div><em>Call</em></div>
            <div class="lp-row"><div><b>Competitor A</b><small>4.5 (88) · Plumber · Closes 6 PM</small></div><em>Call</em></div>
            <div class="lp-row"><div><b>Competitor B</b><small>4.2 (41) · Plumber</small></div><em>Call</em></div>
          </div>''', 'The local 3-pack', 'The map results above the organic listings. We strengthen the profile, review and website signals that decide the top three.'),
            ('Google Maps', 'g', f'''          <div class="gp-hero">{mini_map('', False).replace('class=""', '')}</div>
          <div class="gp-name">YourBrand Plumbing</div>
          <div class="gp-meta">{STARS} 4.9 (212) · Plumber in Dallas, TX</div>
          <div class="gp-acts"><span class="on">Directions</span><span>Call</span><span>Website</span><span>Save</span></div>
          <div class="gp-info">
            <div>{icon('clock', 12)}<span><b>Open 24 hours</b> · Emergency call-outs</span></div>
            <div>{icon('pin', 12)}<span>Serves Dallas, Plano &amp; Irving</span></div>
            <div>{icon('phone', 12)}<span>(214) 555-0100</span></div>
          </div>''', 'Google Maps', 'Where mobile searchers compare, call and get directions. We keep your listing complete, accurate and active.'),
            ('AI assistant', 'c', f'''          <aside class="c-side"><div class="c-new">+ New chat</div><b>Today</b><span class="on">Emergency plumber Dallas</span><span>Water heater costs</span><b>Yesterday</b><span>Weekend plans</span></aside>
          <div class="c-main">
            <div class="c-user">Who’s a reliable emergency plumber in Dallas?</div>
            <div class="c-ai">
              <div class="c-av">{icon('spark', 11, '2')}</div>
              <div>
                <p>Well-reviewed options that offer 24-hour service:</p>
                <p><b>1. <mark>YourBrand Plumbing</mark></b>: 4.9 stars, open 24 hours, serves Dallas, Plano and Irving.</p>
                <p><b>2. Competitor A</b>: shorter hours.</p>
                <span class="c-cite">yourbrand.com</span>
              </div>
            </div>
            <div class="c-input"><span>+</span><em>Ask anything</em><i>{icon('up', 12, '2.6')}</i></div>
          </div>''', 'AI assistants', 'ChatGPT, Gemini and AI Overviews now answer local questions. Consistent business details and reviews help you get named.'),
        ],
    },
    'services': {
        'h2': 'Local SEO Services We Provide',
        'p': 'Everything it takes to rank in the map pack and local results, built on the same technical and content foundation as our core <a href="/#services" style="color:var(--blue);font-weight:600;">SEO services</a>.',
        'cards': [
            ('target', 'Local SEO Audit &amp; Strategy', 'A full review of your local rankings, Google Business Profile, citations, reviews and competitors, turned into a prioritized plan for every location you serve.', ('Get a local visibility check', '#audit')),
            ('store', 'Google Business Profile Optimization', 'Categories, services, attributes, photos and posts set up to match how customers search. See our dedicated <a href="/gmb-optimization-services" style="color:var(--blue);font-weight:600;">GMB optimization</a> service.'),
            ('pin', 'Location &amp; Service-Area Pages', 'Unique, useful pages for each city or area you serve, with local proof, FAQs and schema, not thin copies with the town name swapped.'),
            ('list', 'Citation Building &amp; NAP Cleanup', 'Consistent name, address and phone details across directories, data aggregators and industry sites, with duplicates and errors fixed.'),
            ('star', 'Review Strategy', 'A guideline-compliant process for asking happy customers for reviews, plus reply templates that show prospects you care.'),
            ('link', 'Local Link Building', 'Links and mentions from local news, chambers, sponsorships, suppliers and community groups that build local prominence.'),
            ('search', 'Local Keyword &amp; Competitor Research', 'The service + city terms, “near me” variations and questions your customers use, and what top-ranking competitors do differently.'),
            ('code', 'Local Schema &amp; Technical SEO', 'LocalBusiness schema, mobile speed, crawlability and clean structure, so Google and AI systems read your business details correctly.'),
            ('layers', 'Multi-Location SEO', 'Scalable site structure, location pages and profile management for brands with several branches, franchises or service areas.'),
        ],
    },
    'framework': {
        'h2': 'The Search Engine Xperts Local SEO Framework',
        'p': 'Six stages that take you from scattered local signals to consistent map pack visibility.',
        'stages': [
            ('search', 'Discover', 'We check where you rank across your service area, audit your Google Business Profile and citations, and study the businesses that hold the top three spots.', ['Local rank audit', 'Competitor gaps', 'Citation audit']),
            ('grid', 'Build', 'We fix profile basics, clean up inconsistent business details and plan a location and service page structure that matches how people search.', ['NAP cleanup', 'Page architecture', 'Profile setup']),
            ('sliders', 'Optimize', 'Service and location pages, LocalBusiness schema, photos, categories and internal links are optimized so Google clearly connects you to each service and area.', ['On-page SEO', 'Local schema', 'Categories']),
            ('megaphone', 'Establish Authority', 'A steady review process, local links, relevant citations and community mentions build the prominence Google rewards.', ['Reviews', 'Local links', 'Citations']),
            ('chart', 'Measure', 'We track map pack positions across your area, plus calls, direction requests, website clicks and leads from local search.', ['Grid rank tracking', 'Profile performance', 'Lead tracking']),
            ('refresh', 'Improve', 'Monthly refinement: new location content, review response, posts and fixes based on what the data shows.', ['Iteration', 'Content updates', 'Reporting']),
        ],
    },
    'stack': {
        'h2': 'Local Rankings Are Built in Layers', 'p': 'Each layer supports the one above it.',
        'layers': [('pin', 'Map pack &amp; local visibility'), ('star', 'Reviews &amp; reputation'), ('link', 'Citations &amp; local links'),
                   ('store', 'Business Profile &amp; location pages'), ('code', 'Technical SEO')],
        'outs': [('pin', 'Local 3-pack', 'Map results in Google'), ('globe', 'Google Maps', 'Mobile searches'),
                 ('search', 'Local organic', 'Classic results'), ('spark', 'AI answers', 'Gemini, ChatGPT &amp; AI Overviews')],
    },
    'who': {
        'h2': 'Who Needs Local SEO?',
        'p': 'Any business that serves customers in a specific area. Here’s how it typically pays off.',
        'cards': [
            ('home', 'Home Services', 'Plumbers, HVAC, roofers and electricians win urgent jobs from the map pack, often from a single call.'),
            ('heart', 'Clinics &amp; Dentists', 'Patients compare ratings, locations and opening hours before booking, so reviews and accurate details matter.'),
            ('scale', 'Law Firms', 'City-level searches for practice areas are competitive. Location pages and authority help you stand out.'),
            ('utensils', 'Restaurants &amp; Cafes', '“Near me” and “open now” searches decide where people eat, often on the spot.'),
            ('briefcase', 'Real Estate Agents', 'Neighborhood and area pages help you show up for buyers and sellers researching specific locations.'),
            ('car', 'Auto Services', 'Repair shops and dealers depend on nearby customers who need help now, not next week.'),
            ('layers', 'Multi-Location Brands', 'Each branch needs its own profile, page and local signals to rank in its own area.'),
            ('move', 'Service-Area Businesses', 'No storefront? You can still rank across the towns you serve with the right setup.'),
        ],
    },
    'why': {
        'h2': 'Why Local Businesses Choose Search Engine Xperts', 'p': 'How our approach compares with a typical SEO agency.',
        'rows': [
            WHO_RUNS,
            ('chart', 'What drives strategy', 'Generic citation packages', 'Your rankings across real customer locations'),
            ('list', 'Citations', 'Bulk directory blasts', 'Cleaned up and consistent where it counts'),
            ('doc', 'Location pages', 'Copy-paste city pages', 'Unique pages with real local proof'),
            ('target', 'Reporting', 'Rankings from one spot', 'Map grid, calls and direction requests'),
            TACTICS,
        ],
    },
    'audit': {
        'eyebrow': 'Free local SEO audit', 'h2': 'Find Out Why Competitors Outrank You Locally',
        'p': 'We’ll check your map pack positions, Google Business Profile, citations and reviews against your top local competitors, then send you a prioritized action plan.',
        'checks': ['Map pack ranking snapshot', 'Google Business Profile review', 'Citation &amp; NAP consistency check', 'Prioritized 90-day action plan'],
        'button': 'Get My Local SEO Audit', 'mail_subject': 'Free local SEO audit request', 'mail_label': 'free local SEO audit',
    },
    'faq': {
        'h2': 'Frequently Asked Questions About Local SEO',
        'p': 'The questions business owners ask most before starting local SEO.',
        'items': [
            ('What is local SEO?', 'Local SEO is the process of improving your visibility in location-based searches, including the Google map pack, Google Maps, local organic results and AI answers to local questions. It covers your Google Business Profile, website, citations, reviews and local links.'),
            ('How long does local SEO take?', 'Fixes to your Google Business Profile and business details can show effects within a few weeks. In competitive cities and categories, steady map pack gains usually take three to six months of consistent work on reviews, content and links.'),
            ('What is the difference between local SEO and GMB optimization?', 'GMB (Google Business Profile) optimization focuses on your Google listing itself. Local SEO is broader: it also covers your website’s location and service pages, citations, reviews, local links and technical SEO. Most businesses need both.'),
            ('Do I need a physical address to rank locally?', 'No. Service-area businesses that visit customers can hide their address on Google and list the areas they serve. You do need to serve customers in person in those areas, as Google’s guidelines require.'),
            ('How do reviews affect local rankings?', 'Google says review count and review score factor into local ranking, and reviews strongly influence whether people choose you. We set up a compliant process to earn reviews and reply to every one. We never buy, filter or incentivize reviews.'),
            ('Do I need a separate page for every city?', 'Only for areas you genuinely serve and where you can add unique, useful content. Near-identical pages with only the city name changed can be treated as doorway pages, so we build fewer, better location pages.'),
            ('Can you help a business with multiple locations?', 'Yes. We set up a scalable structure with a profile and page for each location, consistent business data across the web, and reporting by location so you can see which branches need attention.'),
            ('How do you measure local SEO results?', 'We track map pack positions across your service area, local organic rankings, and profile actions such as calls, direction requests and website clicks, plus leads and conversions in Google Analytics.'),
            ('Does local SEO help with AI search?', 'Yes. AI assistants and AI Overviews draw on business listings, reviews and websites to answer local questions. Accurate, consistent details and strong reviews improve the chance your business is named.'),
            ('Can you guarantee the number one spot in the map pack?', 'No one can honestly guarantee it. Map results change with the searcher’s location, and Google controls the rankings. We focus on the factors you can influence and report on real progress.'),
        ],
    },
    'final': {
        'kicker': 'Free local visibility audit', 'h2': 'See where you rank in your area.',
        'p': 'We check your map pack positions, profile, citations and reviews, then send a prioritized plan to win more local customers.',
        'core': 'Your business',
        'nodes': [('pin', 'Map pack'), ('globe', 'Google Maps'), ('star', 'Reviews'), ('list', 'Citations'), ('spark', 'AI answers')],
    },
}

# ======================================================================
# GMB OPTIMIZATION
# ======================================================================
GMB = {
    'slug': 'gmb-optimization-services',
    'title': 'GMB Optimization Services | Google Business Profile Experts',
    'og_title': 'GMB Optimization: Google Business Profile Optimization & Management',
    'description': 'Google Business Profile (GMB) optimization: categories, photos, posts and reviews that help you rank higher on Google Maps. Get a free profile audit.',
    'crumb': 'GMB Optimization',
    'service_type': 'Google Business Profile (GMB) Optimization',
    'schema_description': 'Google Business Profile (GMB) optimization and management, covering profile audits, category and service optimization, setup and verification, photos, Google Posts, review management, products and booking links, spam and suspension support and multi-location profile management.',
    'mobile_cta': 'Get My Free Profile Audit',
    'cases_order': ['DFW Turf Solutions', 'Personal Drivers', 'Roller Skate USA', 'Shuraa'],
    'case_subject': 'GMB%20optimization%20case%20study%20request',
    'hero': {
        'tag_icon': 'store', 'tag': 'Google Business Profile specialists',
        'h1': 'GMB Optimization: Turn Your Google Profile Into Calls and Customers.',
        'lead': 'We optimize and manage your Google Business Profile so you rank higher on Google Maps, stand out in the local pack and turn profile views into calls, bookings and visits.',
        'cta': 'Get My Free Profile Audit', 'cta2': 'See How We Optimize',
        'stats': STATS,
        'float': ('pin', 'Ranking in the local pack', 'dfwturf.com'),
        'visual': f'''      <div class="gbp-top"><span class="gbp-av">Y</span><div><b>YourBrand Dental Studio</b><small>{STARS} 4.9 (186) · Dentist · Open now</small></div></div>
      <div class="gbp-acts"><span>{icon('phone', 14)}Call</span><span>{icon('pin', 14)}Directions</span><span>{icon('globe', 14)}Website</span><span>{icon('calendar', 14)}Book</span></div>
      <div class="vt-box">
        <div class="vt-ah">{icon('chart', 13, '2.1')} Profile performance · sample month</div>
        <div class="vt-kpis"><div><span>Calls</span><b>142</b><em>+38%</em></div><div><span>Directions</span><b>96</b><em>+24%</em></div><div><span>Website clicks</span><b>311</b><em>+41%</em></div></div>
      </div>
      {vt_list('Profile health', 'Sample profile', [
          ('tag', 'Categories', 'Primary + 4 secondary', 'cited', 'Optimized'),
          ('list', 'Services &amp; products', 'All services listed', 'cited', 'Complete'),
          ('camera', 'Photos &amp; posts', 'Updated weekly', 'ment', 'Active'),
          ('star', 'Review replies', 'Every review answered', 'track', 'Ongoing'),
      ])}''',
    },
    'trust': [('pin', 'Google Maps rankings'), ('store', 'Local pack visibility'),
              ('star', 'Reviews &amp; reputation'), ('shield', 'Guideline-safe optimization')],
    'landscape': {
        'eyebrow': 'Why your profile matters',
        'h2': 'Your Google Profile Is Often Seen Before Your Website',
        'p': 'For local searches, Google shows your Business Profile right in the results and on Maps. Many customers call, get directions or book straight from it without ever visiting your site.',
        'stages': [
            ('Found', 'Search or Maps', 'A customer searches a service or your name, and your profile appears in the local pack or business panel.'),
            ('Judged', 'Profile details', 'Photos, reviews, hours and services are compared with competitors side by side, in seconds.'),
            ('Chosen', 'One-tap action', 'They call, request directions, visit your website or book directly from the profile.'),
            ('Kept', 'Ongoing signals', 'Fresh reviews, photos and posts keep the profile accurate, active and competitive.'),
        ],
    },
    'definition': {
        'h2': 'What Is GMB Optimization?',
        'p': ['GMB optimization (now Google Business Profile optimization) is the process of completing, refining and actively managing your free Google listing so it ranks higher on Google Maps and in the local pack, and converts more of the people who see it. Google renamed Google My Business to Google Business Profile in 2021, but most people still call it GMB.',
              'It goes well beyond filling in fields. The right primary and secondary categories, accurate services, real photos, regular updates and a steady flow of reviews all influence how your profile ranks and how customers respond to it.'],
        'entity': ('Your profile', 'business listing', ['Categories', 'Reviews', 'Services', 'Photos', 'Posts', 'Website'],
                   'The profile signals Google and customers look at'),
        'left': {'label': 'Set up', 'title': 'Basic listing', 'neg': True, 'items': ['One generic category', 'Missing services &amp; attributes', 'A few old photos', 'Unanswered reviews', 'No updates for months']},
        'right': {'label': 'Optimized', 'title': 'Managed profile', 'items': ['Researched primary &amp; secondary categories', 'Complete services, products &amp; attributes', 'Fresh, real photos and regular posts', 'Every review answered', 'Booking links &amp; tracked website clicks']},
        'x': 'vs',
        'note': '<b>Your profile and your website work together.</b> Google uses your website to confirm what your profile says. We align both, so your categories, services and location details match everywhere.',
    },
    'shots': {
        'h2': 'What Customers See on Your Profile',
        'p': 'Three moments where a well-optimized profile wins the customer.',
        'shots': [
            ('Search results', 'g', f'''          <div class="g-search"><span>dentist near me</span>{icon('search', 14, '2.4')}</div>
          <div class="g-tabs"><b>All</b><span>Maps</span><span>Images</span><span>News</span></div>
          <div class="lp">
            {mini_map('lp-map')}
            <div class="lp-row on"><div><b>YourBrand Dental Studio</b><small>{STARS} 4.9 (186) · Dentist · Open now</small></div><em>Book</em></div>
            <div class="lp-row"><div><b>Competitor A</b><small>4.6 (74) · Dentist · Closes 5 PM</small></div><em>Website</em></div>
            <div class="lp-row"><div><b>Competitor B</b><small>4.1 (23) · Dental clinic</small></div><em>Website</em></div>
          </div>''', 'The local pack', 'Your category, relevance and reviews decide whether you make the top three. We optimize each one.'),
            ('Business profile', 'g', f'''          <div class="gp-hero">{mini_map('', False).replace('class=""', '')}</div>
          <div class="gp-name">YourBrand Dental Studio</div>
          <div class="gp-meta">{STARS} 4.9 (186) · Dentist in Austin, TX</div>
          <div class="gp-acts"><span class="on">Book</span><span>Call</span><span>Directions</span><span>Website</span></div>
          <div class="gp-info">
            <div>{icon('clock', 12)}<span><b>Open now</b> · Mon–Sat, 8 AM–6 PM</span></div>
            <div>{icon('list', 12)}<span>Teeth whitening, implants, emergency care</span></div>
            <div>{icon('camera', 12)}<span>48 photos · updated this week</span></div>
          </div>''', 'Your Business Profile', 'Complete details, real photos and clear actions turn a profile view into a booking. We keep every field accurate.'),
            ('Reviews', 'g', f'''          <div class="rv">
            <div class="rv-sum"><b>4.9</b><div>{STARS}<small>186 Google reviews</small></div></div>
            <div class="rv-item"><div class="who"><i>S</i>Sarah M. <span class="stars">★★★★★</span></div><p>Booked an emergency appointment the same day. Friendly team and no pressure.</p>
              <div class="rv-reply"><b>Owner reply:</b> Thanks Sarah, we’re glad we could see you so quickly.</div></div>
            <div class="rv-item"><div class="who"><i>J</i>James T. <span class="stars">★★★★★</span></div><p>Clear pricing and a great result on my implant.</p></div>
          </div>''', 'Reviews and replies', 'Recent, detailed reviews with owner replies build trust. We set up a process to earn and answer them.'),
        ],
    },
    'services': {
        'h2': 'GMB Optimization Services We Provide',
        'p': 'Complete Google Business Profile optimization and management. For wider local rankings, pair it with our <a href="/local-seo-services" style="color:var(--blue);font-weight:600;">local SEO services</a>.',
        'cards': [
            ('target', 'Profile Audit &amp; Optimization', 'We audit every field, category, photo and setting against your top competitors, then fix what is holding your profile back on Maps and in the local pack.', ('Get a free profile check', '#audit')),
            ('tag', 'Category &amp; Service Optimization', 'Researched primary and secondary categories, plus a complete list of services and attributes that match how customers search.'),
            ('check', 'Setup &amp; Verification', 'New profiles set up correctly, verification problems solved, and help regaining access to profiles you have lost.'),
            ('camera', 'Photo &amp; Visual Optimization', 'Real, high-quality photos of your team, premises and work, plus a clear logo and cover image that make your listing stand out.'),
            ('calendar', 'Google Posts Management', 'Regular posts for offers, updates, events and new services that keep your profile active and give customers a reason to act.'),
            ('star', 'Review Management', 'A guideline-compliant review request process, a reply to every review, and flagging of reviews that break Google’s policies.'),
            ('bag', 'Products &amp; Booking Links', 'Products, menus, booking and appointment links set up so customers can take the next step without leaving Google.'),
            ('alert', 'Spam &amp; Suspension Support', 'Reporting fake or keyword-stuffed competitor listings, and help preparing reinstatement requests for suspended profiles.'),
            ('layers', 'Multi-Location Management', 'Consistent, optimized profiles for every branch, managed together, with performance reporting by location.'),
        ],
    },
    'framework': {
        'h2': 'How We Optimize Your Google Business Profile',
        'p': 'Six stages that turn a basic listing into a profile that ranks and converts.',
        'stages': [
            ('search', 'Audit', 'We review your profile field by field, check your rankings across your area and compare you with the businesses that hold the top three spots.', ['Profile audit', 'Map rankings', 'Competitor review']),
            ('grid', 'Fix', 'We correct inaccurate or inconsistent details, resolve verification and duplicate listing issues, and align your profile with your website.', ['Data accuracy', 'Duplicates', 'Verification']),
            ('sliders', 'Optimize', 'Categories, services, attributes, description, photos, products and booking links are optimized for relevance and conversion.', ['Categories', 'Services', 'Photos']),
            ('megaphone', 'Activate', 'Regular posts, new photos and a steady review request process keep the profile fresh and give customers more reasons to choose you.', ['Posts', 'Reviews', 'Updates']),
            ('chart', 'Measure', 'We track calls, direction requests, website clicks and map positions, and tag profile links so website visits show up in your analytics.', ['Profile performance', 'Rank grid', 'UTM tracking']),
            ('refresh', 'Improve', 'Monthly refinement based on the data, plus monitoring for unwanted edits, spam competitors and policy changes.', ['Monitoring', 'Iteration', 'Reporting']),
        ],
    },
    'stack': {
        'h2': 'Profile Rankings Are Built in Layers', 'p': 'Each layer supports the one above it.',
        'layers': [('pin', 'Map pack visibility'), ('star', 'Reviews &amp; engagement'), ('camera', 'Photos, posts &amp; updates'),
                   ('tag', 'Categories, services &amp; attributes'), ('check', 'Accurate, verified business info')],
        'outs': [('pin', 'Local 3-pack', 'Map results in Google'), ('globe', 'Google Maps', 'Mobile searches'),
                 ('search', 'Brand searches', 'Your business panel'), ('spark', 'AI answers', 'Gemini &amp; AI Overviews')],
    },
    'who': {
        'h2': 'Who Needs GMB Optimization?',
        'p': 'Any business that serves customers in person or in a local area. Here’s how a strong profile helps.',
        'cards': [
            ('utensils', 'Restaurants &amp; Cafes', 'Photos, menus, hours and reviews decide where people eat, often straight from Maps.'),
            ('heart', 'Clinics &amp; Dentists', 'Patients book from profiles with clear services, opening hours and trusted reviews.'),
            ('home', 'Home Services', 'Calls come directly from the profile, so ranking in the local pack drives jobs.'),
            ('scale', 'Law &amp; Accounting Firms', 'Accurate practice areas and credible reviews help you stand out in high-trust searches.'),
            ('scissors', 'Salons &amp; Spas', 'Booking links, photos and recent reviews turn browsers into appointments.'),
            ('store', 'Retail Stores', 'Products, hours and directions bring nearby shoppers through the door.'),
            ('bed', 'Hotels &amp; Hospitality', 'Photos, amenities and reviews shape the first impression for travelers.'),
            ('layers', 'Multi-Location Brands', 'Every location needs its own accurate, optimized profile to rank in its area.'),
        ],
    },
    'why': {
        'h2': 'Why Businesses Choose Search Engine Xperts', 'p': 'How our approach compares with a typical agency.',
        'rows': [
            WHO_RUNS,
            ('tag', 'Category choice', 'Guesswork', 'Researched against top-ranking competitors'),
            ('store', 'Business name', 'Keyword-stuffed, risking suspension', 'Your real name, as Google requires'),
            ('star', 'Reviews', 'Ignored or bought', 'Earned with a compliant process, all answered'),
            ('chart', 'Reporting', 'Profile views only', 'Calls, directions, clicks and map rankings'),
            ('calendar', 'Profile activity', 'Set up once and forgotten', 'Updated and monitored every month'),
        ],
    },
    'audit': {
        'eyebrow': 'Free profile audit', 'h2': 'Find Out What’s Holding Your Profile Back',
        'p': 'We’ll review your Google Business Profile against your top local competitors and send you a prioritized list of fixes.',
        'checks': ['Category &amp; completeness review', 'Competitor profile comparison', 'Review &amp; reputation snapshot', 'Prioritized fix list'],
        'button': 'Get My Free Profile Audit', 'mail_subject': 'Free Google Business Profile audit request', 'mail_label': 'free Google Business Profile audit',
    },
    'faq': {
        'h2': 'Frequently Asked Questions About GMB Optimization',
        'p': 'What business owners ask most about their Google Business Profile.',
        'items': [
            ('What is GMB optimization?', 'GMB optimization is the process of completing and managing your Google Business Profile (formerly Google My Business) so it ranks higher on Google Maps and in the local pack, and turns more profile views into calls, visits and bookings.'),
            ('Is Google My Business the same as Google Business Profile?', 'Yes. Google renamed Google My Business to Google Business Profile in 2021. The listing works the same way, and most people still call it GMB.'),
            ('How long does it take to see results?', 'Corrections and category changes can affect visibility within a few weeks. Gains from reviews, photos and ongoing activity build over two to four months, depending on how competitive your area is.'),
            ('Should I put keywords in my business name?', 'No. Google’s guidelines require your real business name. Adding keywords can lead to a suspension and is a common reason profiles disappear. We optimize categories, services and content instead.'),
            ('How do I get more Google reviews?', 'Ask every happy customer, at the right moment, with a direct link to your review form. Google prohibits paying for reviews or offering incentives, so we set up a simple, compliant request process.'),
            ('Do Google posts help rankings?', 'Google has not confirmed posts as a ranking factor. They do keep your profile current, highlight offers and give customers a reason to act, which is why we use them.'),
            ('Can you get my suspended profile back?', 'We review why it was suspended, fix the underlying issues and help you prepare a reinstatement request with the right evidence. Google makes the final decision, so no one can guarantee reinstatement.'),
            ('Can a business without a storefront have a profile?', 'Yes. Service-area businesses can hide their address and list the areas they serve, as long as they meet customers in person.'),
            ('How often should my profile be updated?', 'Review replies should happen as reviews arrive, and we recommend new photos or posts at least a few times a month. Hours, services and holiday hours should always be current.'),
            ('Do you need ownership of my profile?', 'No. You stay the owner. We ask to be added as a manager, which you can remove at any time.'),
        ],
    },
    'final': {
        'kicker': 'Free profile audit', 'h2': 'See how your profile stacks up.',
        'p': 'We compare your Google Business Profile with your top local competitors, then send a prioritized list of fixes.',
        'core': 'Your profile',
        'nodes': [('globe', 'Google Maps'), ('pin', 'Local pack'), ('star', 'Reviews'), ('camera', 'Photos'), ('search', 'Search')],
    },
}

# ======================================================================
# ECOMMERCE SEO
# ======================================================================
ECOM = {
    'slug': 'ecommerce-seo-services',
    'title': 'Ecommerce SEO Services That Grow Sales | Search Engine Xperts',
    'og_title': 'Ecommerce SEO Services: Turn High-Intent Searches Into Sales',
    'description': 'Ecommerce SEO for Shopify, WooCommerce and custom stores: category, product and technical SEO that turns searches into sales. Get a free store audit.',
    'crumb': 'Ecommerce SEO Services',
    'service_type': 'Ecommerce SEO Services',
    'schema_description': 'Ecommerce SEO services covering store audits and strategy, category and product page optimization, technical ecommerce SEO, product schema and rich results, Shopify and WooCommerce SEO, keyword research, buying guides and Merchant Center feed optimization.',
    'mobile_cta': 'Get My Free Ecommerce SEO Audit',
    'cases_order': ['Roller Skate USA', 'Shuraa', 'Personal Drivers', 'DFW Turf Solutions'],
    'case_subject': 'Ecommerce%20SEO%20case%20study%20request',
    'hero': {
        'tag_icon': 'cart', 'tag': 'Proven on stores like Roller Skate USA',
        'h1': 'Ecommerce SEO: Turn High-Intent Searches Into Sales.',
        'lead': 'We optimize your categories, products and technical setup so shoppers find your store in Google, Google Shopping and AI shopping answers, ready to buy.',
        'cta': 'Get My Ecommerce SEO Audit', 'cta2': 'See Our Framework',
        'stats': STATS,
        'float': ('trend', '+1,994% organic clicks', 'rollerskateusa.com'),
        'visual': f'''      {vt_prompt('womens outdoor roller skates')}
      <div class="vt-box">
        <div class="vt-ah">{icon('tag', 13, '2.1')} Product result</div>
        <div class="vt-prod"><span class="ph">{icon('bag', 26, '1.6')}</span><div><span class="url">yourstore.com › skates › outdoor</span><b>Women’s Outdoor Roller Skates</b><small>{STARS} 4.8 (96 reviews)</small><div class="price"><strong>$129.00</strong><i>In stock</i><span>Free shipping</span></div></div></div>
      </div>
      {vt_list('Store visibility', 'Sample tracking view', [
          ('grid', 'Category pages', 'Commercial keywords', 'cited', 'Top 3'),
          ('star', 'Product rich results', 'Price, stock &amp; ratings', 'cited', 'Eligible'),
          ('bag', 'Google Shopping', 'Free product listings', 'ment', 'Showing'),
          ('spark', 'AI shopping answers', 'ChatGPT &amp; AI Mode', 'track', 'In progress'),
      ])}''',
    },
    'trust': [('store', 'Shopify, WooCommerce &amp; custom stores'), ('grid', 'Category &amp; product page SEO'),
              ('star', 'Product schema &amp; rich results'), ('shield', 'White-hat, sustainable tactics')],
    'landscape': {
        'eyebrow': 'Why ecommerce SEO now',
        'h2': 'Shoppers Start With a Search, Not Your Homepage',
        'p': 'Most buying journeys begin with a search for a product type, a brand or a specific need. Paid ads stop the moment the budget does. Rankings for the right category and product pages keep bringing buyers in.',
        'stages': [
            ('Research', 'Problem and ideas', 'Shoppers search questions and “best” lists. Buying guides and comparisons win this stage.'),
            ('Compare', 'Category searches', 'Searches like “women’s outdoor skates” land on category pages, so those pages need to rank.'),
            ('Choose', 'Product searches', 'Specific products with price, reviews and stock shown in the results get the click.'),
            ('Buy', 'Checkout and return', 'Fast, trustworthy pages convert. Brand searches bring repeat customers back.'),
        ],
    },
    'definition': {
        'h2': 'What Is Ecommerce SEO?',
        'p': ['Ecommerce SEO is the process of making an online store’s category, product and content pages rank in search engines for the terms shoppers use when they are ready to buy, and making sure search engines can crawl, understand and display those pages correctly.',
              'Stores face problems content sites don’t: thousands of near-duplicate product URLs, filters that create endless crawlable pages, out-of-stock items, thin manufacturer descriptions and slow templates. Good ecommerce SEO solves these at scale while improving the pages that drive revenue.'],
        'entity': ('Your store', 'product catalog', ['Categories', 'Products', 'Reviews', 'Brands', 'Schema', 'Filters'],
                   'Search engines map your catalog from these signals'),
        'left': {'label': 'Rented', 'title': 'Paid shopping ads', 'neg': True, 'items': ['Pay for every click', 'Traffic stops when budget stops', 'Costs rise with competition', 'Competitors can outbid you', 'No lasting asset']},
        'right': {'label': 'Owned', 'title': 'Ecommerce SEO', 'items': ['Earned, compounding traffic', 'Category &amp; product rankings', 'Rich results with price &amp; reviews', 'Free Google Shopping listings', 'Lower acquisition cost over time']},
        'x': 'vs',
        'note': '<b>SEO and paid shopping work best together.</b> We use your ad and sales data to find the terms that convert, then build organic rankings for them so you can rely less on paid clicks over time.',
    },
    'shots': {
        'h2': 'Where Shoppers Find Your Products',
        'p': 'Three places buyers discover and compare products. We work to put your store in each of them.',
        'shots': [
            ('Search results', 'g', f'''          <div class="g-search"><span>outdoor roller skates for women</span>{icon('search', 14, '2.4')}</div>
          <div class="g-tabs"><b>All</b><span>Shopping</span><span>Images</span><span>Videos</span></div>
          <div class="rr on"><div class="g-url"><i></i>yourstore.com › skates › outdoor</div><div class="g-t">Women’s Outdoor Roller Skates | YourStore</div>
            <div class="rich"><span class="stars">★★★★★</span><b>4.8</b>(96) · <b>$89–$189</b> · In stock</div>
            <p>Shop 40+ outdoor skates with soft wheels for rough surfaces. Free shipping and 30-day returns.</p></div>
          <div class="rr"><div class="g-url"><i></i>bigretailer.com › sports</div><div class="g-t">Roller Skates - Big Retailer</div><div class="sline w80"></div></div>''',
             'Google Search', 'Category and product pages with rich results. We optimize titles, content and schema so your listings stand out.'),
            ('Shopping', 'g', f'''          <div class="g-search"><span>beginner roller skates</span>{icon('search', 14, '2.4')}</div>
          <div class="g-tabs"><span>All</span><b>Shopping</b><span>Images</span></div>
          <div class="prg">
            <div class="pr on"><div class="im">{icon('bag', 22, '1.6')}</div><b>Outdoor Skates</b><strong>$129.00</strong><span class="stars">★★★★★</span><small>YourStore</small></div>
            <div class="pr"><div class="im">{icon('bag', 22, '1.6')}</div><b>Classic Skates</b><strong>$99.00</strong><span class="stars">★★★★</span><small>Store B</small></div>
            <div class="pr"><div class="im">{icon('bag', 22, '1.6')}</div><b>Kids’ Skates</b><strong>$64.00</strong><span class="stars">★★★★</span><small>Store C</small></div>
            <div class="pr"><div class="im">{icon('bag', 22, '1.6')}</div><b>Skate Pads</b><strong>$24.00</strong><span class="stars">★★★★★</span><small>YourStore</small></div>
            <div class="pr"><div class="im">{icon('bag', 22, '1.6')}</div><b>Soft Wheels</b><strong>$39.00</strong><span class="stars">★★★★</span><small>Store D</small></div>
            <div class="pr"><div class="im">{icon('bag', 22, '1.6')}</div><b>Skate Bag</b><strong>$29.00</strong><span class="stars">★★★★</span><small>Store B</small></div>
          </div>''', 'Google Shopping', 'Free product listings from your Merchant Center feed. We clean up the feed and keep it consistent with your product pages.'),
            ('AI assistant', 'c', f'''          <aside class="c-side"><div class="c-new">+ New chat</div><b>Today</b><span class="on">Skates for beginners</span><span>Gift ideas under $150</span><b>Yesterday</b><span>Weekend plans</span></aside>
          <div class="c-main">
            <div class="c-user">What are good outdoor roller skates for a beginner?</div>
            <div class="c-ai">
              <div class="c-av">{icon('spark', 11, '2')}</div>
              <div>
                <p>Look for soft wheels and good ankle support:</p>
                <p><b>1. <mark>YourStore Outdoor Skates</mark></b>: soft 78A wheels, padded boot, $129.</p>
                <p><b>2. Option B</b>: cheaper, harder wheels.</p>
                <span class="c-cite">yourstore.com</span>
              </div>
            </div>
            <div class="c-input"><span>+</span><em>Ask anything</em><i>{icon('up', 12, '2.6')}</i></div>
          </div>''', 'AI shopping answers', 'ChatGPT, Gemini and Google’s AI Mode recommend products. Clear specs, reviews and schema help yours get named.'),
        ],
    },
    'services': {
        'h2': 'Ecommerce SEO Services We Provide',
        'p': 'Everything a store needs to rank and sell, built on the same technical and content foundation as our core <a href="/#services" style="color:var(--blue);font-weight:600;">SEO services</a>.',
        'cards': [
            ('target', 'Ecommerce SEO Audit &amp; Strategy', 'A full crawl of your store covering indexation, duplicate content, site architecture, speed and competitors, turned into a roadmap prioritized by revenue potential.', ('Get a free store check', '#audit')),
            ('grid', 'Category Page Optimization', 'Category and collection pages built to rank for commercial terms, with helpful copy, internal links and filters that don’t get in the way.'),
            ('bag', 'Product Page Optimization', 'Unique titles, descriptions, images, specs, reviews and FAQs that replace thin manufacturer copy and convert better.'),
            ('code', 'Technical Ecommerce SEO', 'Crawl efficiency, faceted navigation, canonicals, pagination, out-of-stock handling and Core Web Vitals, fixed at scale.'),
            ('star', 'Product Schema &amp; Rich Results', 'Product, offer, review and breadcrumb markup that makes listings eligible for price, availability and rating rich results.'),
            ('store', 'Shopify &amp; WooCommerce SEO', 'Platform-specific fixes for duplicate collection URLs, theme speed, app bloat and template limits.'),
            ('search', 'Keyword &amp; Competitor Research', 'Commercial, product and long-tail terms mapped to the right pages, plus where competitors win traffic you don’t.'),
            ('book', 'Buying Guides &amp; Content', 'Guides, comparisons and how-to content that reach research-stage shoppers and link them to the right products.'),
            ('filter', 'Merchant Center Feed Optimization', 'Feed titles, attributes and policies optimized for free Google Shopping listings and kept consistent with your site.'),
        ],
    },
    'framework': {
        'h2': 'The Search Engine Xperts Ecommerce SEO Framework',
        'p': 'Six stages that connect technical health, category and product optimization, and revenue.',
        'stages': [
            ('search', 'Audit', 'We crawl the store, review indexation and Search Console data, and identify which categories and products drive or could drive revenue.', ['Technical crawl', 'Indexation', 'Revenue by page']),
            ('grid', 'Architect', 'We plan a clean category structure, internal linking and rules for filters and parameters so search engines spend time on pages that matter.', ['Site structure', 'Faceted navigation', 'Internal links']),
            ('sliders', 'Optimize', 'Category and product pages get stronger titles, copy, images, schema and FAQs, starting with the pages closest to page one.', ['Category pages', 'Product pages', 'Schema']),
            ('megaphone', 'Build Authority', 'Buying guides, comparison content and digital PR earn links and send authority to your most valuable categories.', ['Buying guides', 'Digital PR', 'Links']),
            ('chart', 'Measure', 'We track organic revenue, transactions and conversion rate in GA4, plus rankings and clicks by category in Search Console.', ['Organic revenue', 'Rankings', 'Conversions']),
            ('refresh', 'Improve', 'Monthly refinement for new products, seasonal demand, stock changes and the opportunities the data shows.', ['Seasonality', 'New products', 'Reporting']),
        ],
    },
    'stack': {
        'h2': 'Ecommerce Rankings Are Built in Layers', 'p': 'Each layer supports the one above it.',
        'layers': [('trend', 'Organic revenue'), ('link', 'Authority &amp; links'), ('book', 'Buying guides &amp; content'),
                   ('grid', 'Category &amp; product optimization'), ('code', 'Technical SEO &amp; site structure')],
        'outs': [('search', 'Google Search', 'Category &amp; product results'), ('star', 'Rich results', 'Price, stock &amp; ratings'),
                 ('bag', 'Google Shopping', 'Free listings'), ('spark', 'AI shopping answers', 'ChatGPT, Gemini &amp; AI Mode')],
    },
    'who': {
        'h2': 'Who Needs Ecommerce SEO?',
        'p': 'Any store that wants more sales without paying for every click. Here’s where it typically makes the biggest difference.',
        'cards': [
            ('store', 'Shopify Stores', 'Duplicate collection URLs and theme speed issues are common. Fixing them often unlocks quick gains.'),
            ('cart', 'WooCommerce Stores', 'Plugin conflicts, thin category pages and slow hosting can hold rankings back.'),
            ('heart', 'Direct-to-Consumer Brands', 'Organic traffic lowers your dependence on rising social and search ad costs.'),
            ('box', 'Large Catalog Retailers', 'Thousands of products need scalable templates, crawl control and smart internal linking.'),
            ('trend', 'Brands Leaving Marketplaces', 'Own your customers by building search visibility for your own store.'),
            ('briefcase', 'B2B Ecommerce', 'Detailed specs, part numbers and technical content help buyers find exactly what they need.'),
            ('target', 'Niche &amp; Specialty Stores', 'Deep expertise and focused categories can outrank bigger generalist retailers.'),
            ('globe', 'International Stores', 'Multiple currencies and languages need hreflang and a clear market structure.'),
        ],
    },
    'why': {
        'h2': 'Why Stores Choose Search Engine Xperts', 'p': 'How our approach compares with a typical SEO agency.',
        'rows': [
            WHO_RUNS,
            ('chart', 'What drives strategy', 'Traffic goals only', 'Pages prioritized by revenue potential'),
            ('bag', 'Product descriptions', 'Manufacturer copy left as is', 'Unique, buyer-focused copy for key products'),
            ('code', 'Technical SEO', 'Plugin defaults', 'Filters, canonicals and speed handled properly'),
            ('target', 'Reporting', 'Rankings and traffic only', 'Organic revenue and conversions in GA4'),
            TACTICS,
        ],
    },
    'audit': {
        'eyebrow': 'Free ecommerce SEO audit', 'h2': 'Find Out What’s Costing Your Store Organic Sales',
        'p': 'We’ll check your store’s indexation, category and product pages, and technical health, then send you a plan prioritized by revenue impact.',
        'checks': ['Indexation &amp; duplicate content check', 'Category &amp; product page review', 'Technical &amp; speed snapshot', 'Revenue-prioritized 90-day plan'],
        'button': 'Get My Ecommerce SEO Audit', 'mail_subject': 'Free ecommerce SEO audit request', 'mail_label': 'free ecommerce SEO audit',
    },
    'faq': {
        'h2': 'Frequently Asked Questions About Ecommerce SEO',
        'p': 'The questions store owners ask most before starting ecommerce SEO.',
        'items': [
            ('What is ecommerce SEO?', 'Ecommerce SEO is the process of improving an online store’s category, product and content pages so they rank for the searches shoppers make when they are ready to buy, and making sure search engines can crawl and understand the store properly.'),
            ('How long does ecommerce SEO take?', 'Technical fixes and improvements to pages already near page one can show results within weeks. Larger gains in category rankings and organic revenue usually build over four to six months and keep compounding.'),
            ('Do you work with Shopify and WooCommerce?', 'Yes. We work with Shopify, WooCommerce and custom-built stores, and handle each platform’s common issues, such as duplicate collection URLs on Shopify or plugin bloat on WooCommerce.'),
            ('Do I need unique descriptions for every product?', 'Not always at once. We start with your best-selling and highest-potential products and your category pages, then expand. Copying manufacturer descriptions makes it hard to stand out from every other store selling the same item.'),
            ('How should out-of-stock products be handled?', 'If the product is coming back, keep the page live, show the stock status and suggest alternatives. If it is gone for good, redirect to the closest relevant product or category, or remove the page if there is no good match.'),
            ('What is faceted navigation and why does it matter?', 'Faceted navigation is filtering by size, color, price and so on. Each filter combination can create a new URL, producing thousands of near-duplicate pages. We decide which filtered pages deserve to rank and keep the rest out of the index.'),
            ('Will SEO help my Google Shopping listings?', 'Yes. Google shows free product listings from your Merchant Center feed. We optimize feed titles and attributes and keep them consistent with your product pages and structured data.'),
            ('Can you help with a store migration?', 'Yes. We map every old URL to its new one, preserve on-page optimization and check redirects, schema and indexation after launch, so you keep the rankings you have earned.'),
            ('How do you measure ecommerce SEO success?', 'By organic revenue, transactions and conversion rate in Google Analytics, supported by rankings, impressions and clicks for your categories and products in Search Console.'),
            ('Does ecommerce SEO help with AI shopping answers?', 'Yes. AI assistants recommend products using clear specs, reviews, structured data and mentions across the web. The same work that helps you rank in Google improves the chance your products are recommended.'),
        ],
    },
    'final': {
        'kicker': 'Free store audit', 'h2': 'See what’s holding your store back.',
        'p': 'We review your store’s technical health, categories and products, then send a plan prioritized by revenue impact.',
        'core': 'Your store',
        'nodes': [('search', 'Google'), ('bag', 'Shopping'), ('star', 'Rich results'), ('spark', 'AI answers'), ('grid', 'Categories')],
    },
}

# ======================================================================
# BACKLINKS & DIGITAL PR
# ======================================================================
LINKS = {
    'slug': 'backlinks-digital-pr-services',
    'title': 'Link Building & Digital PR Services | Search Engine Xperts',
    'og_title': 'Backlinks & Digital PR: Earn Links That Build Real Authority',
    'description': 'White-hat link building and digital PR that earn editorial backlinks from relevant, authoritative sites. No PBNs or link farms. Get a free backlink audit.',
    'crumb': 'Backlinks &amp; Digital PR',
    'service_type': 'Link Building &amp; Digital PR Services',
    'schema_description': 'White-hat link building and digital PR services covering digital PR campaigns, editorial link building, backlink audits, expert commentary, linkable asset creation, competitor link gap analysis, unlinked mention reclamation, local and niche citations and anchor text strategy.',
    'mobile_cta': 'Get My Free Backlink Audit',
    'cases_order': ['Shuraa', 'Roller Skate USA', 'Personal Drivers', 'DFW Turf Solutions'],
    'case_subject': 'Link%20building%20case%20study%20request',
    'hero': {
        'tag_icon': 'link', 'tag': 'Editorial links only. No PBNs, no link farms',
        'h1': 'Backlinks &amp; Digital PR: Earn Links That Build Real Authority.',
        'lead': 'We earn editorial backlinks and press mentions from relevant, trusted publications through real outreach and newsworthy content: the authority signals Google and AI systems rely on.',
        'cta': 'Get My Free Backlink Audit', 'cta2': 'See Our Link Building Process',
        'stats': STATS,
        'float': ('shield', '100% white-hat links', 'No paid link schemes'),
        'visual': f'''      <div class="vt-box" style="margin-top:0">
        <div class="vt-ah">{icon('trend', 13, '2.1')} Referring domains · sample campaign</div>
        <div class="vt-chart-h"><b>+64 domains</b><em>in 6 months</em></div>
        <svg class="vt-chart" viewBox="0 0 300 84" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="rdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A6CFF" stop-opacity=".55"/><stop offset="1" stop-color="#4A6CFF" stop-opacity="0"/></linearGradient></defs>
          <g stroke="rgba(255,255,255,.08)"><path d="M0 21h300M0 42h300M0 63h300"/></g>
          <path d="M0 74 L50 70 L100 62 L150 52 L200 38 L250 26 L300 12 L300 84 L0 84Z" fill="url(#rdg)"/>
          <path d="M0 74 L50 70 L100 62 L150 52 L200 38 L250 26 L300 12" fill="none" stroke="#7FA0FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="300" cy="12" r="4" fill="#fff"/>
        </svg>
      </div>
      {vt_list('Recently earned links', 'Sample campaign', [
          ('news', 'Industry publication', 'Expert quote feature', 'cited', 'Live'),
          ('globe', 'Regional news site', 'Data story coverage', 'cited', 'Live'),
          ('book', 'Resource page', 'Guide cited as a source', 'ment', 'Linked'),
          ('mic', 'Trade podcast', 'Guest interview', 'track', 'In progress'),
      ])}''',
    },
    'trust': [('link', 'Editorial backlinks'), ('news', 'Digital PR &amp; press mentions'),
              ('target', 'Relevant, niche-matched sites'), ('shield', 'White-hat, guideline-safe')],
    'landscape': {
        'eyebrow': 'Why links still matter',
        'h2': 'Authority Decides Who Ranks When Content Is Equal',
        'p': 'When several pages answer a search equally well, trust signals tip the balance, and links from respected sites are among the strongest. AI systems also lean toward brands that credible sources already mention.',
        'stages': [
            ('Then', 'Link quantity', 'Directories, link swaps and paid placements worked, until Google learned to ignore and penalize them.'),
            ('Now', 'Link quality', 'Relevant, editorially placed links from real sites carry the weight. Hundreds of weak links don’t.'),
            ('Growing', 'Brand mentions', 'Being discussed by trusted publications builds recognition, with or without a link.'),
            ('Next', 'AI citations', 'AI answers draw on sources that credible sites reference, making earned coverage even more valuable.'),
        ],
    },
    'definition': {
        'h2': 'What Are Backlinks and Digital PR?',
        'p': ['A backlink is a link from another website to yours. Search engines treat relevant, editorially given links as a vote of confidence, which helps your pages rank. Digital PR is a way to earn those links, and brand mentions, by creating stories, data and expert commentary that journalists and publishers want to cover.',
              'The difference between earning and buying matters. Google’s spam policies prohibit buying links or exchanging them to manipulate rankings. Links earned on merit are safer, last longer and send real referral traffic.'],
        'entity': ('Your brand', 'authority', ['News sites', 'Industry blogs', 'Podcasts', 'Local press', 'Resources', 'Partners'],
                   'Trusted sources that mention and link to your brand'),
        'left': {'label': 'Risky', 'title': 'Link buying', 'neg': True, 'items': ['Paid placements on link farms', 'PBNs &amp; spun guest posts', 'Irrelevant, low-traffic sites', 'Exact-match anchor spam', 'Penalty and devaluation risk']},
        'right': {'label': 'Sustainable', 'title': 'Earned links', 'items': ['Editorial links from real publications', 'Data-led stories &amp; expert quotes', 'Niche and locally relevant sites', 'Natural, branded anchor text', 'Brand mentions AI systems trust']},
        'x': 'vs',
        'note': '<b>Links come easier when there is something worth linking to.</b> We pair outreach with linkable assets (original data, useful tools, in-depth guides and expert commentary) so publishers have a real reason to cite you.',
    },
    'shots': {
        'h2': 'Where Your Brand Gets Mentioned',
        'p': 'Three kinds of coverage that build authority. Our work is aimed at earning each one.',
        'shots': [
            ('Online publication', 'g', f'''          <div class="art-k">INDUSTRY NEWS</div>
          <div class="art-h">Small businesses are changing how they hire, new survey finds</div>
          <div class="art-by">By a staff reporter · 4 min read</div>
          <p class="art-p">More than half of owners plan to hire in the next year, <a>according to a survey by YourBrand</a> of 1,200 businesses across the country.</p>
          <div class="art-q">“Hiring is back, but owners are more selective,” said YourBrand’s head of research.</div>
          <div class="sline w80"></div><div class="sline w60"></div>''', 'News and trade publications', 'Original data and expert commentary earn coverage, and editorial links, from publications your buyers read.'),
            ('Resource page', 'g', f'''          <div class="res-h">The best resources for new business owners</div>
          <div class="res-sub">Updated this month · Industry blog</div>
          <ul class="res">
            <li class="on"><span>1</span><div><b>YourBrand: Hiring cost calculator</b><small>A free tool for estimating the true cost of a new hire.</small></div></li>
            <li><span>2</span><div><b>Government small business guide</b><small>Official registration and tax guidance.</small></div></li>
            <li><span>3</span><div><b>Industry association toolkit</b><small>Templates and checklists.</small></div></li>
          </ul>''', 'Industry blogs and resource pages', 'Useful tools and guides get recommended on the pages your audience already trusts.'),
            ('Answer engine', 'a', f'''          <div class="a-q">How many small businesses plan to hire this year?</div>
          <div class="a-lbl">{icon('list', 12, '2.2')}Sources</div>
          <div class="a-srcs">
            <div class="on"><small>Hiring survey 2026</small><span><i>Y</i>yourbrand.com</span></div>
            <div><small>Small business news</small><span><i>N</i>news site</span></div>
            <div><small>Hiring trends report</small><span><i>T</i>trade journal</span></div>
          </div>
          <div class="a-lbl">{icon('spark', 12)}Answer</div>
          <p class="a-ans">A recent survey by <mark>YourBrand</mark> found more than half of owners plan to hire <sup>1</sup>, a finding also reported in the business press <sup>2</sup>.</p>
          <div class="a-follow"><em>Ask a follow-up</em><i>{icon('up', 12, '2.6')}</i></div>''', 'AI answers', 'Coverage on credible sites makes your brand and research more likely to be cited in AI-generated answers.'),
        ],
    },
    'services': {
        'h2': 'Link Building &amp; Digital PR Services We Provide',
        'p': 'Every link is earned on merit and placed in real editorial context. Links work best alongside our other <a href="/#services" style="color:var(--blue);font-weight:600;">SEO services</a>.',
        'cards': [
            ('megaphone', 'Digital PR Campaigns', 'Data studies, surveys and newsworthy stories pitched to journalists, earning coverage and links from national, trade and local publications.', ('Get a free backlink check', '#audit')),
            ('link', 'Editorial Link Building', 'Personalized outreach to relevant sites for contextual links on real pages that get traffic.'),
            ('shield', 'Backlink Audit &amp; Risk Review', 'We review your link profile for risky patterns and spam, and only recommend a disavow when it is genuinely needed.'),
            ('mic', 'Expert Commentary', 'We position your team as expert sources for journalist requests, earning quotes and links in news coverage.'),
            ('book', 'Linkable Asset Creation', 'Original research, calculators, templates and in-depth guides that people want to reference and share.'),
            ('search', 'Competitor Link Gap Analysis', 'We find the sites linking to your competitors but not to you, and go after the best of them.'),
            ('refresh', 'Unlinked Mentions &amp; Link Reclamation', 'Turning existing brand mentions into links and recovering links lost to broken pages and redirects.'),
            ('pin', 'Local &amp; Niche Citations', 'Relevant local, industry and association listings that support local rankings and topical relevance.'),
            ('move', 'Anchor Text &amp; Internal Linking', 'Natural anchor profiles and internal links that pass authority to the pages that need it most.'),
        ],
    },
    'framework': {
        'h2': 'The Search Engine Xperts Link Building Process',
        'p': 'Six stages that turn outreach into lasting authority, with every link earned on merit.',
        'stages': [
            ('search', 'Audit', 'We review your backlink profile, compare it with competitors and find the authority gaps holding your key pages back.', ['Link profile', 'Competitor gap', 'Risk review']),
            ('target', 'Plan', 'We choose target pages, story angles and publications, and build a prospect list of relevant, real sites.', ['Target pages', 'Story angles', 'Prospects']),
            ('edit', 'Create', 'We produce the linkable asset: original data, a useful tool, a definitive guide or expert commentary.', ['Original data', 'Tools', 'Guides']),
            ('megaphone', 'Outreach', 'Personalized pitches to journalists, editors and site owners, plus responses to relevant journalist requests.', ['Digital PR', 'Journalist requests', 'Outreach']),
            ('chart', 'Measure', 'We report every live link and mention, referring domain growth, referral traffic and ranking movement for target pages.', ['Live links', 'Referral traffic', 'Rankings']),
            ('refresh', 'Improve', 'We double down on the angles and outlets that work and refresh assets to keep earning links over time.', ['Iteration', 'Asset refresh', 'Reporting']),
        ],
    },
    'stack': {
        'h2': 'Rankings Need Both Relevance and Authority', 'p': 'Each layer supports the one above it.',
        'layers': [('trend', 'Top rankings &amp; AI citations'), ('megaphone', 'Digital PR &amp; brand mentions'), ('link', 'Editorial backlinks'),
                   ('book', 'Linkable content'), ('code', 'Technical &amp; on-page SEO')],
        'outs': [('search', 'Google rankings', 'Classic results'), ('spark', 'AI Overviews', 'Summaries in Google'),
                 ('chat', 'ChatGPT &amp; Gemini', 'Chat answers'), ('users', 'Referral traffic', 'Readers who click through')],
    },
    'who': {
        'h2': 'Who Needs Link Building &amp; Digital PR?',
        'p': 'Any site competing for valuable searches against better-known competitors.',
        'cards': [
            ('rocket', 'New Websites', 'A new domain has no authority yet. The right first links speed up everything else.'),
            ('monitor', 'SaaS Companies', 'Competitive software keywords are often decided by authority as much as by content.'),
            ('cart', 'Ecommerce Brands', 'Links to category pages and gift guides lift the pages that drive sales.'),
            ('home', 'Local Businesses', 'Local news, sponsorships and community links build prominence in your area.'),
            ('briefcase', 'Professional Services', 'Expert commentary and press mentions build credibility with search engines and clients.'),
            ('heart', 'Health &amp; Finance', 'High-trust topics reward mentions from credible, authoritative sources.'),
            ('alert', 'Penalty Recovery', 'Cleaning up a risky link profile and replacing it with earned links.'),
            ('globe', 'Brands Entering New Markets', 'Coverage in each market’s own publications builds local relevance.'),
        ],
    },
    'why': {
        'h2': 'Why Brands Choose Search Engine Xperts', 'p': 'How our approach compares with a typical link building vendor.',
        'rows': [
            WHO_RUNS,
            ('globe', 'Link sources', 'Link farms and PBNs', 'Real publications with real readers'),
            ('target', 'Relevance', 'Any site that will sell a link', 'Sites matched to your niche and audience'),
            ('edit', 'Content', 'Spun guest posts', 'Original data and expert commentary'),
            ('chart', 'Reporting', 'A count of links', 'Every live link, plus ranking impact'),
            TACTICS,
        ],
    },
    'audit': {
        'eyebrow': 'Free backlink audit', 'h2': 'Find Out Where Your Authority Gaps Are',
        'p': 'We’ll review your backlink profile against your top competitors, flag risky links and send you a prioritized link-building plan.',
        'checks': ['Backlink profile health check', 'Competitor link gap analysis', 'Risky &amp; toxic link review', 'Prioritized link-building plan'],
        'button': 'Get My Free Backlink Audit', 'mail_subject': 'Free backlink audit request', 'mail_label': 'free backlink audit',
    },
    'faq': {
        'h2': 'Frequently Asked Questions About Link Building &amp; Digital PR',
        'p': 'The questions people ask most before starting link building.',
        'items': [
            ('What is link building?', 'Link building is the process of earning links from other websites to yours. Relevant links from trusted sites act as votes of confidence that help search engines decide which pages deserve to rank.'),
            ('What is digital PR?', 'Digital PR uses newsworthy content, such as original data, expert commentary and stories, to earn coverage and links from online publications. It builds rankings and brand awareness at the same time.'),
            ('Are backlinks still important for SEO?', 'Yes. Content quality and relevance come first, but links from respected sites remain one of the clearest signals of authority, especially in competitive markets.'),
            ('Do you buy links?', 'No. Buying links to manipulate rankings breaks Google’s spam policies and puts your site at risk. Every link we build is earned through outreach, PR and content worth referencing.'),
            ('Do you use PBNs or guest post networks?', 'No. Private blog networks and mass guest-post sites are exactly the patterns Google’s link spam systems target. We only pursue links on real sites with real audiences.'),
            ('How many backlinks do I need?', 'There is no fixed number. It depends on your competitors and the pages you want to rank. A handful of relevant, authoritative links often does more than hundreds of weak ones.'),
            ('How long before links affect rankings?', 'Search engines need time to find and weigh new links, so the impact usually builds over two to six months. The effect is cumulative: each good link strengthens the next.'),
            ('What makes a backlink high quality?', 'Relevance to your topic, a trustworthy site with real traffic, an editorial placement within useful content, and natural anchor text. A link a real reader might click is usually a good sign.'),
            ('Should I disavow bad links?', 'Usually not. Google says most sites never need to disavow, because it ignores most spammy links. We recommend a disavow only for a manual action or a clear history of paid or manipulative links.'),
            ('Do backlinks help with AI search visibility?', 'Indirectly, yes. AI systems tend to cite and describe brands that credible sources already mention. Earned coverage strengthens both your rankings and that wider reputation.'),
        ],
    },
    'final': {
        'kicker': 'Free authority audit', 'h2': 'See how your authority compares.',
        'p': 'We review your backlink profile against your competitors, flag the risks and send a plan to earn the links you are missing.',
        'core': 'Your brand',
        'nodes': [('news', 'News sites'), ('book', 'Industry blogs'), ('mic', 'Podcasts'), ('list', 'Resources'), ('spark', 'AI answers')],
    },
}

# ======================================================================
# SEO CONTENT WRITING
# ======================================================================
CONTENT = {
    'slug': 'seo-content-writing-services',
    'title': 'SEO Content Writing Services | Search Engine Xperts',
    'og_title': 'SEO Content Writing: Content That Ranks, Gets Cited and Converts',
    'description': 'SEO content writing for blogs, service pages and product copy: researched, human-edited and built for search intent and AI search. Get a free content audit.',
    'crumb': 'SEO Content Writing',
    'service_type': 'SEO Content Writing Services',
    'schema_description': 'SEO content writing services covering content strategy and topic clusters, blog posts and articles, service and landing page copy, product and category descriptions, content audits and refreshes, on-page optimization, answer-ready content, expert-led content and location page content.',
    'mobile_cta': 'Get My Free Content Audit',
    'cases_order': ['Shuraa', 'Roller Skate USA', 'Personal Drivers', 'DFW Turf Solutions'],
    'case_subject': 'SEO%20content%20case%20study%20request',
    'hero': {
        'tag_icon': 'edit', 'tag': 'Human-written, expert-reviewed content',
        'h1': 'SEO Content Writing: Content That Ranks, Gets Cited and Converts.',
        'lead': 'We research, write and optimize blog posts, service pages and guides around real search intent, so your content earns rankings, AI citations and enquiries, not just word count.',
        'cta': 'Get My Free Content Audit', 'cta2': 'See Our Content Process',
        'stats': STATS,
        'float': ('trend', '10.3K organic clicks', 'shuraa.com'),
        'visual': f'''      <div class="vt-doc"><span class="di">{icon('doc', 18)}</span><div><b>How much does a kitchen remodel cost in 2026?</b><small>Informational</small><small>Pillar: Remodeling costs</small></div></div>
      <div class="vt-box">
        <div class="vt-ah">{icon('chart', 13, '2.1')} Content review · sample brief</div>
        <div class="vt-score">
          <svg class="ring" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="7"/><circle cx="32" cy="32" r="26" fill="none" stroke="#4A6CFF" stroke-width="7" stroke-linecap="round" stroke-dasharray="163.4" stroke-dashoffset="16" transform="rotate(-90 32 32)"/><text x="32" y="37" text-anchor="middle" fill="#fff" font-family="Poppins,sans-serif" font-size="15" font-weight="700">90</text></svg>
          <p><b>Ready to publish.</b> Covers the questions searchers ask, with sources and a clear next step.</p>
        </div>
        <div class="vt-bars"><div><span>Intent match</span><i style="--w:94%"></i></div><div><span>Topic coverage</span><i style="--w:88%"></i></div></div>
      </div>
      {vt_list('Optimization checklist', 'Sample brief', [
          ('target', 'Search intent', 'Answer in the first paragraph', 'cited', 'Done'),
          ('list', 'Headings &amp; FAQs', 'Questions from real searches', 'cited', 'Done'),
          ('user', 'Expert review', 'Named author &amp; sources', 'ment', 'Reviewed'),
          ('link', 'Internal links &amp; schema', 'Links to service pages', 'track', 'In progress'),
      ])}''',
    },
    'trust': [('edit', 'Blog posts &amp; articles'), ('doc', 'Service &amp; landing pages'),
              ('bag', 'Product &amp; category copy'), ('user', 'Human-written &amp; fact-checked')],
    'landscape': {
        'eyebrow': 'Why content quality matters',
        'h2': 'Thin Content No Longer Ranks or Gets Cited',
        'p': 'Google’s guidance rewards helpful, people-first content, and AI answer engines quote sources that answer clearly and credibly. Generic, mass-produced articles are easier to ignore than ever.',
        'stages': [
            ('Then', 'Keyword stuffing', 'Pages were written around exact keywords repeated again and again, for search engines rather than readers.'),
            ('Now', 'Helpful content', 'Google rewards pages that fully answer the searcher’s question and show real experience.'),
            ('Growing', 'Answer extraction', 'AI Overviews and answer engines pull clear, well-structured passages straight into their answers.'),
            ('Next', 'Expertise wins', 'Original insight, named experts and first-hand experience separate you from AI-generated noise.'),
        ],
    },
    'definition': {
        'h2': 'What Is SEO Content Writing?',
        'p': ['SEO content writing is creating web content that answers what searchers are looking for, in a structure that search engines and AI systems can understand, so it ranks and earns clicks. It combines keyword and intent research with clear writing, on-page optimization and evidence of real experience.',
              'Good SEO content doesn’t read like it was written for a robot. It leads with the answer, covers the topic thoroughly, cites its sources, shows who wrote it and why they are qualified, and guides the reader to a clear next step.'],
        'entity': ('Your topic', 'content cluster', ['Pillar page', 'Guides', 'FAQs', 'Service pages', 'Case studies', 'Glossary'],
                   'Connected content that builds topical authority'),
        'left': {'label': 'Volume-first', 'title': 'Generic content', 'neg': True, 'items': ['Written to hit a word count', 'Keywords forced in', 'Rewritten from the top results', 'No author or sources', 'No clear next step']},
        'right': {'label': 'Intent-first', 'title': 'SEO content', 'items': ['Built on search intent research', 'Answer-first, scannable structure', 'Original insight &amp; first-hand experience', 'Named, qualified authors &amp; sources', 'Internal links and conversion paths']},
        'x': 'vs',
        'note': '<b>We use AI tools carefully, never as a shortcut.</b> Research and outlines may be AI-assisted, but every piece is written or rewritten, edited and fact-checked by a person before it goes live.',
    },
    'shots': {
        'h2': 'Where Great Content Shows Up',
        'p': 'Three places well-structured content earns visibility. We write and format every piece to compete for them.',
        'shots': [
            ('Search results', 'g', f'''          <div class="g-search"><span>how long does a kitchen remodel take</span>{icon('search', 14, '2.4')}</div>
          <div class="g-tabs"><b>All</b><span>Images</span><span>Videos</span><span>News</span></div>
          <div class="fs">
            <p>A typical kitchen remodel takes <b>6 to 12 weeks</b>:</p>
            <ol><li>Design and planning: 2–4 weeks</li><li>Demolition and rough-in: 1–2 weeks</li><li>Cabinets, counters and finishes: 3–6 weeks</li></ol>
            <div class="src"><i>Y</i><span><b>yourbrand.com</b> › kitchen-remodel-timeline</span></div>
          </div>
          <div class="g-res"><div class="g-url"><i></i>homeblog.com › kitchens</div><div class="g-t">Kitchen remodel timeline explained</div><div class="sline w80"></div></div>''',
             'Featured snippets', 'Clear, answer-first sections can be shown at the top of the results. We structure content to compete for them.'),
            ('Search results', 'g', f'''          <div class="paa-h">People also ask</div>
          <ul class="paa">
            <li class="open"><div class="q">How much does a small kitchen remodel cost? {icon('x', 12)}</div>
              <p>Most small kitchen remodels cost between $15,000 and $40,000, depending on cabinets, counters and whether plumbing moves.</p>
              <small>yourbrand.com › kitchen-remodel-cost</small></li>
            <li>Is it cheaper to reface or replace cabinets? {icon('arrow', 12)}</li>
            <li>What adds the most value to a kitchen? {icon('arrow', 12)}</li>
            <li>Can you live at home during a remodel? {icon('arrow', 12)}</li>
          </ul>''', 'People also ask', 'We answer the follow-up questions searchers really ask, giving you more chances to appear on page one.'),
            ('Search results', 'g', f'''          <div class="g-search"><span>kitchen remodel cost 2026</span>{icon('search', 14, '2.4')}</div>
          <div class="g-aio">
            <div class="g-aio-h">{icon('spark', 14)}AI Overview</div>
            <div class="g-aio-row">
              <p>Costs depend on size and finishes. <mark>YourBrand</mark> breaks a typical project into cabinets (about a third), labor, counters and appliances.</p>
              <div class="g-srcs">
                <div class="on"><i>Y</i><span>yourbrand.com</span><small>Remodel cost guide</small></div>
                <div><i>H</i><span>home magazine</span><small>Budget tips</small></div>
              </div>
            </div>
          </div>
          <div class="g-res"><div class="g-url"><i></i>yourbrand.com › guides</div><div class="g-t">Kitchen remodel cost guide (2026)</div><div class="sline w80"></div></div>''',
             'AI Overviews', 'Well-sourced, clearly structured content is easier for AI Overviews and answer engines to cite.'),
        ],
    },
    'services': {
        'h2': 'SEO Content Writing Services We Provide',
        'p': 'Content for every stage of the buyer’s journey, built to work with our technical and <a href="/ai-seo-services" style="color:var(--blue);font-weight:600;">AI SEO</a> work.',
        'cards': [
            ('grid', 'Content Strategy &amp; Topic Clusters', 'Keyword and intent research turned into a plan of pillar pages and supporting articles that build topical authority, not random posts.', ('Get a free content check', '#audit')),
            ('edit', 'Blog Posts &amp; Articles', 'In-depth, researched articles that answer real questions, earn rankings and lead readers toward your services.'),
            ('doc', 'Service &amp; Landing Page Copy', 'Pages that rank for commercial searches and convert visitors, with clear benefits, proof and calls to action.'),
            ('bag', 'Product &amp; Category Descriptions', 'Unique, buyer-focused copy for ecommerce pages that replaces thin manufacturer text.'),
            ('refresh', 'Content Audits &amp; Refreshes', 'We find decaying, thin and overlapping pages, then update, merge or retire them to recover lost traffic.'),
            ('sliders', 'On-Page Optimization', 'Titles, meta descriptions, headings, internal links and schema optimized on new and existing content.'),
            ('spark', 'Answer-Ready Content', 'Definitions, FAQ blocks and clear structure that help your content appear in featured snippets, AI Overviews and answer engines.'),
            ('user', 'Expert-Led Content', 'Interviews with your team, named authors and cited sources that show real experience and build E-E-A-T.'),
            ('pin', 'Local &amp; Location Content', 'Useful location and service-area pages with genuine local detail, not templated copies.'),
        ],
    },
    'framework': {
        'h2': 'The Search Engine Xperts Content Process',
        'p': 'Six stages from research to results, the same process behind every article and page we write.',
        'stages': [
            ('search', 'Research', 'We study search intent, the current top results, competitor gaps and the questions your customers ask.', ['Keyword research', 'Search intent', 'Gap analysis']),
            ('grid', 'Plan', 'Topics are organized into clusters with a detailed brief for each piece: angle, outline, entities, sources and internal links.', ['Topic clusters', 'Content briefs', 'Internal links']),
            ('edit', 'Write', 'Writers matched to your industry draft the content, using interviews with your team for first-hand insight.', ['Expert writers', 'Interviews', 'Original insight']),
            ('sliders', 'Optimize', 'We edit for clarity and accuracy, then optimize titles, headings, FAQs, internal links and schema.', ['Editing', 'Fact-checking', 'On-page SEO']),
            ('chart', 'Measure', 'We track rankings, clicks, engagement and conversions for every piece, and watch for AI Overview appearances.', ['Rankings', 'Conversions', 'AI visibility']),
            ('refresh', 'Refresh', 'Content is updated as results, facts and search behavior change, so it keeps ranking instead of slowly decaying.', ['Content updates', 'Pruning', 'Reporting']),
        ],
    },
    'stack': {
        'h2': 'Content That Ranks Is Built in Layers', 'p': 'Each layer supports the one above it.',
        'layers': [('trend', 'Rankings, citations &amp; leads'), ('link', 'Authority &amp; internal links'), ('user', 'Expertise &amp; original insight'),
                   ('doc', 'Intent-matched, well-structured content'), ('search', 'Keyword &amp; topic research')],
        'outs': [('search', 'Google rankings', 'Classic results'), ('list', 'Featured snippets', 'Answer boxes'),
                 ('spark', 'AI Overviews', 'Summaries in Google'), ('chat', 'ChatGPT &amp; Perplexity', 'Cited sources')],
    },
    'who': {
        'h2': 'Who Needs SEO Content Writing?',
        'p': 'Any business that wants search traffic to turn into customers. Here’s where good content pays off most.',
        'cards': [
            ('monitor', 'SaaS Companies', 'Comparison, use-case and how-to content reaches buyers throughout long research cycles.'),
            ('cart', 'Ecommerce Brands', 'Category copy, product descriptions and buying guides help shoppers choose and buy.'),
            ('home', 'Local Businesses', 'Service and location pages answer what nearby customers search for before they call.'),
            ('briefcase', 'Professional Services', 'Expert articles build trust in high-consideration services like legal, finance and consulting.'),
            ('layers', 'B2B Companies', 'In-depth guides and resources support every stage of a multi-person buying decision.'),
            ('heart', 'Healthcare', 'Accurate, well-sourced content with clear authorship, supporting (not replacing) clinical review.'),
            ('scale', 'Financial Services', 'Clear, careful explanations of complex topics build credibility in a regulated space.'),
            ('rocket', 'Startups &amp; New Sites', 'A planned content foundation builds topical authority from the start.'),
        ],
    },
    'why': {
        'h2': 'Why Brands Choose Search Engine Xperts', 'p': 'How our approach compares with a typical content agency.',
        'rows': [
            WHO_RUNS,
            ('edit', 'Writers', 'Generalist freelancers', 'Writers matched to your industry'),
            ('eye', 'AI-written content', 'Published unedited', 'Written, edited and fact-checked by a person'),
            ('search', 'Research', 'Rewrites of the top results', 'Intent, SERP and gap research for every piece'),
            ('chart', 'Reporting', 'Word count delivered', 'Rankings, clicks and conversions'),
            TACTICS,
        ],
    },
    'audit': {
        'eyebrow': 'Free content audit', 'h2': 'Find Out Which Content Is Holding You Back',
        'p': 'We’ll review your existing content for decay, overlap and gaps against your competitors, then send you a prioritized content plan.',
        'checks': ['Content performance &amp; decay review', 'Keyword cannibalization check', 'Topic gap analysis vs competitors', 'Prioritized content plan'],
        'button': 'Get My Free Content Audit', 'mail_subject': 'Free content audit request', 'mail_label': 'free content audit',
    },
    'faq': {
        'h2': 'Frequently Asked Questions About SEO Content Writing',
        'p': 'The questions people ask most before starting SEO content.',
        'items': [
            ('What is SEO content writing?', 'SEO content writing is creating web content that matches what people search for, structured so search engines and AI systems can understand it, and written so readers trust it and act on it.'),
            ('How is SEO content different from regular copywriting?', 'It starts with research into what people actually search for and what currently ranks, then shapes the structure, headings and coverage around that intent. Regular copywriting usually starts from what the business wants to say.'),
            ('Do you use AI to write content?', 'We may use AI tools for research and outlines, but every piece is written or rewritten, edited and fact-checked by a person. Unedited AI content tends to be generic and lacks the first-hand expertise that ranks.'),
            ('How long should SEO articles be?', 'As long as it takes to answer the question well, and no longer. Google has said there is no preferred word count. We set length based on the topic and what searchers need.'),
            ('How many articles do I need each month?', 'It depends on your goals and competition. A few strong, well-planned pieces each month usually beat a high volume of thin posts. We recommend a pace in the content plan.'),
            ('Do you write for my industry?', 'We match writers to your industry and interview your team for first-hand insight. For specialist topics such as health or finance, we recommend a review by your own qualified experts before publishing.'),
            ('How long until content ranks?', 'New content typically takes two to six months to reach its potential, depending on competition and your site’s authority. Updates to existing pages often show results faster.'),
            ('Do you update existing content?', 'Yes. Refreshing, merging and improving existing pages is often the fastest way to grow traffic, because those pages already have some history and authority.'),
            ('Can content help me appear in AI answers?', 'Yes. Clear, well-structured, well-sourced content is easier for AI Overviews and answer engines to extract and cite. We format content with that in mind.'),
            ('What is included with each piece of content?', 'Each piece includes research, a brief, writing, editing and fact-checking, plus an SEO title, meta description, internal link suggestions and FAQ markup where it makes sense.'),
        ],
    },
    'final': {
        'kicker': 'Free content audit', 'h2': 'See what your content could earn.',
        'p': 'We review your existing content, find the gaps and quick wins, then send a prioritized content plan.',
        'core': 'Your content',
        'nodes': [('search', 'Google'), ('list', 'Snippets'), ('spark', 'AI Overviews'), ('chat', 'ChatGPT'), ('globe', 'Perplexity')],
    },
}

PAGES = [LOCAL, GMB, ECOM, LINKS, CONTENT]

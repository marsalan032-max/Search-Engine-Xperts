// Turns the raw data from /api/fetch-page into SEO checks. Runs in the browser (uses DOMParser).
// Each check has a status, an explanation and, when it isn't passing, a fix.
// `weight` (1–3) is how much the check matters; it drives the score and the priority order.

export type FetchResult = {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  redirects: { url: string; status: number; location: string }[];
  timeMs: number;
  bytes: number;
  truncated: boolean;
  contentType: string;
  headers: Record<string, string>;
  html: string;
  robots: { url: string; status: number; body: string; error?: string };
  sitemap: { declared: string[]; url: string; status: number; isXml: boolean; index: boolean; locs: number };
  httpRedirectsToHttps: boolean | null;
  checkedAt: string;
};

export type Status = 'pass' | 'warn' | 'fail' | 'info';
export type Scope = 'onpage' | 'technical';
export type Check = { id: string; scope: Scope; group: string; title: string; status: Status; detail: string; fix?: string; weight: 1 | 2 | 3 };

export type PageData = {
  title: string; description: string; canonical: string; lang: string; robotsMeta: string;
  h1: string[]; headings: { level: number; text: string }[];
  words: number; internalLinks: number; externalLinks: number; nofollowLinks: number; emptyAnchors: number;
  images: number; imagesNoAlt: number; schemaTypes: string[];
  og: Record<string, string>; hreflang: { lang: string; href: string }[];
  scripts: number; firstWords: string;
};

export type Report = { data: PageData; checks: Check[]; score: number; counts: Record<Status, number> };

// ---------- robots.txt ----------
type Group = { agents: string[]; rules: { allow: boolean; path: string }[] };

export function parseRobots(body: string): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  let lastWasAgent = false;
  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, '').trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase(), value = m[2].trim();
    if (key === 'user-agent') {
      if (!current || !lastWasAgent) { current = { agents: [], rules: [] }; groups.push(current); }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if (key === 'allow' || key === 'disallow') {
      if (current) current.rules.push({ allow: key === 'allow', path: value });
      lastWasAgent = false;
    } else lastWasAgent = false;
  }
  return groups;
}

const patternToRegex = (p: string) =>
  new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));

/** Google-style evaluation: the most specific user-agent group, then the longest matching rule (allow wins ties). */
export function robotsAllows(groups: Group[], agent: string, pathAndQuery: string): { allowed: boolean; rule?: string } {
  const a = agent.toLowerCase();
  let group = groups.find(g => g.agents.includes(a));
  if (!group) group = groups.find(g => g.agents.includes('*'));
  if (!group) return { allowed: true };
  let best: { allow: boolean; path: string } | undefined;
  for (const r of group.rules) {
    if (!r.path) continue; // "Disallow:" with no value allows everything
    if (!patternToRegex(r.path).test(pathAndQuery)) continue;
    if (!best || r.path.length > best.path.length || (r.path.length === best.path.length && r.allow)) best = r;
  }
  return best ? { allowed: best.allow, rule: `${best.allow ? 'Allow' : 'Disallow'}: ${best.path}` } : { allowed: true };
}

// ---------- helpers ----------
const clean = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;

function extract(doc: Document, base: URL): PageData {
  const meta = (sel: string) => clean(doc.querySelector(sel)?.getAttribute('content'));
  const headings = [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ level: Number(h.tagName[1]), text: clean(h.textContent) }));

  let internalLinks = 0, externalLinks = 0, nofollowLinks = 0, emptyAnchors = 0;
  for (const a of doc.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href') ?? '';
    if (/^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    let u: URL; try { u = new URL(href, base); } catch { continue; }
    if (u.hostname.replace(/^www\./, '') === base.hostname.replace(/^www\./, '')) internalLinks++; else externalLinks++;
    if (/nofollow/i.test(a.getAttribute('rel') ?? '')) nofollowLinks++;
    if (!clean(a.textContent) && !a.querySelector('img[alt]:not([alt=""])') && !a.getAttribute('aria-label')) emptyAnchors++;
  }

  const imgs = [...doc.querySelectorAll('img')];
  const schemaTypes: string[] = [];
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const walk = (n: unknown): void => {
        if (Array.isArray(n)) { n.forEach(walk); return; }
        if (n && typeof n === 'object') {
          const o = n as Record<string, unknown>;
          if (o['@type']) ([] as unknown[]).concat(o['@type']).forEach(t => schemaTypes.push(String(t)));
          if (o['@graph']) walk(o['@graph']);
        }
      };
      walk(JSON.parse(s.textContent ?? ''));
    } catch { schemaTypes.push('⚠ invalid JSON-LD'); }
  }
  for (const el of doc.querySelectorAll('[itemtype]')) schemaTypes.push((el.getAttribute('itemtype') ?? '').split('/').pop() + ' (microdata)');

  const body = doc.body?.cloneNode(true) as HTMLElement | undefined;
  body?.querySelectorAll('script,style,noscript,template,svg').forEach(n => n.remove());
  const text = clean(body?.textContent);
  const og: Record<string, string> = {};
  for (const m of doc.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')) og[(m.getAttribute('property') ?? m.getAttribute('name'))!] = clean(m.getAttribute('content'));

  return {
    title: clean(doc.querySelector('title')?.textContent),
    description: meta('meta[name="description" i]'),
    canonical: clean(doc.querySelector('link[rel="canonical" i]')?.getAttribute('href')),
    lang: clean(doc.documentElement.getAttribute('lang')),
    robotsMeta: [meta('meta[name="robots" i]'), meta('meta[name="googlebot" i]')].filter(Boolean).join(', '),
    h1: headings.filter(h => h.level === 1).map(h => h.text),
    headings,
    words: text ? text.split(' ').length : 0,
    internalLinks, externalLinks, nofollowLinks, emptyAnchors,
    images: imgs.length,
    imagesNoAlt: imgs.filter(i => !i.hasAttribute('alt')).length,
    schemaTypes: [...new Set(schemaTypes)],
    og,
    hreflang: [...doc.querySelectorAll('link[rel="alternate" i][hreflang]')].map(l => ({ lang: l.getAttribute('hreflang') ?? '', href: l.getAttribute('href') ?? '' })),
    scripts: doc.querySelectorAll('script[src]').length,
    firstWords: text.split(' ').slice(0, 100).join(' '),
  };
}

// ---------- the checks ----------
export function analyze(r: FetchResult, keyword = ''): Report {
  const doc = new DOMParser().parseFromString(r.html || '<html><body></body></html>', 'text/html');
  const base = new URL(r.finalUrl);
  const d = extract(doc, base);
  const checks: Check[] = [];
  const add = (c: Check) => checks.push(c);
  const isHtml = /html/i.test(r.contentType) || (!r.contentType && !!r.html);

  // ===== technical: response =====
  add(r.status === 200
    ? { id: 'status', scope: 'technical', group: 'Response', weight: 3, status: 'pass', title: 'Page returns 200 OK', detail: 'The final URL responds with HTTP 200, so it can be indexed.' }
    : { id: 'status', scope: 'technical', group: 'Response', weight: 3, status: 'fail', title: `Page returns HTTP ${r.status}`, detail: `Search engines only index pages that return 200. This one returned ${r.status}.`, fix: r.status >= 500 ? 'Fix the server error; persistent 5xx responses cause pages to drop out of the index.' : r.status === 404 || r.status === 410 ? 'If this page should exist, restore it or redirect the URL to its replacement.' : 'Make sure the page returns 200 to normal visitors and crawlers.' });

  const hops = r.redirects.length;
  add(hops === 0
    ? { id: 'redirects', scope: 'technical', group: 'Response', weight: 2, status: 'pass', title: 'No redirects', detail: 'The URL resolves directly without redirecting.' }
    : hops === 1
      ? { id: 'redirects', scope: 'technical', group: 'Response', weight: 2, status: [301, 308].includes(r.redirects[0].status) ? 'info' : 'warn', title: `1 redirect (${r.redirects[0].status})`, detail: `${r.redirects[0].url} → ${r.redirects[0].location}`, fix: [301, 308].includes(r.redirects[0].status) ? 'Link directly to the final URL internally so visitors and crawlers skip the redirect.' : 'Use a permanent (301 or 308) redirect unless the move really is temporary.' }
      : { id: 'redirects', scope: 'technical', group: 'Response', weight: 2, status: 'warn', title: `Redirect chain of ${hops} hops`, detail: r.redirects.map(x => `${x.status}: ${x.url}`).join(' → ') + ` → ${r.finalUrl}`, fix: 'Point the first URL (and every internal link) straight at the final URL in a single redirect.' });

  const t = r.timeMs;
  add({ id: 'speed', scope: 'technical', group: 'Response', weight: 2, status: t < 800 ? 'pass' : t < 1800 ? 'warn' : 'fail', title: `Server response: ${t} ms`, detail: 'Time for our server to receive the page response (measured from our server, so treat it as a rough guide).', fix: t < 800 ? undefined : 'Add page caching or a CDN, and check hosting and database performance. Slow responses delay everything else, including LCP.' });

  add({ id: 'size', scope: 'technical', group: 'Response', weight: 1, status: r.bytes < 400_000 ? 'pass' : r.bytes < 1_200_000 ? 'warn' : 'fail', title: `HTML size: ${kb(r.bytes)}${r.truncated ? '+' : ''}`, detail: 'The size of the HTML document alone, before images, CSS and scripts.', fix: r.bytes < 400_000 ? undefined : 'Large HTML is often caused by inlined data, huge menus or embedded SVG/JSON. Trim it so the page parses faster.' });

  const enc = r.headers['content-encoding'];
  add({ id: 'compression', scope: 'technical', group: 'Response', weight: 1, status: enc ? 'pass' : 'warn', title: enc ? `Compressed (${enc})` : 'No compression detected', detail: enc ? 'The response is compressed, which reduces transfer time.' : 'The server did not report gzip or Brotli compression for this HTML.', fix: enc ? undefined : 'Enable Brotli or gzip compression for HTML, CSS and JavaScript on your server or CDN.' });

  // ===== technical: security =====
  const https = base.protocol === 'https:';
  add({ id: 'https', scope: 'technical', group: 'Security', weight: 3, status: https ? 'pass' : 'fail', title: https ? 'Served over HTTPS' : 'Not served over HTTPS', detail: https ? 'The final URL uses a secure connection.' : 'The page loads over plain HTTP.', fix: https ? undefined : 'Install a TLS certificate and redirect every HTTP URL to its HTTPS version.' });
  if (https && r.httpRedirectsToHttps !== null) add({ id: 'http-redirect', scope: 'technical', group: 'Security', weight: 2, status: r.httpRedirectsToHttps ? 'pass' : 'warn', title: r.httpRedirectsToHttps ? 'HTTP redirects to HTTPS' : 'HTTP version doesn’t redirect to HTTPS', detail: r.httpRedirectsToHttps ? 'Requests to the http:// version are redirected to https://.' : 'The http:// version of this URL did not redirect to https://, which can create duplicate pages.', fix: r.httpRedirectsToHttps ? undefined : 'Add a site-wide 301 redirect from HTTP to HTTPS.' });
  if (https) add({ id: 'hsts', scope: 'technical', group: 'Security', weight: 1, status: r.headers['strict-transport-security'] ? 'pass' : 'info', title: r.headers['strict-transport-security'] ? 'HSTS header present' : 'No HSTS header', detail: 'HSTS tells browsers to always use HTTPS for your domain.', fix: r.headers['strict-transport-security'] ? undefined : 'Consider adding a Strict-Transport-Security header once HTTPS works everywhere.' });
  if (https && isHtml) {
    const mixed = [...doc.querySelectorAll('img[src^="http:"],script[src^="http:"],link[rel="stylesheet"][href^="http:"],iframe[src^="http:"]')].length;
    add({ id: 'mixed', scope: 'technical', group: 'Security', weight: 2, status: mixed ? 'warn' : 'pass', title: mixed ? `${plural(mixed, 'insecure resource')} on an HTTPS page` : 'No mixed content', detail: mixed ? 'Images, scripts or styles are loaded over http://, which browsers may block.' : 'All images, scripts and styles referenced in the HTML use HTTPS.', fix: mixed ? 'Change these resource URLs to https:// (or protocol-relative paths).' : undefined });
  }

  // ===== technical: crawl & index =====
  const groups = parseRobots(r.robots.body);
  const path = base.pathname + base.search;
  if (r.robots.status === 200) {
    const g = robotsAllows(groups, 'googlebot', path);
    add({ id: 'robots-google', scope: 'technical', group: 'Crawl & index', weight: 3, status: g.allowed ? 'pass' : 'fail', title: g.allowed ? 'Googlebot is allowed by robots.txt' : 'robots.txt blocks Googlebot from this URL', detail: g.allowed ? `robots.txt at ${r.robots.url} allows this URL.` : `Matched rule: ${g.rule}`, fix: g.allowed ? undefined : 'Remove or narrow the Disallow rule if this page should appear in search.' });
  } else {
    add({ id: 'robots-google', scope: 'technical', group: 'Crawl & index', weight: 1, status: r.robots.status === 404 ? 'info' : 'warn', title: r.robots.status === 404 ? 'No robots.txt file' : `robots.txt returned ${r.robots.status || 'an error'}`, detail: r.robots.status === 404 ? 'Without a robots.txt, crawlers may fetch everything. That’s fine for small sites.' : 'If robots.txt returns a server error, Google may pause crawling the site.', fix: r.robots.status === 404 ? 'Add a simple robots.txt that lists your sitemap.' : 'Make robots.txt return 200 (or 404 if you don’t want one).' });
  }

  const xRobots = r.headers['x-robots-tag'] ?? '';
  const noindex = /noindex|none/i.test(d.robotsMeta) || /noindex|none/i.test(xRobots);
  add({ id: 'noindex', scope: 'technical', group: 'Crawl & index', weight: 3, status: noindex ? 'fail' : 'pass', title: noindex ? 'Page is set to noindex' : 'Page is indexable', detail: noindex ? `Found: ${[d.robotsMeta && `meta robots “${d.robotsMeta}”`, xRobots && `X-Robots-Tag “${xRobots}”`].filter(Boolean).join(' and ')}` : 'No noindex directive in the meta robots tag or X-Robots-Tag header.', fix: noindex ? 'Remove the noindex directive if this page should appear in search results.' : undefined });
  if (/nofollow/i.test(d.robotsMeta)) add({ id: 'nofollow-meta', scope: 'technical', group: 'Crawl & index', weight: 2, status: 'warn', title: 'Meta robots nofollow', detail: 'Search engines are asked not to follow any links on this page.', fix: 'Remove “nofollow” from the meta robots tag unless you have a specific reason.' });

  if (isHtml) {
    if (!d.canonical) add({ id: 'canonical', scope: 'technical', group: 'Crawl & index', weight: 2, status: 'warn', title: 'No canonical tag', detail: 'Without a canonical, Google picks the preferred URL itself when duplicates exist (e.g. with tracking parameters).', fix: `Add <link rel="canonical" href="${r.finalUrl}"> to the <head>.` });
    else {
      let canon: URL | null = null; try { canon = new URL(d.canonical, base); } catch { /* invalid */ }
      const self = canon && canon.href.replace(/\/$/, '') === base.href.replace(/[?#].*$/, '').replace(/\/$/, '');
      add(!canon
        ? { id: 'canonical', scope: 'technical', group: 'Crawl & index', weight: 2, status: 'fail', title: 'Invalid canonical URL', detail: `“${d.canonical}” isn’t a valid URL.`, fix: 'Use an absolute URL in the canonical tag.' }
        : self
          ? { id: 'canonical', scope: 'technical', group: 'Crawl & index', weight: 2, status: 'pass', title: 'Self-referencing canonical', detail: canon.href }
          : { id: 'canonical', scope: 'technical', group: 'Crawl & index', weight: 2, status: 'warn', title: 'Canonical points to another URL', detail: `Canonical: ${canon.href}. Google will usually index that URL instead of this one.`, fix: 'Fine if this is a duplicate on purpose. If this page should rank, make the canonical point to itself.' });
    }
  }

  if (r.sitemap.status === 200 && r.sitemap.isXml) add({ id: 'sitemap', scope: 'technical', group: 'Crawl & index', weight: 2, status: 'pass', title: `XML sitemap found${r.sitemap.declared.length ? ' (declared in robots.txt)' : ''}`, detail: `${r.sitemap.url} — ${r.sitemap.index ? `sitemap index with ${plural(r.sitemap.locs, 'sitemap')}` : plural(r.sitemap.locs, 'URL')}${r.sitemap.declared.length ? '' : '. It isn’t listed in robots.txt.'}`, fix: r.sitemap.declared.length ? undefined : `Add “Sitemap: ${r.sitemap.url}” to robots.txt.` });
  else add({ id: 'sitemap', scope: 'technical', group: 'Crawl & index', weight: 2, status: 'warn', title: 'No XML sitemap found', detail: r.sitemap.declared.length ? `robots.txt declares ${r.sitemap.declared[0]}, but it didn’t return a valid XML sitemap.` : 'No sitemap declared in robots.txt and none at /sitemap.xml.', fix: 'Generate an XML sitemap of your canonical, indexable URLs, list it in robots.txt and submit it in Search Console.' });

  if (isHtml) {
    const lowText = d.words < 80 && d.scripts > 5;
    add({ id: 'rendering', scope: 'technical', group: 'Crawl & index', weight: 2, status: lowText ? 'warn' : 'pass', title: lowText ? 'Content may depend on JavaScript' : 'Content is in the HTML', detail: lowText ? `Only ${d.words} words are in the initial HTML, with ${d.scripts} external scripts. The visible content is probably rendered by JavaScript.` : `${d.words} words of content are present in the initial HTML.`, fix: lowText ? 'Server-render or pre-render the main content so all crawlers (including AI crawlers that don’t run JavaScript) can read it.' : undefined });

    // ===== technical: mobile & international =====
    const viewport = clean(doc.querySelector('meta[name="viewport" i]')?.getAttribute('content'));
    add({ id: 'viewport', scope: 'technical', group: 'Mobile', weight: 3, status: /width=device-width/i.test(viewport) ? 'pass' : 'fail', title: viewport ? `Viewport: ${viewport}` : 'No viewport meta tag', detail: 'Google indexes the mobile version of pages; a responsive viewport is required for a usable mobile layout.', fix: /width=device-width/i.test(viewport) ? undefined : 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the <head>.' });
    add({ id: 'lang', scope: 'technical', group: 'International', weight: 1, status: d.lang ? 'pass' : 'warn', title: d.lang ? `Language declared: ${d.lang}` : 'No lang attribute', detail: 'The lang attribute on <html> tells browsers and assistive technology the page language.', fix: d.lang ? undefined : 'Add a lang attribute, e.g. <html lang="en">.' });
    if (d.hreflang.length) {
      const selfRef = d.hreflang.some(h => { try { return new URL(h.href, base).href.replace(/\/$/, '') === base.href.replace(/\/$/, ''); } catch { return false; } });
      add({ id: 'hreflang', scope: 'technical', group: 'International', weight: 2, status: selfRef ? 'pass' : 'warn', title: `${plural(d.hreflang.length, 'hreflang tag')}`, detail: d.hreflang.map(h => h.lang).join(', ') + (d.hreflang.some(h => h.lang === 'x-default') ? '' : ' (no x-default)'), fix: selfRef ? undefined : 'Each page’s hreflang set should include a tag pointing to itself.' });
    }
  }

  // ===== technical: AI & search crawlers =====
  if (r.robots.status === 200) {
    const bots = [['Bingbot', 'bingbot'], ['OAI-SearchBot (ChatGPT search)', 'oai-searchbot'], ['PerplexityBot', 'perplexitybot'], ['GPTBot (OpenAI training)', 'gptbot'], ['Google-Extended (Gemini training)', 'google-extended']] as const;
    const blocked = bots.filter(([, ua]) => !robotsAllows(groups, ua, path).allowed).map(([n]) => n);
    const searchBlocked = blocked.filter(n => !/training/.test(n));
    add({ id: 'ai-bots', scope: 'technical', group: 'AI crawlers', weight: 1, status: searchBlocked.length ? 'warn' : 'pass', title: blocked.length ? `robots.txt blocks: ${blocked.join(', ')}` : 'Search and AI crawlers are allowed', detail: 'Checked Bingbot, OAI-SearchBot, PerplexityBot, GPTBot and Google-Extended. Blocking training crawlers (GPTBot, Google-Extended) doesn’t affect search visibility; blocking search crawlers removes you from those answers.', fix: searchBlocked.length ? 'Allow the search crawlers you want to appear in (Bingbot powers Copilot; OAI-SearchBot powers ChatGPT search).' : undefined });
  }

  if (!isHtml) {
    add({ id: 'not-html', scope: 'onpage', group: 'Content', weight: 3, status: 'fail', title: `Not an HTML page (${r.contentType || 'unknown type'})`, detail: 'On-page checks need an HTML document.' });
    return finish(d, checks);
  }

  // ===== on-page: title & description =====
  const tl = d.title.length;
  add(!tl
    ? { id: 'title', scope: 'onpage', group: 'Title & description', weight: 3, status: 'fail', title: 'Missing title tag', detail: 'The <title> is the main headline in search results.', fix: 'Add a unique, descriptive title of about 50–60 characters that leads with the main topic.' }
    : { id: 'title', scope: 'onpage', group: 'Title & description', weight: 3, status: tl >= 25 && tl <= 62 ? 'pass' : 'warn', title: `Title: ${tl} characters`, detail: `“${d.title}”`, fix: tl < 25 ? 'Make the title more descriptive: include the main topic and what makes the page worth clicking.' : tl > 62 ? 'Shorten to about 60 characters so it isn’t cut off in results; put the important words first.' : undefined });
  const dl = d.description.length;
  add(!dl
    ? { id: 'description', scope: 'onpage', group: 'Title & description', weight: 2, status: 'warn', title: 'Missing meta description', detail: 'Google will generate a snippet from page text, which is often less persuasive.', fix: 'Write a 120–155 character summary of what the page offers and why to click.' }
    : { id: 'description', scope: 'onpage', group: 'Title & description', weight: 2, status: dl >= 70 && dl <= 160 ? 'pass' : 'warn', title: `Meta description: ${dl} characters`, detail: `“${d.description}”`, fix: dl < 70 ? 'Expand it to 120–155 characters with a clear benefit and call to action.' : dl > 160 ? 'Trim to about 155 characters so it isn’t truncated.' : undefined });

  // ===== on-page: headings =====
  add(d.h1.length === 1
    ? { id: 'h1', scope: 'onpage', group: 'Headings', weight: 3, status: 'pass', title: 'One H1 heading', detail: `“${d.h1[0]}”` }
    : d.h1.length === 0
      ? { id: 'h1', scope: 'onpage', group: 'Headings', weight: 3, status: 'fail', title: 'No H1 heading', detail: 'The H1 is the page’s main on-page headline.', fix: 'Add one H1 that states the page’s main topic in the words people search for.' }
      : { id: 'h1', scope: 'onpage', group: 'Headings', weight: 3, status: 'warn', title: `${d.h1.length} H1 headings`, detail: d.h1.map(h => `“${h}”`).join(', '), fix: 'Use one H1 for the main topic and H2s for sections.' });
  let skipped = 0;
  d.headings.forEach((h, i) => { if (i && h.level > d.headings[i - 1].level + 1) skipped++; });
  const h2 = d.headings.filter(h => h.level === 2).length;
  add({ id: 'outline', scope: 'onpage', group: 'Headings', weight: 1, status: skipped ? 'warn' : h2 ? 'pass' : 'warn', title: `${plural(d.headings.length, 'heading')}, ${h2} H2${h2 === 1 ? '' : 's'}`, detail: skipped ? `${plural(skipped, 'heading')} skip a level (e.g. H2 → H4).` : h2 ? 'Headings follow a logical order.' : 'No H2 sections; longer pages are easier to scan with clear section headings.', fix: skipped ? 'Keep heading levels in order so the outline makes sense to readers and screen readers.' : h2 ? undefined : 'Break content into sections with descriptive H2 headings.' });

  // ===== on-page: content =====
  add({ id: 'words', scope: 'onpage', group: 'Content', weight: 2, status: d.words >= 300 ? 'pass' : 'warn', title: `${d.words.toLocaleString()} words`, detail: 'Word count of visible text in the HTML (navigation and footer included).', fix: d.words >= 300 ? undefined : 'Thin pages rarely rank. Add substance that answers the searcher’s questions: details, examples, pricing, FAQs.' });

  // ===== on-page: links & images =====
  add({ id: 'internal-links', scope: 'onpage', group: 'Links', weight: 2, status: d.internalLinks >= 3 ? 'pass' : 'warn', title: `${plural(d.internalLinks, 'internal link')}, ${plural(d.externalLinks, 'external link')}`, detail: d.nofollowLinks ? `${plural(d.nofollowLinks, 'link')} marked nofollow.` : 'Internal links help visitors and crawlers find related pages.', fix: d.internalLinks >= 3 ? undefined : 'Link to related pages on your site with descriptive anchor text.' });
  if (d.emptyAnchors) add({ id: 'empty-anchors', scope: 'onpage', group: 'Links', weight: 1, status: 'warn', title: `${plural(d.emptyAnchors, 'link')} without text`, detail: 'Links with no text, image alt or aria-label give no context about their target.', fix: 'Add descriptive text, an aria-label, or alt text on linked images.' });
  add({ id: 'alt', scope: 'onpage', group: 'Images', weight: 1, status: d.imagesNoAlt ? 'warn' : 'pass', title: d.images ? `${d.images - d.imagesNoAlt} of ${plural(d.images, 'image')} have alt text` : 'No images in the HTML', detail: d.imagesNoAlt ? `${plural(d.imagesNoAlt, 'image')} have no alt attribute.` : 'Every image has an alt attribute.', fix: d.imagesNoAlt ? 'Describe meaningful images in alt text; use alt="" for decorative ones.' : undefined });

  // ===== on-page: social & schema =====
  const ogMissing = ['og:title', 'og:description', 'og:image'].filter(k => !d.og[k]);
  add({ id: 'og', scope: 'onpage', group: 'Social & schema', weight: 1, status: ogMissing.length ? 'warn' : 'pass', title: ogMissing.length ? `Missing ${ogMissing.join(', ')}` : 'Open Graph tags complete', detail: 'Open Graph tags control how the page looks when shared on LinkedIn, Facebook, Slack and WhatsApp.', fix: ogMissing.length ? 'Add og:title, og:description and a 1200×630 og:image.' : undefined });
  const invalid = d.schemaTypes.some(t => t.startsWith('⚠'));
  add({ id: 'schema', scope: 'onpage', group: 'Social & schema', weight: 2, status: invalid ? 'fail' : d.schemaTypes.length ? 'pass' : 'warn', title: d.schemaTypes.length ? `Structured data: ${d.schemaTypes.join(', ')}` : 'No structured data', detail: 'Structured data helps search engines and AI systems understand the page and can enable rich results.', fix: invalid ? 'Fix the JSON syntax error in your JSON-LD block.' : d.schemaTypes.length ? undefined : 'Add JSON-LD for the page type, e.g. Organization, LocalBusiness, Product, Article or FAQPage.' });

  // ===== on-page: target keyword =====
  const kw = keyword.trim().toLowerCase();
  if (kw) {
    const has = (s: string) => s.toLowerCase().includes(kw);
    const slug = decodeURIComponent(base.pathname).toLowerCase().replace(/[-_/]+/g, ' ');
    const places = [
      ['title', has(d.title), 3], ['H1', d.h1.some(has), 3], ['meta description', has(d.description), 1],
      ['URL', slug.includes(kw), 1], ['first 100 words', has(d.firstWords), 2], ['an H2', d.headings.some(h => h.level === 2 && has(h.text)), 1],
    ] as const;
    for (const [where, ok, weight] of places) add({ id: `kw-${where}`, scope: 'onpage', group: 'Target keyword', weight, status: ok ? 'pass' : 'warn', title: `“${keyword}” ${ok ? 'appears' : 'missing'} in ${where}`, detail: ok ? `Found in the ${where}.` : `The phrase doesn’t appear in the ${where}.`, fix: ok ? undefined : `Work “${keyword}” (or a close variant) naturally into the ${where} if it fits what the page is about.` });
  }

  return finish(d, checks);
}

function finish(data: PageData, checks: Check[]): Report {
  let got = 0, max = 0;
  const counts: Record<Status, number> = { pass: 0, warn: 0, fail: 0, info: 0 };
  for (const c of checks) {
    counts[c.status]++;
    if (c.status === 'info') continue;
    max += c.weight;
    got += c.weight * (c.status === 'pass' ? 1 : c.status === 'warn' ? 0.5 : 0);
  }
  return { data, checks, score: max ? Math.round((got / max) * 100) : 0, counts };
}

/** Score for a subset of checks (e.g. only on-page). */
export function scoreOf(checks: Check[]) { return finish({} as PageData, checks).score; }

/** Failing and warning checks, most important first. */
export const priorities = (checks: Check[]) =>
  checks.filter(c => c.status === 'fail' || c.status === 'warn')
    .sort((a, b) => (b.weight * (b.status === 'fail' ? 2 : 1)) - (a.weight * (a.status === 'fail' ? 2 : 1)));

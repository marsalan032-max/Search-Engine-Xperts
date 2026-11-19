import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

// Server-side page fetcher for the free SEO tools (/seo-tools/*).
// Browsers can't fetch other sites directly (CORS), so the tools call this route, which fetches
// the page, its redirect chain, robots.txt and sitemap, and returns the raw data. All analysis
// happens in the browser (components/tools/analyze.ts).
//
// Safety: only public http(s) URLs on ports 80/443; every hop's host is resolved and rejected if
// it points at a private, loopback or link-local address; 10 s timeout; 2 MB body cap;
// a simple per-IP rate limit. Set SEO_TOOLS_ALLOW_PRIVATE=1 only for local testing.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UA = 'Mozilla/5.0 (compatible; SearchEngineXpertsBot/1.0; +https://searchenginexperts.com/seo-tools)';
const MAX_HOPS = 6;
const MAX_BYTES = 2_000_000;
const TIMEOUT_MS = 10_000;
const allowPrivate = process.env.SEO_TOOLS_ALLOW_PRIVATE === '1';

// ---------- rate limit: 20 requests per minute per client IP ----------
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 20;
}

// ---------- address checks ----------
function privateV4(ip: string) {
  const [a, b] = ip.split('.').map(Number);
  return a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 198 && (b === 18 || b === 19));
}
function privateIp(ip: string) {
  if (isIP(ip) === 4) return privateV4(ip);
  const v = ip.toLowerCase();
  const mapped = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return privateV4(mapped[1]);
  return v === '::' || v === '::1' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe8') || v.startsWith('fe9') || v.startsWith('fea') || v.startsWith('feb') || v.startsWith('ff');
}

class UserError extends Error {}

async function assertPublic(url: URL) {
  if (!['http:', 'https:'].includes(url.protocol)) throw new UserError('Only http and https URLs can be checked.');
  if (allowPrivate) return; // local testing only: also skips the port check
  if (url.port && !['80', '443'].includes(url.port)) throw new UserError('Only standard ports (80 and 443) can be checked.');
  if (url.username || url.password) throw new UserError('URLs with login details can’t be checked.');
  const host = url.hostname.replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.internal') || host.endsWith('.local')) throw new UserError('That address isn’t publicly reachable.');
  let addrs: { address: string }[];
  try { addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true, verbatim: true }); }
  catch { throw new UserError(`We couldn’t find the domain “${host}”. Check the spelling.`); }
  if (!addrs.length || addrs.some(a => privateIp(a.address))) throw new UserError('That address isn’t publicly reachable.');
}

async function readCapped(res: Response, cap: number) {
  if (!res.body) return { text: '', bytes: 0, truncated: false };
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0, truncated = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > cap) { truncated = true; chunks.push(value.slice(0, value.byteLength - (bytes - cap))); await reader.cancel(); break; }
    chunks.push(value);
  }
  const buf = new Uint8Array(Math.min(bytes, cap));
  let o = 0; for (const c of chunks) { buf.set(c, o); o += c.byteLength; }
  return { text: new TextDecoder('utf-8', { fatal: false }).decode(buf), bytes, truncated };
}

const keepHeaders = ['content-type', 'content-encoding', 'content-length', 'cache-control', 'x-robots-tag', 'strict-transport-security', 'link', 'server', 'last-modified', 'vary', 'content-language'];
const pick = (h: Headers) => Object.fromEntries(keepHeaders.filter(k => h.has(k)).map(k => [k, h.get(k)!]));

async function get(url: URL, accept = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8') {
  await assertPublic(url);
  return fetch(url, { redirect: 'manual', headers: { 'user-agent': UA, accept, 'accept-language': 'en' }, signal: AbortSignal.timeout(TIMEOUT_MS), cache: 'no-store' });
}

// Follows redirects one hop at a time so every hop is checked.
async function follow(start: URL, accept?: string) {
  const redirects: { url: string; status: number; location: string }[] = [];
  let url = start;
  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    const t0 = Date.now();
    const res = await get(url, accept);
    const ms = Date.now() - t0;
    const loc = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && loc) {
      const next = new URL(loc, url);
      redirects.push({ url: url.href, status: res.status, location: next.href });
      await res.body?.cancel();
      if (redirects.some(r => r.url === next.href)) throw new UserError('This URL redirects in a loop.');
      url = next;
      continue;
    }
    return { res, url, redirects, ms };
  }
  throw new UserError(`Too many redirects (more than ${MAX_HOPS}).`);
}

async function robotsFor(origin: string) {
  try {
    const { res, url } = await follow(new URL('/robots.txt', origin), 'text/plain,*/*;q=0.8');
    const body = await readCapped(res, 500_000);
    return { url: url.href, status: res.status, body: res.ok ? body.text : '' };
  } catch (e) {
    return { url: `${origin}/robots.txt`, status: 0, body: '', error: e instanceof UserError ? e.message : 'Could not be fetched' };
  }
}

async function sitemapCheck(robotsBody: string, origin: string) {
  const declared = [...robotsBody.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map(m => m[1]);
  const target = declared[0] ?? `${origin}/sitemap.xml`;
  try {
    const { res, url } = await follow(new URL(target), 'application/xml,text/xml,*/*;q=0.8');
    const body = await readCapped(res, MAX_BYTES);
    const locs = (body.text.match(/<loc>/gi) ?? []).length;
    const index = /<sitemapindex/i.test(body.text);
    return { declared, url: url.href, status: res.status, isXml: /<(urlset|sitemapindex)/i.test(body.text), index, locs };
  } catch {
    return { declared, url: target, status: 0, isXml: false, index: false, locs: 0 };
  }
}

export async function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
  if (limited(ip)) return Response.json({ error: 'Too many checks in a short time. Please wait a minute and try again.' }, { status: 429 });

  let raw = new URL(req.url).searchParams.get('url')?.trim() ?? '';
  if (!raw) return Response.json({ error: 'Enter a URL to check.' }, { status: 400 });
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) && !/^https?:\/\//i.test(raw)) return Response.json({ error: 'Only http and https URLs can be checked.' }, { status: 400 });
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  let start: URL;
  try { start = new URL(raw); } catch { return Response.json({ error: 'That doesn’t look like a valid URL.' }, { status: 400 }); }
  start.hash = '';

  try {
    const { res, url, redirects, ms } = await follow(start);
    const ctype = res.headers.get('content-type') ?? '';
    const body = await readCapped(res, MAX_BYTES);
    const robots = await robotsFor(url.origin);
    const sitemap = await sitemapCheck(robots.body, url.origin);
    // Does plain http:// redirect to https://? (Only checked when the final URL is https.)
    let httpRedirectsToHttps: boolean | null = null;
    if (url.protocol === 'https:') {
      try {
        const http = new URL(url.href); http.protocol = 'http:';
        const r = await get(http);
        await r.body?.cancel();
        httpRedirectsToHttps = r.status >= 300 && r.status < 400 && (r.headers.get('location') ?? '').startsWith('https://');
      } catch { httpRedirectsToHttps = null; }
    }
    return Response.json({
      requestedUrl: start.href,
      finalUrl: url.href,
      status: res.status,
      redirects,
      timeMs: ms,
      bytes: body.bytes,
      truncated: body.truncated,
      contentType: ctype,
      headers: pick(res.headers),
      html: /html|xml/i.test(ctype) || !ctype ? body.text : '',
      robots,
      sitemap,
      httpRedirectsToHttps,
      checkedAt: new Date().toISOString(),
    }, { headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    const timeout = e instanceof Error && (e.name === 'TimeoutError' || e.name === 'AbortError');
    const message = e instanceof UserError ? e.message
      : timeout ? 'The site took longer than 10 seconds to respond.'
      : 'We couldn’t reach that site. It may be down, blocking automated requests, or the address may be wrong.';
    return Response.json({ error: message }, { status: 422 });
  }
}

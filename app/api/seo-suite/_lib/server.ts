// Server helpers for the SEO Suite API routes (/api/seo-suite/*).
//
// Two data sources:
//  - Google Autocomplete (free, no key): keyword ideas only, no volumes. Always available.
//  - DataForSEO (paid, optional): volume, CPC, competition, difficulty, intent, 12-month trend,
//    live SERP, domain overview and backlinks. Enabled when DATAFORSEO_LOGIN and
//    DATAFORSEO_PASSWORD are set in the hosting environment (e.g. Vercel → Settings →
//    Environment Variables). Each paid call is cached, rate limited per visitor and capped per day.

import { countryOf, guessIntent, type Country, type Intent, type KeywordRow } from '../../../../components/seo-suite/shared';

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;
export const liveData = () => Boolean(LOGIN && PASSWORD);

// Paid calls allowed per server instance per day (protects the DataForSEO balance).
const DAILY_LIMIT = Number(process.env.SEO_SUITE_DAILY_LIMIT || 300);
// Paid lookups each visitor may make per hour.
const HOURLY_PER_IP = Number(process.env.SEO_SUITE_HOURLY_PER_IP || 15);

export class UserError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export function fail(e: unknown) {
  if (e instanceof UserError) return json({ error: e.message }, e.status);
  console.error('[seo-suite]', e);
  return json({ error: 'The data source didn’t respond. Please try again in a moment.' }, 502);
}

export const clientIp = (req: Request) =>
  req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';

// ---------- rate limits (in memory, per server instance) ----------
const hits = new Map<string, number[]>();
export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs);
  if (recent.length >= max) return false;
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) hits.clear();
  return true;
}

let day = '', spent = 0;
function spendPaidCall(ip: string) {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) { day = today; spent = 0; }
  if (spent >= DAILY_LIMIT) throw new UserError('Today’s live data allowance has been used. Please try again tomorrow, or request a full audit from our team.', 429);
  if (!rateLimit(`paid:${ip}`, HOURLY_PER_IP, 3_600_000)) throw new UserError('You’ve reached the hourly limit for live lookups. Please try again later.', 429);
  spent++;
}

// ---------- cache ----------
const cache = new Map<string, { at: number; value: unknown }>();
const TTL = 12 * 3_600_000;
export async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.value as T;
  const value = await load();
  if (cache.size > 1000) cache.clear();
  cache.set(key, { at: Date.now(), value });
  return value;
}

// ---------- DataForSEO ----------
type Task<R> = { status_code?: number; status_message?: string; result?: R[] | null };
type Envelope<R> = { status_code?: number; status_message?: string; tasks?: Task<R>[] | null };

/** POST one task to DataForSEO and return its first result (or null). Counts against the limits. */
export async function dataforseo<R>(path: string, task: Record<string, unknown>, ip: string): Promise<R | null> {
  if (!liveData()) throw new UserError('Live data isn’t connected yet.', 503);
  spendPaidCall(ip);
  const res = await fetch(`https://api.dataforseo.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([task]),
    signal: AbortSignal.timeout(45_000),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`DataForSEO ${path} HTTP ${res.status}`);
  const body = (await res.json()) as Envelope<R>;
  const t = body.tasks?.[0];
  if (body.status_code !== 20000 || !t) throw new Error(`DataForSEO ${path}: ${body.status_code} ${body.status_message}`);
  // 40501/40503-style task errors are usually bad input (e.g. an invalid target).
  if (t.status_code !== 20000) {
    if (t.status_code && t.status_code >= 40000 && t.status_code < 50000 && t.status_code !== 40200 && t.status_code !== 40210)
      throw new UserError(t.status_message || 'The data source couldn’t process that request.', 422);
    throw new Error(`DataForSEO ${path}: task ${t.status_code} ${t.status_message}`);
  }
  return t.result?.[0] ?? null;
}

export function readCountry(url: URL): Country {
  return countryOf(url.searchParams.get('loc'));
}

export function readKeyword(url: URL): string {
  const q = (url.searchParams.get('q') ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
  if (!q) throw new UserError('Enter a keyword to research.');
  if (q.length > 80) throw new UserError('Keep the keyword under 80 characters.');
  return q;
}

// ---------- DataForSEO mapping ----------
type LabsItem = {
  keyword?: string | null;
  keyword_info?: { search_volume?: number | null; cpc?: number | null; competition?: number | null; monthly_searches?: { year?: number | null; month?: number | null; search_volume?: number | null }[] | null } | null;
  keyword_properties?: { keyword_difficulty?: number | null } | null;
  search_intent_info?: { main_intent?: string | null } | null;
};

const intentNames: Record<string, Intent> = {
  informational: 'Informational', commercial: 'Commercial', transactional: 'Transactional', navigational: 'Navigational',
};

export function toRow(item: LabsItem | null | undefined, fallback = ''): KeywordRow {
  const keyword = item?.keyword ?? fallback;
  const info = item?.keyword_info;
  const main = item?.search_intent_info?.main_intent?.toLowerCase() ?? '';
  return {
    keyword,
    volume: info?.search_volume ?? null,
    cpc: info?.cpc ?? null,
    competition: info?.competition ?? null,
    difficulty: item?.keyword_properties?.keyword_difficulty ?? null,
    intent: intentNames[main] ?? guessIntent(keyword),
  };
}

export function trendOf(item: LabsItem | null | undefined) {
  return (item?.keyword_info?.monthly_searches ?? [])
    .filter(m => m.year && m.month)
    .map(m => ({ year: m.year!, month: m.month!, volume: m.search_volume ?? 0 }))
    .sort((a, b) => a.year - b.year || a.month - b.month)
    .slice(-12);
}

export type { LabsItem };

// ---------- Google Autocomplete (free mode) ----------
async function suggest(q: string, c: Country): Promise<string[]> {
  const u = `https://suggestqueries.google.com/complete/search?client=firefox&ie=utf-8&oe=utf-8&hl=${c.hl}&gl=${c.gl}&q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(u, { signal: AbortSignal.timeout(5_000), headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SearchEngineXpertsBot/1.0; +https://searchenginexperts.com/seo-suite)' }, cache: 'no-store' });
    if (!res.ok) return [];
    const body = await res.json() as [string, string[]];
    return Array.isArray(body?.[1]) ? body[1] : [];
  } catch { return []; }
}

/** Autocomplete ideas: the seed, seed + a–z, and common question/commercial prefixes. */
export async function autocompleteIdeas(seed: string, c: Country): Promise<string[]> {
  const queries = [
    seed,
    ...'abcdefghijklmnopqrstuvwxyz'.split('').map(l => `${seed} ${l}`),
    ...['how', 'what', 'best', 'is', 'why', 'can'].map(p => `${p} ${seed}`),
    `${seed} vs`, `${seed} for`,
  ];
  const out: string[] = [];
  for (let i = 0; i < queries.length; i += 8) {
    const batch = await Promise.all(queries.slice(i, i + 8).map(q => suggest(q, c)));
    out.push(...batch.flat());
  }
  const seen = new Set<string>();
  return out.map(s => s.toLowerCase().trim()).filter(s => s && s !== seed && !seen.has(s) && (seen.add(s), true));
}

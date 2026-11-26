// Shared by the SEO Suite page (/seo-suite) and its API routes (/api/seo-suite/*).

export type Country = { code: number; name: string; gl: string; hl: string };

// `code` is the DataForSEO location code; `gl`/`hl` are the Google country and language
// used for autocomplete suggestions.
export const countries: Country[] = [
  { code: 2840, name: 'United States', gl: 'us', hl: 'en' },
  { code: 2826, name: 'United Kingdom', gl: 'gb', hl: 'en' },
  { code: 2124, name: 'Canada', gl: 'ca', hl: 'en' },
  { code: 2036, name: 'Australia', gl: 'au', hl: 'en' },
  { code: 2784, name: 'United Arab Emirates', gl: 'ae', hl: 'en' },
  { code: 2682, name: 'Saudi Arabia', gl: 'sa', hl: 'en' },
  { code: 2356, name: 'India', gl: 'in', hl: 'en' },
  { code: 2586, name: 'Pakistan', gl: 'pk', hl: 'en' },
  { code: 2554, name: 'New Zealand', gl: 'nz', hl: 'en' },
  { code: 2372, name: 'Ireland', gl: 'ie', hl: 'en' },
  { code: 2702, name: 'Singapore', gl: 'sg', hl: 'en' },
  { code: 2710, name: 'South Africa', gl: 'za', hl: 'en' },
];

export const countryOf = (code: number | string | null | undefined) =>
  countries.find(c => c.code === Number(code)) ?? countries[0];

export type Intent = 'Informational' | 'Commercial' | 'Transactional' | 'Navigational' | 'Local';

export type KeywordRow = {
  keyword: string;
  volume: number | null;
  cpc: number | null;
  competition: number | null; // 0–1 paid competition
  difficulty: number | null;  // 0–100 keyword difficulty
  intent: Intent;
};

export type TrendPoint = { year: number; month: number; volume: number };

export type KeywordResponse = {
  mode: 'live' | 'basic';
  seed: KeywordRow;
  trend: TrendPoint[];
  rows: KeywordRow[];
};

export type SerpRow = { rank: number; title: string; url: string; domain: string };
export type SerpResponse = { rows: SerpRow[]; total: number | null; features: string[] };

export type DomainResponse = {
  target: string;
  overview: { keywords: number; traffic: number; pos1: number; pos2to3: number; pos4to10: number; pos11to20: number } | null;
  keywords: { keyword: string; position: number | null; volume: number | null; traffic: number | null; url: string }[];
};

export type BacklinksResponse = {
  target: string;
  summary: { rank: number | null; backlinks: number | null; referringDomains: number | null; referringIps: number | null; broken: number | null; nofollow: number | null } | null;
  domains: { domain: string; rank: number | null; backlinks: number | null; firstSeen: string | null }[];
};

// Rule-based intent for keywords without provider data (same signals as the free keyword tool).
const intentRules: [Intent, RegExp][] = [
  ['Local', /\b(near me|in my area|open now|nearby)\b/],
  ['Informational', /^(what|how|why|when|which|who|is|are|can|do|does|should)\b/],
  ['Transactional', /\b(buy|price|prices|pricing|cost|costs|cheap|affordable|quote|hire|order|deals?|discount|coupon|services?|company|agency|book|for sale|free trial|download)\b/],
  ['Commercial', /\b(best|top|vs|versus|review|reviews|alternatives?|comparison|compare|pros and cons|tools?|software)\b/],
  ['Navigational', /\b(login|log in|sign in|website|official|app)\b/],
  ['Informational', /.*/],
];
export const guessIntent = (kw: string): Intent => intentRules.find(([, re]) => re.test(kw.toLowerCase()))![0];

/** Normalize a domain or URL the user typed into a bare host ("https://www.x.com/a" → "x.com"). */
export function cleanDomain(input: string): string | null {
  let s = input.trim().toLowerCase();
  if (!s) return null;
  if (!/^https?:\/\//.test(s)) s = `https://${s}`;
  try {
    const host = new URL(s).hostname.replace(/^www\./, '');
    return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host) ? host : null;
  } catch { return null; }
}

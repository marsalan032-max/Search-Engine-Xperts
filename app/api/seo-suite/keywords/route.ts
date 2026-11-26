import { autocompleteIdeas, cached, clientIp, dataforseo, fail, json, liveData, rateLimit, readCountry, readKeyword, toRow, trendOf, UserError, type LabsItem } from '../_lib/server';
import { guessIntent, type KeywordResponse } from '../../../../components/seo-suite/shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type SuggestionsResult = { seed_keyword_data?: LabsItem | null; items?: LabsItem[] | null };
type RelatedResult = { items?: { keyword_data?: LabsItem | null }[] | null };

// Keyword ideas for a seed keyword.
// Live mode (DataForSEO): seed metrics + 12-month trend + up to 150 ideas with volume, CPC, competition, difficulty and intent.
// Basic mode (no key): Google Autocomplete ideas with rule-based intent; no metrics.
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ip = clientIp(req);
    if (!rateLimit(`kw:${ip}`, 20, 60_000)) throw new UserError('Too many searches in a short time. Please wait a minute.', 429);
    const q = readKeyword(url);
    const country = readCountry(url);

    if (liveData()) {
      const data = await cached(`kw:live:${country.code}:${q}`, async (): Promise<KeywordResponse> => {
        const base = { keyword: q, location_code: country.code, language_code: country.hl };
        const s = await dataforseo<SuggestionsResult>('/v3/dataforseo_labs/google/keyword_suggestions/live', { ...base, limit: 100, include_seed_keyword: true, order_by: ['keyword_info.search_volume,desc'] }, ip);
        let items = s?.items ?? [];
        // Few phrase matches (long or niche seed): add semantically related keywords.
        if (items.length < 30) {
          const r = await dataforseo<RelatedResult>('/v3/dataforseo_labs/google/related_keywords/live', { ...base, depth: 2, limit: 100 }, ip);
          items = [...items, ...(r?.items ?? []).map(i => i.keyword_data).filter((i): i is LabsItem => !!i)];
        }
        const seen = new Set<string>([q]);
        const rows = items.map(i => toRow(i)).filter(r => r.keyword && !seen.has(r.keyword) && (seen.add(r.keyword), true))
          .sort((a, b) => (b.volume ?? -1) - (a.volume ?? -1)).slice(0, 150);
        return { mode: 'live', seed: toRow(s?.seed_keyword_data, q), trend: trendOf(s?.seed_keyword_data), rows };
      });
      return json(data);
    }

    const data = await cached(`kw:basic:${country.code}:${q}`, async (): Promise<KeywordResponse> => {
      const ideas = await autocompleteIdeas(q, country);
      // Throwing here keeps an empty (e.g. temporarily blocked) answer out of the cache.
      if (!ideas.length) throw new UserError('No keyword ideas found for that seed. Try a shorter or more common phrase.', 404);
      const blank = { volume: null, cpc: null, competition: null, difficulty: null };
      return { mode: 'basic', seed: { keyword: q, ...blank, intent: guessIntent(q) }, trend: [], rows: ideas.map(k => ({ keyword: k, ...blank, intent: guessIntent(k) })) };
    });
    return json(data);
  } catch (e) { return fail(e); }
}

import { cached, clientIp, dataforseo, fail, json, rateLimit, readCountry, readKeyword, UserError } from '../_lib/server';
import type { SerpResponse } from '../../../../components/seo-suite/shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type SerpResult = { se_results_count?: number | null; item_types?: string[] | null; items?: { type?: string; rank_group?: number | null; title?: string | null; url?: string | null; domain?: string | null }[] | null };

// Live Google top 10 for a keyword (DataForSEO SERP API). Live mode only.
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ip = clientIp(req);
    if (!rateLimit(`serp:${ip}`, 20, 60_000)) throw new UserError('Too many requests in a short time. Please wait a minute.', 429);
    const q = readKeyword(url);
    const country = readCountry(url);
    const data = await cached(`serp:${country.code}:${q}`, async (): Promise<SerpResponse> => {
      const r = await dataforseo<SerpResult>('/v3/serp/google/organic/live/advanced', { keyword: q, location_code: country.code, language_code: country.hl, depth: 10, device: 'desktop' }, ip);
      const rows = (r?.items ?? []).filter(i => i.type === 'organic' && i.url)
        .map(i => ({ rank: i.rank_group ?? 0, title: i.title ?? i.url!, url: i.url!, domain: i.domain ?? new URL(i.url!).hostname }));
      const features = [...new Set((r?.item_types ?? []).filter(t => t !== 'organic'))];
      return { rows, total: r?.se_results_count ?? null, features };
    });
    return json(data);
  } catch (e) { return fail(e); }
}

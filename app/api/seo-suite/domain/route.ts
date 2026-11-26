import { cached, clientIp, dataforseo, fail, json, rateLimit, readCountry, UserError } from '../_lib/server';
import { cleanDomain, type DomainResponse } from '../../../../components/seo-suite/shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type Organic = { count?: number | null; etv?: number | null; pos_1?: number | null; pos_2_3?: number | null; pos_4_10?: number | null; pos_11_20?: number | null };
type Overview = { items?: { metrics?: { organic?: Organic | null } | null }[] | null };
type Ranked = { items?: { keyword_data?: { keyword?: string | null; keyword_info?: { search_volume?: number | null } | null } | null; ranked_serp_element?: { serp_item?: { url?: string | null; rank_group?: number | null; etv?: number | null } | null } | null }[] | null };

// Organic overview + top ranking keywords for a domain (DataForSEO Labs). Live mode only.
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ip = clientIp(req);
    if (!rateLimit(`domain:${ip}`, 10, 60_000)) throw new UserError('Too many requests in a short time. Please wait a minute.', 429);
    const target = cleanDomain(url.searchParams.get('target') ?? '');
    if (!target) throw new UserError('Enter a domain such as example.com.');
    const country = readCountry(url);
    const data = await cached(`domain:${country.code}:${target}`, async (): Promise<DomainResponse> => {
      const base = { target, location_code: country.code, language_code: country.hl };
      const [o, r] = await Promise.all([
        dataforseo<Overview>('/v3/dataforseo_labs/google/domain_rank_overview/live', { ...base, limit: 1 }, ip),
        dataforseo<Ranked>('/v3/dataforseo_labs/google/ranked_keywords/live', { ...base, limit: 50, order_by: ['ranked_serp_element.serp_item.etv,desc'] }, ip),
      ]);
      const m = o?.items?.[0]?.metrics?.organic;
      return {
        target,
        overview: m ? { keywords: m.count ?? 0, traffic: Math.round(m.etv ?? 0), pos1: m.pos_1 ?? 0, pos2to3: m.pos_2_3 ?? 0, pos4to10: m.pos_4_10 ?? 0, pos11to20: m.pos_11_20 ?? 0 } : null,
        keywords: (r?.items ?? []).map(i => ({
          keyword: i.keyword_data?.keyword ?? '',
          position: i.ranked_serp_element?.serp_item?.rank_group ?? null,
          volume: i.keyword_data?.keyword_info?.search_volume ?? null,
          traffic: i.ranked_serp_element?.serp_item?.etv != null ? Math.round(i.ranked_serp_element.serp_item.etv) : null,
          url: i.ranked_serp_element?.serp_item?.url ?? '',
        })).filter(k => k.keyword),
      };
    });
    return json(data);
  } catch (e) { return fail(e); }
}

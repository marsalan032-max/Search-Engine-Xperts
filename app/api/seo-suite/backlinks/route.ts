import { cached, clientIp, dataforseo, fail, json, rateLimit, UserError } from '../_lib/server';
import { cleanDomain, type BacklinksResponse } from '../../../../components/seo-suite/shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type Summary = { rank?: number | null; backlinks?: number | null; referring_domains?: number | null; referring_ips?: number | null; broken_backlinks?: number | null; referring_links_attributes?: Record<string, number> | null };
type Domains = { items?: { domain?: string | null; rank?: number | null; backlinks?: number | null; first_seen?: string | null }[] | null };

// Backlink summary + top referring domains (DataForSEO Backlinks API). Live mode only.
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ip = clientIp(req);
    if (!rateLimit(`bl:${ip}`, 10, 60_000)) throw new UserError('Too many requests in a short time. Please wait a minute.', 429);
    const target = cleanDomain(url.searchParams.get('target') ?? '');
    if (!target) throw new UserError('Enter a domain such as example.com.');
    const data = await cached(`bl:${target}`, async (): Promise<BacklinksResponse> => {
      const base = { target, include_subdomains: true, exclude_internal_backlinks: true, rank_scale: 'one_hundred' };
      const [s, d] = await Promise.all([
        dataforseo<Summary>('/v3/backlinks/summary/live', base, ip),
        dataforseo<Domains>('/v3/backlinks/referring_domains/live', { ...base, limit: 50, order_by: ['rank,desc'] }, ip),
      ]);
      return {
        target,
        summary: s ? { rank: s.rank ?? null, backlinks: s.backlinks ?? null, referringDomains: s.referring_domains ?? null, referringIps: s.referring_ips ?? null, broken: s.broken_backlinks ?? null, nofollow: s.referring_links_attributes?.nofollow ?? null } : null,
        domains: (d?.items ?? []).map(i => ({ domain: i.domain ?? '', rank: i.rank ?? null, backlinks: i.backlinks ?? null, firstSeen: i.first_seen ?? null })).filter(i => i.domain),
      };
    });
    return json(data);
  } catch (e) { return fail(e); }
}

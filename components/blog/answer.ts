import type { Chunk } from './chunks';

// Finds the passages of the article that best answer a typed question.
// Keyword matching with light stemming, synonyms and IDF weighting; no external service.

const STOP = new Set('a an the and or but if of to in on at for from by with about as is are was were be been being do does did can could should would will shall may might must i me my we our you your it its this that these those there here what which who whom whose when where why how much many any some more most than then so not no yes just also into over under per vs versus get got have has had very really please tell explain until see need want know like think take look start give show use ok okay thing things us them they he she him her'.split(' '));

// Words readers use → words the article uses.
const SYNONYMS: Record<string, string[]> = {
  cost: ['price', 'pricing', 'charge', 'fee', 'budget', 'spend', 'invest', 'retainer'],
  price: ['cost', 'pricing', 'charge', 'fee'],
  expensive: ['cost', 'price', 'budget'],
  cheap: ['low', 'cheap', 'under', '500'],
  afford: ['budget', 'cost'],
  ecommerce: ['ecommerce', 'enterprise'],
  shop: ['ecommerce'], store: ['ecommerce'],
  local: ['local', 'location', 'citi'],
  roi: ['roi', 'return', 'revenue', 'break', 'even'],
  return: ['roi', 'revenue'],
  long: ['month', 'time', 'timeline'],
  time: ['month', 'timeline'],
  result: ['result', 'gain', 'visible', 'month'],
  guarante: ['guarante', 'promis'],
  freelancer: ['freelancer'], hire: ['hire', 'hiring', 'house', 'agenc'],
  employe: ['house', 'hire'], inhouse: ['house'],
  contract: ['contract', 'lock', 'retainer'],
  link: ['link', 'backlink', 'authority', 'pr'], backlink: ['link', 'authority'],
  content: ['content', 'article', 'writing'], blog: ['content', 'article'],
  scam: ['red', 'flag', 'warning', 'guarante'], avoid: ['red', 'flag', 'warning'], warn: ['warning', 'flag'],
  include: ['include', 'deliverabl', 'scope'], get: ['include', 'scope'],
  small: ['small', 'local'], startup: ['small', 'new'],
  dollar: ['month'], usd: ['month'],
};

const stem = (w: string) => w
  .replace(/^e-?commerce$/, 'ecommerce')
  .replace(/(ies)$/, 'i').replace(/(ing|ed|es|s)$/, '').replace(/e$/, '');

const SYN: Record<string, string[]> = Object.fromEntries(Object.entries(SYNONYMS).map(([k, v]) => [stem(k), v]));

export const tokens = (s: string) => s.toLowerCase()
  .replace(/e-commerce/g, 'ecommerce').replace(/in-house/g, 'inhouse')
  .replace(/(\d),(\d{3})/g, '$1$2').match(/[a-z0-9]+/g)?.filter(w => !STOP.has(w)).map(stem).filter(w => w.length > 1) ?? [];

export type Match = { chunk: Chunk; score: number };

export function search(question: string, chunks: Chunk[]): Match[] {
  const q = tokens(question);
  if (!q.length) return [];
  // Each question word can be matched by itself (full weight) or a synonym (half weight).
  const groups = q.map(t => [[t, 1] as const, ...(SYN[t] ?? []).map(x => [stem(x), 0.5] as const)]);
  const wantsPrice = /\b(cost|costs|price|pricing|much|charge|fee|fees|budget|spend|pay|expensive|cheap|rate|rates)\b/i.test(question);
  const docs = chunks.map(c => ({ c, text: new Set(tokens(c.text)), head: new Set(tokens(c.heading)) }));
  const idf = (t: string) => Math.log(1 + docs.length / (1 + docs.filter(d => d.text.has(t) || d.head.has(t)).length));
  const matches = docs.map(({ c, text, head }) => {
    let score = 0, hits = 0;
    for (const group of groups) {
      let best = 0;
      for (const [t, w] of group) {
        const inText = text.has(t), inHead = head.has(t);
        if (!inText && !inHead) continue;
        best = Math.max(best, w * idf(t) * ((inText ? 1 : 0) + (inHead ? (c.kind === 'faq' ? 2 : 1.5) : 0)));
      }
      if (best > 0) { hits++; score += best; }
    }
    // Favour passages that cover more of the question's own words, and full FAQ answers.
    score *= 0.5 + hits / q.length;
    if (c.kind === 'faq') score *= 1.15;
    if (c.text.length < 60) score *= 0.7;
    if (wantsPrice && /\$\d/.test(c.text)) score *= 1.5; // "how much" questions want actual figures
    // Off-topic questions: most of the reader's own words must appear in the passage.
    if (q.length >= 2 && hits / q.length < 0.5) score = 0;
    return { chunk: c, score };
  });
  return matches.filter(m => m.score > 0).sort((a, b) => b.score - a.score);
}

// Builds a reply: the best passage, plus a closely related one from the same part of the article.
export function answer(question: string, chunks: Chunk[]): { text: string; source?: { id: string; heading: string } } | null {
  const ranked = search(question, chunks);
  const best = ranked[0];
  if (!best || best.score < 1.2) return null;
  const parts = [best.chunk];
  // A passage followed by a list (e.g. "Questions to ask…") is answered together with the list.
  const at = chunks.indexOf(best.chunk);
  const list: string[] = [];
  if (!best.chunk.item) for (let i = at + 1; i < chunks.length && chunks[i].item && list.length < 8; i++) list.push(chunks[i].text);
  if (list.length) return { text: `${best.chunk.text}\n${list.map(l => `- ${l}`).join('\n')}`, source: { id: best.chunk.id, heading: best.chunk.heading } };
  const second = ranked.slice(1).find(m => m.chunk.id === best.chunk.id && m.chunk.kind === best.chunk.kind && m.score >= best.score * 0.6 && m.chunk.text !== best.chunk.text);
  if (second) parts.push(second.chunk);
  const text = parts.map(p => p.text.includes('\n')
    ? p.text.split('\n').map(line => `- ${line}`).join('\n') // table rows → bullets
    : p.text).join('\n\n');
  const lead = best.chunk.kind === 'faq' ? `**${best.chunk.heading}**\n\n` : '';
  return { text: lead + text, source: { id: best.chunk.id, heading: best.chunk.kind === 'faq' ? 'Frequently asked questions' : best.chunk.heading } };
}

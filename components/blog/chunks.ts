import { isValidElement, type ReactNode } from 'react';
import type { Post } from './types';

// Splits an article into small searchable passages for the Ask AI panel.
// Runs on the server at build time; the passages are passed to the browser as data.

export type Chunk = { id: string; heading: string; text: string; kind: 'text' | 'faq' | 'takeaway'; item?: boolean };

type Ev = { t: 'section'; id: string } | { t: 'h'; level: 2 | 3; text: string } | { t: 'text'; text: string; item?: boolean };

const plain = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(plain).join('');
  if (!isValidElement(node)) return '';
  const { type, props } = node as { type: unknown; props: { children?: ReactNode } };
  if (type === 'svg') return '';
  if (typeof type === 'function') return plain((type as (p: unknown) => ReactNode)(props));
  const inner = plain(props.children);
  if (type === 'th' || type === 'td') return `${inner} — `;
  if (type === 'caption') return `${inner}\n`;
  if (type === 'tr') return `${inner.replace(/ — $/, '')}\n`;
  return inner;
};

function walk(node: ReactNode, out: Ev[]) {
  if (node == null || typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') return;
  if (Array.isArray(node)) { node.forEach(n => walk(n, out)); return; }
  if (!isValidElement(node)) return;
  const { type, props } = node as { type: unknown; props: { id?: string; children?: ReactNode } };
  if (typeof type === 'function') { walk((type as (p: unknown) => ReactNode)(props), out); return; }
  switch (type) {
    case 'section': if (props.id) out.push({ t: 'section', id: props.id }); walk(props.children, out); return;
    case 'h2': out.push({ t: 'h', level: 2, text: plain(props.children) }); return;
    case 'h3': out.push({ t: 'h', level: 3, text: plain(props.children) }); return;
    case 'p': out.push({ t: 'text', text: plain(props.children) }); return;
    case 'li': out.push({ t: 'text', text: plain(props.children).replace(/^\d+(?=[A-Z])/, ''), item: true }); return;
    case 'table': {
      const rows = plain(props.children).split('\n').map(r => r.trim()).filter(Boolean);
      // First line is the caption, second the column headings; keep the data rows.
      out.push({ t: 'text', text: rows.slice(2).join('\n') });
      return;
    }
    case 'svg': return;
    case 'div':
      // A pricing card: its title becomes the heading, its text one passage.
      if ((props as { className?: string }).className === 'post-card') {
        const kids = ([] as ReactNode[]).concat(props.children);
        const title = kids.find(k => isValidElement(k) && k.type === 'h3');
        out.push({ t: 'h', level: 3, text: plain(title) });
        out.push({ t: 'text', text: kids.filter(k => isValidElement(k) && k.type === 'p').map(plain).join(' ') });
        out.push({ t: 'h', level: 3, text: '' }); // text after the cards belongs to the section again
        return;
      }
      walk(props.children, out); return;
    default: walk(props.children, out);
  }
}

export function articleChunks(post: Post): Chunk[] {
  const events: Ev[] = [];
  walk((post.Body as () => ReactNode)(), events);
  const chunks: Chunk[] = [];
  let id = 'top', h2 = post.title, h3 = '';
  for (const e of events) {
    if (e.t === 'section') { id = e.id; h3 = ''; }
    else if (e.t === 'h') { if (e.level === 2) { h2 = e.text; h3 = ''; } else h3 = e.text; }
    else if (e.text.trim()) chunks.push({ id, heading: h3 ? `${h2} › ${h3}` : h2, text: e.text.trim(), kind: 'text', ...(e.item ? { item: true } : {}) });
  }
  post.takeaways.forEach(t => chunks.push({ id: 'top', heading: 'Key takeaways', text: t, kind: 'takeaway' }));
  post.faqs.forEach(f => chunks.push({ id: 'faq', heading: f.question, text: f.answer, kind: 'faq' }));
  return chunks;
}

'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { answer } from './answer';
import type { Chunk } from './chunks';

type Msg = { role: 'user' | 'assistant'; content: string; error?: boolean; source?: { id: string; heading: string } };
type Suggestion = { question: string; answer: string; section?: string };

const Sparkle = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.1 6.3L20.5 10l-6.4 2.1L12 18.5l-2.1-6.4L3.5 10l6.4-1.7z" /><path d="M19 15l.9 2.4 2.4.9-2.4.9L19 21.6l-.9-2.4-2.4-.9 2.4-.9z" /></svg>
);

// Inline **bold** and bare https links.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,]$/, '');
      const internal = href.startsWith('https://searchenginexperts.com');
      return <a key={i} href={internal ? href.replace('https://searchenginexperts.com', '') || '/' : href} {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{internal ? 'book a free SEO audit' : href}</a>;
    }
    return part;
  });
}

// Paragraphs and "- " bullet lists.
function Answer({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { blocks.push(<ul key={blocks.length}>{list.map((l, i) => <li key={i}>{inline(l)}</li>)}</ul>); list = []; } };
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (/^[-*•]\s+/.test(line)) { list.push(line.replace(/^[-*•]\s+/, '')); continue; }
    flush();
    if (line) blocks.push(<p key={blocks.length}>{inline(line.replace(/^#+\s*/, ''))}</p>);
  }
  flush();
  return <>{blocks}</>;
}

export function AskAI({ title, suggestions, chunks, headings }: { title: string; suggestions: Suggestion[]; chunks: Chunk[]; headings: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Other buttons on the page (e.g. in the sidebar) open the panel via this event.
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('open-ask-ai', show);
    return () => window.removeEventListener('open-ask-ai', show);
  }, []);

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [messages]);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  // Answers come from the article itself: pre-written replies for suggested
  // questions, otherwise the closest matching passage. Nothing leaves the browser.
  function reply(q: string): Omit<Msg, 'role'> {
    const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const preset = suggestions.find(s => norm(s.question) === norm(q));
    if (preset) return { content: preset.answer, source: preset.section ? { id: preset.section, heading: headings[preset.section] ?? 'the article' } : undefined };
    const found = answer(q, chunks);
    if (found) return { content: found.text, source: found.source };
    return { content: `I couldn't find that in this article. For advice on your own site and budget, https://searchenginexperts.com/#contact — or try one of these:\n${suggestions.map(s => `- ${s.question}`).join('\n')}` };
  }

  const revealing = useRef<Msg | null>(null);

  function ask(question: string) {
    const q = question.trim();
    if (!q) return;
    // A new question while an answer is still appearing: show that answer in full first.
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    const unfinished = revealing.current;
    if (unfinished) setMessages(m => [...m.slice(0, -1), unfinished]);
    const full = reply(q);
    revealing.current = { role: 'assistant', ...full };
    setMessages(m => [...m, { role: 'user', content: q }, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);
    // Reveal the reply word by word.
    const words = full.content.split(/(\s+)/);
    let shown = 0;
    const tick = () => {
      shown = Math.min(words.length, shown + 6);
      const done = shown >= words.length;
      setMessages(m => [...m.slice(0, -1), { role: 'assistant', content: words.slice(0, shown).join(''), source: done ? full.source : undefined }]);
      if (done) {
        if (timer.current) { clearInterval(timer.current); timer.current = null; }
        revealing.current = null;
        setBusy(false);
        inputRef.current?.focus();
      }
    };
    timer.current = setInterval(tick, 40);
  }

  const submit = (e: FormEvent) => { e.preventDefault(); ask(input); };

  return <>
    {!open && <button className="ask-fab" onClick={() => setOpen(true)} aria-haspopup="dialog"><span className="ask-fab-icon"><Sparkle size={17} /></span>Ask AI</button>}
    {open && <div className="ask-panel" role="dialog" aria-modal="false" aria-labelledby="ask-title">
      <div className="ask-head">
        <h2 id="ask-title"><Sparkle size={16} /> Ask about this article</h2>
        {messages.length > 0 && <button className="ask-reset" onClick={() => setMessages([])} disabled={busy}>New chat</button>}
        <button className="ask-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
      </div>

      <div className="ask-log" ref={logRef} aria-live="polite">
        <div className="ask-intro">
          <span className="ask-star"><Sparkle size={22} /></span>
          <p>Hello! Have a question about <b>{title.replace(/[?.!]$/, '')}</b>? Ask anything and I’ll find the answer in the article.</p>
          {messages.length === 0 && <>
            <p className="ask-hint">Not sure what to ask? Choose something:</p>
            <div className="ask-chips">{suggestions.map(s => <button key={s.question} onClick={() => ask(s.question)}>{s.question}</button>)}</div>
          </>}
        </div>
        {messages.map((m, i) => <div key={i} className={`ask-msg ${m.role}${m.error ? ' error' : ''}`}>
          {m.role === 'assistant'
            ? (m.content ? <><Answer text={m.content} />{m.source && <a className="ask-source" href={`#${m.source.id}`} onClick={() => setOpen(false)}>Read this in the article: {m.source.heading} →</a>}</> : <span className="ask-typing" aria-label="Thinking"><i /><i /><i /></span>)
            : m.content}
        </div>)}
      </div>

      <form className="ask-form" onSubmit={submit}>
        <textarea
          ref={inputRef} rows={1} value={input} maxLength={500} placeholder="Ask a question…" aria-label="Ask a question about this article"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input); } }}
        />
        <button type="submit" disabled={!input.trim()} aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>
        </button>
      </form>
      <p className="ask-note">Answers are drawn from this article. For advice on your site, book a free audit.</p>
    </div>}
  </>;
}

// A button anywhere on the page that opens the panel.
export function AskAIButton({ children }: { children: ReactNode }) {
  return <button className="ask-inline" onClick={() => window.dispatchEvent(new Event('open-ask-ai'))}><Sparkle size={16} />{children}</button>;
}

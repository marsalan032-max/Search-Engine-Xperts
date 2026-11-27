import { formatUpdateDate, typeName, updatePath, type AlgoUpdate, type UpdateType } from './updates';

// One update as a blog-style card (see bx-card in app/blog/blog-index.css), linking to the update's own page.
// Used by the collection grid and the "related updates" sections on each update page.

const month = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });

export const Clock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const Calendar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>;

// Small decorative mark on each card cover, one per update type.
export const Mark = ({ t }: { t: UpdateType }) => <svg className="ga-mark" width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
  {t === 'Core' && <path d="M6 44c8-2 10 6 18 2s8-20 16-22 10 12 18 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />}
  {t === 'Spam' && <><path d="M32 6l20 8v14c0 14-9 24-20 30C21 52 12 42 12 28V14z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" /><path d="M24 31l6 6 11-12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></>}
  {t === 'Content' && <><rect x="12" y="8" width="40" height="48" rx="6" stroke="currentColor" strokeWidth="3.5" /><path d="M21 22h22M21 32h22M21 42h14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" /></>}
  {t === 'Page experience' && <><rect x="18" y="6" width="28" height="52" rx="6" stroke="currentColor" strokeWidth="3.5" /><path d="M28 48h8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" /></>}
  {t === 'Other' && <path d="M32 6c1.3 13 7 18.7 20 20-13 1.3-18.7 7-20 20-1.3-13-7-18.7-20-20 13-1.3 18.7-7 20-20z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />}
</svg>;

export const typeClass = (t: UpdateType) => `t-${t.toLowerCase().replace(' ', '-')}`;

export function UpdateCard({ u, anchor = false, kicker }: { u: AlgoUpdate; anchor?: boolean; kicker?: string }) {
  return <a href={updatePath(u)} id={anchor ? u.id : undefined} className={`bx-card ga-card ${typeClass(u.type)}${u.status === 'Announced' ? ' is-next' : ''}`}>
    <div className="ga-cover">
      <span className="ga-chip">{u.status === 'Announced' ? 'Coming in December' : typeName(u.type)}</span>
      <span className="ga-when"><b>{month(u.release ? `${u.release}-01` : u.date)}</b> {(u.release ?? u.date).slice(0, 4)}</span>
      <Mark t={u.type} />
    </div>
    <div className="bx-card-body">
      <span className="bx-meta"><span>{kicker ?? `${typeName(u.type)}${u.type === 'Core' || u.type === 'Spam' ? ' update' : ''}`}</span>{u.rollout && <span><Clock /> {u.rollout}</span>}</span>
      <h3>{u.name}</h3>
      <p>{u.summary}</p>
      <div className="ga-foot">
        <Calendar />
        <span>{u.status === 'Announced' ? 'Announced' : 'Started'} <time dateTime={u.date}>{formatUpdateDate(u.date)}</time></span>
        {u.status === 'Complete' && <i className="ga-done">Complete</i>}
        {u.status === 'Announced' && <i className="ga-soon">Not live yet</i>}
      </div>
    </div>
  </a>;
}

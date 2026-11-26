'use client';

import type { ReactNode } from 'react';
import type { Intent, TrendPoint } from './shared';

// Small building blocks shared by the SEO Suite views.

export const fmt = (n: number | null | undefined) => (n == null ? '–' : n.toLocaleString('en-US'));
export const money = (n: number | null | undefined) => (n == null ? '–' : `$${n.toFixed(2)}`);
export const dec = (n: number | null | undefined) => (n == null ? '–' : n.toFixed(2));
export const compact = (n: number | null | undefined) =>
  n == null ? '–' : Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

// localStorage can be unavailable (private mode, blocked storage): never let it break the page.
export const store = {
  get<T>(key: string, fallback: T): T {
    try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
  },
  set(key: string, value: unknown) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  },
};

export function downloadCsv(name: string, header: string[], rows: (string | number | null)[][]) {
  const cell = (v: string | number | null) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [header, ...rows].map(r => r.map(cell).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/** Keyword difficulty bubble (0–100). */
export function Score({ value, size = 'sm' }: { value: number | null; size?: 'sm' | 'lg' }) {
  if (value == null) return <span className="ss-score ss-score-none" title="No difficulty data">–</span>;
  const tone = value < 15 ? 'vlow' : value < 30 ? 'low' : value < 50 ? 'mid' : value < 70 ? 'high' : 'vhigh';
  return <span className={`ss-score ss-score-${tone} ss-score-${size}`} title={`Keyword difficulty ${value} / 100`}>{value}</span>;
}

const intentShort: Record<Intent, string> = { Informational: 'Info', Commercial: 'Comm', Transactional: 'Trans', Navigational: 'Nav', Local: 'Local' };
export function IntentPill({ intent }: { intent: Intent }) {
  return <span className={`ss-pill ss-pill-${intent.toLowerCase()}`} title={`${intent} intent`}>{intentShort[intent]}</span>;
}

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></>,
    globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z" /></>,
    link: <><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" /></>,
    serp: <><rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M7 9h10M7 13h7M7 17h9" /></>,
    audit: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M8.5 12.5l2 2 4-4.5" /></>,
    bookmark: <path d="M7 4h10a1 1 0 011 1v15l-6-4-6 4V5a1 1 0 011-1z" />,
    filters: <><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>,
    download: <><path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 20h14" /></>,
    pin: <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
    back: <path d="M19 12H5M11 6l-6 6 6 6" />,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    ext: <><path d="M14 5h5v5M19 5l-8 8" /><path d="M17 14v5H5V7h5" /></>,
    chart: <><path d="M4 19V5M4 19h16" /><path d="M8 15l3-4 3 2 5-6" /></>,
    star: <path d="M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4 7.2 18.9l.9-5.4L4.2 9.7l5.4-.8z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    home: <><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /></>,
    grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" /></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
    trash: <><path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const monthName = (m: number) => months[(m - 1 + 12) % 12];

function niceMax(v: number) {
  if (v <= 0) return 10;
  const p = 10 ** Math.floor(Math.log10(v));
  const step = [1, 2, 2.5, 5, 10].find(s => s * p * 4 >= v) ?? 10;
  return step * p * 4;
}

/** Monthly search volume line chart (last 12 months). */
export function TrendChart({ points }: { points: TrendPoint[] }) {
  const W = 520, H = 250, L = 46, R = 12, T = 14, B = 30;
  const max = niceMax(Math.max(...points.map(p => p.volume)));
  const x = (i: number) => L + (i * (W - L - R)) / Math.max(1, points.length - 1);
  const y = (v: number) => T + (H - T - B) * (1 - v / max);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.volume).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1)},${H - B} L${x(0)},${H - B} Z`;
  const ticks = [0, 1, 2, 3, 4].map(i => (max / 4) * i);
  const label = points.map(p => `${monthName(p.month)} ${p.year}: ${p.volume.toLocaleString('en-US')}`).join(', ');
  return <svg className="ss-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Monthly searches: ${label}`}>
    <defs>
      <linearGradient id="ss-area" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="var(--ss-accent)" stopOpacity="0.28" />
        <stop offset="1" stopColor="var(--ss-accent)" stopOpacity="0" />
      </linearGradient>
    </defs>
    {ticks.map(t => <g key={t}>
      <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="ss-grid" />
      <text x={L - 8} y={y(t) + 4} textAnchor="end" className="ss-axis">{compact(t)}</text>
    </g>)}
    <path d={area} fill="url(#ss-area)" />
    <path d={line} fill="none" stroke="var(--ss-accent)" strokeWidth="2.2" strokeLinejoin="round" />
    {points.map((p, i) => <g key={`${p.year}-${p.month}`}>
      <circle cx={x(i)} cy={y(p.volume)} r="3.4" fill="var(--ss-accent)"><title>{`${monthName(p.month)} ${p.year}: ${p.volume.toLocaleString('en-US')}`}</title></circle>
      <text x={x(i)} y={H - 10} textAnchor="middle" className="ss-axis">{monthName(p.month)}</text>
    </g>)}
  </svg>;
}

export function Empty({ icon, title, children }: { icon: string; title: string; children?: ReactNode }) {
  return <div className="ss-empty">
    <span className="ss-empty-icon"><Icon name={icon} size={22} /></span>
    <h3>{title}</h3>
    {children}
  </div>;
}

export function ErrorNote({ message }: { message: string }) {
  return <p className="ss-error" role="alert">{message}</p>;
}

export function Spinner({ label }: { label: string }) {
  return <div className="ss-loading" role="status"><span className="ss-spin" aria-hidden="true" />{label}</div>;
}

/** Shown in place of a live-data view when DataForSEO isn't connected. */
export function LiveOnly({ what, children }: { what: string; children?: ReactNode }) {
  return <div className="ss-locked">
    <span className="ss-empty-icon"><Icon name="lock" size={22} /></span>
    <h3>{what} uses live search data</h3>
    <p>This view needs our live data connection, which isn’t switched on yet. Keyword ideas and the site audit work now.</p>
    {children}
  </div>;
}

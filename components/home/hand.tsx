import type { ReactNode } from 'react';

// Hand-drawn touches for the home page: pen underlines, handwritten notes with sketched arrows,
// and doodle-style icons. All original SVG; the `#sketch` filter adds a slight hand wobble to strokes.

export function SketchDefs() {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
    </filter>
  </svg>;
}

/** Words with a pen-stroke underline, e.g. <Underline>found</Underline>. */
export function Underline({ children }: { children: ReactNode }) {
  return <span className="hd-ul">{children}<svg viewBox="0 0 260 16" preserveAspectRatio="none" aria-hidden="true">
    <path d="M3 10 C 45 4, 95 3, 142 7 S 222 12, 257 5" />
    <path d="M14 13 C 70 8, 150 9, 236 10" className="hd-ul-2" />
  </svg></span>;
}

const arrows = {
  // curving down and to the left
  'down-left': 'M92 6 C 78 30, 52 46, 14 50 M24 40 L 12 50 L 25 58',
  // curving down and to the right
  'down-right': 'M8 6 C 22 30, 48 46, 86 50 M76 40 L 88 50 L 75 58',
  // curving up and to the right
  'up-right': 'M8 54 C 26 30, 50 14, 86 10 M74 4 L 88 10 L 77 20',
  // curving up and to the left
  'up-left': 'M92 54 C 74 30, 50 14, 14 10 M26 4 L 12 10 L 23 20',
} as const;

/** A handwritten note with a sketched arrow. Position it with a className. */
export function Note({ children, arrow = 'down-left', className = '' }: { children: ReactNode; arrow?: keyof typeof arrows; className?: string }) {
  return <span className={`hd-note hd-note-${arrow} ${className}`} aria-hidden="true">
    <span className="hd-note-text">{children}</span>
    <svg viewBox="0 0 100 62" className="hd-arrow"><path d={arrows[arrow]} /></svg>
  </span>;
}

const doodles: Record<string, ReactNode> = {
  // magnifying glass
  audit: <><circle cx="21" cy="21" r="12.5" /><path d="M30.5 30.5 L 41 41.5 M28 29 L 39.5 42" /><path d="M14 17 C 16 13, 20 12, 23 12.5" /></>,
  // checklist / plan
  plan: <><path d="M10 7 L 37 6.5 L 38 42 L 9.5 42.5 Z" /><path d="M15 16 l3 3 l5 -6 M27 16.5 h6 M15 26 l3 3 l5 -6 M27 26.5 h6 M15 35.5 h18" /></>,
  // pencil writing
  write: <><path d="M9 38 L 12 29 L 33 8 L 40 15 L 19 36 Z" /><path d="M29.5 11.5 L 36.5 18.5 M12 29 L 19 36 M7 43 C 15 41, 26 44, 41 41" /></>,
  // chain link
  links: <><path d="M20 27 C 15 32, 9 31, 7.5 26 C 6 21, 10 17, 14 13.5 C 18 10, 23 11, 25 15" /><path d="M24 17 C 29 12, 35 13, 36.5 18 C 38 23, 34 27, 30 30.5 C 26 34, 21 33, 19 29" /></>,
  // rising chart
  grow: <><path d="M7 7 L 7.5 41 L 42 40.5" /><path d="M12 34 L 20 25 L 27 30 L 39 14 M31 13 L 39.5 13.5 L 39 22" /></>,
};

export function Doodle({ name }: { name: keyof typeof doodles | string }) {
  return <svg className="hd-doodle" viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
    <g filter="url(#sketch)">{doodles[name]}</g>
  </svg>;
}

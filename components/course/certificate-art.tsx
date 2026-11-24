// "Local SEO Expert" certificate with three skill medals, for the certificate section of /local-seo-course.

const F = 'Poppins,sans-serif';

function Medal({ cx, cy, r, from, to, lines, id }: { cx: number; cy: number; r: number; from: string; to: string; lines: string[]; id: string }) {
  const fs = r * .2;
  return <g>
    {/* ribbon tails */}
    <path d={`M${cx - r * .55} ${cy + r * .55}l-${r * .12} ${r * .95} ${r * .3}-${r * .2} ${r * .2} ${r * .28} ${r * .12}-${r * .9}Z`} fill="#F5A524" />
    <path d={`M${cx + r * .55} ${cy + r * .55}l${r * .12} ${r * .95}-${r * .3}-${r * .2}-${r * .2} ${r * .28}-${r * .12}-${r * .9}Z`} fill="#D98B0F" />
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={from} /><stop offset="1" stopColor={to} /></linearGradient></defs>
    <circle cx={cx} cy={cy} r={r + 6} fill="#fff" />
    <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    <circle cx={cx} cy={cy} r={r - 7} fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round" />
    <path transform={`translate(${cx} ${cy - r * .62}) scale(${r / 70})`} d="M0-8 2.4-2.6 8.2-2.1 3.8 1.8 5.1 7.6 0 4.6-5.1 7.6-3.8 1.8-8.2-2.1-2.4-2.6Z" fill="#F5A524" />
    {lines.map((l, i) => <text key={l} x={cx} y={cy - (lines.length - 1) * fs * .6 + i * fs * 1.2 + fs * .1} textAnchor="middle" fontSize={fs} fontWeight="600" fill="#fff" fontFamily={F}>{l}</text>)}
    <rect x={cx - r * .52} y={cy + r * .36} width={r * 1.04} height={r * .3} rx={r * .15} fill="#F5A524" />
    <text x={cx} y={cy + r * .57} textAnchor="middle" fontSize={r * .16} fontWeight="700" fill="#0B1437" fontFamily={F} letterSpacing=".06em">SPECIALIST</text>
  </g>;
}

export function CertificateArt() {
  return <svg className="lc-cert-art" viewBox="0 0 560 470" role="img" aria-label="Local SEO Expert certificate with Google Business Profile, Local Rankings and Reviews & Citations specialist badges">
    <defs>
      <linearGradient id="cert-top" x1="0" x2="1"><stop offset="0" stopColor="#4A6CFF" /><stop offset="1" stopColor="#2A48C8" /></linearGradient>
      <filter id="cert-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#345DF7" floodOpacity=".22" /></filter>
    </defs>

    {/* sparkles */}
    {[[38, 120, 1.2], [70, 92, .7], [520, 110, 1.1], [494, 78, .6]].map(([x, y, s], i) =>
      <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M0-12C1.2-3.6 3.6-1.2 12 0 3.6 1.2 1.2 3.6 0 12-1.2 3.6-3.6 1.2-12 0-3.6-1.2-1.2-3.6 0-12Z" fill="#C9D6FB" />)}

    {/* certificate */}
    <g filter="url(#cert-shadow)">
      <rect x="80" y="14" width="400" height="300" rx="14" fill="#fff" />
    </g>
    <path d="M80 28a14 14 0 0 1 14-14h372a14 14 0 0 1 14 14v6H80Z" fill="url(#cert-top)" />
    <rect x="96" y="48" width="368" height="252" rx="8" fill="none" stroke="#E5EAF8" strokeWidth="1.5" />
    <g transform="translate(206 62)">
      <rect width="22" height="22" rx="6" fill="#345DF7" />
      <path d="M5 15l5-5 3 3 5-6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="30" y="16" fontSize="12.5" fontWeight="600" fill="#0B1437" fontFamily={F}>Search Engine <tspan fill="#345DF7">Xperts</tspan></text>
    </g>
    <text x="280" y="122" textAnchor="middle" fontSize="30" fontWeight="700" fill="#0B1437" fontFamily={F} letterSpacing="-.01em">LOCAL SEO EXPERT</text>
    <line x1="150" y1="144" x2="212" y2="144" stroke="#C9D6FB" strokeWidth="1.5" /><circle cx="150" cy="144" r="3" fill="#C9D6FB" />
    <line x1="348" y1="144" x2="410" y2="144" stroke="#C9D6FB" strokeWidth="1.5" /><circle cx="410" cy="144" r="3" fill="#C9D6FB" />
    <text x="280" y="147" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#69739A" fontFamily={F} letterSpacing=".14em">CERTIFICATE GRANTED TO</text>
    <text x="280" y="178" textAnchor="middle" fontSize="20" fontWeight="700" fill="#345DF7" fontFamily={F}>YOUR NAME</text>
    <line x1="176" y1="190" x2="384" y2="190" stroke="#E5EAF8" strokeWidth="1.5" />
    <rect x="186" y="204" width="188" height="7" rx="3.5" fill="#EEF2FD" />
    <rect x="206" y="218" width="148" height="7" rx="3.5" fill="#EEF2FD" />

    {/* medals */}
    <Medal id="m-left" cx={124} cy={322} r={62} from="#2A48C8" to="#0B1437" lines={['Local', 'Rankings']} />
    <Medal id="m-right" cx={436} cy={322} r={62} from="#11214F" to="#345DF7" lines={['Reviews &', 'Citations']} />
    <Medal id="m-mid" cx={280} cy={334} r={80} from="#4A6CFF" to="#2A48C8" lines={['Google', 'Business', 'Profile']} />
  </svg>;
}

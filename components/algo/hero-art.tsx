// Hero illustration for /google-algorithm-updates: a results page with rankings moving,
// a visibility chart marking an update, and a rollout date card. Decorative only.
export function HeroArt() {
  return <svg className="ga-art" viewBox="0 0 560 460" fill="none" fontFamily="Poppins, sans-serif" aria-hidden="true">
    <defs>
      <filter id="ga-sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0B1437" floodOpacity=".16" /></filter>
      <pattern id="ga-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#CDD8F8" /></pattern>
    </defs>
    <circle cx="300" cy="230" r="215" fill="#F1F4FD" />
    <circle cx="300" cy="230" r="215" fill="url(#ga-dots)" />

    {/* results page */}
    <g filter="url(#ga-sh)"><rect x="30" y="54" width="380" height="296" rx="20" fill="#fff" /></g>
    <rect x="54" y="76" width="332" height="36" rx="18" fill="#F1F4FD" stroke="#E5EAF8" />
    <circle cx="76" cy="94" r="7" stroke="#345DF7" strokeWidth="2.4" /><path d="M81 99l5 5" stroke="#345DF7" strokeWidth="2.4" strokeLinecap="round" />
    <rect x="96" y="89" width="150" height="10" rx="5" fill="#CDD8F8" />
    {[132, 186, 240, 294].map((y, i) => <g key={y}>
      {i === 1 && <rect x="44" y={y - 8} width="352" height="48" rx="12" fill="#F5F7FF" stroke="#345DF7" strokeWidth="2" />}
      <circle cx="74" cy={y + 16} r="13" fill={i === 1 ? '#345DF7' : '#F1F4FD'} />
      <text x="74" y={y + 21} textAnchor="middle" fontSize="13" fontWeight="700" fill={i === 1 ? '#fff' : '#5A6488'}>{i + 1}</text>
      <rect x="100" y={y + 4} width={[190, 170, 200, 150][i]} height="10" rx="5" fill={i === 1 ? '#345DF7' : '#CDD8F8'} />
      <rect x="100" y={y + 21} width={[120, 140, 110, 130][i]} height="8" rx="4" fill="#E5EAF8" />
    </g>)}
    <rect x="322" y="190" width="58" height="26" rx="13" fill="#345DF7" />
    <path d="M336 207l5-7 5 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="352" y="208" fontSize="13" fontWeight="700" fill="#fff">3</text>

    {/* visibility chart */}
    <g filter="url(#ga-sh)"><rect x="250" y="268" width="290" height="172" rx="20" fill="#0B1437" stroke="#2A3A78" /></g>
    <text x="272" y="298" fontSize="13" fontWeight="600" fill="#fff">Search visibility</text>
    <path d="M272 318h246M272 358h246M272 398h246" stroke="#1E2A5C" />
    <path d="M390 306v110" stroke="#7D95FF" strokeWidth="1.5" strokeDasharray="4 5" />
    <rect x="352" y="406" width="76" height="22" rx="11" fill="#345DF7" />
    <text x="390" y="421" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#fff">Core update</text>
    <path d="M272 372c18-4 30 6 46 0s28-10 44-4 18 22 30 18 18-34 36-40 26-14 40-26 30-12 50-16" stroke="#7D95FF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <circle cx="518" cy="304" r="6" fill="#fff" stroke="#7D95FF" strokeWidth="3" />

    {/* rollout date card */}
    <g filter="url(#ga-sh)"><rect x="392" y="16" width="148" height="104" rx="16" fill="#fff" /></g>
    <path d="M392 32a16 16 0 0 1 16-16h116a16 16 0 0 1 16 16v14H392z" fill="#345DF7" />
    <text x="466" y="37" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" letterSpacing="1.2">NOV 2026</text>
    <text x="466" y="78" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0B1437">10 → 24</text>
    <circle cx="420" cy="99" r="7" fill="#E5F6EE" /><path d="M416.5 99l2.5 2.5 4.5-5" stroke="#0E7A50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <text x="432" y="103" fontSize="11" fontWeight="600" fill="#0E7A50">Rollout complete</text>
  </svg>;
}

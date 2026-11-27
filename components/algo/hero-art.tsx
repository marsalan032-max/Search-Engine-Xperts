// Hero illustration for /google-algorithm-updates: a Search Console-style performance report with daily clicks
// and impressions over three months and the core update rollout window shaded. Decorative only; the figures are
// illustrative, not real site data.
export function HeroArt() {
  return <svg className="ga-art" viewBox="0 0 560 400" fill="none" fontFamily="Poppins, sans-serif" aria-hidden="true">
    <defs>
      <filter id="ga-sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="20" stdDeviation="20" floodColor="#000" floodOpacity=".28" /></filter>
    </defs>
    <g filter="url(#ga-sh)"><rect x="8" y="8" width="544" height="384" rx="18" fill="#fff" /></g>
    <text x="32" y="46" fontSize="16" fontWeight="600" fill="#0B1437">Performance</text>
    <rect x="352.5" y="29.5" width="62" height="24" rx="12" fill="#F6F8FD" stroke="#E5EAF8" />
    <text x="383.5" y="45.5" textAnchor="middle" fontSize="10.5" fill="#4B5370">Web</text>
    <rect x="422.5" y="29.5" width="100" height="24" rx="12" fill="#F6F8FD" stroke="#E5EAF8" />
    <text x="472.5" y="45.5" textAnchor="middle" fontSize="10.5" fill="#4B5370">Last 3 months</text>
      <rect x="32" y="66" width="118" height="62" rx="10" fill="#345DF7" />
      <text x="44" y="86" fontSize="10.5" fill="#E4E9FF">Total clicks</text>
      <text x="44" y="114" fontSize="21" fontWeight="600" fill="#fff">18.2K</text>
      <rect x="156" y="66" width="118" height="62" rx="10" fill="#5B3FC4" />
      <text x="168" y="86" fontSize="10.5" fill="#E4E9FF">Total impressions</text>
      <text x="168" y="114" fontSize="21" fontWeight="600" fill="#fff">642K</text>
      <rect x="280.5" y="66.5" width="117" height="61" rx="10" fill="#fff" stroke="#E5EAF8" />
      <text x="292" y="86" fontSize="10.5" fill="#69739A">Average CTR</text>
      <text x="292" y="114" fontSize="21" fontWeight="600" fill="#0B1437">2.8%</text>
      <rect x="404.5" y="66.5" width="117" height="61" rx="10" fill="#fff" stroke="#E5EAF8" />
      <text x="416" y="86" fontSize="10.5" fill="#69739A">Average position</text>
      <text x="416" y="114" fontSize="21" fontWeight="600" fill="#0B1437">11.6</text>

    <path d="M40 200h480M40 250h480M40 300h480M40 350h480" stroke="#EEF0F5" />
    <rect x="426.2" y="186" width="77.2" height="170" fill="#345DF7" fillOpacity=".07" />
    <path d="M426.2 186v170" stroke="#345DF7" strokeWidth="1.2" strokeDasharray="3 4" />
    <rect x="376" y="152" width="128" height="22" rx="11" fill="#EEF2FF" />
    <circle cx="390" cy="163" r="4" fill="#345DF7" />
    <text x="399" y="167" fontSize="10.5" fontWeight="600" fill="#2A48C8">Core update rollout</text>
    <path d="M40.0 243.5 L45.5 244.3 L51.0 240.6 L56.6 238.7 L62.1 257.9 L67.6 261.3 L73.1 234.3 L78.6 241.7 L84.1 232.5 L89.7 239.2 L95.2 243.5 L100.7 258.6 L106.2 260.3 L111.7 233.4 L117.2 236.2 L122.8 238.7 L128.3 242.5 L133.8 240.5 L139.3 256.4 L144.8 254.6 L150.3 238.9 L155.9 233.7 L161.4 235.2 L166.9 231.2 L172.4 238.5 L177.9 258.8 L183.4 252.0 L189.0 235.5 L194.5 233.1 L200.0 234.2 L205.5 237.4 L211.0 233.6 L216.6 254.5 L222.1 249.2 L227.6 232.3 L233.1 231.7 L238.6 227.8 L244.1 236.8 L249.7 231.7 L255.2 253.6 L260.7 257.2 L266.2 229.9 L271.7 236.6 L277.2 228.3 L282.8 233.7 L288.3 227.9 L293.8 248.5 L299.3 253.2 L304.8 227.4 L310.3 236.9 L315.9 235.7 L321.4 232.2 L326.9 235.0 L332.4 252.5 L337.9 250.8 L343.4 228.9 L349.0 229.8 L354.5 237.1 L360.0 227.3 L365.5 226.9 L371.0 251.9 L376.6 249.2 L382.1 236.3 L387.6 234.9 L393.1 236.2 L398.6 234.8 L404.1 231.8 L409.7 245.9 L415.2 253.8 L420.7 231.6 L426.2 234.5 L431.7 231.8 L437.2 245.6 L442.8 255.2 L448.3 271.5 L453.8 272.0 L459.3 244.4 L464.8 247.3 L470.3 241.0 L475.9 230.4 L481.4 228.6 L486.9 248.4 L492.4 239.3 L497.9 211.2 L503.4 214.6 L509.0 206.0 L514.5 208.6 L520.0 209.5" stroke="#5B3FC4" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M40.0 317.0 L45.5 311.6 L51.0 313.3 L56.6 320.8 L62.1 345.2 L67.6 344.7 L73.1 314.6 L78.6 319.3 L84.1 311.0 L89.7 311.7 L95.2 305.1 L100.7 334.7 L106.2 343.2 L111.7 315.5 L117.2 317.4 L122.8 309.8 L128.3 311.2 L133.8 319.0 L139.3 336.1 L144.8 340.5 L150.3 312.2 L155.9 306.5 L161.4 315.4 L166.9 310.6 L172.4 307.1 L177.9 331.7 L183.4 338.5 L189.0 316.2 L194.5 318.0 L200.0 305.8 L205.5 303.8 L211.0 306.7 L216.6 335.9 L222.1 332.6 L227.6 310.0 L233.1 316.7 L238.6 306.8 L244.1 303.7 L249.7 310.9 L255.2 342.1 L260.7 340.2 L266.2 316.0 L271.7 314.7 L277.2 310.1 L282.8 315.3 L288.3 307.2 L293.8 331.5 L299.3 338.2 L304.8 310.0 L310.3 299.7 L315.9 312.9 L321.4 311.8 L326.9 305.5 L332.4 341.1 L337.9 336.3 L343.4 298.9 L349.0 306.3 L354.5 303.4 L360.0 299.4 L365.5 299.7 L371.0 335.4 L376.6 339.0 L382.1 313.3 L387.6 310.6 L393.1 308.2 L398.6 314.0 L404.1 312.1 L409.7 339.5 L415.2 331.8 L420.7 309.1 L426.2 307.0 L431.7 307.3 L437.2 320.7 L442.8 331.4 L448.3 352.0 L453.8 346.7 L459.3 330.9 L464.8 317.5 L470.3 309.3 L475.9 311.0 L481.4 300.2 L486.9 333.8 L492.4 331.5 L497.9 290.5 L503.4 289.5 L509.0 283.0 L514.5 282.0 L520.0 282.5" stroke="#345DF7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    <g fontSize="10" fill="#8A94B8">
      <text x="40" y="376">Sep 1</text>
      <text x="205.5" y="376" textAnchor="middle">Oct 1</text>
      <text x="376.6" y="376" textAnchor="middle">Nov 1</text>
      <text x="520" y="376" textAnchor="end">Nov 27</text>
    </g>
  </svg>;
}

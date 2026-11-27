// Call-to-action banner at the end of the course pages (Local SEO by default; pass `copy` for another course): gradient band, headline and button on the
// left, a storefront with hand-drawn doodles on the right.

type CtaCopy = { heading: string; text: string; label: string; href?: string };
const localCopy: CtaCopy = {
  heading: 'Rather have your local SEO done for you?',
  text: 'We’ll audit your Google Business Profile, website and reviews and show you the first fixes that bring in more calls, free.',
  label: 'Get a free local SEO audit',
};

export function CourseCta({ copy = localCopy }: { copy?: CtaCopy }) {
  return <section className="wrap" aria-labelledby="lc-cta-title">
    <div className="lc-cta">
      <div className="lc-cta-copy">
        <h2 id="lc-cta-title">{copy.heading}</h2>
        <p>{copy.text}</p>
        <a className="lc-cta-btn" href={copy.href ?? '/#contact'}>{copy.label}</a>
      </div>
      <svg className="lc-cta-art" viewBox="0 0 440 300" aria-hidden="true">
        <g fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity=".9">
          {/* light bulb */}
          <path d="M204 40a22 22 0 1 1 30 20v10h-16V60a22 22 0 0 1-14-20Z" />
          <path d="M218 76h16M220 82h12M222 56l4-12 4 12" />
          <path d="M190 22l-8-6M196 12l-3-9M248 12l3-9M254 22l8-6M182 40h-9M260 40h9" />
          {/* briefcase */}
          <rect x="30" y="140" width="64" height="46" rx="8" transform="rotate(-10 62 163)" />
          <path d="M50 136l-1-8a6 6 0 0 1 6-6h14a6 6 0 0 1 6 6l1 6" transform="rotate(-10 62 163)" />
          <path d="M33 158l60-10" />
          {/* squiggle arrow into the shop */}
          <path d="M40 100c30-30 60 20 90-6s40-18 50 6" />
          <path d="M172 92l9 9 4-12" />
          {/* loop arrow */}
          <path d="M330 280c40 6 70-14 66-40s-36-20-30 0 30 18 40-6c6-16 0-34-10-44" />
          <path d="M394 182l2 10-10-2" />
          <circle cx="330" cy="280" r="4" fill="#fff" />
          {/* sparkle */}
          <path d="M120 230l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" />
        </g>
        {/* storefront */}
        <g transform="translate(236 96)">
          <rect x="0" y="40" width="150" height="128" rx="14" fill="#fff" opacity=".95" />
          <path d="M-6 44 8 0h134l14 44Z" fill="#0B1437" />
          {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${-6 + i * 32.4} 44a16.2 16.2 0 0 0 32.4 0`} fill={i % 2 ? '#0B1437' : '#4A6CFF'} />)}
          {[0, 1, 2].map(i => <path key={i} d={`M${30 + i * 36} 0l-6 44h22l2-44Z`} fill="#4A6CFF" />)}
          <rect x="18" y="82" width="54" height="40" rx="6" fill="#E5EAF8" />
          <rect x="88" y="82" width="44" height="86" rx="6" fill="#345DF7" />
          <circle cx="124" cy="126" r="3" fill="#fff" />
          {[0, 1, 2, 3, 4].map(i => <path key={i} transform={`translate(${24 + i * 11} 138) scale(.55)`} d="M0-8 2.4-2.6 8.2-2.1 3.8 1.8 5.1 7.6 0 4.6-5.1 7.6-3.8 1.8-8.2-2.1-2.4-2.6Z" fill="#F5A524" />)}
          <g transform="translate(118 38)">
            <circle r="20" fill="#F5A524" stroke="#fff" strokeWidth="4" />
            <text y="6" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Poppins,sans-serif">#1</text>
          </g>
        </g>
      </svg>
    </div>
  </section>;
}

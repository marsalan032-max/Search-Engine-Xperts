// Cover illustrations for the Local SEO Course modules, one per module (index 0–8), drawn in the site palette.
// Each is a 400×240 SVG: a blue/navy gradient ground with one white "object" that stands for the module.

const C = { navy: '#0B1437', navy2: '#11214F', blue: '#345DF7', blueL: '#4A6CFF', blueD: '#2A48C8', soft: '#C9D6FB', mist: '#E5EAF8', amber: '#F5A524', green: '#15A06A' };

const grounds = [
  [C.navy2, C.blueD], [C.blueL, C.blueD], [C.navy, C.blue],
  [C.blueD, C.navy2], [C.blue, C.navy], [C.blueL, C.navy2],
  [C.navy2, C.blue], [C.blueD, C.blueL], [C.navy, C.blueD],
];

const Star = ({ x, y, s = 1, fill = C.amber }: { x: number; y: number; s?: number; fill?: string }) =>
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0-8 2.4-2.6 8.2-2.1 3.8 1.8 5.1 7.6 0 4.6-5.1 7.6-3.8 1.8-8.2-2.1-2.4-2.6Z" fill={fill} />;
const Card = (p: React.SVGProps<SVGRectElement>) => <rect rx="12" fill="#fff" {...p} />;
const Bar = ({ x, y, w, h = 8, fill = C.mist }: { x: number; y: number; w: number; h?: number; fill?: string }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
const Sparkle = ({ x, y, s = 1, o = .55 }: { x: number; y: number; s?: number; o?: number }) =>
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0-10C1-3 3-1 10 0 3 1 1 3 0 10-1 3-3 1-10 0-3-1-1-3 0-10Z" fill="#fff" opacity={o} />;
const Pin = ({ x, y, s = 1, fill = C.blue }: { x: number; y: number; s?: number; fill?: string }) =>
  <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0 26C-12 12-18 4-18-6a18 18 0 0 1 36 0c0 10-6 18-18 32Z" fill={fill} /><circle cy="-6" r="7" fill="#fff" /></g>;

const scenes: React.ReactNode[] = [
  // 1 · Why Google shows some businesses first: ranked map-pack results with #1 highlighted
  <g key="1">
    <Pin x={86} y={98} s={1.5} fill={C.amber} />
    <ellipse cx="86" cy="150" rx="26" ry="6" fill="#000" opacity=".18" />
    {[0, 1, 2].map(i => <g key={i} transform={`translate(150 ${48 + i * 52})`} opacity={i ? .82 - i * .12 : 1}>
      <Card width={200} height={42} />
      <circle cx="22" cy="21" r="12" fill={i ? C.mist : C.blue} />
      <text x="22" y="26" textAnchor="middle" fontSize="13" fontWeight="700" fill={i ? C.blueD : '#fff'} fontFamily="Poppins,sans-serif">{i + 1}</text>
      <Bar x={44} y={12} w={i ? 90 : 110} fill={i ? C.mist : C.soft} />
      {[0, 1, 2, 3, 4].map(s => <Star key={s} x={50 + s * 13} y={30} s={.6} fill={i ? C.soft : C.amber} />)}
    </g>)}
    <Sparkle x={360} y={36} s={1.1} /><Sparkle x={40} y={200} s={.8} />
  </g>,
  // 2 · Google Business Profile: storefront listing card
  <g key="2">
    <Card x={110} y={34} width={180} height={172} rx={16} />
    <rect x={226} y={50} width={48} height={44} rx={8} fill={C.blue} />
    <path d="M226 58a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8v12h-48Z" fill={C.navy} />
    {[0, 1, 2].map(i => <rect key={i} x={230 + i * 15} y={58} width={8} height={12} fill={C.blueL} />)}
    <circle cx="250" cy="84" r="6" fill="#fff" />
    <Bar x={128} y={54} w={70} fill={C.soft} /><Bar x={128} y={70} w={44} />
    {[0, 1, 2, 3, 4].map(s => <Star key={s} x={134 + s * 18} y={112} s={.85} />)}
    <Bar x={128} y={132} w={30} fill={C.blue} /><Bar x={164} y={132} w={30} /><Bar x={200} y={132} w={30} /><Bar x={236} y={132} w={36} />
    <line x1="128" y1="152" x2="272" y2="152" stroke={C.mist} />
    {[0, 1, 2, 3].map(i => <circle key={i} cx={146 + i * 36} cy={178} r={12} fill="none" stroke={C.blue} strokeWidth="2.5" />)}
    <Sparkle x={70} y={60} s={1.2} /><Sparkle x={336} y={180} s={.9} /><Sparkle x={340} y={52} s={.6} />
  </g>,
  // 3 · Website in local searches: browser with a location pin and service-page layout
  <g key="3">
    <Card x={70} y={36} width={260} height={170} rx={14} />
    <rect x={70} y={36} width={260} height={28} rx={14} fill={C.mist} />
    <rect x={70} y={50} width={260} height={14} fill={C.mist} />
    {[0, 1, 2].map(i => <circle key={i} cx={88 + i * 12} cy={50} r={4} fill={C.soft} />)}
    <rect x={130} y={44} width={150} height={12} rx={6} fill="#fff" />
    <Bar x={90} y={82} w={120} h={12} fill={C.navy} /><Bar x={90} y={102} w={150} /><Bar x={90} y={116} w={130} />
    <rect x={90} y={136} width={64} height={22} rx={11} fill={C.blue} />
    <rect x={232} y={82} width={80} height={100} rx={10} fill={C.mist} />
    <path d="M232 150l22-24 18 16 14-10 26 22v18a10 10 0 0 1-10 10h-60a10 10 0 0 1-10-10Z" fill={C.soft} />
    <Pin x={272} y={110} s={.9} />
    <Sparkle x={46} y={190} s={1} /><Sparkle x={356} y={40} s={1} />
  </g>,
  // 4 · Relevant content: stacked pages and a pencil
  <g key="4">
    <Card x={140} y={56} width={130} height={160} rx={10} opacity=".45" transform="rotate(-8 205 136)" />
    <Card x={150} y={40} width={130} height={160} rx={10} />
    <Bar x={166} y={60} w={80} h={10} fill={C.navy} />
    <Bar x={166} y={80} w={96} /><Bar x={166} y={94} w={88} /><Bar x={166} y={108} w={96} />
    <rect x={166} y={124} width={96} height={40} rx={6} fill={C.mist} />
    <Pin x={214} y={138} s={.5} />
    <Bar x={166} y={174} w={60} />
    <g transform="rotate(38 300 120)"><rect x={292} y={60} width={16} height={100} rx={3} fill={C.amber} /><path d="M292 160h16l-8 18Z" fill="#fff" /><rect x={292} y={60} width={16} height={14} rx={3} fill={C.navy} /></g>
    <Sparkle x={86} y={70} s={1.1} /><Sparkle x={340} y={200} s={.8} />
  </g>,
  // 5 · Listings everywhere: one business connected to directory cards
  <g key="5">
    {[[60, 42], [60, 152], [290, 42], [290, 152]].map(([x, y], i) => <g key={i}>
      <line x1={x + 25} y1={y + 23} x2={200} y2={120} stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 6" />
      <Card x={x} y={y} width={50} height={46} rx={10} />
      <Bar x={x + 10} y={y + 12} w={30} h={6} fill={C.soft} /><Bar x={x + 10} y={y + 24} w={20} h={6} />
      <circle cx={x + 44} cy={y + 4} r={9} fill={C.green} />
      <path d={`M${x + 40} ${y + 4}l3 3 5-6`} stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>)}
    <circle cx="200" cy="120" r="46" fill="#fff" />
    <Pin x={200} y={116} s={1.1} />
    <Sparkle x={200} y={34} s={.9} /><Sparkle x={200} y={212} s={.7} />
  </g>,
  // 6 · Reviews: speech bubbles with stars
  <g key="6">
    <path d="M70 52h190a14 14 0 0 1 14 14v58a14 14 0 0 1-14 14H120l-26 22v-22H70a14 14 0 0 1-14-14V66a14 14 0 0 1 14-14Z" fill="#fff" />
    {[0, 1, 2, 3, 4].map(s => <Star key={s} x={84 + s * 24} y={82} s={1.2} />)}
    <Bar x={74} y={104} w={150} /><Bar x={74} y={118} w={110} />
    <path d="M190 132h134a14 14 0 0 1 14 14v38a14 14 0 0 1-14 14h-16v20l-22-20h-96a14 14 0 0 1-14-14v-38a14 14 0 0 1 14-14Z" fill={C.mist} />
    <Bar x={194} y={152} w={120} fill={C.soft} /><Bar x={194} y={168} w={90} fill={C.soft} />
    <circle cx="326" cy="70" r="22" fill={C.amber} />
    <path d="M316 70l7 7 13-14" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Sparkle x={40} y={200} s={1} /><Sparkle x={370} y={130} s={.7} />
  </g>,
  // 7 · Technical: speed gauge and a phone
  <g key="7">
    <path d="M70 170a90 90 0 0 1 180 0" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="18" strokeLinecap="round" />
    <path d="M70 170a90 90 0 0 1 150-67" fill="none" stroke={C.green} strokeWidth="18" strokeLinecap="round" />
    <line x1="160" y1="170" x2="214" y2="112" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
    <circle cx="160" cy="170" r="12" fill="#fff" />
    <text x="160" y="214" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="Poppins,sans-serif">98</text>
    <rect x={282} y={52} width={74} height={136} rx={14} fill="#fff" />
    <rect x={292} y={66} width={54} height={30} rx={6} fill={C.mist} />
    <Bar x={292} y={106} w={54} h={6} fill={C.soft} /><Bar x={292} y={118} w={40} h={6} />
    <rect x={292} y={136} width={54} height={18} rx={9} fill={C.blue} />
    <Bar x={308} y={174} w={22} h={4} fill={C.mist} />
    <Sparkle x={60} y={50} s={1} /><Sparkle x={250} y={40} s={.7} />
  </g>,
  // 8 · Prove results: rising bar chart with trend line
  <g key="8">
    <Card x={70} y={36} width={260} height={170} rx={16} />
    <Bar x={90} y={54} w={70} h={10} fill={C.navy} /><Bar x={90} y={72} w={44} h={6} />
    <rect x={250} y={50} width={60} height={24} rx={12} fill="#E5F6EE" />
    <text x="280" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.green} fontFamily="Poppins,sans-serif">+64%</text>
    {[36, 52, 46, 70, 84, 104].map((h, i) => <rect key={i} x={94 + i * 36} y={190 - h} width={22} height={h} rx={5} fill={i === 5 ? C.blue : C.soft} />)}
    <path d="M105 150 141 132 177 140 213 112 249 98 285 76" fill="none" stroke={C.amber} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="285" cy="76" r="7" fill={C.amber} stroke="#fff" strokeWidth="3" />
    <Sparkle x={42} y={60} s={1} /><Sparkle x={362} y={196} s={.9} />
  </g>,
  // 9 · Systems that keep you growing: calendar with a repeat cycle
  <g key="9">
    <Card x={80} y={44} width={170} height={160} rx={16} />
    <rect x={80} y={44} width={170} height={40} rx={16} fill={C.blue} />
    <rect x={80} y={68} width={170} height={16} fill={C.blue} />
    <rect x={112} y={34} width={8} height={22} rx={4} fill={C.navy} /><rect x={210} y={34} width={8} height={22} rx={4} fill={C.navy} />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={98 + (i % 4) * 36} y={98 + Math.floor(i / 4) * 32} width={26} height={22} rx={6} fill={[1, 6, 11].includes(i) ? C.amber : C.mist} />)}
    <g transform="translate(300 140)">
      <circle r="48" fill="#fff" />
      <path d="M-24-6a26 26 0 0 1 44-14" fill="none" stroke={C.blue} strokeWidth="7" strokeLinecap="round" />
      <path d="M24 6a26 26 0 0 1-44 14" fill="none" stroke={C.blue} strokeWidth="7" strokeLinecap="round" />
      <path d="M14-30l8 10-12 4Z" fill={C.blue} /><path d="M-14 30l-8-10 12-4Z" fill={C.blue} />
    </g>
    <Sparkle x={330} y={52} s={1.1} /><Sparkle x={46} y={196} s={.8} />
  </g>,
];

export function ModuleArt({ index, className }: { index: number; className?: string }) {
  const [a, b] = grounds[index % grounds.length];
  const id = `mart-${index}`;
  return <svg className={className} viewBox="0 0 400 240" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
      <radialGradient id={`${id}-glow`} cx=".85" cy=".1" r=".7"><stop offset="0" stopColor="#fff" stopOpacity=".22" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <pattern id={`${id}-dots`} width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#fff" opacity=".12" /></pattern>
    </defs>
    <rect width="400" height="240" fill={`url(#${id})`} />
    <rect width="400" height="240" fill={`url(#${id}-dots)`} />
    <rect width="400" height="240" fill={`url(#${id}-glow)`} />
    {scenes[index % scenes.length]}
  </svg>;
}

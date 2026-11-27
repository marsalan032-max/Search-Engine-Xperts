import { Bar, C, Card, ModuleArt, Sparkle, Star } from './module-art';

// Cover illustrations for the Advanced Ecommerce SEO Course modules (index 0–9), in the same 400×240 frame,
// grounds and white-object style as the Local SEO Course covers (./module-art.tsx).

const F = 'Poppins,sans-serif';

const Bag = ({ x, y, s = 1, fill = C.blue }: { x: number; y: number; s?: number; fill?: string }) =>
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-16-6c0-10 6-16 16-16s16 6 16 16" fill="none" stroke={fill} strokeWidth="4" strokeLinecap="round" />
    <rect x="-24" y="-8" width="48" height="40" rx="7" fill={fill} />
    <circle cx="-9" cy="2" r="2.5" fill="#fff" /><circle cx="9" cy="2" r="2.5" fill="#fff" />
  </g>;

const scenes: React.ReactNode[] = [
  // 1 · Audit a store at scale: crawl report with issue rows and a magnifier
  <g key="1">
    <Card x={78} y={36} width={214} height={168} rx={16} />
    <Bar x={98} y={56} w={92} h={10} fill={C.soft} />
    {[0, 1, 2, 3].map(i => <g key={i}>
      <circle cx={106} cy={92 + i * 28} r={7} fill={[C.green, C.amber, C.blue, C.amber][i]} />
      <Bar x={122} y={88 + i * 28} w={[120, 96, 136, 84][i]} />
      <Bar x={262} y={88 + i * 28} w={18} fill={C.soft} />
    </g>)}
    <circle cx={300} cy={150} r={34} fill={C.navy} opacity=".25" />
    <circle cx={296} cy={146} r={30} fill="none" stroke="#fff" strokeWidth="8" />
    <path d="M318 168l26 26" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
    <Sparkle x={350} y={46} s={1.1} /><Sparkle x={44} y={196} s={.8} />
  </g>,
  // 2 · Keyword research by purchase intent: a funnel feeding keyword pills with intent dots
  <g key="2">
    <path d="M52 52h96l-34 52v44l-28 14v-58Z" fill="#fff" />
    <path d="M62 62h76" stroke={C.mist} strokeWidth="6" strokeLinecap="round" />
    {[0, 1, 2].map(i => <g key={i} transform={`translate(176 ${46 + i * 54})`}>
      <rect width={[178, 150, 196][i]} height={38} rx={19} fill="#fff" opacity={i === 0 ? 1 : .9} />
      <circle cx={20} cy={19} r={7} fill={[C.green, C.amber, C.soft][i]} />
      <Bar x={36} y={15} w={[96, 70, 112][i]} fill={i === 0 ? C.soft : C.mist} />
      {i === 0 && <text x={160} y={24} textAnchor="end" fontSize="11" fontWeight="700" fill={C.blueD} fontFamily={F}>BUY</text>}
    </g>)}
    <Sparkle x={360} y={210} s={.9} />
  </g>,
  // 3 · Architecture and faceted navigation: category tree from homepage to products
  <g key="3">
    <g stroke="#fff" strokeWidth="3" opacity=".75" fill="none">
      <path d="M200 66v22M110 88h180M110 88v22M200 88v22M290 88v22" />
      <path d="M110 140v16M86 156h48M86 156v12M134 156v12M290 140v16M266 156h48M266 156v12M314 156v12" />
    </g>
    <Card x={164} y={30} width={72} height={36} rx={10} />
    <Bag x={200} y={46} s={.42} />
    {[110, 200, 290].map((x, i) => <g key={x}><Card x={x - 34} y={110} width={68} height={30} rx={9} /><Bar x={x - 22} y={121} w={44} fill={i === 1 ? C.soft : C.mist} /></g>)}
    {[86, 134, 266, 314].map(x => <Card key={x} x={x - 18} y={168} width={36} height={36} rx={8} opacity=".92" />)}
    {[86, 134, 266, 314].map(x => <rect key={`d${x}`} x={x - 9} y={177} width={18} height={18} rx={4} fill={C.mist} />)}
    <Sparkle x={52} y={44} s={.9} /><Sparkle x={356} y={52} s={1.1} />
  </g>,
  // 4 · Category pages: product grid under filter chips
  <g key="4">
    <Card x={70} y={28} width={260} height={186} rx={16} />
    <Bar x={90} y={46} w={110} h={10} fill={C.soft} />
    {[0, 1, 2, 3].map(i => <rect key={i} x={90 + i * 56} y={66} width={48} height={16} rx={8} fill={i === 0 ? C.blue : C.mist} />)}
    {[0, 1, 2, 3, 4, 5].map(i => {
      const x = 90 + (i % 3) * 76, y = 94 + Math.floor(i / 3) * 58;
      return <g key={i}>
        <rect x={x} y={y} width={68} height={34} rx={8} fill={C.mist} />
        <Bag x={x + 34} y={y + 16} s={.3} fill={i === 0 ? C.blue : C.soft} />
        <Bar x={x} y={y + 40} w={i % 2 ? 44 : 56} h={6} fill={C.mist} />
      </g>;
    })}
    <Sparkle x={354} y={40} s={1} /><Sparkle x={44} y={200} s={.8} />
  </g>,
  // 5 · Product pages at scale: product card with variants, rating and add-to-cart
  <g key="5">
    <Card x={96} y={24} width={208} height={194} rx={16} />
    <rect x={114} y={40} width={172} height={76} rx={10} fill={C.mist} />
    <Bag x={200} y={78} s={.9} />
    <Bar x={114} y={128} w={120} h={10} fill={C.soft} />
    {[0, 1, 2, 3, 4].map(s => <Star key={s} x={120 + s * 14} y={152} s={.65} />)}
    {[C.navy, C.blue, C.amber].map((f, i) => <circle key={f} cx={240 + i * 18} cy={152} r={7} fill={f} stroke={i === 1 ? C.blueD : 'none'} strokeWidth="2" />)}
    <rect x={114} y={170} width={172} height={30} rx={15} fill={C.blue} />
    <Bar x={168} y={181} w={64} h={8} fill="#fff" />
    <Sparkle x={340} y={60} s={1.1} /><Sparkle x={56} y={176} s={.8} />
  </g>,
  // 6 · Structured data and Merchant Center: rich result with stars, price and stock, plus a code badge
  <g key="6">
    <Card x={56} y={56} width={250} height={128} rx={16} />
    <Bar x={78} y={76} w={70} h={7} fill={C.mist} />
    <Bar x={78} y={92} w={170} h={11} fill={C.blue} />
    {[0, 1, 2, 3, 4].map(s => <Star key={s} x={84 + s * 14} y={124} s={.65} />)}
    <Bar x={156} y={120} w={40} h={8} fill={C.mist} />
    <rect x={78} y={140} width={56} height={22} rx={11} fill="#E5F6EE" />
    <text x={106} y={155} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0E7A50" fontFamily={F}>In stock</text>
    <text x={146} y={156} fontSize="15" fontWeight="700" fill={C.navy} fontFamily={F}>$89.00</text>
    <g transform="translate(286 120)">
      <circle r="38" fill={C.navy} />
      <text y="9" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff" fontFamily={F}>{'{ }'}</text>
    </g>
    <Sparkle x={350} y={46} s={1} /><Sparkle x={44} y={40} s={.7} />
  </g>,
  // 7 · Technical SEO for stores: speed gauge over a code window
  <g key="7">
    <Card x={60} y={40} width={170} height={150} rx={14} />
    <g>{[0, 1, 2].map(i => <circle key={i} cx={78 + i * 12} cy={56} r={4} fill={C.mist} />)}</g>
    {[0, 1, 2, 3, 4].map(i => <Bar key={i} x={78 + (i % 2) * 16} y={78 + i * 20} w={[90, 70, 110, 60, 96][i]} fill={i === 2 ? C.soft : C.mist} />)}
    <g transform="translate(282 150)">
      <path d="M-70 0a70 70 0 0 1 140 0" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="14" strokeLinecap="round" />
      <path d="M-70 0a70 70 0 0 1 118-51" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
      <path d="M0 0L40-34" stroke={C.amber} strokeWidth="6" strokeLinecap="round" />
      <circle r="10" fill={C.amber} />
    </g>
    <Sparkle x={350} y={44} s={1} /><Sparkle x={40} y={210} s={.8} />
  </g>,
  // 8 · Content and AI shopping visibility: buying guide feeding an AI answer card
  <g key="8">
    <Card x={52} y={44} width={150} height={156} rx={14} />
    <rect x={68} y={60} width={118} height={46} rx={8} fill={C.mist} />
    {[0, 1, 2, 3].map(i => <Bar key={i} x={68} y={118 + i * 18} w={[110, 92, 104, 70][i]} fill={i === 0 ? C.soft : C.mist} />)}
    <path d="M206 120c20 0 22-24 44-24" stroke="#fff" strokeWidth="3" strokeDasharray="4 6" fill="none" strokeLinecap="round" />
    <Card x={234} y={60} width={130} height={110} rx={14} />
    <path transform="translate(256 82) scale(.9)" d="M0-10C1-3 3-1 10 0 3 1 1 3 0 10-1 3-3 1-10 0-3-1-1-3 0-10Z" fill={C.blue} />
    <Bar x={272} y={78} w={70} h={8} fill={C.soft} />
    {[0, 1, 2].map(i => <Bar key={i} x={252} y={102 + i * 16} w={[96, 80, 88][i]} h={7} fill={C.mist} />)}
    <rect x={252} y={150} width={46} height={12} rx={6} fill={C.blue} />
    <Sparkle x={360} y={204} s={1} /><Sparkle x={36} y={30} s={.7} />
  </g>,
  // 9 · Authority, links and digital PR: news article linking to the store
  <g key="9">
    <Card x={50} y={46} width={156} height={148} rx={14} />
    <Bar x={68} y={64} w={70} h={11} fill={C.navy} />
    <rect x={68} y={86} width={120} height={40} rx={8} fill={C.mist} />
    {[0, 1, 2].map(i => <Bar key={i} x={68} y={138 + i * 16} w={[120, 96, 108][i]} h={7} fill={i === 1 ? C.soft : C.mist} />)}
    <g transform="translate(232 120) rotate(-30)" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round">
      <rect x="-22" y="-10" width="30" height="20" rx="10" /><rect x="-8" y="-10" width="30" height="20" rx="10" />
    </g>
    <Card x={262} y={78} width={100} height={92} rx={14} />
    <Bag x={312} y={124} s={.75} />
    <Sparkle x={350} y={44} s={1} /><Sparkle x={40} y={212} s={.8} />
  </g>,
  // 10 · Measure and forecast organic revenue: rising revenue bars with a trend line and a coin
  <g key="10">
    <Card x={60} y={36} width={232} height={170} rx={16} />
    <Bar x={80} y={54} w={84} h={10} fill={C.soft} />
    {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={84 + i * 32} y={180 - (34 + i * 16)} width={20} height={34 + i * 16} rx={5} fill={i === 5 ? C.blue : C.mist} />)}
    <path d="M86 140l32-10 32-14 32-6 32-18 32-22" stroke={C.green} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <g transform="translate(316 156)">
      <circle r="34" fill={C.amber} stroke="#fff" strokeWidth="5" />
      <text y="11" textAnchor="middle" fontSize="30" fontWeight="700" fill="#fff" fontFamily={F}>$</text>
    </g>
    <Sparkle x={354} y={52} s={1.1} /><Sparkle x={36} y={200} s={.8} />
  </g>,
];

export function EcomModuleArt({ index, className }: { index: number; className?: string }) {
  return <ModuleArt index={index} className={className} set={scenes} prefix="emart" />;
}

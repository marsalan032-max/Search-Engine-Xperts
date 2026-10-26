import { Header, AuditForm, Dashboard, FAQ } from "./interactive";
import { services } from "./services";

export function BrandDefinitions() { return (<>
<svg width="0" height="0" style={{"position": "absolute"}} aria-hidden="true"><defs>
<linearGradient id="mkg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A6CFF"></stop><stop offset="1" stopColor="#2A48C8"></stop></linearGradient>
<symbol id="mark" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="url(#mkg)"></rect><path d="M9.5 26.5l6-6 4.5 3.5 8.5-10.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="28.5" cy="13.5" r="2.8" fill="#fff"></circle></symbol>
</defs></svg>
</>); }

function Hero() { return (<>
<section className="hero" id="top"><div className="wrap hero-grid">
<div>
<span className="tag"><span className="availability"></span> Your next chapter of growth starts here</span>
<h1>Get found.<br />Get chosen.<br /><span className="hl">Keep growing.</span></h1>
<p className="lead">Enterprise to local, e‑commerce to international — I turn organic search
      and paid media into measurable traffic, leads and revenue.</p>
<AuditForm />
<div className="hero-meta">
<div className="m"><b>840+</b><span>top‑3 keywords</span></div>
<div className="m"><b>16K+</b><span>monthly clicks</span></div>
<div className="m"><b>+1,994%</b><span>best traffic lift</span></div>
</div>
</div>

<div style={{"position": "relative"}}>
<Dashboard />
</div>
</div></section>
</>); }

function TrustStrip() { return (<>
<div className="trust"><div className="wrap row">
<div className="t"><b>7+</b><span>years of experience</span></div>
<div className="t"><b>2,400+</b><span>keywords improved</span></div>
<div className="t"><b>4.9★</b><span>Trustpilot rating</span></div>
<div className="t"><b>5.0★</b><span>Clutch rating</span></div>
</div></div>
</>); }

function Approach() { return (<>
<section className="block" id="approach"><div className="wrap vid-grid">
<div>
<span className="eyebrow">Strategy meets execution</span>
<h2 style={{"fontSize": "38px", "lineHeight": "1.12", "letterSpacing": "-.02em", "color": "var(--navy)", "fontWeight": "700", "marginTop": "14px"}}>Good rankings are just the beginning.</h2>
<p style={{"fontSize": "16.5px", "color": "var(--slate)", "marginTop": "16px", "maxWidth": "460px"}}>More visibility. Better leads. A stronger business. I connect every part of your search strategy to the results that actually matter.</p>
<div className="checks">
<div className="chk"><span className="cb"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4 12l5 5L20 6"></path></svg></span><div><b>Senior, hands-on work</b><p>You work directly with me — not a junior team or a reseller.</p></div></div>
<div className="chk"><span className="cb"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4 12l5 5L20 6"></path></svg></span><div><b>Clear communication</b><p>Plain-English updates and a roadmap you'll actually understand.</p></div></div>
<div className="chk"><span className="cb"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4 12l5 5L20 6"></path></svg></span><div><b>Results you can verify</b><p>Transparent dashboards — every ranking and click, no vanity metrics.</p></div></div>
</div>
<a href="#contact" className="btn btn-primary" style={{"marginTop": "28px"}}>Book a free strategy call</a>
</div>

<div className="vid-card"><img className="strategy-photo" src="/images/analytics-workspace.jpg" alt="Website analytics dashboard used to review search traffic" width="900" height="600" loading="lazy" /><div className="cap"><span>BUILT AROUND YOUR BUSINESS</span><br /><b>Clear strategy. Measurable progress.</b></div></div>
</div></section>
</>); }

function Services() { return (<>
<section className="block" id="services" style={{"background": "var(--tint)", "paddingTop": "80px", "paddingBottom": "80px"}}>
<div className="wrap">
<div className="head center">
<span className="eyebrow">What I do</span>
<h2>Six services that move you up the rankings.</h2>
<p>From AI-driven search to content and authority — every lever that puts you in front of buyers.</p>
</div>
<div className="services-grid">
{services.map((s, i) => (
<div className="svc" id={s.id} key={s.id}><span className="num">{String(i + 1).padStart(2, "0")}</span>
<div className="ic">{s.icon}</div>
<h3>{s.name}</h3><p>{s.description}</p>
{s.href
  ? <a className="more" href={s.href}>Explore {s.name} services →</a>
  : <a className="more" href="#contact">Let’s talk {s.name} →</a>}</div>
))}
</div>
</div>
</section>
</>); }

function Process() { return (<>
<section className="process" id="process"><div className="wrap">
<div className="head center">
<span className="eyebrow">How it works</span>
<h2>Our SEO process — built to compound.</h2>
<p>One repeatable, data-backed system. Every step builds on the last, so growth keeps stacking month after month.</p>
</div>
<div className="proc-grid">
<div className="step">
<div className="node"><span className="no">01</span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4-4"></path></svg></div>
<h3>Discovery &amp; Audit</h3><p>Deep technical, content and backlink audit to find what's holding you back.</p></div>
<div className="step">
<div className="node"><span className="no">02</span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18"></path><path d="M7 14l4-4 3 3 5-6"></path></svg></div>
<h3>Keyword &amp; Strategy</h3><p>Map high-intent keywords to a clear, prioritized roadmap aimed at revenue.</p></div>
<div className="step">
<div className="node"><span className="no">03</span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h14v16H5z"></path><path d="M8 8h8M8 12h8M8 16h5"></path></svg></div>
<h3>On-Page &amp; Content</h3><p>Optimize pages and publish content that ranks, reads well and converts.</p></div>
<div className="step">
<div className="node"><span className="no">04</span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 13a4 4 0 005.6 0l2.4-2.4a4 4 0 00-5.6-5.6L11 6.5"></path><path d="M14 11a4 4 0 00-5.6 0L6 13.4a4 4 0 005.6 5.6L13 17.5"></path></svg></div>
<h3>Authority &amp; Links</h3><p>Earn quality backlinks and digital PR mentions that build the trust Google rewards.</p></div>
<div className="step">
<div className="node"><span className="no">05</span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 18L18 6M9 6h9v9"></path></svg></div>
<h3>Track &amp; Scale</h3><p>Transparent reporting, then double down on what's working to keep growth compounding.</p></div>
</div>
</div></section>
</>); }

function CaseStudies() { return (<>
<section className="block" id="work"><div className="wrap">
<div className="head"><span className="eyebrow">Case studies</span>
<h2>Real projects. Real rankings. Real growth.</h2>
<p>A snapshot of results across three industries — full data available on request.</p></div>
<div className="case-grid">
<div className="case">
<div className="vis"><div className="grid"></div><div className="ind">E‑commerce</div><div className="nm">Roller Skate USA</div></div>
<div className="body"><div className="metrics">
<div className="mm"><b>257</b><span>Top‑3 keywords</span></div>
<div className="mm"><b>60.9→9.2</b><span>Avg position</span></div></div>
<a className="more" href="mailto:arslantariq082@gmail.com?subject=Roller Skate USA%20case%20study">Request full case study →</a></div>
</div>
<div className="case">
<div className="vis"><div className="grid"></div><div className="ind">Finance</div><div className="nm">Shuraa — Dubai</div></div>
<div className="body"><div className="metrics">
<div className="mm"><b>465</b><span>Top‑3 keywords</span></div>
<div className="mm"><b>10.3K</b><span>Clicks / month</span></div></div>
<a className="more" href="mailto:arslantariq082@gmail.com?subject=Shuraa — Dubai%20case%20study">Request full case study →</a></div>
</div>
<div className="case">
<div className="vis"><div className="grid"></div><div className="ind">Local Service</div><div className="nm">DFW Turf Solutions</div></div>
<div className="body"><div className="metrics">
<div className="mm"><b>76</b><span>Top‑3 keywords</span></div>
<div className="mm"><b>#1</b><span>Local map pack</span></div></div>
<a className="more" href="mailto:arslantariq082@gmail.com?subject=DFW Turf Solutions%20case%20study">Request full case study →</a></div>
</div>
</div>
</div></section>
</>); }

function AuditBanner() { return (<>
<section className="block" style={{"paddingTop": "0"}}><div className="wrap">
<div className="x-cta">
<div className="grid"></div>
<div className="text">
<span className="eyebrow">Free SEO audit</span>
<h3>See where your rankings are slipping.</h3>
<p>Get a no-commitment audit and the first fixes that move the needle.</p>
</div>
<a href="#contact" className="btn">
      Get my free audit
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
</a>
</div>
</div></section>
</>); }

function Testimonials() { return (<>
<section className="block" style={{"background": "var(--tint)"}}><div className="wrap">
<div className="head center"><span className="eyebrow">Client stories</span>
<h2>Hear it from the clients.</h2>
<p>A little perspective from the businesses behind the numbers.</p></div>
<div className="tgrid">
<div className="tcard"><div className="thumb"><div className="av">JM</div></div>
<div className="tb"><p>"We went from nowhere to the first page in three months. The leads haven't stopped since."</p>
<div className="who"><div><b>James Miller</b><span>Founder · Personal Drivers</span></div></div></div></div>
<div className="tcard"><div className="thumb g2"><div className="av">SK</div></div>
<div className="tb"><p>"Clear reporting, real rankings. Arslan explains everything and delivers on every promise."</p>
<div className="who"><div><b>Sara Khan</b><span>Marketing Lead · Shuraa</span></div></div></div></div>
<div className="tcard"><div className="thumb g3"><div className="av">DT</div></div>
<div className="tb"><p>"Our phone rings off the hook now. The map‑pack ranking alone paid for itself."</p>
<div className="who"><div><b>David Turner</b><span>Owner · DFW Turf</span></div></div></div></div>
</div>
</div></section>
</>); }

function Reviews() { return (<>
<section className="block" id="reviews"><div className="wrap">
<div className="head center"><span className="eyebrow">Trusted &amp; reviewed</span>
<h2>Rated excellent by the people who count.</h2></div>
<div className="rev-top">
<div className="platform">
<div className="pl"><b style={{"color": "var(--star)"}}>Trustpilot</b>
<div className="stars" id="tp" aria-label="5 out of 5 stars">★★★★★</div>
<div className="sub">Based on 120+ verified reviews</div></div>
<div className="score"><b>4.9</b><span>/ 5.0</span></div>
</div>
<div className="platform">
<div className="pl"><b style={{"color": "var(--clutch)"}}>Clutch</b>
<div className="stars" id="cl" aria-label="5 out of 5 stars">★★★★★</div>
<div className="sub">Top‑rated SEO specialist</div></div>
<div className="score"><b>5.0</b><span>/ 5.0</span></div>
</div>
</div>
<div className="rev-cards">
<div className="rcard"><div className="stars sm" aria-label="5 out of 5 stars">★★★★★</div><p>"Best SEO decision we made. Traffic up, leads up, and the communication is first‑class."</p>
<div className="who"><b>Michael R.</b><span>via Trustpilot</span></div></div>
<div className="rcard"><div className="stars sm" aria-label="5 out of 5 stars">★★★★★</div><p>"Strategic, transparent and genuinely results‑driven. Ranked us in a tough niche."</p>
<div className="who"><b>Aisha N.</b><span>via Clutch</span></div></div>
<div className="rcard"><div className="stars sm" aria-label="5 out of 5 stars">★★★★★</div><p>"Delivered exactly what was promised, on time. Our organic revenue doubled."</p>
<div className="who"><b>Daniel P.</b><span>via Trustpilot</span></div></div>
</div>
</div></section>
</>); }

function About() { return (<>
<section className="block" id="about" style={{"background": "var(--tint)"}}><div className="wrap about-grid">
<div className="about-photo">
<div className="frame"><img src="/images/arslan-tariq.png" alt="Arslan Tariq" width="300" height="300" loading="lazy" /></div>
<div className="badge">★ 7+ years in SEO</div>
</div>
<div className="about-text">
<span className="eyebrow">About me</span>
<h2>Hi, I'm Arslan — your SEO &amp; growth partner.</h2>
<p>I help businesses climb the search results and stay there. Over 7+ years I've ranked
      sites across transportation, e‑commerce, finance and local service — and built paid
      and social campaigns that turn attention into customers.</p>
<p>My approach is simple: solid technical foundations, keywords that convert, and every
      decision backed by data you can verify.</p>
<div className="creds">
<div className="cred"><b>7+</b><span>years experience</span></div>
<div className="cred"><b>4</b><span>industries served</span></div>
<div className="cred"><b>840+</b><span>top‑3 keywords</span></div>
</div>
</div>
</div></section>
</>); }

function Questions() { return (<>
<section className="block" id="faq" style={{"paddingTop": "0"}}><div className="wrap">
<div className="head center"><span className="eyebrow">FAQ</span>
<h2>Questions, answered.</h2>
<p>The things business owners ask most before we start working together.</p></div>
<FAQ />
</div></section>
</>); }

function Contact() { return (<>
<section className="block" id="contact" style={{"paddingTop": "0"}}><div className="wrap">
<div className="cta">
<div className="grid"></div>
<span className="eyebrow" style={{"color": "#D7E0FF", "position": "relative"}}>Free consultation</span>
<h2>Let's bring your rankings to life.</h2>
<p>Ready to grow? Send a message and I'll map out your custom growth plan.</p>
<div className="row">
<div className="c"><span>PHONE / WHATSAPP</span><a href="tel:+923478724400">+92 347 8724400</a></div>
<div className="c"><span>EMAIL</span><a href="mailto:arslantariq082@gmail.com">arslantariq082@gmail.com</a></div>
</div>
<a href="mailto:arslantariq082@gmail.com" className="btn">Book a free consultation
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
</div>
</div></section>
</>); }

export function Footer({ home = '#top' }: { home?: string } = {}) { return (<>
<footer><div className="wrap row">
<a href={home} className="logo"><svg className="mk"><use href="#mark"></use></svg><div><b>Search Engine</b><b className="x">Xperts</b></div></a>
<div className="fl">© 2026 Arslan Tariq · SEO &amp; Digital Growth Specialist</div>
</div></footer>
</>); }

export default function Site() { return <><a className="skip-link" href="#main">Skip to content</a><BrandDefinitions /><Header /><main id="main"><Hero /><TrustStrip /><Approach /><Services /><Process /><CaseStudies /><AuditBanner /><Testimonials /><Reviews /><About /><Questions /><Contact /></main><Footer /></>; }

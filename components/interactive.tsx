'use client';

import { useState, type FormEvent } from 'react';
import questions from './faq-data.json';

const services = ['AI SEO', 'Local SEO', 'GMB Optimization', 'Ecommerce SEO', 'Backlinks & Digital PR', 'SEO Content Writing'];

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return <header><div className="wrap nav">
    <a href="#top" className="logo" aria-label="Search Engine Xperts home"><svg className="mk" aria-hidden="true"><use href="#mark" /></svg><div><b>Search Engine</b><b className="x">Xperts<span className="logo-dot">.</span></b></div></a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
    <nav id="navigation" className={`links ${open ? 'mobile-open' : ''}`} aria-label="Main navigation">
      <div className="navitem"><button className="navlink" aria-expanded={servicesOpen} aria-controls="service-menu" onClick={() => setServicesOpen(!servicesOpen)} onKeyDown={e => { if(e.key === 'Escape') setServicesOpen(false); }}>Services <span aria-hidden="true">⌄</span></button>
        {servicesOpen && <div id="service-menu" className="dropdown visible">{services.map((s,i) => <a key={s} href={`#service-${i+1}`} onClick={() => {setOpen(false);setServicesOpen(false);}}>{s}</a>)}</div>}
      </div>
      {[['Our process','#process'],['Results','#work'],['About Arslan','#about'],['FAQs','#faq']].map(([label,href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <a href="#contact" className="btn btn-primary nav-cta">Let’s talk growth <span aria-hidden="true">↗</span></a>
  </div></header>;
}

export function AuditForm() {
  const [website,setWebsite] = useState('');
  const [error,setError] = useState('');
  const [ready,setReady] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const url = new URL(/^https?:\/\//i.test(website.trim()) ? website.trim() : `https://${website.trim()}`);
      if (!['http:','https:'].includes(url.protocol) || !url.hostname.includes('.') || /\s/.test(website)) throw new Error();
      setError('');setReady(true);
    } catch {setError('Please enter a valid website, such as yoursite.com.');setReady(false);}
  }
  const email = `mailto:arslantariq082@gmail.com?subject=${encodeURIComponent('Free SEO audit request')}&body=${encodeURIComponent(`Hi Arslan,\n\nI would like a free SEO audit for ${website.trim()}.\n\nMy business goals are:\n`)}`;
  return <div className="audit-container"><form className="audit" onSubmit={submit} noValidate>
    <span className="input-globe" aria-hidden="true">◎</span><input aria-label="Your website URL" aria-invalid={!!error} aria-describedby={error ? 'audit-error' : 'audit-hint'} type="text" inputMode="url" value={website} onChange={e=>{setWebsite(e.target.value);setReady(false);setError('');}} placeholder="Enter your website URL" required />
    <button className="btn btn-primary" type="submit">Get free audit <span aria-hidden="true">↗</span></button>
  </form><p id="audit-hint" className="audit-hint">✓ Personalized insights <span>✓ No commitment</span></p>
    {error && <p id="audit-error" className="form-error" role="alert">{error}</p>}
    {ready && <div className="audit-ready" role="status"><b>Your website is ready for a review.</b><p>Send your request to Arslan using your email app.</p><a href={email}>Email my audit request →</a></div>}
  </div>;
}

const periods = {
  '24H': {clicks:'879',impressions:'13.0K',lift:'12',points:'0,93 35,78 70,84 105,61 140,70 175,48 210,59 245,30 280,38 315,15 360,8'},
  '7D': {clicks:'6.2K',impressions:'91.3K',lift:'15',points:'0,98 35,89 70,66 105,78 140,53 175,63 210,35 245,46 280,22 315,30 360,9'},
  '28D': {clicks:'24.6K',impressions:'365K',lift:'18',points:'0,101 24,93 48,98 72,78 96,85 120,64 144,70 168,50 192,59 216,37 240,45 264,23 288,32 312,13 336,20 360,4'},
  '3M': {clicks:'73.8K',impressions:'1.09M',lift:'32',points:'0,110 35,101 70,105 105,80 140,83 175,61 210,65 245,39 280,45 315,18 360,2'},
};
export function Dashboard() {
  const [period,setPeriod] = useState<keyof typeof periods>('28D');
  const data=periods[period];
  return <div className="dashboard-stage"><div className="dashboard-orbit" aria-hidden="true"/><div className="dash">
    <div className="dashboard-browser"><div className="browser-dots"><i/><i/><i/></div><span>search performance overview</span><span>↗</span></div>
    <div className="top"><b><span className="live-dot"/> Organic performance</b><span className="demo-label">Illustrative data</span></div>
    <div className="tabs" role="group" aria-label="Dashboard date range">{(Object.keys(periods) as Array<keyof typeof periods>).map(p=><button key={p} onClick={()=>setPeriod(p)} aria-pressed={period===p} className={period===p?'on':''}>{p}</button>)}</div>
    <div className="dcards" aria-live="polite"><div className="dcard b1"><div className="l">Total clicks ↗</div><div className="v">{data.clicks}</div><div className="up">↑ {data.lift}% <span>vs. previous period</span></div></div><div className="dcard b2"><div className="l">Total impressions ↗</div><div className="v">{data.impressions}</div><div className="up">↑ {data.lift}% <span>vs. previous period</span></div></div></div>
    <div className="chartbox"><div className="chart-heading"><span className="cl">Organic traffic</span><span>● Clicks</span></div><svg viewBox="0 0 360 125" width="100%" height="140" role="img" aria-label={`Illustrative upward traffic trend for ${period}`}><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#345df7" stopOpacity=".2"/><stop offset="1" stopColor="#345df7" stopOpacity="0"/></linearGradient></defs>{[20,50,80,110].map(y=><line key={y} x1="0" x2="360" y1={y} y2={y} stroke="#e9edf7" strokeDasharray="4 5"/>)}<polygon points={`0,125 ${data.points} 360,125`} fill="url(#chart-fill)"/><polyline points={data.points} fill="none" stroke="#345df7" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round"/></svg><div className="chart-axis"><span>Start of period</span><span>End of period</span></div></div>
    <div className="queries"><div className="qh">Top search queries <span>Clicks</span></div>{[['digital marketing',100,'3.3K'],['seo services',65,'1.6K'],['website audit',48,'1.3K']].map(([label,width,count])=><div className="qrow" key={label}><span className="qn">{label}</span><div className="query-track"><span className="bar" style={{width:`${width}%`}}/></div><span className="qv">{count}</span></div>)}</div>
    </div><div className="growth-float"><span className="growth-icon">↗</span><div><b>Built for steady growth</b><span>More visibility. More opportunity.</span></div></div></div>;
}

export function FAQ() {
  const [active,setActive] = useState<number|null>(0);
  return <div className="faq">{questions.map((item,i)=><div key={item.question} className={`faq-item ${active===i?'open':''}`}><h3><button id={`question-${i}`} className="faq-q" aria-expanded={active===i} aria-controls={`answer-${i}`} onClick={()=>setActive(active===i?null:i)}>{item.question}<span className="ico" aria-hidden="true">{active===i?'−':'+'}</span></button></h3><div id={`answer-${i}`} role="region" aria-labelledby={`question-${i}`} hidden={active!==i} className="faq-answer"><p>{item.answer}</p></div></div>)}</div>;
}

import type { Post } from '../blog/types';
import { guidance } from './guidance';
import {
  dashboardUrl, endDate, formatUpdateDate, neighbours, onDashboard, sameType, typeName, updatePath, type AlgoUpdate,
} from './updates';

// Turns one update from ./updates.ts into a blog-style article (the same Post shape and ArticlePage template
// as /blog/<slug>), shown at /google-algorithm-updates/<id>.

export const reviewed = '2026-11-27';   // when the update articles were last checked against Google's dashboard

const kind = (u: AlgoUpdate) => `${typeName(u.type)}${u.type === 'Core' || u.type === 'Spam' ? ' update' : ''}`;
const firstSentence = (t: string) => t.match(/^.*?\.(\s|$)/)?.[0].trim() ?? t;
const planned = (u: AlgoUpdate) => u.release
  ? new Date(`${u.release}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
  : undefined;

export function updateFaqs(u: AlgoUpdate) {
  const end = endDate(u);
  const list: { question: string; answer: string }[] = [];
  if (u.status === 'Announced') {
    list.push({ question: `When will the ${u.name} start?`, answer: `Google announced it on ${formatUpdateDate(u.date)} and said it is scheduled for release in ${planned(u) ?? 'the coming weeks'}, without giving a start date. Google will confirm the release on its Search Status Dashboard when the rollout begins.` });
  } else {
    list.push({ question: `When did the ${u.name} start?`, answer: `It started on ${formatUpdateDate(u.date)}.${end ? ` Google marked it complete on ${formatUpdateDate(end)}.` : ''}` });
    if (u.rollout) list.push({ question: `How long did the ${u.name} take to roll out?`, answer: `${u.rollout}${onDashboard(u) ? ', according to Google’s Search Status Dashboard' : ''}.` });
  }
  list.push({ question: `What did the ${u.name} change?`, answer: u.summary });
  const g = guidance[u.type];
  list.push({ question: `What should I do if the ${u.name} affected my site?`, answer: `${g.steps[0].p} ${g.steps[1].p}` });
  return list;
}

function UpdateBody({ u }: { u: AlgoUpdate }) {
  const end = endDate(u);
  const g = guidance[u.type];
  const { newer, older } = neighbours(u);
  const more = sameType(u, 5).filter(x => x !== newer && x !== older).slice(0, 4);
  const rows: [string, string][] = [
    ['Update', u.name],
    ['Type', kind(u)],
    [u.status === 'Announced' ? 'Announced' : 'Started', formatUpdateDate(u.date)],
    ...(planned(u) ? [['Planned release', planned(u)!] as [string, string]] : []),
    ...(end ? [['Completed', formatUpdateDate(end)] as [string, string]] : []),
    ...(u.rollout ? [['Rollout length', u.rollout] as [string, string]] : []),
    ['Status', u.status === 'Announced' ? 'Announced, not live yet' : u.status === 'Complete' ? 'Complete' : 'Confirmed by Google'],
  ];
  const meaning = u.type === 'Other' ? 'What this kind of change means' : `What a ${typeName(u.type).toLowerCase()} update means`;

  return <>
    <section id="what-happened">
      <h2>What happened</h2>
      <p>{u.summary}</p>
      {u.details?.map(d => <p key={d}>{d}</p>)}
    </section>

    <section id="key-facts">
      <h2>Key facts</h2>
      <div className="post-table ga-facts-table"><table>
        <caption>Key facts about the {u.name}</caption>
        <tbody>{rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
      </table></div>
      {onDashboard(u) && <p className="ga-src">Dates and rollout length from Google’s <a href={dashboardUrl} rel="noopener">Search Status Dashboard</a>.</p>}
    </section>

    <section id="what-it-means">
      <h2>{meaning}</h2>
      {g.about.map(p => <p key={p}>{p}</p>)}
    </section>

    <section id="what-to-do">
      <h2>{u.status === 'Announced' ? 'How to prepare' : 'What to do if your traffic changed'}</h2>
      {g.steps.map((s, i) => <div key={s.h}>
        <h3>{i + 1}. {s.h}</h3>
        <p>{s.p}</p>
      </div>)}
      <p>Check the pages that moved with our free <a href="/seo-tools/seo-audit-tool">SEO audit tool</a> and <a href="/seo-tools/technical-seo-checker">technical SEO checker</a>.</p>
    </section>

    <section id="related-updates">
      <h2>Updates before and after</h2>
      <p>
        {older && <>The update before this one was the <a href={updatePath(older)}>{older.name}</a> ({formatUpdateDate(older.date)}). </>}
        {newer && <>The next was the <a href={updatePath(newer)}>{newer.name}</a> ({formatUpdateDate(newer.date)}).</>}
      </p>
      {more.length > 0 && <>
        <h3>More {kind(u).toLowerCase()}s</h3>
        <ul className="post-list">{more.map(m => <li key={m.id}><a href={updatePath(m)}>{m.name}</a>, {formatUpdateDate(m.date)}</li>)}</ul>
      </>}
      <p>See every confirmed change, newest first, on our <a href="/google-algorithm-updates">Google algorithm update</a> page.</p>
    </section>
  </>;
}

export function updatePost(u: AlgoUpdate): Post {
  const end = endDate(u);
  const g = guidance[u.type];
  const announced = u.status === 'Announced';
  const title = announced ? `${u.name}: What Google Has Announced` : `${u.name}: Dates, Impact and What to Do`;
  const when = announced
    ? `Announced on ${formatUpdateDate(u.date)}${planned(u) ? `, planned for ${planned(u)}` : ''}.`
    : `Started ${formatUpdateDate(u.date)}${end ? `, completed ${formatUpdateDate(end)}` : ''}.`;
  const description = (() => {
    const t = `${u.name}: ${when} ${firstSentence(u.summary)}`;
    return t.length <= 158 ? t : `${t.slice(0, 155).replace(/\s+\S*$/, '')}…`;
  })();
  const faqs = updateFaqs(u);
  const words = [u.summary, ...(u.details ?? []), ...g.about, ...g.steps.map(s => s.p), ...faqs.map(f => f.answer)].join(' ').split(/\s+/).length + 120;
  const { newer, older } = neighbours(u);

  return {
    slug: u.id,
    title,
    metaTitle: title,
    description,
    dek: announced
      ? `Google announced this ${kind(u).toLowerCase()} on ${formatUpdateDate(u.date)}. Here is what Google has said so far and how to prepare your site.`
      : `${when} Here is what changed, who it affected and what to do if your traffic moved.`,
    eyebrow: kind(u),
    category: u.name,
    published: reviewed,
    modified: reviewed,
    readTime: `${Math.max(3, Math.round(words / 200))} min read`,
    image: { src: `/images/updates/${u.id}.png`, alt: `${u.name}: ${when}`, width: 1600, height: 900 },
    takeaways: [
      announced ? `Google announced the ${u.name} on ${formatUpdateDate(u.date)}${planned(u) ? ` for release in ${planned(u)}` : ''}; it is not live yet.`
        : `The ${u.name} started on ${formatUpdateDate(u.date)}${end ? ` and was complete on ${formatUpdateDate(end)}` : ''}${u.rollout ? `, a rollout of ${u.rollout}` : ''}.`,
      firstSentence(u.summary),
      firstSentence(g.about[0]),
      `${g.steps[0].h}, then ${g.steps[1].h.charAt(0).toLowerCase()}${g.steps[1].h.slice(1)}.`,
    ],
    toc: [
      { id: 'what-happened', label: 'What happened' },
      { id: 'key-facts', label: 'Key facts' },
      { id: 'what-it-means', label: u.type === 'Other' ? 'What this change means' : `What a ${typeName(u.type).toLowerCase()} update means` },
      { id: 'what-to-do', label: announced ? 'How to prepare' : 'What to do' },
      { id: 'related-updates', label: 'Updates before and after' },
      { id: 'faq', label: 'Frequently asked questions' },
    ],
    faqs,
    cta: {
      eyebrow: 'Hit by an update?',
      heading: 'Get an expert review of your traffic drop',
      text: 'We’ll compare your data before and after the update and show you which pages to fix first. Free, no commitment.',
      label: 'Get my free audit',
      href: '/#contact',
    },
    next: [
      ...(older ? [{ kicker: 'Previous update', title: older.name, text: firstSentence(older.summary), href: updatePath(older), label: 'Read the update' }] : []),
      ...(newer ? [{ kicker: 'Next update', title: newer.name, text: firstSentence(newer.summary), href: updatePath(newer), label: 'Read the update' }] : []),
      { kicker: 'All updates', title: 'Google Algorithm Update', text: 'Every confirmed Google ranking update, newest first, with dates and rollout times.', href: '/google-algorithm-updates', label: 'See the full list' },
    ],
    Body: () => <UpdateBody u={u} />,
  };
}

"""HTML building blocks shared by every generated service page.

The layout, class names and section order mirror public/ai-seo-services.html,
which is the master design. Its <style>, header, case studies and scripts are
copied from that file at build time, so a design change there flows to every page.
"""
import html
import re

ICONS = {
    'search': '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    'pin': '<path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    'star': '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    'spark': '<path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z"/>',
    'chat': '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    'grid': '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    'edit': '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    'code': '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
    'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    'link': '<path d="M10 13a4 4 0 005.6 0l2.4-2.4a4 4 0 00-5.6-5.6L11 6.5"/><path d="M14 11a4 4 0 00-5.6 0L6 13.4a4 4 0 005.6 5.6L13 17.5"/>',
    'megaphone': '<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
    'chart': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    'refresh': '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
    'sliders': '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    'cart': '<path d="M5 7h15l-1.5 9h-12z"/><path d="M5 7L4 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/>',
    'bag': '<path d="M6 2l1.5 4h9L18 2M4 6h16l-1.5 14a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2z"/>',
    'home': '<path d="M3 21V10l9-6 9 6v11M9 21v-6h6v6"/>',
    'monitor': '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
    'layers': '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
    'pulse': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    'briefcase': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'eye': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'check': '<path d="M5 13l4 4L19 7"/>',
    'x': '<path d="M6 6l12 12M18 6L6 18"/>',
    'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    'camera': '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    'doc': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    'news': '<path d="M4 4h13v16H6a2 2 0 0 1-2-2z"/><path d="M17 8h3v10a2 2 0 0 1-2 2"/><path d="M8 8h5M8 12h5M8 16h3"/>',
    'mic': '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5"/>',
    'tag': '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
    'alert': '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
    'car': '<path d="M3 17h18v-4l-2-5H5l-2 5z"/><path d="M3 13h18"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    'utensils': '<path d="M4 2v8a3 3 0 0 0 6 0V2M7 2v20M17 2c-2 2-3 5-3 8h3v12"/>',
    'scissors': '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/>',
    'bed': '<path d="M2 20V6M2 14h20v6M22 14v-3a3 3 0 0 0-3-3h-8v6"/><circle cx="6.5" cy="10.5" r="1.5"/>',
    'rocket': '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M14 4c3-1 6-1 6-1s0 3-1 6l-7 7-4-4z"/><path d="M9 11H5l3-3h4M13 15v4l3-3v-4"/>',
    'trend': '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    'store': '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/>',
    'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
    'target': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    'heart': '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/>',
    'scale': '<path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
    'box': '<path d="M21 16V8l-9-5-9 5v8l9 5z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
    'move': '<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>',
    'list': '<path d="M4 6h16M4 12h16M4 18h10"/>',
    'image': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
    'help': '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    'filter': '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
    'zap': '<path d="M13 2L3 14h7l-1 8 11-14h-8z"/>',
    'arrow': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
    'info': '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'ext': '<path d="M7 17L17 7M8 7h9v9"/>',
}


def icon(name, size=20, sw='2', extra=''):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"{extra}>{ICONS[name]}</svg>')


def plain(s):
    """HTML fragment -> plain text (for JSON-LD and meta)."""
    return html.unescape(re.sub(r'<[^>]+>', '', s)).strip()


STARS = '<span class="stars" aria-label="5 stars">★★★★★</span>'


# ---------- section builders ----------

def head_block(eyebrow, h2, p, center=True, dark=False):
    style = ' style="color:#7FA0FF;"' if dark else ''
    cls = 'head center' if center else 'head'
    ps = ''.join(f'\n    <p>{x}</p>' for x in ([p] if isinstance(p, str) else p))
    return f'<div class="{cls}"><span class="eyebrow"{style}>{eyebrow}</span>\n    <h2>{h2}</h2>{ps}</div>'


def hero(d):
    stats = ''.join(f'\n      <div class="m"><b>{b}</b><span>{s}</span></div>' for b, s in d['stats'])
    return f'''<section class="hero" id="top"><div class="wrap hero-grid">
  <div>
    <span class="tag"><span class="d">{icon(d['tag_icon'], 12, '2.6')}</span> {d['tag']}</span>
    <h1>{d['h1']}</h1>
    <p class="lead">{d['lead']}</p>
    <div class="hero-ctas">
      <a href="#audit" class="btn btn-primary">{d['cta']}</a>
      <a href="#framework" class="btn btn-ghost">{d['cta2']}</a>
    </div>
    <div class="hero-trust">{stats}
    </div>
  </div>

  <div class="hero-visual">
    <svg class="orbits" viewBox="0 0 600 600" aria-hidden="true">
      <circle cx="300" cy="300" r="290" fill="none" stroke="#C9D5FA" stroke-dasharray="3 7"/>
      <circle cx="300" cy="300" r="215" fill="none" stroke="#DCE4FB"/>
      <circle cx="300" cy="300" r="140" fill="none" stroke="#C9D5FA" stroke-dasharray="2 6"/>
      <circle cx="505" cy="95" r="7" fill="#345DF7"/>
      <circle cx="88" cy="420" r="5" fill="#4A6CFF"/>
      <circle cx="300" cy="10" r="4" fill="#9DB2FF"/>
      <circle cx="515" cy="440" r="4" fill="#9DB2FF"/>
    </svg>
    <div class="ai-panel vt">
{d['visual']}
    </div>
    <div class="float f1"><div class="ic">{icon(d['float'][0], 16)}</div><div><b>{d['float'][1]}</b><span>{d['float'][2]}</span></div></div>
  </div>
</div></section>'''


def vt_prompt(q, ic='search'):
    return (f'<div class="vt-prompt"><span class="vt-spark">{icon(ic, 14, "2.1")}</span>'
            f'<span class="vt-q">{q}</span><span class="vt-send">{icon("up", 12, "2.6")}</span></div>')


def vt_list(title, note, rows):
    """rows: (icon, title, sub, status_class, status_label)"""
    lis = ''.join(f'<li><span class="vt-i">{icon(i, 15, "2.1")}</span><div><b>{t}</b><small>{s}</small></div>'
                  f'<span class="vt-s {c}">{l}</span></li>' for i, t, s, c, l in rows)
    return f'<div class="vt-list-h"><b>{title}</b><span>{note}</span></div>\n      <ul class="vt-list">{lis}</ul>'


def trust(items):
    out = ''.join(f'\n  <div class="t"><span class="ic">{icon(i, 20)}</span><span>{t}</span></div>' for i, t in items)
    return f'<section class="trust"><div class="wrap row">{out}\n</div></section>'


def landscape(d):
    arrow = f'<div class="larrow">{icon("arrow", 22, "2.5")}</div>'
    stages = f'\n    {arrow}\n    '.join(
        f'<div class="lstage"><div class="ln">{a}</div><h3>{b}</h3><p>{c}</p></div>' for a, b, c in d['stages'])
    return f'''<section class="block landscape"><div class="wrap">
  {head_block(d['eyebrow'], d['h2'], d['p'], dark=True)}

  <div class="lflow">
    {stages}
  </div>
</div></section>'''


def entity_fig(center, sub, labels, caption):
    # Same geometry as the AI SEO page's entity diagram; only the labels change.
    pos = [(90, 74), (330, 66), (376, 179), (320, 274), (100, 266), (44, 174)]
    texts = ''.join(f'<text x="{x}" y="{y}">{t}</text>' for (x, y), t in zip(pos, labels))
    return f'''<figure class="entity-fig" aria-hidden="true">
    <svg viewBox="0 0 420 320">
      <g stroke="#B9C8F5" stroke-width="1.5" stroke-dasharray="4 5" fill="none">
        <path d="M210 160 L90 70"/><path d="M210 160 L330 62"/><path d="M210 160 L380 175"/>
        <path d="M210 160 L320 270"/><path d="M210 160 L100 262"/><path d="M210 160 L44 170"/>
      </g>
      <g font-family="Poppins,sans-serif" font-size="11.5" font-weight="600" text-anchor="middle">
        <circle cx="210" cy="160" r="54" fill="#0B1437"/>
        <circle cx="210" cy="160" r="66" fill="none" stroke="#345DF7" stroke-opacity=".25" stroke-width="8"/>
        <text x="210" y="157" fill="#fff" font-size="14">{center}</text>
        <text x="210" y="175" fill="#9FB0E6" font-size="10" font-weight="500">{sub}</text>
        <g fill="#fff" stroke="#DCE4FB" stroke-width="2">
          <rect x="40" y="52" width="100" height="36" rx="18"/><rect x="280" y="44" width="100" height="36" rx="18"/>
          <rect x="332" y="157" width="86" height="36" rx="18"/><rect x="266" y="252" width="108" height="36" rx="18"/>
          <rect x="46" y="244" width="108" height="36" rx="18"/><rect x="2" y="152" width="86" height="36" rx="18"/>
        </g>
        <g fill="#11214F">{texts}</g>
      </g>
    </svg>
    <figcaption>{caption}</figcaption>
  </figure>'''


def definition(d):
    def panel(cls, p):
        ic = 'x' if p.get('neg') else 'check'
        lis = ''.join(f'\n          <li>{icon(ic, 16)} {x}</li>' for x in p['items'])
        return f'''<div class="cpanel {cls}">
        <span class="ct">{p['label']}</span>
        <h3>{p['title']}</h3>
        <ul>{lis}
        </ul>
      </div>'''
    return f'''<section class="block" id="what-is"><div class="wrap" style="position:relative;">
  {entity_fig(*d['entity'])}
  {head_block('Definition', d['h2'], d['p'], center=False)}

  <div class="compare-wrap">
    <div class="compare">
      {panel('trad', d['left'])}
      {panel('ai', d['right'])}
      <div class="compare-x">{d.get('x', '+')}</div>
    </div>
  </div>

  <div class="together">
    {icon('info', 20)}
    <p>{d['note']}</p>
  </div>
</div></section>'''


def shot(label, body_cls, body, title, caption):
    return f'''<figure class="shot">
      <div class="frame">
        <div class="fbar"><i></i><i></i><i></i><span>{label}</span></div>
        <div class="fbody {body_cls}">
{body}
        </div>
      </div>
      <figcaption><b>{title}</b>{caption}</figcaption>
    </figure>'''


def shots(d):
    figs = '\n    '.join(shot(*s) for s in d['shots'])
    return f'''<section class="block" id="visibility"><div class="wrap">
  {head_block('What it looks like', d['h2'], d['p'])}

  <div class="shots">
    {figs}
  </div>
  <p class="shots-note">Illustrative examples using a sample brand.</p>
</div></section>'''


def services(d):
    cards = []
    for k, (ic, t, p, *cta) in enumerate(d['cards']):
        feat = ' feat' if k == 0 else ''
        more = ''
        if cta:
            label, href = cta[0]
            more = f'\n      <a href="{href}" class="more">{label} {icon("arrow", 14)}</a>'
        cards.append(f'''<div class="svc{feat}">
      <div class="ic">{icon(ic, 22)}</div>
      <h3>{t}</h3>
      <p>{p}</p>{more}
    </div>''')
    body = '\n    '.join(cards)
    return f'''<section class="block" id="services" style="background:var(--tint);"><div class="wrap">
  {head_block('What we do', d['h2'], d['p'])}

  <div class="bento">
    {body}
  </div>
</div></section>'''


NODE_POS = [(50, 8), (86.4, 29), (86.4, 71), (50, 92), (13.6, 71), (13.6, 29)]


def framework(d):
    stages = d['stages']
    nodes = ''.join(
        f'<button type="button" class="node" style="left:{x}%;top:{y}%" aria-label="Stage {i+1}: {s[1]}" '
        f'aria-pressed="{"true" if i == 0 else "false"}" data-i="{i}">{icon(s[0], 18).replace(" width=\"18\" height=\"18\"", "")}0{i+1}</button>'
        for i, ((x, y), s) in enumerate(zip(NODE_POS, stages)))
    steps = '\n'.join(f'''        <div class="pstep"{'' if i == 0 else ' hidden'}>
          <div class="picon">{icon(ic, 24)}</div>
          <span class="pk">Stage 0{i+1}</span>
          <h3>{t}</h3>
          <p>{p}</p>
          <div class="tagset">{''.join(f'<span>{x}</span>' for x in tags)}</div>
        </div>''' for i, (ic, t, p, tags) in enumerate(stages))
    dots = ''.join(f'<button type="button" class="pdot" aria-label="Go to stage {i+1}" data-i="{i}"'
                   f'{" aria-current=\"step\"" if i == 0 else ""}></button>' for i in range(6))
    return f'''<section class="block" id="framework"><div class="wrap">
  {head_block('Our methodology', d['h2'], d['p'])}

  <div class="proc">
    <div class="orbit">
      <svg class="ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#B9C8F5" stroke-width=".45" stroke-dasharray="1.6 1.6"/>
        <circle class="arc" cx="50" cy="50" r="42" fill="none" stroke="#345DF7" stroke-width=".9" stroke-linecap="round" stroke-dasharray="263.9" stroke-dashoffset="219.9" transform="rotate(-90 50 50)"/>
      </svg>
      <div class="core"><b id="coreNum">01</b><span>of 6 stages</span></div>
      {nodes}
    </div>
    <div class="pcard" aria-live="polite">
{steps}
      <div class="pdots">{dots}</div>
    </div>
  </div>
</div></section>'''


def stack(d):
    widths = [60, 70, 80, 90, 100]
    layers = ''.join(f'<div class="ly ly{i}" style="width:{w}%">{icon(ic, 16)}{t}</div>'
                     for i, (w, (ic, t)) in enumerate(zip(widths, d['layers'])))
    outs = ''.join(f'<li><span class="oi">{icon(ic, 17)}</span><div><b>{b}</b><small>{s}</small></div></li>'
                   for ic, b, s in d['outs'])
    return f'''<section class="block" id="stack" style="background:var(--tint);"><div class="wrap">
  {head_block('How it fits together', d['h2'], d['p'])}

  <div class="stackviz">
    <div class="layers">{layers}<span class="base-note">Foundation</span></div>
    <svg class="fan" viewBox="0 0 140 292" aria-hidden="true">
      <g fill="none" stroke="#9DB2FF" stroke-width="1.6" stroke-dasharray="4 5" class="flow"><path d="M14 146 C70 146 70 32 136 32"/><path d="M14 146 C70 146 70 108 136 108"/><path d="M14 146 C70 146 70 184 136 184"/><path d="M14 146 C70 146 70 260 136 260"/></g>
      <circle cx="10" cy="146" r="8" fill="#0B1437"/><circle cx="10" cy="146" r="3.5" fill="#4A6CFF"/>
      <circle cx="136" cy="32" r="3.5" fill="#345DF7"/><circle cx="136" cy="108" r="3.5" fill="#345DF7"/><circle cx="136" cy="184" r="3.5" fill="#345DF7"/><circle cx="136" cy="260" r="3.5" fill="#345DF7"/>
    </svg>
    <div class="outs-wrap"><span class="outs-k">Visible in</span><ul class="outs">{outs}</ul></div>
  </div>
</div></section>'''


def audience(d):
    cards = '\n    '.join(f'<div class="aud"><div class="ic">{icon(ic, 20)}</div><h3>{t}</h3><p>{p}</p></div>'
                           for ic, t, p in d['cards'])
    return f'''<section class="block" id="who"><div class="wrap">
  {head_block('Is this for you', d['h2'], d['p'])}

  <div class="aud-grid">
    {cards}
  </div>
</div></section>'''


def why(d):
    rows = ''
    for r, (ic, label, a, b) in enumerate(d['rows'], start=2):
        rows += f'''
      <div class="vs-l" style="grid-column:1;grid-row:{r}"><span class="vs-li">{icon(ic, 16)}</span>{label}</div>
      <div class="vs-a" style="grid-column:2;grid-row:{r}"><span class="vs-x">{icon('x', 12, '3')}</span>{a}</div>
      <div class="vs-b" style="grid-column:3;grid-row:{r}"><span class="vs-c">{icon('check', 12, '3')}</span>{b}</div>'''
    return f'''<section class="block" id="why" style="background:var(--tint);"><div class="wrap">
  {head_block('Why work with us', d['h2'], d['p'])}

  <div class="vs">
    <div class="vs-hl" aria-hidden="true"></div>
    <div class="vs-h vs-h0" style="grid-column:1;grid-row:1"></div>
    <div class="vs-h vs-ha" style="grid-column:2;grid-row:1">Typical agency</div>
    <div class="vs-h vs-hb"><svg><use href="#mark"/></svg>Search Engine Xperts</div>{rows}
  </div>
</div></section>'''


def audit(d):
    checks = ''.join(f'\n          <div class="chk"><div class="cb">{icon("check", 12, "3")}</div><span>{c}</span></div>'
                     for c in d['checks'])
    return f'''<section class="block" id="audit"><div class="wrap">
  <div class="audit-banner">
    <div class="grid"></div>
    <div class="inner">
      <div>
        <span class="eyebrow" style="color:#7FA0FF;">{d['eyebrow']}</span>
        <h2>{d['h2']}</h2>
        <p>{d['p']}</p>
        <div class="checks">{checks}
        </div>
      </div>
      <form class="audit-form" novalidate>
        <div class="field"><label class="fl" for="site">Your website</label><input id="site" type="text" name="website" placeholder="yoursite.com" required></div>
        <div class="field"><label class="fl" for="email">Work email</label><input id="email" type="email" name="email" placeholder="you@company.com" required></div>
        <button type="submit" class="btn btn-primary">{d['button']}</button>
        <p class="micro" id="audit-msg" role="status">We reply within one business day. No obligation.</p>
      </form>
    </div>
  </div>
</div></section>'''


def faq(d, topic):
    items = ''.join(f'''
    <div class="faq-item">
      <button class="faq-q">{q}<span class="ico">{icon('plus', 15, '2.4')}</span></button>
      <div class="faq-a"><p>{a}</p></div>
    </div>''' for q, a in d['items'])
    return f'''<section class="block" id="faq"><div class="wrap">
  {head_block('FAQ', d['h2'], d['p'])}
  <div class="faq">
{items}

  </div>
</div></section>'''


def final_cta(d):
    nodes = ''.join(f'<span class="cn n{i+1}">{icon(ic, 14, "2.2")}{t}</span>' for i, (ic, t) in enumerate(d['nodes']))
    trust_li = ''.join(f'<li><span>{icon("check", 12, "3")}</span>{t}</li>' for t in
                       ['Reply within one business day', 'No obligation', 'Based on your real data'])
    return f'''<section class="block" id="contact" style="padding-top:0;"><div class="wrap">
  <div class="cta2">
    <div class="cta2-grid" aria-hidden="true"></div>
    <div class="cta2-copy">
      <span class="cta2-k">{d['kicker']}</span>
      <h2>{d['h2']}</h2>
      <p>{d['p']}</p>
      <div class="cta2-btns">
        <a href="#audit" class="btn btn-primary">Get My Free Audit</a>
        <a href="/#contact" class="btn cta2-ghost">Talk to our team</a>
      </div>
      <ul class="cta2-trust">{trust_li}</ul>
    </div>
    <div class="cta2-vis" aria-hidden="true">
      <svg class="cta2-rings" viewBox="0 0 440 220" preserveAspectRatio="none">
        <ellipse cx="220" cy="110" rx="205" ry="98" fill="none" stroke="rgba(157,178,255,.25)" stroke-dasharray="3 7"/>
        <ellipse cx="220" cy="110" rx="130" ry="62" fill="none" stroke="rgba(157,178,255,.32)"/>
        <g stroke="rgba(157,178,255,.45)" stroke-width="1.2" stroke-dasharray="3 5">
          <path d="M220 110L220 22"/><path d="M220 110L370 80"/><path d="M220 110L350 192"/><path d="M220 110L90 192"/><path d="M220 110L70 80"/>
        </g>
      </svg>
      <div class="cta2-core"><svg><use href="#mark"/></svg><b>{d['core']}</b></div>
      {nodes}
    </div>
  </div>
</div></section>'''

"""Build the standalone service pages from public/ai-seo-services.html.

    python3 scripts/service_pages/build.py

The AI SEO page is the master design: its <style>, logo symbol, header, case
studies, footer and scripts are reused, and each page's own copy comes from
content.py. The script also refreshes the Services menu and footer links in
the AI SEO page so all six pages link to each other.

Each generated page is written to public/<slug>.html and served at /<slug>
by the rewrites in next.config.ts.
"""
import html
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import kit  # noqa: E402
from content import PAGES  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / 'public'
MASTER = PUBLIC / 'ai-seo-services.html'
BASE = 'https://searchenginexperts.com'

# Menu order matches components/services.tsx.
MENU = [
    ('AI SEO', '/ai-seo-services', 'AI SEO Services'),
    ('Local SEO', '/local-seo-services', 'Local SEO Services'),
    ('GMB Optimization', '/gmb-optimization-services', 'GMB Optimization'),
    ('Ecommerce SEO', '/ecommerce-seo-services', 'Ecommerce SEO Services'),
    ('Backlinks &amp; Digital PR', '/backlinks-digital-pr-services', 'Backlinks &amp; Digital PR'),
    ('SEO Content Writing', '/seo-content-writing-services', 'SEO Content Writing'),
]

# Styles for the service-specific mockups (hero cards and "what it looks like" panels).
EXTRA_CSS = '''
/* ===== service page mockups ===== */
.stars{color:#F5A524;letter-spacing:1px;font-size:11px;}
.vt-box{margin-top:14px;background:var(--navy);border-radius:16px;padding:14px 16px;color:#DBE3FB;position:relative;overflow:hidden;}
.vt-box:before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#21346e 1.2px,transparent 1.4px);background-size:18px 18px;opacity:.5;}
.vt-box > *{position:relative;}
.vt-box .vt-ah{margin-bottom:8px;}
.vt-map{display:block;width:100%;height:92px;border-radius:10px;}
.vt-biz{display:flex;align-items:center;gap:10px;margin-top:10px;background:rgba(255,255,255,.08);border:1px solid rgba(127,160,255,.45);border-radius:12px;padding:8px 10px;}
.vt-biz b{display:block;font-size:12.5px;color:#fff;}
.vt-biz small{display:block;font-size:11px;color:#9FB0E6;}
.vt-biz .stars{font-size:10px;}
.vt-rank{margin-left:auto;font-size:10.5px;font-weight:700;color:#fff;background:var(--blue);border-radius:999px;padding:3px 9px;white-space:nowrap;}
.gbp-top{display:flex;align-items:center;gap:12px;}
.gbp-av{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--blue-l),var(--blue-d));color:#fff;font-weight:700;font-size:18px;display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
.gbp-top b{display:block;font-size:15px;color:var(--navy);line-height:1.2;}
.gbp-top small{display:block;font-size:11.5px;color:var(--slate);margin-top:2px;}
.gbp-top small .stars{font-size:11px;}
.gbp-acts{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:12px;}
.gbp-acts span{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10.5px;font-weight:600;color:var(--blue-d);border:1px solid var(--line);border-radius:10px;padding:7px 4px;}
.vt-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.vt-kpis div{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:8px 10px;}
.vt-kpis span{display:block;font-size:10.5px;color:#9FB0E6;}
.vt-kpis b{display:block;font-size:18px;color:#fff;font-weight:700;letter-spacing:-.02em;line-height:1.25;}
.vt-kpis em{font-style:normal;font-size:10.5px;font-weight:600;color:#3fd694;}
.vt-prod{display:flex;gap:12px;align-items:center;}
.vt-prod .ph{width:64px;height:64px;border-radius:12px;background:linear-gradient(135deg,#1E3285,#4A6CFF);display:flex;align-items:center;justify-content:center;color:#fff;flex:0 0 auto;}
.vt-prod .url{font-size:10.5px;color:#9FB0E6;}
.vt-prod b{display:block;font-size:13.5px;color:#fff;margin-top:2px;line-height:1.3;}
.vt-prod small{display:block;font-size:11px;color:#C9D5FF;margin-top:3px;}
.vt-prod .price{display:flex;gap:8px;align-items:center;margin-top:5px;font-size:11.5px;}
.vt-prod .price strong{color:#fff;font-size:14px;}
.vt-prod .price i{font-style:normal;color:#3fd694;font-weight:600;}
.vt-chart{display:block;width:100%;height:84px;}
.vt-chart-h{display:flex;justify-content:space-between;align-items:baseline;}
.vt-chart-h b{font-size:20px;color:#fff;letter-spacing:-.02em;}
.vt-chart-h em{font-style:normal;font-size:11px;font-weight:600;color:#3fd694;}
.vt-doc{display:flex;align-items:flex-start;gap:10px;}
.vt-doc .di{width:34px;height:34px;border-radius:10px;background:var(--tint);color:var(--blue);display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
.vt-doc b{display:block;font-size:13.5px;color:var(--navy);line-height:1.35;}
.vt-doc small{display:inline-block;margin-top:5px;font-size:10.5px;font-weight:600;color:var(--blue-d);background:#E6ECFF;border-radius:999px;padding:2px 9px;margin-right:4px;}
.vt-score{display:flex;align-items:center;gap:14px;}
.vt-score .ring{width:64px;height:64px;flex:0 0 auto;}
.vt-score p{font-size:12.5px;line-height:1.5;margin:0;}
.vt-score p b{color:#fff;}
.vt-bars{display:grid;gap:6px;margin-top:10px;}
.vt-bars div{display:flex;align-items:center;gap:8px;font-size:10.5px;color:#9FB0E6;}
.vt-bars div span{width:92px;flex:0 0 auto;}
.vt-bars i{flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,.12);overflow:hidden;}
.vt-bars i:after{content:"";display:block;height:100%;width:var(--w);background:linear-gradient(90deg,var(--blue-l),#7FA0FF);border-radius:3px;}
@media (min-width:921px) and (max-height:860px){
  .hero .vt-box{margin-top:10px;padding:11px 14px;}
  .hero .vt-map{height:70px;}
  .hero .gbp-acts{margin-top:9px;}
  .hero .gbp-acts span{padding:5px 4px;}
  .hero .vt-prod .ph{width:54px;height:54px;}
  .hero .vt-chart{height:64px;}
  .hero .vt-score .ring{width:54px;height:54px;}
}
@media (min-width:921px) and (max-height:700px){
  .hero .vt-bars,.hero .gbp-acts{display:none;}
  .hero .vt-map{height:50px;}
  .hero .vt-box .vt-ah{margin-bottom:5px;}
}
/* "what it looks like" panels */
.lp{margin-top:10px;border:1px solid var(--line);border-radius:12px;overflow:hidden;}
.lp-map{display:block;width:100%;height:78px;}
.lp-row{display:flex;justify-content:space-between;gap:8px;padding:7px 10px;border-top:1px solid var(--line);font-size:10.5px;line-height:1.35;}
.lp-row b{display:block;font-size:11.5px;color:var(--navy);}
.lp-row small{color:var(--slate);font-size:9.5px;}
.lp-row .stars{font-size:9px;}
.lp-row.on{background:#EEF2FE;box-shadow:inset 3px 0 0 var(--blue);}
.lp-row em{font-style:normal;font-size:9.5px;color:var(--blue-d);font-weight:600;align-self:center;white-space:nowrap;}
.gp-hero{height:72px;border-radius:10px;background:linear-gradient(135deg,#C9D5FA,#EEF2FE);position:relative;overflow:hidden;}
.gp-hero svg{position:absolute;inset:0;width:100%;height:100%;}
.gp-name{font-size:14px;font-weight:700;color:var(--navy);margin-top:10px;}
.gp-meta{font-size:10.5px;color:var(--slate);margin-top:2px;}
.gp-meta .stars{font-size:10px;}
.gp-acts{display:flex;gap:6px;margin-top:10px;}
.gp-acts span{flex:1;text-align:center;font-size:9.5px;font-weight:600;color:var(--blue-d);border:1px solid var(--line);border-radius:999px;padding:5px 2px;}
.gp-acts span.on{background:var(--blue);border-color:var(--blue);color:#fff;}
.gp-info{margin-top:10px;display:grid;gap:6px;font-size:10.5px;color:var(--ink);}
.gp-info div{display:flex;gap:7px;align-items:center;}
.gp-info svg{color:var(--slate);flex:0 0 auto;}
.gp-info b{color:var(--up);font-weight:600;}
.rv{display:grid;gap:8px;}
.rv-sum{display:flex;align-items:center;gap:10px;padding-bottom:8px;border-bottom:1px solid var(--line);}
.rv-sum b{font-size:26px;color:var(--navy);line-height:1;}
.rv-sum small{display:block;font-size:10px;color:var(--slate);}
.rv-item{font-size:10.5px;line-height:1.5;}
.rv-item .who{display:flex;align-items:center;gap:6px;font-weight:600;color:var(--navy);}
.rv-item .who i{width:18px;height:18px;border-radius:50%;background:var(--tint);color:var(--blue);font-style:normal;font-size:9px;display:flex;align-items:center;justify-content:center;}
.rv-item p{margin-top:3px;color:var(--ink);}
.rv-reply{margin-top:5px;background:var(--tint);border-radius:8px;padding:6px 8px;font-size:10px;color:var(--slate);}
.rv-reply b{color:var(--blue-d);}
.rr{margin-top:12px;padding:0 4px;}
.rr .g-t{font-size:12.5px;}
.rr p{font-size:10.5px;color:var(--slate);margin-top:3px;line-height:1.5;}
.rr .rich{display:flex;gap:8px;align-items:center;font-size:10px;color:var(--slate);margin-top:4px;}
.rr .rich .stars{font-size:9.5px;}
.rr .rich b{color:var(--ink);font-weight:600;}
.rr.on{background:#F4F6FE;border-radius:10px;padding:8px;box-shadow:inset 3px 0 0 var(--blue);}
.prg{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:10px;}
.pr{border:1px solid var(--line);border-radius:10px;padding:6px;font-size:9.5px;line-height:1.35;}
.pr .im{height:54px;border-radius:7px;background:linear-gradient(135deg,#DCE4FB,#F1F4FD);display:flex;align-items:center;justify-content:center;color:#9DB2FF;}
.pr b{display:block;color:var(--navy);font-size:10px;margin-top:5px;}
.pr strong{display:block;color:var(--ink);font-size:11px;margin-top:2px;}
.pr small{display:block;color:var(--slate);font-size:8.5px;}
.pr .stars{font-size:8px;}
.pr.on{border-color:var(--blue);box-shadow:0 0 0 2px rgba(52,93,247,.12);}
.pr.on small{color:var(--blue-d);font-weight:600;}
.art-k{font-size:9.5px;font-weight:700;color:var(--blue);letter-spacing:.04em;}
.art-h{font-size:14px;font-weight:700;color:var(--navy);line-height:1.3;margin-top:4px;}
.art-by{font-size:9.5px;color:var(--slate);margin-top:4px;padding-bottom:8px;border-bottom:1px solid var(--line);}
.art-p{font-size:10.5px;line-height:1.6;margin-top:8px;color:var(--ink);}
.art-p a{color:var(--blue-d);text-decoration:underline;font-weight:600;}
.art-q{margin-top:8px;border-left:3px solid var(--blue);padding:4px 0 4px 10px;font-size:10.5px;font-style:italic;color:var(--navy);}
.res-h{font-size:13px;font-weight:700;color:var(--navy);}
.res-sub{font-size:10px;color:var(--slate);margin-top:2px;}
.res{display:grid;gap:7px;margin-top:10px;}
.res li{display:flex;gap:8px;align-items:flex-start;border:1px solid var(--line);border-radius:9px;padding:7px 9px;font-size:10.5px;line-height:1.4;}
.res li span{width:18px;height:18px;border-radius:6px;background:var(--tint);color:var(--blue);font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
.res li b{display:block;color:var(--navy);font-size:11px;}
.res li small{color:var(--slate);font-size:9.5px;}
.res li.on{border-color:var(--blue);background:#F4F6FE;}
.res li.on b{color:var(--blue-d);}
.fs{margin-top:10px;border:1px solid var(--line);border-radius:12px;padding:10px;}
.fs p{font-size:11px;line-height:1.55;}
.fs ol{list-style:decimal;padding-left:16px;margin-top:6px;font-size:10.5px;line-height:1.5;color:var(--ink);}
.fs .src{display:flex;align-items:center;gap:6px;margin-top:8px;padding-top:8px;border-top:1px solid var(--line);font-size:10px;color:var(--slate);}
.fs .src i{width:16px;height:16px;border-radius:50%;background:var(--blue);color:#fff;font-style:normal;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;}
.fs .src b{color:var(--blue-d);}
.paa-h{font-size:12.5px;font-weight:700;color:var(--navy);margin-top:2px;}
.paa{margin-top:8px;border-top:1px solid var(--line);}
.paa li{border-bottom:1px solid var(--line);padding:8px 2px;font-size:11px;color:var(--navy);display:flex;justify-content:space-between;gap:8px;}
.paa li svg{color:var(--slate);flex:0 0 auto;}
.paa li.open{display:block;}
.paa li.open .q{display:flex;justify-content:space-between;font-weight:600;}
.paa li.open p{font-size:10.5px;color:var(--ink);line-height:1.55;margin-top:6px;background:var(--tint);border-radius:8px;padding:7px 8px;}
.paa li.open small{display:block;font-size:9.5px;color:var(--blue-d);font-weight:600;margin-top:5px;}
'''


def extract(src, start, end):
    i = src.index(start)
    j = src.index(end, i) + len(end)
    return src[i:j]


def services_dropdown(current):
    links = ''.join(f'<a href="{href}"{" aria-current=\"page\"" if href == current else ""}>{label}</a>'
                    for label, href, _ in MENU)
    return f'<div id="menu-services" class="dropdown">{links}</div>'


def footer_links():
    links = '<a href="/">Home</a>' + ''.join(f'<a href="{href}">{label}</a>' for label, href, _ in MENU)
    return f'<div class="flinks">\n    {links}<a href="/#work">Projects</a><a href="/#contact">Contact</a>\n  </div>'


DROPDOWN_RE = re.compile(r'<div id="menu-services" class="dropdown">.*?</div>', re.S)
FLINKS_RE = re.compile(r'<div class="flinks">.*?</div>', re.S)


def reorder_cases(cases, order, subject):
    arts = re.findall(r'<article class="sl".*?</article>', cases, re.S)
    by_name = {re.search(r'<h3>(.*?)</h3>', a).group(1): a for a in arts}
    picked = [by_name[n] for n in order]
    fixed = []
    for i, a in enumerate(picked):
        a = re.sub(r'<article class="sl" data-i="\d+"( hidden)?', f'<article class="sl" data-i="{i}"{"" if i == 0 else " hidden"}', a)
        a = re.sub(r'aria-label="\d of 4"', f'aria-label="{i+1} of 4"', a)
        fixed.append(a)
    track_start = cases.index(arts[0])
    track_end = cases.index(arts[-1]) + len(arts[-1])
    cases = cases[:track_start] + '\n    '.join(fixed) + cases[track_end:]
    return cases.replace('subject=AI%20SEO%20case%20study%20request', f'subject={subject}')


def json_ld(page):
    url = f"{BASE}/{page['slug']}"
    crumbs = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': f'{BASE}/'},
            {'@type': 'ListItem', 'position': 2, 'name': kit.plain(page['crumb']), 'item': url},
        ]}
    service = {
        '@context': 'https://schema.org', '@type': 'Service',
        'serviceType': kit.plain(page['service_type']), 'name': kit.plain(page['service_type']),
        'description': page['schema_description'],
        'provider': {'@type': 'ProfessionalService', 'name': 'Search Engine Xperts', 'url': BASE,
                     'email': 'arslantariq082@gmail.com', 'telephone': '+923478724400'},
        'areaServed': 'Worldwide',
        'audience': {'@type': 'Audience', 'audienceType': ', '.join(kit.plain(c[1]) for c in page['who']['cards'])},
        'url': url,
        'hasOfferCatalog': {'@type': 'OfferCatalog', 'name': kit.plain(page['service_type']), 'itemListElement': [
            {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': kit.plain(c[1])}} for c in page['services']['cards']]},
    }
    faq = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
        {'@type': 'Question', 'name': kit.plain(q), 'acceptedAnswer': {'@type': 'Answer', 'text': kit.plain(a)}}
        for q, a in page['faq']['items']]}
    return '\n'.join(f'<script type="application/ld+json">\n{json.dumps(x, indent=2, ensure_ascii=False)}\n</script>'
                     for x in (crumbs, service, faq))


def build_page(page, parts):
    url = f"{BASE}/{page['slug']}"
    e = html.escape
    title, desc = page['title'], page['description']
    style = parts['style'].replace('</style>', EXTRA_CSS + '</style>')
    header = DROPDOWN_RE.sub(services_dropdown('/' + page['slug']), parts['header'])
    footer = FLINKS_RE.sub(footer_links(), parts['footer'])
    cases = reorder_cases(parts['cases'], page['cases_order'], page['case_subject'])
    script = parts['script'].replace("'Free AI SEO audit request'", repr(page['audit']['mail_subject'])) \
        .replace('I would like a free AI SEO audit for', f"I would like a {page['audit']['mail_label']} for")

    body = '\n\n'.join([
        f'<!-- ============ HERO ============ -->\n{kit.hero(page["hero"])}',
        kit.trust(page['trust']),
        kit.landscape(page['landscape']),
        kit.definition(page['definition']),
        kit.shots(page['shots']),
        kit.services(page['services']),
        kit.framework(page['framework']),
        kit.stack(page['stack']),
        kit.audience(page['who']),
        kit.why(page['why']),
        cases,
        kit.audit(page['audit']),
        kit.faq(page['faq'], page['crumb']),
        kit.final_cta(page['final']),
    ])

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Search Engine Xperts">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{e(page['og_title'])}">
<meta property="og:description" content="{e(desc)}">
<meta name="twitter:card" content="summary_large_image">

<!-- Generated by scripts/service_pages/build.py from content.py. Edit the content there and re-run the script. -->
{style}
</head>
<body>

{parts['defs']}

<!-- HEADER -->
{header}

<!-- BREADCRUMB -->
<nav class="crumb" aria-label="Breadcrumb"><div class="wrap"><ol>
  <li><a href="/">Home</a></li><li class="sep">/</li>
  <li><a href="/#services">SEO Services</a></li><li class="sep">/</li>
  <li aria-current="page">{page['crumb']}</li>
</ol></div></nav>

<main>

{body}

</main>

{footer}

<!-- Sticky mobile CTA -->
<div class="mobile-cta"><a href="#audit" class="btn btn-primary">{page['mobile_cta']}</a></div>

<!-- ============ STRUCTURED DATA ============ -->
{json_ld(page)}

{script}
</body>
</html>
'''


def main():
    src = MASTER.read_text()
    # Keep the master page's own menu and footer in step with the generated pages.
    src = DROPDOWN_RE.sub(services_dropdown('/ai-seo-services'), src, count=1)
    src = FLINKS_RE.sub(footer_links(), src, count=1)
    MASTER.write_text(src)

    parts = {
        'style': extract(src, '<style>', '</style>'),
        'defs': extract(src, '<svg width="0" height="0"', '</svg>'),
        'header': extract(src, '<header>', '</header>'),
        'cases': extract(src, '<section class="cases"', '</div></section>'),
        'footer': extract(src, '<footer>', '</footer>'),
        'script': extract(src, '<script>\n', '</script>'),
    }
    # The cases section ends with nested "</div></section>"; take everything up to the next section comment.
    parts['cases'] = src[src.index('<section class="cases"'):src.index('<!-- ============ AI SEO AUDIT CTA')].rstrip()

    for page in PAGES:
        out = PUBLIC / f"{page['slug']}.html"
        out.write_text(build_page(page, parts))
        print('wrote', out.relative_to(ROOT))


if __name__ == '__main__':
    main()

"""Cover images for the Google algorithm update articles (/google-algorithm-updates/<id>).

Run:  python3 scripts/covers/build_update_covers.py [update-id ...]
Writes 1600x900 PNGs to public/images/updates/<id>.png, one per update in components/algo/updates.ts
(or only the ids you pass). Needs Node 22+ (reads the TypeScript data file with --experimental-strip-types),
Playwright for Python with a Chromium/Chrome browser (set CHROME_PATH to use an installed Chrome) and Pillow.
"""
import html
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public' / 'images' / 'updates'
FONTS = ROOT / 'public' / 'fonts'

JS = """
import('./components/algo/updates.ts').then(m => {
  const fmt = iso => iso ? m.formatUpdateDate(iso) : null;
  console.log(JSON.stringify(m.updates.map(u => ({
    id: u.id, name: u.name, type: m.typeName(u.type), core: u.type === 'Core' || u.type === 'Spam',
    status: u.status ?? null, start: fmt(u.date), end: fmt(m.endDate(u)), rollout: u.rollout ?? null,
    release: u.release ? new Date(u.release + '-01T00:00:00Z').toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : null,
  }))));
});
"""


def load_updates():
    out = subprocess.run(['node', '--experimental-strip-types', '--no-warnings', '--input-type=module', '-e', JS],
                         cwd=ROOT, capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def page(u):
    e = html.escape
    fonts = ''.join(f"@font-face{{font-family:Poppins;font-weight:{w};src:url('{(FONTS / f'poppins-latin-{w}-normal.woff2').as_uri()}') format('woff2')}}" for w in (400, 500, 600, 700))
    announced = u['status'] == 'Announced'
    kind = f"{u['type']} update" if u['core'] else u['type']
    rows = [('Announced' if announced else 'Started', u['start'])]
    if announced and u['release']:
        rows.append(('Planned release', u['release']))
    if u['end']:
        rows.append(('Completed', u['end']))
    if u['rollout']:
        rows.append(('Rollout', u['rollout']))
    rows_html = ''.join(f'<div class="row"><span>{e(k)}</span><b>{e(v)}</b></div>' for k, v in rows)
    status = 'Not live yet' if announced else ('Complete' if u['status'] == 'Complete' else 'Confirmed by Google')
    size = 84 if len(u['name']) <= 26 else 72 if len(u['name']) <= 40 else 62
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{fonts}
body{{margin:0}}
.c{{width:1600px;height:900px;position:relative;overflow:hidden;background:#0B1437;font-family:Poppins,sans-serif;color:#fff}}
.c:before{{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,rgba(205,216,248,.14) 1.4px,transparent 1.7px);background-size:30px 30px}}
.l{{position:absolute;left:100px;top:0;bottom:0;width:760px;display:flex;flex-direction:column;justify-content:center;gap:28px}}
.pill{{align-self:flex-start;display:inline-flex;align-items:center;gap:10px;padding:10px 22px;border-radius:999px;border:1.5px solid rgba(125,149,255,.6);background:rgba(52,93,247,.12);color:#C9D4FF;font-size:22px;font-weight:500}}
.pill i{{width:9px;height:9px;border-radius:50%;background:#7D95FF}}
h1{{margin:0;font-size:{size}px;line-height:1.08;font-weight:600;letter-spacing:-.03em}}
.sub{{margin:0;font-size:25px;color:#A9B3D6}}
.logo{{position:absolute;left:100px;bottom:80px;display:flex;align-items:center;gap:16px}}
.logo .x{{width:54px;height:54px;border-radius:13px;background:#345DF7;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700}}
.logo span{{display:flex;flex-direction:column;line-height:1.2;font-size:22px;font-weight:600}}
.logo small{{font-size:22px;font-weight:500;color:#A9B3D6}}
.card{{position:absolute;left:950px;top:200px;width:550px;box-sizing:border-box;padding:38px 40px;border-radius:28px;background:#fff;color:#0B1437;box-shadow:0 40px 80px -30px rgba(0,0,0,.55)}}
.card h2{{margin:0 0 10px;display:flex;align-items:center;gap:12px;font-size:24px;font-weight:600}}
.dot{{width:14px;height:14px;border-radius:50%;background:{'#345DF7' if announced else '#15A06A'};box-shadow:0 0 0 6px {'#E8EDFF' if announced else '#E5F6EE'}}}
.row{{display:flex;justify-content:space-between;align-items:center;padding:18px 0;border-bottom:1.5px solid #E5EAF8;font-size:21px}}
.row span{{color:#69739A}} .row b{{font-weight:600}}
.st{{margin-top:24px;display:flex;justify-content:space-between;align-items:center;font-size:19px;color:#69739A}}
.st b{{padding:7px 18px;border-radius:999px;font-size:18px;font-weight:600;background:{'#E8EDFF' if announced else '#E5F6EE'};color:{'#2A48C8' if announced else '#0E7A50'}}}
</style></head><body><div class="c">
<div class="l"><span class="pill"><i></i>{e(kind)}</span><h1>{e(u['name'])}</h1>
<p class="sub">Google algorithm update</p></div>
<div class="logo"><div class="x">X</div><span>Search Engine<small>Xperts</small></span></div>
<div class="card"><h2><span class="dot"></span>Ranking update</h2>{rows_html}<div class="st">Status<b>{e(status)}</b></div></div>
</div></body></html>"""


def main(ids):
    updates = [u for u in load_updates() if not ids or u['id'] in ids]
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp, sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROME_PATH') or None)
        tab = browser.new_page(viewport={'width': 1600, 'height': 900})
        for u in updates:
            f = Path(tmp) / f"{u['id']}.html"
            f.write_text(page(u), encoding='utf-8')
            tab.goto(f.as_uri())
            tab.evaluate('document.fonts.ready')
            shot = Path(tmp) / f"{u['id']}.png"
            tab.screenshot(path=str(shot))
            Image.open(shot).convert('RGB').save(OUT / f"{u['id']}.png", optimize=True)
        browser.close()
    print(f'wrote {len(updates)} covers to {OUT.relative_to(ROOT)}')


if __name__ == '__main__':
    main(set(sys.argv[1:]))

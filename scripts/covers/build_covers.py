"""Branded cover images for the Learn SEO guides and the hub pages.

Run:  python3 scripts/covers/build_covers.py
Writes 1600x900 PNGs to public/images/learn/. Needs Pillow and the Poppins font
(set POPPINS_DIR if it isn't in /usr/share/fonts/truetype/google-fonts).
Edit COVERS to change titles; each `motif` is a small drawing on the right-hand card.
"""
import math
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public' / 'images' / 'learn'
FONTS = Path(os.environ.get('POPPINS_DIR', '/usr/share/fonts/truetype/google-fonts'))
W, H = 1600, 900

NAVY = (11, 20, 55)
BLUE = (52, 93, 247)
BLUE_L = (74, 108, 255)
TINT = (241, 244, 253)
LINE = (205, 216, 247)
GREEN = (21, 160, 106)


def font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / f'Poppins-{weight}.ttf'), size)


def wrap(draw, text, fnt, width):
    words, lines, line = text.split(), [], ''
    for w in words:
        trial = f'{line} {w}'.strip()
        if draw.textlength(trial, font=fnt) <= width:
            line = trial
        else:
            lines.append(line)
            line = w
    lines.append(line)
    return lines


# ---------- motifs: drawn inside the card box (x0, y0, x1, y1) ----------

def m_local(d, b):
    x0, y0, x1, y1 = b
    for i, (w, star) in enumerate([(300, True), (250, False), (270, False)]):
        y = y0 + 210 + i * 92
        d.rounded_rectangle((x0 + 50, y, x1 - 50, y + 72), 16, fill=TINT if i else (230, 237, 255))
        d.ellipse((x0 + 70, y + 18, x0 + 106, y + 54), fill=BLUE if i == 0 else LINE)
        d.rounded_rectangle((x0 + 124, y + 20, x0 + 124 + w * 0.7, y + 34), 7, fill=NAVY if i == 0 else LINE)
        d.rounded_rectangle((x0 + 124, y + 44, x0 + 124 + w * 0.45, y + 54), 5, fill=LINE)
    cx, cy = (x0 + x1) // 2, y0 + 110
    d.ellipse((cx - 56, cy - 70, cx + 56, cy + 42), fill=BLUE)
    d.polygon([(cx - 46, cy + 4), (cx + 46, cy + 4), (cx, cy + 92)], fill=BLUE)
    d.ellipse((cx - 22, cy - 36, cx + 22, cy + 8), fill='white')


def m_ecommerce(d, b):
    x0, y0, x1, y1 = b
    for r in range(2):
        for c in range(3):
            px, py = x0 + 50 + c * 140, y0 + 60 + r * 170
            d.rounded_rectangle((px, py, px + 120, py + 150), 14, fill=TINT)
            d.rounded_rectangle((px + 14, py + 14, px + 106, py + 92), 10, fill=(225, 233, 255) if (r + c) % 2 else LINE)
            d.rounded_rectangle((px + 14, py + 106, px + 90, py + 118), 6, fill=NAVY)
            d.rounded_rectangle((px + 14, py + 126, px + 60, py + 136), 5, fill=BLUE)
    pts = [(x0 + 60, y1 - 50), (x0 + 170, y1 - 80), (x0 + 270, y1 - 70), (x0 + 380, y1 - 130), (x1 - 50, y1 - 170)]
    d.line(pts, fill=GREEN, width=8, joint='curve')
    d.ellipse((pts[-1][0] - 12, pts[-1][1] - 12, pts[-1][0] + 12, pts[-1][1] + 12), fill=GREEN)


def m_mobile(d, b):
    x0, y0, x1, y1 = b
    cx = (x0 + x1) // 2
    cx -= 50
    d.rounded_rectangle((cx - 120, y0 + 40, cx + 120, y1 - 40), 34, fill=NAVY)
    d.rounded_rectangle((cx - 106, y0 + 58, cx + 106, y1 - 58), 24, fill='white')
    d.rounded_rectangle((cx - 30, y0 + 66, cx + 30, y0 + 76), 5, fill=NAVY)
    d.rounded_rectangle((cx - 86, y0 + 100, cx + 86, y0 + 130), 15, fill=TINT)
    for i in range(3):
        y = y0 + 160 + i * 96
        d.rounded_rectangle((cx - 86, y, cx + 40, y + 14), 7, fill=BLUE if i == 0 else NAVY)
        d.rounded_rectangle((cx - 86, y + 26, cx + 86, y + 36), 5, fill=LINE)
        d.rounded_rectangle((cx - 86, y + 46, cx + 60, y + 56), 5, fill=LINE)
    # speed gauge
    gx, gy = x1 - 85, y0 + 150
    d.arc((gx - 60, gy - 60, gx + 60, gy + 60), 180, 360, fill=LINE, width=14)
    d.arc((gx - 60, gy - 60, gx + 60, gy + 60), 180, 330, fill=GREEN, width=14)


def m_shopify(d, b):
    x0, y0, x1, y1 = b
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2 + 20
    d.rounded_rectangle((cx - 130, cy - 110, cx + 130, cy + 150), 28, fill=GREEN)
    d.arc((cx - 60, cy - 190, cx + 60, cy - 50), 180, 360, fill=NAVY, width=16)
    d.rounded_rectangle((cx - 80, cy - 40, cx + 80, cy - 20), 10, fill='white')
    d.rounded_rectangle((cx - 80, cy + 10, cx + 40, cy + 26), 8, fill=(200, 240, 220))
    d.rounded_rectangle((cx - 80, cy + 50, cx + 60, cy + 66), 8, fill=(200, 240, 220))


def m_technical(d, b):
    x0, y0, x1, y1 = b
    labels = ['Discover', 'Crawl', 'Render', 'Index']
    for i, t in enumerate(labels):
        y = y0 + 50 + i * 115
        d.rounded_rectangle((x0 + 70, y, x1 - 70, y + 80), 18, fill=TINT if i < 3 else (230, 237, 255), outline=LINE, width=2)
        d.ellipse((x0 + 92, y + 22, x0 + 128, y + 58), fill=GREEN if i < 3 else BLUE)
        d.line([(x0 + 102, y + 40), (x0 + 108, y + 47), (x0 + 120, y + 32)], fill='white', width=5)
        d.text((x0 + 150, y + 20), t, font=font('Medium', 30), fill=NAVY)
        if i < 3:
            d.line([((x0 + x1) // 2, y + 82), ((x0 + x1) // 2, y + 113)], fill=LINE, width=6)


def m_advanced(d, b):
    x0, y0, x1, y1 = b
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    nodes = [(cx + int(170 * math.cos(a)), cy + int(150 * math.sin(a))) for a in [i * math.pi / 3 + 0.3 for i in range(6)]]
    for n in nodes:
        d.line([(cx, cy), n], fill=LINE, width=5)
    for i, n in enumerate(nodes):
        d.line([n, nodes[(i + 1) % 6]], fill=TINT, width=4)
    for i, (nx, ny) in enumerate(nodes):
        r = 30 if i % 2 else 24
        d.ellipse((nx - r, ny - r, nx + r, ny + r), fill=BLUE_L if i % 2 else NAVY)
    d.ellipse((cx - 56, cy - 56, cx + 56, cy + 56), fill=BLUE)
    d.ellipse((cx - 24, cy - 24, cx + 24, cy + 24), fill='white')


def m_links(d, b):
    x0, y0, x1, y1 = b
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    for dx, col in [(-70, NAVY), (70, BLUE)]:
        box = (cx + dx - 110, cy - 55, cx + dx + 110, cy + 55)
        d.rounded_rectangle(box, 55, outline=col, width=26)
    sites = [(x0 + 70, y0 + 60), (x1 - 150, y0 + 60), (x0 + 70, y1 - 120), (x1 - 150, y1 - 120)]
    for sx, sy in sites:
        d.rounded_rectangle((sx, sy, sx + 80, sy + 60), 10, fill=TINT, outline=LINE, width=2)
        d.rounded_rectangle((sx + 12, sy + 14, sx + 60, sy + 22), 4, fill=NAVY)
        d.rounded_rectangle((sx + 12, sy + 32, sx + 50, sy + 40), 4, fill=LINE)


def m_ai(d, b):
    x0, y0, x1, y1 = b
    d.rounded_rectangle((x0 + 40, y0 + 50, x1 - 40, y0 + 290), 20, fill=(236, 241, 255))
    sx, sy = x0 + 80, y0 + 92
    d.polygon([(sx, sy - 22), (sx + 7, sy - 7), (sx + 22, sy), (sx + 7, sy + 7), (sx, sy + 22), (sx - 7, sy + 7), (sx - 22, sy), (sx - 7, sy - 7)], fill=BLUE)
    d.text((sx + 36, sy - 22), 'AI Overview', font=font('Medium', 28), fill=NAVY)
    for i, w in enumerate([380, 340, 360, 220]):
        d.rounded_rectangle((x0 + 70, y0 + 140 + i * 34, x0 + 70 + w, y0 + 154 + i * 34), 7, fill=LINE if i != 1 else (200, 212, 250))
    for i in range(3):
        px = x0 + 40 + i * 150
        d.rounded_rectangle((px, y0 + 320, px + 130, y0 + 420), 16, fill='white', outline=BLUE if i == 0 else LINE, width=3)
        d.ellipse((px + 16, y0 + 338, px + 46, y0 + 368), fill=BLUE if i == 0 else LINE)
        d.rounded_rectangle((px + 16, y0 + 382, px + 110, y0 + 394), 6, fill=NAVY if i == 0 else LINE)


def m_hub(d, b):
    x0, y0, x1, y1 = b
    for i in range(3):
        y = y0 + 60 + i * 130
        d.rounded_rectangle((x0 + 50 + i * 16, y, x1 - 50 - i * 16, y + 110), 18, fill=TINT if i else (230, 237, 255), outline=LINE, width=2)
        d.rounded_rectangle((x0 + 76 + i * 16, y + 26, x0 + 200 + i * 16, y + 40), 7, fill=BLUE)
        d.rounded_rectangle((x0 + 76 + i * 16, y + 56, x1 - 120 - i * 16, y + 72), 8, fill=NAVY)
        d.rounded_rectangle((x0 + 76 + i * 16, y + 82, x1 - 200 - i * 16, y + 92), 5, fill=LINE)


def m_tools(d, b):
    x0, y0, x1, y1 = b
    cx, cy = (x0 + x1) // 2, y0 + 200
    d.ellipse((cx - 130, cy - 130, cx + 130, cy + 130), outline=LINE, width=26)
    d.arc((cx - 130, cy - 130, cx + 130, cy + 130), -90, 210, fill=GREEN, width=26)
    d.text((cx, cy), '86', font=font('Bold', 92), fill=NAVY, anchor='mm')
    for i, col in enumerate([GREEN, GREEN, (240, 160, 40)]):
        y = y1 - 150 + i * 42
        d.ellipse((x0 + 70, y, x0 + 96, y + 26), fill=col)
        d.rounded_rectangle((x0 + 112, y + 6, x1 - 90 - i * 40, y + 20), 7, fill=LINE)


COVERS = [
    ('local-seo', 'Local SEO', 'What Is Local SEO? A Complete Guide', m_local),
    ('ecommerce-seo', 'Ecommerce SEO', 'Ecommerce SEO: Rank Category & Product Pages', m_ecommerce),
    ('mobile-seo', 'Mobile SEO', 'Mobile SEO for Mobile-First Indexing', m_mobile),
    ('shopify-seo', 'Shopify SEO', 'Shopify SEO: A Practical Guide', m_shopify),
    ('technical-seo', 'Technical SEO', 'Technical SEO: The Complete Checklist', m_technical),
    ('advanced-seo-strategies', 'Advanced SEO', '10 Advanced SEO Strategies', m_advanced),
    ('link-building', 'Link Building', 'Link Building That Moves Rankings', m_links),
    ('ai-seo', 'AI SEO', 'Get Cited in AI Overviews & ChatGPT', m_ai),
    ('learn-seo', 'Learn SEO', 'Free SEO Guides, from Fundamentals to AI', m_hub),
    ('seo-tools', 'Free SEO Tools', 'Free SEO Tools: Audit, Check & Research', m_tools),
]


def cover(slug, eyebrow, title, motif):
    img = Image.new('RGB', (W, H), NAVY)
    # diagonal gradient navy -> blue
    vgrad = Image.linear_gradient('L').resize((W, H))
    hgrad = Image.linear_gradient('L').rotate(90).transpose(Image.Transpose.FLIP_LEFT_RIGHT).resize((W, H))
    grad = Image.blend(vgrad, hgrad, 0.5)
    img = Image.composite(Image.new('RGB', (W, H), (40, 70, 205)), img, grad)
    d = ImageDraw.Draw(img)
    for gx in range(30, W, 34):
        for gy in range(30, H, 34):
            d.ellipse((gx - 1.6, gy - 1.6, gx + 1.6, gy + 1.6), fill=(70, 95, 190))

    # right-hand card with soft shadow
    card = (930, 150, 1500, 750)
    shadow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(shadow).rounded_rectangle((card[0] + 10, card[1] + 30, card[2] + 10, card[3] + 30), 36, fill=150)
    img.paste((5, 10, 35), (0, 0), shadow.filter(ImageFilter.GaussianBlur(30)))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle(card, 36, fill='white')
    motif(d, card)

    # text
    d.rounded_rectangle((100, 150, 100 + d.textlength(eyebrow.upper(), font=font('Medium', 26)) + 56, 206), 28, fill=(30, 48, 130), outline=(120, 145, 240), width=2)
    d.text((128, 160), eyebrow.upper(), font=font('Medium', 26), fill=(215, 224, 255))
    tf = font('Bold', 70)
    lines = wrap(d, title, tf, 760)
    if len(lines) > 4:
        tf = font('Bold', 58)
        lines = wrap(d, title, tf, 760)
    y = 250
    for line in lines:
        d.text((100, y), line, font=tf, fill='white')
        y += int(tf.size * 1.22)

    # brand
    d.rounded_rectangle((100, 690, 150, 740), 12, fill=BLUE_L)
    d.text((125, 715), 'X', font=font('Bold', 30), fill='white', anchor='mm')
    d.text((170, 688), 'Search Engine', font=font('Medium', 24), fill='white')
    d.text((170, 716), 'Xperts', font=font('Medium', 24), fill=(160, 180, 255))

    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / f'{slug}.png', optimize=True)


if __name__ == '__main__':
    for c in COVERS:
        cover(*c)
    print(f'wrote {len(COVERS)} covers to {OUT.relative_to(ROOT)}')

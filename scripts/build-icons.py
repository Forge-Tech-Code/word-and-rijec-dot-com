#!/usr/bin/env python3
"""
Derives the raster icons from public/favicon.svg, which stays the master.

The SVG alone covers modern browsers, but three things still want a PNG: iOS
home-screen icons, the web manifest, and the crawlers that fetch a favicon for
a search result and do not rasterise SVG.

index.html links favicon-32 and apple-touch-icon; public/site.webmanifest
lists icon-192 and icon-512; Seo.jsx uses icon-512 as the JSON-LD logo.
Rerun this whenever favicon.svg changes, and commit the PNGs.

The favicon's rounded rect leaves transparent corners. iOS composites those
against black, so every PNG here is flattened onto `mint` (#B8D6B2) — the
same tone as the icon's own ground, which makes the rounding invisible and
lets each platform apply its own mask.

    uv run --with cairosvg --with Pillow python3 scripts/build-icons.py
"""
from io import BytesIO
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'public' / 'favicon.svg'
OUT = ROOT / 'public'

# The favicon's own rect fill — see public/favicon.svg
MINT = (184, 214, 178)

# name -> size. 180 is the iOS home-screen icon; 192 and 512 are the two sizes
# the web manifest is expected to carry; 32 is the classic favicon fallback
# for anything that will not take the SVG.
ICONS = {
    'favicon-32.png': 32,
    'apple-touch-icon.png': 180,
    'icon-192.png': 192,
    'icon-512.png': 512,
}


def render(size):
    png = cairosvg.svg2png(url=str(SRC), output_width=size, output_height=size)
    art = Image.open(BytesIO(png)).convert('RGBA')
    ground = Image.new('RGBA', (size, size), MINT + (255,))
    return Image.alpha_composite(ground, art).convert('RGB')


def main():
    for name, size in ICONS.items():
        render(size).save(OUT / name, 'PNG', optimize=True)
        print(f'{name:24} {size}x{size}')


if __name__ == '__main__':
    main()

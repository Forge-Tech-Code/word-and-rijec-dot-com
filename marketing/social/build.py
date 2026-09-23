"""
Social-media posters for Word & Riječ, themed like the site.

Writes one HTML file per design per language into ./html/, then screenshots each
with headless Firefox into ./png/ at 2x (`zoom:2` on <html>) (so a 1080px post is a 2160px PNG).

    python3 marketing/social/build.py

Every sentence below is copied verbatim from src/i18n/en.js / hr.js or
src/sections/Rates.jsx; nothing is written here on the client's behalf. The
testimonials are deliberately NOT used (they are invented), nor is
`site.location` (a placeholder). See CLAUDE.md → "What's placeholder".
"""
import pathlib
import subprocess
import urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
REPO = HERE.parent.parent
FONTS = urllib.parse.quote(str(REPO / 'public' / 'fonts'))
PORTRAIT = urllib.parse.quote(str(REPO / 'public' / 'images' / 'rebekah-berkovic-830.webp'))

C = dict(mint='#B8D6B2', haze='#A7B0AA', pine='#24463C', cloud='#F4F5F1',
         dandelion='#EDD382', deep='#6E540A', ink='#212D27', soft='#333F38', line='#74837C')

URL = 'word-and-rijec.com'
EMAIL = 'rebekahberkovic@gmail.com'

# ── Copy, verbatim from the dictionaries ────────────────────────────────────
T = {
    'en': dict(
        tagline='More language. More life.',
        what='English and Croatian language services',
        hero_body='Sometimes you know exactly what you want to say — you just don’t have the words yet. Or you have the words, but not quite the confidence to use them.',
        offer=['Tutoring & lessons', 'Editing & proofreading', 'Copywriting'],
        cta='Get in touch',
        services='Services', services_sub='What I can help with',
        items=[('lessons', 'Language lessons', 'English and Croatian for real life, at your pace'),
               ('tutoring', 'Tutoring', 'School and university students'),
               ('editing', 'Editing & proofreading', 'Theses, articles, brochures'),
               ('copywriting', 'Copywriting', 'Websites, campaigns, brochures')],
        about='About me',
        about_quote='I grew up in Croatia speaking English at home with my British mother and Croatian with my father.',
        about_quote2='I believe language learning works best when you actually use the language, in a relaxed environment where you can make mistakes, ask questions and figure things out without feeling judged.',
        approach='How it works', approach_sub='From first message to first lesson',
        steps=[('Get in touch', 'Send me a message and tell me a little about what you’re looking for, what you need help with, and what you’d like to achieve.'),
               ('Let’s meet', 'We’ll set up a quick call or meeting to talk things through. The first meeting is free.'),
               ('Get started', 'Everything is tailored to you — your needs, your goals and your way of working.')],
        rates='Rates',
        per_hour='/ hour',
        rate_items=[('School English or Croatian tutoring', '€15'), ('Language lessons', '€30'),
                    ('Academic English & writing', '€40'), ('Proofreading & editing', '€30'),
                    ('Writing & copy', None)],
        quote='Project-based — get in touch for a quote.',
        note='Your first call or meeting is free. It’s simply a chance to talk, see if we click, and figure out what you need.',
    ),
    'hr': dict(
        tagline='Više jezika. Više života.',
        what='Jezične usluge na engleskom i hrvatskom',
        hero_body='Ponekad znate točno što želite reći — ali još nemate riječi kojima biste to rekli. Ili imate riječi, ali nemate dovoljno samopouzdanja da ih upotrijebite.',
        offer=['Instrukcije i satovi', 'Uređivanje i lektura', 'Pisanje tekstova'],
        cta='Javite se',
        services='Usluge', services_sub=None,  # the HR sub is scaffold chrome, not hers
        items=[('lessons', 'Satovi engleskog ili hrvatskog', 'Engleski i hrvatski za stvarni život, vašim tempom'),
               ('tutoring', 'Instrukcije', 'Za učenike i studente'),
               ('editing', 'Uređivanje i lektura', 'Završni i diplomski radovi, članci, brošure, meniji itd.'),
               ('copywriting', 'Pisanje tekstova', 'Web stranice, kampanje, brošure itd.')],
        about='O meni',
        about_quote='Odrasla sam u Hrvatskoj, pričajući engleski kod kuće s majkom Engleskinjom, a hrvatski s ocem, prijateljima i u školi.',
        about_quote2='Vjerujem u učenje kroz stvarnu upotrebu jezika, u opuštenom i ugodnom okruženju u kojem možete griješiti, postavljati pitanja i učiti bez straha da ćete biti osuđivani.',
        approach='Kako funkcionira', approach_sub='Od prve poruke do prvog sata',
        steps=[('Javite se', 'Pošaljite mi poruku i recite mi ukratko što tražite, oko čega vam treba pomoć i što želite postići.'),
               ('Upoznajmo se', 'Prvi razgovor je besplatan.'),
               ('Krenimo', 'Sve je prilagođeno vama — vašim potrebama, ciljevima i načinu rada.')],
        rates='Cjenik',
        per_hour='/ sat',
        rate_items=[('Instrukcije iz engleskog ili hrvatskog', '€15'), ('Satovi engleskog ili hrvatskog', '€30'),
                    ('Akademski engleski i pisanje', '€40'), ('Uređivanje i lektura', '€30'),
                    ('Pisanje tekstova', None)],
        quote='Po dogovoru — javite se za ponudu.',
        note='Prvi poziv ili susret je besplatan. To je jednostavno prilika da popričamo, vidimo odgovaramo li si i zajedno ustanovimo što vam treba.',
    ),
}

# ── Brand pieces, lifted from the components ────────────────────────────────
LOGO = f'''<svg viewBox="0 0 64 64" class="logo" stroke-linecap="round" stroke-linejoin="round">
<path fill="{C['pine']}" d="M17 3h30A14 14 0 0 1 61 17v19A14 14 0 0 1 47 50H31l-12.5 10.5c-1.3 1.1-3 .2-3-1.4V50A14 14 0 0 1 3 36V17A14 14 0 0 1 17 3z"/>
<g fill="none" stroke="{C['mint']}" stroke-width="2.6"><path d="M32 43V26"/><path d="M32 37c-3-5-7-8-13-9.5"/><path d="M32 35c3-5 7-8 13-9.5"/><path d="M32 41c-3-.5-5-2.2-6-4.6"/><path d="M32 40c3-.5 5-2.2 6-4.6"/></g>
<g fill="{C['dandelion']}"><circle cx="28.3" cy="21.5" r="4"/><circle cx="35.7" cy="21.5" r="4"/><circle cx="32" cy="15.5" r="4.3"/><circle cx="13.5" cy="25.5" r="3.6"/><circle cx="19.5" cy="21.8" r="3.6"/><circle cx="44.5" cy="21.8" r="3.6"/><circle cx="50.5" cy="25.5" r="3.6"/></g></svg>'''

SPRIG = '''<svg viewBox="0 0 24 24" class="sprig" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
<path d="M12 22c0-5.5.6-9 1.4-12"/><circle cx="6.6" cy="8.4" r="2.1" fill="currentColor" stroke="none"/><circle cx="11.4" cy="6.6" r="2.6" fill="currentColor" stroke="none"/><circle cx="16.6" cy="6.6" r="2.6" fill="currentColor" stroke="none"/><circle cx="21" cy="8.4" r="2.1" fill="currentColor" stroke="none"/><path d="M13.4 10c-1.2.6-2.6.6-3.8 0"/></svg>'''

ICONS = {
    'tutoring': '<path d="M3.5 7.5L12 4l8.5 3.5L12 11 3.5 7.5z"/><path d="M7 9.4V15c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V9.4M20.5 7.5v5"/>',
    'lessons': '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.4 3.4 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.4-5.4-3.4-8.5S9.8 5.9 12 3.5z"/>',
    'editing': '<path d="M15.8 4.6l3.6 3.6M4 20l1-4.2L16.2 4.6a1.4 1.4 0 012 0l1.2 1.2a1.4 1.4 0 010 2L8.2 19z"/>',
    'copywriting': '<path d="M6 3.5h8.5L19 8v12.5H6V3.5z"/><path d="M14 3.5V8h5M9 12.5h6M9 16h4"/>',
}


def icon(k):
    return f'<svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">{ICONS[k]}</svg>'


# Two of the four seam variants from src/components/Divider.jsx, verbatim.
SEAMS = {
    'meadow': ('M0,96 C240,112 480,84 720,92 C960,100 1200,116 1440,100 L1440,140 L0,140 Z', [
        ('M118,110 C116.2,90 112,68 109.6,54', [[101.8, 48.0, 3.4], [104.9, 46.1, 3.4], [108.0, 44.9, 3.4], [111.2, 44.9, 3.4], [114.3, 46.1, 3.4], [117.4, 48.0, 3.4], [106.4, 49.2, 3.4], [112.8, 49.2, 3.4]]),
        ('M386,110 C387.5,90 391,60 393.0,46', [[384.3, 40.3, 3.8], [387.8, 38.1, 3.8], [391.3, 36.7, 3.8], [394.7, 36.7, 3.8], [398.2, 38.1, 3.8], [401.7, 40.3, 3.8], [389.4, 41.6, 3.8], [396.6, 41.6, 3.8]]),
        ('M524,110 C522.8,90 520,84 518.4,70', [[512.0, 63.7, 2.8], [515.2, 61.7, 2.8], [518.4, 60.9, 2.8], [521.6, 61.7, 2.8], [524.8, 63.7, 2.8], [515.7, 64.7, 2.8], [521.1, 64.7, 2.8]]),
        ('M690,110 C690.6,90 692,66 692.8,52', [[685.0, 46.0, 3.4], [688.1, 44.1, 3.4], [691.2, 42.9, 3.4], [694.4, 42.9, 3.4], [697.5, 44.1, 3.4], [700.6, 46.0, 3.4], [689.6, 47.2, 3.4], [696.0, 47.2, 3.4]]),
        ('M968,110 C969.8,90 974,62 976.4,48', [[967.7, 42.3, 3.8], [971.2, 40.1, 3.8], [974.7, 38.7, 3.8], [978.1, 38.7, 3.8], [981.6, 40.1, 3.8], [985.1, 42.3, 3.8], [972.8, 43.6, 3.8], [980.0, 43.6, 3.8]]),
        ('M1108,110 C1106.5,90 1103,86 1101.0,72', [[1094.6, 65.7, 2.8], [1097.8, 63.7, 2.8], [1101.0, 62.9, 2.8], [1104.2, 63.7, 2.8], [1107.4, 65.7, 2.8], [1098.3, 66.7, 2.8], [1103.7, 66.7, 2.8]]),
        ('M1266,110 C1266.9,90 1269,70 1270.2,56', [[1262.8, 49.9, 3.2], [1265.8, 48.1, 3.2], [1268.7, 46.9, 3.2], [1271.7, 46.9, 3.2], [1274.6, 48.1, 3.2], [1277.6, 49.9, 3.2], [1267.2, 51.0, 3.2], [1273.2, 51.0, 3.2]]),
        ('M1382,110 C1381.4,90 1380,92 1379.2,78', [[1373.7, 71.4, 2.4], [1377.4, 69.4, 2.4], [1381.0, 69.4, 2.4], [1384.7, 71.4, 2.4]]),
    ]),
    'verge': ('M0,104 C300,92 620,80 900,94 C1130,105 1290,112 1440,96 L1440,140 L0,140 Z', [
        ('M60,110 C59.1,90 57,106 55.8,92', [[48.9, 85.8, 3.0], [55.8, 82.8, 3.0], [62.7, 85.8, 3.0]]),
        ('M470,110 C468.8,90 466,88 464.4,74', [[456.1, 68.2, 3.6], [461.6, 65.1, 3.6], [467.2, 65.1, 3.6], [472.7, 68.2, 3.6]]),
        ('M690,110 C691.2,90 694,80 695.6,66', [[688.8, 59.8, 2.96], [691.5, 58.1, 2.96], [694.2, 57.0, 2.96], [697.0, 57.0, 2.96], [699.7, 58.1, 2.96], [702.4, 59.8, 2.96], [692.8, 60.8, 2.96], [698.4, 60.8, 2.96]]),
        ('M880,110 C878.5,90 875,66 873.0,52', [[864.8, 46.1, 3.55], [868.1, 44.1, 3.55], [871.4, 42.8, 3.55], [874.6, 42.8, 3.55], [877.9, 44.1, 3.55], [881.2, 46.1, 3.55], [869.6, 47.4, 3.55], [876.4, 47.4, 3.55]]),
        ('M1004,110 C1004.9,90 1007,84 1008.2,70', [[1001.4, 63.8, 2.96], [1004.1, 62.1, 2.96], [1006.8, 61.0, 2.96], [1009.6, 61.0, 2.96], [1012.3, 62.1, 2.96], [1015.0, 63.8, 2.96], [1005.4, 64.8, 2.96], [1011.0, 64.8, 2.96]]),
        ('M1146,110 C1147.5,90 1151,60 1153.0,46', [[1144.5, 40.2, 3.7], [1147.9, 38.1, 3.7], [1151.3, 36.8, 3.7], [1154.7, 36.8, 3.7], [1158.1, 38.1, 3.7], [1161.5, 40.2, 3.7], [1149.5, 41.5, 3.7], [1156.5, 41.5, 3.7]]),
        ('M1262,110 C1260.8,90 1258,80 1256.4,66', [[1248.9, 60.0, 3.26], [1251.9, 58.1, 3.26], [1254.9, 56.9, 3.26], [1257.9, 56.9, 3.26], [1260.9, 58.1, 3.26], [1263.9, 60.0, 3.26], [1253.3, 61.1, 3.26], [1259.5, 61.1, 3.26]]),
        ('M1360,110 C1360.9,90 1363,64 1364.2,50', [[1356.0, 44.1, 3.55], [1359.3, 42.1, 3.55], [1362.6, 40.8, 3.55], [1365.8, 40.8, 3.55], [1369.1, 42.1, 3.55], [1372.4, 44.1, 3.55], [1360.8, 45.4, 3.55], [1367.6, 45.4, 3.55]]),
        ('M1424,110 C1423.4,90 1422,88 1421.2,74', [[1412.9, 68.2, 3.6], [1418.4, 65.1, 3.6], [1424.0, 65.1, 3.6], [1429.5, 68.2, 3.6]]),
    ]),
}


def seam(frm, to, shape='meadow', height=170):
    """The site's Divider, cropped (not stretched) so the blooms stay round."""
    ground, sprigs = SEAMS[shape]
    bloom = C[to] if frm == 'mint' else C['dandelion']
    stems = ''.join(f'<path d="{d}"/>' for d, _ in sprigs)
    buds = ''.join(f'<circle cx="{x}" cy="{y}" r="{r}"/>' for _, bs in sprigs for x, y, r in bs)
    return (f'<svg class="seam" viewBox="0 0 1440 140" preserveAspectRatio="xMidYMax slice" '
            f'style="height:{height}px;margin-bottom:-2px;position:relative;z-index:0">'
            f'<path d="{ground}" fill="{C[to]}"/>'
            f'<g fill="none" stroke="{C[to]}" stroke-width="1.7" stroke-linecap="round">{stems}</g>'
            f'<g fill="{bloom}">{buds}</g></svg>')


def wordmark(cls='wordmark'):
    return f'<span class="{cls}">Word &amp; Riječ</span>'


def footer_band(bg, t, extra=''):
    return f'''<div class="foot" style="background:{C[bg]}">
  <div class="foot-brand">{LOGO}{wordmark()}</div>
  {extra}
  <div class="foot-contact"><span>{URL}</span><span class="dot">·</span><span>{EMAIL}</span></div>
</div>'''


CSS = f'''
@font-face {{ font-family:"Berkshire Swash"; src:url("file://{FONTS}/berkshireswash-latin.woff2") format("woff2"); unicode-range:U+0000-00FF,U+2000-206F,U+20AC; }}
@font-face {{ font-family:"Berkshire Swash"; src:url("file://{FONTS}/berkshireswash-latin-ext.woff2") format("woff2"); unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF; }}
@font-face {{ font-family:"Valley Sans"; src:url("file://{FONTS}/valleysans-latin.woff2") format("woff2"); unicode-range:U+0000-00FF,U+2000-206F,U+20AC; }}
@font-face {{ font-family:"Valley Sans"; src:url("file://{FONTS}/valleysans-latin-ext.woff2") format("woff2"); unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF; }}
@font-face {{ font-family:"Nunito"; font-weight:200 1000; src:url("file://{FONTS}/nunito-latin.woff2") format("woff2"); unicode-range:U+0000-00FF,U+2000-206F,U+20AC; }}
@font-face {{ font-family:"Nunito"; font-weight:200 1000; src:url("file://{FONTS}/nunito-latin-ext.woff2") format("woff2"); unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF; }}
* {{ box-sizing:border-box; margin:0; padding:0; }}
html {{ zoom:2; }}
html,body {{ width:var(--w); height:var(--h); overflow:hidden; }}
body {{ font-family:Nunito,sans-serif; color:{C['ink']}; display:flex; flex-direction:column; }}
.display {{ font-family:"Berkshire Swash",serif; font-weight:400; color:{C['pine']}; }}
.title {{ font-family:"Valley Sans",sans-serif; font-weight:400; color:{C['ink']}; }}
.label {{ display:inline-flex; align-items:center; gap:12px; font-weight:800; letter-spacing:.22em;
         text-transform:uppercase; font-size:19px; color:{C['pine']}; }}
.sprig {{ width:30px; height:30px; color:{C['deep']}; }}
.logo {{ height:64px; width:auto; }}
.wordmark {{ font-family:"Berkshire Swash",serif; font-size:40px; color:{C['pine']}; }}
.seam {{ display:block; width:100%; flex:none; }}
.card {{ background:{C['cloud']}; border-radius:2.5rem;
        box-shadow:0 8px 18px -8px rgba(20,38,32,.22),0 36px 64px -24px rgba(20,38,32,.40); }}
.btn {{ display:inline-block; background:{C['dandelion']}; color:{C['ink']}; font-weight:800; font-size:30px;
       padding:24px 52px; border-radius:999px; box-shadow:0 0 0 3px {C['deep']}; }}
.foot {{ flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; padding:0 60px 48px; }}
.foot-brand {{ display:flex; align-items:center; gap:18px; }}
.foot-contact {{ font-size:25px; font-weight:700; color:{C['soft']}; display:flex; gap:14px; }}
.foot-contact .dot {{ color:{C['deep']}; }}
.icon {{ width:46px; height:46px; color:{C['pine']}; }}
.num {{ font-family:"Berkshire Swash",serif; color:{C['deep']}; }}
'''


def page(w, h, body, bg):
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>:root{{--w:{w}px;--h:{h}px}}{CSS}</style></head>
<body style="background:{C[bg]}">{body}</body></html>'''


# ── 1. Tagline poster — 1080×1350, the hero on a poster ─────────────────────
def d1_tagline(t):
    offer = ''.join(f'<li>{SPRIG}<span>{o}</span></li>' for o in t['offer'])
    body = f'''
<div style="flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;padding:96px 90px 30px">
  <div style="display:flex;align-items:center;gap:22px">{LOGO.replace('class="logo"', 'style="height:92px;width:auto"')}{wordmark()}</div>
  <h1 class="display" style="font-size:132px;line-height:1.02;margin-top:78px">{t['tagline'].replace('. ', '.<br>')}</h1>
  <p style="font-size:31px;line-height:1.6;color:{C['soft']};margin-top:48px;max-width:860px">{t['hero_body']}</p>
  <ul style="list-style:none;display:flex;gap:30px;margin-top:52px;font-weight:700;font-size:25px;color:{C['pine']}">
    {offer}
  </ul>
</div>
<style>ul li{{display:flex;align-items:center;gap:8px}} ul .sprig{{width:26px;height:26px}}</style>
{seam('mint', 'haze', 'meadow', 190)}
<div class="foot" style="background:{C['haze']};gap:26px">
  <span class="btn">{t['cta']}</span>
  <div class="foot-contact" style="color:{C['ink']}"><span>{URL}</span><span class="dot">·</span><span>{EMAIL}</span></div>
</div>'''
    return page(1080, 1350, body, 'mint')


# ── 2. Services — 1080×1350, the four cards ─────────────────────────────────
def d2_services(t):
    cards = ''.join(f'''<div class="card" style="padding:40px 38px;display:flex;flex-direction:column;gap:18px">
      {icon(k)}<div><div class="title" style="font-size:37px;line-height:1.15">{title}</div>
      <div style="font-size:22px;color:{C['soft']};margin-top:10px;line-height:1.45">{aud}</div></div></div>'''
                    for k, title, aud in t['items'])
    sub = f'<p class="display" style="font-size:44px;color:{C["soft"]};margin-top:10px">{t["services_sub"]}</p>' if t['services_sub'] else \
          f'<p class="display" style="font-size:44px;color:{C["soft"]};margin-top:10px">{t["tagline"]}</p>'
    body = f'''
<div style="padding:84px 80px 20px">
  <h2 class="display" style="font-size:112px;line-height:1">{t['services']}</h2>
  {sub}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:56px">{cards}</div>
</div>
<div style="flex:1"></div>
{seam('haze', 'mint', 'verge', 170)}
{footer_band('mint', t)}'''
    return page(1080, 1350, body, 'haze')


# ── 3. Meet Rebekah — 1080×1350, the portrait ───────────────────────────────
def d3_about(t):
    body = f'''
<div style="flex:1;padding:80px 80px 0;display:flex;flex-direction:column">
  <div class="label">{SPRIG}{t['about']}</div>
  <div style="display:flex;gap:52px;margin-top:40px;align-items:flex-start">
    <img src="file://{PORTRAIT}" style="width:420px;height:525px;object-fit:cover;border-radius:2.5rem;flex:none;
         box-shadow:0 12px 28px -10px rgba(20,38,32,.30),0 48px 88px -32px rgba(20,38,32,.50)">
    <div style="padding-top:12px">
      <div style="font-size:50px;font-weight:300;color:{C['ink']};line-height:1.1">Rebekah Berković</div>
      <div style="width:70px;height:4px;background:{C['deep']};border-radius:2px;margin:30px 0"></div>
      <p style="font-size:33px;font-weight:300;line-height:1.5;color:{C['ink']}">{t['about_quote']}</p>
    </div>
  </div>
  <p style="font-size:30px;font-weight:300;line-height:1.55;color:{C['soft']};margin-top:52px">{t['about_quote2']}</p>
</div>
{seam('mint', 'haze', 'meadow', 170)}
{footer_band('haze', t)}'''
    return page(1080, 1350, body, 'mint')


# ── 4. How it works — 1080×1080, three steps, free first meeting ────────────
def d4_approach(t):
    steps = ''.join(f'''<div style="display:flex;gap:34px;align-items:flex-start">
      <div class="num" style="font-size:78px;line-height:.9;width:110px;flex:none">0{i}</div>
      <div><div class="title" style="font-size:40px">{title}</div>
      <p style="font-size:24px;line-height:1.5;color:{C['soft']};margin-top:8px">{b}</p></div></div>'''
                    for i, (title, b) in enumerate(t['steps'], 1))
    body = f'''
<div style="padding:76px 80px 0">
  <h2 class="display" style="font-size:92px;line-height:1">{t['approach']}</h2>
  <p class="display" style="font-size:38px;color:{C['soft']};margin-top:14px">{t['approach_sub']}</p>
  <div class="card" style="padding:48px 50px;margin-top:44px;display:flex;flex-direction:column;gap:36px">{steps}</div>
</div>
<div style="flex:1"></div>
{seam('haze', 'mint', 'verge', 120)}
<div class="foot" style="background:{C['mint']};flex:none;height:130px;padding:0 60px 24px;flex-direction:row;justify-content:space-between">
  <div class="foot-brand">{LOGO.replace('class="logo"', 'style="height:54px;width:auto"')}{wordmark()}</div>
  <div style="font-size:26px;font-weight:700;color:{C['soft']}">{URL}</div>
</div>'''
    return page(1080, 1080, body, 'haze')


# ── 5. Rates — 1080×1080, the rate card ─────────────────────────────────────
def d5_rates(t):
    rows = ''.join(f'''<div style="display:flex;justify-content:space-between;align-items:baseline;gap:30px;padding:20px 0;border-bottom:2px solid {C['line']}55">
      <span class="title" style="font-size:31px">{name}</span>
      {f'<span class="num" style="font-size:44px;white-space:nowrap">{p} <span style="font-family:Nunito;font-size:20px;color:{C["soft"]}">{t["per_hour"]}</span></span>' if p else f'<span style="font-size:20px;color:{C["soft"]};text-align:right;max-width:330px">{t["quote"]}</span>'}
    </div>''' for name, p in t['rate_items'])
    body = f'''
<div style="padding:70px 80px 0;flex:1;display:flex;flex-direction:column">
  <div style="display:flex;justify-content:space-between;align-items:center">
    <h2 class="display" style="font-size:96px;line-height:1">{t['rates']}</h2>
    <div class="foot-brand">{LOGO}{wordmark()}</div>
  </div>
  <div class="card" style="padding:26px 50px 34px;margin-top:40px">
    {rows}
    <p style="font-size:23px;line-height:1.55;color:{C['ink']};margin-top:22px;font-weight:600">{t['note']}</p>
  </div>
</div>
{seam('mint', 'haze', 'meadow', 110)}
<div style="background:{C['haze']};height:92px;display:flex;align-items:center;justify-content:center;padding-bottom:16px">
  <div class="foot-contact" style="color:{C['ink']}"><span>{URL}</span><span class="dot">·</span><span>{EMAIL}</span></div>
</div>'''
    return page(1080, 1080, body, 'mint')


# ── 6. Name card — 1080×1350: logo, wordmark, tagline, what she does, email ─
def d6_portrait(t):
    body = f'''
<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 70px 0">
  {LOGO.replace('class="logo"', 'style="height:190px;width:auto"')}
  <h1 class="display" style="font-size:146px;line-height:1;margin-top:40px">Word &amp; Riječ</h1>
  <p class="display" style="font-size:60px;color:{C['soft']};margin-top:44px">{t['tagline']}</p>
  <p style="font-size:25px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:{C['pine']};margin-top:40px;
     display:flex;align-items:center;gap:14px">{SPRIG}{t['what']}{SPRIG}</p>
</div>
{seam('mint', 'haze', 'meadow', 170)}
<div style="background:{C['haze']};height:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding-bottom:20px">
  <span style="font-size:38px;font-weight:800;color:{C['ink']}">{URL}</span>
  <span style="font-size:32px;font-weight:700;color:{C['soft']}">{EMAIL}</span>
</div>'''
    return page(1080, 1350, body, 'mint')


DESIGNS = [('1-tagline', d1_tagline, (1080, 1350)), ('2-services', d2_services, (1080, 1350)),
           ('3-about', d3_about, (1080, 1350)), ('4-how-it-works', d4_approach, (1080, 1080)),
           ('5-rates', d5_rates, (1080, 1080)), ('6-name', d6_portrait, (1080, 1350))]


def main():
    html_dir, png_dir, prof = HERE / 'html', HERE / 'png', HERE / '.ffprofile'
    for d in (html_dir, png_dir, prof):
        d.mkdir(exist_ok=True)
    for lang in ('en', 'hr'):
        for name, fn, (w, h) in DESIGNS:
            src = html_dir / f'{name}-{lang}.html'
            out = png_dir / f'{name}-{lang}.png'
            src.write_text(fn(T[lang]))
            subprocess.run(['firefox', '--headless', '--no-remote', '--profile', str(prof),
                            '--screenshot', str(out), f'--window-size={2 * w},{2 * h}', src.as_uri()],
                           check=True, capture_output=True, timeout=120)
            print(out.relative_to(REPO))


if __name__ == '__main__':
    main()

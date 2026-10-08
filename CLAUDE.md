# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A one-page static marketing site for **Word and Riječ**, a language-services business offering tutoring,
language lessons, editing, proofreading and copywriting in English and Croatian.

The page is built **twice, once per language** — `/` in English and `/hr/` in Croatian — from one set of
components and two dictionaries. See "Two languages" below before touching any user-visible string.

**Both pages now carry the client's own copy** (hero, services, about, how it works, rates, FAQ,
contact) — the English and the Croatian were each written by her. The site launched to search on
2026-09-28. See "What's placeholder" at the bottom — read that section before writing any content.

The site is a sibling of `../guy-catz-dot-com` and `../veli-bol-home` and shares their stack and
conventions; when something here is unclear, those are the reference implementations.

## Commands

```bash
npm install
npm run dev      # Vite dev server, http://localhost:5173
npm run build    # prerender to dist/ via vite-react-ssg
npm run preview  # serve the built dist/ locally
```

There is no test suite, no linter and no typechecker. `npm run build` is the only gate — it prerenders
**both** pages (`dist/index.html` and `dist/hr/index.html`), so a runtime error in a component fails the
build rather than appearing in the browser. The same-shape check on the two dictionaries rides on that:
see "Two languages".

Three optional Python helpers, none wired into the build — run by hand, and their output committed.
`pip3` is absent on this machine; `uv run --with …` supplies the dependencies:

```bash
uv run --with cairosvg --with Pillow python3 scripts/build-icons.py   # PNG icons from public/favicon.svg
uv run --with fonttools --with brotli python3 scripts/trim-fonts.py   # narrow the fonts' weight axes in place
uv run --with Pillow python3 marketing/social/build.py                # posters + public/og-*.png; see "Social posters"
```

## Stack

- **React 18**, function components only, no state management beyond `useState` in one FAQ accordion.
- **Vite 5** with `base: './'`. See Deployment — the relative base is load-bearing.
- **vite-react-ssg** (the routes entry, **not** `/single-page` any more) prerenders `App` once per language
  to `dist/index.html` and `dist/hr/index.html`. `src/main.jsx` exports `createRoot`; there is no
  `ReactDOM.render` call anywhere.
- **Tailwind 3**, configured in `tailwind.config.js`, with a handful of component classes in
  `src/index.css`. No CSS modules, no styled-components, no Tailwind plugins.
- **react-router-dom**, but only as a build-time list. `src/routes.jsx` gives vite-react-ssg the two paths
  to walk; nothing navigates through it at runtime. Every in-page link is a fragment and the language
  switcher is a plain `<a>` that loads the other document. Do not add client-side navigation on top of it
  without re-reading "Two languages".
- No backend and no analytics. The one form (Contact) posts natively to FormSubmit — see "The contact form".

## Project layout

```
index.html              <head>: only what is identical in BOTH languages. Hand-maintained.
src/
  main.jsx              vite-react-ssg entry
  routes.jsx            one route per language — the build-time page list
  App.jsx               the whole page — the band order lives here
  index.css             @font-face blocks, base layer, component classes
  siteInfo.js           LANGUAGE-INDEPENDENT facts: name, email, phone, canonical URL
  i18n/
    locales.js          the locale table + the path/asset-prefix maths (also read by vite.config.js)
    en.js  hr.js        the two dictionaries — every user-visible string
    index.jsx           <LangProvider>, useLang(), and the same-shape assertion
  palette.js            the two band colours as hex, for <Divider>'s inline SVG
  images.js             asset() and responsivePhoto() — the ONLY way to reference public/
  components/           Navbar, Footer, Divider, Reveal, Photo, Sprig, Logo, LangSwitch, Seo
  sections/             one file per section, in page order
public/                 copied verbatim into dist/ — fonts, favicon, robots, sitemap, 404, manifest
scripts/                Python one-offs, run by hand
marketing/social/       social-media posters: build.py, and the PNGs it renders. NOT deployed
.github/workflows/      deploy.yml — build and publish to GitHub Pages on push to main
```

## Two languages

The site is prerendered **once per language**, from one set of components and two dictionaries:

| URL | file | `<html lang>` | dictionary |
| --- | --- | --- | --- |
| `/` | `dist/index.html` | `en` | `src/i18n/en.js` |
| `/hr/` | `dist/hr/index.html` | `hr` | `src/i18n/hr.js` |

**The language comes from the route, never from state.** `src/routes.jsx` mounts `<App lang>` once per
language; `<LangProvider>` puts the matching dictionary on context; `useLang()` reads it. There is no
toggle, no `localStorage`, and nothing that can differ between the prerendered markup and the first client
render — which is the same hydration-mismatch rule the hard-coded seam geometry follows.

The switcher is a plain `<a>`, not a router `<Link>`: changing language is a change of *document*, and a
full navigation is what gets the right prerendered HTML, the right `lang` attribute and the right
canonical.

### Writing a string

**No user-visible text belongs in a component.** Put it in `src/i18n/en.js` and `src/i18n/hr.js`, under the
same key, and read it through `useLang()`:

```jsx
const { t } = useLang()
…
<h2 className="section-heading">{t.services.heading}</h2>
```

`src/i18n/index.jsx` asserts at module load that the two dictionaries have **identical shapes** — same
keys, same array lengths, same types. Because the build prerenders the page, a mismatch throws during
`npm run build` and names the exact key (`i18n: hr.js is missing .nav.faq`). This is deliberate: React
renders `undefined` as nothing, so without the check a typo in `hr.js` would ship a Croatian page with a
silently empty heading. There is no typechecker here to catch it any other way.

Lists that pair text with something non-textual are keyed by **id, not index** — `services.items.tutoring`
lines up with the icon in `Services.jsx` and `rates.items.editing` with the figure in `Rates.jsx`. Do not
turn them back into parallel arrays; the first reorder would silently mis-pair them.

### What is translated, and what is not

Translated: section names, service and rate names, the short audience lists, the rate package labels,
the questions in the FAQ, and all UI chrome.

**Not translated, and not to be:**

- **The wordmark.** "Word & Riječ" is the business name and reads the same on both pages.
- **Every sentence or paragraph of her copy.** Both languages are hers, written separately — the two are
  not line-for-line translations of each other, and should not be edited to become so. This is the
  "Don't invent" rule at the bottom of this file, applied to a second language where it bites harder: a
  Croatian translation of her English is indistinguishable from her own Croatian to a reader who does not
  speak it. When she changes one language, ask for the other rather than translating.
- **Her Croatian About has four paragraphs to the English five** (it has no "15 years of teaching"
  paragraph). `about.body` is therefore listed in `FREE_LENGTH` in `src/i18n/index.jsx`, the one array the
  same-shape check lets differ in length. Only arrays of plain strings may go on that list.
- **Her Croatian headings differ slightly from the scaffold's**: `Cjenik` (not "Cijene"), `Kako funkcionira`,
  `Javite se`, `Uređivanje i lektura`. The nav, submenu and rate names follow her wording.

### Adding a third language

A dictionary in `src/i18n/`, an entry in `LANGS` and the tables in `src/i18n/locales.js`, and a `<url>`
block in `public/sitemap.xml`. The route, the hreflang set, the switcher and the asset prefixes are all
generated from that. Nothing else needs touching.

### The trap: relative `base` and a page one directory down

`vite.config.js` sets `base: './'` (see Deployment — it is load-bearing), so everything Vite emits is
**document-relative**: `./assets/app.js`, `./fonts/…`, `./favicon.svg`. That is correct at the root and
**wrong inside `/hr/`**, where `./assets/app.js` resolves to `/hr/assets/app.js` and 404s. vite-react-ssg
writes the same template to both depths and does not rewrite it.

Two halves of one fix, and they must stay in step:

1. **Asset refs Vite writes** are repaired by the `onPageRendered` hook in `vite.config.js`, which rewrites
   `href="./` / `src="./` to the right number of `../` for the page's depth.
2. **Assets our own code references** out of `public/` go through `useLang()`'s bound `asset()` /
   `responsivePhoto()`, which take the prefix from `assetPrefix()` in `src/i18n/locales.js`.

The language switcher's href has the same problem and the same answer — `localeHref()`, which returns
`./hr/` going down and `../` coming back up. **Never write a root-relative `/hr/` anywhere**; a leading
slash escapes the github.io project-pages sub-path exactly the way a `/asset` path does.


## Bands and seams

The page is **two light grounds that simply alternate**: `mint`, `haze`, `mint`, `haze`… and nothing else,
from the hero through to the footer. **`pine` is not a background anywhere** — it is a type colour only.
Where the colour changes, a `<Divider>` grows the next band into the one above it.

`App.jsx` is the only place the order is visible, and the `<Divider from= to=>` pairs must match their
neighbours exactly: `from` is the colour of the section above, `to` the colour below. **Adding or
reordering a section means re-pairing every divider around it**, or a hard edge of the wrong colour appears
in the seam.

| Band | Colour | Sections |
| --- | --- | --- |
| A | `mint` | Hero |
| B | `haze` | Services |
| C | `mint` | About |
| D | `haze` | Approach ("How it works") |
| E | `mint` | Testimonials |
| F | `haze` | Rates, FAQ, Contact |
| G | `mint` | Footer — the alternation closes on it rather than dropping to a dark slab |

A new section takes whatever colour the alternation gives it. **Do not introduce a third ground to make one
section stand out.** Two earlier drafts tried it — Testimonials on `pine`, then the footer on `pine` — and
both read as a random green slab interrupting the page. Emphasis comes from the cards and the dandelion
button, not from a new background.

### The seams are immortelle flowers

A `<Divider>` is not a wave any more. It draws a soft ground line with **immortelle sprigs growing up out
of it**. The ground *and the stems* are painted in the colour of the section **below**, over a background
of the section **above**, so the next band grows into the one before it. **The blooms depend on
the background**, at the client's request: over `haze` (`from="haze"`) they are immortelle yellow
(`dandelion`, via `palette.dandelion`); over `mint` they take the stem colour, because yellow on green was
too faint to read.

Two consequences:

- **`from` and `to` must match their neighbours** or the ground and stems come out the wrong colour.
- **The band colours have to stay apart in value.** The stems are only visible because `mint` and `haze`
  differ; at 1.41:1 they are a gentle step, and that is close to the floor. This is why `haze` was darkened
  to `#A7B0AA` when `mint` went green — the requested mint against the old grey was 1.19:1, at which point
  the seam and every flower in it disappears. If you change either band, re-check this first.

Four seam variants (`meadow`, `drift`, `verge`, `sparse`) differ in how the sprigs are scattered; pick so
that two adjacent seams are not identical. The geometry is **hard-coded, not random** — the page is
prerendered, so a random layout would differ between the static HTML and the first client render and React
would throw a hydration mismatch.

They are not free: the four seam definitions carry ~200 circles, and the built page inlines 333 of them
(~60KB raw, ~10KB gzipped). That is the budget already spent — if you add sprigs, take some out elsewhere.

### There is no light-on-dark surface at all

Every `-light` class is gone from `src/index.css` — `.label-light` was the last, and it went when the
footer moved onto `mint`. So did `.section-heading-light`, `.section-sub-light`, `.lede-light`,
`.btn-primary-light`, `.btn-ghost-light` and `.soft-card-dark`, deleted rather than left as dead CSS.

**If you ever add a dark section, that whole set has to come back with it** — light-band type is unreadable
on `pine`, and nothing in the stylesheet will warn you.

`<Photo tone="dark">` and the `pine-light` token survive for that eventuality; nothing currently uses
either. The one remaining dark surface on the whole project is `public/404.html`, which is a standalone
page with its own inline styles and is not part of this system.

## Design tokens (tailwind.config.js)

The brief was, in the client's words, *immortelle flowers on a seaside walk by pine trees next to the
ocean*. Every colour is one of those four things, which is also the quickest way to judge a proposed
addition: if it is not the water, the stone, the trees or the flower, it does not go in.

| token | hex | what it is |
| --- | --- | --- |
| `mint` | `#B8D6B2` | the meadow. Mint green — the page's signature colour |
| `haze` | `#A7B0AA` | sun-bleached limestone. The grey band |
| `pine` | `#24463C` | the trees. Heading and label type on the light bands, and the logo's bubble. Never a background |
| `pine-light` | `#33594D` | dark `<Photo>` placeholders only; nothing uses it now |
| `cloud` | `#F4F5F1` | cards, the navbar pill, ghost buttons, and the text colour on `pine`. **Never a section background.** |
| `dandelion` | `#EDD382` | the immortelle bloom. A pastel yellow; the primary button — a ground for `ink` type (9.7:1) |
| `dandelion-deep` | `#6E540A` | the only yellow that can be type on a light ground: prices, the Approach numerals, the button's ring and its hover fill |
| `ink` / `ink-soft` | `#212D27` / `#333F38` | body type on the light bands |
| `line` | `#74837C` | hairlines and ghost-button borders |

Contrast was computed, not eyeballed. Everything used for type clears AA: ink/mint 9.1, ink/haze 6.4,
ink-soft/mint 7.0, ink-soft/haze 4.94, pine/mint 6.6, pine/haze 4.68, cloud/pine 9.5, ink/dandelion 9.7,
cloud/dandelion-deep 6.5, dandelion-deep/cloud 6.5, dandelion/pine 7.1.

Four things the numbers catch and the eye does not:

- **The primary button carries a `dandelion-deep` ring, and it is not decoration.** The yellow is close to
  the value of both bands — 1.1:1 on `mint`, 1.5:1 on `haze` — so a bare pill would have almost no boundary
  at all. The ring is 3.2:1 on `haze` and 4.5:1 on `mint`, clearing the WCAG 1.4.11 threshold for a
  control's edge. Do not remove it. (`dandelion-deep` was darkened from a first pick specifically to clear
  3:1 on `haze`, and it has no headroom left — it is the one token here that must not drift lighter.)
- **The button's hover flips the type to `cloud`.** `ink` on `dandelion-deep` fails badly; the fill and the
  text colour have to change together.
- **`dandelion` is a ground, never type on a light band.** Where the yellow appears as type — the prices,
  the big Approach numerals, a testimonial's name — it is `dandelion-deep`. Because every use of it is a
  ground, the bloom is safe to soften further (paler only raises the contrast of the `ink` on it) but not
  to brighten past its original `#F0C93E`; `deep` cannot move at all, see the ring above.
- **A `cloud` card on the `mint` band is only 1.44:1 against it.** The shadow is most of what says the card
  is raised, which is why `soft`/`lift`/`deep` carry real weight here. Do not lighten them.

**If you introduce a colour, compute the ratio before using it for type** — this palette is soft enough
that a plausible-looking new tone will usually fail.

Radii are `rounded-soft` (1.75rem) and `rounded-blob` (2.5rem). Nothing on the page is square-cornered and
nothing uses a default Tailwind shadow.

### Type

**Three faces**, all self-hosted from Google Fonts:

| utility | face | used for |
| --- | --- | --- |
| `font-display` | **Berkshire Swash** | the wordmark (hero, navbar, footer), every section heading and `.section-sub`, the hero tagline, the Approach numerals, the rate prices |
| `font-title` | **Valley Sans** | the small titles *inside* cards and lists: service titles, Approach step titles, rate names, FAQ questions |
| `font-sans` | **Nunito** | all running text and UI, plus the practitioner's name under "About me" (Nunito Light) |

Berkshire was picked by the client on 2026-09-17 after previews of Fraunces, Cormorant Infant and Bodoni
Moda, and first went on everything that had been Valley Sans. The client then found it **too much inside
the cards** and had the list above moved back to Valley Sans, and the About name back to Nunito Light. So
the rule is: **Berkshire for section-level type only.** A new card title, list item or question takes
`font-title`, not `font-display`. The client also saw the hero paragraphs in Berkshire and chose against
it — never put it on running text.

**Berkshire Swash and Valley Sans each ship as one static weight (400), with no italic and no other cut.**
That is the single most important thing to know about them:

- Never put `font-medium`, `font-semibold`, `font-bold` or `italic` on display type. The browser will
  synthesise the shape, and on this face it is visibly wrong. `font-normal` is the only weight utility
  allowed on `.font-display` or `.font-title`.
- Emphasis in the display register comes from **size and colour only**. Anything that genuinely has to get
  bolder — the spaced-caps `.label`, button text — is body type, set in Nunito, which has real weights.
- `scripts/trim-fonts.py` cannot touch them. There are no axes to trim; the script covers Nunito only.
- Berkshire is already heavy, so keep it at roughly 17px and up. Below that the swashes clog.

Other rules:

- **No italic anywhere**, for the reason above. The testimonial quotes are set in Nunito Light at a larger
  size instead.
- The wordmark is **"Word & Riječ"** — an ampersand, not "and" — set in one colour and one weight, with no
  styling on either half. It appears in three places (`Hero`, `Navbar`, `Footer`) and they must agree; all
  three read `nameFirst`/`nameSecond` from `src/siteInfo.js` and put the `&amp;` between them.

Section headings pair a short noun (`Services`, `Rates`, `FAQ`) with a descriptive line beneath it
(`.section-sub`), never the other way round. Both are Berkshire; the sub is kept apart from the heading by
a clear size step and the softer `ink-soft` colour, and it must stay visibly smaller or it reads as a second
heading.

### The logo

`src/components/Logo.jsx` is the brand mark: **an immortelle growing inside a speech bubble** — language
services and the flower from the brief in one shape. Square, `64×64`.

- The bubble is a **solid** ground in `currentColor` (`text-pine` at every call site), so the mark keeps
  its edge on `mint`, `haze` and `cloud` and still reads at 18px.
- Inside it, the stems are `mint` and the heads `dandelion` (7.1:1 on pine) — fixed colours from
  `src/palette.js`, not `currentColor`, because they only ever sit on the bubble.
- The flower is a corymb like the real plant: three stems, clustered round heads, a pair of needle leaves.
- **The mark carries no lettering.** The wordmark sits beside it at all three call sites, which is also why
  it is `aria-hidden` unless given a `title`.
- `public/favicon.svg` is the same drawing and must be kept in step with `Logo.jsx`.
- `src/components/Sprig.jsx` is **not** the mark any more; it is the small line ornament beside labels and
  in the `<Photo>` empty state.
- Call sites set a height and let the width follow (`h-7 w-auto` in the navbar, `h-8` in the footer,
  `h-10 sm:h-14 lg:h-16` in the hero, where it sits to the left of the `h1`).
- It replaced an earlier single flower in open line (hollow rings, portrait 64×80). A real illustrator
  should still refine it.

### Croatian diacritics — the one non-obvious font constraint

Each family ships as **two** files split on `unicode-range`, exactly as Google Fonts serves them: `-latin`
(ASCII and Latin-1) and `-latin-ext`. The **latin-ext half is what carries č, ć, š, ž and đ**, starting
with the site's own name in the `h1`.

- Never consolidate the `@font-face` blocks or drop a `-latin-ext` file to "save bytes". The browser only
  fetches it when the page uses one of those characters — but this page always will.
- `index.html` preloads `berkshireswash-latin`, `berkshireswash-latin-ext` and `nunito-latin`. Valley Sans
  is not preloaded: nothing on the first screen uses it. The ext file is
  preloaded specifically because "Riječ" is in the largest text on the first screen; without it the
  headline reflows mid-load.
- If you replace a font, take both halves from the same Google Fonts request and keep the `unicode-range`
  declarations byte-for-byte.

The CSS references fonts as `../fonts/…` because the stylesheet is emitted into `dist/assets/` — from
there, `../fonts/` resolves to `dist/fonts/`. Vite logs "didn't resolve at build time" for each one; that
warning is expected and correct.

## Reusable CSS classes (src/index.css)

`.label` · `.section-heading` · `.section-sub` · `.lede` · `.btn-primary` · `.btn-ghost` · `.soft-card` ·
`.photo-frame` · `.hairline` · `.hero-height` · `.reveal` (plus the `-light` / `-dark` variants above).

Reach for these before writing new utility soup; a section that needs a class the others do not have is
usually a section that has drifted from the system.

## Components

- **`<Reveal delay={ms}>`** wraps anything that should fade and rise into view. The hidden state is scoped
  to `.reveal-ready`, a class `App.jsx` adds to `<html>` on mount — so the **prerendered page stays fully
  visible if JavaScript never runs**. Do not move that hidden state into the base stylesheet.
- **`<Photo>`** renders an image, or a labelled placeholder when `src` is falsy. Every image slot goes
  through it, which is why the page looks finished with no photography at all. Pass `tone="dark"` on `sea`.
- **`<Sprig>`** is a small line ornament — a stem with a few blooms — used beside labels and in the
  `<Photo>` empty state. It inherits `currentColor` (`dandelion-deep` on the light bands). It is not the
  logo; see "The logo".
- **`<Divider>`** — see "Bands and seams".
- **`<LangSwitch>`** is the language switcher: one compact link showing the language it switches *to*. It
  stays visible at every width, including below `md` where the nav links are hidden — it is the only way
  to reach the other language, and hiding it would strand a Croatian visitor on the English page.
- **`<Seo>`** renders everything in `<head>` that differs between the two languages. See SEO below.

Motion is deliberately slow and small: `animate-breathe` (11s) and `animate-sway` (9s), plus the reveal
transitions. All of it is disabled under `prefers-reduced-motion`, and anything new must be too.

## Where the content lives

**Almost all of it is now in `src/i18n/en.js` and `hr.js`**, under the same key in both. A component holds
only what is not text.

| what | where |
| --- | --- |
| Business name, email, phone, social links, canonical URL | `src/siteInfo.js` |
| Tagline, what the business does, where it works | `site` in each dictionary |
| Nav labels and the Services submenu | `nav` in each dictionary |
| Footer link labels and column headings | `nav` / `footer` in each dictionary |
| The four services — titles, audiences, descriptions | `services.items` in each dictionary |
| The four service **icons** | the `icons` map in `src/sections/Services.jsx`, keyed by the same ids |
| The three how-it-works steps | `approach.steps` in each dictionary |
| The step **numerals** (`01`–`03`) | `numerals` in `src/sections/Approach.jsx` |
| Testimonials | `testimonials.quotes` in each dictionary |
| Rate names and units | `rates.items` in each dictionary |
| **Prices** | the `prices` map in `src/sections/Rates.jsx`, keyed by the same ids |
| Questions and answers | `faq.items` in each dictionary |
| `<title>`, meta description, Open Graph, JSON-LD | `meta` in each dictionary, rendered by `src/components/Seo.jsx` |

Section IDs, used by every anchor link: `#home` `#services` `#about` `#approach` `#testimonials` `#rates`
`#faq` `#contact` `#footer`.

## Adding photos

1. Export to **WebP** at several widths — the convention from the sibling sites is roughly 400 / 700 / 1100
   for in-page images, and a `-1200` for anything used as an OG image.
2. Name them `<slug>-<width>.webp` and drop them in `public/images/`.
3. In the section, take `responsivePhoto` **off `useLang()`** — the bound copy, which knows how deep the
   current locale's page sits:

   ```jsx
   const { t, responsivePhoto } = useLang()
   const shot = responsivePhoto('slug', [400, 700, 1100])
   …
   <Photo {...shot} sizes="(min-width: 1024px) 40vw, 100vw" alt={t.about.photoAlt} />
   ```

Never write a literal `/images/…` path or use `import.meta.env.BASE_URL`. Both break under the GitHub Pages
sub-path; `src/images.js` explains why in detail. Importing `responsivePhoto` directly from `src/images.js`
and calling it without a prefix is the bilingual version of the same mistake — it resolves correctly at `/`
and 404s under `/hr/`. And `alt` is user-visible text, so it comes from the dictionary like everything
else.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` runs `npm ci && npm run build` and publishes `dist/` to
GitHub Pages. The workflow sets `enablement: true`, so it turns Pages on rather than failing if it is off.

The site is served at **https://word-and-rijec.com/**.

`public/CNAME` holds the bare domain and is copied into `dist/` by the build. **That file is what keeps the
custom domain attached** — GitHub Pages reads it from each published artifact, and deleting it resets the
site to the `github.io` URL on the next deploy.

`vite.config.js` sets **`base: './'`**. At a domain root an absolute `/` base would work equally well, but
the project-pages URL (`xarlos89.github.io/word-and-rijec-dot-com/`) is the fallback — it 301s to the domain
while `public/CNAME` is in place, and serves the site itself if that is ever removed — and an absolute
`/asset` path 404s under that sub-path. The relative base means one build serves both — don't "tidy" it to
`/`. Everything emitted is document-relative to match; see `src/images.js`.

Since the site became bilingual there are **two page depths**, and document-relative paths do not survive
the second one on their own. The `onPageRendered` hook in `vite.config.js` and `assetPrefix()` in
`src/i18n/locales.js` are what make `/hr/` work; both are explained under "Two languages → The trap". If
you ever add a page deeper than one directory, they already handle it — they count segments rather than
special-casing `hr`.

### The origin is hard-coded in five places

These are files that cannot import from `siteInfo.js`, so a domain change means editing all of them
together:

1. `src/siteInfo.js` → `site.url`
2. `public/sitemap.xml` → both `<loc>` values and every `<xhtml:link href>`
3. `public/404.html` → the favicon link, both `@font-face` sources and **both** home-page links (English
   and Croatian). These have to be absolute: GitHub Pages serves this file for unknown paths at *any*
   depth, where a relative path breaks
4. `public/CNAME` → the bare domain, no scheme, no trailing slash
5. `marketing/social/build.py` → `URL` (and `EMAIL`, which also duplicates `site.email`). The posters are
   PNGs with the domain **drawn into the pixels**, so after changing it, rerun the script and replace any
   poster already posted — an old image keeps advertising the old address

`index.html` used to be on this list and no longer is: the canonical, `og:url`, the hreflang set and the
JSON-LD `@id`s are all derived from `site.url` by `src/components/Seo.jsx`. That is one fewer place to
forget — don't type the origin back into the template.

Two more carry the domain as text rather than as a working URL, and need the same edit:

- `public/robots.txt` → the `Sitemap:` line
- `contact.form.subject` in **both** dictionaries → the subject line of every enquiry email

`grep -rn "word-and-rijec" --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=html .` finds the lot
(`marketing/social/html/` is the script's generated intermediate output, and git-ignored). The other hits are
code comments, `README.md`, and the npm package name, none of which affect the site.

### DNS, one time

At the registrar, for the apex `word-and-rijec.com`, four A records and four AAAA records pointing at
GitHub Pages:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153
CNAME www xarlos89.github.io.
```

Then in the repo's **Settings → Pages**: set the custom domain to `word-and-rijec.com` (it should already be
picked up from `public/CNAME` after the first deploy), wait for the DNS check to pass, and tick **Enforce
HTTPS** — the certificate is issued by GitHub and can take up to an hour after DNS resolves. GitHub
redirects `www` to the apex automatically once the `www` CNAME is in place.

If the Pages settings ever show the domain as "not properly configured", check the apex A records first;
that is almost always a registrar that wrote them against a subdomain instead of `@`.

## SEO

**`src/components/Seo.jsx` carries everything that differs between the two pages**: the title, the
description, the canonical, the hreflang set, Open Graph, the Twitter card and a small JSON-LD graph
(`WebSite` + an `Organization` with an `OfferCatalog` of the four services). `index.html` keeps only
what is identical on both — charset, viewport, the `robots` tag, the icons, the manifest and the font
preloads. **Do not put a per-language tag back in the template**: it would be emitted twice on every page.

The JSON-LD deliberately claims **only what is actually true**: the business name, the email, the services,
and the two languages. It is an `Organization`, **not `LocalBusiness`** or its subtype `ProfessionalService`:
Google's local-business result requires a street `address`, which this online business does not have, and
Search Console reports the item as invalid without one. Its `url` is the root on both pages, so the two
copies are one entity under one `@id`. No person, address, opening hours, price, rating or review is asserted, because none of it
is known. Add to it as real details arrive — never to pad it out.

The hreflang set is **reciprocal and self-inclusive** — each page lists both languages *including itself*,
plus `x-default` on the English root — because Google discards a set that does not point back at itself.
`public/sitemap.xml` repeats the same set per `<url>`. If you add a language, those two have to agree.

**Images.** Each page has its own `og:image` — `public/og-en.png` / `og-hr.png`, 1200×630, rendered by
`marketing/social/build.py` (design `7-og`) — with a `summary_large_image` Twitter card and an alt built from
the name and `site.tagline`. The raster icons (`favicon-32`, `apple-touch-icon`, `icon-192`, `icon-512`) come
from `scripts/build-icons.py`; `icon-512.png` doubles as the JSON-LD `logo`. **Regenerate the PNGs whenever
`favicon.svg`, `Logo.jsx` or the tagline changes** — they are committed files, not build output.

Absent on purpose: `aggregateRating`/`Review` (self-published reviews are ignored under Google's
review-snippet policy at best).

### Indexing and Google Search Console

**The site is open to search since 2026-09-28.** There is no `robots` meta tag, `public/robots.txt` is
`Allow: /` and names the sitemap. Before that date both were a noindex/Disallow pre-launch switch.

- **Search Console is verified as a Domain property by a DNS TXT record** at the registrar. There is no
  verification tag or file in the repo, and none is needed — but deleting that TXT record loses the
  property.
- The sitemap (`https://word-and-rijec.com/sitemap.xml`) is submitted there. **Bump both `<lastmod>`
  values** in `public/sitemap.xml` whenever the page content changes; Google ignores `changefreq` and
  `priority`.
- If a page ever needs hiding again, use a `noindex` meta tag **with robots.txt still allowing crawling**.
  A `Disallow` stops Google fetching the page, so it never sees the noindex, and a linked URL can still be
  indexed without its content.

## Social posters

`marketing/social/build.py` renders Facebook/Instagram posters in the site's own system — the palette, the
three faces from `public/fonts/`, `<Logo>`, `<Sprig>`, the service icons and two of the `<Divider>` seams,
all copied into the script. Each design is written as HTML to `marketing/social/html/` (git-ignored) and
screenshotted to `marketing/social/png/<n>-<design>-<en|hr>.png` at 2x: 2160×2700 for the 4:5 feed posts,
2160×2160 for the squares.

| design | size | contents |
| --- | --- | --- |
| `1-tagline` | 4:5 | wordmark, tagline, first hero paragraph, `hero.offer`, "Get in touch" button, URL and email |
| `2-services` | 4:5 | the four service cards (icon, title, audience) |
| `3-about` | 4:5 | the portrait, her name, two sentences from About |
| `4-how-it-works` | square | the three steps, shortened by dropping whole sentences |
| `5-rates` | square | the rate card and the "first call is free" note |
| `6-name` | 4:5 | large logo and wordmark, tagline, `site.what`, URL and email. The portrait was tried here and dropped as too much |
| `7-og` | 1200×630 | logo, wordmark, tagline, URL. **Not a poster** — the site's link preview, written to `public/og-<lang>.png` (rendered 2x, downsampled with Pillow) and deployed |

The site owner picked **1, 2, 4 and 6** for use. 3 and 5 still render but were not chosen.

- **Rendered with headless Firefox**, the only browser that works here: Vivaldi's `--headless` hangs.
  The script keeps a throwaway profile in `marketing/social/.ffprofile/` (git-ignored). The 2x comes from
  `zoom: 2` on `<html>` with a doubled window; the `layout.css.devPixelsPerPx` pref is ignored by
  `--screenshot`.
- **The copy is duplicated, not imported** — it lives in the `T` dict in the script, copied verbatim from
  the dictionaries and `Rates.jsx`. When she changes copy or a price on the site, update `T` and rerun, or
  the posters go stale.
- **The same content rules apply.** Nothing in `T` may be written on her behalf. The testimonials and
  `site.location` are not used on any poster. The Croatian
  `services.sub` is scaffold chrome, so the HR Services poster shows her tagline there instead.
- **Unconfirmed:** the Croatian `site.what` ("Jezične usluge na engleskom i hrvatskom") on `6-name-hr` has
  not been confirmed as hers; she should check it before it is posted.

## What's placeholder

Assume everything is, unless it is in this list of things that are real:

- The business name, "Word & Riječ", the domain `word-and-rijec.com`, and the two languages.
- The four services: language lessons, tutoring, editing & proofreading, copywriting — and the English
  titles, audiences and descriptions of each, in that order.
- **The Croatian copy**, all of it except short UI chrome — supplied by the client in
  Croatian, not translated from her English.
- **The English copy** — the hero ("More language. More life." and its two paragraphs, also used as the
  English tagline), About (Rebekah Berković's own text), How it works, the FAQ answers, the rates note and
  the contact paragraph. All supplied by the client.
- **`site.practitioner`**: Rebekah Berković.
- **`site.location`** ("Brač, online, worldwide" / "Brač, online, bilo gdje u svijetu") — "Brač" added at
  her request on 2026-10-08. It shows in the footer and under the contact form.
- **Testimonials** (Sarah M., Ivana K., Marko P.), in both languages — confirmed by the site owner on
  2026-09-28 as genuine quotes from real students. They were first added (commit `a819e47`) marked as
  invented layout filler; that label was superseded by this confirmation. Any new quote must likewise be
  a real one, supplied in both languages.
- **The About portrait** of Rebekah, supplied by the client.
- **Rates.** The figures in the `prices` map in `Rates.jsx` are hers: tutoring €15/h with 5- and 10-session
  blocks; language lessons in two subsections (`sections` in the map) — individual €30/h with blocks and
  savings, group €20/h for 2 people and €15/h for 3 or more; proofreading from €7 per standard page
  (`kartica`); copy quoted per project. "Academic English & writing" was removed at her request on
  2026-10-08. She did not say whether the group prices are per person, so the page does not either. The
  figures are shared by both languages; the names and package labels are translated.
- The stack, the design system, the build and the deploy workflow.
- The **bilingual machinery** — the two routes, the dictionaries, the switcher, the hreflang.

**Drafted here on 2026-10-08 and awaiting her check** — Croatian she asked for in English only: the About
sentence "Trenutno živim i radim na Braču." and the rate labels `Individualni satovi`, `Grupni satovi`,
`2 osobe`, `3 ili više osoba`, `od … po kartici`. Replace them with her wording when she sends it.

Still missing or provisional:

- **`src/siteInfo.js`** — the email (`rebekahberkovic@gmail.com`) is real. No phone number and no social links; the
  footer and the contact section hide those fields while they are empty, so leaving them blank is safe.
  `site.url` is now real.
- **Photography.** Only the About portrait is real (`public/images/rebekah-berkovic-{400,600,830}.webp`,
  cropped to 4:5 from an 830px-wide original, so there is no 1100 size). Nothing else has a photo.
- **Logo.** `<Logo>` and `public/favicon.svg` are drawn here, not commissioned. See "The logo" above.

One known gap in the build itself, not a bug to be surprised by:

- **No mobile nav.** Below `md` the navbar keeps the flower mark, the language switcher and the "Get in
  touch" button, and hides the links entirely. Below `sm` the wordmark text goes too — the pill cannot hold
  four things on a 320px phone, and the `h1` says the name a few pixels further down. A drawer or sheet is
  still to be built, and it is the thing that would let the wordmark come back.

  Watch the width when you touch the navbar: the Croatian labels are longer than the English ones ("Kako to
  funkcionira" against "How it works"), so 768px — where the links appear — is the tightest point, not the
  phone widths.

### The contact form

`src/sections/Contact.jsx` has a plain HTML form that POSTs to `https://formsubmit.co/<site.email>`. There is
no JavaScript: FormSubmit emails the fields to Rebekah and redirects to `_next`, which is this page's absolute
URL in the same language plus `#contact`. The form also sends `_captcha=false`, `_template=table` and a
`_honey` honeypot.

- **The first submission ever sends Rebekah a FormSubmit activation email, and she must click it.** Until she
  does, nothing is delivered.
- After activation, FormSubmit offers a random alias string. It can replace the address in `action` so the
  address is not in the page source. The mailto link shows it anyway, so this is optional.
- The field labels, button text and email subject are UI chrome, so they live under `contact.form` in both
  dictionaries.

### Don't invent

The client has not supplied credentials, a phone number or social links. When filling any of this in, use
what she actually sends. If a section has no real content to put in it, remove the section rather than
writing plausible-sounding filler — a page that says less is recoverable, a page that says something untrue
about her business is not.

**This applies twice over to the Croatian page.** Do not translate her English copy into Croatian on her
behalf, and do not write Croatian copy to fill the gap: she is a Croatian language professional, the
Croatian page is the one her Croatian clients will read, and a fluent-sounding paragraph she did not write
is the worst possible thing to put in front of them. Ask for both languages, or leave the gap visibly
unfinished.

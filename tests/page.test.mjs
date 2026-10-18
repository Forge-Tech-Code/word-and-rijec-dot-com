// Checks specific to Word & Riječ. Most of them hold a rule from CLAUDE.md in
// place — the two-language machinery, the relative-path trap under /hr/, the
// two-band design — so a change that breaks one fails here first.
import { test, describe, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'
import { DIST, site, loadPage, pageUrl, nodeOfType, graphNodes, typesOf, textOf, norm, cssFiles, localTarget, isFile, serveDist } from './lib.mjs'
import { site as info } from '../src/siteInfo.js'
import { palette } from '../src/palette.js'
import { LANGS, localePath, localeTag, localeHref, otherLang } from '../src/i18n/locales.js'

const pages = LANGS.map((lang) => ({ lang, path: localePath[lang], ...loadPage(localePath[lang]) }))
const bandOf = (el) => (el?.getAttribute('class') ?? '').match(/\bbg-(mint|haze)\b/)?.[1] ?? null
const hreflangs = (document) =>
  Object.fromEntries([...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')]))
const expectedHreflangs = () => ({
  ...Object.fromEntries(LANGS.map((l) => [localeTag[l], pageUrl(localePath[l])])),
  'x-default': pageUrl(localePath.en),
})

describe('page: Word & Riječ', () => {
  for (const { lang, path: p, document, html } of pages) {
    describe(`${p}`, () => {
      test('W01 every section the menu and footer link to exists', () => {
        const ids = ['home', 'services', 'about', 'approach', 'testimonials', 'rates', 'faq', 'contact', 'footer']
        assert.deepEqual(ids.filter((id) => !document.getElementById(id)), [])
      })

      test('W02 the hreflang set is complete, reciprocal and includes this page', () => {
        assert.deepEqual(hreflangs(document), expectedHreflangs())
      })

      test('W03 the language switcher is in the header and lands on the other language', () => {
        const other = otherLang(lang)
        const a = document.querySelector(`header a[hreflang="${localeTag[other]}"]`)
        assert.ok(a, 'no language switcher in the header')
        assert.equal(a.getAttribute('href'), localeHref(lang, other))
        assert.equal(localTarget(p, a.getAttribute('href')), path.join(DIST, localePath[other], 'index.html'))
      })

      test('W04 every path is document-relative — nothing escapes the github.io sub-path', () => {
        const rooted = [...html.matchAll(/\s(?:src|href|srcset|imagesrcset)="(\/[^/][^"]*)"/g)].map((m) => m[1])
        assert.deepEqual(rooted, [], 'root-relative paths 404 under the project-pages URL')
      })

      test('W05 the wordmark reads "Word & Riječ" in the hero, the navbar and the footer', () => {
        for (const where of ['h1', 'header', 'footer']) {
          assert.ok(norm(textOf(document.querySelector(where))).includes(info.name), `${where} does not carry "${info.name}"`)
        }
      })

      test('W06 the bands alternate mint and haze — no third ground, never pine', () => {
        assert.equal(document.querySelectorAll('[class*="bg-pine"]').length, 0, 'pine is a type colour only')
        for (const el of document.querySelectorAll('main > section, footer')) {
          assert.ok(bandOf(el), `#${el.id} is neither bg-mint nor bg-haze`)
        }
        assert.equal(bandOf(document.getElementById('home')), 'mint')
        assert.equal(bandOf(document.querySelector('footer')), 'mint')
      })

      test('W07 the colour only changes at a seam, and every seam matches the bands either side', () => {
        const hex = Object.fromEntries(Object.entries(palette).map(([k, v]) => [v.toLowerCase(), k]))
        let prev = null
        let seam = null
        for (const el of [...document.querySelector('main').children, document.querySelector('footer')]) {
          const bg = (el.getAttribute('style') ?? '').match(/background:\s*(#[0-9a-f]{6})/i)?.[1]
          if (el.getAttribute('aria-hidden') === 'true' && bg) {
            seam = { from: hex[bg.toLowerCase()], to: hex[el.querySelector('path')?.getAttribute('fill')?.toLowerCase()] }
            assert.equal(seam.from, prev, `a seam paints over ${seam.from} where the band above is ${prev}`)
            continue
          }
          const band = bandOf(el)
          if (!band) continue
          if (seam) assert.equal(seam.to, band, `a seam grows ${seam.to} into a ${band} band (#${el.id})`)
          else if (prev) assert.equal(band, prev, `#${el.id} changes colour with no seam`)
          prev = band
          seam = null
        }
      })

      test('W08 display type is never bold or italic (one static weight, no italic cut)', () => {
        for (const el of document.querySelectorAll('.font-display, .font-title')) {
          assert.doesNotMatch(el.getAttribute('class'), /\b(font-(medium|semibold|bold|extrabold|black)|italic)\b/, `synthesised weight on "${textOf(el).slice(0, 30)}"`)
        }
        assert.equal(document.querySelectorAll('em, i').length, 0, 'italic text — the page has no italic anywhere')
      })

      test('W09 the JSON-LD is an Organization that claims only what is known', () => {
        const org = nodeOfType(document, 'Organization')
        assert.ok(org, 'no Organization')
        assert.equal(org.email, info.email)
        assert.equal(org.founder?.name, info.practitioner)
        for (const n of graphNodes(document)) {
          for (const t of ['LocalBusiness', 'ProfessionalService', 'Review']) assert.ok(!typesOf(n).includes(t), `a ${t} node`)
          for (const k of ['address', 'aggregateRating', 'review', 'openingHours', 'telephone']) assert.ok(!(k in n), `${typesOf(n)} claims ${k}`)
        }
      })

      test('W10 the contact form posts to FormSubmit and returns to this page', () => {
        const form = document.querySelector('#contact form')
        assert.equal(form.getAttribute('action'), `https://formsubmit.co/${info.email}`)
        assert.equal((form.getAttribute('method') ?? '').toLowerCase(), 'post')
        const v = (name) => form.querySelector(`[name="${name}"]`)?.getAttribute('value')
        assert.equal(v('_next'), `${pageUrl(p)}#contact`)
        assert.equal(v('_captcha'), 'false')
        assert.ok(form.querySelector('[name="_honey"]'), 'no honeypot')
        for (const name of ['name', 'email', 'message']) assert.ok(form.querySelector(`[name="${name}"]`)?.hasAttribute('required'), `"${name}" not required`)
      })

      test('W11 every FAQ answer is in the prerendered HTML', () => {
        const buttons = document.querySelectorAll('#faq button[aria-controls]')
        assert.ok(buttons.length > 0, 'no FAQ questions')
        for (const b of buttons) {
          const answer = document.getElementById(b.getAttribute('aria-controls'))
          assert.ok(answer && textOf(answer).length > 10, `no answer in the HTML for "${textOf(b)}"`)
        }
      })

      test('W12 the link preview uses this language\'s image and locale', () => {
        const og = (k) => document.querySelector(`meta[property="${k}"]`)?.getAttribute('content')
        assert.equal(og('og:image'), `${site.origin}/og-${lang}.png`)
        assert.match(og('og:locale'), new RegExp(`^${localeTag[lang]}_`))
      })
    })
  }

  test('W13 the prices are the same figures on both pages', () => {
    // Read each innermost element on its own: textContent of the whole card
    // runs neighbours together ("€10" + "10 lessons" -> "€1010").
    const figures = (doc) =>
      [...doc.querySelectorAll('#rates *')]
        .filter((el) => el.children.length === 0)
        .flatMap((el) => [...textOf(el).matchAll(/€\s?\d+/g)].map((m) => m[0].replace(/\s/g, '')))
        .sort()
    const [first, ...rest] = pages
    assert.ok(figures(first.document).length >= 8, 'expected the rate card on the page')
    for (const pg of rest) assert.deepEqual(figures(pg.document), figures(first.document), `${pg.path} has different prices`)
  })

  test('W14 both pages carry the same testimonials and the same number of FAQs', () => {
    const names = (doc) => ['Sarah M.', 'Ivana K.', 'Marko P.'].filter((n) => textOf(doc.getElementById('testimonials')).includes(n))
    const faqs = (doc) => doc.querySelectorAll('#faq button').length
    for (const pg of pages) {
      assert.equal(names(pg.document).length, 3, `${pg.path} is missing a testimonial`)
      assert.equal(faqs(pg.document), faqs(pages[0].document), `${pg.path} has a different number of FAQs`)
    }
  })

  test('W15 the sitemap carries the same hreflang set as the pages', () => {
    const xml = readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8')
    const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1])
    assert.equal(blocks.length, LANGS.length)
    for (const block of blocks) {
      const links = Object.fromEntries([...block.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]))
      assert.deepEqual(links, expectedHreflangs())
    }
  })

  test('W16 the Croatian letters have their font: latin-ext is declared and preloaded', () => {
    const css = cssFiles().map((f) => readFileSync(f, 'utf8')).join('')
    const ext = [...css.matchAll(/@font-face\{[^}]*\}/g)].map((m) => m[0]).filter((f) => /U\+0?100-0?2BA/i.test(f)) // Vite's minifier may drop the leading zeros
    assert.ok(ext.length >= 2, 'no latin-ext @font-face blocks — č ć š ž đ would fall back')
    for (const f of ext) {
      const src = f.match(/url\(([^)]+)\)/)[1].replace(/['"]/g, '')
      assert.ok(isFile(path.resolve(path.dirname(cssFiles()[0]), src)), `${src} is missing`)
    }
    const hr = pages.find((pg) => pg.lang === 'hr').document
    assert.ok(hr.querySelector('link[rel="preload"][href*="latin-ext"]'), 'the latin-ext display font is not preloaded')
    assert.match(textOf(hr.body), /[čćšžđ]/, 'the Croatian page has no Croatian letters')
  })
})

describe('page: Word & Riječ in the browser', () => {
  let server
  let browser
  before(async () => {
    server = await serveDist()
    browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
  })
  after(async () => {
    await browser?.close()
    await server?.close()
  })

  const open = async (p, width = 1280) => {
    const page = await browser.newPage({ viewport: { width, height: 800 } })
    await page.route('**/*', (r) => (r.request().url().startsWith(server.origin) ? r.continue() : r.abort()))
    await page.goto(server.origin + p, { waitUntil: 'networkidle' })
    return page
  }

  test('W17 the switcher takes you to the other language and back, at phone width', async () => {
    const page = await open('/', 320)
    const switcher = page.locator('header a[hreflang]')
    await assert.doesNotReject(switcher.waitFor({ state: 'visible' }), 'the switcher is hidden on a phone')
    await Promise.all([page.waitForURL('**/hr/'), switcher.click()])
    assert.equal(await page.getAttribute('html', 'lang'), 'hr')
    await Promise.all([page.waitForURL((u) => new URL(u).pathname === '/'), page.locator('header a[hreflang]').click()])
    assert.equal(await page.getAttribute('html', 'lang'), 'en')
    await page.close()
  })

  test('W18 a FAQ question opens and closes its answer', async () => {
    const page = await open('/hr/')
    const button = page.locator('#faq button').first()
    const answer = page.locator('#faq-answer-0')
    await answer.waitFor({ state: 'hidden' })
    await button.click()
    await answer.waitFor({ state: 'visible' })
    assert.equal(await button.getAttribute('aria-expanded'), 'true')
    await button.click()
    await answer.waitFor({ state: 'hidden' })
    await page.close()
  })
})

/**
 * The locale table. Plain JS with no JSX and no imports, so vite.config.js can
 * read it at build time alongside the app.
 *
 * English is the ROOT locale and every other language lives one directory
 * down. That asymmetry is deliberate — it keeps word-and-rijec.com/ as the
 * canonical English URL rather than redirecting it to /en/ — but it is also
 * the thing that makes the relative `base` awkward, so see `assetPrefix`.
 */
export const DEFAULT_LANG = 'en'

/** Every language the site is built in, in the order the switcher shows them. */
export const LANGS = ['en', 'hr']

/** The URL each locale answers on. Trailing slash: these are directories. */
export const localePath = {
  en: '/',
  hr: '/hr/',
}

/** What the switcher calls each language, in that language. */
export const localeLabel = {
  en: 'EN',
  hr: 'HR',
}

/** The `lang` attribute and the Open Graph locale for each. */
export const localeTag = {
  en: 'en',
  hr: 'hr',
}

export const localeOgTag = {
  en: 'en_GB',
  hr: 'hr_HR',
}

/**
 * How many directories deep a locale's index.html sits: 0 for English at the
 * root, 1 for /hr/index.html.
 */
export function localeDepth(lang) {
  return localePath[lang].split('/').filter(Boolean).length
}

/**
 * The document-relative prefix that reaches dist/ from inside a locale's
 * page. './' from the root, '../' from /hr/.
 *
 * This exists because vite.config.js sets `base: './'`. Everything Vite emits
 * is document-relative, which is what lets one build serve both the custom
 * domain and the github.io sub-path — but a document-relative './assets/x'
 * inside /hr/index.html resolves to /hr/assets/x, which does not exist. The
 * asset refs Vite writes into the template are corrected by the
 * `onPageRendered` hook in vite.config.js; the ones OUR code writes (anything
 * out of public/, via src/images.js) have to use this. See CLAUDE.md →
 * Deployment.
 */
export function assetPrefix(lang) {
  const depth = localeDepth(lang)
  return depth === 0 ? './' : '../'.repeat(depth)
}

/** The other language — the one the switcher offers. */
export function otherLang(lang) {
  return LANGS.find((l) => l !== lang) ?? DEFAULT_LANG
}

/**
 * A DOCUMENT-RELATIVE href from one locale's page to another's.
 *
 * The switcher cannot use the root-relative '/hr/' from `localePath`: under
 * the github.io project-pages fallback (xarlos89.github.io/word-and-rijec-dot-com/)
 * a leading slash escapes the sub-path and lands on xarlos89.github.io/hr/.
 * Same reason `base` is './' — see CLAUDE.md → Deployment.
 *
 *   en → hr   './hr/'
 *   hr → en   '../'
 */
export function localeHref(from, to) {
  const up = '../'.repeat(localeDepth(from)) || './'
  const down = localePath[to].replace(/^\//, '')
  return `${up}${down}`
}

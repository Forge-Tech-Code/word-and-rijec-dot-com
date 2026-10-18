// What the shared tests (general / browser) need to know about this site.
// The pages come from the locale table, so a new language is tested as soon
// as it is added there.
import { LANGS, localePath, localeTag } from '../src/i18n/locales.js'

export const site = {
  origin: 'https://word-and-rijec.com',
  pages: LANGS.map((lang) => ({ path: localePath[lang], lang: localeTag[lang], indexable: true })),
  notFoundPage: true,
}

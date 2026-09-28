import { Head } from 'vite-react-ssg'
import { site } from '../siteInfo'
import { useLang } from '../i18n'
import { LANGS, localePath, localeTag, localeOgTag } from '../i18n/locales'

/** Absolute URL of a locale's page, e.g. https://word-and-rijec.com/hr/ */
export function localeUrl(lang) {
  return `${site.url.replace(/\/$/, '')}${localePath[lang]}`
}

/**
 * Everything in <head> that differs between the two languages.
 *
 * index.html keeps only the tags that are the same on both pages — charset,
 * viewport, the icons, the manifest and the font
 * preloads. The title, the description, the canonical, Open Graph, Twitter
 * and the JSON-LD graph are all per-locale and are rendered from here, so
 * they are not duplicated in the template.
 *
 * One consequence worth knowing: the canonical origin is no longer typed out
 * in index.html. It is read from src/siteInfo.js, so a domain change is one
 * edit fewer. See CLAUDE.md → Deployment.
 *
 * The JSON-LD still claims only what is actually true — the name, the email,
 * the four services, the two languages. No person, address, price, rating or
 * review. The business is an `Organization`, NOT `LocalBusiness` (or its
 * subtype `ProfessionalService`): Google's local-business result requires a
 * street `address`, and this online-only business has none, so that type
 * shows up as an invalid item in Search Console. Its `url` is the root on
 * both pages so the two copies describe one identical entity under one @id.
 * The only thing bilingualism adds is `inLanguage` and the reciprocal
 * hreflang below.
 */
export default function Seo() {
  const { lang, t } = useLang()
  const url = localeUrl(lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': `${site.url}#business` },
        inLanguage: LANGS.map((l) => localeTag[l]),
      },
      {
        '@type': 'Organization',
        '@id': `${site.url}#business`,
        name: site.name,
        url: site.url,
        email: site.email,
        description: t.meta.description,
        knowsLanguage: LANGS.map((l) => localeTag[l]),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.services.heading,
          itemListElement: Object.values(t.services.items).map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title },
          })),
        },
      },
    ],
  }

  return (
    <Head>
      <html lang={localeTag[lang]} />

      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <link rel="canonical" href={url} />

      {/* Reciprocal hreflang. Every page lists every language INCLUDING
          itself, plus x-default on the root locale — Google treats a set that
          does not point back at itself as broken. */}
      {LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={localeTag[l]} href={localeUrl(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={localeUrl('en')} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={t.meta.title} />
      <meta property="og:description" content={t.meta.ogDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={localeOgTag[lang]} />
      {LANGS.filter((l) => l !== lang).map((l) => (
        <meta key={l} property="og:locale:alternate" content={localeOgTag[l]} />
      ))}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={t.meta.title} />
      <meta name="twitter:description" content={t.meta.ogDescription} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  )
}

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base. The site now answers on word-and-rijec.com, where a '/'
  // base would also work — but the project-pages URL
  // (xarlos89.github.io/word-and-rijec-dot-com/) stays live as a fallback, and an
  // absolute '/asset' path 404s under that sub-path. Keeping the base
  // relative means one build serves both. See CLAUDE.md → Deployment.
  base: './',

  ssgOptions: {
    // 'nested' writes dist/hr/index.html rather than dist/hr.html, so the
    // Croatian page answers on the directory URL /hr/ with a trailing slash.
    dirStyle: 'nested',

    /**
     * REPAIR THE RELATIVE ASSET PATHS ON ANY PAGE BELOW THE ROOT.
     *
     * `base: './'` makes Vite emit document-relative URLs — './assets/app.js',
     * './fonts/…', './favicon.svg'. That is correct for dist/index.html and
     * wrong for dist/hr/index.html, where './assets/app.js' resolves to
     * /hr/assets/app.js and 404s. vite-react-ssg writes the same template to
     * both depths and does not rewrite them.
     *
     * So: for every page one or more directories down, walk the prefix back
     * up. This runs after the preload links are injected, so it catches the
     * whole head. Only href/src attribute values that literally start './'
     * are touched — inline SVG path data ('d="M32 76…"') and the absolute
     * URLs in the JSON-LD are left alone.
     *
     * The mirror of this for assets OUR code references out of public/ is
     * assetPrefix() in src/i18n/locales.js. See CLAUDE.md → Deployment.
     */
    onPageRendered(route, html) {
      const depth = route.split('/').filter(Boolean).length
      if (depth === 0) return html
      const prefix = '../'.repeat(depth)
      return html.replace(/(\s(?:href|src)=")\.\//g, `$1${prefix}`)
    },
  },
})

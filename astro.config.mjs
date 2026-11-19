// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // TODO: set `site` once the production domain is decided (docs/sitemap.md). Canonical URLs,
  // hreflang and sitemap.xml depend on it.
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  build: {
    // Keep CSS and JS in files rather than inline, so a strict Content-Security-Policy is possible.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});

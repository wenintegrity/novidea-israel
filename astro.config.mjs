// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

// The site's address comes from ONE setting (docs/seo.md §2, §6). Every absolute URL (canonical,
// Open Graph, sitemap.xml, robots.txt, structured data) is built from it; no domain is hard-coded.
//   SITE_URL       the final domain, set in Vercel at launch (e.g. https://www.example.co.il)
//   otherwise      the Vercel production URL (novidea-israel.vercel.app, temporary), then the
//                  deployment's own preview URL, then localhost for local builds.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const vercelProduction =
  env.VERCEL_ENV === 'production' && env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;
const vercelDeployment = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : undefined;
const site = env.SITE_URL || vercelProduction || vercelDeployment || 'http://localhost:4321';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site,
  // One URL per page: /solution, never /solution/ (Vercel redirects the slash form, vercel.json)
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  env: {
    schema: {
      // Off until the final domain is live: every page gets <meta name="robots" content="noindex">
      // and robots.txt leaves out the Sitemap line. Set ALLOW_INDEXING=true in Vercel's Production
      // environment at launch (docs/seo.md §6).
      ALLOW_INDEXING: envField.boolean({ context: 'server', access: 'public', default: false }),
    },
  },
  build: {
    // Keep CSS and JS in files rather than inline, so a strict Content-Security-Policy is possible.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});

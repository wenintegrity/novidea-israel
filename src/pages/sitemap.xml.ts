// sitemap.xml (docs/seo.md §5): every Hebrew page, built from the content collection and `site`.
// The 404 page and pages marked `seo.noindex` (campaign pages) are never listed.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pagePath } from '../config/nav';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('`site` must be set in astro.config.mjs to build sitemap.xml');
  const pages = await getCollection('pages', (p) => p.id.startsWith('he/') && !p.data.seo.noindex);
  const slugs = pages
    .map((p) => p.id.slice('he/'.length))
    .sort((a, b) => (a === 'home' ? -1 : b === 'home' ? 1 : a.localeCompare(b)));
  const urls = slugs.map((slug) => `  <url><loc>${new URL(pagePath('he', slug), site).href}</loc></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

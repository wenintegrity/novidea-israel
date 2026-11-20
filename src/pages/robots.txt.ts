// robots.txt (docs/seo.md §5), built from `site`. Crawling is always allowed: while indexing is off,
// pages carry `noindex` instead, and a crawler must be able to fetch a page to see that. The Sitemap
// line appears only once ALLOW_INDEXING is on (the final domain).
import type { APIRoute } from 'astro';
import { ALLOW_INDEXING } from 'astro:env/server';

export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /'];
  if (ALLOW_INDEXING && site) lines.push('', `Sitemap: ${new URL('/sitemap.xml', site).href}`);
  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

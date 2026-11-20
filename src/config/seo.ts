// Structured data (schema.org JSON-LD) for search engines (docs/seo.md §5). Absolute URLs are built
// from `site` (astro.config.mjs). Only facts that are already on the site: no address, phone or social
// profiles until Novidea approves them (docs/seo.md §9).

/** Organization + WebSite, on the home page. */
export function homeJsonLd(site: URL, siteName: string, language: string) {
  const root = new URL('/', site).href;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Novidea',
      alternateName: 'נובידאה',
      url: root,
      logo: new URL('/logo-novidea.png', site).href,
      sameAs: ['https://novidea.com'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: root,
      inLanguage: language,
    },
  ];
}

/** BreadcrumbList for an internal page: home → page. */
export function breadcrumbJsonLd(site: URL, homeName: string, pageName: string, pagePath: string) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeName, item: new URL('/', site).href },
        { '@type': 'ListItem', position: 2, name: pageName, item: new URL(pagePath, site).href },
      ],
    },
  ];
}

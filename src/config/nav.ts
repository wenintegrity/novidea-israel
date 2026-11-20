// Primary navigation. Spec: docs/sitemap.md → "Navigation".
import type { Locale, UiKey } from '../i18n/ui';

export interface NavItem {
  key: UiKey;
  /** Slug of the page (src/content/pages/<locale>/<slug>.yaml) */
  slug: string;
}

export const primaryNav: NavItem[] = [
  { key: 'nav.solution', slug: 'solution' },
  { key: 'nav.capabilities', slug: 'capabilities' },
  { key: 'nav.why', slug: 'why-novidea' },
  { key: 'nav.israel', slug: 'israel' },
];

export const ctaNav: NavItem = { key: 'nav.cta', slug: 'contact' };

/** Footer-only links: pages that aren't in the header menu (the /platform landing page). */
export const footerExtraNav: NavItem[] = [{ key: 'nav.platform', slug: 'platform' }];

export function homePath(locale: Locale): string {
  return locale === 'he' ? '/' : `/${locale}/`;
}

export function pagePath(locale: Locale, slug: string): string {
  return slug === 'home' ? homePath(locale) : `${homePath(locale)}${slug}`;
}

/** True when `pathname` is the page `slug` (ignores a trailing slash). */
export function isCurrent(pathname: string, locale: Locale, slug: string): boolean {
  const clean = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);
  return clean(pathname) === clean(pagePath(locale, slug));
}

// Primary navigation. Spec: docs/sitemap.md → "Navigation". While only the home page exists,
// items point at home-page sections so there are no dead links.
import type { Locale, UiKey } from '../i18n/ui';

export interface NavItem {
  key: UiKey;
  anchor: string;
}

export const primaryNav: NavItem[] = [
  { key: 'nav.platform', anchor: 'platform' },
  { key: 'nav.ai', anchor: 'ai' },
  { key: 'nav.audiences', anchor: 'audiences' },
  { key: 'nav.news', anchor: 'news' },
];

export const ctaAnchor = 'contact';

export function homePath(locale: Locale): string {
  return locale === 'he' ? '/' : `/${locale}/`;
}

export function sectionHref(locale: Locale, anchor: string): string {
  return `${homePath(locale)}#${anchor}`;
}

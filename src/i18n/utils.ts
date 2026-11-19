import { defaultLocale, locales, ui, type Locale, type UiKey } from './ui';

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? '');
}

/** Locale from Astro's i18n routing (`Astro.currentLocale`), falling back to Hebrew. */
export function getLocale(current: string | undefined): Locale {
  return isLocale(current) ? current : defaultLocale;
}

export function getDir(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'he' ? 'rtl' : 'ltr';
}

export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key] ?? ui[defaultLocale][key];
}

const intlLocale: Record<Locale, string> = { he: 'he-IL', en: 'en-GB' };

/** DD/MM/YYYY in both locales (AGENTS.md §4.2). */
export function formatDate(date: Date, locale: Locale): string {
  const parts = new Intl.DateTimeFormat(intlLocale[locale], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Jerusalem',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('day')}/${get('month')}/${get('year')}`;
}

/** ISO date (YYYY-MM-DD) for <time datetime>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

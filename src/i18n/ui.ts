// UI strings. Keys: Code agent. Values: Content agent (AGENTS.md §3.5).

export const locales = ['he', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'he';

export const ui = {
  he: {
    'skip.main': 'דילוג לתוכן הראשי',
    'nav.label': 'ניווט ראשי',
    'nav.home': 'Novidea, לעמוד הבית',
    'nav.open': 'פתיחת התפריט',
    'nav.close': 'סגירת התפריט',
    'nav.menu': 'תפריט',
    'nav.platform': 'הפלטפורמה',
    'nav.ai': 'בינה מלאכותית',
    'nav.audiences': 'למי זה מתאים',
    'nav.news': 'חדשות',
    'nav.cta': 'לתיאום הדגמה',
    'lang.switch': 'English',
    'footer.about':
      'Novidea מפתחת פלטפורמת InsurTech מבוססת ענן ומונחית נתונים לברוקרים, לסוכנויות ביטוח ולמבטחים.',
    'footer.navTitle': 'ניווט',
    'footer.rights': 'כל הזכויות שמורות.',
    'quote.label': 'ציטוט',
  },
  en: {
    'skip.main': 'Skip to main content',
    'nav.label': 'Main',
    'nav.home': 'Novidea, home',
    'nav.open': 'Open menu',
    'nav.close': 'Close menu',
    'nav.menu': 'Menu',
    'nav.platform': 'Platform',
    'nav.ai': 'AI',
    'nav.audiences': "Who it's for",
    'nav.news': 'News',
    'nav.cta': 'Book a demo',
    'lang.switch': 'עברית',
    'footer.about':
      'Novidea builds a cloud-based, data-driven InsurTech platform for brokers, insurance agencies and insurers.',
    'footer.navTitle': 'Navigation',
    'footer.rights': 'All rights reserved.',
    'quote.label': 'Quote',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['he'];

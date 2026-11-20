# Sitemap

**Owner:** Structure agent (`structure-architect`) · **Status:** v0.2 · **Last updated:** 19/11/2026

Hebrew pages are served at the root, English pages under `/en/`. Slugs are English (Latin) in both locales (`AGENTS.md` §3.1).

**Content source:** "תוכן לדף אתר NOVIDEA בעברית" (Novidea, 2026). Each section of that document is one page. No other source is used.

## Pages

| Page | Hebrew URL | Content file | Built from document section | Status |
|---|---|---|---|---|
| Home | `/` | `pages/he/home.yaml` | כותרת ראשית, מסרים נוספים, טקסט מקוצר | **Built** |
| The problem and the solution | `/solution` | `pages/he/solution.yaml` | הבעיה והפתרון | **Built** |
| Core capabilities | `/capabilities` | `pages/he/capabilities.yaml` | יכולות ליבה: מקצה לקצה | **Built** |
| Why Novidea | `/why-novidea` | `pages/he/why-novidea.yaml` | למה נובידאה? | **Built** |
| Headquarters in Israel | `/israel` | `pages/he/israel.yaml` | המטה כאן בישראל – יחד איתכם בכל שלב | **Built** |
| Contact (lead) | `/contact` | `pages/he/contact.yaml` | פתיחת ליד | **Built**, HubSpot form loads after marketing-cookie consent |
| Blog | `/blog` | | | Planned |
| Privacy policy | `/privacy` | `pages/he/privacy.yaml` | (drafted, not in the content document) | **Built**, draft: placeholders and legal review pending |
| Accessibility statement (הצהרת נגישות) | `/accessibility` | draft in `docs/drafts/accessibility.he.yaml` | (drafted, not in the content document) | **Removed** from the site on 20/11/2026 at the owner's request. **Required by law before launch** (regulation 35) |
| 404 | `/404` | | | Planned |

English versions (`/en/…`) are planned; there are no English pages yet.

## Navigation

**Header:** logo → `/` · הבעיה והפתרון → `/solution` · יכולות ליבה → `/capabilities` · למה נובידאה? → `/why-novidea` · המטה בישראל → `/israel` · button **השאירו פרטים** → `/contact`. The current page is marked with `aria-current="page"`.

**Footer:** עמוד הבית plus the same links, and a legal row: מדיניות פרטיות · הגדרות עוגיות (opens the cookie settings). The הצהרת נגישות link returns with the page.

**Lead banner:** every page except `/contact` ends with the "מוכנים להוביל את הסוכנות לעידן הבא?" banner linking to `/contact`.

## Language switcher

Hidden until English pages exist, so it never links to a 404.

## SEO per page

Every page has a unique `<title>` (≤ 60 characters) and meta description (≤ 155 characters), enforced by the content schema. Still to add once the domain is set: canonical URL, `hreflang` pairs, `sitemap.xml`, and Organization structured data on the home page.

**Production:** https://novidea-israel.vercel.app/ (Vercel, deployed from `wenintegrity/novidea-israel`, branch `main`). A custom domain isn't set yet; `astro.config.mjs` → `site` needs it.

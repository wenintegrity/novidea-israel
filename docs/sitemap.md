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
| 404 | any unknown URL | `src/pages/404.astro` | | **Built**, Hebrew, `noindex` |

English versions (`/en/…`) are planned; there are no English pages yet.

## Navigation

**Header:** logo → `/` · הבעיה והפתרון → `/solution` · יכולות ליבה → `/capabilities` · למה נובידאה? → `/why-novidea` · המטה בישראל → `/israel` · button **השאירו פרטים** → `/contact`. The current page is marked with `aria-current="page"`.

**Footer:** עמוד הבית plus the same links, and a legal row: מדיניות פרטיות · הגדרות עוגיות (opens the cookie settings). The הצהרת נגישות link returns with the page.

**Lead banner:** every page except `/contact` ends with the "מוכנים להוביל את הסוכנות לעידן הבא?" banner linking to `/contact`.

## Language switcher

Hidden until English pages exist, so it never links to a 404.

## SEO per page

Every page has a unique `<title>` (≤ 60 characters) and meta description (≤ 155 characters), enforced by the content schema; the wording follows docs/seo.md §4.1. Every page also has a canonical URL (no trailing slash), link-preview tags with a default share image, and structured data (Organization + WebSite on home, BreadcrumbList on internal pages). `robots.txt` and `sitemap.xml` are generated. `hreflang` pairs come with the English pages. Full plan: docs/seo.md.

**Production:** https://novidea-israel.vercel.app/ (Vercel, deployed from `wenintegrity/novidea-israel`, branch `main`). **This address is temporary and kept out of search engines** (`noindex`). All absolute URLs come from one setting: `SITE_URL` (falls back to the Vercel URL). At launch set `SITE_URL` and `ALLOW_INDEXING=true` (docs/seo.md §6).

# Sitemap

**Owner:** Structure agent (`structure-architect`) · **Status:** Draft v0.1 · **Last updated:** 19/11/2026

Hebrew pages are served at the root, English pages under `/en/`. Slugs are English (Latin) in both locales (`AGENTS.md` §3.1).

## Pages

| Page | Hebrew URL | English URL | Page type | Status |
|---|---|---|---|---|
| Home | `/` | `/en/` | `home` | **he built**, en planned |
| Platform | `/platform` | `/en/platform` | `content` | Planned |
| Customer view module | `/platform/customer-view` | `/en/platform/customer-view` | `content` | Planned |
| AI capabilities | `/platform/ai` | `/en/platform/ai` | `content` | Planned |
| Solutions: insurance agencies | `/solutions/agencies` | `/en/solutions/agencies` | `content` | Planned |
| Solutions: brokers | `/solutions/brokers` | `/en/solutions/brokers` | `content` | Planned |
| Solutions: insurers | `/solutions/insurers` | `/en/solutions/insurers` | `content` | Planned |
| About | `/about` | `/en/about` | `content` | Planned |
| News | `/news` | `/en/news` | `list` | Planned |
| News article | `/news/{slug}` | `/en/news/{slug}` (only if translated) | `article` | Planned. First item: `/news/customer-conference-2026` |
| Contact and demo request | `/contact` | `/en/contact` | `contact` | Planned |
| Privacy policy | `/privacy` | `/en/privacy` | `legal` | Planned, needs legal review |
| Accessibility statement (הצהרת נגישות) | `/accessibility` | `/en/accessibility` | `legal` | Planned, **required by law before launch** |
| 404 | `/404` | `/en/404` | `error` | Planned |

The audience and product pages come from the July 2026 press release, which names insurance agencies, brokers and insurers as customers and presents the customer view module and AI capabilities. Structure and Content should confirm the final list against novidea.com.

## Navigation

### While only the home page exists

The header links to sections of the home page, so there are no dead links:

| Label (he) | Label (en) | Target |
|---|---|---|
| הפלטפורמה | Platform | `#platform` |
| בינה מלאכותית | AI | `#ai` |
| למי זה מתאים | Who it's for | `#audiences` |
| חדשות | News | `#news` |
| CTA: לתיאום הדגמה | Book a demo | `#contact` |

### Once the planned pages exist

Header: Platform (Customer view, AI) · Solutions (Agencies, Brokers, Insurers) · About · News · CTA "לתיאום הדגמה" → `/contact`.

Footer: the same groups, plus Privacy policy, Accessibility statement and Cookie settings.

## Language switcher

Each page links to its counterpart from the table above. **The switcher is hidden on the Hebrew home page until `/en/` exists**, so it never links to a 404.

## SEO per page

Every page needs a unique `<title>` (≤ 60 characters) and meta description (≤ 155 characters) from Content, a self-referencing canonical URL, `hreflang="he-IL"`, `hreflang="en"` and `x-default` (pointing to the Hebrew page) once the pair exists, and Organization structured data on the home page.

**Open:** the production domain isn't decided. Canonical URLs, `hreflang` and `sitemap.xml` need it (`astro.config.mjs` → `site`).

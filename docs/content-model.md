# Content model

**Owner:** Structure agent (`structure-architect`) · **Status:** Draft v0.1 · **Last updated:** 19/11/2026

Content lives in `src/content/{he,en}/`. The schemas in `src/content.config.ts` enforce this model, so a missing required field fails the build.

**Verification rule:** any customer name, statistic, award, address or quote that hasn't been checked gets a `# TODO(verify): reason` YAML comment on the line above it. `grep -r "TODO(verify)" src/content` must return nothing before launch (`AGENTS.md` §3.5).

---

## Page type: `home`

File: `src/content/{locale}/home.yaml`. Sections render in the order below. Component specs are in `docs/design-system.md` §10.

| # | Section | Anchor | Surface | Component | Fields |
|---|---|---|---|---|---|
| 0 | SEO | n/a | n/a | `<head>` | `seo.title` (≤ 60 chars), `seo.description` (≤ 155 chars) |
| 1 | Hero | n/a | light, with yellow panel | Hero (§10.6) | `hero.titleStrong`, `hero.titleRest`, `hero.lead`, `hero.points[]` (0 to 4 strings, optional), `hero.primaryCta {label, href}`, `hero.secondaryCta {label, href}` (optional), `hero.picture {src, alt}` (optional) |
| 2 | Platform pillars | `#platform` | subtle | Feature item (§10.8) | `pillars.title`, `pillars.intro` (optional), `pillars.items[]` (exactly 3): `{icon, title, body}` |
| 3 | Results | n/a | light, with red panel | Results band (§10.18) | `results.title`, `results.items[]` (3 to 8 strings) |
| 4 | Product spotlight | `#customer-view` | subtle | Spotlight (§10.14) | `spotlight.eyebrow`, `spotlight.title`, `spotlight.body`, `spotlight.points[]` (2 to 5 strings), `spotlight.picture {src, alt}` (optional) |
| 5 | AI | `#ai` | navy | Feature item, on dark | `ai.badge` (optional status label), `ai.title`, `ai.body`, `ai.items[]` (2 to 4): `{icon, title, body}`, `ai.picture {src, alt}` (optional) |
| 6 | Customer story | `#customer-story` | tint | Customer story (§10.15) | `story.eyebrow`, `story.title`, `story.body`, `story.points[]` (2 to 4 strings), `story.quote {text, name, role}`, `story.href` (optional until the blog exists) |
| 7 | Audiences | `#audiences` | light | Audience tile (§10.7) | `audiences.title`, `audiences.items[]` (2 to 4): `{icon, title, body, href}` (`icon` optional) (`href` optional until the solution pages exist) |
| 8 | Customers | `#customers` | subtle | Stats + logo strip (§10.9, §10.10) | `customers.title`, `customers.stats[]` (2 to 4): `{value, label}` (`value` is rendered with `dir="ltr"`), `customers.logos[]` (0 to 24): `{name, src}` (`src` optional: a text name is shown until the logo file exists) |
| 9 | News | `#news` | light | News teaser (§10.16) | `news.title`, `news.items[]` (1 to 3, newest first): `{date (YYYY-MM-DD), title, summary, href}` (`href` optional until the blog exists) |
| 10 | Contact CTA | `#contact` | yellow | CTA band (§10.17) | `cta.title`, `cta.body`, `cta.button {label, href}` |

`icon` values are IDs from the brand icon library (`src/assets/icons/`, names in `icons.yaml`). An unknown ID fails the build.

`picture.src` is a path relative to the YAML file, pointing into `src/assets/images/` (for example `../../assets/images/hero-empower-your-people.png`). `picture.alt` is required; use `""` only for purely decorative pictures.

Dates are stored as ISO `YYYY-MM-DD` and formatted at render time with `Intl.DateTimeFormat` (`he-IL` gives DD.MM.YYYY by default, so Code formats it explicitly as DD/MM/YYYY per `AGENTS.md` §4.2).

---

## Site-wide fields: `src/i18n/ui.ts`

UI strings (not page content): skip link, menu button names, navigation labels, language switcher label, footer headings, legal link labels, "opens in new tab", copyright. Owned by Content (values) and Code (keys).

## Planned page types

`content`, `list`, `article`, `contact`, `legal`, `error`. Structure defines their fields before Content or Code starts on them.

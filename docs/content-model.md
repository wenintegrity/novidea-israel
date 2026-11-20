# Content model

**Owner:** Structure agent (`structure-architect`) · **Status:** v0.2 · **Last updated:** 19/11/2026

The schemas in `src/content.config.ts` enforce this model, so a missing or invalid field fails the build.

**Verification rule:** any claim, name or wording that hasn't been confirmed gets a `# TODO(verify): reason` YAML comment above it. `grep -r "TODO(verify)" src/content` must return nothing before launch (`AGENTS.md` §3.5).

---

## Pages: `src/content/pages/<locale>/<slug>.yaml`

`home.yaml` renders at the locale root (`/`). Every other file renders at `/<slug>` (`src/pages/[slug].astro`). Adding a page means adding a YAML file, then a menu entry in `src/config/nav.ts` if it belongs in the menu.

| Field | Required | Notes |
|---|---|---|
| `seo.title` | yes | ≤ 60 characters, unique per page |
| `seo.description` | yes | ≤ 155 characters |
| `hero` | home only | `titleStrong`, `titleRest`, `lead`, `primaryCta {label, href}`, `secondaryCta` (optional), `picture {src, alt}` (optional) |
| `header` | internal pages | `title` (the page's h1), `intro[]` (paragraphs), `picture {src, alt}` (optional) |
| `sections[]` | no | Blocks, rendered in order (below) |
| `leadCta` | no | Default `true`: show the shared lead banner at the bottom. `false` on `/contact` |

## Blocks

Every block has `type` and an optional `id` (becomes the section anchor). `surface` is `light`, `subtle`, `tint` or `navy` (design-system.md §3.3).

| `type` | Fields | Component |
|---|---|---|
| `text` | `title` (optional), `paragraphs[]`, `picture` **or** `video` (optional), `surface` (default light). `video`: `title` (accessible name), `file` (in `src/assets/videos/`; leave out for the "coming soon" placeholder), `captions` (.vtt), `poster` (image) | `TextBlock.astro` |
| `features` | `title`, `intro` (optional), `columns` 2 or 3, `surface`, `picture` (optional), `items[]`: `{icon, title, body, soon, soonNote}`. An item needs a title or a body. `soon: true` labels the whole item "בקרוב"; `soonNote` adds an upcoming extra to an available item | `FeaturesBlock.astro` |
| `names` | `title`, `names[]`: each a plain name, or `{name, logo}` where `logo` points into `src/assets/logos/customers/` and `name` becomes the alt text; `more` (e.g. "ועוד"), `surface` (default subtle) | `NamesBlock.astro` |
| `links` | `title` (optional), `items[]`: `{icon, title, body, href}`, `surface` | `LinksBlock.astro` |
| `leadForm` | `hubspot {portalId, formId, region}` (optional), `fields[]` (shown only without `hubspot`) | `LeadForm.astro` |
| `prose` | `sections[]`: `{title, paragraphs[], bullets[], after[]}`. Long-form text for legal pages. Inline links `[label](href)`; `[label](#cookie-settings)` opens the cookie settings; `[לעדכון: …]` is highlighted as a placeholder | `ProseBlock.astro` |

**Heading order:** a block's `title` is an `h2` and its items are `h3`. Without a block title, items become `h2`, so headings never skip a level.

**Icons:** `icon` values are IDs from the brand icon library (`src/assets/icons/`, names in `icons.yaml`). An unknown ID fails the build.

**Pictures:** `picture.src` is a path relative to the YAML file, pointing into `src/assets/images/` (e.g. `../../../assets/images/hero-empower-your-people.png`). `picture.alt` is required; use `""` only for purely decorative pictures.

**Mixed direction text:** wrap numbers with signs or units in Unicode LTR isolates inside the YAML string, written as escapes in a double-quoted string: `"\u2066360°\u2069"`, `"\u2066100+\u2069"`. Otherwise the sign moves to the wrong side in RTL.

---

## Shared content: `src/content/shared/<locale>.yaml`

| Field | Notes |
|---|---|
| `leadCta` | `title`, `body`, `button {label, href}`: the banner at the bottom of every page except `/contact` |
| `footerAbout` | One sentence under the footer logo |

## UI strings: `src/i18n/ui.ts`

Menu labels, skip link, menu button names, footer headings, "בקרוב" badge, form placeholder text. Owned by Content (values) and Code (keys).

# Design system: Novidea Israel

**Owner:** Design agent (`design`) · **Status:** Draft v0.1 · **Last updated:** 19/11/2026

**Source:** *Novidea Brand Guidelines*, July 2022 (PDF from Novidea marketing; not stored in this repo). Where this document departs from the brand book, it says so and gives the reason. The usual reason is accessibility, which is a legal requirement in Israel (IS 5568 / WCAG 2.1 AA, see `AGENTS.md` §4.3).

**Implemented in:** `src/styles/tokens.css` (tokens) and `src/styles/bootstrap-brand.css` (the brand layer over Bootstrap 5.3.9, which loads from a CDN; see `docs/decisions/0001-bootstrap-5-via-cdn.md` and §13). Components use tokens only. A raw hex value or pixel size in a component, or an inline `style` attribute, is a bug.

Section 12 lists open items that need input from Novidea marketing. Anything marked **(pending)** below depends on one of them.

---

## 1. Principles

1. **Same brand, local voice.** This is Novidea, not a sub-brand. Logo, palette, typefaces and visual language come from the brand book.
2. **Hebrew first.** Every layout is designed in RTL first and then checked in LTR. English is not the base that Hebrew gets flipped from.
3. **Accessible by default.** When a brand pairing fails WCAG 2.1 AA contrast, we change the pairing and keep the brand colors. We never ship the failing pairing.
4. **Tokens only.** Every color, size, space, radius, shadow, duration and breakpoint is a token.
5. **Light pages.** The brand's look comes from flat color, type and the slanted panel, not from heavy imagery or effects. That keeps us within the performance budget (LCP < 2.5s, CLS < 0.1).

---

## 2. Logo

### Variants

| Variant | Wordmark | Mark (stripes) | Use on |
|---|---|---|---|
| Color, light | Navy `#101338` | Yellow `#FDD011` | White, navy-50, yellow-50 |
| Color, dark | White | Yellow `#FDD011` | Navy |
| Black | Black | Black | Single-color print, light backgrounds where color isn't possible |
| White | White | White | Photos or colored backgrounds where the color version lacks contrast |

Don't place the color logo on yellow, sky or red backgrounds: the yellow mark disappears or clashes. Use the black version there.

**Implementation:** one source file, `src/assets/brand/novidea-logo.svg` (official, unedited). `src/components/Logo.astro` inlines it and picks the variant: `variant="light"` (default), `"dark"` (navy surfaces) or `"mono"` (yellow, sky, red surfaces). Only fills change. The mark's own yellow (`#fccf0f`, token `--color-logo-yellow`) is kept as delivered.

### Clear space and size

- **Clear space:** the brand book requires 15 mm of clear space around a logo with a minimum height of 25 mm. On screen we keep the same ratio: clear space on every side is **at least 60% of the logo's rendered height**. Nothing (text, borders, image edges) goes inside it.
- **Minimum height on screen:** 24 px (mobile header) and 32 px (desktop header). The brand book only sets a print minimum (25 mm), so these screen minimums are our proposal.

### RTL

The logo is **never mirrored** and never re-ordered. "Novidea" is a Latin wordmark and reads left to right on Hebrew pages too. Only its *position* follows the layout: it sits at the inline-start of the header, which is the right side in Hebrew and the left in English.

### Don't

Don't stretch, recolor, rotate, outline or add effects to the logo, and don't translate or transliterate the wordmark (never "נובידאה" in place of the logo).

---

## 3. Color

### 3.1 Brand palette (from the brand book)

| Token | Hex | Name | Pantone |
|---|---|---|---|
| `--color-navy` | `#101338` | Navy | 7463C |
| `--color-yellow` | `#FDD011` | Yellow | 108C |
| `--color-sky` | `#61C2EE` | Sky | 2985C |
| `--color-red` | `#ED4443` | Red | 199C |
| `--color-grey` | `#A7A9AC` | Grey | Cool Grey 4C |

> **Red discrepancy:** the brand book gives red as Hex `#ED4443` but RGB 234/68/67, which is `#EA4443`. We use the hex value. Marketing needs to confirm (§12).

### 3.2 Derived colors (added for accessibility and states)

None of these are in the brand book. Each one fills a gap the brand palette can't cover accessibly.

| Token | Hex | Purpose |
|---|---|---|
| `--color-white` | `#FFFFFF` | Page background, text on navy |
| `--color-navy-800` | `#1B1F4A` | Hover for navy buttons |
| `--color-navy-200` | `#D5D7E3` | Decorative borders and dividers on light surfaces (not for form fields) |
| `--color-navy-50` | `#F4F5F9` | Subtle section background |
| `--color-navy-muted` | `#C3C4CD` | Secondary text on navy |
| `--color-yellow-600` | `#E6BC00` | Hover for yellow buttons |
| `--color-yellow-50` | `#FFF8D6` | Tinted section background |
| `--color-sky-600` | `#3FAFE3` | Hover for sky buttons |
| `--color-red-700` | `#C22E2D` | Error text and error borders on light surfaces |
| `--color-grey-700` | `#5E6066` | Secondary text and form-field borders on light surfaces |
| `--color-grey-100` | `#ECEDEE` | Disabled backgrounds, decorative dividers |

### 3.3 Surfaces

A section picks one surface. The surface decides every text, link and focus color inside it. Ratios are WCAG 2.1 contrast ratios, computed for this document.

| Surface | Background | Body text | Secondary text | Links | Focus ring |
|---|---|---|---|---|---|
| `light` | white | navy **17.91** | grey-700 **6.29** | navy, underlined | navy |
| `subtle` | navy-50 | navy **16.44** | grey-700 **5.77** | navy, underlined | navy |
| `tint` | yellow-50 | navy **16.76** | navy only | navy, underlined | navy |
| `navy` | navy | white **17.91** | navy-muted **10.32** | yellow **12.12**, underlined | yellow **12.12** |
| `yellow` | yellow | navy **12.12** | navy only | navy, underlined | navy |
| `sky` | sky | navy **8.92** | navy only | navy, underlined | navy |
| `red` | red | navy **4.70** | navy only | navy, underlined | navy |

The `red` surface passes AA for normal text only just (4.70 against a 4.5 minimum). Keep text on red short (stat labels, tile titles) and at least `--text-sm` and weight 500.

### 3.4 Forbidden pairings

These appear in the brand book or would be tempting, and **fail WCAG AA**:

| Pairing | Ratio | Use instead |
|---|---|---|
| White text on yellow | 1.48 | Navy on yellow |
| White text on sky (e.g. the brand's "Get A Demo" button) | 2.01 | Navy on sky (8.92) |
| White text on red (e.g. the brand's stat band captions, "Request A Demo" button) | 3.81 | Navy on red (4.70) |
| Grey `#A7A9AC` text on white | 2.36 | grey-700 (6.29) |
| Sky, red or yellow **text** on white | 2.01 / 3.81 / 1.48 | Navy text; red-700 (5.64) for errors only |
| grey-700 text on yellow or sky | 4.25 / 3.13 | Navy |
| Brand grey as a form-field border (needs 3:1) | 2.36 | grey-700 |

### 3.5 Other color rules

- **No dark mode** in v1. Navy sections give the site its dark moments.
- **No new hues.** There is no brand green, so success messages use navy text plus a check icon.
- Never use color as the only signal. Errors get an icon and text, and links get an underline.

---

## 4. Typography

### 4.1 Families

The brand typefaces have no Hebrew glyphs, so Hebrew pages need a Hebrew family.

| Role | English pages (`lang="en"`) | Hebrew pages (`lang="he"`) |
|---|---|---|
| Headings | **Campton** (brand headline face) **(pending licence)**, falling back to Poppins 700 | **Rubik** |
| Body and UI | **Poppins** (brand text face) | **Rubik** |
| Not used on web | Century Gothic (the brand book reserves it for PowerPoint) | |

**Why Rubik for Hebrew:** it's geometric like Campton and Poppins, its slightly rounded corners echo the rounded ends of the logo stripes, it ships Hebrew and Latin in one variable font (weights 300 to 900), and it's open source (OFL), so we can self-host it. Heebo is the fallback choice if marketing wants a less rounded look. Marketing needs to approve this choice (§12).

**Latin inside Hebrew pages:** on Hebrew pages, product names like Novidea and Salesforce render in Rubik's Latin glyphs, not Poppins. That keeps x-height and weight consistent within a line. This happens automatically because Rubik comes first in the Hebrew stack.

```css
--font-body-en:    "Poppins", system-ui, sans-serif;
--font-heading-en: "Campton", "Poppins", system-ui, sans-serif;
--font-body-he:    "Rubik", system-ui, sans-serif;
--font-heading-he: "Rubik", system-ui, sans-serif;
```

The Code agent maps `--font-body` and `--font-heading` to the right pair from the page's `lang`, never per component.

**Loading:** self-hosted WOFF2 only, `font-display: swap`. Preload only the body font of the current locale. Load Poppins at 400, 500 and 700 (Latin subset), Rubik as a variable font (Hebrew and Latin subsets), and Campton Bold only once licensed.

### 4.2 Type scale

Hebrew glyphs look smaller than Latin at the same size, so Hebrew body sizes are about one step larger and line-heights looser. Headings use fluid sizes (`clamp`) between 375 px and 1440 px.

| Token | English: size / line-height | Hebrew: size / line-height | Weight | Use |
|---|---|---|---|---|
| `--text-display` | 36 → 56 px / 1.1 | 36 → 56 px / 1.2 | 700 | Hero headline only |
| `--text-h1` | 32 → 48 px / 1.15 | 32 → 48 px / 1.25 | 700 | Page title |
| `--text-h2` | 26 → 36 px / 1.2 | 26 → 36 px / 1.3 | 700 | Section title |
| `--text-h3` | 20 → 24 px / 1.3 | 20 → 24 px / 1.4 | 700 (en), 600 (he) | Card and feature titles |
| `--text-h4` | 18 px / 1.4 | 18 px / 1.5 | 600 | Small headings, footer column titles |
| `--text-body-lg` | 18 px / 1.6 | 19 px / 1.7 | 400 | Lead paragraphs |
| `--text-body` | 16 px / 1.6 | 17 px / 1.7 | 400 | Body text |
| `--text-sm` | 14 px / 1.5 | 15 px / 1.6 | 400–500 | Captions, labels, footer |
| `--text-xs` | 12 px / 1.5 | 13 px / 1.6 | 500 | Legal fine print only |

Use sizes in `rem` so text scales with the reader's browser settings. Text must stay readable at 200% zoom with no loss of content (WCAG 1.4.4).

### 4.3 Headline style

The brand's signature headline pairs a **bold** phrase with a **regular** phrase, set in capitals in English (for example **EMPOWER YOUR PEOPLE** with the intelligent insurance distribution platform).

- **English:** write copy in sentence case and apply capitals with CSS (`text-transform: uppercase`), so screen readers don't spell words out. Use capitals only for `display`, `h1` and `h2`, and only for headlines of 8 words or fewer. `h3` and below stay in sentence case. Letter-spacing for capitals is `0.01em`.
- **Hebrew has no capitals.** Get the same contrast from weight alone: Rubik 700 for the first phrase and 400 for the rest. Never add letter-spacing to Hebrew, since it breaks the letterforms.
- Mark the bold phrase with `<strong>` in content. Its style comes from the heading component, not from inline styles.

---

## 5. Space, layout and breakpoints

### 5.1 Spacing scale (4 px base)

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `--space-1` | 4 px | | `--space-8` | 32 px |
| `--space-2` | 8 px | | `--space-10` | 40 px |
| `--space-3` | 12 px | | `--space-12` | 48 px |
| `--space-4` | 16 px | | `--space-16` | 64 px |
| `--space-5` | 20 px | | `--space-24` | 96 px |
| `--space-6` | 24 px | | `--space-32` | 128 px |

**Section padding (block direction):** 48 px on mobile, 64 px on tablet, 96 px on desktop (`--section-pad`).

### 5.2 Breakpoints

Mobile-first, using **Bootstrap 5.3's breakpoints and grid unchanged** (the CDN build can't be reconfigured). The design widths match the visual-regression viewports in `AGENTS.md` §3.4.

| Bootstrap tier | Min width | Container max width | Design width | Notes |
|---|---|---|---|---|
| xs | 0 | 100% | **375 px** (mobile) | Single column |
| sm | 576 px | 540 px | | |
| md | 768 px | 720 px | **768 px** (tablet) | Slant appears, section padding grows |
| lg | 992 px | 960 px | | Header switches from menu button to inline nav |
| xl | 1200 px | 1140 px | | |
| xxl | 1400 px | 1320 px | **1440 px** (desktop) | |

- 12 columns at every tier, gutter 1.5 rem (Bootstrap `$grid-gutter-width`), container padding 0.75 rem per side.
- **Row gutters must not exceed the container padding horizontally.** `g-5` overflows by 12 px on mobile, so use `gx-4 gy-5` or smaller.
- Long-form text max width: `--measure: 68ch`.
- **Reflow:** every page must work at **320 px** wide with no horizontal scroll (WCAG 1.4.10), even though we design at 375 px.

### 5.3 Logical properties

All spacing and positioning in our CSS uses logical properties: `margin-inline-start`, `padding-block`, `inset-inline-end`, `text-align: start`. In markup, use Bootstrap's start/end utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-0`, `end-0`, `text-start`, `text-end`, `float-end`). Hebrew pages load Bootstrap's RTL build, which flips them. The only physical-property exceptions are listed in §8.3, and each one needs a code comment.

---

## 6. Shape, depth and motion

| Token | Value | Use |
|---|---|---|
| `--radius-none` | 0 | Panels, tiles, images, section blocks (the brand is square-cornered) |
| `--radius-sm` | 2 px | Buttons, form fields |
| `--radius-full` | 9999 px | Avatars, pills, icon buttons |
| `--border-thin` | 1 px | Form fields, outline buttons, dividers |
| `--shadow-sm` | `0 1px 2px rgb(16 19 56 / 0.08)` | Sticky header after scrolling |
| `--shadow-md` | `0 8px 24px rgb(16 19 56 / 0.12)` | Hover lift on cards and tiles, dropdowns |
| `--duration-fast` | 120 ms | Color and underline changes |
| `--duration-base` | 200 ms | Menus, hover lift |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | All transitions |
| `--z-header` | 100 | Sticky header |
| `--z-overlay` | 200 | Mobile menu, dropdowns |
| `--z-skip-link` | 300 | Skip link |

- Shadows have **no horizontal offset**, so they look the same in RTL and LTR.
- Under `prefers-reduced-motion: reduce`, drop transforms and movement and keep only instant color changes. No parallax, autoplaying carousels or auto-advancing sliders anywhere.

### 6.1 Scroll and entrance animation

Built on [Motion](https://motion.dev) (`motion` npm package, MIT; about 4 KB compressed), via `src/scripts/animate-on-scroll.ts`. Add attributes in markup; no per-component JavaScript.

| Attribute | Effect |
|---|---|
| `data-animate="fade-up"` | Fades in while rising 24 px (default) |
| `data-animate="fade-in"` | Fades in only |
| `data-animate="zoom-in"` | Fades in from 96% scale. Use for pictures |
| `data-animate="fade-start"` / `"fade-end"` | Fades in from the inline-start or inline-end side. **Follows the reading direction**: in Hebrew, `fade-start` enters from the right |
| `data-animate-children="<type>"` | Animates each child in turn, 0.08 s apart. Use on lists and grids |
| `data-animate-delay="0.1"` | Extra delay in seconds |

Rules:
- **Content is never hidden by CSS.** The script hides only elements still below the fold when it runs, then reveals them once. Without JavaScript, everything is visible.
- **Reduced motion:** with "reduce motion" turned on, the script does nothing and CSS animations end instantly.
- **Duration** 0.6 s, easing `--ease-out`. Entrances only; no exit animations, parallax, looping or autoplay.
- **Hero:** CSS-only entrance on load (the panel's content rises in, staggered). The hero picture doesn't animate, because it's the LCP element.
- **Hover:** buttons lift 2 px; feature icons grow 8%; audience tiles lift 4 px **only when they're links**, since a lift on a static tile suggests it's clickable.
- **Printing** shows all content regardless of animation state.
- **Tests** run with reduced motion by default (`playwright.config.ts`); `tests/e2e/animations.spec.ts` checks the animated path.

---

## 7. Visual language

### 7.1 Slanted panel

The brand's main graphic device is a flat color panel (usually yellow) with **one slanted edge** that overlaps a photo. See the "Empower your people" hero and the "Insurance management platform" banner in the brand book.

- **Slant:** the panel's edge facing the photo leans about 10°, wider at the top. Token: `--slant: 3rem` (desktop), `2rem` (tablet). No slant on mobile, where the panel stacks under the photo with straight edges.
- **Direction:** the slant is always on the panel's **inline-start edge**, so the shape mirrors with the layout: on the left of the panel in English and on the right in Hebrew.
- **Implementation:** `clip-path: polygon()` has no logical form, so it needs a `:dir(rtl)` variant (an allowed exception, see §8.3).
- Colors: yellow panel with navy text by default. A sky or red panel is allowed for secondary banners, also with navy text.

### 7.2 Stripe motif

The five rounded diagonal bars from the logo mark appear as a large decorative overlay on photos (yellow, about 70% opacity) and as a faint watermark on yellow-50 backgrounds (as on the brand letterhead).

- It's decoration: `aria-hidden="true"` and no alt text.
- **Never mirror the stripe angle.** It comes from the logo. It can move to the other side of an image in RTL, but the bars always lean the same way.
- Never put text over the stripes.

### 7.3 Color tiles

Audience and solution blocks use flat tiles in sky, red, navy and yellow, each with a line icon, a capitalized title (English) and a link. See the Audience tile spec (§10.7) for text colors.

### 7.4 Icons

**Brand icons** are line illustrations with an offset yellow shape: a chart, a lightbulb, a cloud with a shield, gears, and so on. Use them for features, audiences and benefits. **The library (62 icons) lives in `src/assets/icons/`**, rendered by `src/components/BrandIcon.astro`.

- **Two versions per icon:** `<id>.png` has navy lines, for white, light-grey, yellow, sky and red surfaces. `<id>.on-dark.png` has white lines, for navy. `BrandIcon` takes `variant="light"` or `"dark"`, so pick it from the surface.
- **Names and flags:** `src/assets/icons/icons.yaml` holds the Hebrew and English names, a category, and `directional: true` for icons that point in the reading direction (`speed-horse`, `fast-track`). Those are mirrored on Hebrew pages.
- **Adding icons:** drop both PNGs in the folder, then run `npm run icons`. It removes white backgrounds, trims the empty margin and centres the artwork on a 350 px square at **88% fill**, so every icon looks the same size whatever margin its source file had. It also reports a missing twin or missing names. Restart the dev server to pick them up.
- **Sizes:** 32, 48 or 64 px (`size="md"`, `"lg"`, `"xl"`). Feature items and audience tiles use 64 px.
- Icons sit next to text that says the same thing, so they're decorative (`alt=""`).

**UI icons** (chevrons, menu, close, external link, check, error, social) use a single line set that matches the brand's stroke weight. Lucide (MIT licence) at stroke width 1.75, inlined as SVG, is the default. Decorative icons get `aria-hidden="true"`. Icon-only buttons get an accessible name from `src/i18n/`.

### 7.5 Photography

The brand book shows lifestyle photography: real people at work in bright, modern offices with natural light, often with the stripe overlay.

- **Originals** from marketing live in `src/assets/brand/` and are never edited. **Web-ready crops** (transparent margins trimmed) live in `src/assets/images/`, and pages reference those. Astro turns them into responsive WebP at build time.
- Content sets pictures in the page YAML as `picture: { src, alt }`. The build fails if a path is wrong.
- Prefer photos that look local: Israeli offices, teams and cities. Use only licensed images.
- **Don't put stock people next to a named customer** (for example the Colmobil story). Readers would take them for that customer's staff.
- Aspect ratios: hero keeps its own (brand key visual), cards 4:3, people 1:1. Every image sets `width` and `height` to avoid layout shift.
- Content writes alt text in the page's language. Decorative images get `alt=""`.
- Don't mirror photos for RTL, since that reverses any text in them.

---

### 7.6 Title accent

A short yellow bar (56 × 5 px, `--space-4` below the text) under section titles in text and feature blocks (`.title-accent`). Decorative, so contrast rules don't apply. Not used on the home hero or internal page headers, which have the slanted yellow panel.

## 8. RTL and bidirectional text

### 8.1 What mirrors

| Mirrors in RTL | Doesn't mirror |
|---|---|
| Layout order (logo at the inline-start, nav, columns, grids) | The logo and the stripe motif |
| Arrows, "next" and "back" chevrons, "read more" arrows | Charts, graphs and trend arrows inside illustrations |
| Breadcrumb separators | Media controls (play, pause, forward) |
| Slanted panel edge | Phone numbers, emails, URLs, numbers |
| Brand icons that show direction (e.g. the "process arrows" icon) | Clocks, checkmarks, social icons |
| Progress indicators and steppers | Photos |

Mirror directional icons with CSS: `:dir(rtl) .icon--directional { transform: scaleX(-1); }`. Add the `icon--directional` class only to icons in the left column above.

### 8.2 Mixed Hebrew and English

- The `dir` attribute on `<html>` sets paragraph direction. **Don't** use `dir="auto"` on Hebrew copy: a Hebrew sentence that starts with "Novidea" would be laid out as English.
- Wrap inserted or variable values (names, user input, CMS fields) in `<bdi>`.
- **Numbers with signs or units** reorder in RTL: "+40%" displays as "40%+". Wrap them in `<span dir="ltr">`. This applies to stats, prices, version numbers and ranges.
- Phone numbers: `<a href="tel:+972..." dir="ltr">`. Display them as `0X-XXXXXXX` on Hebrew pages and `+972 X-XXX-XXXX` on English pages.
- Check punctuation at the end of mixed strings, for example a sentence ending with "Salesforce." or a list item ending with an English term. Every such string must be checked visually.

### 8.3 Allowed physical-property exceptions

Each one needs a code comment pointing to this section.

1. The slanted panel's `clip-path` polygon (§7.1), with a `:dir(rtl)` variant.
2. `transform: scaleX(-1)` for directional icons (§8.1).
3. Email, phone and URL inputs on Hebrew pages: `dir="ltr"` on the input (§10.11).

---

## 9. Accessibility rules for every component

- **Contrast:** text 4.5:1, large text (24 px, or 18.66 px bold) 3:1, UI boundaries and focus indicators 3:1. Use the surface table (§3.3).
- **Focus:** every interactive element shows `outline: 2px solid var(--focus-ring); outline-offset: 2px` on `:focus-visible`. `--focus-ring` comes from the surface: navy on light, yellow, sky and red surfaces, yellow on navy. Never remove an outline without a replacement.
- **Focus not hidden:** set `scroll-padding-top` to the sticky header's height so focused elements aren't hidden behind it.
- **Target size:** at least 44 × 44 px for buttons, links in menus and icon buttons. Inline text links are exempt.
- **Names:** every control has an accessible name in the current language, from `src/i18n/`.
- **States** each component spec must cover: default, hover, focus-visible, active, disabled (where relevant), and RTL and LTR at 375, 768 and 1440 px.
- No accessibility overlay widgets (`AGENTS.md` §4.3).

---

## 10. Component specs

This set is **provisional**. `docs/sitemap.md` and `docs/content-model.md` don't exist yet. Once the Structure agent writes them, Design will add specs for every component the sitemap uses (e.g. cards, resource lists, team grid, careers list).

### 10.1 Skip link

- First focusable element on every page. Hidden until focused, then shown at the inline-start top corner, above the header (`--z-skip-link`).
- Navy background, white `--text-sm` 500 text, `--space-3` padding, yellow focus ring.
- Label from i18n ("דילוג לתוכן הראשי" / "Skip to main content"). Targets `<main id="main">`.

### 10.2 Header

**Anatomy:** logo (inline-start) · primary nav · language switcher · CTA button (inline-end).

Implemented as a Bootstrap `.navbar.navbar-expand-lg` with a responsive `.offcanvas-lg` panel (`offcanvas-end`, so it opens from the inline-end side).

| | Mobile and tablet (< 992 px) | Desktop (≥ 992 px) |
|---|---|---|
| Height | 64 px | 72 px |
| Logo | 24 px high | 32 px high |
| Nav | Behind the menu button | Inline, `--text-sm` 500, items padded `--space-4` with `--space-1` between them. Shifted down `--header-nav-nudge` (8 px) so the text lines up with the logo wordmark, not the logo box |
| CTA | Inside the menu panel | Accent button, small size |

- Surface: `light`. Sticky (`--z-header`). Gets `--shadow-sm` after scrolling.
- **Desktop states:** hover = navy-50 background and a 3 px sky bar at the bottom; current page (`aria-current="page"`) = yellow-50 background, a 3 px yellow bar and weight 700.
- **Menu panel states (navy):** hover = navy-800 background; current page = yellow text, navy-800 background and a 4 px yellow bar at the inline-start.
- **Dropdowns:** a disclosure button with `aria-expanded`. The chevron points down and doesn't mirror. Panel: white, `--shadow-md`, opens below the item and aligns to its inline-start. Opens on click and on Enter or Space, and closes on Esc or when focus leaves it. Don't open on hover only.
- **Mobile menu:** the menu button sits at the inline-end, with a 44 px target, `aria-expanded` and `aria-controls`, and its name from i18n. The panel covers the screen on the `navy` surface, with white nav items at `--text-h4` size, the language switcher and the CTA (primary-on-dark) at the bottom. It traps focus while open, Esc closes it, and focus returns to the menu button.
- **RTL:** the logo is on the right and the CTA on the left. Nothing inside the header mirrors except the order.

### 10.3 Language switcher

- One link to the counterpart page (from the Structure agent's hreflang map), not a dropdown. Its label is the target language written in that language: **English** on Hebrew pages and **עברית** on English pages.
- The link has `lang="en"` or `lang="he"` and `hreflang`. No flags.
- `--text-sm` 500, navy, underline on hover, 44 px target. On the `navy` mobile menu panel it's white.
- If a page has no counterpart ("he only"), the link goes to the other locale's home page. Structure confirms this behavior.

### 10.4 Button

| Variant | Background | Text | Border | Hover | Use |
|---|---|---|---|---|---|
| `primary` | navy | white (17.91) | none | navy-800 | Main action on light, yellow, sky and red surfaces |
| `primary-on-dark` | yellow | navy (12.12) | none | yellow-600 (9.86) | Main action on navy |
| `accent` | sky | navy (8.92) | none | sky-600 (7.21) | Header CTA ("demo"), secondary emphasis on light |
| `outline` | transparent | navy | 1 px navy | navy background, white text | Secondary action on light, yellow, sky and red |
| `outline-on-dark` | transparent | white | 1 px white | white background, navy text | Secondary action on navy |

- **Sizes:** default is 48 px tall with `--space-6` inline padding and `--text-body` 500. Small is 40 px tall (44 px tap target kept with padding around it) with `--space-4` and `--text-sm` 500.
- **Shape:** `--radius-sm`. Labels in sentence case in both languages, no capitals. Hebrew labels use infinitives or neutral forms ("לתיאום הדגמה"), per the glossary.
- **Optional trailing arrow:** `--icon-sm`, at the inline-end, with `icon--directional`. It mirrors in RTL.
- **States:** hover changes color (`--duration-fast`). Active has no movement. Focus-visible gets the surface ring. Disabled has a grey-100 background, grey-700 text, `cursor: not-allowed` and `aria-disabled="true"` (prefer an explanation over a disabled submit button).
- **Brand departure:** the brand book shows white text on sky and red buttons. Both fail contrast (§3.4), so we don't use them.
- Full width on mobile when it's the only action in a block.

### 10.5 Text link

- On light surfaces: navy, underlined (1 px, `text-underline-offset: 0.2em`). Hover: 2 px underline. On navy: yellow, same treatment.
- External links get an external-link icon (not mirrored) and visually hidden text from i18n ("נפתח בחלון חדש" / "opens in a new tab") if they open a new tab.

### 10.6 Hero

**Anatomy:** photo with stripe overlay · slanted yellow panel · display headline (bold and regular phrases) · lead paragraph (`--text-body-lg`) · one or two buttons · optional navy band behind the bottom of the hero (as in the brand web mockup).

| | Mobile and tablet (< 992 px) | Desktop (≥ 992 px) |
|---|---|---|
| Layout | Photo (16:9, full width), then the panel below it, full width, no slant | Photo on 7 of 12 columns at the inline-start, panel on 6 columns at the inline-end, overlapping by 1 column |
| Slant | None | `--slant` (3 rem) |
| Panel padding | `--space-6` (mobile), `--space-12` (tablet) | `--space-12`, plus the slant on the inline-start side |

- Optional checklist (`hero.points`) below the lead: navy check in a circle, navy text.

- Panel: `yellow` surface, navy text, `primary` button and an optional `outline` button.
- **RTL:** photo on the right, panel on the left, and the slant on the panel's right edge. The stripe overlay keeps its angle.
- The photo is the likely LCP element: load it eagerly with `fetchpriority="high"` and explicit dimensions.
- Only one `display` headline per page. It's the page's `<h1>`.

### 10.7 Audience tile

The colored tiles from the brand book (retail agencies, MGAs/MGUs, and so on). Exact audiences come from the sitemap.

**Anatomy:** brand icon (64 px, inline-start) · title (`--text-h3`, capitals in English) · optional short description · link.

| Tile | Surface | Text | Focus ring |
|---|---|---|---|
| 1 | `sky` | navy | navy |
| 2 | `red` | navy | navy |
| 3 | `navy` | white | yellow |
| 4 | `yellow` | navy | navy |

- The whole tile is one link: the title is the link, and a stretched `::after` covers the tile. **One link per tile.** The brand book's separate "Learn more" button would create a second, duplicate link, so it's shown as a visual-only arrow (`aria-hidden`, `icon--directional`) instead.
- Grid: 1 column on mobile, 2 on tablet, 4 on desktop, `--space-4` gap. Equal heights. `--radius-none`.
- Hover: `--shadow-md` and the arrow moves `--space-1` toward the inline-end (no movement under reduced motion). Focus: ring around the whole tile (`:focus-within`).
- Color order follows the reading direction automatically, so it starts on the right in Hebrew.

### 10.8 Feature item

**Anatomy:** a card holding brand icon (64 px) · title (`--text-h4`) · body (`--text-body`, grey-700).

- Grid: 1 column on mobile, 2 on tablet, 2 or 3 on desktop, `--space-6` gap. Icon above the text, aligned to the inline-start. Cards are equal height, `--space-6` padding.
- **Row colors:** rows of cards alternate between two backgrounds so long lists are easy to scan. The pair depends on the section surface: `light` → navy-50 / yellow-50; `subtle` → white / yellow-50; `tint` → white / navy-50; `navy` → navy-800 / 10% white. The striping follows the visible rows at every breakpoint (every card on mobile, every 2 on tablet, every 2 or 3 on desktop). Grey-700 body text stays above 4.5:1 on all of them (yellow-50: 5.9:1).
- Not interactive unless it has a link, which then follows the Text link spec.

### 10.9 Stats

Key figures, shown above the customer logos (home page "Customers" section).

**Anatomy:** a `<dl>` of 2 to 4 stats. Each stat has a number (`--text-h1` 700, heading font) shown above its label (`--text-sm` 500, secondary text). The label comes first in the DOM, as `<dl>` requires, and is moved visually with `flex-direction: column-reverse`.

- Surface: `subtle`. A 4 px yellow border on each stat's inline-start edge (decorative).
- Grid: 2 columns on mobile and tablet, 4 on desktop.
- Each number is wrapped in `<span dir="ltr">` so "10+" doesn't become "+10" (§8.2).
- **Every figure needs a source** (`AGENTS.md` §3.5). The brand book's 2022 figures (+40% cross-sell, 5M insured, 22M+ policies, 20 countries) are not used.

### 10.10 Logo strip

- Customer or partner logos in a row on the `light` or `subtle` surface, with a `--text-h4` title above.
- Logos are full-color or all grey-700 (pick one per strip), never mirrored. Each has alt text with the company name.
- **Built as** `NamesBlock.astro`: white cards (navy-200 border, at least 112 px high), logo up to 72 px high and the card's width, so wide and square logos look about the same size. 4 per row from md, 2 on mobile; a dashed "ועוד" card ends the row. A customer without a logo file shows its name as text.
- Logo files live in `src/assets/logos/customers/`, trimmed to the artwork, on white. Prefer SVG or a PNG at least 2× the display size.
- No auto-scrolling carousel.
- Every logo needs written permission from the company, or an existing public reference on novidea.com (Content verifies).

### 10.11 Form field and contact/demo form

**Anatomy:** label · optional hint · input · error message.

- **Label always visible above the field.** The brand book shows a placeholder-only email field ("your email here"), which fails accessibility. We don't use it.
- Label: `--text-sm` 500 navy. Hint: `--text-sm` grey-700.
- Input: 48 px tall, `--space-4` inline padding, white background, `--border-thin` grey-700 (3:1 or better), `--radius-sm`, `--text-body`.
- **States:** hover changes the border to navy. Focus-visible gets a 2 px navy ring. Error gets a red-700 border plus an error icon and message in red-700 below the field, linked with `aria-describedby` and `aria-invalid="true"`. Disabled has a grey-100 background.
- **Required fields:** show the word "(חובה)" / "(required)" in the label, not only an asterisk.
- **Email, phone and URL on Hebrew pages:** the input gets `dir="ltr"` so typing and punctuation behave, and `text-align: end` so the value lines up with the right-aligned labels. Labels and errors stay RTL.
- **Consent checkbox:** 24 px box, unchecked by default (Israeli anti-spam law, Communications Law §30A), label linked to the privacy policy.
- **Error summary:** after a failed submit, a summary at the top of the form lists the errors as links to each field and receives focus.
- **Success:** a message on the `subtle` surface with a check icon and navy text, which receives focus.
- **Layout:** one column on mobile, two on desktop for short fields (name, phone). The submit button is `primary`.
- Collect only the fields the privacy policy allows (`AGENTS.md` §4.4). Structure and Content define the fields.

### 10.12 Breadcrumbs

- `<nav>` with an aria-label from i18n, an ordered list, and `aria-current="page"` on the last item, which isn't a link.
- `--text-sm`. Links navy and underlined, current item grey-700.
- Separator: a chevron icon with `icon--directional`, `aria-hidden`, pointing toward the inline-end. It points left in Hebrew.
- On mobile, show only the parent link with a back chevron (it mirrors).

### 10.13 Footer

**Anatomy:** white logo · short tagline · nav columns · contact block · social links · legal row.

- Surface: `navy`. Text white, secondary text navy-muted, links white with underline on hover, yellow focus ring.
- Columns: 1 on mobile (column titles can be disclosure buttons), 2 on tablet, 4 on desktop. Column titles use `--text-h4`.
- **Contact block:** office address, email and phone (`dir="ltr"`). Content verifies the details before launch.
- **Legal row (required):** privacy policy, **accessibility statement (הצהרת נגישות)**, cookie settings (reopens the consent dialog), copyright. `--text-xs`, navy-muted. The accessibility statement link is **temporarily removed** (20/11/2026, owner's request; draft in `docs/drafts/`). It must be back before launch.
- Nav links in 2 columns from sm up. Link hover: yellow.
- Social icons: 24 px icons in 44 px targets, not mirrored, each with an accessible name ("Novidea ב-LinkedIn").

### 10.14 Product spotlight

**Anatomy:** eyebrow · `h2` · lead · checklist (yellow circle, navy check) · product image.

- Surface: `subtle`. Text on 5 columns at the inline-start, image on 6 columns at the inline-end (offset 1) from lg up. Stacked below lg, text first.
- Image: a product screenshot in a light frame with `--shadow-md`. Until marketing supplies one, a decorative CSS mock screen (`aria-hidden`) holds the space.

### 10.15 Customer story

**Anatomy:** eyebrow ("סיפור לקוח") · `h2` (a link once the full story exists) · summary · checklist of outcomes · customer quote (`<figure>`, `<blockquote>`, `<figcaption>` with name and role).

- Surface: `tint`. Summary on 6 columns at the inline-start, quote on 5 columns at the inline-end (offset 1) from lg up. Stacked below lg.
- Quote: `--text-h3` size, weight 500, with a 4 px yellow border on its inline-start edge. Quotation marks come from CSS `quotes`: straight `"…"` in Hebrew, curly “…” in English.
- The quote is verbatim from an approved source. Never edit a customer's words.

### 10.16 News teaser

**Anatomy:** `h2` · 1 to 3 cards, newest first. Each card has a date (`<time datetime>`, shown as DD/MM/YYYY inside `dir="ltr"`), an `h3` title (a link once the blog exists) and a summary.

- Surface: `light`. Cards have a thin navy-200 border and a 4 px sky top border.
- Grid: 1 column on mobile, 2 on tablet, 3 on desktop.

### 10.17 CTA band

**Anatomy:** `h2` · one sentence · one `primary` button.

- Surface: `yellow`. Text and button side by side from lg up (button at the inline-end), stacked below. The button is full width below 576 px.

### 10.18 Results band

The red panel from Novidea's 2023 and 2025 ads: a title and a checklist of the areas where customers grew.

- A `red` panel inside a `light` section. **All text is navy** (4.70:1). The ads' white checks sit inside navy circles, which keeps them visible.
- Slanted inline-end edge (`--slant`) from md up, mirrored in RTL (§8.3). No slant on mobile.
- Grid: 1 column on mobile, 2 from sm, 3 from lg. Items are weight 600.

### 10.19 Page header (internal pages)

A smaller version of the home hero (§10.6), so internal pages share its look.

**Anatomy:** media · slanted yellow panel (`surface-yellow`) with the `h1` (`--text-h1`, not display size) and intro paragraphs (`--text-body-lg`). No eyebrow and no title accent: the panel is the accent, and the menu shows which page you're on.

- **Desktop (≥ lg):** media on 7 columns at the inline-start, panel on 6 columns at the inline-end, overlapping by one column, vertically centred on the media. The panel's inline-start edge is slanted (§7.1), with its own RTL polygon (§8.3).
- **Below lg:** media on top, the panel below it, full width, no slant.
- **Media:** the page picture, loaded eagerly with high priority (it's the LCP element). Without a picture (`/contact`, `/privacy`), a navy block with the stripe motif (§7.2), at least 16 rem high; it's decorative, so it's hidden below lg.
- Load entrance like the hero: the panel's text rises in, staggered.
- **Height:** next to a picture, the panel is at least 25 rem high on desktop (12 rem below lg), text centred vertically, so a page with a one-line title (/capabilities, /why-novidea) matches the others. Without a picture it fits its content.
- **Red line:** a 4 px brand-red border along the panel's bottom edge (decorative; on desktop it ends at the slant). Red is still pending confirmation (§3.1).

### 10.20 Page link cards

**Anatomy:** brand icon (64 px) · title (a link to the page) · one-line summary · arrow (`icon-directional`, mirrored in RTL).

- White cards with a thin navy-200 border and a 4 px yellow top border. Grid: 1 column on mobile, 2 on tablet, 4 on desktop.
- The whole card is one link (stretched `::after`). Hover: `--shadow-md`, lift 4 px, and the arrow nudges toward the inline-end. Focus ring around the whole card.
- Wrapped in a `<nav>` named "עוד על נובידאה" when the block has no title.

### 10.21 "Coming soon" label

A small yellow label with navy text ("בקרוב", 12.12:1). Above the title when the whole feature is upcoming; inline before the note when only an extra part is upcoming (`soonNote`).

### 10.22 Lead form (HubSpot)

`/contact` embeds HubSpot form `05171e84-3123-41fc-81e0-3f8626cb3574` (portal `2799426`, region `na1`), configured in `src/content/pages/he/contact.yaml` and loaded by `src/scripts/hubspot-form.ts`. Same embed as HubSpot's snippet (`forms/embed/v2.js` + `hbspt.forms.create`), but without inline script, so a strict CSP stays possible.

- **Consent first:** HubSpot sets cookies, so the script loads only after marketing consent (§10.23). Until then the slot shows a notice with **"אישור עוגיות שיווק והצגת הטופס"** (grants marketing consent and loads the form) and a link to the cookie settings.
- States on `#hubspot-form` (`data-state`): `consent` → `loading` → `ready`, or `error` if the script is blocked (role="alert" message). `<noscript>` explains the form needs JavaScript.
- Without the `hubspot` settings, the block falls back to a placeholder listing the required fields.
- **Layout:** the form sits in a white card (4 px yellow top edge, `--shadow-sm`) on the `subtle` surface, 8 of 12 columns centred on desktop, with a visible `h2` "השאירו פרטים" and the title accent (§7.6).
- **Styling inside HubSpot's iframe:** HubSpot draws the form in a same-origin iframe, so site CSS can't reach it (CSS pasted into the site's stylesheets has no effect). Once the form is in the iframe, `hubspot-form.ts` sets the iframe's `lang` and `dir` from the page (so the form flows RTL without `float` or `text-align: right` hacks), copies the site's `@font-face` rules for Rubik, and adds the brand rules: navy labels, 3:1 grey-700 field borders, navy focus ring, red-700 errors, and a navy primary button. Email and phone inputs get `dir="ltr"`. It replaces HubSpot's English "Submit" with "השאירו פרטים" (`nav.cta`), and keeps the iframe as tall as its content (errors add height).
- **HubSpot still owns the fields, labels and messages.** In HubSpot, set the fields from the content document, the form language to Hebrew (error messages), and keep visible labels. If HubSpot ever serves the form cross-origin, the script leaves HubSpot's own styling in place. The CSP must allow `js.hsforms.net`, `forms.hsforms.com` and HubSpot's related domains, and inline styles (HubSpot injects them too).

### 10.23 Cookie consent

`src/components/ConsentBanner.astro` (markup) and `src/scripts/consent.ts` (logic).

- **Banner** on the first visit: navy, fixed to the bottom, placed right after the skip link in the DOM so keyboard users reach it first. **"אישור הכל" and "רק עוגיות הכרחיות" have the same style and size** (no nudging), plus "הגדרות". It doesn't steal focus.
- **Settings dialog** (native `<dialog>`: focus trap, Escape closes, focus returns): necessary (always on, disabled switch), analytics, marketing and forms. Reopened from **"הגדרות עוגיות"** in the footer.
- **Storage:** `localStorage["nv-consent"]` = `{ v, analytics, marketing, at }`. Raise `VERSION` in `consent.ts` to ask everyone again after a policy change.
- **Gating:** third-party scripts are added inert (`<script type="text/plain" data-consent="marketing" data-src="…">`) or via `window.nvConsent.whenGranted('marketing', fn)`, and run only once that category is granted. Without JavaScript nothing third-party loads.
- **Withdrawal:** turning a category off deletes its known cookies (HubSpot `__hs*`, `hubspotutk`; analytics `_ga*`) and reloads the page, so already-running scripts stop.
- **Pending:** legal review of the wording (`TODO(verify)` in `src/i18n/ui.ts`) and a link to the privacy policy once `/privacy` exists.

---

### 10.24 Video

**Anatomy:** a 16:9 video with native controls (`src/components/Video.astro`), used in a text block's media column in place of a picture. In a text block, a video gets 7 of 12 columns on desktop (text 5, `gx-lg-5` gutter) and fills 88% of that column, aligned to the page edge (about 650 px at 1440 px); a picture gets 5 columns.

- **Source:** a file in `src/assets/videos/` (MP4 or WebM, under about 20 MB), bundled with a hashed URL. `preload="metadata"`, `playsinline`, no autoplay. Optional poster image.
- **Accessibility:** an accessible name (`title`), and captions (WebVTT `<track>`) for any video with speech (WCAG 1.2.2). A download link is the fallback text.
- **Placeholder:** without a file, a navy 16:9 panel with a yellow play circle, the stripe motif in a corner, and "הסרטון יעלה בקרוב". It isn't a button: nothing happens on click. The layout stays the same when the video arrives.
- **RTL:** media controls and the play triangle are never mirrored (§8.1).
- **YouTube later:** embed from `youtube-nocookie.com`, loaded only after marketing consent like the HubSpot form (§10.22), with the same consent notice until then. Add the domains to the CSP.

### 10.25 Quote carousel

**Anatomy:** section title (`h2` with the title accent) · one customer quote at a time (`<figure>`: yellow decorative quote mark, `<blockquote>` at `--text-h4`, `<figcaption>` with the name in bold and "role · company" in secondary text, a 4 px yellow bar at its inline-start) · controls: previous arrow, dots, next arrow (`src/components/blocks/QuotesBlock.astro`).

- Surface: `navy` by default. Text up to 56 rem wide, aligned to the inline-start.
- **Bootstrap carousel** (data API), cross-fade. **No autoplay**, so nothing moves unless the visitor asks (WCAG 2.2.2); keyboard arrows work when the carousel has focus.
- All slides share one grid cell, so the carousel is as tall as the longest quote and the page doesn't jump between slides.
- **Accessibility:** the carousel has `aria-roledescription="קרוסלה"` and the section title as its name; each slide is a group "ציטוט n מתוך 4"; slide changes are announced politely (`aria-live`). Arrow buttons are 48 px with Hebrew names; dots are 24 px targets named "ציטוט n מתוך 4: <name>", with `aria-current` on the active one. Only the active slide is visible to assistive technology.
- **RTL:** "previous" is at the inline-start and points back (right in Hebrew), "next" points forward. The first dot is at the inline-start.
- Role and company are each wrapped in `<bdi>` and joined with a middle dot, so English titles and Hebrew company names don't reorder.
- Quotation marks come from CSS `quotes` (straight in Hebrew). Quotes are verbatim, or a translation approved by the customer or Novidea marketing.

### 10.26 Scroll progress

A 4 px brand-red line on the header's bottom edge that fills as the page scrolls, in the reading direction (from the right in Hebrew). Inside the sticky header, so it needs no z-index of its own.

- **CSS only:** a scroll-driven animation (`animation-timeline: scroll(root block)`), no JavaScript. Browsers without support don't show it.
- Decorative (`aria-hidden`). Hidden for `prefers-reduced-motion: reduce` and in print. Empty on pages too short to scroll.
- RTL: `transform-origin` has no logical form, so `:dir(rtl)` sets its own (§8.3).

## 11. Token reference

**`src/styles/tokens.css` is the source of truth.** It defines every token named in this document (colors, fonts, type scale, line-heights, spacing, shape, motion, icon sizes), the Hebrew overrides under `:root:lang(he)`, and the values that change at Bootstrap's md (768 px) and lg (992 px) breakpoints (`--section-pad`, `--slant`, `--header-height`).

Change a token there, not in a component. If a token's meaning changes, update this document in the same PR.

Surface classes (`.surface-light`, `.surface-navy`, and so on, in `src/styles/bootstrap-brand.css`) set `background-color`, `color`, `--text-secondary`, `--focus-ring` and Bootstrap's link color from the table in §3.3. Components read those variables and never pick text colors themselves.

---

## 12. Open items (need Novidea marketing)

| # | Item | Blocks | Interim |
|---|---|---|---|
| 1 | ~~Logo files~~ **Resolved 19/11/2026:** official SVG received (`src/assets/brand/novidea-logo.svg`). All variants are generated from it by `src/components/Logo.astro`. | n/a | n/a |
| 2 | **Campton web font licence** for self-hosting | English headings | Poppins 700 |
| 3 | ~~Brand icon library~~ **Resolved 19/11/2026:** 62 icons in two versions, in `src/assets/icons/` (§7.4). | n/a | n/a |
| 4 | **Photography:** brand pictures received 19/11/2026 (`src/assets/brand/`); the hero, spotlight and AI section use them. **Still needed:** confirmation that they're licensed for the Israeli site, Israel-relevant photos, and a screenshot of the customer view module. | Spotlight accuracy | General dashboard picture |
| 5 | **Confirm the red** (`#ED4443` vs RGB 234/68/67 = `#EA4443`) | None (difference is minor) | `#ED4443` |
| 6 | **Is the July 2022 brand book still current?** It uses the novideasoft.com domain. This document has not been checked against today's novidea.com. | Whole system | Brand book values |
| 7 | **Approve Rubik** as the Hebrew typeface | Hebrew pages | Rubik |
| 8 | **Approve the accessibility departures:** navy text on red, sky and yellow; navy primary buttons; visible form labels; no white-on-red captions | Buttons, stat band, forms | As specified here (required by law) |
| 9 | **Screen minimum logo size** (brand book only sets print) | Header | 24 px mobile, 32 px desktop |

---

## 13. Bootstrap 5.3 mapping

Bootstrap 5.3.9 loads from jsDelivr (`docs/decisions/0001-bootstrap-5-via-cdn.md`): `bootstrap.rtl.min.css` on Hebrew pages and `bootstrap.min.css` on English pages. `src/styles/bootstrap-brand.css` loads after it and maps the brand onto Bootstrap's CSS variables.

| Bootstrap | Set to | Why |
|---|---|---|
| `--bs-body-font-family`, `--bs-body-font-size`, `--bs-body-line-height` | `--font-body`, `--text-body`, `--leading-body` | Locale-aware type (§4) |
| `--bs-body-color`, `--bs-emphasis-color` | navy | Brand text color |
| `--bs-primary` / `-rgb` | navy | Utilities like `.text-primary`, `.bg-primary` |
| `--bs-link-color` / `-rgb`, `--bs-link-hover-color` / `-rgb` | navy (yellow on navy surfaces) | §3.3 |
| `--bs-border-radius*` | `--radius-sm` (2 px) | Square-cornered brand |
| `--bs-border-color` | navy-200 | Decorative borders |
| `h1`–`h4` font sizes | `--text-h1` … `--text-h4` | Replaces Bootstrap's RFS sizes with ours |
| `.btn-primary`, `.btn-outline-primary` | Navy variants (§10.4) | Bootstrap's default is blue |
| `.btn-accent`, `.btn-on-dark`, `.btn-outline-on-dark` | New variants via `--bs-btn-*` | Sky and yellow buttons with navy text (§10.4) |
| Focus on `.btn`, `.nav-link`, `.navbar-toggler`, `.btn-close` | Solid 2 px outline in `--focus-ring`, no box-shadow | Bootstrap's translucent glow is below 3:1 on several surfaces (§9) |
| `.navbar` (`--bs-navbar-*`) and `.offcanvas` (`--bs-offcanvas-*`) | Navy on white; white on navy in the mobile panel | §10.2 |

**Use from Bootstrap as-is:** grid (`container`, `row`, `col-*`, `row-cols-*`, `g*-*`), spacing and flex utilities (start/end variants only), `list-unstyled`, `visually-hidden`, `stretched-link`, `sticky-top`, `navbar`, `offcanvas`, `btn-close`.

**Don't use:**
- `.bg-warning`, `.bg-info` or `.bg-danger` with `.text-white`, which fails contrast (§3.4). Use the `.surface-*` classes instead.
- `.text-muted` or `.text-body-secondary` on colored surfaces. Use `.text-secondary-nv`, which follows the surface.
- `g-5` or larger horizontal gutters (§5.2).

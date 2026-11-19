# 0001: Bootstrap 5.3 from a CDN as the CSS framework, replacing Tailwind

- **Status:** Accepted
- **Date:** 19/11/2026
- **Decided by:** Project owner
- **Roles affected:** Design, Code, Testing

## Context

`AGENTS.md` originally named Tailwind CSS as the styling layer. Before any site code was written, the project owner chose Bootstrap as the design-system foundation, loaded from a CDN.

Bootstrap has two current lines:

| | 5.3.9 | 6.0.0-alpha.1 |
|---|---|---|
| Status | Stable (npm `latest`) | Pre-release (npm `next`) |
| RTL | A separate prebuilt RTL stylesheet (`bootstrap.rtl.min.css`) | Native logical properties, one stylesheet |
| Customization | Sass variables (needs a build) or CSS variables | CSS tokens |
| Docs | getbootstrap.com/docs/5.3 | getbootstrap.com/docs/6.0, and `getbootstrap.com/llms-full.txt` |

## Decision

Use **Bootstrap 5.3.9 from jsDelivr**, with Subresource Integrity (SRI).

- **Hebrew pages** load `bootstrap.rtl.min.css`, **English pages** load `bootstrap.min.css`. `src/layouts/BaseLayout.astro` picks the file from the page locale.
- **JavaScript:** `bootstrap.bundle.min.js`, with `defer`. Only the offcanvas (mobile menu) uses it today.
- **Versions and hashes** live in `src/config/cdn.ts`. The hashes were computed from the CDN files and checked byte-for-byte against the npm package. When upgrading, update the version and all three hashes together, and verify them the same way.
- **Brand layer:** we can't recompile the CDN build, so `src/styles/bootstrap-brand.css` overrides Bootstrap's CSS variables (`--bs-*`) and component variables (`--bs-btn-*`, `--bs-navbar-*`, `--bs-offcanvas-*`) with the Novidea tokens from `src/styles/tokens.css`. It loads after Bootstrap.
- **Our own CSS** uses logical properties only, so the same brand file works with both Bootstrap builds.

## Why not Bootstrap 6 now

It's an alpha. Breaking changes before the stable release are likely, and a production marketing site shouldn't track them. We'll revisit when 6.0 is stable. Its native logical properties would remove the two-stylesheet setup.

## Consequences

- **Good:** no Sass or RTL build step. A mature component library (navbar, offcanvas, grid, forms) with RTL support that's been tested at scale.
- **Fixed defaults:** we can't change Bootstrap's breakpoints (sm 576, md 768, lg 992, xl 1200, xxl 1400), spacer scale or grid through Sass. The design system adopts them as-is.
- **Every class we use ships its full CSS** (about 227 KB minified per direction, about 30 KB over the wire with compression), including components we don't use. Watch the Lighthouse performance budget (`AGENTS.md` §3.4). If it becomes a problem, move to a self-hosted Sass build of only the parts we use.
- **Third-party requests:** every page load contacts `cdn.jsdelivr.net`. That means:
  - **Privacy:** visitors' IP addresses go to jsDelivr. Legal must review this for the privacy policy (Israeli Privacy Protection Law, Amendment 13; `AGENTS.md` §4.4).
  - **CSP:** `style-src` and `script-src` must allow `https://cdn.jsdelivr.net`. SRI is required on both tags.
  - **Availability:** if jsDelivr is down or blocked, the page loses its layout but stays readable.
- **Rules that change:** Bootstrap 5 has no `ml-*`/`mr-*` utilities. Its spacing and alignment utilities are already start/end based (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `float-end`), and the RTL build flips them. Don't write `[dir="rtl"]` overrides for anything Bootstrap's RTL build already flips.
- **Gutters:** row gutters larger than the container padding (`g-5` and up) overflow on mobile. Use `gx-4` or smaller horizontally.
- **Agent skills:** the `twbs/bootstrap` skills in `.claude/skills/`, and `getbootstrap.com/llms-full.txt`, describe **Bootstrap 6**. Don't apply them to this codebase, except `bootstrap-v5-v6-migration` when we upgrade.
- **Upgrade path:** when Bootstrap 6 is stable, migrate in one PR using the `bootstrap-v5-v6-migration` skill.

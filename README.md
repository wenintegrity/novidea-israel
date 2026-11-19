# Novidea Israel

The Israeli website for [Novidea](https://novidea.com): Hebrew-first (RTL), with an English version, aimed at the Israeli insurance market.

**Status:** Hebrew home page built (draft content; see `TODO(verify)` markers in `src/content/he/home.yaml`).

## Run it

Requires Node.js 22.12 or later.

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # type-check + static build into dist/
npm run test:e2e     # Playwright: RTL, responsive, accessibility (needs a build first)
npm run icons        # prepare and check the brand icon library
```

## Adding icons and pictures

- **Icons:** put `<name>.png` (navy lines) and `<name>.on-dark.png` (white lines) in [src/assets/icons/](src/assets/icons/), add Hebrew and English names in [icons.yaml](src/assets/icons/icons.yaml), run `npm run icons`, and restart the dev server. Use them in content as `icon: <name>`.
- **Pictures:** originals go in [src/assets/brand/](src/assets/brand/). Pages use web-ready copies from [src/assets/images/](src/assets/images/), referenced in the page YAML as `picture: { src, alt }`.

## Start here

- [AGENTS.md](AGENTS.md): best practices, stack, repository layout, and the five agent roles (Structure, Design, Code, Testing, Content).
- [.claude/agents/](.claude/agents/): Claude Code subagent definitions for each role.

## Stack

Astro + TypeScript, Bootstrap 5.3.9 from a CDN with a Novidea brand layer ([ADR 0001](docs/decisions/0001-bootstrap-5-via-cdn.md)), Playwright and axe-core. Vitest and Lighthouse CI are planned. See [AGENTS.md](AGENTS.md#1-project-at-a-glance).

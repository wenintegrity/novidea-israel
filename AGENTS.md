# Novidea Israel — Agents & Best Practices

This file is the operating manual for everyone (human or AI agent) working on the **Novidea Israel** website: a local, Hebrew-first version of [novidea.com](https://novidea.com) for the Israeli insurance market.

Read it before you change anything. If it conflicts with a request, raise the conflict. Don't work around it quietly.

---

## 1. Project at a glance

| Item | Decision |
|---|---|
| Audience | Israeli insurers, insurance agencies (סוכנויות ביטוח), brokers, and MGAs |
| Primary language | Hebrew (`he-IL`, RTL), served at `/` |
| Secondary language | English (`en`, LTR), served at `/en/` |
| Source of truth for product messaging | novidea.com, adapted for Israel, not machine-translated |
| Framework | [Astro](https://astro.build) + TypeScript (static-first, fast, good for SEO) |
| Styling | **Bootstrap 5.3.9 from the jsDelivr CDN** with SRI: `bootstrap.rtl.min.css` on Hebrew pages, `bootstrap.min.css` on English pages, plus a Novidea brand layer (`src/styles/bootstrap-brand.css`). Our own CSS uses **logical properties only**; in markup use Bootstrap's start/end utilities (`ms-*`, `pe-*`, `text-start`). See ADR 0001 |
| Content | Markdown/MDX in Astro content collections, one folder per locale |
| Testing | Vitest (unit), Playwright (E2E and visual), axe-core (accessibility), Lighthouse CI (performance and SEO) |
| Hosting | To be decided (Vercel, Netlify or Cloudflare Pages all work for a static Astro build). Record the choice in `docs/decisions/` |

Stack changes go through an Architecture Decision Record (ADR) in `docs/decisions/NNNN-title.md`.

---

## 2. Repository layout

```
.
├── AGENTS.md                 ← this file
├── CLAUDE.md                 ← points Claude Code to this file
├── .claude/agents/           ← subagent definitions (one per role below)
├── docs/
│   ├── sitemap.md            ← owned by Structure agent
│   ├── content-model.md      ← owned by Structure agent
│   ├── design-system.md      ← owned by Design agent
│   ├── glossary-he.md        ← owned by Content agent (Hebrew terminology)
│   ├── seo.md                ← owned by SEO agent (keywords, technical SEO, domain move)
│   └── decisions/            ← ADRs
├── src/
│   ├── pages/                ← routes (he at root, en under /en)
│   ├── layouts/
│   ├── components/
│   ├── content/{he,en}/      ← page and article content
│   ├── i18n/                 ← UI strings per locale
│   └── styles/               ← tokens.css + bootstrap-brand.css (owned by Design agent)
├── public/                   ← static assets (images, fonts, favicons)
└── tests/{unit,e2e,a11y}/
```

---

## 3. The six agents

Each role below has a matching subagent in `.claude/agents/`. A role **owns** certain files: other agents may propose changes to them, but the owner makes or approves the change.

### Workflow

```
 Structure ──► Content ──┐
     │                   ├──► Code ──► Testing ──► PR review ──► merge
     └──────► Design ────┘
        ▲        ▲          ▲
        └── SEO ─┴──────────┘   (advises Structure, Content and Code; owns the SEO plan)
```

1. **Structure** defines what pages exist, their URLs, and what each page contains.
2. **Content** and **Design** work in parallel from that spec.
3. **Code** implements pages from the structure spec, content files, and design tokens.
4. **Testing** verifies the result and blocks the merge if quality gates fail.
5. **SEO** audits the site and feeds search requirements into Structure, Content, Code and Testing through `docs/seo.md`.

Each handoff is a file in the repo, not a chat message. If it isn't written down, the next agent can't rely on it.

---

### 3.1 Structure agent: `structure-architect`

**Purpose:** information architecture, sitemap, URLs, navigation, content model, SEO skeleton.

**Owns:** `docs/sitemap.md`, `docs/content-model.md`, `src/content/config.ts` (collection schemas), redirect rules.

**Responsibilities**
- Map novidea.com's sections to the Israeli site. Decide what to keep, adapt, drop, or add for Israel (for example local customers, local events, a Hebrew contact flow).
- Define URL slugs. Hebrew pages use **English (Latin) slugs** (`/solutions/brokers`, not Hebrew-encoded URLs), so links stay readable when shared.
- Define each page type's sections and fields in `content-model.md`. Content and Code both build from this.
- Plan navigation (header, footer, breadcrumbs) and the language switcher, mapping each Hebrew page to its English counterpart.
- Define SEO metadata per page: title, description, `hreflang` pairs, canonical URL, and structured data (Organization, BreadcrumbList).

**Done when:** every page in the sitemap has a URL, a page type, an `hreflang` counterpart (or an explicit "he only"), and a content-model entry.

---

### 3.2 Design agent: `design`

**Purpose:** visual language, design tokens, component specs, and RTL correctness.

**Owns:** `docs/design-system.md`, `src/styles/tokens.css`, `src/styles/bootstrap-brand.css` (the brand layer over Bootstrap).

**Responsibilities**
- Inherit Novidea's global brand (logo, colors, imagery style) from novidea.com and the brand guidelines. The Israeli site should feel like Novidea, not a separate brand.
- Choose Hebrew typography. Pick a Hebrew-capable typeface that pairs with the brand's Latin font (candidates: Heebo, Assistant, Rubik, Noto Sans Hebrew). Set a slightly larger size and line-height for Hebrew text.
- Define tokens for color, spacing, type scale, radii, shadows and breakpoints. Components use tokens only, never raw hex values or pixel sizes.
- Write an RTL spec for each component:
  - Directional icons (arrows, chevrons, "next") are mirrored. Logos, media controls, charts, and phone numbers are **not**.
  - Mixed Hebrew/English text (product names like *Novidea*, *Salesforce*) must render correctly. Use `<bdi>` or `dir="auto"` where needed.
- Meet contrast and focus-state requirements (see Accessibility, §4.3).

**Done when:** every component used in the sitemap has a spec with RTL and LTR states, mobile and desktop layouts, and hover, focus and disabled states.

---

### 3.3 Code agent: `code`

**Purpose:** implement the site.

**Owns:** `src/` (except content files and tokens), build config, CI config.

**Responsibilities**
- Build pages and components from the structure spec, content model, and design tokens. Don't invent copy or styles. If something is missing, ask the owning agent.
- Set `<html lang="he" dir="rtl">` on Hebrew pages and `lang="en" dir="ltr"` on English ones, from the locale, never hard-coded per page.
- Use CSS logical properties everywhere. A physical direction (`left`, `margin-right`, `text-align: left`) in a PR needs a comment explaining why.
- Keep all UI strings (button labels, form errors, aria-labels) in `src/i18n/`. No string literals in components.
- Format dates, numbers and currency with `Intl` and the `he-IL` locale (dates as DD/MM/YYYY, ₪ for currency, `+972` phone numbers).
- Ship minimal JavaScript. Use Astro islands only where interaction is needed.
- Optimize images (Astro `<Image>`, AVIF/WebP, explicit width and height) and self-host fonts.
- Forms: validate on the client and the server, use Hebrew error messages, and add spam protection. Never log or store personal data beyond what the privacy policy states.

**Done when:** the feature builds with no type errors, passes lint, matches the design spec in both directions, and has the tests the Testing agent asked for.

---

### 3.4 Testing agent: `testing`

**Purpose:** quality gates. This agent can block a merge.

**Owns:** `tests/`, Playwright and Vitest config, Lighthouse CI budgets.

**Responsibilities**
- **Unit (Vitest):** utilities, i18n helpers, formatters.
- **E2E (Playwright):** navigation, the language switcher (each page links to its counterpart), forms (valid, invalid and submitted), and 404 pages, in both locales.
- **Visual regression:** screenshots of key pages in `he` and `en` at mobile (375px), tablet (768px) and desktop (1440px).
- **Accessibility:** run axe-core on every page with zero serious or critical violations, plus a manual keyboard-only pass on new components.
- **RTL checks:** no horizontal scroll, directional icons mirrored correctly, no physical CSS properties leaking in.
- **SEO checks:** each page has a unique title and description, valid `hreflang` pairs, a canonical URL, and appears in the sitemap.xml.
- **Performance budget (Lighthouse, mobile):** Performance ≥ 90, Accessibility = 100, SEO = 100, Best Practices ≥ 95. LCP < 2.5s, CLS < 0.1.

**Done when:** all gates pass in CI. A failure is reported with the failing page, locale, viewport and a reproduction step. "Tests pass" is never claimed without running them.

---

### 3.5 Content agent: `content`

**Purpose:** Hebrew and English copy, localized for the Israeli insurance market.

**Owns:** `src/content/`, `src/i18n/` (string values), `docs/glossary-he.md`.

**Responsibilities**
- **Localize, don't translate.** Rewrite novidea.com messaging for Israeli readers: shorter sentences, a direct tone, and local examples.
- Keep a **Hebrew insurance glossary** (`docs/glossary-he.md`) and use it consistently, for example: insurer → מבטח / חברת ביטוח, agency → סוכנות ביטוח, underwriting → חיתום, claims → תביעות, policy → פוליסה, renewal → חידוש. Product and brand names stay in English (Novidea, Salesforce).
- Use gender-inclusive or neutral Hebrew where possible (for example plural forms or infinitives in calls to action: "לתיאום הדגמה" rather than "תאם הדגמה").
- Make **no unverified claims.** Every customer name, statistic, certification or regulatory statement needs a source (novidea.com, a published case study, or written approval from Novidea marketing). Mark anything unverified `TODO(verify)`. It must not ship.
- Write SEO copy (title ≤ 60 characters, description ≤ 155 characters) for each page, following the Structure agent's metadata plan.
- Write alt text for every meaningful image in the page's language.

**Done when:** every field in the content model is filled for both locales (or marked "he only"), the glossary is followed, and no `TODO(verify)` remains.

---

### 3.6 SEO agent: `seo`

**Purpose:** search visibility in Israel: Hebrew keywords, on-page SEO, technical SEO, and the move from the temporary URL to the final domain.

**Owns:** `docs/seo.md` (keyword map, technical SEO checklist, domain-move plan, measurement). Uses the `marketing:seo-audit` skill.

**Responsibilities**
- Audit the live site and the build for search: indexing, titles and descriptions, headings, internal links, structured data, link previews, Core Web Vitals.
- Keep a Hebrew keyword map per page and hand titles, descriptions and copy changes to Content (no unverified claims, §3.5).
- Define technical SEO for Code and Structure: `robots.txt`, `sitemap.xml`, canonical and `hreflang` tags built from a single `site` setting (never a hard-coded domain), JSON-LD, Open Graph, 404.
- **The current URL (`novidea-israel.vercel.app`) is temporary.** Keep temporary and preview hosts out of search indexes, and own the launch checklist for the final domain (301 redirects, Search Console, sitemap submission).
- Hand SEO checks to Testing for CI.

**Done when:** every page has a keyword target and metadata in `docs/seo.md`, the technical checklist is implemented by its owners, and the domain-move plan is ready.

---

## 4. Cross-cutting best practices

### 4.1 Git and pull requests
- `main` is protected and always deployable. Work on short-lived branches: `feat/…`, `fix/…`, `content/…`, `design/…`, `test/…`.
- Use [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `content:`, `docs:`, `test:`, `chore:`).
- One concern per PR. A PR description says what changed, why, which agent roles were involved, and includes screenshots in **both** `he` and `en` for any visual change.
- CI (build, lint, type-check, tests, Lighthouse) must be green before merging.

### 4.2 Localization and RTL
- Hebrew is the default and is designed first. English is not the base that Hebrew gets "flipped" from.
- Logical CSS properties only. Check every layout in both directions.
- Mixed-direction strings (Hebrew containing English words or numbers) must be checked visually. Punctuation at the end of mixed strings is a common bug.
- Israeli conventions: the work week runs Sunday to Thursday, dates use DD/MM/YYYY, currency is ₪ (ILS), and phone numbers use `+972` / `0X-XXXXXXX`.

### 4.3 Accessibility (legal requirement in Israel)
- Israeli law (the Equal Rights for Persons with Disabilities regulations, 2013, and Israeli Standard **IS 5568**, based on WCAG) requires accessible websites. Target **WCAG 2.1 AA** as the minimum.
- The site must publish an **accessibility statement** (הצהרת נגישות) with a named accessibility contact.
- Don't use third-party "accessibility overlay" widgets as a substitute for accessible code.
- Every interactive element is keyboard reachable, has a visible focus state, and has an accessible name in the current language.

### 4.4 Privacy and legal
- Comply with the Israeli Privacy Protection Law (including Amendment 13) and GDPR where EU data is involved. Have legal review the privacy policy and cookie notice before launch.
- Load analytics and marketing scripts only after consent.
- Collect only the form fields that are needed.

### 4.5 Performance and SEO
- Static generation by default. Every byte of client JavaScript needs a reason.
- `hreflang="he-IL"` and `hreflang="en"` plus `x-default` on every page pair, a generated `sitemap.xml`, and `robots.txt`.
- Set up Google Search Console for the Israeli domain at launch.

### 4.6 Security
- No secrets in the repo. Use environment variables, with `.env.example` documenting the names only.
- Set security headers (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`) at the host.
- Keep dependencies updated with Dependabot or Renovate and review updates. Don't auto-merge major versions.

---

## 5. Working with the agents in Claude Code

The subagents live in `.claude/agents/`. Ask for them by role, for example:

- "Use the **structure-architect** agent to draft the sitemap from novidea.com."
- "Use the **content** agent to write the Hebrew homepage hero."
- "Use the **testing** agent to run the a11y and RTL checks on the solutions pages."
- "Use the **seo** agent to audit the site and update the SEO plan."

Rules for agents:
1. Stay within your owned files. Propose changes to other areas rather than making them.
2. Read the relevant `docs/` spec before starting. If it's missing, ask the owner instead of guessing.
3. Report exactly what you changed and what you verified. If something was skipped or failed, say so.

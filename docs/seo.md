# SEO plan

**Owner:** SEO agent (`seo`) · **Status:** v0.1 · **Last updated:** 20/11/2026

This is the search plan for the Hebrew site. Every change it asks for belongs to another agent and is written as a request to that owner (`AGENTS.md` §5). Effort: **S** = under half a day, **M** = 1 to 2 days, **L** = more.

**The domain isn't decided.** Nothing here depends on it. The site URL comes from one setting, and the temporary host stays out of search results until launch, so there is nothing to "move" later.

---

## 1. Current state (audit of the live site, 20/11/2026)

Checked: the 7 live pages on `https://novidea-israel.vercel.app/` (HTML and HTTP headers fetched directly), `src/`, `vercel.json`, `astro.config.mjs`. Lighthouse / PageSpeed scores were **not measured**: the PageSpeed API quota was exhausted and Lighthouse isn't installed. The Testing agent should run it (item T-1).

### Good already

| Check | Evidence |
|---|---|
| Unique titles ≤ 60 and descriptions ≤ 155 | Enforced by `seo` in `src/content.config.ts`; live titles are 22 to 49 characters, descriptions 93 to 123 |
| Language and direction | `<html lang="he" dir="rtl">` on every page |
| One `h1` per page, no skipped heading levels | All 7 pages; blocks render `h2` → `h3` |
| Clean Latin slugs | `/solution`, `/capabilities`, `/why-novidea`, `/israel`, `/contact`, `/privacy` |
| Alt text | Photos have Hebrew alt; customer logos use the customer name; feature icons have empty `alt` (decorative, correct) |
| Images | WebP with `srcset`, explicit `width`/`height`; hero image `loading="eager" fetchpriority="high"` (53 KB), the rest lazy |
| Light pages | Page CSS 7 KB, Bootstrap RTL CSS 23 KB and JS 21 KB (compressed), from jsDelivr with `preconnect` |
| Video | `preload="metadata"`, so the 39 MB MP4 downloads only when played |
| HTTPS and HSTS | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (Vercel default) |
| Tracking only after consent | HubSpot form loads after marketing consent; no analytics yet |
| No hard-coded domain | No `vercel.app` or other domain string in `src/`, `astro.config.mjs` or `vercel.json` |
| Not indexed yet | A web search for `site:novidea-israel.vercel.app` returned nothing (20/11/2026). Google itself wasn't checked directly |

### Missing or wrong

| # | Issue | Evidence | Severity |
|---|---|---|---|
| A1 | **Temporary host is indexable** | No `X-Robots-Tag` header and no `<meta name="robots">` on the production `vercel.app` URL. Vercel adds `noindex` to *preview* deployments only, not to the production `vercel.app` domain | Critical (now) |
| A2 | No `site` setting | `astro.config.mjs` has a `TODO` for `site` | Critical (blocks canonical, sitemap, OG) |
| A3 | No `robots.txt` | `/robots.txt` → 404 | High |
| A4 | No `sitemap.xml` | `/sitemap.xml` and `/sitemap-index.xml` → 404 | High |
| A5 | No canonical tags | No `rel="canonical"` on any page | High |
| A6 | Duplicate URLs | `/solution` **and** `/solution/` both return 200; `/index.html` returns 200 as a copy of `/` | High (with A5) |
| A7 | No Hebrew 404 page | Unknown URLs get Vercel's 79-byte plain-text 404 | High (UX + crawl) |
| A8 | No link-preview tags | No `og:*` or `twitter:*` tags; no share image. Links shared on WhatsApp/LinkedIn show no picture | High (for a B2B site shared by sales) |
| A9 | No structured data | No JSON-LD (no Organization, WebSite, BreadcrumbList) | Medium |
| A10 | Weak keyword targeting | The home title has no "ביטוח" or "CRM"; the `/contact` title is "השאירו פרטים" (no topic); `/capabilities` h1 is "יכולות ליבה: מקצה לקצה" (no topic) | Medium |
| A11 | Weak internal linking | On every internal page the only in-content link is `/contact`. Topic pages don't link to each other except through the menu | Medium |
| A12 | Thin pages | Words in `<main>`: `/contact` 86, `/israel` 122, home 188, `/capabilities` 192 | Medium (B2B, acceptable for now) |
| A13 | Video has no captions or text alternative | `<video>` has no `<track>`; nothing on the page says what the video covers | Medium (also an accessibility requirement, `Open tasks.md` §3a) |
| A14 | Accessibility statement missing | Removed on 20/11/2026; required by law before launch | Legal (not SEO), blocks launch |
| A15 | Two hidden `h2`s before the `h1` | "הגדרות עוגיות" (consent dialog) and "תפריט" (mobile menu) come first in the source | Low |

---

## 2. Decision for the temporary URL

**Recommendation: keep `novidea-israel.vercel.app` (and every preview) out of the index until launch, with `noindex`. Don't block crawling in `robots.txt`.**

Why:
- Nothing is indexed yet, so there is no traffic to lose.
- If Google indexes the temporary host now, it competes with the final domain later, and the move needs redirects, Search Console work and weeks of overlap. With `noindex` there is nothing to move.
- The site still has placeholders (privacy policy, missing accessibility statement, unverified quotes). It shouldn't appear in search before those are done.
- `noindex` doesn't block anyone with the link, so reviews and sales demos keep working.
- **Don't use `Disallow: /` in `robots.txt`.** A crawler that may not fetch a page never sees its `noindex`, and the URL can still be listed (without a description) if someone links to it.

How (two layers, so a mistake in one doesn't expose the site):

1. **Build switch, default off** (Code, S). An environment variable, e.g. `ALLOW_INDEXING`, read through `astro:env` (typed, default `false`). While it isn't `true`, every page gets `<meta name="robots" content="noindex">` and `robots.txt` has no `Sitemap:` line. It is set to `true` **only** in Vercel's *Production* environment, **on launch day**. Preview and local builds never set it.
2. **Host header** (Code, S). In `vercel.json`, send `X-Robots-Tag: noindex` for requests whose host is the `vercel.app` address. This keeps the temporary host out of the index even after launch, until the 301 redirects (§6) replace it:

   ```json
   "headers": [
     {
       "source": "/(.*)",
       "has": [{ "type": "host", "value": "novidea-israel.vercel.app" }],
       "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }]
     }
   ]
   ```
   (The host name here is the temporary host, not the final domain, so it isn't the "hard-coded domain" the rules forbid. It is the one place the temporary host may appear.)

Preview deployments already get `X-Robots-Tag: noindex` from Vercel; the build switch covers them too.

**Risk:** forgetting to turn indexing on at launch. The launch checklist (§6) and a post-deploy check (T-3) cover it.

---

## 3. Hebrew keyword map

No SEO tool is connected, so **there are no measured search volumes**. Demand and difficulty below are qualitative, based on the market (a small B2B niche: Israeli insurance agencies, agent houses and their managers), web searches on 20/11/2026 and the site's own content. Confidence says how sure we are that people search this way. After launch, Search Console replaces these guesses with real queries (§7).

What the searches showed: generic queries like "CRM לסוכני ביטוח" return mostly global CRM vendors in English (monday.com, HubSpot, Bitrix24, Insightly). Israeli agency software that appears: **Surense (שורנס)** and **Sheva (פיננסי 360)**. Israeli-specific terms (מסלקה פנסיונית, הר הביטוח, פרודוקציה) are where a local, Hebrew page can rank.

Spelling variants to cover naturally (in body text, not stuffed): ביטוח / בטוח (no-niqqud spelling is common in searches), סוכנות / סוכנויות, בית סוכן / בתי סוכן, CRM / סי אר אם, הר הביטוח / הר ביטוח, נובידאה / נובידיאה / Novidea.

| Page | Target query | Secondary queries and variants | Intent | Demand | Difficulty | Confidence |
|---|---|---|---|---|---|---|
| `/` | מערכת לניהול סוכנות ביטוח | תוכנה לסוכנות ביטוח, מערכת לבית סוכן, תוכנה לבתי סוכן, מערכת CRM לסוכנויות ביטוח, CRM לסוכני ביטוח, מערכת ליבה לסוכנות, פלטפורמת ענן לסוכנויות | Commercial | Low–medium | Medium | Medium |
| `/` | נובידאה | Novidea, נובידיאה, Novidea Israel, נובידאה ביטוח | Navigational | Low | Easy (but novidea.com competes) | High |
| `/solution` | ממשק למסלקה הפנסיונית | מסלקה פנסיונית לסוכנים, ממשק הר הביטוח, הר הביטוח לסוכנים, קליטת פרודוקציה, קליטת פרודוקציה מיצרנים, פוליוויז, ביטוח-נט גמל-נט פנסיה-נט | Commercial / informational | Low | Easy–medium | Medium |
| `/solution` | מערכת אחת לכל הסוכנות | ריבוי מערכות בסוכנות, החלפת מערכת Legacy, Open API ביטוח, ניהול קולקטיבים בריאות, ניהול ציי רכב ביטוח | Commercial | Low | Easy | Low |
| `/capabilities` | ניהול חידושים ביטוח | מנגנון חידושים לסוכנות, ניהול תביעות בסוכנות ביטוח, ניהול תהליכי עבודה (BPM) בביטוח, משרד ללא נייר לסוכנות, חתימה דיגיטלית לסוכני ביטוח, דשבורדים לסוכנות, תמונת לקוח 360 | Commercial / informational | Low | Easy–medium | Medium |
| `/why-novidea` | CRM לביטוח על Salesforce | Salesforce לביטוח, Salesforce בעברית לסוכנויות, מערכת ענן לסוכנות ביטוח, InsurTech, אינשורטק ישראל, אבטחת מידע ISO SOC2 סוכנות | Commercial | Low | Medium | Low–medium |
| `/israel` | נובידאה ישראל | תמיכה בעברית מערכת סוכנים, הטמעת מערכת בסוכנות ביטוח, הסבת נתונים סוכנות ביטוח | Navigational / commercial | Low | Easy | Medium |
| `/contact` | הדגמה מערכת לסוכנות ביטוח | נובידאה צור קשר, נובידאה הדגמה, Novidea demo | Transactional / navigational | Low | Easy | Medium |
| *(future blog/guides)* | מה זה מסלקה פנסיונית | איך לבחור מערכת CRM לסוכנות ביטוח, הר הביטוח לסוכנים איך זה עובד, דיגיטציה בסוכנות ביטוח | Informational | Low–medium | Medium | Medium |

Rules for using the map: one target query per page; use it in the title, h1 or intro, and the description where it reads naturally. Never add a claim to fit a keyword (`AGENTS.md` §3.5).

---

## 4. On-page requests to Content

All proposed text is built from wording already on the site or in the source document. Character counts are checked against the schema limits. The Content agent decides the final wording.

### 4.1 Titles and descriptions (`seo.title`, `seo.description`)

| Page | Current title | Proposed title (chars) | Proposed description (chars) |
|---|---|---|---|
| `/` | נובידאה \| פלטפורמת הענן לניהול סוכנויות ובתי סוכן | נובידאה \| מערכת CRM בענן לסוכנויות ביטוח ובתי סוכן (50) | פלטפורמת ענן לניהול סוכנויות ביטוח ובתי סוכן על בסיס Salesforce: לידים, מכירות, הפקה, פרודוקציה, שירות, תביעות וחידושים במערכת אחת. (131) |
| `/solution` | הבעיה והפתרון \| נובידאה | מערכת אחת לסוכנות: מסלקה, הר הביטוח ופרודוקציה \| נובידאה (56) | במקום ריבוי מערכות ואקסלים: מערכת אחת לכל פעילות הסוכנות, עם ממשקים למסלקה הפנסיונית, להר הביטוח, לקליטת פרודוקציה ו-Open API. (126) |
| `/capabilities` | יכולות ליבה: מקצה לקצה \| נובידאה | יכולות המערכת: מליד ועד פוליסה, BPM ו-BI \| נובידאה (50) | ניהול מסע לקוח מליד ועד פוליסה, תמונת לקוח 360° עם תובנות AI, ניהול תהליכים (BPM), משרד ללא נייר ודשבורדים בזמן אמת לסוכנות הביטוח. (131) |
| `/why-novidea` | למה נובידאה? \| נובידאה | למה נובידאה? CRM בענן, אבטחת מידע ו-AI \| נובידאה (48) | Cloud-Native אמיתי על תשתית CRM מהחזקות בעולם, אבטחת מידע (ISO, SOC2) וחדשנות מבוססת AI. וגם: מה אומרים לקוחות נובידאה בישראל. (126) |
| `/israel` | המטה כאן בישראל \| נובידאה | המטה והפיתוח בישראל, תמיכה בעברית \| נובידאה (43) | Keep the current one (119) |
| `/contact` | השאירו פרטים \| נובידאה | תיאום הדגמה למערכת לסוכנויות ביטוח \| נובידאה (44) | השאירו פרטים לשיחת היכרות והדגמה של נובידאה, מערכת הענן לניהול סוכנויות ביטוח ובתי סוכן. הצוות שלנו יחזור אליכם. (112) |
| `/privacy` | מדיניות פרטיות \| נובידאה | Keep | Keep |
| `/404` (new) | | העמוד לא נמצא \| נובידאה (23) | Not needed (`noindex`) |
| `/accessibility` (returning) | | הצהרת נגישות \| נובידאה | Describe the site's accessibility level (IS 5568, WCAG 2.1 AA) and how to contact the accessibility coordinator |

Notes: "ISO, SOC2" and "Salesforce" are already on the site from the Novidea content document. Before launch, confirm which ISO standard (e.g. 27001) so the claim is exact (open question Q7). If the quotes on `/why-novidea` aren't approved by launch, drop "וגם: מה אומרים לקוחות…" from its description.

### 4.2 Headings

| Page | Request | Effort |
|---|---|---|
| `/` | h1 rest: add "ביטוח": "פלטפורמת הענן המובילה לניהול סוכנויות **ביטוח** ובתי סוכן". Keeps the source wording, adds the topic word | S |
| `/capabilities` | h1 has no topic. Option: "יכולות ליבה: מערכת אחת לסוכנות, מקצה לקצה", or keep the h1 and add an intro sentence (`header.intro`) that says "מערכת לניהול סוכנויות ביטוח ובתי סוכן" | S |
| `/contact` | h1 is the question "מוכנים להוביל את הסוכנות לעידן הבא?". Fine for conversion; the intro already says "שיחת היכרות והדגמה". Keep | — |
| `/solution` | Good: h2s and h3s already name the Israeli integrations (מסלקה, הר הביטוח, פרודוקציה). Keep | — |
| `/why-novidea`, `/israel` | Good. Keep | — |

### 4.3 Internal links (no code needed: the `links` block already exists)

Add a short `links` block near the end of each internal page ("להמשך קריאה"), 2 to 3 items with descriptive titles, reusing the summaries already on the home page:

| From | Link to |
|---|---|
| `/solution` | `/capabilities`, `/why-novidea` |
| `/capabilities` | `/solution` (integrations), `/israel` (implementation and support) |
| `/why-novidea` | `/capabilities`, `/israel` |
| `/israel` | `/solution`, `/why-novidea` |

Also link key phrases inside body text where it reads naturally (e.g. on home, "מערכת ליבה לסוכנות" → `/solution`). This needs inline links in `text` blocks, which `prose` supports but `text` doesn't yet (Structure + Code, S, optional).

### 4.4 Content additions (when Novidea can supply facts)

| Page | Addition | Why | Needs from Novidea |
|---|---|---|---|
| Home (video) | 2 to 3 sentences under the video saying what it shows, plus Hebrew captions | Indexable text for the video; captions are an accessibility requirement | Captions file; confirm the video's subject |
| `/israel` | Where the office is, how implementation works (phases already named: אפיון, הסבה, עבודה שוטפת), support hours | Thin page (122 words); local trust | Address, support hours, process steps (all need a source) |
| `/solution` or `/contact` | "שאלות נפוצות" section: e.g. "האם המערכת מתחברת למסלקה הפנסיונית ולהר הביטוח?", "כמה זמן לוקחת הסבה?", "האם יש תמיכה בעברית?" | Matches question searches and AI answers. (FAQ rich results are no longer shown for most sites, so this is for the text, not for stars in Google) | Approved answers |
| `/why-novidea` | Link quotes to published case studies when they exist | Trust; link targets | Case study URLs |

Alt text: no changes needed. Keep alt text descriptive and in Hebrew, without keyword stuffing.

---

## 5. Technical SEO checklist

Status: ✗ missing · ~ partial · ✓ done.

| # | Item | Status | Request | Owner | Effort |
|---|---|---|---|---|---|
| T-0 | **One site URL setting** | ✗ | `astro.config.mjs`: `site` from `SITE_URL` (env, via `astro:env` or `process.env`). Fallback order: `SITE_URL` → `https://${VERCEL_URL}` on Vercel previews → `http://localhost:4321` locally. Document `SITE_URL` and `ALLOW_INDEXING` in `.env.example` (`AGENTS.md` §4.6). Every absolute URL (canonical, hreflang, sitemap, OG, JSON-LD) is built from `Astro.site`. Until launch, set `SITE_URL` in Vercel's Production env to the temporary URL, so link previews work | Code | S |
| T-0b | Record the decision | ✗ | Update `docs/sitemap.md` "SEO per page" and "Production" with: the `SITE_URL` + `ALLOW_INDEXING` settings, the trailing-slash rule and the canonical rule | Structure | S |
| T-1 | **Indexing switch** | ✗ | §2: `ALLOW_INDEXING` (default false) → `<meta name="robots" content="noindex">` on every page; host-scoped `X-Robots-Tag: noindex` for the `vercel.app` host in `vercel.json` | Code | S |
| T-2 | **robots.txt** | ✗ | Generate it from an endpoint (`src/pages/robots.txt.ts`), not a static file, so the sitemap URL comes from `site`. Content: `User-agent: *` / `Allow: /` and, only when indexing is on, `Sitemap: <site>/sitemap-index.xml`. Never `Disallow: /` (see §2) | Code | S |
| T-3 | **sitemap.xml** | ✗ | Add `@astrojs/sitemap` (official integration; needs `site`). Exclude `/404`. When `/en/` exists, use its `i18n` option (`he: 'he-IL', en: 'en'`) so the sitemap carries hreflang too | Code | S |
| T-4 | **Canonical** | ✗ | In `BaseLayout.astro`: `<link rel="canonical" href={new URL(pathname, Astro.site)}>`, absolute, self-referencing, **no trailing slash** (matches the nav links). No canonical on the 404 page | Code | S |
| T-5 | **One URL per page** | ✗ | `vercel.json`: `"trailingSlash": false` and `"cleanUrls": true`, so `/solution/` → `/solution` and `/index.html` → `/` (Vercel returns 308, which Google treats as permanent). Set `trailingSlash: 'never'` in `astro.config.mjs` to match. Verify every page still returns 200 at its clean URL | Code | S |
| T-6 | **Hebrew 404** | ✗ | `src/pages/404.astro` with `BaseLayout` (Vercel serves `404.html` with status 404). `noindex`; links to home and the main pages; title "העמוד לא נמצא \| נובידאה". Copy from Content; Structure adds `/404` to the content model | Code, Content, Structure | S |
| T-7 | **hreflang** | n/a now | Hebrew-only today: no hreflang tags (a lone self-reference adds nothing). When an English page exists, each page of the pair carries all three, absolute and reciprocal: `hreflang="he-IL"` → Hebrew URL, `hreflang="en"` → English URL, `hreflang="x-default"` → **Hebrew URL** (Hebrew is the default market). Pages without a counterpart get none. Generate from one mapping (Structure owns it in `sitemap.md`; `BaseLayout` already has `alternateHref`). See Q3 for novidea.com | Structure (map), Code | S (when `/en/` is built) |
| T-8 | **Open Graph + Twitter** | ✗ | In `BaseLayout`: `og:type=website`, `og:site_name`, `og:title`, `og:description` (from `seo`), `og:url` (= canonical), `og:locale=he_IL`, `og:image` (absolute, + `og:image:width/height/alt`), `twitter:card=summary_large_image`. Structure adds an optional `seo.image` field (page-specific share image, falls back to the default) | Code, Structure | S |
| T-9 | **Share image** | ✗ | Default 1200 × 630 JPG, under 300 KB (WhatsApp may drop large images), logo + one short Hebrew line, key content in the centre (WhatsApp sometimes crops to a square). Hebrew alt text for `og:image:alt` | Design, Content | S |
| T-10 | **JSON-LD: Organization** (home) | ✗ | `Organization`: `name` "Novidea", `alternateName` "נובידאה", `url` (site), `logo` (absolute), `sameAs` (official profiles; novidea.com lists Facebook, LinkedIn, YouTube, Instagram, to be confirmed for this site, Q5). Consider `@id` pointing at novidea.com's organization so both sites describe one company (Q3). No address or phone until confirmed (Q5) | Structure (spec), Code | S |
| T-11 | **JSON-LD: WebSite** (home) | ✗ | `WebSite` with `name`, `alternateName`, `url`, `inLanguage: "he-IL"`, `publisher` → the Organization `@id`. No `SearchAction` (there's no site search) | Structure, Code | S |
| T-12 | **JSON-LD: BreadcrumbList** (internal pages) | ✗ | Two levels: עמוד הבית → current page, using the nav labels. Can also be shown visually later; not required | Structure, Code | S |
| T-13 | **JSON-LD: VideoObject** (home) | ✗ | Optional, low value: Google now shows video results mainly for pages where the video is the main content, which the home page isn't. If added: `name`, `description`, `thumbnailUrl` (poster), `uploadDate` (Q6), `duration` `PT1M19S`, `contentUrl`. Captions and a short text summary matter more | Code, Content | S |
| T-14 | **No review markup for quotes** | — | Don't add `Review` / `AggregateRating` for the customer quotes: self-written reviews aren't eligible and can lead to a manual action | Code | — |
| T-15 | **Core Web Vitals** | ~ | Run Lighthouse (mobile) on all pages against the budget in `AGENTS.md` §3.4 and add Lighthouse CI. Things to watch: cross-origin Bootstrap CSS blocks rendering (accepted in ADR 0001; `preconnect` is there); Rubik font swap and the consent banner must not shift content (CLS < 0.1); hero image is already prioritised | Testing (measure), Code (fix) | M |
| T-16 | **Video** | ~ | Captions (Hebrew `.vtt`) before launch; a 15 to 25 MB encode for mobile (`Open tasks.md` §3a). If it moves to YouTube on Novidea's channel (Hebrew title and description), it can rank in YouTube and Google video results; load the player only after consent | Content, Code | S–M |
| T-17 | **SEO checks in CI** | ✗ | Playwright, per page: one absolute canonical equal to `site + path`; title and description present and unique (title test exists); `noindex` present when `ALLOW_INDEXING` is off and absent when on; JSON-LD parses; `og:image` returns 200; `/robots.txt` 200; sitemap lists every indexable page and not `/404`; unknown URL → status 404 with Hebrew page; `/solution/` → 308 to `/solution`. A grep check that no domain is hard-coded in `src/`. Post-deploy smoke check on production after launch: **no** `noindex` | Testing | M |
| T-18 | **Accessibility statement back** | ✗ | `Open tasks.md` §1. Legal requirement; also a normal indexable page | Content, Code | S |
| T-19 | Heading order in source | ~ | Low: consider making the consent-dialog and mobile-menu titles not `h2` (or move them after `<main>` in source) so the `h1` is the first heading. Only if it doesn't hurt accessibility | Design, Code | S |

---

## 6. Launch-day checklist (final domain)

**Before launch day**
- [ ] Domain decided and recorded in an ADR (`docs/decisions/`) (Q1).
- [ ] All "before launch" items in `Open tasks.md` §1 done (privacy placeholders, accessibility statement, captions, quote approvals). No `TODO(verify)` left (`grep -rn "TODO(verify)" src`).
- [ ] T-0 to T-12 and T-17 merged; CI green.
- [ ] DNS access ready for Search Console verification (TXT record).

**Launch day, in order**
1. Add the final domain to the Vercel project (Settings → Domains) and wait for the certificate.
2. In Vercel's *Production* environment: `SITE_URL=https://<final-domain>` and `ALLOW_INDEXING=true`. Redeploy.
3. **301/308 from the temporary host to the final domain, path kept.** Either set the `vercel.app` domain to redirect in Vercel's Domains settings, if the dashboard allows it for that domain, or add a host-conditional redirect in `vercel.json` (Code):
   ```json
   "redirects": [
     { "source": "/:path*", "has": [{ "type": "host", "value": "novidea-israel.vercel.app" }],
       "destination": "https://<final-domain>/:path*", "permanent": true }
   ]
   ```
   If `www` and the bare domain both exist, redirect one to the other too.
4. Check on the live final domain (Testing, or by hand):
   - every page returns 200, has **no** `noindex` (meta or header) and a canonical on the final domain;
   - `https://<final-domain>/robots.txt` has the `Sitemap:` line; the sitemap lists only final-domain URLs;
   - `https://novidea-israel.vercel.app/solution` → 301/308 → `https://<final-domain>/solution`;
   - share a page link on WhatsApp and LinkedIn: preview shows title, description and image (LinkedIn Post Inspector refreshes the cache).
5. **Google Search Console:** add a *Domain* property (DNS TXT verification, no code change). Submit `sitemap-index.xml`. Use URL Inspection → "Request indexing" on the home page and the main pages.
6. **Bing Webmaster Tools:** import the site from Search Console (fastest), submit the sitemap.
7. Ask whoever manages novidea.com to link to the Israeli site (footer or a country selector), and, if agreed, add the cross-domain hreflang (Q3).

**First 4 to 6 weeks**
- Weekly: Search Console → Pages (all pages indexed? any "Excluded by noindex"?), Sitemaps (read successfully?), 404s.
- Check the temporary host disappears from results (`site:novidea-israel.vercel.app` should stay empty).
- Search the brand ("נובידאה", "Novidea ישראל") and check which site appears and how the result looks.
- Core Web Vitals report once there's enough traffic (may take weeks for a small B2B site; until then rely on Lighthouse CI).
- Keep the `vercel.app` redirect in place permanently.

---

## 7. Measurement plan

| What | Tool | Notes |
|---|---|---|
| Indexing, queries, clicks, positions | Google Search Console (Domain property), Bing Webmaster Tools | No consent needed: no code runs on the visitor's device |
| Organic visits and conversions | GA4 or HubSpot tracking, **only after analytics consent** through the existing consent gate (`Open tasks.md` §6) | If GA4: load nothing before consent. Numbers will undercount visitors who decline; read trends, not totals |
| Leads from search | HubSpot (form source / original source) | Already on `/contact` |
| Speed | Lighthouse CI (lab) on every PR; Search Console Core Web Vitals (field) when available | Budget in `AGENTS.md` §3.4 |

**KPIs** (targets to set with Novidea after 3 months of data; no baseline yet):
1. Indexed pages = all indexable pages in the sitemap (8 with the accessibility statement).
2. Brand: "נובידאה" / "Novidea" queries from Israel show the Israeli site in the top results.
3. Non-brand impressions and clicks for the query groups in §3 (track by page).
4. Organic sessions (consented) and organic leads (HubSpot) per month.
5. All pages pass the Lighthouse budget; no Core Web Vitals issues in Search Console.

Review monthly in the first quarter; update §3 with the queries people actually use.

---

## 8. Prioritised roadmap

### Now (temporary URL)
1. T-1 indexing switch + host `noindex` (Code, S)
2. T-0 `SITE_URL` setting, T-0b record it (Code, Structure, S)
3. T-4 canonical + T-5 one URL per page (Code, S)
4. T-2 robots.txt + T-3 sitemap.xml (Code, S)
5. T-6 Hebrew 404 (Code, Content, Structure, S)
6. §4.1–4.2 titles, descriptions, h1 tweaks (Content, S)
7. T-8/T-9 Open Graph + share image (Code, Structure, Design, Content, S)
8. T-10–T-12 JSON-LD Organization, WebSite, BreadcrumbList (Structure, Code, S)
9. §4.3 internal links between topic pages (Content, S)
10. T-17 SEO checks in CI + T-15 Lighthouse run (Testing, M)

### At launch
- §6 checklist: `SITE_URL`, `ALLOW_INDEXING=true`, 301 from `vercel.app`, Search Console + Bing, sitemap submission.
- T-18 accessibility statement back; captions on the video (T-16).
- Link from novidea.com; cross-domain hreflang if agreed (Q3).

### After launch (first quarter)
- Analytics behind consent; monthly Search Console review; replace §3 guesses with real queries.
- §4.4 content additions (`/israel`, FAQ, video summary) as Novidea supplies facts.
- Blog (`/blog`, already planned) with informational articles from §3 (e.g. "מה זה מסלקה פנסיונית ולמה זה חשוב לסוכנות", "איך לבחור מערכת לסוכנות ביטוח") and customer stories with public sources (Mivtach Simon 2023 announcement; Colmobil, January 2026). Each article links to the matching product page. (Structure, Content, Code, L)
- Possible integration pages for high-intent long-tail queries (מסלקה, הר הביטוח, פרודוקציה) if Search Console shows demand (Structure decides, M).
- English `/en/` with hreflang (T-7), written for Israeli readers so it doesn't duplicate novidea.com.
- Digital PR: Hebrew coverage of Israeli customer wins (the Walla and Calcalist coverage shows Israeli media cover Novidea) with links to the Israeli site.

---

## 9. Open questions for Novidea

| # | Question | Why it matters |
|---|---|---|
| Q1 | **Which domain?** Options: `novidea.co.il` (clear local signal, starts with no authority), `il.novidea.com` (subdomain, partly shares the brand), or a folder on novidea.com such as `novidea.com/he/` (most authority, but needs a reverse proxy because novidea.com runs on a different platform). | Decides the launch checklist and how much existing authority the site inherits |
| Q2 | Is there any old Israeli/Hebrew page or domain (e.g. on novidea.com) with links that should redirect to the new site? | 301s at launch keep their value |
| Q3 | Will novidea.com link to the Israeli site, and can its team add `hreflang="he-IL"` pointing here (with the reverse tags on our side)? novidea.com currently declares `en`, `en-us` and `x-default` only. | Helps Google show the right site to Israeli searchers; must be reciprocal |
| Q4 | Official Hebrew spelling of the brand: "נובידאה" only, or also "נובידיאה"? | Keyword map and `alternateName` |
| Q5 | Which social profiles go in `sameAs` (novidea.com lists Facebook, LinkedIn, YouTube, Instagram)? May we publish the Israeli office address and phone (structured data, `/israel`, a Google Business Profile)? | Organization data; local trust |
| Q6 | Video: when was it first published, does it have narration, and may it go on Novidea's YouTube channel? | Captions (legal), VideoObject, video search |
| Q7 | Which certifications exactly (ISO 27001? SOC 2 Type II?) and is there a public source? | The claim is on `/why-novidea` and in the proposed description; `AGENTS.md` §3.5 |
| Q8 | Which search terms do prospects use in sales calls, and which competitors do you lose deals to (we saw Surense and Sheva in search results)? | Replaces guesses in §3 |
| Q9 | Who owns Search Console / Bing for the new domain, and who has DNS access? Which analytics tool (GA4 or HubSpot)? | Launch day and measurement |
| Q10 | Approval of the default share image (logo + Hebrew line) | T-9 |

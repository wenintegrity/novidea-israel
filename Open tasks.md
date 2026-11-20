# Open tasks

Everything still open on the Novidea Israel site, to be handled later. Last updated 20/11/2026.

Live site: https://novidea-israel.vercel.app/ · Repo: `wenintegrity/novidea-israel` (deploys on push to `main`).
To find every content placeholder: `grep -rn "TODO(verify)" src` and look for highlighted `[לעדכון: …]` text on the legal pages.

---

## 1. Legal and compliance (before launch)

- [ ] **Privacy policy: fill in the placeholders** ([privacy.yaml](src/content/pages/he/privacy.yaml), page `/privacy`): registered company name and company number (ח.פ.), privacy contact email, mailing address, data retention period.
- [ ] **Privacy policy: legal review** of the whole draft, especially the transfer-abroad wording (HubSpot stores data outside Israel) and marketing consent.
- [ ] **Accessibility statement: put it back on the site.** Removed on 20/11/2026 at the owner's request, but Israeli law (regulation 35, IS 5568) requires it, and AGENTS.md §4.3 too. The draft is in [docs/drafts/accessibility.he.yaml](docs/drafts/accessibility.he.yaml): move it back to `src/content/pages/he/accessibility.yaml`, re-add the footer link (`Footer.astro`, `footer.accessibility` in `ui.ts`) and the page to `tests/e2e/site.spec.ts`.
- [ ] **Accessibility statement: accessibility coordinator details** (in the draft above): name, phone, email, mailing address. Required by regulation 35.
- [ ] **Accessibility statement: manual check** with a screen reader (NVDA on Windows, VoiceOver on Mac/iPhone) and keyboard only; record the results and date in the statement's "איך בדקנו" section.
- [ ] **Cookie banner wording: legal review** ([ui.ts](src/i18n/ui.ts), `consent.*` strings).
- [ ] **Picture licences:** confirm the brand pictures in `src/assets/brand/` may be used on the Israeli site.

## 2. Content questions (Novidea marketing)

- [ ] **/capabilities, "דשבורדים ודוחות עסקיים בזמן אמת":** the source text reads "בזמן אמת על בסיס, שניתן לבנות…" and seems to be missing a word after "על בסיס". Temporary wording is on the site.
- [ ] **/capabilities, "טיפול בפניות שירות":** confirm "מנגנון מוצרי מלא של Mail to Case" is the intended wording.
- [x] **Customer logos** on the home page (supplied 20/11/2026).
- [ ] **Customer logos: permission and quality.** Confirm written permission to show the מבטח סימון, קלי and GUR logos (design-system.md §10.10). The מבטח סימון and kali files are low resolution and look soft on high-density screens; ask for SVG or larger PNGs.
- [ ] **Brand details:** confirm the brand red (`#ED4443` vs RGB 234/68/67), approve Rubik as the Hebrew typeface, and confirm the 2022 brand book is still current.

## 3. HubSpot form (in HubSpot, not in the site code)

The site embeds form `05171e84-3123-41fc-81e0-3f8626cb3574` (portal 2799426) on `/contact`, after marketing-cookie consent.

- [ ] **Fields to match the content document:** שם מלא · שם הסוכנות / בית הסוכן · תפקיד (מנכ"ל / סמנכ"ל תפעול / מנהל מערכות מידע / אחר) · דוא"ל עסקי · טלפון · גודל הסוכנות (10-30 / 30-100 / 100+ משתמשים). The form currently has first name, last name, company, email and phone, without role or agency size.
- [ ] **Submit button:** "השאירו פרטים" in Hebrew and in the site's navy (currently "Submit", orange).
- [ ] **Hebrew error messages** and a quick keyboard / screen-reader check of the form.

## 4. Technical (no input needed)

- [ ] **Security headers** in `vercel.json`: Content-Security-Policy (allowing only jsDelivr and HubSpot's domains), HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (AGENTS.md §4.6).
- [ ] **SEO basics:** `robots.txt`, `sitemap.xml`, canonical URLs, link-preview tags (Open Graph) with a share image, favicon (currently missing), Organization structured data.
- [ ] **Hebrew 404 page.**
- [ ] **Performance audit** with Lighthouse against the AGENTS.md budget (Performance ≥ 90, Accessibility = 100, SEO = 100, Best Practices ≥ 95).
- [ ] **CI on GitHub:** build and run the Playwright tests on every push and pull request; protect `main`; add Dependabot or Renovate.
- [ ] **Build size:** unused icon originals (about 2 MB) are copied into the build. Visitors don't download them; clean up if deploy size matters.

## 5. Decisions needed

- [ ] **Custom domain** for the site. Needed for canonical URLs, `sitemap.xml`, `hreflang` and Google Search Console (`site` in `astro.config.mjs`).
- [ ] **Old repo** `wenintegrity/novidea-israel-minisite` (not the deploy source; still a local remote named `minisite`): archive or delete.
- [ ] **Duplicate picture files** in `src/assets/brand/`: `Group 1013.png`, `Group 1013 2.png` and `Group 1274.png` are identical; keep one.

## 6. Later (roadmap)

- [ ] **Blog** section (`/blog`), with the customer-conference and Colmobil stories as first posts.
- [ ] **English version** (`/en/…`) and the language switcher; Poppins and Campton (Campton needs a web licence).
- [ ] **Analytics** (GA4 or HubSpot tracking), loaded through the existing cookie-consent gate.
- [ ] **Bootstrap 6** migration once it's stable (ADR 0001; `bootstrap-v5-v6-migration` skill).

## Local setup note

- Node.js was installed portably in `%LOCALAPPDATA%\Programs\node\node-v26.13.1-win-x64` and isn't on the system PATH. Add that folder to PATH (or install Node.js LTS normally) to run `npm` in a new terminal.

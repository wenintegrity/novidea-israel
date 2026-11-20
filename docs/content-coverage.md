# Content coverage: "תוכן לדף אתר NOVIDEA בעברית" vs the Hebrew site

**Owner:** Content agent (`content`) · **Status:** proposal, nothing applied · **Date:** 20/11/2026

**Question asked by the owner:** does the site cover every item in the content document? The wording can differ, but no item, and especially no product module or capability, may be missing or weakened.

**Short answer:** yes for all reader-facing copy. Every heading, sentence, module, capability, advantage and Israel bullet is on the site, including all three "בקרוב" marks and every named integration. The gaps are:
1. **The lead form** (HubSpot, not site code): two of the six fields ("תפקיד" and "גודל הסוכנות") don't exist, and two more ("שם הסוכנות / בית הסוכן", "דוא״ל עסקי") exist only under generic labels. This is already open in `Open tasks.md` §3.
2. **One "בקרוב" module is shown smaller than in the document.** Automatic download of production files from the insurers' websites is its own bullet in the document, but on `/solution` it's a small note under another card.
3. **One wording conflict on `/platform`.** The page says the system connects directly to הר הביטוח. The document says the connection is to פוליוויז, which pulls the הר הביטוח data.

## How this was checked

- **Document:** `docs/sources/content-document.he.md`. The owner confirmed it matches the PDF they re-attached. Every heading, sentence, bullet, table row and form field counts as one item. Section labels that only say where text goes (for example "כותרת ראשית" or "פתיחת ליד") are counted too and marked "editorial label".
- **Site:** `src/content/pages/he/*.yaml` (home, solution, capabilities, why-novidea, israel, contact, platform), `src/content/shared/he.yaml`, the Hebrew values in `src/i18n/ui.ts`, and the block components to see what actually renders (`FeaturesBlock.astro` for `soon` / `soonNote`, `LeadForm.astro` for `fields`). `/solution` was also checked on the live site (https://novidea-israel.vercel.app/solution, 20/11/2026): all 14 cards and the 3 "בקרוב" labels render as the YAML says.
- **Not verified directly:** the HubSpot form. It loads inside HubSpot's iframe only after marketing-cookie consent, so the repo can't show it. Its current fields come from `Open tasks.md` §3.
- **Pending questions:** items waiting on Novidea in `docs/content-review.md` (Q3–Q18) are referenced here, not re-opened.

## Summary

| Status | Count | Of which editorial labels |
|---|---|---|
| Covered | 67 | 5 |
| Partial | 3 | 0 |
| Missing | 2 | 0 |
| **Total items** | **72** | 5 |

One partial item is a module (M6, how it's displayed on `/solution`). The other two partials and both missing items are HubSpot form fields. No text is missing from the homepage, `/solution`, `/capabilities`, `/why-novidea` or `/israel`.

Field paths: `sections[id]` is the block with that `id`; indexes (`items[n]`, `paragraphs[n]`, `intro[n]`, `names[n]`) count from 1.

---

## 1. Coverage matrix

### 1.1 כותרת ראשית, מסרים נוספים, טקסט מקוצר (homepage)

| # | Document item | Site location | Status | Note |
|---|---|---|---|---|
| H1 | Section label "כותרת ראשית" | `home.yaml` `hero` | Covered (editorial label) | |
| H2 | "נובידאה - פלטפורמת הענן המובילה לניהול סוכנויות ובתי סוכן" | `home.yaml` `hero.titleStrong` + `hero.titleRest`; also `shared/he.yaml` `footerAbout` | Covered | The site adds "ביטוח" ("סוכנויות ביטוח"), which is clearer and better for SEO |
| H3 | Section label "מסרים נוספים" | `home.yaml` `hero.lead` | Covered (editorial label) | |
| H4 | "כל עולם הביטוח הישראלי. מערכת אחת אחודה. אינסוף אפשרויות צמיחה." | `home.yaml` `hero.lead` | Covered | Verbatim. The optional style change ("אחודה") in content-review §3.1 wasn't approved and doesn't affect coverage |
| H5 | Section label "טקסט מקוצר" | `home.yaml` `sections[overview]` | Covered (editorial label) | |
| H6 | Digital revolution in insurance, InsurTech cloud platform, data-driven, international awards | `home.yaml` `sections[overview].paragraphs[1]`, first sentence | Covered | "מונחית" is the approved spelling fix |
| H7 | Speeds up growth, profitability and operational efficiency for agencies and brokers, with analytics tools and real-time business insights | `sections[overview].paragraphs[1]`, second sentence | Covered | |
| H8 | Strong CRM base on Salesforce, a core system for the agency, the client at the center, connecting all the agency's processes | `sections[overview].paragraphs[2]` | Covered | |
| H9 | "מתיאום פגישות, מכירות, הפקה, פרודוקציה וניהול שירות ועד ניהול תביעות וחידושים…" | `sections[overview].paragraphs[3]` | Covered | All seven stages are there |
| H10 | "הפלטפורמה שמובילה את הסוכנויות ובתי הסוכן הגדולים בישראל" | `home.yaml` `sections[customers].title`; same on `/platform` | Covered | |
| H11 | מבטח סימון | `sections[customers].names[1]` (logo; the name is its alt text) | Covered | |
| H12 | קלי | `sections[customers].names[2]` | Covered | The logo reads "kali.group". Official name pending (Q9) |
| H13 | אמנון גור | `sections[customers].names[3]` | Covered | The logo reads "GUR קבוצת ביטוח". Official name and alt text pending (Q9) |
| H14 | "ועוד" | `sections[customers].more` | Covered | |

### 1.2 הבעיה והפתרון (`/solution`)

| # | Document item | Site location | Status | Note |
|---|---|---|---|---|
| S1 | Section label "הבעיה והפתרון" | `ui.ts` `nav.solution`; `home.yaml` `sections[explore].items[1].title` | Covered | Used as the page's menu label |
| S2 | "נפרדים מעבודה עם ריבוי מערכות ומצווארי בקבוק תפעוליים" | `solution.yaml` `header.title` (h1); also home `explore.items[1].body` | Covered | |
| S3 | "במשך שנים… עשרות מסכים, פורטלים של יצרנים, קובצי אקסל ומערכות Legacy ישנות שאינן מתקשרות ביניהן." | `solution.yaml` `header.intro[1]`, first sentence | Covered | |
| S4 | "התוצאה: עומס תפעולי כבד, סרבול בעבודה, איבודי מידע וקושי בצמיחה." | `header.intro[1]`, second sentence | Covered | All four outcomes; "אובדן מידע" is the approved fix |
| S5 | "נובידאה מביאה קונספט אחר - Single Source of Truth" | `sections[single-source-of-truth].title` | Covered | |
| S6 | One platform for all agency activity: pension, general (P&C), financial and personal lines | `sections[single-source-of-truth].paragraphs[1]`, first sentence | Covered | All four lines of business |
| S7 | "מניהול הליד הראשוני ועד קליטת פרודוקציה, ניהול התביעה והשירות." | same paragraph, second sentence | Covered | |
| S8 | Open API architecture, connects easily to any tool, portal or interface | same paragraph, third sentence | Covered | |
| S9 | "בנובידאה תמצאו מגוון מודולים ויכולות המותאמים לשוק הישראלי:" | `sections[modules].title` | Covered | |

#### Modules (the 15 bullets)

`/solution` has 14 cards for the 15 bullets: bullet M6 appears as a `soonNote` under card 5.

| # | Document bullet | Site location (`solution.yaml` `sections[modules]`) | Status | Note |
|---|---|---|---|---|
| M1 | אינטגרציות מובנות לרכיבים מרכזיים באקו-סיסטם הביטוחי בישראל | `items[1].title` | Covered | No body, same as the document |
| M2 | ממשקים למסלקה הפנסיונית ולהר הביטוח: direct connection to the pension clearing house and **פוליוויז** for הר הביטוח data and policy copies | `items[2]` title + body | Covered | All names present: מסלקה, פוליוויז, הר הביטוח, העתקי פוליסות. See X1 for `/platform` |
| M3 | Returns and exposure tracking: built-in integration with **ביטוח-נט, גמל-נט ופנסיה-נט**, monthly | `items[3]` | Covered | All three sites named, plus "מדי חודש" |
| M4 | Integration with **רשות המסים**: automatic submission of the employment-termination form (טופס עזיבת עבודה) for arrangement agencies | `items[4]` | Covered | Includes "סוכנויות הסדרים" |
| M5 | Production and insurers: an advanced, flexible engine for importing production files from Israeli insurers | `items[5]` title + body | Covered | |
| M6 | **בקרוב:** the system logs in to insurers' websites by itself, downloads the production files and imports them | `items[5].soonNote` (with a "בקרוב" label) | **Partial** | The text and the "בקרוב" label are intact. But a standalone bullet in the document is a smaller-type note under M5 on the site, while the other standalone "בקרוב" bullet (M8) gets its own card. Fix: P1 |
| M7 | Real-time simulators and quotes: built-in interface to **פורמלי**'s sales simulator and **קוואלה**'s car price-quote engine | `items[6]` | Covered | Both names present. Term "ציטוט" pending (Q12) |
| M8 | **בקרוב:** renewal price quote. The system logs in to insurers' websites and enters the policy data to produce a renewal quote | `items[7]` with `soon: true` (label above the title) | Covered | The "בקרוב" label is shown |
| M9 | Digital channels and lead capture: direct connections to tech partners and digital networks, real time | `items[8]` | Covered | |
| M10 | General (P&C) production import: car, home and business policies from insurers' files into the client file | `items[9]` | Covered | |
| M11 | Full client-portfolio report; **בקרוב:** automatic email monthly, quarterly, half-yearly or yearly | `items[10]` body + `soonNote` | Covered | The "בקרוב" mark is shown on the extra, as in the document |
| M12 | Renewals mechanism: all car, home and business policies renewing soon, with tracking of each renewal | `items[11]` | Covered | The body uses "בקרוב" as plain text ("שמתחדשות בקרוב"), next to "בקרוב" labels that mean "coming soon". The rewrite in content-review §3.2 removes the ambiguity (pending, not re-opened) |
| M13 | Fleet tools, importing policy copies, syncing special terms | `items[12]` title + body | Covered | |
| M14 | Full Open API: third-party systems, call center, customer portal, enterprise app | `items[13]` | Covered | All four targets present |
| M15 | Group health policies (קולקטיבים): importing Excel files, managing policies, employees and family members, tracking enrollment status | `items[14]` | Covered | |

### 1.3 יכולות ליבה: מקצה לקצה (`/capabilities`)

| # | Document item | Site location (`capabilities.yaml`) | Status | Note |
|---|---|---|---|---|
| C1 | "יכולות ליבה: מקצה לקצה" | `header.title` (h1); `ui.ts` `nav.capabilities`; home `explore.items[2].title` | Covered | |
| C2 | Group "ניהול מסע לקוח" | `sections[customer-journey].title` | Covered | |
| C3 | מליד ועד פוליסה: scheduling, הזנקת הר הביטוח, pre-advice, meeting prep, importing simulator output after the sale, clearing-house and personal-lines data, quote and issuance | `sections[customer-journey].items[1]` | Covered | Verbatim, every step present. Jargon pending (Q13) |
| C4 | תמונת לקוח 360° עם תובנות AI: client and family analysis, insurance gaps, coverage recommendations | `sections[customer-journey].items[2]` | Covered | Whether this is live or a preview is pending (Q18, F5) |
| C5 | Group "תפעול, שירות ו-BPM מתקדם" | `sections[operations].title` | Covered | |
| C6 | BPM: automated service, claims and renewal processes, SLA, built-in team tasks, manager tools for control and workload routing | `sections[operations].items[1]` | Covered | |
| C7 | Paperless Office: smart filing, digital signatures, automatic letters, proposals and forms, **Docomotion** | `sections[operations].items[2]` | Covered | |
| C8 | Service requests: full **Mail to Case** mechanism, fast service, full monitoring | `sections[operations].items[3]` | Covered | Existing TODO(verify) on "מנגנון מוצרי מלא" (Q3) |
| C9 | Group "דשבורדים, BI וקבלת החלטות" | `sections[dashboards].title` | Covered | |
| C10 | Real-time business dashboards and reports, built without development or technical knowledge | `sections[dashboards].items[1]` title + body | Covered | "עסקיים" and "בזמן אמת" are in the title. Existing TODO(verify) on the word missing after "על בסיס" (Q4) |
| C11 | Production data control: checking production data against what's recorded in the system, to fix issues and improve profitability | `sections[dashboards].items[2]` | Covered | |

### 1.4 למה נובידאה? (`/why-novidea`)

| # | Document item | Site location (`why-novidea.yaml`) | Status | Note |
|---|---|---|---|---|
| W1 | "למה נובידאה?" | `header.title` (h1); `ui.ts` `nav.why`; home `explore.items[3].title` | Covered | |
| W2 | Table header "היתרון / מה זה אומר עבור הסוכנות שלך?" | `header.intro[1]` ("…שלכם?") + card title/body = advantage/meaning | Covered | Plural address, per the style rules |
| W3 | Cloud-Native אמיתי: access from anywhere, no local servers, continuous updates, zero downtime | `sections[advantages].items[1]` | Covered | "אפס זמני השבתה" is kept here; it's pending (Q6) |
| W4 | Global product on one of the strongest CRMs, deeply adapted to the Israeli market | `sections[advantages].items[2]` | Covered | |
| W5 | Security and privacy: ISO, SOC2, privacy regulations | `sections[advantages].items[3]` | Covered | Whose certifications these are is pending (Q5, F4) |
| W6 | AI-driven innovation: automation, shorter operating times, data-driven insights | `sections[advantages].items[4]` | Covered | "מבוססת" replaces "מונעת" (approved) |

### 1.5 המטה כאן בישראל (`/israel`)

| # | Document item | Site location (`israel.yaml`) | Status | Note |
|---|---|---|---|---|
| I1 | "המטה כאן בישראל – יחד איתכם בכל שלב" | `header.title` (h1); `ui.ts` `nav.israel`; home `explore.items[4]` | Covered | |
| I2 | Global company with operations in London, the US and Europe; heart, HQ and R&D in Israel | `header.intro[1]` | Covered | Verbatim. The office wording conflicts with the press releases (F2, Q7, pending) |
| I3 | "כשאתם עובדים עם נובידאה… מעטפת מקומית מקצה לקצה:" | `header.intro[2]` | Covered | |
| I4 | Local management, product and R&D | `sections[local-support].items[1]` | Covered | |
| I5 | Customer Success and dedicated implementation support, from specification through migration to daily work | `sections[local-support].items[2]` | Covered | |
| I6 | Technical support in Hebrew, matched to local working hours and patterns | `sections[local-support].items[3]` | Covered | |

### 1.6 פתיחת ליד (lead banner, `/contact`, `/platform`)

| # | Document item | Site location | Status | Note |
|---|---|---|---|---|
| L1 | Section label "פתיחת ליד" | `shared/he.yaml` `leadCta` (every page except `/contact` and `/platform`); `/contact`; `/platform` `sections[lead-form]` | Covered (editorial label) | |
| L2 | "מוכנים להוביל את הסוכנות לעידן הבא?" | `contact.yaml` `header.title`; `shared/he.yaml` `leadCta.title`; `platform.yaml` `sections[lead-form].title` | Covered | |
| L3 | "הצטרפו לסוכנויות המובילות בישראל שמנהלות את תיק הלקוחות שלהם וצומחות בנובידאה." | `contact.yaml` `header.intro[1]`; `leadCta.body`; `platform.yaml` `sections[lead-form].intro` | Covered | "שלהן" is the approved fix |
| L4 | "השאירו פרטים והצוות שלנו יחזור אליכם לשיחת היכרות והדגמה." | same three fields | Covered | |
| L5 | Label "שדות הטופס:" | `contact.yaml` `sections[lead-form].fields` (reference list) | Covered (editorial label) | `fields` is shown **only if there are no `hubspot` settings**, so visitors never see this list. The real form is HubSpot's |

#### Form fields (HubSpot form `05171e84-…`, portal 2799426)

The site has the six fields only as a reference list (`contact.yaml` `sections[lead-form].fields[1–6]`, not rendered; `/platform` has `fields: []`). `Open tasks.md` §3 says the live HubSpot form has first name, last name, company, email and phone, and no role or agency size.

| # | Document field | In the HubSpot form today | Status | Note |
|---|---|---|---|---|
| F1 | שם מלא | First name + last name | Covered | Same data in two fields. No change needed |
| F2 | שם הסוכנות / בית הסוכן | "Company" field | **Partial** | The field exists, but the document's label isn't confirmed. Fix: P2 |
| F3 | תפקיד (מנכ"ל / סמנכ"ל תפעול / מנהל מערכות מידע / אחר) | No field | **Missing** | Fix: P4. Open tasks §3 |
| F4 | דוא"ל עסקי | "Email" field | **Partial** | The field exists, but "עסקי" (business) isn't confirmed in the label. Fix: P3 |
| F5 | טלפון | Phone | Covered | |
| F6 | גודל הסוכנות (10-30 / 30-100 / +100 משתמשים) | No field | **Missing** | Fix: P5. Open tasks §3. Range overlap pending (Q14) |

---

## 2. Proposed fixes (nothing applied)

### P1. Make M6 its own "בקרוב" card on `/solution` (module M6)

**Where:** `src/content/pages/he/solution.yaml`, `sections[modules]`. Existing fields only; no Structure change.

**Why:** in the document, automatic download of production files is a standalone "בקרוב" bullet, like the renewal-quote bullet (M8). On the site, M8 has its own card with a label and M6 is a small note. As a separate card, the two upcoming automations get equal weight. It also brings the grid to 15 cards, five full rows of three, instead of 14 with a two-card last row.

**Change:**
1. In `items[5]` ("קליטת פרודוקציה ויצרנים"), delete the `soonNote` line.
2. Insert this new item right after `items[5]`:

```yaml
      - icon: time-automation
        title: "קליטה אוטומטית מאתרי חברות הביטוח"
        body: "המערכת תיכנס בצורה אוטומטית לאתרי חברות הביטוח בעצמה, תוריד את קובצי הפרודוקציה ותקלוט אותם למערכת."
        soon: true
```

The body is the current approved `soonNote` text, unchanged. If the owner also approves the style rewrite in content-review §3.2, use this body instead: "המערכת תיכנס בעצמה לאתרי חברות הביטוח, תוריד את קובצי הפרודוקציה ותקלוט אותם אוטומטית." The `time-automation` icon is already in `src/assets/icons/icons.yaml` (used on `/platform`).

**Knock-on for Testing:** if `tests/e2e/site.spec.ts` counts the `/solution` cards (14) or the "בקרוב" labels, the count changes to 15 cards. The number of "בקרוב" labels stays at 3.

### P2–P5. HubSpot form fields (F2, F3, F4, F6)

**Where:** in HubSpot (form `05171e84-3123-41fc-81e0-3f8626cb3574`), not in the site code. This is the open item in `Open tasks.md` §3 ("Fields to match the content document"). Someone with HubSpot access (owner or Novidea marketing) has to make the change. Nothing changes under `src/`: `contact.yaml` `fields` already lists all six.

| Fix | Field | HubSpot label (ready to paste) | Type and options |
|---|---|---|---|
| P2 | F2 | שם הסוכנות / בית הסוכן | Single-line text (the existing Company property) |
| P3 | F4 | דוא״ל עסקי | Email (the existing property) |
| P4 | F3 | תפקיד | Dropdown: מנכ״ל · סמנכ״ל תפעול · מנהל מערכות מידע · אחר |
| P5 | F6 | גודל הסוכנות | Dropdown: 10-30 משתמשים · 30-100 משתמשים · 100+ משתמשים |

Notes:
- P4 and P5 use the document's options, with gershayim (״). Q14 is still pending and isn't re-opened here. It asks whether to make the role inclusive ("מנהל/ת מערכות מידע") and whether to fix the overlapping ranges with no option under 10 ("עד 10 / 11–30 / 31–100 / 100+").
- "100+" is mixed-direction text. After the change, check in the RTL form that it doesn't display as "+100". If it does, write the option as "100 משתמשים ומעלה", which means the same thing and has no direction issue.
- Same open task: set the form language to Hebrew (error messages are in English today).

### P6. `/platform`: point to the full module list (optional, owner decision)

`/platform` is a campaign summary, so it doesn't need every item. Every module is on `/solution` and `/capabilities`. But the campaign page shows none of the Israel-specific integrations (ביטוח-נט, גמל-נט, פנסיה-נט, רשות המסים, פורמלי, קוואלה, קולקטיבים, ציי רכב), and unlike the marketing draft (`docs/marketing/landing-page.he.md` §4: "לכל היכולות ← /capabilities"), it has no link to the full list. If the owner wants campaign visitors to reach them, add an existing `links` block right after `sections[platform]` in `src/content/pages/he/platform.yaml`:

```yaml
  - type: links
    id: more
    title: "כל המודולים והיכולות"
    surface: subtle
    items:
      - icon: puzzle
        title: "הבעיה והפתרון"
        body: "כל המודולים לשוק הישראלי: המסלקה הפנסיונית ופוליוויז, ביטוח-נט, גמל-נט ופנסיה-נט, רשות המסים, פורמלי וקוואלה, קולקטיבים, ציי רכב וחידושים."
        href: "/solution"
      - icon: product-module
        title: "יכולות ליבה: מקצה לקצה"
        body: "ניהול מסע הלקוח, BPM מתקדם, משרד ללא נייר עם Docomotion, טיפול בפניות שירות ודשבורדים בזמן אמת."
        href: "/capabilities"
```

Every fact here is already on those two pages, and both icons are already used on the homepage. `surface: subtle` continues the band of the cards above it; Design/Code may prefer another surface. The trade-off is a marketing call: links off a campaign page can pull visitors away from the form.

---

## 3. Site content not in the document, checked for conflicts

Only conflicts are listed. Extra content that agrees with the document isn't listed: customer quotes, the video, the Ra'anana office section on `/contact`, the footer blurb, SEO text, and the problem cards and summaries on `/platform`.

| # | Where | Site text | Document | Proposed |
|---|---|---|---|---|
| X1 | `platform.yaml` `sections[platform].items[2].body` | חיבור ישיר למסלקה הפנסיונית ולהר הביטוח, כולל העתקי פוליסות. | "חיבור ישיר למסלקה הפנסיונית **ולפוליוויז** לטובת שליפת נתוני הר הביטוח והעתקי הפוליסות" (M2) | **Replace with:** חיבור ישיר למסלקה הפנסיונית ולפוליוויז, לשליפת נתוני הר הביטוח והעתקי פוליסות. The site text claims a direct connection to הר הביטוח, which the document doesn't make: the data comes through פוליוויז. The card title "מסלקה פנסיונית והר הביטוח" can stay (the document's own heading names both). The owner approved this copy (marketing draft), so the owner must approve the change |

Checked and consistent (no action):
- `/platform` drops "אפס זמני השבתה" (W3) and the AI-innovation row (W6). That's acceptable on a summary page; both are in full on `/why-novidea`. W3 is pending Q6 anyway.
- `/contact` "המשרדים שלנו" (Ra'anana, from `docs/sources/office-location.he.md`) agrees with I2 ("המטה… כאן בישראל").
- `footerAbout` and every `seo.*` field use only document facts.

---

## 4. Decisions needed

**Owner**
1. **P1:** approve splitting M6 into its own "בקרוב" card on `/solution`.
2. **X1:** approve the `/platform` wording fix (פוליוויז, not a direct הר הביטוח connection).
3. **P6 (optional):** add a link block from `/platform` to the full module list, or keep the campaign page focused on the form.
4. **P2–P5:** make the HubSpot form changes, or ask Novidea marketing to make them (`Open tasks.md` §3).

**Novidea (already open in `docs/content-review.md` §7, not re-opened)**
- Q14: form ranges and the inclusive role option (affects P4, P5).
- Q3 (Mail to Case, C8) and Q4 (missing word after "על בסיס", C10): the two existing `TODO(verify)` comments in `capabilities.yaml`.
- Q5 (ISO / SOC 2, W5), Q6 (zero downtime, W3), Q7 and F2 (offices, I2), Q9 (customer names, H12 and H13), Q12 ("ציטוט", spellings of פוליוויז / פורמלי / קוואלה, M2 and M7), Q13 (הזנקה, ממשקי פרט, C3), Q18 (AI live or preview, C4).

The existing `TODO(verify)` comments in `src/` are unchanged by this review: `home.yaml` (video captions), `capabilities.yaml` (×2), `why-novidea.yaml` and `platform.yaml` (quote approvals), `privacy.yaml` (×2, legal), and `ui.ts` (consent wording, legal).

# Hebrew content review

**Owner:** Content agent (`content`) · **Status:** partly applied (see "Status" below) · **Date:** 20/11/2026

## Status: applied 20/11/2026

The owner approved two groups: (1) Hebrew corrections that don't change meaning or facts, plus the two `seo.description` fixes, and (2) the Howden, Marsh and Leaderim quote tweaks. Only the **minimal** correction was applied, not the full rewrites proposed in §3. Everything else in this document is still a proposal.

**Applied**

| File | Field | Change |
|---|---|---|
| `pages/he/home.yaml` | `sections[overview].paragraphs[1]` | מונחת נתונים → מונחית נתונים |
| `pages/he/home.yaml` | `sections[overview].paragraphs[2]` | Comma removed before "ולחבר" |
| `pages/he/home.yaml` | `sections[explore].items[3].body` | מונעת → מבוססת בינה מלאכותית |
| `pages/he/solution.yaml` | `header.intro[1]` | איבודי מידע → אובדן מידע |
| `pages/he/solution.yaml` | `sections[single-source-of-truth].title` | " - " → " – " |
| `pages/he/solution.yaml` | `sections[single-source-of-truth].paragraphs[1]` | הפנסיוניים, אלמנטריים, פיננסיים ופרט → הפנסיוניים, האלמנטריים, הפיננסיים והפרט |
| `pages/he/solution.yaml` | `items[3].body` | מידי חודש → מדי חודש |
| `pages/he/solution.yaml` | `items[4].title` | רשות המיסים → רשות המסים |
| `pages/he/solution.yaml` | `items[5].body`, `items[5].soonNote`, `items[9].body` | קבצי → קובצי (מקבצי → מקובצי) |
| `pages/he/solution.yaml` | `items[8].body` | ורשתות דיגיטל → ולרשתות דיגיטל |
| `pages/he/solution.yaml` | `items[10].title`, `items[10].soonNote` | דו"ח → דוח; במייל → בדוא״ל |
| `pages/he/solution.yaml` | `items[11].body` | מעקב על → מעקב אחר |
| `pages/he/solution.yaml` | `items[13].body` | צד-שלישי → צד שלישי |
| `pages/he/capabilities.yaml` | `seo.description` | 360° → 360 מעלות (136 characters) |
| `pages/he/capabilities.yaml` | `customer-journey items[2].body` | Comma removed before "והמלצות" |
| `pages/he/capabilities.yaml` | `operations items[1].body` | לבקרה וניתוב → לבקרה ולניתוב |
| `pages/he/capabilities.yaml` | `operations items[2].body` | Comma removed before "והפקה" |
| `pages/he/capabilities.yaml` | `operations items[3].body` | חווית → חוויית (TODO kept) |
| `pages/he/capabilities.yaml` | `dashboards items[2].title` | מעקב על → מעקב אחר |
| `pages/he/why-novidea.yaml` | `seo.description` | Starts with "פלטפורמת", אמיתי → אמיתית, SOC2 → SOC 2 (137 characters) |
| `pages/he/why-novidea.yaml` | `header.intro[1]` | שלך → שלכם |
| `pages/he/why-novidea.yaml` | `advantages items[1].body` | נגישות מלאה → גישה מלאה |
| `pages/he/why-novidea.yaml` | `advantages items[2].title` | תשתית ה-CRM מהחזקות → תשתית CRM מהחזקות |
| `pages/he/why-novidea.yaml` | `advantages items[3].body` | SOC2, ותקנות → SOC 2 ותקנות ("המחמירים ביותר" kept) |
| `pages/he/why-novidea.yaml` | `advantages items[4].title` | מונעת → מבוססת |
| `pages/he/why-novidea.yaml` | quotes 1–3 | As proposed in §4 (Howden, Marsh, Leaderim) |
| `pages/he/contact.yaml` | `header.intro[1]` | שלהם → שלהן ("וצומחות בנובידאה" kept) |
| `pages/he/contact.yaml` | `header.picture.alt` | לוחות מחוונים → דשבורדים |
| `pages/he/contact.yaml` | `fields[3]`, `fields[4]` | Gershayim: מנכ״ל, סמנכ״ל, דוא״ל |
| `shared/he.yaml` | `leadCta.body` | שלהם → שלהן |
| `pages/he/privacy.yaml` | "כללי" `paragraphs[1]` | אוספת ומשתמשת במידע… → אוספת מידע… ומשתמשת בו |
| `pages/he/privacy.yaml` | "המידע שאנחנו אוספים" `bullets[3]`, `after[1]` | דוא״ל; ועמודים → והעמודים |
| `pages/he/privacy.yaml` | "עם מי המידע משותף" `bullets[3]` | שמהם → שממנה; קבצי עיצוב → קובצי עיצוב (no new facts) |
| `pages/he/privacy.yaml` | `after[1]` there, "אבטחת מידע", "הזכויות שלכם", "יצירת קשר" | Gershayim: חו״ל, התשס״א, התשע״ז, התשמ״א, דוא״ל |
| `i18n/ui.ts` | `consent.acceptAll` | אישור הכל → אישור הכול |

**Not applied (not approved):** fact changes (offices on `/israel`, ISO/SOC wording, AI preview status, new `TODO(verify)` comments), new content (§5, all of O1–O10), terminology pending Novidea (ציטוט, הזנקה, "קליטת פרודוקציה ויצרנים"), and optional style rewrites: CTA "לתיאום הדגמה", slogan, אקו-סיסטם, "וצומחות איתה", "Legacy ישנות", "Open API פתוחה", "קונספט", the sentence fragments and "לטובת" rewrites, home paragraphs 2–3, the footer blurb, `/israel` polish, the inclusive form-role option, the jsDelivr JS fact, UI `rejectAll`/`video.unsupported`/`consentNeeded`, and the accessibility draft (outside `src/`).

**Knock-on:** `tests/e2e/consent.spec.ts` (lines 24, 74, 102) finds the button by the name 'אישור הכל'. It must change to 'אישור הכול' (Testing agent).

Scope: every Hebrew page (`src/content/pages/he/*.yaml`), `src/content/shared/he.yaml`, the Hebrew values in `src/i18n/ui.ts`, and (lightly) `docs/drafts/accessibility.he.yaml`. Checked against the sources in `docs/sources/` and novidea.com (home page, `/products/insurance-software-security/`, `/company/`, `/awards/`, fetched 20/11/2026). Terms and style rules: `docs/glossary-he.md` (new).

How to apply: every "proposed" cell is final Hebrew, ready to paste into the YAML field named in the first column. Acronyms use gershayim ״ (U+05F4), so they need no escaping inside YAML double quotes. Where a proposal depends on a Novidea answer it says so, and the matching `TODO(verify)` comment must stay until the answer arrives.

---

## 1. Summary

The site is faithful to the content document and reads well overall. The issues fall into four groups:

1. **Errors that change the meaning.** "מונחת נתונים" means "placed data" (should be "מונחית נתונים"). "חדשנות מונעת בינה מלאכותית" can be read as "innovation that **prevents** AI". "סוכנויות… שלהם" is a gender-agreement error, and it appears in the banner at the bottom of every page.
2. **Claims that sources disagree on.** Offices (London/US/Europe vs England/US/Israel), certifications (novidea.com attributes ISO/SOC 2 to Salesforce, not to Novidea), AI insights (live per the content document vs "a first preview" per the 07/07/2026 press release), the number of countries (20 / 22 / 23), and a customer's job title.
3. **Copy carried over from the source with its rough edges.** Sentence fragments, "לטובת", "בצורה אוטומטית", redundancy ("Open API פתוחה", "Legacy ישנות", "אחת אחודה"), the calque "ציטוט" for a price quote, and spelling (מידי → מדי, המיסים → המסים, חווית → חוויית, הכל → הכול, דו"ח/דוח).
4. **Missed opportunities from the new sources.** Colmobil as a published customer, "למעלה מעשור של ניסיון", the AI assistant shown at the conference (as "בקרוב"), the line "ה-AI לא נועד להחליף את הסוכן, אלא להעצים אותו", the customer conference, and internal links between pages (`docs/seo.md` §4.3).

### Top recommendations, in priority order

| # | Change | Where | Section |
|---|---|---|---|
| 1 | "מונחת נתונים" → "מונחית נתונים" | Home overview | §3.1 |
| 2 | "סוכנויות… שלהם" → "שלהן" | Lead banner (every page), `/contact` intro | §3.6, §3.8 |
| 3 | "חדשנות מונעת בינה מלאכותית" → "חדשנות מבוססת בינה מלאכותית" | `/why-novidea`, home links | §3.4, §3.1 |
| 4 | Confirm whose ISO / SOC 2 certifications these are; write "SOC 2"; drop "המחמירים ביותר" | `/why-novidea`, its `seo.description` | §3.4, §6 |
| 5 | Offices: replace "בלונדון, ארה״ב ואירופה" with the press-release wording; fix the switch from "היא" to "שלנו" | `/israel` intro | §3.5, §6 |
| 6 | Confirm whether AI gap detection is live or a preview; add the conference AI assistant as "בקרוב" | `/capabilities`, `/why-novidea` | §3.3, §3.4, §5 |
| 7 | Spelling and preposition fixes (מדי, רשות המסים, חוויית, הכול, מעקב אחר, דוח, צד שלישי) | `/solution`, `/capabilities`, UI | §2, §3 |
| 8 | Resolve the two open `/capabilities` TODOs (Mail to Case wording, the missing word after "על בסיס") | `/capabilities` | §3.3, §7 |
| 9 | Two SEO-description fixes: "360°" → "360 מעלות" (`/capabilities`); don't start with a Latin word, "SOC 2" (`/why-novidea`) | `seo.description` | §3.3, §3.4 |
| 10 | Add Colmobil, "למעלה מעשור", the AI message and internal-link blocks | Home, `/why-novidea`, `/israel`, all internal pages | §5 |

---

## 2. Site-wide issues and the rule proposed

| Issue | Examples on the site | Rule (glossary §6) |
|---|---|---|
| "data-driven" misspelt | home: "מונחת נתונים" | **מונחית נתונים**. "מונחת" = placed/lying |
| "מונעת" is ambiguous | `/why-novidea`, home links: "חדשנות מונעת בינה מלאכותית" | **מבוססת** בינה מלאכותית (the approved SEO description already says "חדשנות מבוססת AI") |
| Gender agreement | "סוכנויות… שלהם" | Feminine plural for סוכנויות: **שלהן** |
| Singular address | `/why-novidea` intro: "הסוכנות שלך" | Plural: **שלכם** (AGENTS.md §3.5) |
| Person switches mid-sentence | `/israel`: "נובידאה היא חברה… אך הלב… שלנו" | One person per sentence; Novidea is "אנחנו" in first-person copy |
| Bureaucratic fillers | "לטובת" ×6, "מהווה", "בצורה אוטומטית", "ניתן" | ל… / כדי ל…; משמשת; אוטומטית; אפשר |
| Sentence fragments | home §3 paragraph, "מנגנון חידושים", "Single Source of Truth" paragraph | Every sentence has a verb, or is clearly a list item |
| Redundancy | "Open API פתוחה", "Legacy ישנות", "מערכת אחת אחודה", "בצורה אוטומטית… בעצמה", "המערכת… למערכת" | Say it once |
| Calque "ציטוט" for a price quote | `/solution`: "ציטוטים", "ציטוט מחיר חידוש" | **הצעת מחיר** (confirm with marketing, Q12) |
| Spelling | "מידי חודש", "רשות המיסים", "חווית", "הכל", "קבצי", "צד-שלישי" | מדי, רשות המסים, חוויית, הכול, קובצי, צד שלישי |
| Preposition | "מעקב על" ×3 | **מעקב אחר** |
| Two spellings of "report" | `/solution`: "דו\"ח" in the title, "דוח" in the body | **דוח** everywhere |
| Two spellings of acronyms' quote mark | `/israel` "ארה״ב" (gershayim) vs `/contact` "דוא\"ל", "מנכ\"ל" (ASCII) | Gershayim **״** for every acronym |
| Hyphen used as a dash | `/solution`: "קונספט אחר - Single Source of Truth" | En dash " – " or a colon |
| "נגישות" used for "access" | `/why-novidea`: "נגישות מלאה מכל מקום" | **גישה**. On an Israeli site "נגישות" means accessibility (a legal term) |
| Unsupported superlatives | "המחמירים ביותר", "ה-CRM הגמיש והמתקדם בעולם" (contradicts the title's "מהחזקות בעולם") | Keep only what a source supports |
| "dashboard" in two terms | alt text "לוחות מחוונים" vs "דשבורדים" everywhere else | **דשבורדים** |
| Email in two terms | "במייל" (`/solution`) vs "דוא״ל" (form, privacy) | **דוא״ל** |
| Brand name script | The site writes **נובידאה**; `AGENTS.md` §3.5 says brand names stay in English | Keep נובידאה in Hebrew text (content document, SEO plan, current site) and update AGENTS.md, **or** switch to Novidea. **Owner decision** (Q1) |
| Mixed direction in meta text | `/capabilities` `seo.description` has "360°" without isolates → renders "°360" in RTL snippets; `/why-novidea` description starts with "Cloud-Native", so first-strong contexts (WhatsApp, LinkedIn previews) lay it out LTR | In `seo.*`: units in words ("360 מעלות"); start with a Hebrew word |
| Main call to action | "השאירו פרטים" (plural, inclusive, but says what the visitor does, not what they get) | Optional: **לתיאום הדגמה** on the hero, nav and banner buttons, matching the `/contact` title. Keep "השאירו פרטים" as the form heading. Owner decision |

Mixed-direction strings checked and fine as they are: "ו-BPM", "ה-CRM", "Open API מלא" (heading starting in Latin inside an RTL page), "משרד ללא נייר (Paperless Office)", "שי סימקין, ACII", "⁦360°⁩" and "⁦100+⁩" (isolated), "10-30", dates DD/MM/YYYY.

---

## 3. Per-page edits

Field paths: `sections[id]` is the block with that `id`; indexes (`items[n]`, `paragraphs[n]`, `intro[n]`, `names`) count from 1.

### 3.1 Home (`src/content/pages/he/home.yaml`)

`seo.title` and `seo.description`: keep (approved, no errors).

| Field | Current | Proposed | Why |
|---|---|---|---|
| `hero.lead` | כל עולם הביטוח הישראלי. מערכת אחת אחודה. אינסוף אפשרויות צמיחה. | כל עולם הביטוח הישראלי. מערכת אחת. אינסוף אפשרויות צמיחה. | "אחת אחודה" is redundant and "אחודה" is rare. Optional: it's the source's slogan |
| `hero.primaryCta.label` | השאירו פרטים | לתיאום הדגמה | Optional (§2, last row): states the benefit, matches `/contact` title |
| `sections[overview].paragraphs[1]` | נובידאה מובילה את המהפכה הדיגיטלית בשוק הביטוח עם פלטפורמת ענן (InsurTech) מונחת נתונים וזוכת פרסים בינלאומיים. הפלטפורמה מאיצה צמיחה, רווחיות ויעילות תפעולית עבור סוכנויות וברוקרים באמצעות כלים אנליטיים ותובנות עסקיות בזמן אמת. | נובידאה מובילה את המהפכה הדיגיטלית בשוק הביטוח עם פלטפורמת InsurTech בענן, מונחית נתונים וזוכת פרסים בינלאומיים. הפלטפורמה מאיצה את הצמיחה, הרווחיות והיעילות התפעולית של סוכנויות ביטוח וברוקרים, באמצעות כלים אנליטיים ותובנות עסקיות בזמן אמת. | **"מונחת" → "מונחית"** (meaning error). "(InsurTech)" in parentheses read as a gloss of "ענן". Adds "ביטוח" (SEO) |
| `sections[overview].paragraphs[2]` | עם בסיס CRM חזק כחלק מטכנולוגיית Salesforce, הפלטפורמה מהווה מערכת ליבה לסוכנות, ומאפשרת לשים את הלקוח במרכז, ולחבר את כל תהליכי העבודה בסוכנות. | הפלטפורמה בנויה על תשתית ה-CRM החזקה של Salesforce ומשמשת מערכת ליבה לסוכנות: היא שמה את הלקוח במרכז ומחברת את כל תהליכי העבודה. | Calque "כחלק מטכנולוגיית", "מהווה", extra commas, "בסוכנות" twice. "בנויה על Salesforce" is in the video narration and on novidea.com ("built directly on their platform") |
| `sections[overview].paragraphs[3]` | מתיאום פגישות, מכירות, הפקה, פרודוקציה וניהול שירות ועד ניהול תביעות וחידושים לשמירה על שירות ללקוח ברמה הגבוהה ביותר. | מתיאום פגישות, מכירות, הפקה ופרודוקציה, דרך ניהול השירות ועד תביעות וחידושים: הכול במערכת אחת, כדי לתת ללקוחות שירות ברמה הגבוהה ביותר. | Fragment without a verb; "שירות" twice. "במערכת אחת" is the source's own message (מסרים נוספים) |
| `sections[customers].names` | מבטח סימון, קלי, אמנון גור | Add **כלמוביל** (logo from Novidea) | Published customer (PR 29/12/2025). See §5, O1. Confirm the official names of "קלי" and "אמנון גור" (Q9) |
| `sections[explore].items[1].body` | נפרדים מעבודה עם ריבוי מערכות ומצווארי בקבוק תפעוליים. | מערכת אחת במקום ריבוי מערכות, עם ממשקים למסלקה הפנסיונית, להר הביטוח ולקליטת פרודוקציה. | Repeats the target page's h1; the proposal tells readers what they'll find and carries the page's keywords |
| `sections[explore].items[2].body` | ניהול מסע לקוח, תפעול, שירות ו-BPM מתקדם, דשבורדים, BI וקבלת החלטות. | ניהול מסע הלקוח, תפעול ושירות עם BPM מתקדם, דשבורדים ו-BI לקבלת החלטות. | Reads as a list of headings; the proposal is a phrase |
| `sections[explore].items[3].body` | Cloud-Native אמיתי, תשתית CRM מהחזקות בעולם, אבטחת מידע ופרטיות ללא פשרות וחדשנות מונעת בינה מלאכותית. | Cloud-Native אמיתי, תשתית CRM מהחזקות בעולם, אבטחת מידע ופרטיות ללא פשרות וחדשנות מבוססת בינה מלאכותית. | "מונעת" can read "prevents" |
| `sections[explore].items[4].body` | יחד איתכם בכל שלב. | הנהלה, פיתוח, ליווי הטמעה ותמיכה טכנית בעברית, כאן בישראל. | Says nothing on its own; the proposal summarises `/israel` |
| `sections[overview].video` | (no text about the video) | See §5, O7 | SEO A13 and captions |

### 3.2 `/solution` (`src/content/pages/he/solution.yaml`)

`seo.*` and `header.title`: keep.

| Field | Current | Proposed | Why |
|---|---|---|---|
| `header.intro[1]` | במשך שנים, סוכנויות ובתי סוכן בישראל נאלצו לתמרן בין עשרות מסכים, פורטלים של יצרנים, קובצי אקסל ומערכות Legacy ישנות שאינן מתקשרות ביניהן. התוצאה: עומס תפעולי כבד, סרבול בעבודה, איבודי מידע וקושי בצמיחה. | במשך שנים, סוכנויות ובתי סוכן בישראל נאלצו לתמרן בין עשרות מסכים, פורטלים של יצרנים, קובצי אקסל ומערכות Legacy ותיקות שאינן מדברות זו עם זו. התוצאה: עומס תפעולי כבד, עבודה מסורבלת, אובדן מידע וקושי לצמוח. | "Legacy ישנות" redundant; "איבודי מידע" non-standard (אובדן); smoother nouns |
| `sections[single-source-of-truth].title` | נובידאה מביאה קונספט אחר - Single Source of Truth | הגישה של נובידאה: Single Source of Truth | Hyphen used as a dash; "קונספט" → "גישה" |
| `sections[single-source-of-truth].paragraphs[1]` | פלטפורמה המרכזת את כל פעילות הסוכנות, בעולמות הפנסיוניים, אלמנטריים, פיננסיים ופרט. מניהול הליד הראשוני ועד קליטת פרודוקציה, ניהול התביעה והשירות. בזכות ארכיטקטורת Open API פתוחה, המערכת מתחברת בקלות לכל כלי, פורטל או ממשק. | מקור אמת אחד לסוכנות: פלטפורמה שמרכזת את כל הפעילות בתחום הפנסיוני, הפיננסי, האלמנטרי והפרט. מהליד הראשון ועד קליטת הפרודוקציה, ניהול התביעות והשירות, הכול במקום אחד. בזכות ארכיטקטורת Open API, המערכת מתחברת בקלות לכל כלי, פורטל או ממשק. | Explains the English term in Hebrew; fixes inconsistent definiteness ("הפנסיוניים, אלמנטריים"); second sentence had no verb; "Open API פתוחה" redundant; "התביעה" → "התביעות" |
| `sections[modules].items[1]` title / body | אינטגרציות מובנות לרכיבים מרכזיים באקו-סיסטם הביטוחי בישראל / (none) | title: אינטגרציות מובנות · body: חיבורים מוכנים לרכיבים המרכזיים במערך הביטוח בישראל. | Long title with no body; matches the other cards |
| `sections[modules].items[2].body` | חיבור ישיר למסלקה הפנסיונית ולפוליוויז לטובת שליפת נתוני הר הביטוח והעתקי הפוליסות. | חיבור ישיר למסלקה הפנסיונית ולפוליוויז, לשליפת נתוני הר הביטוח והעתקי פוליסות. | "לטובת" |
| `sections[modules].items[3].body` | אינטגרציה מובנית לביטוח-נט, גמל-נט ופנסיה-נט לטובת הבאת נתוני החשיפות והתשואות מידי חודש. | אינטגרציה מובנית לביטוח-נט, גמל-נט ופנסיה-נט, שמביאה מדי חודש את נתוני התשואות והחשיפות. | **"מידי" → "מדי"** (spelling); "לטובת הבאת"; order matches the title |
| `sections[modules].items[4]` title / body | אינטגרציה מול רשות המיסים / שליחת טופס עזיבת עבודה בצורה אוטומטית עבור סוכנויות הסדרים. | title: ממשק לרשות המסים · body: שליחה אוטומטית של טופס עזיבת עבודה, לסוכנויות הסדרים. | **Official name "רשות המסים"**; "בצורה אוטומטית" |
| `sections[modules].items[5]` title / body / soonNote | קליטת פרודוקציה ויצרנים / מנוע מתקדם וגמיש לקליטת קבצי פרודוקציה מהיצרנים בישראל. / המערכת תיכנס בצורה אוטומטית לאתרי חברות הביטוח בעצמה, תוריד את קבצי הפרודוקציה ותקלוט אותם למערכת. | title: קליטת פרודוקציה מהיצרנים · body: מנוע מתקדם וגמיש שקולט את קובצי הפרודוקציה מהיצרנים בישראל. · soonNote: המערכת תיכנס בעצמה לאתרי חברות הביטוח, תוריד את קובצי הפרודוקציה ותקלוט אותם אוטומטית. | "קליטת… יצרנים" reads as importing the insurers themselves; "אוטומטית… בעצמה" and "המערכת… למערכת" redundant; קובצי |
| `sections[modules].items[6]` title / body | סימולטורים וציטוטים בזמן אמת / ממשק מובנה לסימולטור המכירה של פורמלי ולמנוע ציטוט מחירי רכב של קוואלה. | title: סימולטורים והצעות מחיר בזמן אמת · body: ממשק מובנה לסימולטור המכירה של פורמלי ולמנוע הצעות המחיר לביטוח רכב של קוואלה. | "ציטוט" is a calque of "quote". "מחירי רכב" reads as car prices; the engine quotes car **insurance** prices. Confirm both (Q12) |
| `sections[modules].items[7]` title / body | ציטוט מחיר חידוש / המערכת תיכנס בצורה אוטומטית לאתרי חברות הביטוח ותזין את נתוני הפוליסה לטובת הפקת ציטוט מחיר חידוש. | title: הצעת מחיר לחידוש · body: המערכת תיכנס אוטומטית לאתרי חברות הביטוח ותזין את נתוני הפוליסה, כדי להפיק הצעת מחיר לחידוש. | Same; "לטובת הפקת" |
| `sections[modules].items[8].body` | חיבורים ישירים לשותפים טכנולוגיים ורשתות דיגיטל להזנת לידים ופניות בזמן אמת. | חיבורים ישירים לשותפים טכנולוגיים ולרשתות דיגיטליות, לקליטת לידים ופניות בזמן אמת. | Missing ל before the second object; "רשתות דיגיטל"; "קליטת" matches the title |
| `sections[modules].items[10]` title / body / soonNote | דו"ח תמונת לקוח מקיף / דוח מסודר על כל התיק של הלקוח. / שליחה אוטומטית במייל כל חודש, רבעון, חצי שנה או שנה. | title: דוח תמונת לקוח מקיף · body: דוח מסודר שמרכז את כל תיק הלקוח. · soonNote: שליחה אוטומטית בדוא״ל, מדי חודש, רבעון, חצי שנה או שנה. | One spelling of דוח; one term for email |
| `sections[modules].items[11].body` | כל פוליסות הרכב, הדירה והעסק שמתחדשות בקרוב, עם מעקב על כל חידוש. | ריכוז של כל פוליסות הרכב, הדירה והעסק שמועד החידוש שלהן מתקרב, ומעקב אחר כל חידוש. | Fragment; "מעקב על" → "מעקב אחר" |
| `sections[modules].items[13].body` | חיבור גמיש לכל מערכת צד-שלישי, מוקד טלפוני, פורטל לקוחות או אפליקציה ארגונית. | חיבור גמיש לכל מערכת צד שלישי, מוקד טלפוני, פורטל לקוחות או אפליקציה ארגונית. | "צד שלישי" takes no hyphen |
| `sections[modules].items[14]` title / body | קולקטיבים / קליטת אקסלים של קולקטיבי בריאות לטובת ניהול הפוליסות וכן העובדים ובני המשפחה ומעקב אחר סטטוס ההצטרפות שלהם. | title: ניהול קולקטיבים · body: קליטת קובצי אקסל של קולקטיבי בריאות, לניהול הפוליסות, העובדים ובני המשפחה ולמעקב אחר סטטוס ההצטרפות שלהם. | "לטובת… וכן"; the title gets a verb noun and the SEO term "ניהול קולקטיבים" |
| new block at the end | (none) | `links` block, see §5, O8 | Internal links (`docs/seo.md` §4.3) |

### 3.3 `/capabilities` (`src/content/pages/he/capabilities.yaml`)

| Field | Current | Proposed | Why |
|---|---|---|---|
| `seo.description` | ניהול מסע לקוח מליד ועד פוליסה, תמונת לקוח 360° עם תובנות AI, ניהול תהליכים (BPM), משרד ללא נייר ודשבורדים בזמן אמת לסוכנות הביטוח. | ניהול מסע לקוח מליד ועד פוליסה, תמונת לקוח 360 מעלות עם תובנות AI, ניהול תהליכים (BPM), משרד ללא נייר ודשבורדים בזמן אמת לסוכנות הביטוח. (136 characters) | "360°" without isolates shows as "°360" in RTL search snippets and link previews. "360 מעלות" also matches the keyword "תמונת לקוח 360" and the press release wording. Only change to an approved field that I recommend |
| `header.intro` (new, field exists) | (none) | מערכת אחת לניהול סוכנות הביטוח או בית הסוכן, מקצה לקצה: מסע הלקוח מהליד ועד הפוליסה, תפעול ושירות עם BPM מתקדם, ודשבורדים לקבלת החלטות בזמן אמת. | `docs/seo.md` §4.2: the h1 has no topic word. Built only from this page's own sections |
| `sections[customer-journey].items[1].body` | תהליך מובנה מתיאום הפגישה, הזנקת הר הביטוח וטרום ייעוץ לטובת הכנת הפגישה ללקוח וכן קליטת התוצרים מהסימולטור לאחר המכירה. קליטת נתוני מסלקה וממשקי פרט, ועד להצעת מחיר והפקה. | תהליך מובנה מתיאום הפגישה, הזנקת הר הביטוח וטרום ייעוץ לקראת הפגישה עם הלקוח, דרך קליטת נתוני המסלקה וממשקי הפרט, ועד הצעת המחיר וההפקה. אחרי המכירה, התוצרים מהסימולטור נקלטים במערכת. | Same steps as the source, in the order the reader lives them; second sentence had no verb. Confirm "הזנקה" and "ממשקי פרט" (Q13) |
| `sections[customer-journey].items[2].body` | ניתוח עמוק של תיק הלקוח ובני המשפחה, זיהוי חוסרים ביטוחיים, והמלצות חכמות להרחבת כיסויים. | ניתוח עמוק של תיק הלקוח ובני המשפחה, זיהוי חוסרים ביטוחיים והמלצות חכמות להרחבת הכיסויים. | Comma before ו. **Add `# TODO(verify)`**: the 07/07/2026 press release presents AI gap scanning as "a first preview", while this card presents it as available (§6, F5). If it's a preview, move the AI part to `soonNote` (§5, O4) |
| `sections[operations].items[1].body` | מימוש אוטומטי של תהליכי שירות, תביעות וחידושים עם הגדרת SLA ומשימות מובנות לצוות תוך מתן כלים למנהלים לבקרה וניתוב עומסים. | אוטומציה של תהליכי שירות, תביעות וחידושים, עם הגדרת SLA ומשימות מובנות לצוות, וכלים למנהלים לבקרה ולניתוב עומסים. | "מימוש אוטומטי… תוך מתן" is heavy; one long run-on |
| `sections[operations].items[2].body` | תיוק מסמכים חכם, חתימות דיגיטליות, והפקה אוטומטית של מכתבים, הצעות וטפסים מותאמים אישית באמצעות מנוע Docomotion המובנה. | תיוק מסמכים חכם, חתימות דיגיטליות והפקה אוטומטית של מכתבים, הצעות וטפסים מותאמים אישית, עם מנוע Docomotion המובנה במערכת. | Comma before ו |
| `sections[operations].items[3].body` | מנגנון מוצרי מלא של Mail to Case מאפשר להעניק ללקוח חווית שירות מהירה תוך ניטור מלא. | **Option A (no new facts):** מנגנון Mail to Case מובנה במערכת, שמאפשר לתת ללקוח חוויית שירות מהירה, עם מעקב מלא אחר כל פנייה. **Option B (explains the feature, needs confirmation):** מנגנון Mail to Case מובנה: פניות שמגיעות בדוא״ל הופכות אוטומטית לקריאות שירות במערכת, כך שאפשר לתת ללקוח מענה מהיר ולעקוב אחר כל פנייה. | Resolves the TODO: "מוצרי" most likely means "built into the product" (out of the box). "חווית" → **"חוויית"**; "מלא… מלא". Keep the TODO until Novidea confirms (Q3) |
| `sections[dashboards].items[1].body` | דשבורדים ודוחות שניתן לבנות עצמאית, ללא צורך בפיתוח או ידע טכנולוגי. | דשבורדים ודוחות שאפשר לבנות לבד, בלי פיתוח ובלי ידע טכני. | Shorter, direct. Open TODO: what followed "על בסיס" in the source (Q4). If Novidea supplies the word, insert it, e.g. "…בזמן אמת על בסיס [X], שאפשר לבנות לבד…" |
| `sections[dashboards].items[2]` title / body | מעקב על נתוני פרודוקציה / יכולת לבצע בקרות על נתוני הפרודוקציה ביחס למדווח במערכת לטובת טיפול וייעול רווחיות. | title: בקרת נתוני פרודוקציה · body: בקרה על נתוני הפרודוקציה מול הנתונים המדווחים במערכת, כדי לאתר פערים, לטפל בהם ולשפר את הרווחיות. | "מעקב על"; "יכולת לבצע בקרות… לטובת טיפול". "לאתר פערים" spells out what "בקרות ביחס למדווח… לטובת טיפול" means; confirm if unsure |
| new block at the end | (none) | `links` block, see §5, O8 | Internal links |

### 3.4 `/why-novidea` (`src/content/pages/he/why-novidea.yaml`)

| Field | Current | Proposed | Why |
|---|---|---|---|
| `seo.description` | Cloud-Native אמיתי על תשתית CRM מהחזקות בעולם, אבטחת מידע (ISO, SOC2) וחדשנות מבוססת AI. וגם: מה אומרים לקוחות נובידאה בישראל. | פלטפורמת Cloud-Native אמיתית על תשתית CRM מהחזקות בעולם, אבטחת מידע (ISO, SOC 2) וחדשנות מבוססת AI. וגם: מה אומרים לקוחות נובידאה בישראל. (137 characters) | Starts with a Latin word, so WhatsApp/LinkedIn previews (first-strong direction) render it LTR. "SOC 2" is the official spelling. If the quotes aren't approved by launch, drop "וגם: …" as `docs/seo.md` says |
| `header.intro[1]` | מה זה אומר עבור הסוכנות שלך? | ארבעה יתרונות, ומה כל אחד מהם אומר עבור הסוכנות שלכם. | Singular "שלך"; as an intro, a bare question that was a table header in the source reads oddly |
| `sections[advantages].items[1].body` | נגישות מלאה מכל מקום ומכל מכשיר, ללא שרתים מקומיים, עם עדכוני גרסה שוטפים ואפס זמני השבתה. | גישה מלאה מכל מקום ומכל מכשיר, בלי שרתים מקומיים, עם עדכוני גרסה שוטפים ואפס זמני השבתה. | "נגישות" means accessibility on an Israeli site. **Add `# TODO(verify)`** on "אפס זמני השבתה": absolute claim, in the content document but not on novidea.com (Q6). Fallback if not confirmed: "…עם עדכוני גרסה שוטפים, בלי השבתות לצורך התקנה." |
| `sections[advantages].items[2]` title / body | מוצר גלובלי המבוסס על תשתית ה-CRM מהחזקות בעולם / עוצמת ה-CRM הגמיש והמתקדם בעולם, שעבר התאמה עמוקה לצרכים המדויקים של שוק הביטוח הישראלי. | title: מוצר גלובלי על תשתית CRM מהחזקות בעולם · body: העוצמה והגמישות של Salesforce, עם התאמה עמוקה לצרכים של שוק הביטוח הישראלי. | "ה-CRM … מהחזקות" mixes definite and partitive. The body's "הגמיש והמתקדם בעולם" is a superlative that contradicts the title's "one of the strongest". Naming Salesforce is sourced (home, PR) and is this page's SEO target |
| `sections[advantages].items[3].body` | עמידה בתקני האבטחה הבינלאומיים והמקומיים המחמירים ביותר: ISO, SOC2, ותקנות הגנת הפרטיות. | עמידה בתקני אבטחת מידע בינלאומיים (ISO, SOC 2) ובתקנות הגנת הפרטיות בישראל. | **Add `# TODO(verify)`**: novidea.com's security page lists ISO 27001 / SOC 2 as **Salesforce's** certifications that Novidea inherits. Confirm whether Novidea holds its own and which (Q5). If they're Salesforce's: "תשתית Salesforce, העומדת בתקני אבטחת מידע בינלאומיים (ISO 27001, SOC 2), ועמידה בתקנות הגנת הפרטיות בישראל." Also: "SOC 2"; regulations aren't standards; drop the unsupported "המחמירים ביותר" |
| `sections[advantages].items[4]` title / body | חדשנות מונעת בינה מלאכותית (AI) / אוטומציות, קיצור זמני תפעול והפקת תובנות עסקיות מבוססות נתונים. | title: חדשנות מבוססת בינה מלאכותית (AI) · body: אוטומציות, קיצור זמני התפעול ותובנות עסקיות מתוך הנתונים. ה-AI של נובידאה לא נועד להחליף את הסוכן, אלא להעצים אותו. | "מונעת" ambiguity. The added sentence is from the 07/07/2026 press release ("שלא נועד להחליף את הסוכן אלא להעצים אותו"). Plus a `soonNote`, §5, O4 |
| `sections[customer-quotes]` | 4 quotes | See §4 | Faithfulness and Hebrew |
| new block at the end | (none) | `links` block, see §5, O8 | Internal links |

### 3.5 `/israel` (`src/content/pages/he/israel.yaml`)

`seo.*`: keep. `header.title`: keep.

| Field | Current | Proposed | Why |
|---|---|---|---|
| `header.intro[1]` | נובידאה היא חברה גלובלית שמנהלת פעילות ענפה בלונדון, ארה״ב ואירופה – אך הלב, המטה ומרכז הפיתוח שלנו נמצאים כאן בישראל. | **Option A (two published PRs agree):** נובידאה היא חברה גלובלית עם משרדים באנגליה, בארה״ב ובישראל. הלב, המטה ומרכז הפיתוח שלנו נמצאים כאן, בישראל. **Option B (adds reach and experience, needs Q7):** נובידאה היא חברה גלובלית עם משרדים באנגליה, בארה״ב ובישראל, לקוחות ביותר מ-20 מדינות ולמעלה מעשור של ניסיון בשוק הביטוח. הלב, המטה ומרכז הפיתוח שלנו נמצאים כאן, בישראל. | "לונדון, ארה״ב ואירופה" mixes a city, a country and a continent, and differs from both press releases (§6, F2). Fixes the switch from "היא" to "שלנו" inside one sentence. "ביותר מ-20" is true for both 22 (PRs) and 23 (novidea.com) |
| `header.intro[2]` | כשאתם עובדים עם נובידאה, אתם נהנים מהגב של פלטפורמה עולמית יחד עם מעטפת מקומית מקצה לקצה: | כשאתם עובדים עם נובידאה, אתם נהנים מהעוצמה של פלטפורמה עולמית, יחד עם מעטפת מקומית מקצה לקצה: | "הגב" is too colloquial for this register |
| `sections[local-support].items[1]` title / body | הנהלה, מוצר ו-R&D מקומיים / הצוות שמתכנן ומפתח את המערכת יושב כאן ומכיר לעומק את הרגולציה והשינויים בשוק הישראלי. | title: הנהלה, מוצר ופיתוח מקומיים · body: הצוות שמתכנן ומפתח את המערכת יושב כאן, ומכיר לעומק את הרגולציה ואת השינויים בשוק הישראלי. | Hebrew reader-facing heading; "R&D" stays in the approved SEO description |
| `sections[local-support].items[2].body` | צוות מומחי ביטוח ותוכנה שמלווה את הסוכנות משלב האפיון, דרך ההסבה ועד לעבודה השוטפת. | צוות של מומחי ביטוח ותוכנה שמלווה את הסוכנות משלב האפיון, דרך ההסבה ועד העבודה השוטפת. | Small polish |
| new block | (none) | Customer conference text block, §5, O5 | Thin page (122 words); local proof |
| new block at the end | (none) | `links` block, §5, O8 | Internal links |

### 3.6 `/contact` (`src/content/pages/he/contact.yaml`)

`seo.*` and `header.title`: keep.

| Field | Current | Proposed | Why |
|---|---|---|---|
| `header.intro[1]` | הצטרפו לסוכנויות המובילות בישראל שמנהלות את תיק הלקוחות שלהם וצומחות בנובידאה. השאירו פרטים והצוות שלנו יחזור אליכם לשיחת היכרות והדגמה. | הצטרפו לסוכנויות המובילות בישראל, שמנהלות את תיק הלקוחות שלהן בנובידאה וצומחות איתה. השאירו פרטים, והצוות שלנו יחזור אליכם לשיחת היכרות והדגמה. | **"שלהם" → "שלהן"** (סוכנויות is feminine); "צומחות בנובידאה" reads as "growing inside Novidea" |
| `header.picture.alt` | לוחות מחוונים של מערכת נובידאה על מסך מחשב | דשבורדים של מערכת נובידאה על מסך מחשב | One term for dashboard |
| `sections[lead-form].fields[3]` | תפקיד (מנכ"ל / סמנכ"ל תפעול / מנהל מערכות מידע / אחר) | תפקיד (מנכ״ל / סמנכ״ל תפעול / מנהל/ת מערכות מידע / אחר) | Gershayim; inclusive form. Reference only (HubSpot renders the real form); apply the same in HubSpot |
| `sections[lead-form].fields[4]` | דוא"ל עסקי | דוא״ל עסקי | Gershayim |
| `sections[lead-form].fields[6]` | גודל הסוכנות (10-30 משתמשים / 30-100 משתמשים / ⁦100+⁩ משתמשים) | (owner/HubSpot decision) | Ranges overlap at 30 and there is no option under 10. Suggest in HubSpot: "עד 10 / 11–30 / 31–100 / ⁦100+⁩ משתמשים" (Q14) |

### 3.7 `/privacy` (`src/content/pages/he/privacy.yaml`), language only

Legal review is still required (existing TODO). These are language fixes, not legal changes.

| Field | Current | Proposed | Why |
|---|---|---|---|
| section "כללי", `paragraphs[1]` | …(\"נובידאה\", \"אנחנו\") אוספת ומשתמשת במידע אישי שנמסר לנו באתר זה… | …(\"נובידאה\", \"אנחנו\") אוספת מידע אישי שנמסר לנו באתר זה ומשתמשת בו… | Two verbs with different prepositions can't share one object |
| section "המידע שאנחנו אוספים", `after[1]` | …ועמודים שבהם צפיתם… | …והעמודים שבהם צפיתם… | Definiteness, parallel to the rest of the list |
| section "עם מי המידע משותף", `bullets[3]` | jsDelivr: רשת להפצת קבצים, שמהם האתר טוען קבצי עיצוב. בעת טעינת האתר היא מקבלת את כתובת ה-IP שלכם. | jsDelivr: רשת להפצת תוכן (CDN), שממנה האתר טוען את קובצי העיצוב והקוד של Bootstrap. בעת טעינת האתר היא מקבלת את כתובת ה-IP שלכם. | "שמהם" points at the wrong noun; the site also loads Bootstrap **JS** from jsDelivr (`docs/seo.md` §1), not only style files |
| section "עוגיות", `paragraphs[1]` / `bullets[2]` | באתר יש שלושה סוגים / עוגיות ניתוח… | (flag only) | The SEO audit says there's no analytics yet. If none is installed, the policy describes a cookie type the site doesn't set; legal/Code to decide (Q15) |

### 3.8 Shared (`src/content/shared/he.yaml`)

| Field | Current | Proposed | Why |
|---|---|---|---|
| `leadCta.body` | הצטרפו לסוכנויות המובילות בישראל שמנהלות את תיק הלקוחות שלהם וצומחות בנובידאה. השאירו פרטים והצוות שלנו יחזור אליכם לשיחת היכרות והדגמה. | הצטרפו לסוכנויות המובילות בישראל, שמנהלות את תיק הלקוחות שלהן בנובידאה וצומחות איתה. השאירו פרטים, והצוות שלנו יחזור אליכם לשיחת היכרות והדגמה. | **Agreement error shown on every page** (same as `/contact`) |
| `leadCta.button.label` | השאירו פרטים | לתיאום הדגמה | Optional, CTA rule (§2) |
| `footerAbout` | נובידאה היא פלטפורמת הענן המובילה לניהול סוכנויות ובתי סוכן, על בסיס Salesforce: מהליד הראשון ועד פוליסה, שירות, תביעות וחידושים, במערכת אחת. חברה גלובלית שהמטה ומרכז הפיתוח שלה כאן בישראל. | נובידאה היא פלטפורמת הענן המובילה לניהול סוכנויות ביטוח ובתי סוכן, על בסיס Salesforce: מהליד הראשון ועד הפוליסה, השירות, התביעות והחידושים, במערכת אחת, עם מטה ומרכז פיתוח בישראל. | The content model asks for one sentence; the second was a fragment. Adds "ביטוח" |

### 3.9 UI strings (`src/i18n/ui.ts`, `he` values)

| Key | Current | Proposed | Why |
|---|---|---|---|
| `nav.cta` | השאירו פרטים | לתיאום הדגמה | Optional, CTA rule (§2). Keep `leadForm.title` as "השאירו פרטים" |
| `consent.acceptAll` | אישור הכל | אישור הכול | Full spelling |
| `consent.rejectAll` | רק עוגיות הכרחיות | עוגיות הכרחיות בלבד | More natural for a button |
| `video.unsupported` | הדפדפן לא מציג את הסרטון. | הדפדפן שלכם אינו תומך בהצגת הסרטון. | Says why, addresses the reader |
| `leadForm.consentNeeded` | טופס השארת הפרטים מופעל על ידי HubSpot, שמשתמשת בעוגיות שיווק וטפסים. כדי להציג את הטופס, יש לאשר עוגיות אלה. | טופס השארת הפרטים פועל באמצעות HubSpot, שמשתמשת בעוגיות שיווק וטפסים. כדי להציג את הטופס, יש לאשר את העוגיות האלה. | "מופעל על ידי" is a calque of "powered by". Still under the consent legal-review TODO |
| `consent.body` | …בקישור "הגדרות עוגיות" בתחתית העמוד. | (keep) | Fine |
| all others | | (keep) | Checked: skip link, menu, footer, 404, quotes carousel, video, form states and cookie dialog read correctly |

### 3.10 Accessibility statement draft (`docs/drafts/accessibility.he.yaml`), light review

| Field | Current | Proposed | Why |
|---|---|---|---|
| "המחויבות שלנו" | …ולתקן הישראלי ת\"י 5568… | …ולתקן הישראלי ת״י 5568… | Gershayim |
| "רכז הנגישות" (section title) vs `bullets[1]` "רכז/ת הנגישות" | | Section title: רכז/ת הנגישות | Consistent inclusive form |
| "איך בדקנו" | …בדפדפן Chrome, לפני כל פרסום של גרסה חדשה… | (keep, verify) | Confirm with Testing that this is what CI actually runs |
| "מגבלות ידועות" | …אפשר לפנות אלינו ישירות בפרטים שבסעיף 5… | (keep) | Section numbering matches (prose sections are numbered) |

---

## 4. Customer quotes (`/why-novidea`, `sections[customer-quotes]`)

Compared with `docs/sources/customer-quotes.md`. The translations are faithful; the edits below make them closer to the original or more natural. The `TODO(verify)` (approval by Novidea and each customer) stays.

| Item | Current Hebrew | Proposed Hebrew | Why |
|---|---|---|---|
| 1, Howden (Shai Simkin) | הפלטפורמה של נובידאה אפשרה לנו לייעל את ניהול מחזור החיים של הפוליסה, ולקבל נראות ושליטה חסרות תקדים, בזמן אמת, על כל היבט בעסק שלנו. זה פתרון הוליסטי… שמאפשר לנו להתחרות בסביבה דינמית שמשתנה כל הזמן, ולהצמיח את העסק. | הפלטפורמה של נובידאה אפשרה לנו לייעל את ניהול מחזור חיי הפוליסה, ולקבל שקיפות ושליטה חסרות תקדים, בזמן אמת, על כל היבט בעסק שלנו. זה פתרון הוליסטי… שמאפשר לנו להתחרות בסביבה דינמית ומשתנה, ולהצמיח את העסק. | "נראות" is a calque of "visibility"; "מחזור חיי הפוליסה" is the PR's term. **Job title conflict:** source "Managing Director", novidea.com "Global Head of Cyber, Howden Israel" (Q10) |
| 2, Marsh (Gabi Grant) | …וזה עוזר לנו לשפר את השורה התחתונה. | …וזה עוזר לנו להגדיל את השורה התחתונה. | "grow our bottom line" = להגדיל. Rest is faithful |
| 3, Leaderim (Yehuda Shavit) | נובידאה היא טכנולוגיה חדשנית שמעצימה את העסק שלנו. זו פלטפורמה חזקה ויציבה, שנותנת לנו את הגמישות ואת יכולת הגדילה שחיפשנו. תגובה לשינויים בשוק, השקת קווי עסקים חדשים או התאמה לשינויי רגולציה הפכו למשימות פשוטות עם נובידאה, וזה מפתח להצלחה העסקית שלנו. | נובידאה היא טכנולוגיה חדשנית שמעצימה את העסק שלנו. זו פלטפורמה חזקה ויציבה, שנותנת לנו את הגמישות ואת יכולת הגדילה שחיפשנו. להגיב לשינויים בשוק, להציע תחומי פעילות חדשים או להתאים את עצמנו לשינויי רגולציה – כל אלה הפכו למשימות פשוטות עם נובידאה, וזה מפתח להצלחה העסקית שלנו. | "תגובה… השקת… התאמה" as subjects is stiff; "קווי עסקים" is a calque of "business lines"; "offering" = להציע, not "להשיק" |
| 4, Mivtach Simon (Ilanit Hazan) | (current) | (keep the Hebrew) | Faithful and natural. But it's an announcement-style quote in the future tense ("נשפר"), and the source doesn't mark it as cleared for a website. Confirm the date, that it's cleared, and that the title is still current (Q11). If it isn't cleared, replace it with the Colmobil quote (§5, O2) |

---

## 5. New content opportunities

| # | Opportunity | Source | Where it goes | Ready-to-paste Hebrew |
|---|---|---|---|---|
| O1 | **Colmobil as a customer** | `pr-colmobil-2025-12-29.he.md` (published) | Home `sections[customers].names` (existing field). Needs a logo from Novidea, or a plain name | name: כלמוביל. Avoid the PR's superlatives about Colmobil ("הגדולה", "המובילה"): the PR itself says both "הגדולה בישראל" and "אחת המובילות" (§6, F9) |
| O2 | **Colmobil quote** (Hebrew original, published) | same PR, Ilan Shapiro quote | `/why-novidea` `quotes` (existing block). The PR gives a Hebrew title, so the gendered-title problem doesn't apply | quote: בזכות שילוב מערכות המכירות והביטוח שלנו בפלטפורמה אחידה אחת, נשפר את היעילות התפעולית ונשיג את יכולות הניהול הנדרשות לצמיחה המתמשכת שלנו. יכולות האוטומציה והאנליטיקה של נובידאה יעצימו אותנו ויאפשרו לנו לספק ערך ושירות גדולים עוד יותר ללקוחותינו. · name: אילן שפירו · role: מנכ״ל סוכנות הביטוח · company: כלמוביל. (The PR reads "לפלטפורמה אחידה אחת"; I changed "ל" to "ב" and "Novidea" to "נובידאה". If quotes must be verbatim, keep "לפלטפורמה" and ask Novidea, Q8) |
| O3 | **Experience and reach**: "למעלה מעשור של מומחיות", "22 מדינות", offices | Both PRs ("אודות Novidea") | `/israel` intro (§3.5 option B) or `/why-novidea` `items[2].body` | Already in §3.5 option B. Alternative for `/why-novidea` `items[2].body`: העוצמה והגמישות של Salesforce, עם התאמה עמוקה לצרכים של שוק הביטוח הישראלי, וניסיון של יותר מעשור עם ברוקרים, סוכנויות ומבטחים ביותר מ-20 מדינות. (needs Q7) |
| O4 | **AI assistant shown at the conference** (preview) | `pr-customer-conference-2026-07-07.he.md` §2–3 | `/why-novidea` `sections[advantages].items[4].soonNote` (existing field); if AI gap scanning isn't live yet, also move it out of `/capabilities` `items[2].body` into a `soonNote` there | soonNote: עוזר AI לסוכן: בלחיצת כפתור, סיכום של תיק הלקוח, פיץ׳ מותאם אישית לשיחה וסריקה יזומה לאיתור חוסרים והזדמנויות מכירה. |
| O5 | **Customer conference in Israel** (local proof for a thin page) | same PR, §1–2 | `/israel`: new `text` block (existing type) after `local-support`, `surface: subtle` | title: קרובים ללקוחות · paragraph: ביולי 2026 קיימנו כנס לקוחות במשרדים החדשים שלנו, עם עשרות מנהלים ואנשי מקצוע מסוכנויות הביטוח המובילות בארץ. הצגנו בו את מפת הדרכים של המוצר, את הגרסה החדשה של מודול תמונת לקוח והצצה ראשונה ליכולות ה-AI שיעזרו לסוכני הביטוח לעבוד חכם יותר. (Ages; review yearly. "המשרדים החדשים" without an address until Q16) |
| O6 | **"Top 100 AI" recognition** | same PR, last paragraph ("נבחרה לאחת מ-100 החברות המובילות בעולם בתחום ה-AI בתעשיית הביטוח והפיננסים"); novidea.com `/awards/` shows "AIFinTech100" badges | `/why-novidea` `items[4].body` or the home overview, **after** Novidea names the list and year (Q17). "לאחרונה" can't be used: it ages | Draft once confirmed: נובידאה נבחרה לרשימת [שם הרשימה] [שנה] של 100 החברות המובילות בעולם בתחום ה-AI בפיננסים ובביטוח. |
| O7 | **Text about the video** (SEO A13; accessibility) | `video-narration.he.md`, **but** it's from an earlier edit | Home `sections[overview]`: one more paragraph (existing field), only after Novidea confirms the current video's content (Q2) | Draft: בסרטון: איך נובידאה מחברת את כל פעילות הסוכנות, ממכירות והפקה ועד תביעות וחידושים, בפלטפורמת ענן אחת, עם גישה מאובטחת מכל מקום ומכל מכשיר. |
| O8 | **Internal links between topic pages** | `docs/seo.md` §4.3; text reused from the pages | A `links` block (existing type) at the end of each internal page, `title: "להמשך קריאה"`, icons as on home | **/solution** → `/capabilities`: יכולות ליבה: מקצה לקצה / ניהול מסע הלקוח מליד ועד פוליסה, BPM מתקדם, משרד ללא נייר ודשבורדים בזמן אמת. · `/why-novidea`: למה נובידאה? / Cloud-Native אמיתי על תשתית Salesforce, אבטחת מידע ופרטיות ללא פשרות וחדשנות מבוססת בינה מלאכותית. **/capabilities** → `/solution`: מערכת אחת לסוכנות / ממשקים למסלקה הפנסיונית, להר הביטוח ולקליטת פרודוקציה, ו-Open API לכל מערכת אחרת. · `/israel`: המטה כאן בישראל / הנהלה, פיתוח, ליווי הטמעה ותמיכה טכנית בעברית, כאן בישראל. **/why-novidea** → `/capabilities` and `/israel` (texts above). **/israel** → `/solution` and `/why-novidea` (texts above) |
| O9 | **"Insights Driven"** message and the three product axes | conference PR §1, §3 | `/capabilities` `header.intro[2]` (existing field), optional | הפיתוח שלנו מתמקד בשלושה צירים: פישוט המידע והנגשתו לסוכן, אוטומציה של תהליכי הליבה, ותובנות מבוססות נתונים שמשפרות את חוויית הלקוח. |
| O10 | **Wider audience** (brokers, insurers, MGAs/MGUs) | Both PRs ("סוכנויות ביטוח, ברוקרים, חברות ביטוח ו-MGAs/MGUs"); `AGENTS.md` §1 | Not text: a **request to Structure** whether to add audience pages or a "למי זה מתאים" block. Today every page speaks only to agencies and agent houses | — |

Requests to the Structure agent (none blocks the edits above):
- **R1 (optional):** inline links in `text` blocks (also in `docs/seo.md` §4.3), so body text can link "מערכת ליבה לסוכנות" → `/solution`.
- **R2 (optional):** a small "numbers" block (e.g. "⁦10+⁩ שנות ניסיון", "⁦20+⁩ מדינות") once Q7 is answered. A `features` block can carry the same facts meanwhile.
- **R3:** O10, audience coverage.

---

## 6. Fact consistency

| # | Claim | Where it appears | Sources | Recommendation |
|---|---|---|---|---|
| F1 | **Number of countries** | Not on the site | PRs 29/12/2025 and 07/07/2026: "22 מדינות". Video narration (earlier edit): "20 מדינות". novidea.com home (20/11/2026): "23 countries" | Don't pick one. Ask (Q7). Safe wording true for 22 and 23: "ביותר מ-20 מדינות" |
| F2 | **Offices / global presence** | `/israel` intro: "פעילות ענפה בלונדון, ארה״ב ואירופה" | Content document: "לונדון, ארה"ב ואירופה". Both PRs: "משרדים באנגליה, ארה"ב וישראל". novidea.com `/company/`: no locations; footer links a "USA website" | Use the PR wording (two published sources agree), §3.5. Ask whether "Europe" means activity beyond the UK (Q7) |
| F3 | **Policies under management** | Not on the site | Narration: "יותר מ-22 מיליון פוליסות". novidea.com: "tens of millions of policies" | Don't use a number unless Novidea confirms one. "עשרות מיליוני פוליסות" matches novidea.com |
| F4 | **Security certifications** | `/why-novidea` item 3 and its `seo.description`: "ISO, SOC2" as Novidea's compliance | Content document: "ISO, SOC2, ותקנות הגנת הפרטיות". novidea.com `/products/insurance-software-security/`: lists **Salesforce's** SOC 1/2/3 and ISO 27001/27017/27018, inherited by Novidea; no Novidea-held certificate named | Add `TODO(verify)`. Confirm whether Novidea holds its own ISO/SOC 2 and which standard (Q5; same as `docs/seo.md` Q7) |
| F5 | **AI insights: live or preview?** | `/capabilities` "תמונת לקוח ⁦360°⁩ עם תובנות AI… זיהוי חוסרים… המלצות חכמות"; `/why-novidea` item 4 | Content document presents them as existing. Conference PR (07/07/2026): AI that summarises the file, writes a pitch and scans for gaps was "הצצה ראשונה"; the new "תמונת לקוח" version was demonstrated | Add `TODO(verify)` on the `/capabilities` card. Mark preview features "בקרוב" (Q18) |
| F6 | **"אפס זמני השבתה"** | `/why-novidea` item 1 | Content document only. Not on novidea.com | `TODO(verify)` (Q6); fallback wording in §3.4 |
| F7 | **Years of experience** | Not on the site | Colmobil PR: "למעלה מעשור", "יותר מ-10 שנות ניסיון". novidea.com: "years of global insurance experience", no number | Consistent; usable ("למעלה מעשור"), source = PR |
| F8 | **Leadership claim** | Home h1 "פלטפורמת הענן המובילה"; footer | Content document; CEO quote 07/07/2026 ("המובילה בשוק הישראלי והגלובלי"). Narration (not used): "פלטפורמת הביטוח **היחידה** שמבוססת ענן, מונחית נתונים ובנויה על Salesforce"; novidea.com: "the only born-in-the-cloud, data-driven insurance management platform" | "המובילה" is sourced; keep. Don't add "היחידה" without Novidea's approval: it's a comparative claim |
| F9 | **Colmobil description** | Not on the site | Same PR: "יבואנית הרכב הגדולה בישראל" (para. 1), "אחת מיבואניות הרכב המובילות" (CEO quote), "קבוצת הרכב המובילה" (about) | If Colmobil is added, name it without a superlative. Also: the PR says Colmobil **chose** Novidea (12/2025); confirm it's live before saying it "works with" Novidea (Q8) |
| F10 | **Howden quote job title** | `/why-novidea` quote 1: "Managing Director" | Quotes document: "Managing Director". novidea.com: "Global Head of Cyber, Howden Israel" | Ask (Q10) |
| F11 | **Customer names** | Home logos: "קלי", "אמנון גור" | Content document: "קלי", "אמנון גור". novidea.com shows a "Gur Insurance Group" logo | Confirm the names used as alt text (Q9) |
| F12 | **Top 100 AI** | Not on the site | Conference PR: "100 החברות המובילות בעולם בתחום ה-AI בתעשיית הביטוח והפיננסים", no list name or year; its "לפרטים נוספים" link wasn't supplied. novidea.com `/awards/` shows "AIFinTech100" badges (2022, 2024, apparently 2026), a fintech list, not insurance-specific | Ask the list name, year and link (Q17) before use |
| F13 | **Audience** | Site: agencies and agent houses only | Content document: agencies and agent houses. PRs: agencies, brokers, insurers, MGAs/MGUs. Narration: agents, agencies, agent houses, insurers | Not an error; a scope decision (O10) |
| F14 | **Accounting** | Not on the site | Narration: "ממכירות והפקה ועד הנהלת חשבונות". Not in the content document | Don't add unless confirmed for the Israeli product |
| F15 | **"data-driven" spelling** | Home | Content document and PRs: "מונחת"; narration: "מונחית" | Language, not fact: "מונחית" is correct |

---

## 7. Remaining `TODO(verify)` items and questions for Novidea marketing

### Existing `TODO(verify)` (in the repo today)

| File | Item | Question |
|---|---|---|
| `home.yaml` | Video captions | Q2 |
| `capabilities.yaml` | "מנגנון מוצרי מלא של Mail to Case" | Q3 |
| `capabilities.yaml` | Missing word after "על בסיס" | Q4 |
| `why-novidea.yaml` | Quote translations and approvals; Mivtach Simon clearance; Hebrew job titles | Q8, Q10, Q11 |
| `privacy.yaml` | `[לעדכון: …]` placeholders; legal review | Legal (not marketing) |
| `ui.ts` | Consent wording legal review | Legal |

### New `TODO(verify)` to add if the proposals are applied

| File | Item | Question |
|---|---|---|
| `why-novidea.yaml` item 3 | ISO / SOC 2 ownership and exact standards | Q5 |
| `why-novidea.yaml` item 1 | "אפס זמני השבתה" | Q6 |
| `capabilities.yaml` 360° card | AI gap detection live or preview | Q18 |
| `israel.yaml` intro (option B) | Countries, experience | Q7 |
| any page using O1–O7 | Colmobil, conference, Top 100 AI, video text | Q2, Q8, Q16, Q17 |

### Questions for Novidea marketing

1. **Q1 Brand script.** *Answered 20/11/2026 by the owner: "נובידאה" in Hebrew running text.* In Hebrew text, "נובידאה" (as the content document and the whole site) or "Novidea" (as `AGENTS.md` §3.5 and the PRs)? Is "נובידיאה" ever used?
2. **Q2 Video.** Does the current video (`Novidea-Hebrew-Israel.mp4`) have narration or on-screen text? If so, please supply its script for captions (required by IS 5568 / WCAG 1.2.2) and confirm what it covers, so we can write a short summary.
3. **Q3 Mail to Case.** What does "מנגנון מוצרי מלא של Mail to Case" mean: a built-in, out-of-the-box feature? Do incoming emails automatically become service cases? Is the name "Mail to Case" or "Email-to-Case"?
4. **Q4 Dashboards.** The source reads "דשבורדים ודוחות עסקיים בזמן אמת על בסיס, שניתן לבנות…". What word is missing after "על בסיס"?
5. **Q5 Certifications.** Does Novidea hold its own ISO (which: 27001?) and SOC 2 (Type I or II) certifications, or are these Salesforce's, inherited through the platform? Is there a public source (trust page, certificate)? Is "עמידה בתקנות הגנת הפרטיות" approved by legal?
6. **Q6 Downtime.** May we say "אפס זמני השבתה"? If not, is "בלי השבתות לצורך התקנת עדכונים" accurate?
7. **Q7 Reach.** How many countries: 20, 22 or 23? Offices: England, US and Israel (PRs), or "London, US and Europe" (content document)? May we say "למעלה מעשור של ניסיון"?
8. **Q8 Colmobil.** Is Colmobil live on Novidea? May we show its logo (please send it) and Ilan Shapiro's quote from the PR, with the small change "לפלטפורמה" → "בפלטפורמה"?
9. **Q9 Customer names.** Official names for the home-page logos: "קלי" (full name?) and "אמנון גור" (or "גור ביטוח" / "Gur Insurance Group", as on novidea.com)?
10. **Q10 Howden.** Shai Simkin's title: "Managing Director" (quotes document) or "Global Head of Cyber, Howden Israel" (novidea.com)?
11. **Q11 Mivtach Simon.** When was Ilanit Hazan's quote given, is it cleared for the website, and is she still CIO?
12. **Q12 Terms.** Do your buyers say "ציטוט" for a price quote, or may we write "הצעת מחיר"? Is Qwalla's engine for car **insurance** price quotes? Official spellings of פוליוויז, פורמלי, קוואלה (Hebrew or Latin)?
13. **Q13 Jargon.** Are "הזנקת הר הביטוח" and "ממשקי פרט" the terms your customers use? What does "פרט" cover (life and health personal lines)?
14. **Q14 Form.** The HubSpot "agency size" ranges overlap (10-30 / 30-100) and have no option under 10. Change to "עד 10 / 11–30 / 31–100 / ⁦100+⁩"? Can the role options use inclusive forms (מנהל/ת)?
15. **Q15 Analytics.** Is any analytics tool installed? The privacy policy describes analytics cookies (for legal and Code).
16. **Q16 Israeli office.** Address of the new offices and support hours, for `/israel` (and `docs/seo.md` Q5)?
17. **Q17 AI recognition.** Name, year and link of the "Top 100 AI" list in the 07/07/2026 PR. Is it FinTech Global's AIFinTech100?
18. **Q18 AI status.** Which AI capabilities are available today (AI insights in תמונת לקוח 360°, gap detection, recommendations) and which were a preview at the conference (file summary, pitch, proactive scan)? Is the new "תמונת לקוח" module released?

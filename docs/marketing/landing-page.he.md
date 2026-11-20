# Landing page: Novidea Israel in one page (draft v1)

**Status:** draft for the owner's review, 20/11/2026 · **Owner:** Marketing agent · Not on the site yet.

**Purpose:** one page that sums up the whole site, problem → solution → product → proof → contact. Used for campaigns (LinkedIn, Google Ads, email) and as a short version of the site.
**Audience:** owners and managers of Israeli insurance agencies and agent houses (מנכ״לים, סמנכ״לי תפעול, מנהלי מערכות מידע).
**Voice:** the site voice: direct, professional Hebrew, plural address, glossary terms (`docs/glossary-he.md`).
**Facts:** only from `docs/sources/` and approved site content. Items marked ⚠ need approval before publishing.
**Suggested URL:** `/landing` (or a campaign slug such as `/agency-platform`); Structure agent to decide.

---

## SEO

- **Primary keyword:** מערכת לניהול סוכנויות ביטוח · secondary: CRM לסוכנויות ביטוח, מערכת לבתי סוכן, מסלקה פנסיונית, הר הביטוח, קליטת פרודוקציה
- **Meta title (49):** מערכת לניהול סוכנויות ביטוח ובתי סוכן | נובידאה
- **Meta description (139):** פלטפורמת ענן אחת לכל פעילות הסוכנות: לידים, מכירות, מסלקה, הר הביטוח, פרודוקציה, שירות, תביעות וחידושים. השאירו פרטים לשיחת היכרות והדגמה.
- If it runs only as a campaign page, keep it `noindex` so it doesn't compete with the home page for the same searches. If it's meant to rank, give it its own keyword (e.g. "מערכת לבתי סוכן") so it doesn't duplicate the home page.

---

## 1. Hero

**Headline (h1), 3 options:**
1. **מערכת אחת לכל פעילות הסוכנות** *(recommended)*
2. נובידאה – פלטפורמת הענן המובילה לניהול סוכנויות ביטוח ובתי סוכן
3. נפרדים מריבוי מערכות. עוברים לנובידאה.

**Subheadline:**
פלטפורמת ענן מונחית נתונים על בסיס Salesforce, לסוכנויות ביטוח ובתי סוכן: מהליד הראשון ועד פוליסה, שירות, תביעות וחידושים.

**Supporting line (small):**
כל עולם הביטוח הישראלי. מערכת אחת. אינסוף אפשרויות צמיחה.

**Buttons:** primary **השאירו פרטים** → form (§8) · secondary **צפו בסרטון** → video (§6)

**Picture:** the home hero picture (`hero-empower-your-people.png`) or the product dashboards picture.

---

## 2. The problem

**Title (h2):** עשרות מסכים, אקסלים ומערכות שלא מדברות זו עם זו

**Text:**
במשך שנים, סוכנויות ובתי סוכן בישראל עובדים בין פורטלים של יצרנים, קובצי אקסל ומערכות Legacy שאינן מתקשרות ביניהן.

**Three short points (with icons):**
- **עומס תפעולי** – אותו מידע מוזן שוב ושוב, במקומות שונים.
- **מידע שהולך לאיבוד** – אין תמונה אחת ומלאה של הלקוח.
- **קושי לצמוח** – הצוות עסוק בתפעול במקום בלקוחות.

> Source: content document, "הבעיה והפתרון" (the three outcomes rephrased from "עומס תפעולי כבד, סרבול בעבודה, איבודי מידע וקושי בצמיחה").

---

## 3. The solution

**Title (h2):** Single Source of Truth – מקור אמת אחד לכל הסוכנות

**Text:**
נובידאה מרכזת את כל פעילות הסוכנות בפלטפורמה אחת: פנסיה, אלמנטרי, פיננסים ופרט. מניהול הליד הראשון ועד קליטת הפרודוקציה, ניהול התביעה והשירות. בזכות Open API, המערכת מתחברת בקלות לכל כלי, פורטל או ממשק.

> Note: the h2 starts with a Latin term; fine on the page, but don't use it as a page title or description (glossary §6).

---

## 4. What's in the platform (6 cards)

| Icon (library) | Title | Text |
|---|---|---|
| fast-track | **מליד ועד פוליסה** | תהליך מובנה מתיאום הפגישה, דרך הר הביטוח וטרום הייעוץ, ועד הצעת מחיר והפקה. |
| database | **מסלקה פנסיונית והר הביטוח** | חיבור ישיר למסלקה הפנסיונית ולהר הביטוח, כולל העתקי פוליסות. |
| data-filter | **קליטת פרודוקציה** | מנוע גמיש לקליטת קובצי פרודוקציה מהיצרנים בישראל. **בקרוב:** הורדה וקליטה אוטומטית מאתרי חברות הביטוח. |
| ai-brain | **תמונת לקוח ⁦360°⁩ עם תובנות AI** | ניתוח תיק הלקוח ובני המשפחה, זיהוי חוסרים ביטוחיים והמלצות להרחבת כיסויים. ⚠ |
| process-cycle | **תהליכי עבודה אוטומטיים** | שירות, תביעות וחידושים עם SLA, משימות לצוות וכלי בקרה למנהלים. משרד ללא נייר עם חתימות דיגיטליות. |
| dashboard | **דשבורדים ו-BI בזמן אמת** | דשבורדים ודוחות שבונים לבד, בלי פיתוח, ובקרה על נתוני הפרודוקציה. |

**Link under the cards:** לכל היכולות ← `/capabilities`

> ⚠ The content document presents AI insights as available; the press release of 07/07/2026 presents AI assistance as a first preview. Confirm what's live (docs/content-review.md, fact table).

---

## 5. Why Novidea (4 short points)

**Title (h2):** למה סוכנויות בוחרות בנובידאה

- **Cloud-Native אמיתי** – גישה מכל מקום ומכל מכשיר, בלי שרתים מקומיים, עם עדכוני גרסה שוטפים.
- **על תשתית Salesforce** – ה-CRM מהחזקות בעולם, מותאם לשוק הביטוח הישראלי.
- **אבטחת מידע ופרטיות** – עמידה בתקני ISO ו-SOC 2 ובתקנות הגנת הפרטיות. ⚠
- **צוות כאן בישראל** – פיתוח, הטמעה ותמיכה טכנית בעברית, משלב האפיון ועד העבודה השוטפת.

> ⚠ novidea.com presents ISO 27001 and SOC 2 as Salesforce's certifications that Novidea inherits. Use wording Novidea confirms (Q5 in docs/content-review.md §7).

---

## 6. Video

**Title (h2):** הכירו את נובידאה בדקה וחצי *(the video is 1:18)*
The home video (`Novidea-Hebrew-Israel.mp4`). Captions needed if it has narration.

---

## 7. Social proof

**Title (h2):** הפלטפורמה שמובילה את הסוכנויות ובתי הסוכן הגדולים בישראל

- **Logos:** מבטח סימון, קלי, GUR (approved for the home page; written permission still open, Open tasks).
- **Quotes:** built with all four Israeli customer quotes, as on /why-novidea (owner's request, 20/11/2026). Originally drafted with one quote (pending customer approval of the Hebrew translation):
  > הפלטפורמה של נובידאה אפשרה לנו לייעל את ניהול מחזור חיי הפוליסה… ולהצמיח את העסק.
  > — שי סימקין, ACII · Howden Israel ⚠

Optional, once approved: Colmobil (published press release of 29/12/2025) with Ilan Shapiro's quote:
  > בזכות שילוב מערכות המכירות והביטוח שלנו לפלטפורמה אחידה אחת, נשפר את היעילות התפעולית ונשיג את יכולות הניהול הנדרשות לצמיחה המתמשכת שלנו.
  > — אילן שפירו, מנכ״ל סוכנות הביטוח בכלמוביל

---

## 8. Closing call to action + form

**Title (h2):** מוכנים להוביל את הסוכנות לעידן הבא?
**Text:** השאירו פרטים והצוות שלנו יחזור אליכם לשיחת היכרות והדגמה.
**Form:** the HubSpot form (same as `/contact`), loaded after marketing-cookie consent.
**Button:** השאירו פרטים

---

## 9. FAQ (suggested questions; answers need Novidea)

1. האם המערכת מתחברת למסלקה הפנסיונית ולהר הביטוח?
2. כמה זמן לוקחת הסבה ממערכת קיימת?
3. האם יש תמיכה טכנית בעברית, ובאילו שעות?
4. האם המערכת מתאימה גם לבית סוכן קטן?
5. איפה נשמרים הנתונים, ואיך הם מאובטחים?

> FAQ answers need sources or Novidea's written approval (AGENTS.md §3.5).

---

## Notes

- **Length:** about 350 words of body text, readable in 2–3 minutes; mobile-first.
- **Reuses existing blocks:** page header/hero, `text`, `features`, `names`, `quotes`, `leadForm`. A new page type or route is a Structure + Code task.
- **Tracking:** campaign UTM parameters plus HubSpot form source, analytics only after consent.
- **Next steps:** approve the headline and copy → resolve the ⚠ items → Structure decides the URL and indexing → Code builds the page → Testing.

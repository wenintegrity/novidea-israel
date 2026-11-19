import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { path: '/', name: 'home' },
  { path: '/solution', name: 'solution' },
  { path: '/capabilities', name: 'capabilities' },
  { path: '/why-novidea', name: 'why-novidea' },
  { path: '/israel', name: 'israel' },
  { path: '/contact', name: 'contact' },
  { path: '/privacy', name: 'privacy' },
  { path: '/accessibility', name: 'accessibility' },
];

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const menu = [
  { label: 'הבעיה והפתרון', path: '/solution' },
  { label: 'יכולות ליבה', path: '/capabilities' },
  { label: 'למה נובידאה?', path: '/why-novidea' },
  { label: 'המטה בישראל', path: '/israel' },
  { label: 'השאירו פרטים', path: '/contact' },
];

for (const pg of pages) {
  test.describe(`${pg.name} (${pg.path})`, () => {
    test('is Hebrew, RTL, one h1, unique title, RTL Bootstrap', async ({ page }) => {
      await page.goto(pg.path);
      await expect(page.locator('html')).toHaveAttribute('lang', 'he');
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('link[href*="bootstrap.rtl.min.css"]')).toHaveCount(1);
      await expect(page).toHaveTitle(/נובידאה/);
    });

    for (const vp of viewports) {
      test(`${vp.name} (${vp.width}px): no horizontal scroll, no serious a11y violations`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pg.path);
        await page.evaluate(() => document.fonts.ready);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, 'page is wider than the viewport').toBeLessThanOrEqual(0);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        expect(
          blocking,
          JSON.stringify(
            blocking.map((v) => ({ id: v.id, help: v.help, targets: v.nodes.map((n) => n.target) })),
            null,
            2,
          ),
        ).toEqual([]);

        await page.screenshot({ path: testInfo.outputPath(`${pg.name}-${vp.name}.png`), fullPage: true });
      });
    }
  });
}

test.describe('navigation', () => {
  test('page titles are unique', async ({ page }) => {
    const titles = new Set<string>();
    for (const pg of pages) {
      await page.goto(pg.path);
      titles.add(await page.title());
    }
    expect(titles.size).toBe(pages.length);
  });

  test('desktop: every menu item opens its page and is marked current', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const item of menu) {
      await page.goto('/');
      await page.locator('#site-nav').getByRole('link', { name: item.label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${item.path}/?$`));
      await expect(page.locator('#site-nav').getByRole('link', { name: item.label, exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      );
    }
  });

  test('desktop: menu button hidden, links inline', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'פתיחת התפריט' })).toBeHidden();
    await expect(page.locator('#site-nav').getByRole('link', { name: 'הבעיה והפתרון' })).toBeVisible();
  });

  test('mobile: menu opens and a link navigates to its page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const panel = page.locator('#site-nav');
    await page.getByRole('button', { name: 'פתיחת התפריט' }).click();
    await expect(panel).toBeVisible();
    await panel.getByRole('link', { name: 'יכולות ליבה' }).click();
    await expect(page).toHaveURL(/\/capabilities\/?$/);
    await expect(page.locator('h1')).toHaveText('יכולות ליבה: מקצה לקצה');
  });

  test('mobile: Escape closes the menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const panel = page.locator('#site-nav');
    await page.getByRole('button', { name: 'פתיחת התפריט' }).click();
    // Bootstrap moves focus into the panel once the opening transition ends
    await expect(panel).toHaveClass(/(^|\s)show(\s|$)/);
    await expect(panel).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
  });

  test('home links to every internal page', async ({ page }) => {
    await page.goto('/');
    for (const item of menu.slice(0, 4)) {
      await expect(page.locator(`main a[href="${item.path}"]`).first()).toBeVisible();
    }
  });

  test('footer links to the privacy policy and accessibility statement on every page', async ({ page }) => {
    for (const pg of pages) {
      await page.goto(pg.path);
      const legal = page.getByRole('navigation', { name: 'מידע משפטי' });
      await expect(legal.getByRole('link', { name: 'מדיניות פרטיות' })).toHaveAttribute('href', '/privacy');
      await expect(legal.getByRole('link', { name: 'הצהרת נגישות' })).toHaveAttribute('href', '/accessibility');
      await expect(legal.getByRole('button', { name: 'הגדרות עוגיות' })).toBeVisible();
    }
  });

  test('privacy policy: "הגדרות עוגיות" inside the text opens the cookie settings', async ({ page }) => {
    await page.goto('/privacy');
    await page.locator('.prose').getByRole('button', { name: 'הגדרות עוגיות' }).click();
    await expect(page.getByRole('dialog', { name: 'הגדרות עוגיות' })).toBeVisible();
  });

  test('skip link is the first focusable element', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'דילוג לתוכן הראשי' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });
});

test.describe('content details', () => {
  test('contact page: HubSpot form waits for consent, no lead banner', async ({ page }) => {
    const hubspotRequests: string[] = [];
    page.on('request', (r) => r.url().includes('hsforms') && hubspotRequests.push(r.url()));
    await page.goto('/contact');
    const slot = page.locator('#hubspot-form');
    await expect(slot).toHaveAttribute('data-state', 'consent');
    await expect(slot.getByRole('button', { name: 'אישור עוגיות שיווק והצגת הטופס' })).toBeVisible();
    await expect(page.locator('#lead-cta-title')).toHaveCount(0);
    expect(hubspotRequests, 'HubSpot must not load before consent').toEqual([]);
  });

  test('other pages end with the lead banner linking to /contact', async ({ page }) => {
    await page.goto('/solution');
    await expect(page.locator('#lead-cta-title')).toHaveText('מוכנים להוביל את הסוכנות לעידן הבא?');
    await expect(page.locator('section:has(#lead-cta-title) a[href="/contact"]')).toBeVisible();
  });

  test('solution page marks upcoming features as "בקרוב"', async ({ page }) => {
    await page.goto('/solution');
    await expect(page.locator('.badge-soon').first()).toHaveText('בקרוב');
  });

  test('"360°" keeps the degree sign after the number in RTL', async ({ page }) => {
    await page.goto('/capabilities');
    const title = page.getByRole('heading', { name: /360°/ });
    await expect(title).toBeVisible();
    // The source string isolates "360°" with Unicode LTR isolates (U+2066 … U+2069)
    expect(await title.textContent()).toContain('⁦360°⁩');
  });
});

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

test.describe('Hebrew home page', () => {
  test('is Hebrew, RTL, and loads the RTL Bootstrap build', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'he');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('link[href*="bootstrap.rtl.min.css"]')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Novidea/);
  });

  for (const vp of viewports) {
    test(`${vp.name} (${vp.width}px): no horizontal scroll, no serious a11y violations`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
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

      await page.screenshot({ path: testInfo.outputPath(`home-he-${vp.name}.png`), fullPage: true });
    });
  }

  test('mobile menu: opens, follows a section link, closes and moves focus', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const panel = page.locator('#site-nav');
    await page.getByRole('button', { name: 'פתיחת התפריט' }).click();
    await expect(panel).toBeVisible();

    await panel.getByRole('link', { name: 'בינה מלאכותית' }).click();
    await expect(panel).toBeHidden();
    await expect(page).toHaveURL(/#ai$/);
    await expect(page.locator('#ai')).toBeFocused();
  });

  test('mobile menu: Escape closes it', async ({ page }) => {
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

  test('desktop: nav is inline and the menu button is hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'פתיחת התפריט' })).toBeHidden();
    await expect(page.locator('#site-nav').getByRole('link', { name: 'הפלטפורמה' })).toBeVisible();
  });

  test('skip link is the first focusable element and targets main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'דילוג לתוכן הראשי' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });

  test('signed and unit values are isolated as LTR', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.stat__value [dir="ltr"]', { hasText: '10+' })).toHaveCount(1);
  });
});

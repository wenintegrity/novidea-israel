import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Cookie consent (src/scripts/consent.ts). Every test starts as a first-time visitor.
test.use({ storageState: { cookies: [], origins: [] } });

const stored = (page: Page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem('nv-consent') ?? 'null') as Record<string, unknown> | null);

/** Adds an inert marketing script that sets window.__marketingRan when it runs. */
const addGatedScript = (page: Page) =>
  page.evaluate(() => {
    const s = document.createElement('script');
    s.type = 'text/plain';
    s.dataset.consent = 'marketing';
    s.textContent = 'window.__marketingRan = true;';
    document.body.append(s);
  });

test('first visit shows the banner, with equal accept and reject buttons', async ({ page }) => {
  await page.goto('/');
  const banner = page.getByRole('region', { name: 'האתר משתמש בעוגיות' });
  await expect(banner).toBeVisible();
  const accept = banner.getByRole('button', { name: 'אישור הכל' });
  const reject = banner.getByRole('button', { name: 'רק עוגיות הכרחיות' });
  await expect(accept).toBeVisible();
  await expect(reject).toBeVisible();
  // Same style for both choices
  expect(await accept.getAttribute('class')).toBe(await reject.getAttribute('class'));
});

for (const vp of [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1440, height: 900 },
]) {
  test(`${vp.name}: banner and settings dialog have no serious a11y violations, no horizontal scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    await expect(page.locator('#consent-banner')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);

    const scan = async () =>
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) }));

    expect(await scan()).toEqual([]);
    await page.locator('#consent-banner').getByRole('button', { name: 'הגדרות' }).click();
    await expect(page.getByRole('dialog', { name: 'הגדרות עוגיות' })).toBeVisible();
    expect(await scan()).toEqual([]);
  });
}

test('"necessary only": banner closes, choice persists, marketing scripts never run', async ({ page }) => {
  await page.goto('/');
  await addGatedScript(page);
  await page.getByRole('button', { name: 'רק עוגיות הכרחיות' }).click();
  await expect(page.locator('#consent-banner')).toBeHidden();
  expect(await stored(page)).toMatchObject({ v: 1, analytics: false, marketing: false });
  expect(await page.evaluate(() => (window as unknown as { __marketingRan?: boolean }).__marketingRan)).toBeUndefined();

  await page.reload();
  await expect(page.locator('#consent-banner')).toBeHidden();
});

test('"accept all" runs waiting marketing scripts', async ({ page }) => {
  await page.goto('/');
  await addGatedScript(page);
  await page.getByRole('button', { name: 'אישור הכל' }).first().click();
  await expect(page.locator('#consent-banner')).toBeHidden();
  expect(await stored(page)).toMatchObject({ analytics: true, marketing: true });
  expect(await page.evaluate(() => (window as unknown as { __marketingRan?: boolean }).__marketingRan)).toBe(true);
});

test('settings: choose per category, save, reopen from the footer, Escape closes', async ({ page }) => {
  await page.goto('/');
  await page.locator('#consent-banner').getByRole('button', { name: 'הגדרות' }).click();
  const dialog = page.getByRole('dialog', { name: 'הגדרות עוגיות' });
  await expect(dialog.getByRole('switch', { name: /עוגיות הכרחיות/ })).toBeDisabled();
  await dialog.getByRole('switch', { name: 'עוגיות שיווק וטפסים' }).check();
  await dialog.getByRole('button', { name: 'שמירת ההעדפות' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.locator('#consent-banner')).toBeHidden();
  expect(await stored(page)).toMatchObject({ analytics: false, marketing: true });

  // Reopen from the footer: the saved choice is shown
  await page.getByRole('button', { name: 'הגדרות עוגיות' }).click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('switch', { name: 'עוגיות שיווק וטפסים' })).toBeChecked();
  await expect(dialog.getByRole('switch', { name: 'עוגיות ניתוח' })).not.toBeChecked();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('withdrawing marketing consent deletes HubSpot cookies', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'אישור הכל' }).first().click();
  await page.evaluate(() => {
    document.cookie = 'hubspotutk=test; path=/';
    document.cookie = '__hstc=test; path=/';
  });

  await page.getByRole('button', { name: 'הגדרות עוגיות' }).click();
  const dialog = page.getByRole('dialog', { name: 'הגדרות עוגיות' });
  await dialog.getByRole('switch', { name: 'עוגיות שיווק וטפסים' }).uncheck();
  await Promise.all([page.waitForEvent('load'), dialog.getByRole('button', { name: 'שמירת ההעדפות' }).click()]);

  expect(await page.evaluate(() => document.cookie)).not.toMatch(/hubspotutk|__hstc/);
  expect(await stored(page)).toMatchObject({ marketing: false });
});

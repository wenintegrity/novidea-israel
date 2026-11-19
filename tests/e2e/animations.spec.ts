import { expect, test } from '@playwright/test';

// Scroll-entrance animations (src/scripts/animate-on-scroll.ts)

test.describe('scroll animations, motion allowed', () => {
  test.use({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 900 } });

  test('below-the-fold content starts hidden and appears when scrolled into view', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('#audiences [data-animate]').first();

    await expect(header).toHaveCSS('opacity', '0');
    await header.scrollIntoViewIfNeeded();
    await expect(header).toHaveCSS('opacity', '1');

    // The final state must stick after the animation ends (no snap back to hidden)
    await page.waitForTimeout(1200);
    await expect(header).toHaveCSS('opacity', '1');
    await expect(header).toHaveCSS('transform', 'none');
  });

  test('content above the fold is never hidden', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#hero-title')).toHaveCSS('opacity', '1');
  });

  test('group children enter one after another', async ({ page }) => {
    await page.goto('/');
    const items = page.locator('#audiences [data-animate-children] > li');
    await items.first().scrollIntoViewIfNeeded();
    await expect(items.last()).toHaveCSS('opacity', '1');
  });
});

test.describe('scroll animations, reduced motion', () => {
  test('nothing is hidden when the visitor asks for reduced motion', async ({ page }) => {
    await page.goto('/');
    const hidden = await page.$$eval('[data-animate], [data-animate-children] > *', (els) =>
      els.filter((el) => getComputedStyle(el).opacity !== '1').length,
    );
    expect(hidden).toBe(0);
  });
});

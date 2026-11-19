import { expect, test } from '@playwright/test';

// Scroll-entrance animations (src/scripts/animate-on-scroll.ts)

test.describe('scroll animations, motion allowed', () => {
  test.use({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 900 } });

  test('below-the-fold content starts hidden and appears when scrolled into view', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('#customers [data-animate]').first();

    await expect(header).toHaveCSS('opacity', '0');
    await header.scrollIntoViewIfNeeded();
    await expect(header).toHaveCSS('opacity', '1');

    // The final state must stick after the animation ends (no snap back to hidden)
    await page.waitForTimeout(1200);
    await expect(header).toHaveCSS('opacity', '1');
    await expect(header).toHaveCSS('transform', 'none');
  });

  test('mobile: waiting entrance animations never make the page wider than the screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const path of ['/', '/solution', '/capabilities', '/why-novidea', '/israel']) {
      await page.goto(path);
      const offsets = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        return [...document.querySelectorAll('[data-animate], [data-animate-children] > *')]
          .map((el) => el.getBoundingClientRect())
          .filter((r) => r.left < -1 || r.right > vw + 1).length;
      });
      expect(offsets, `${path}: elements pushed past the screen edge`).toBe(0);
      expect(await page.evaluate(() => window.scrollX)).toBe(0);
    }
  });

  test('content above the fold is never hidden', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#hero-title')).toHaveCSS('opacity', '1');
  });

  test('group children enter one after another', async ({ page }) => {
    await page.goto('/');
    const items = page.locator('#explore [data-animate-children] > li');
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

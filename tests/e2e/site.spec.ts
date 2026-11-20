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

  test('footer links to the privacy policy and cookie settings on every page', async ({ page }) => {
    for (const pg of pages) {
      await page.goto(pg.path);
      const legal = page.getByRole('navigation', { name: 'מידע משפטי' });
      await expect(legal.getByRole('link', { name: 'מדיניות פרטיות' })).toHaveAttribute('href', '/privacy');
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

  test('module cards alternate background color by row at each breakpoint', async ({ page }) => {
    const rowColors = async () =>
      page.locator('#modules .feature-card').evaluateAll((cards) =>
        cards.map((c) => getComputedStyle(c).backgroundColor),
      );
    // Desktop: 3 per row, so cards 1-3 share a color and 4-6 have the other one
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/solution');
    let c = await rowColors();
    expect(new Set(c.slice(0, 3)).size).toBe(1);
    expect(new Set(c.slice(3, 6)).size).toBe(1);
    expect(c[3]).not.toBe(c[0]);
    expect(c[6]).toBe(c[0]);
    // Tablet: 2 per row
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    c = await rowColors();
    expect(c[1]).toBe(c[0]);
    expect(c[2]).not.toBe(c[0]);
    expect(c[3]).toBe(c[2]);
    // Mobile: every card alternates
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    c = await rowColors();
    expect(c[1]).not.toBe(c[0]);
    expect(c[2]).toBe(c[0]);
  });

  test('home shows the customer logos with their names as alt text', async ({ page }) => {
    await page.goto('/');
    const logos = page.locator('#customers img');
    await expect(logos).toHaveCount(3);
    for (const name of ['מבטח סימון', 'קלי', 'אמנון גור']) {
      await expect(page.locator('#customers').getByRole('img', { name })).toBeVisible();
    }
  });

  test('home shows the overview video with controls, a poster and a name, without autoplay', async ({ page }) => {
    await page.goto('/');
    const video = page.locator('#overview video');
    await expect(video).toHaveCount(1);
    await expect(video).toHaveAttribute('controls', '');
    await expect(video).toHaveAttribute('aria-label', 'הכירו את נובידאה');
    await expect(video).toHaveAttribute('poster', /\.webp$/);
    await expect(video).not.toHaveAttribute('autoplay', /.*/);
    await expect(video.locator('source')).toHaveAttribute('type', 'video/mp4');
    await expect(page.locator('#overview .video--placeholder')).toHaveCount(0);
  });

  test('why-novidea: customer quotes carousel moves with the buttons and dots', async ({ page }) => {
    await page.goto('/why-novidea');
    const carousel = page.locator('#customer-quotes .carousel');
    await expect(carousel.locator('.carousel-item')).toHaveCount(4);
    const activeName = carousel.locator('.carousel-item.active .quote__name');
    await expect(activeName).toHaveText('שי סימקין, ACII');
    await carousel.getByRole('button', { name: 'הציטוט הבא' }).click();
    await expect(activeName).toHaveText('גבי גרנט');
    await carousel.getByRole('button', { name: /ציטוט 4 מתוך 4/ }).click();
    await expect(activeName).toHaveText('אילנית חזן');
    await expect(carousel.locator('[data-bs-slide-to="3"]')).toHaveAttribute('aria-current', 'true');
    await carousel.getByRole('button', { name: 'הציטוט הקודם' }).click();
    await expect(activeName).toHaveText('יהודה שביט');
    // Only the active slide is visible (the others are hidden from assistive technology too)
    await expect(carousel.locator('.carousel-item:not(.active)').first()).toBeHidden();
  });

  test('solution page marks upcoming features as "בקרוב"', async ({ page }) => {
    await page.goto('/solution');
    const badge = page.locator('.badge-soon').first();
    await expect(badge).toHaveText('בקרוב');
    // The rocket icon is decorative and doesn't change the label's height (one text line)
    await expect(badge.locator('svg.icon')).toHaveAttribute('aria-hidden', 'true');
    const { height, fontSize } = await badge.evaluate((el) => ({
      height: el.getBoundingClientRect().height,
      fontSize: parseFloat(getComputedStyle(el).fontSize),
    }));
    expect(height).toBeCloseTo(fontSize * 1.8, 0);
  });

  test('"360°" keeps the degree sign after the number in RTL', async ({ page }) => {
    await page.goto('/capabilities');
    const title = page.getByRole('heading', { name: /360°/ });
    await expect(title).toBeVisible();
    // The source string isolates "360°" with Unicode LTR isolates (U+2066 … U+2069)
    expect(await title.textContent()).toContain('⁦360°⁩');
  });
});

test.describe('scroll progress', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('fills from the right as the page scrolls', async ({ page }) => {
    await page.goto('/solution');
    const bar = page.locator('.scroll-progress');
    const box = () => bar.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return { width: r.width, rightGap: window.innerWidth - r.right };
    });
    expect((await box()).width).toBeLessThan(2);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(async () => (await box()).width).toBeGreaterThan(page.viewportSize()!.width - 2);
    await page.evaluate(() => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) / 2));
    await expect.poll(async () => Math.round((await box()).width / page.viewportSize()!.width * 10)).toBe(5);
    expect(Math.round((await box()).rightGap)).toBe(0); // anchored at the inline-start (right in RTL)
  });
});

test('scroll progress is hidden for visitors who prefer reduced motion', async ({ page }) => {
  await page.goto('/solution');
  await expect(page.locator('.scroll-progress')).toBeHidden();
});

test('favicons are linked and served', async ({ page, request }) => {
  await page.goto('/');
  for (const sel of ['link[rel="icon"][href="/favicon.ico"]', 'link[rel="icon"][href="/icon-192.png"]', 'link[rel="apple-touch-icon"]']) {
    const href = await page.locator(sel).getAttribute('href');
    const res = await request.get(href!);
    expect(res.ok(), href!).toBe(true);
  }
});

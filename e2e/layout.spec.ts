import { expect, test } from '@playwright/test';
import { DOCS, FIXTURE, hasVisibleFocusIndicator } from './helpers';

test.describe('reflow at 320 CSS pixels (WCAG 1.4.10)', () => {
  test.use({ viewport: { width: 320, height: 800 } });

  for (const url of [FIXTURE + '/', DOCS + '/', DOCS + '/#/everything', DOCS + '/#/guide/table-options']) {
    test(url, async ({ page }) => {
      await page.goto(url);
      await page.locator('h1').first().waitFor();
      // Wide tables scroll inside their own wrapper; the page itself must not scroll sideways.
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(320);
    });
  }
});

test.describe('forced colors / Windows High Contrast', () => {
  test('icons stay visible and focus is still indicated', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto(FIXTURE + '/');
    const table = page.locator('#shark-table-default');
    await table.getByRole('table').waitFor();

    // The sort icon is an icon font glyph; it must keep a real size so it is drawn in forced colors.
    const icon = table.locator('.sort-button i').first();
    const box = await icon.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(4);

    await table.getByRole('button', { name: 'Change sorting for Id' }).focus();
    expect(await hasVisibleFocusIndicator(page)).toBe(true);
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the table does not animate', async ({ page }) => {
    await page.goto(FIXTURE + '/');
    const button = page.locator('#shark-table-default .pagination button').first();
    await button.waitFor();
    const duration = await button.evaluate(el => getComputedStyle(el).transitionDuration);
    expect(duration.split(',').every(d => parseFloat(d) === 0)).toBe(true);
  });
});

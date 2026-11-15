import { expect, test } from '@playwright/test';
import { FIXTURE, focusedName, hasVisibleFocusIndicator } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto(FIXTURE + '/');
  await page.getByRole('table', { name: 'Cars with paging and filtering' }).waitFor();
});

test('tab order through a table is logical and every stop shows focus', async ({ page }) => {
  const table = page.locator('#shark-table-default');
  await table.getByRole('button', { name: 'Choose Columns' }).focus();

  const stops: string[] = [];
  for (let i = 0; i < 9; i++) {
    stops.push(await focusedName(page));
    expect(await hasVisibleFocusIndicator(page), `visible focus on ${stops.at(-1)}`).toBe(true);
    await page.keyboard.press('Tab');
  }

  expect(stops).toEqual([
    'button: Choose Columns',
    'input: Filter Results (all column search)',
    'button: Change sorting for Id',
    'button: Change sorting for Year',
    'button: Change sorting for Make',
    'button: Change sorting for Model',
    'select: Rows per page:',
    expect.stringMatching(/^button: Page 1$/),
    expect.stringMatching(/^button: Page 2$/)
  ]);
});

test('sorting by keyboard updates aria-sort and is announced', async ({ page }) => {
  const table = page.locator('#shark-table-default');
  await table.getByRole('button', { name: 'Change sorting for Year' }).focus();
  await page.keyboard.press('Enter');

  await expect(table.getByRole('columnheader', { name: /Year/ })).toHaveAttribute('aria-sort', 'ascending');
  await expect(page.locator('#shark-table-aria-notifier-default')).toHaveText('sorted ascending');

  await page.keyboard.press('Enter');
  await expect(table.getByRole('columnheader', { name: /Year/ })).toHaveAttribute('aria-sort', 'descending');
});

test('filtering is announced with the result count', async ({ page }) => {
  await page.locator('#shark-table-default').getByLabel('Filter Results (all column search)').pressSequentially('honda');
  await expect(page.locator('#shark-table-aria-notifier-default')).toContainText(/Filtering changed, showing 1 to 5 of \d+ \(filtered\)/);
});

test('focus moves to the active page when the Next button disappears', async ({ page }) => {
  const table = page.locator('#shark-table-default');
  await table.getByRole('button', { name: 'Next Page' }).focus();

  // Wait for each page to render before pressing again, as a person would.
  for (let page_ = 2; page_ <= 5; page_++) {
    await page.keyboard.press('Enter');
    await expect(page.locator('#active-button-default')).toContainText(String(page_));
  }

  await expect(table.getByRole('button', { name: 'Next Page' })).toHaveCount(0);
  await expect(page.locator('#active-button-default')).toBeFocused();
  await expect(page.locator('#shark-table-aria-notifier-default')).toContainText('Page changed to 5');
});

test('focus follows a column moved with the keyboard', async ({ page }) => {
  const table = page.locator('#shark-table-ordering');
  await table.getByRole('button', { name: 'Move the Year column right' }).focus();
  await page.keyboard.press('Enter');

  await expect.poll(async () => (await table.locator('th .header-text').allInnerTexts()).map(h => h.trim()))
    .toEqual(['Id', 'Make', 'Year', 'Model']);
  await expect(page.locator('#order-ordering-year-right')).toBeFocused();
});

test('child rows open and close with the keyboard', async ({ page }) => {
  const toggle = page.locator('#shark-table-children').getByRole('button', { name: 'Details Row' }).first();
  await toggle.focus();
  await page.keyboard.press('Space');

  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Details for car 1:')).toBeVisible();

  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText('Details for car 1:')).toBeHidden();
});

test('column picker works with the keyboard', async ({ page }) => {
  const table = page.locator('#shark-table-default');
  const toggle = table.getByRole('button', { name: 'Choose Columns' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');

  await table.getByRole('checkbox', { name: 'Make' }).focus();
  await page.keyboard.press('Space');
  await expect(table.getByRole('columnheader', { name: /Make/ })).toHaveCount(0);
});

test('linked rows open with Enter, and in a new tab with middle click', async ({ page, context }) => {
  const row = page.locator('#shark-table-links tr.data-row').first();

  const popupPromise = context.waitForEvent('page');
  await row.click({ button: 'middle' });
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/#\/detail\/1$/);
  await popup.close();
  await expect(page).not.toHaveURL(/detail/);

  await row.focus();
  expect(await hasVisibleFocusIndicator(page)).toBe(true);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/detail\/1$/);
  await expect(page.getByRole('heading', { name: 'Car 1' })).toBeVisible();
});

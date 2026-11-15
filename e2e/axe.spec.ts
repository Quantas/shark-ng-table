import { test } from '@playwright/test';
import { DOCS, FIXTURE, expectNoAxeViolations } from './helpers';

test.describe('axe: default library styles (fixture)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FIXTURE + '/');
    await page.getByRole('table', { name: 'Cars with paging and filtering' }).waitFor();
  });

  test('initial render', async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  test('column picker open', async ({ page }) => {
    await page.locator('#shark-table-default').getByRole('button', { name: 'Choose Columns' }).click();
    await expectNoAxeViolations(page, '#shark-table-default');
  });

  test('child row open', async ({ page }) => {
    await page.locator('#shark-table-children').getByRole('button', { name: 'Details Row' }).first().click();
    await expectNoAxeViolations(page, '#shark-table-children');
  });

  test('filtered and sorted', async ({ page }) => {
    const table = page.locator('#shark-table-default');
    await table.getByLabel('Filter Results (all column search)').fill('subaru');
    await table.getByRole('button', { name: 'Change sorting for Year' }).click();
    await expectNoAxeViolations(page, '#shark-table-default');
  });

  test('last page', async ({ page }) => {
    await page.locator('#shark-table-default').getByRole('button', { name: 'Last Page' }).click();
    await expectNoAxeViolations(page, '#shark-table-default');
  });

  test('row link target page', async ({ page }) => {
    await page.goto(FIXTURE + '/#/detail/1');
    await page.getByRole('heading', { name: 'Car 1' }).waitFor();
    await expectNoAxeViolations(page);
  });
});

const DOCS_ROUTES = [
  '/', '/#/guide/setup', '/#/guide/styling', '/#/guide/table-options', '/#/guide/column-options', '/#/guide/child-rows',
  '/#/guide/migrating', '/#/guide/accessibility', '/#/guide/developers',
  '/#/basic', '/#/pageable', '/#/filterable', '/#/paging-filtering', '/#/column-filtering', '/#/column-ordering',
  '/#/column-picker', '/#/custom-cells', '/#/cellstyle', '/#/child-rows', '/#/row-link', '/#/content-projection',
  '/#/observable', '/#/data-export', '/#/large', '/#/two-tables', '/#/toggle-table', '/#/everything', '/#/link-target/5'
];

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`axe: docs site (${colorScheme})`, () => {
    test.use({ colorScheme });

    for (const route of DOCS_ROUTES) {
      test(route, async ({ page }) => {
        await page.goto(DOCS + route);
        await page.locator('main h1').first().waitFor();
        await expectNoAxeViolations(page);
      });
    }
  });
}

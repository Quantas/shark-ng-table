import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export const FIXTURE = 'http://localhost:4301';
export const DOCS = 'http://localhost:4302';

/** Runs axe (WCAG 2.0/2.1/2.2 A and AA rules plus best practices) and fails with a readable list of violations. */
export async function expectNoAxeViolations(page: Page, include?: string): Promise<void> {
  let builder = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']);
  if (include) {
    builder = builder.include(include);
  }
  const { violations } = await builder.analyze();
  const summary = violations.map(v =>
    `${v.impact} ${v.id}: ${v.help}\n` + v.nodes.slice(0, 3).map(n => `    ${n.target.join(' ')}\n      ${n.failureSummary?.replace(/\n/g, '\n      ')}`).join('\n'));
  expect(summary, 'axe violations').toEqual([]);
}

/** True when the element has a visible focus indicator (an outline or a box-shadow). */
export async function hasVisibleFocusIndicator(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) {
      return false;
    }
    const style = getComputedStyle(el);
    const outline = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0;
    return outline || style.boxShadow !== 'none';
  });
}

/** Describes the focused element by its accessible name, falling back to its tag. */
export async function focusedName(page: Page): Promise<string> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) {
      return '<body>';
    }
    const label = el.getAttribute('aria-label')
      ?? (el.id ? document.querySelector(`label[for="${el.id}"]`)?.textContent : null)
      ?? el.textContent;
    return `${el.tagName.toLowerCase()}: ${(label ?? '').replace(/\s+/g, ' ').trim()}`;
  });
}

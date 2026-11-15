# Accessibility

shark-ng-table is built to meet [WCAG 2.2](https://www.w3.org/TR/WCAG22/) level AA. Section 508 and the ADA rules for public entities refer to WCAG 2.0 and 2.1 AA, which 2.2 AA includes.

This page lists what is tested automatically, and the manual checks to run before a release. Automated tools find only part of the problems that real users hit, so the manual checks matter.

A library cannot make an application accessible on its own. Your captions, column headers, colors and surrounding page affect the result. See [Styling](usage/styling.md) before changing colors.

## Automated checks (run on every pull request)

| Check | Where | What it covers |
| --- | --- | --- |
| axe-core, real browser | `e2e/axe.spec.ts` | WCAG 2.0 to 2.2 A/AA rules, including color contrast and target size. Runs on the library's **default stylesheet** (the `a11y-fixture` app) in several states: initial render, column picker open, child row open, filtered and sorted, last page. Also runs on every docs page in light and dark mode. |
| Keyboard | `e2e/keyboard.spec.ts` | Tab order, visible focus on every stop, sorting, filtering, paging (focus is kept when the Next button disappears), column reordering, child rows, the column picker and row links (Enter, and middle click opening a new tab). Also checks that changes are announced in the live region. |
| Reflow | `e2e/layout.spec.ts` | No horizontal page scrolling at 320 CSS pixels (WCAG 1.4.10). Wide tables scroll inside their own wrapper. |
| Forced colors | `e2e/layout.spec.ts` | Icons keep their size and focus stays visible with Windows High Contrast emulated. |
| Reduced motion | `e2e/layout.spec.ts` | No transitions when the user prefers reduced motion. |
| axe-core, unit tests | `projects/shark-ng-table/src/test/accessibility.spec.ts` | ARIA and structure for five table configurations (jsdom, so no color contrast). |
| Template lint | `eslint.config.js` | angular-eslint template accessibility rules. |

Run them locally:

```bash
npx playwright install chromium   # once
npm run e2e
npm test
npm run lint
```

## Manual checks (before each release)

Record the result in the release notes. A table configuration means default options, column filtering with ordering, child rows, row links, and server side data. The [fixture app](https://github.com/sharkops-io/shark-ng-table/tree/master/projects/a11y-fixture) has all of them on one page (`npx ng serve a11y-fixture`).

### Keyboard only

- [ ] Every control can be reached with Tab and used with Enter or Space, in a logical order
- [ ] Focus is always visible, and never lost to the top of the page after sorting, paging, reordering columns or opening the column picker
- [ ] Nothing traps focus

### Screen readers

Test at least VoiceOver with Safari on macOS and NVDA with Firefox or Chrome on Windows.

- [ ] The table caption and column headers are announced when entering the table and moving between cells
- [ ] Sort state is announced on headers ("ascending", "descending")
- [ ] Sorting, filtering, paging and page size changes are announced once, with a useful message
- [ ] Filter boxes, the page size select and every button have meaningful names
- [ ] Child row toggles announce expanded or collapsed
- [ ] Linked rows can be followed, and it is clear that they are links

### Zoom and reflow

- [ ] At 200% browser zoom nothing overlaps or is cut off
- [ ] At 400% zoom (or a 320px wide window) the page does not scroll sideways, apart from the table itself
- [ ] With text spacing increased (WCAG 1.4.12 bookmarklet), no text is clipped

### Display settings

- [ ] Windows High Contrast (forced colors): sort, paging and expand icons are visible, and focus is visible
- [ ] macOS Increase Contrast and Reduce Motion: nothing breaks, and nothing animates
- [ ] Dark mode in your application's theme still meets contrast

## Reporting a problem

Open an [issue](https://github.com/sharkops-io/shark-ng-table/issues) with the browser, assistive technology and version, the table options used, and what you expected to happen.

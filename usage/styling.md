# Styling

## Include the stylesheet

Add the stylesheet to the `styles` array of your application in `angular.json`:

```json
"styles": [
  "node_modules/shark-ng-table/shark-ng-table.min.css",
  "src/styles.css"
]
```

Or import it from your global stylesheet:

```css
@import 'shark-ng-table/shark-ng-table.min.css';
```

The stylesheet uses a small icon font for the sort, paging and child row icons. It is published next to the CSS in `fonts/`, and the Angular build copies it for you.

## Theming

Every rule is scoped under `.shark-table`, so you can override colors from your own stylesheet. For example, striped rows and the active page button:

```css
.shark-table .data-row.odd { background-color: #eef3f7; }
.shark-table .pagination button.active { background-color: #17212b; color: #fff; }
```

Keep a contrast ratio of at least 4.5:1 for text and 3:1 for focus indicators so the table stays WCAG AA compliant.

## Per row and per cell styles

Use `rowStylingFunction` and `cellStylingFunction` to style individual rows or cells from your data. See the [Table options](shark-table-options.md).

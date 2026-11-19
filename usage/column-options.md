# Column options

* header - `string`
  * Display name
* property - `string`
  * Property for this column from the data object. Use dots for nested values, for example `owner.name`.
* pipe - `Type<PipeTransform>`
  * `PipeTransform` to use for rendering the column.
* pipeConstructorArgs - `any[]`
  * Any arguments for the pipe
* pipeArgs - `any[]`
  * Arguments to pass to the pipe
* component - `Type<SharkDynamicContents>`
  * A Component to use for rendering the column. It receives the cell value as `data` and the whole row as `row`. See [Custom cell components](#custom-cell-components).
* sortType - `SharkSortType`
  * The current sort type for this column
* ascendingSortFunction - `(left: any, right: any) => number`
  * Provide a custom column sorting function. Without one, numbers, numeric strings and dates sort numerically, other values as strings, and empty values (`null`, `undefined`, `''`) sort last.
* alignRight - `boolean` - `false`
  * If the column should be aligned to the right in the cell.
* filter - `string`
  * The current filter string for this column
* unsortable - `boolean` - `false`
  * If this column should not be sortable
* displayed - `boolean` - `true`
  * If this column is currently shown
* hideHeaderFilter - `boolean` - `false`
  * Disable filtering for this column
* disableOrdering - `boolean` - `false`
  * Disable column re-ordering for this column

## Custom cell components

Set `component` on a column to render its cells with your own component. The table sets two inputs:

* `data`: the value of the cell (`row[property]`)
* `row`: the whole row

```typescript
import { Component, computed, input } from '@angular/core';
import { SharkColumn, SharkDynamicContents } from 'shark-ng-table';

@Component({
  selector: 'app-make',
  template: `<span [class]="data()">{{ label() }}</span>`
})
export class MakeComponent implements SharkDynamicContents {
  readonly data = input.required<string>();
  readonly row = input.required<{ year: number }>();
  protected readonly label = computed(() => `${this.data()} (${this.row().year})`);
}

columns: SharkColumn[] = [
  { header: 'Make', property: 'make', component: MakeComponent }
];
```

Declare only the inputs you need. `@Input()` and plain `data`/`row` properties work too; earlier versions only supported those. Signal inputs need shark-ng-table 8.1 or later.

# shark-table options

* tableId - `string` - unique per table (`st1`, `st2`, ...)
    * An ID for this table, used to build unique element ids
* data - `any[]`, `Page`, `Observable<Page>` or `Observable<any[]>`
    * The raw table data. Arrays (including arrays emitted by an Observable) are filtered, sorted and paged locally. The table never modifies your array.
* columns - `SharkColumn[]`
    * The table column definitions
* caption - `string` - `A Data Table`
    * The <caption> text for this table
* hideCaption - `boolean` - `false`
    * Whether or not the table <caption> should be hidden (screen-reader only).
* columnPicker - `boolean` - `false`
    * Allow users to turn columns on and off
* columnOrdering - `boolean` - `false`
    * Allow users to reorder columns with header buttons
* linkTarget - `string`
    * The destination page for the call to `router.navigate` when the row is clicked. Middle click, or Ctrl/Cmd click, opens the row in a new tab.
* linkKey - `string`
    * The property name from the data object to pass to `router.navigate` when the rows is clicked.
* sortable - `boolean` - `true`
    * Enables the sorting headers
* filterable - `boolean` - `true`
    * Enables the global filter text box
* columnFiltering - `boolean` - `false`
    * Enables column specific filter boxes
* localFilter - `boolean` - `true`
    * Enables client-side filtering as opposed to just emitting a `SharkPageChangeEvent`
* showFilterPlaceholders - `boolean` - `true`
    * Enables the placeholder text for the filter boxes
* localPaging - `boolean` - `true`
    * Enables client-side pagination as opposed to just emitting a `SharkPageChangeEvent`
* localPagingSize - `Number` - `10`
    * The size of each page
* localPagingOptions - `Number[]` - `[10, 20, 100]`
    * The supported page sizes
* showLocalPagingOptions - `boolean` - `true`
    * Enables the drop down for changing the page size
* serverSideData - `boolean` - `false`
    * Shows a button that when clicked, emits a `SharkPageChangeEvent`
* initialSort - `string`
    * The initial sort, for example `'year;-make'` (prefix a property with `-` for descending). Applied once, when data first arrives.
* childRows - `boolean` - `false`
    * Enables child rows
* childComponent - `Type<SharkDynamicContents>`
    * A custom component, which implements `SharkDynamicContents`, used to render each child row. See [Child rows](child-rows.md).
* pageChange - `EventEmitter<SharkPageChangeEvent>`
    * `SharkPageChangeEvent` events are emitted from here
* columnChange - `EventEmitter<SharkColumnChangeEvent>`
    * The column metadata is emitted from here whenever it changes
* disableColumnChangeEvent - `boolean` - `false`
    * Disable the column change event, if needed, for performance reasons
* filter - `string`
    * The current filter value
* footer - `boolean` - `true`
    * Displays an informative footer:  'Showing `x` through `y` of `z` rows`
* tableEmptyMessage - `string` - `This table contains no rows`
    * Message to show when the table is empty
* rowStylingFunction - `(row) => { [style: string]: string }`
    * Returns styles (as for `ngStyle`) for a row
* cellStylingFunction - `(row, column, cell) => { [style: string]: string }`
    * Returns styles (as for `ngStyle`) for a cell

## Methods

* exportCurrentData(rendered = true) - `SharkTableCurrentDataEvent`
    * Every row that matches the current filters, in the current sort order, with only the visible columns. For `Page` data, only the current page is available. Pass `false` to skip column pipes.

# shark-table options

* data - `any[]` or `Observable<Page>` or `Observable<any[]>`
    * The raw table data
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
    * The destination page for the call to `router.navigate` when the row is clicked.
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
    * The initial sortString
* childRows - `boolean` - `false`
    * Enables child rows
* childComponent - `SharkDynamicContents`
    * A custom component, which extends `SharkDynamicContents`, that will be used to render each child row. Your custom component needs to be registered in your NgModule as an `entryComponent` and in the `declarations` section.
* pageChange - `EventEmitter<SharkPageChangeEvent>`
    * `SharkPageChangeEvent` events are emitted from here
* filter - `string`
    * The current filter value
* footer - `boolean` - `true`
    * Displays an informative footer:  'Showing `x` through `y` of `z` rows`

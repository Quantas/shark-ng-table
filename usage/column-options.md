# Column options

* header - `string`
  * Display name
* property - `string`
  * Property for this column from the data Object
* pipe - `Type<PipeTransform>`
  * `PipeTransform` to use for rendering the column.
* pipeConstructorArgs - `any[]`
  * Any arguments for the pipe
* pipeArgs - `any[]`
  * Arguments to pass to the pipe
* component - `Type<SharkDynamicContents>`
  * A Component to use for rendering the column.
* sortType - `SharkSortType`
  * The current sort type for this column
* ascendingSortFunction - `(left: any, right: any) => number`
  * Provide a custom column sorting function
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
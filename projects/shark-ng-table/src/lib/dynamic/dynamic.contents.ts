/**
 * Implement this interface in order to provide a custom component to render your
 * child row or table cell.
 *
 * `data` and `row` can be declared in any of these ways:
 *
 * - a signal input: `readonly data = input<any>();` (or `input.required<any>()`)
 * - a decorator input: `@Input() data: any;`
 * - a plain property: `data: any;`
 *
 * Inputs are set with `ComponentRef.setInput`, so OnPush components and `computed()` signals
 * update when the row changes. Aliased inputs work if the alias is `data` or `row`.
 */
export interface SharkDynamicContents {

  /**
   * Data for this instance of SharkDynamicContents, for a Child row, it will be all of the row's
   * data, for a table cell, it will just be the data for that cell.
   */
  data: any;

  /**
   * The row that was used to render this instance of SharkDynamicContents. For a Child row, this field won't
   * be set as it's redundant with this.data. (Optional)
   */
  row?: any;

  /**
   * Called when a child row is opened or closed, if you need to retrieve more data, etc. (Optional)
   */
  childOpen?(value: boolean): void;
}

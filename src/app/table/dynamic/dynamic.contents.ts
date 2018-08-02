/**
 * Implement this interface in order to provide a custom component to render your
 * child row or table cell.
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
   * This is called when a child row is opened, if you need to retrieve more data, etc.
   */
  childOpen(value: boolean): void;
}

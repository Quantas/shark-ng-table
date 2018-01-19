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
   * This is called when a child row is opened, if you need to retrieve more data, etc.
   * @param {boolean} value
   */
  childOpen(value: boolean): void;
}

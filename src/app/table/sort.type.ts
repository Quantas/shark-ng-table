/**
 * Enumeration of the 3 different Sort types
 */
export enum SharkSortType {
  /**
   * No sorting applied, defaults to ASC.
   */
  NONE,

  /**
   * Sort ascending (1, 2, 3)
   */
  ASC,

  /**
   * Sort descending (3, 2, 1)
   */
  DESC
}

/**
 * Placeholder for a column sort
 */
export class SharkCurrentSort {
  /**
   * Column property
   */
  property: string;

  /**
   * Sort type
   */
  sortType: SharkSortType;
}

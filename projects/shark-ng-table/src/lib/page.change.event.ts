import { SharkCurrentSort } from './sort.type';
import { SharkColumn } from './column';

/**
 * This event is emitted when the current Page changes or if the current sorts/filters change
 */
export interface SharkPageChangeEvent {

  /**
   * The new page number
   */
  pageNo: number;

  /**
   * The current column array (with sorting/filtering information
   */
  columns: SharkColumn[];

  /**
   * The current global filter text
   */
  filter?: string;

  /**
   * The current sorting array
   */
  sorts?: SharkCurrentSort[];

  /**
   * The current sort string, formatted as comma separated, with the `-` sign signifying descending
   */
  sortString?: string;
}

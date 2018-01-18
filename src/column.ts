import { PipeTransform, Type } from '@angular/core';
import { SharkSortType } from './sort.type';
import { SharkDynamicContents } from './dynamic/dynamic.contents';

/**
 * A column definition for shark-ng-table
 */
export interface SharkColumn {

  /**
   * Display name
   */
  header: string;

  /**
   * Property for this column from the data Object
   */
  property: string;

  /**
   * {@link PipeTransform} to use for rendering the column.
   */
  pipe?: Type<PipeTransform>;

  /**
   * Any arguments for the pipe
   */
  pipeConstructorArgs?: any[];

  /**
   * Arguments to pass to the pipe
   */
  pipeArgs?: any[];

  /**
   * A Component to use for rendering the column.
   */
  component?: Type<SharkDynamicContents>;

  /**
   * The current sort type for this column
   */
  sortType?: SharkSortType;

  /**
   * If the column should be aligned to the right in the cell.
   */
  alignRight?: boolean;

  /**
   * The current filter string for this column
   */
  filter?: string;

  displayed?: boolean;
}

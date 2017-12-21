import { PipeTransform, Type } from '@angular/core';
import { SortType } from './sort.type';
import { SharkTableCellContents } from './table.cell.contents';

export interface SharkColumn {
  header: string;
  property: string;
  pipe?: Type<PipeTransform>;
  pipeConstructorArgs?: any[];
  component?: Type<SharkTableCellContents>;
  pipeArgs?: any[];
  sortType?: SortType;
  alignRight?: boolean;
}

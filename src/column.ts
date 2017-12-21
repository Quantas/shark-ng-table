import { PipeTransform, Type } from '@angular/core';
import { SortType } from './sort.type';
import { TableCellContents } from './table.cell.contents';

export interface Column {
  header: string;
  property: string;
  pipe?: Type<PipeTransform>;
  pipeConstructorArgs?: any[];
  component?: Type<TableCellContents>;
  pipeArgs?: any[];
  sortType?: SortType;
  alignRight?: boolean;
}

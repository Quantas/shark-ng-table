import { Pipe, PipeTransform } from '@angular/core';
import { Column } from './column';
import { TableUtils } from './table.utils';

@Pipe({name: 'localfilter'})
export class LocalFilterPipe implements PipeTransform {

  constructor(private tableUtils: TableUtils) {}

  transform(items: any, cols: Column[], localFilter: boolean, filterText: string): any {
    if (!localFilter || !filterText) {
      return items;
    }

    return items.filter((row) => {
      let found = false;

      cols.forEach((col: Column) => {
        const value: string = this.tableUtils.retrieveCell(row, col) + '';
        if (value && (value.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)) {
          found = true;
        }
      });

      return found;
    });
  }

}

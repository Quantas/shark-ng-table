import { Pipe, PipeTransform } from '@angular/core';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';

@Pipe({name: 'localfilter'})
export class LocalFilterPipe implements PipeTransform {

  constructor(private tableUtils: SharkTableUtils) {}

  transform(items: any, cols: SharkColumn[], localFilter: boolean, filterText: string): any {
    if (!localFilter || !filterText) {
      return items;
    }

    return items.filter((row) => {
      let found = false;

      cols.forEach((col: SharkColumn) => {
        const value: string = this.tableUtils.retrieveCell(row, col) + '';
        if (value && (value.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)) {
          found = true;
        }
      });

      return found;
    });
  }

}

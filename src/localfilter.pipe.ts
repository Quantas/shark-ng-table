import { Pipe, PipeTransform } from '@angular/core';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';

@Pipe({name: 'localfilter'})
export class LocalFilterPipe implements PipeTransform {

  constructor(private tableUtils: SharkTableUtils) {}

  transform(items: any, cols: SharkColumn[], localFilter: boolean, localPaging: boolean, filterText: string): any {
    if (!localFilter || !filterText || localPaging) {
      return items;
    }

    return this.tableUtils.filter(items, cols, filterText);
  }

}

import {Pipe, PipeTransform} from '@angular/core';
import {SharkColumn} from './column';
import {SharkTableUtils} from './table.utils';

@Pipe({
    name: 'localfilter'
})
export class LocalFilterPipe implements PipeTransform {

    constructor(private tableUtils: SharkTableUtils) {
    }

    transform(items: any, cols: SharkColumn[], localFilter: boolean, localPaging: boolean, columnFiltering: boolean, filterText: string): any {
        if (localFilter && (columnFiltering && this.tableUtils.hasFilter(cols) || (filterText && filterText.length > 0))) {
            return this.tableUtils.filter(items, cols, columnFiltering, filterText);
        }

        return items;
    }

}

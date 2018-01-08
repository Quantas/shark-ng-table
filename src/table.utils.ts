import { SharkColumn } from './column';
import { Injectable } from '@angular/core';

@Injectable()
export class SharkTableUtils {

  public retrieveCell(row: Object, column: SharkColumn): string {
    const cell = this.findValue(row, column.property);

    if (column.pipe) {
      const pipe = new column.pipe(column.pipeConstructorArgs);
      return pipe.transform(cell, column.pipeArgs);
    }

    return cell;
  }

  public filter(items: any, cols: SharkColumn[], columnFiltering: boolean, filterText: string) {
    return items.filter((row) => {
      let found = false;

      if (columnFiltering && this.hasFilter(cols)) {
          let rowFound = false;

          cols.forEach((col: SharkColumn) => {
              const value: string = this.retrieveCell(row, col) + '';
              const search = col.filter ? col.filter : '';
              if (search.length > 0) {
                  if (value && (value.toLowerCase().indexOf(search.toLowerCase()) !== -1)) {
                      rowFound = true;
                  } else {
                      rowFound = false;
                  }
              }
          });

          found = rowFound;
      } else if (columnFiltering && !this.hasFilter(cols)) {
          return true;
      } else if (filterText) {
          cols.forEach((col: SharkColumn) => {
              const value: string = this.retrieveCell(row, col) + '';
              if (filterText && value && (value.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)) {
                  found = true;
              }
          });
      }

      return found;
    });
  }

  public findValue(input: Object, key: string): any {
    const arr = key.split('.');
    while (arr.length && (input = input[arr.shift()])) {};
    return input;
  }

  public hasFilter(cols: SharkColumn[]): boolean {
    return cols.filter((col) => col.filter && col.filter.length > 0).length > 0;
  }

}

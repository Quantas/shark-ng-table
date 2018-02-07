import { SharkColumn } from './column';
import { Injectable, PipeTransform, Type } from '@angular/core';

@Injectable()
export class SharkTableUtils {

  public retrieveCell(row: Object, column: SharkColumn): string {
    const cell = this.findValue(row, column.property);

    if (column.pipe) {
      return this.applyPipe(column.pipe, cell, column.pipeArgs, column.pipeConstructorArgs);
    }

    return cell;
  }

  public applyPipe(pipe: Type<PipeTransform>, cell,  pipeArgs: any[], pipeConstructorArgs: any[]): string {
    const pipeInstance = new pipe(...pipeConstructorArgs);
    return pipeInstance.transform(cell, ...pipeArgs);
  }

  public filter(items: any, cols: SharkColumn[], columnFiltering: boolean, filterText: string) {
    return items.filter((row) => {
      let found = false;

      if (columnFiltering && this.hasFilter(cols)) {
          let rowFound = false;

          // Not using forEach here because we needed to break when a false match occurs during column filtering
          for (const col of cols) {
            const value = this.retrieveCell(row, col) + '';
            const search = col.filter ? col.filter : '';

            if (search.length > 0) {
              if (value && (value.toLowerCase().indexOf(search.toLowerCase()) !== -1)) {
                rowFound = true;
              } else {
                rowFound = false;
                break;
              }
            }
          }

          found = rowFound;
      } else if (columnFiltering && !this.hasFilter(cols)) {
          return true;
      } else if (filterText) {
          cols.forEach((col: SharkColumn) => {
              const value = this.retrieveCell(row, col) + '';
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

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

  public filter(items: any, cols: SharkColumn[], filterText: string) {
    return items.filter((row) => {
      let found = false;

      cols.forEach((col: SharkColumn) => {
        const value: string = this.retrieveCell(row, col) + '';
        if (value && (value.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)) {
          found = true;
        }
      });

      return found;
    });
  }

  public findValue(input: Object, key: string): any {
    const arr = key.split('.');
    while (arr.length && (input = input[arr.shift()])) {};
    return input;
  }

}

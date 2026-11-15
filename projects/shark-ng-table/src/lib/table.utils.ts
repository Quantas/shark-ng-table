import { Injectable, PipeTransform, Type } from '@angular/core';
import { SharkColumn } from './column';

@Injectable({ providedIn: 'root' })
export class SharkTableUtils {

  public exportRow(row: object, columns: SharkColumn[], rendered: boolean): Record<string, any> {
    const newRow: Record<string, any> = {};

    columns.filter(col => col.displayed).forEach(col => {
       newRow[col.property] = this.retrieveCell(row, col, rendered);
    });

    return newRow;
  }

  public retrieveCell(row: object, column: SharkColumn, rendered: boolean = true): any {
    const cell = this.findValue(row, column.property);

    if (column.pipe && rendered) {
      return this.applyPipe(column.pipe, cell, column.pipeArgs, column.pipeConstructorArgs);
    }

    return cell;
  }

  public applyPipe(pipe: Type<PipeTransform>, cell: any, pipeArgs: any[] = [], pipeConstructorArgs: any[] = []): any {
    const pipeInstance = new pipe(...pipeConstructorArgs);
    return pipeInstance.transform(cell, ...pipeArgs);
  }

  /**
   * Returns the rows that match either the column specific filters (when `columnFiltering` is enabled and any column
   * has a filter) or the global `filterText`. Rows are returned unfiltered when neither applies.
   */
  public filter(items: any[], cols: SharkColumn[], columnFiltering: boolean, filterText: string | undefined): any[] {
    const useColumnFilters = columnFiltering && this.hasFilter(cols);
    const globalFilter = (filterText ?? '').toLowerCase();

    if (!useColumnFilters && (columnFiltering || globalFilter.length === 0)) {
      return items.slice();
    }

    return items.filter((row) => {
      if (useColumnFilters) {
        return cols.every((col: SharkColumn) => {
          const search = (col.filter ?? '').toLowerCase();
          return search.length === 0 || this.cellText(row, col).includes(search);
        });
      }

      return cols.some((col: SharkColumn) => this.cellText(row, col).includes(globalFilter));
    });
  }

  /**
   * Safely reads a (possibly nested, dot separated) property from an object.
   */
  public findValue(input: any, key: string): any {
    return key.split('.').reduce((value, part) => (value == null ? undefined : value[part]), input);
  }

  public hasFilter(cols: SharkColumn[] | undefined): boolean {
    return !!cols && cols.some((col) => !!col.filter && col.filter.length > 0);
  }

  /**
   * Default ascending comparator used for sorting.
   *
   * - `null`/`undefined` sort after every other value
   * - numbers, numeric strings and Dates compare numerically
   * - everything else compares as strings
   */
  public compare(a: any, b: any): number {
    const aEmpty = a == null || a === '';
    const bEmpty = b == null || b === '';
    if (aEmpty || bEmpty) {
      return aEmpty && bEmpty ? 0 : aEmpty ? 1 : -1;
    }

    const aNum = this.toNumber(a);
    const bNum = this.toNumber(b);
    if (aNum !== undefined && bNum !== undefined) {
      return aNum === bNum ? 0 : aNum < bNum ? -1 : 1;
    }

    const aStr = String(a);
    const bStr = String(b);
    return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
  }

  private toNumber(value: any): number | undefined {
    if (typeof value === 'number') {
      return Number.isNaN(value) ? undefined : value;
    }
    if (value instanceof Date) {
      return value.getTime();
    }
    if (typeof value === 'string' && value.trim() !== '') {
      const num = Number(value);
      return Number.isFinite(num) ? num : undefined;
    }
    return undefined;
  }

  private cellText(row: object, col: SharkColumn): string {
    const value = this.retrieveCell(row, col);
    return value == null ? '' : String(value).toLowerCase();
  }
}

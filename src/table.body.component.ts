import { Component, Input, OnChanges, SimpleChanges, Type } from '@angular/core';
import { SharkColumn } from './column';
import { Router } from '@angular/router';
import { SharkTableUtils } from './table.utils';
import { SharkDynamicContents } from './dynamic/dynamic.contents';
import { Page } from './page';

/**
 * This component controls each row in the table.
 */
@Component({
    selector: '[shark-table-body]',
    template: `
        <ng-container *ngIf="page.content && currentColumns.length > 0">
          <ng-container *ngFor="let row of (page.content | localfilter:currentColumns:localFilter:localPaging:columnFiltering:filter); let e = even; let o = odd; let i = index;">
            <tr class="data-row"
                [ngClass]="{ odd: o, even: e, rowLink: linkTarget, rowOpen: childOpen(i) }"
                [ngStyle]="rowStylingFunction(row)"
                (click)="rowClick(row)" (keyup.enter)="rowClick(row)"
                [attr.tabindex]="linkTarget ? 0 : null"
            >
                <td class="header-buttons" *ngIf="childRows">
                  <button class="black-arrow fa fa-fw"
                          [ngClass]="{ 'open': childOpen(i), 'closed': !childOpen(i), 'fa-caret-down': childOpen(i), 'fa-caret-right': !childOpen(i) }"
                          (click)="toggleChild(i)" type="button"
                  >
                    <span class="screen-reader-button-label">{{ childOpen(i) ? 'close' : 'open' }}  this child row</span>
                  </button>
                </td>
                <ng-container *ngFor="let column of currentColumns">
                    <td [ngClass]="{'right': column.alignRight }" [ngStyle]="addStyleToCell(row, column)">
                        <shark-table-cell [column]="column" [row]="row"></shark-table-cell>
                    </td>
                </ng-container>
            </tr>
            <tr *ngIf="childRows" class="data-row child-row" [ngClass]="{ odd: o, even: e, rowOpen: childOpen(i) }" [hidden]="!childOpen(i)">
                <td></td>
                <td [attr.colspan]="currentColumns.length">
                    <shark-child [component]="childComponent" [row]="row" [rowIndex]="i" [openChildren]="openChildren"></shark-child>
                </td>
            </tr>
          </ng-container>
        </ng-container>
        <ng-container *ngIf="currentColumns.length === 0">
          <tr><td [attr.colspan]="childRows ? columns.length + 1 : columns.length">There are no columns selected</td></tr>
        </ng-container>
        <ng-container *ngIf="(!page.content || page.content.length == 0) && currentColumns.length > 0">
          <tr><td [attr.colspan]="childRows ? currentColumns.length + 1 : currentColumns.length">This table contains no rows</td></tr>
        </ng-container>
    `
})
export class SharkTableBodyComponent implements OnChanges {

    @Input()
    currentColumns: SharkColumn[];

    @Input()
    localFilter: boolean;

    @Input()
    localPaging: boolean;

    @Input()
    columnFiltering: boolean;

    @Input()
    filter: string;

    @Input()
    rowStylingFunction: RowStyleFunction;

    @Input()
    cellStylingFunction: CellStyleFunction;

    @Input()
    childRows: boolean;

    @Input()
    childComponent: Type<SharkDynamicContents>;

    @Input()
    linkTarget: string;

    @Input()
    linkKey: string;

    @Input()
    page: Page;

    openChildren: number[] = [];

    constructor(private router: Router, private tableUtils: SharkTableUtils) {}

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.hasOwnProperty('page') && !changes['page'].isFirstChange()) {
        this.openChildren = [];
      }
    }

    addStyleToCell(row: any, column: SharkColumn): { [key: string]: string; } | {} {
      if (this.cellStylingFunction) {
        const cellData = this.tableUtils.retrieveCell(row, column);
        return this.cellStylingFunction(row, column, cellData);
      }

      return null;
    }

    childOpen(index: number) {
      return this.openChildren.indexOf(index) > -1;
    }

    /**
     * Toggle the show/hide status of the child row
     */
    toggleChild(index: number): void {
        if (this.openChildren.indexOf(index) > -1) {
          this.openChildren.splice(this.openChildren.indexOf(index), 1);
        } else {
          this.openChildren.push(index);
        }
        this.openChildren = this.openChildren.slice(0);
    }

    /**
     * If provided, navigate to link for this row using the router.
     *
     * @param {Object} row
     */
    rowClick(row: Object): void {
        if (this.linkTarget && this.linkKey) {
            this.router.navigate([this.linkTarget, this.tableUtils.findValue(row, this.linkKey)]);
        }
    }
}

export interface RowStyleFunction {

  /**
   * Sends in the current row data and returns an object to be
   * used in conjunction with NgStyle with the format like:
   *
   * { 'background-color': 'red' }
   */
  (row: any): {
    [key: string]: string;
  } | {};
}

export interface CellStyleFunction {

  /**
   * Sends in the current row data and returns an object to be
   * used in conjunction with NgStyle with the format like:
   *
   * { 'background-color': 'red' }
   */
  (row: any, column: SharkColumn, cell: any): {
    [key: string]: string;
  } | {};
}

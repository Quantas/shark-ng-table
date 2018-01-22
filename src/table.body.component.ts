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
            <tr role="row" class="data-row"
                [ngClass]="{ odd: o, even: e, rowLink: linkTarget, rowOpen: childOpen(i) }"
                (click)="rowClick(row)" (keyup.enter)="rowClick(row)"
                [attr.tabindex]="linkTarget ? 0 : ''"
            >
                <td role="gridcell" class="header-buttons" *ngIf="childRows">
                  <button class="black-arrow" (click)="toggleChild(i)" [title]="'Click to ' + (childOpen(i) ? 'close' : 'open') + ' this child row.'">
                    <i class="fas fa-fw" [ngClass]="{ 'open': childOpen(i), 'closed': !childOpen(i), 'fa-caret-down': childOpen(i), 'fa-caret-right': !childOpen(i) }"></i>
                    <span class="screen-reader">{{ 'Click to ' + (childOpen(i) ? 'close' : 'open') + ' this child row.' }}</span>
                  </button>
                </td>
                <ng-container *ngFor="let column of currentColumns">
                    <td role="gridcell" [ngClass]="{'right': column.alignRight }">
                        <shark-table-cell [column]="column" [row]="row"></shark-table-cell>
                    </td>
                </ng-container>
            </tr>
            <tr *ngIf="childRows" class="data-row child-row" [ngClass]="{ odd: o, even: e, rowOpen: childOpen(i) }" [hidden]="!childOpen(i)">
                <td></td>
                <td [attr.colspan]="currentColumns.length" role="gridcell">
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

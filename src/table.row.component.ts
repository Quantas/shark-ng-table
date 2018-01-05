import { Component, Input, Type } from '@angular/core';
import { SharkColumn } from './column';
import { SharkChildContents } from './child/child.component.contents';
import { Router } from '@angular/router';
import { SharkTableUtils } from './table.utils';

/**
 * This component controls each row in the table.
 */
@Component({
    selector: '[shark-table-row]',
    template: `        
        <tr role="row" [ngClass]="{ odd: odd, even: even, rowLink: linkTarget, rowOpen: childShown }" (click)="rowClick(row)" (keyup.enter)="rowClick(row)" [attr.tabindex]="linkTarget ? 0 : ''">
            <td role="gridcell" class="childButton pointer" *ngIf="childRows" [ngClass]="{ open: childShown }" (click)="toggleChild()" (keyup.enter)="toggleChild()" tabindex="0">
            </td>
            <ng-container *ngFor="let column of columns">
                <td role="gridcell" [ngClass]="{'right': column.alignRight }">
                    <shark-table-cell [column]="column" [row]="row"></shark-table-cell>
                </td>
            </ng-container>
        </tr>
        <tr *ngIf="childRows" [ngClass]="{ odd: odd, even: even, rowOpen: childShown }" [hidden]="!childShown">
            <td></td>
            <td [attr.colspan]="columns.length" role="gridcell">
                <shark-child [component]="childComponent" [row]="row"></shark-child>
            </td>
        </tr>
    `
})
export class SharkTableRowComponent {
    @Input()
    columns: SharkColumn[];

    @Input()
    childRows: boolean;

    @Input()
    childComponent: Type<SharkChildContents>;

    @Input()
    row: any;

    @Input()
    linkTarget: string;

    @Input()
    linkKey: string;

    @Input()
    odd: boolean;

    @Input()
    even: boolean;

    childShown = false;

    constructor(private router: Router, private tableUtils: SharkTableUtils) {}

    /**
     * Toggle the show/hide status of the child row
     */
    toggleChild(): void {
        this.childShown = !this.childShown;
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
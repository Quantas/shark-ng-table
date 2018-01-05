import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharkColumn} from './column';
import {SharkSortType} from './sort.type';
import {Page} from './page';

@Component({
    selector: '[shark-table-header]',
    template: `
        <tr role="row">
            <th *ngIf="childRows"></th>
            <ng-container *ngIf="sortable">
                <th [ngClass]="{'pointer': sortable, 'right': column.alignRight }"
                    *ngFor="let column of columns"
                    (click)="changeSort(column.property, column.sortType)"
                    (keyup.enter)="changeSort(column.property, column.sortType)"
                    scope="col"
                    role="columnheader"
                    tabindex="0"
                >
                    {{ column.header }} <span class="sorting" [ngClass]="{ 'none': column.sortType === 0, 'asc': column.sortType === 1, 'desc': column.sortType === 2 }"></span>
                </th>
            </ng-container>
            <ng-container *ngIf="!sortable">
                <th [ngClass]="{'right': column.alignRight }"
                    *ngFor="let column of columns"
                    scope="col"
                    role="columnheader"
                >
                    {{ column.header }}
                </th>
            </ng-container>
        </tr>
    `
})
export class SharkTableHeaderComponent {

    @Input()
    sortable: boolean;

    @Input()
    columns: SharkColumn[];

    @Input()
    childRows: boolean;

    @Input()
    refreshButton: boolean;

    @Input()
    page: Page;

    @Input()
    filter: string;

    /**
     * {@link SharkSortChangeEvent} events are emitted from here
     * @type {EventEmitter<SharkSortChangeEvent>}
     */
    @Output()
    sortChange = new EventEmitter<SharkSortChangeEvent>();

    changeSort(property: string, sortType: SharkSortType): void {
        this.sortChange.emit({
            property: property,
            sortType: sortType
        })
    }
}

export interface SharkSortChangeEvent {
    property: string;
    sortType: SharkSortType;
}
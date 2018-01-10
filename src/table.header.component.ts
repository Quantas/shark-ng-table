import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharkColumn} from './column';
import {SharkSortType} from './sort.type';
import {Page} from './page';

@Component({
    selector: '[shark-table-header]',
    template: `
        <tr role="row" *ngIf="columnFiltering && filterable">
            <th *ngIf="childRows"></th>
            <th *ngFor="let column of columns; let i = index" scope="col" role="columnheader">
                <label [for]="'column' + i" class="screen-reader">{{ column.header }} filter</label>
                <input type="text" name="column{{i}}" [id]="'column' + i" [(ngModel)]="column.filter" (ngModelChange)="fireFilterChange()" placeholder="{{ column.header }} filter" />
            </th>
        </tr>
        <tr role="row">
            <th *ngIf="childRows"></th>
            <ng-container *ngIf="sortable">
                <th class="pointer" [ngClass]="{'right': column.alignRight }"
                    *ngFor="let column of columns"
                    (click)="changeSort(column.property, column.sortType)"
                    (keyup.enter)="changeSort(column.property, column.sortType)"
                    scope="col" role="columnheader" tabindex="0">
                    {{ column.header }} <i class="sorting fas fa-fw" [ngClass]="{ 
                      'none': !column.sortType || column.sortType === 0,
                      'fa-sort': !column.sortType || column.sortType === 0, 
                      'asc': column.sortType === 1, 
                      'fa-sort-up': column.sortType === 1,                       
                      'desc': column.sortType === 2,
                      'fa-sort-down': column.sortType === 2  
                    }"></i>
                </th>
            </ng-container>
            <ng-container *ngIf="!sortable">
                <th [ngClass]="{'right': column.alignRight }" *ngFor="let column of columns" scope="col" role="columnheader">
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
    filterable: boolean;

    @Input()
    columnFiltering;

    /**
     * {@link SharkSortChangeEvent} events are emitted from here
     * @type {EventEmitter<SharkSortChangeEvent>}
     */
    @Output()
    sortChange = new EventEmitter<SharkSortChangeEvent>();

    @Output()
    filterChange = new EventEmitter<SharkColumn[]>();

    changeSort(property: string, sortType: SharkSortType): void {
        this.sortChange.emit({
            property: property,
            sortType: sortType
        })
    }

    fireFilterChange(): void {
        this.filterChange.emit(this.columns);
    }
}

export interface SharkSortChangeEvent {
    property: string;
    sortType: SharkSortType;
}

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import {SharkColumn} from './column';
import {SharkSortType} from './sort.type';
import {Page} from './page';
import { SharkColumnDropdownComponent } from './column-dropdown.component';

@Component({
    selector: '[shark-table-header]',
    template: `
        <tr class="info-header" *ngIf="!footer && (serverSideData || (filterable && !columnFiltering) || columnPicker)">
          <td [attr.colspan]="childRows ? columns.length + 1 : columns.length">
            <div class="controls header-buttons">
              <button class="server-refresh fa fa-sync" *ngIf="serverSideData" (click)="fireFilterChange()" type="button">
                <span class="screen-reader-button-label">Refresh Server Data</span>
              </button>
              <shark-column-dropdown *ngIf="columnPicker" [columns]="allColumns" (columnChange)="fireColumnChange($event)"></shark-column-dropdown>
              <span class="filter-box" *ngIf="filterable && !columnFiltering && columns.length > 0">
                <label for="filter" class="screen-reader">Filter Results (all column search)</label>
                <input type="text" name="filter" id="filter" [(ngModel)]="filter" (ngModelChange)="fireFilterChange()" placeholder="Filter Results" />
              </span>
            </div>
          </td>
        </tr>
        <tr class="header-row" *ngIf="columns.length > 0" [ngClass]="{ 'footer': footer, 'header': !footer, 'header-border': (!columnFiltering || !filterable)}">
            <td [id]="(footer ? 'footer-' : '') + 'childHeader'" *ngIf="childRows" class="child-spacer"><span class="screen-reader">Empty column header to offset the child row button.</span></td>
            <ng-container *ngIf="sortable">
                <th class="header-buttons" [ngClass]="{'right': column.alignRight }" scope="col"
                    *ngFor="let column of columns; let i = index; let f = first; let l = last;" 
                    [id]="(footer ? 'footer-' : '') + column.property">
                    <button *ngIf="columnOrdering && !f" (click)="moveColumnBackward(i)" type="button" class="fa fa-angle-left">
                      <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column left' }}</span>
                    </button>
                    <button (click)="changeSort(column.property, column.sortType)" type="button">
                      <span class="screen-reader-button-label">Sorting</span>
                      {{ column.header }} <i class="sorting fas fa-fw" [ngClass]="{ 
                        'none': !column.sortType || column.sortType === 0,
                        'fa-sort': !column.sortType || column.sortType === 0, 
                        'asc': column.sortType === 1, 
                        'fa-sort-up': column.sortType === 1,                       
                        'desc': column.sortType === 2,
                        'fa-sort-down': column.sortType === 2  
                      }"></i>
                      <span class="screen-reader-button-label">{{ 
                        (column.sortType === 0 ? 'None' : column.sortType === 1 ? 'Ascending'  : 'Descending') +
                        ', Click to change sort for the ' + column.header + ' column to ' +
                        ((!column.sortType || column.sortType === 0) ? 'Ascending' : column.sortType === 1 ? 'Descending' : 'None') }}
                      </span>
                    </button>
                    <button *ngIf="columnOrdering && !l" (click)="moveColumnForward(i)" type="button" class="fa fa-angle-right">
                      <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column right' }}</span>
                    </button>
                </th>
            </ng-container>
            <ng-container *ngIf="!sortable">
                <th class="header-buttons" [ngClass]="{'right': column.alignRight }" *ngFor="let column of columns; let i = index; let f = first; let l = last;" scope="col">
                    <button *ngIf="columnOrdering && !f" (click)="moveColumnBackward(i)" type="button" class="fa fa-angle-left">
                      <span class="screen-reader-button-label">Move the {{ column.header }} column left</span>
                    </button>
                    {{ column.header }}
                    <button *ngIf="columnOrdering && !l" (click)="moveColumnForward(i)" type="button" class="fa fa-angle-right">
                      <span class="screen-reader-button-label">Move the {{ column.header }} column right</span>
                    </button>
                </th>
            </ng-container>
        </tr>
        <tr *ngIf="columnFiltering && filterable" class="header-filter-row header-border" [ngClass]="{ 'footer': footer, 'header': !footer}">
          <td *ngIf="childRows"><span class="screen-reader">Empty column header to offset the child row button.</span></td>
          <td *ngFor="let column of columns; let i = index">
            <label [for]="(footer ? 'footer-' : '') + 'column-' + i" class="screen-reader">{{ column.header }} filter</label>
            <input type="text" name="column{{i}}" [id]="(footer ? 'footer-' : '') + 'column-' + i" [(ngModel)]="column.filter" (ngModelChange)="fireFilterChange()" placeholder="{{ column.header }} filter" />
          </td>
        </tr>
    `
})
export class SharkTableHeaderComponent {

    @ViewChild(SharkColumnDropdownComponent)
    columnPickerComponent: SharkColumnDropdownComponent;

    @Input()
    sortable: boolean;

    @Input()
    columns: SharkColumn[];

    @Input()
    allColumns: SharkColumn[];

    @Input()
    columnPicker: boolean;

    @Input()
    columnOrdering: boolean;

    @Input()
    childRows: boolean;

    @Input()
    serverSideData: boolean;

    @Input()
    page: Page;

    @Input()
    footer = false;

    @Input()
    filterable: boolean;

    @Input()
    columnFiltering: boolean;

    @Input()
    filter: string;

    @Input()
    localPagingSize: number;

    /**
     * {@link SharkSortChangeEvent} events are emitted from here
     * @type {EventEmitter<SharkSortChangeEvent>}
     */
    @Output()
    sortChange = new EventEmitter<SharkSortChangeEvent>();

    @Output()
    filterChange = new EventEmitter<SharkHeaderFilterChange>();

    @Output()
    columnChange = new EventEmitter<SharkColumn[]>();

    changeSort(property: string, sortType: SharkSortType): void {
        this.sortChange.emit({
            property: property,
            sortType: sortType
        })
    }

    fireFilterChange(): void {
        this.filterChange.emit({
          columns: this.columns,
          filter: this.filter,
          localPagingSize: this.localPagingSize
        });
    }

    fireColumnChange(event: SharkColumn[]): void {
      this.columnChange.emit(event);
    }

    moveColumnForward(index: number): void {
      this.move(index, 1);
    }

    moveColumnBackward(index: number): void {
      this.move(index, -1);
    }

    private move(index: number, offset: number): void {
      const newIndex = index + offset;
      if (newIndex > -1 && newIndex < this.columns.length) {
        const removedElement = this.columns.splice(index, 1)[0];
        this.columns.splice(newIndex, 0, removedElement);
      }

    }
}

export interface SharkSortChangeEvent {
    property: string;
    sortType: SharkSortType;
}

export interface SharkHeaderFilterChange {
  columns: SharkColumn[];
  filter: string;
  localPagingSize: number;
}

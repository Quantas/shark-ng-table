import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import {SharkColumn} from './column';
import {SharkSortType} from './sort.type';
import {Page} from './page';
import { SharkColumnDropdownComponent } from './column-dropdown.component';


@Component({
    selector: '[shark-table-header]',
    template: `
        <tr class="info-header" *ngIf="!footer && (refreshButton || (filterable && !columnFiltering) || (localPaging && showLocalPagingOptions))">
          <th [attr.colspan]="childRows ? columns.length + 1 : columns.length">
            <div class="controls">
              <button *ngIf="refreshButton" (click)="fireFilterChange()">&#x21bb;</button>
              <shark-column-dropdown *ngIf="columnPicker" [columns]="allColumns" (columnChange)="fireColumnChange($event)"></shark-column-dropdown>
              <form #filterForm="ngForm">
                <span class="filter-box" *ngIf="filterable && !columnFiltering && columns.length > 0">
                  <label for="filter" class="screen-reader">Filter Results (all column search)</label>
                  <input type="text" name="filter" id="filter" [(ngModel)]="filter" (ngModelChange)="fireFilterChange()" placeholder="Filter Results" />
                </span>
                <label class="local-paging-options" *ngIf="localPaging && showLocalPagingOptions && columns.length > 0">
                  Show
                  <select [(ngModel)]="localPagingSize" (change)="fireFilterChange()" name="localPagingSize">
                    <option *ngFor="let option of localPagingOptions" [value]="option">{{ option }}</option>
                  </select>
                  rows
                </label>
              </form>
            </div>
          </th>
        </tr>
        <tr role="row" class="header-row" *ngIf="columns.length > 0">
            <th *ngIf="childRows" class="child-spacer"><span class="screen-reader">Empty column header to offset the child row button.</span></th>
            <ng-container *ngIf="sortable">
                <th class="header-buttons" [ngClass]="{'right': column.alignRight }"
                    *ngFor="let column of columns; let i = index; let f = first; let l = last;"
                    scope="col" role="columnheader">
                    <button *ngIf="columnOrdering && !f" (click)="moveColumnBackward(i)" [value]="'Move the ' + column.header + ' column left'">
                      <i class="fa fa-fw fa-angle-left"></i>
                      <span class="screen-reader">{{ 'Move the ' + column.header + ' column left' }}</span>
                    </button>
                    <button (click)="changeSort(column.property, column.sortType)" [value]="
                      'Sorting ' + column.header + ' as ' +
                        (column.sortType === 0 ? 'None' : column.sortType === 1 ? 'Ascending'  : 'Descending') +
                        ', Click to change sort for the ' + column.header + ' to ' +
                        (column.sortType === 0 ? 'Ascending' : column.sortType === 1 ? 'Descending' : 'None')
                    ">
                      {{ column.header }} <i class="sorting fas fa-fw" [ngClass]="{ 
                        'none': !column.sortType || column.sortType === 0,
                        'fa-sort': !column.sortType || column.sortType === 0, 
                        'asc': column.sortType === 1, 
                        'fa-sort-up': column.sortType === 1,                       
                        'desc': column.sortType === 2,
                        'fa-sort-down': column.sortType === 2  
                      }"></i>
                      <span class="screen-reader">{{ 'Sorting ' + column.header + ' as ' + (column.sortType === 0 ? 'None' : column.sortType === 1 ? 'Ascending'  : 'Descending') }}</span>
                    </button>
                    <button *ngIf="columnOrdering && !l" (click)="moveColumnForward(i)" [value]="'Move the ' + column.header + ' column right'">
                      <i class="fa fa-fw fa-angle-right"></i>
                      <span class="screen-reader">{{ 'Move the ' + column.header + ' column right' }}</span>
                    </button>
                </th>
            </ng-container>
            <ng-container *ngIf="!sortable">
                <th class="header-buttons" [ngClass]="{'right': column.alignRight }" *ngFor="let column of columns; let i = index; let f = first; let l = last;" scope="col" role="columnheader">
                    <button *ngIf="columnOrdering && !f" (click)="moveColumnBackward(i)" [value]="'Move the ' + column.header + ' column left'">
                      <i class="fa fa-fw fa-angle-left"></i>
                      <span class="screen-reader">{{ 'Move the ' + column.header + ' column left' }}</span>
                    </button>
                    {{ column.header }}
                    <button *ngIf="columnOrdering && !l" (click)="moveColumnForward(i)" [value]="'Move the ' + column.header + ' column right'">
                      <i class="fa fa-fw fa-angle-right"></i>
                      <span class="screen-reader">{{ 'Move the ' + column.header + ' column right' }}</span>
                    </button>
                </th>
            </ng-container>
        </tr>
        <tr role="row" *ngIf="columnFiltering && filterable" class="header-row">
          <th *ngIf="childRows"><span class="screen-reader">Empty column header to offset the child row button.</span></th>
          <th *ngFor="let column of columns; let i = index" scope="col" role="columnheader" class="header-row">
            <label [for]="(footer ? 'footer' : '') + '-column-' + i" class="screen-reader">{{ column.header }} filter</label>
            <input type="text" name="column{{i}}" [id]="(footer ? 'footer' : '') + '-column-' + i" [(ngModel)]="column.filter" (ngModelChange)="fireFilterChange()" placeholder="{{ column.header }} filter" />
          </th>
        </tr>
    `
})
export class SharkTableHeaderComponent {

    @ViewChild('filterForm')
    filterForm: NgForm;

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
    refreshButton: boolean;

    @Input()
    page: Page;

    @Input()
    footer = false;

    @Input()
    filterable: boolean;

    @Input()
    columnFiltering: boolean;

    @Input()
    localPaging: boolean;

    @Input()
    localPagingSize: number;

    @Input()
    localPagingOptions: number[];

    @Input()
    showLocalPagingOptions: boolean;

    @Input()
    filter: string;

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

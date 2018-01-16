import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import {SharkColumn} from './column';
import {SharkSortType} from './sort.type';
import {Page} from './page';


@Component({
    selector: '[shark-table-header]',
    template: `
        <tr class="info-header" *ngIf="!footer && (refreshButton || (filterable && !columnFiltering) || (localPaging && showLocalPagingOptions))">
          <th [attr.colspan]="childRows ? columns.length + 1 : columns.length">
            <div class="controls">
              <button *ngIf="refreshButton" (click)="fireFilterChange()">&#x21bb;</button>
              <form #filterForm="ngForm">
                <span class="filter-box" *ngIf="filterable && !columnFiltering">
                  <label for="filter" class="screen-reader">Filter Results (all column search)</label>
                  <input type="text" name="filter" id="filter" [(ngModel)]="filter" (ngModelChange)="fireFilterChange()" placeholder="Filter Results" />
                </span>
                <label class="local-paging-options" *ngIf="localPaging && showLocalPagingOptions">
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
        <tr role="row" class="header-row">
            <th *ngIf="childRows" class="child-spacer"></th>
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
        <tr role="row" *ngIf="columnFiltering && filterable" class="header-row">
          <th *ngIf="childRows"></th>
          <th *ngFor="let column of columns; let i = index" scope="col" role="columnheader" class="header-row">
            <label [for]="'column' + i" class="screen-reader">{{ column.header }} filter</label>
            <input type="text" name="column{{i}}" [id]="'column' + i" [(ngModel)]="column.filter" (ngModelChange)="fireFilterChange()" placeholder="{{ column.header }} filter" />
          </th>
        </tr>
    `
})
export class SharkTableHeaderComponent {

    @ViewChild('filterForm')
    filterForm: NgForm;

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

import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { SharkColumn } from './column';
import { Page } from './page';
import { SharkSortChangeEvent } from './header-button.component';
import { NotifierService } from './notifier/notifier.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: '[shark-table-header]',
    template: `
        <tr class="header-row header-border" *ngIf="currentColumns.length > 0">
            <th *ngIf="childRows" class="childHeader child-spacer">
              <span class="screen-reader">Details</span>
            </th>
            <th class="header-buttons" [ngClass]="{'right': column.alignRight }"
                *ngFor="let column of currentColumns; let i = index; let f = first; let l = last;" 
                [attr.id]="'column' + tableId + '-' + i + '-' + column.property"
                [attr.aria-sort]="(!sortable || column.unsortable) ? null : (!column.sortType || column.sortType === 0) ? 'none' : column.sortType === 1 ? 'ascending' : 'descending'">
                <button *ngIf="columnOrdering && !f && !column.disableOrdering" (click)="moveColumnBackward(i, column)" type="button" class="ordering-button fa fa-angle-left" [id]="'order-' + tableId + '-' + column.property + '-left'">
                  <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column left' }}</span>
                </button>
                <shark-table-header-button *ngIf="sortable && !column.unsortable" [column]="column" (sortChange)="dispatchSortChangeEvent($event)"></shark-table-header-button>
                <ng-container *ngIf="!sortable || column.unsortable">
                  {{ column.header }}
                </ng-container>
                <button *ngIf="columnOrdering && !l  && !column.disableOrdering" (click)="moveColumnForward(i, column)" type="button" class="ordering-button fa fa-angle-right" [id]="'order-' + tableId + '-' + column.property + '-right'">
                  <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column right' }}</span>
                </button>
                <div *ngIf="columnFiltering && filterable  && !column.hideHeaderFilter">
                  <label [for]="'column-filter-' + tableId + '-' + i" class="screen-reader">{{ column.header }} filter</label>
                  <input type="text" name="column{{i}}" [id]="'column-filter-' + tableId + '-' + i" [(ngModel)]="column.filter" (ngModelChange)="fireFilterChange()" [attr.placeholder]="showFilterPlaceholders ? (column.header + ' filter') : null" />
                </div>
            </th>
        </tr>
    `
})
export class SharkTableHeaderComponent {

    @Input()
    tableId: string;

    @Input()
    sortable: boolean;

    @Input()
    allColumns: SharkColumn[];

    @Input()
    currentColumns: SharkColumn[];

    @Input()
    columnOrdering: boolean;

    @Input()
    childRows: boolean;

    @Input()
    page: Page;

    @Input()
    filterable: boolean;

    @Input()
    columnFiltering: boolean;

    @Input()
    filter: string;

    @Input()
    showFilterPlaceholders: boolean;

    @Input()
    notifierService: NotifierService;

    @Input()
    localPagingSize: number;

    @Output()
    sortChange = new EventEmitter<SharkSortChangeEvent>();

    @Output()
    filterChange = new EventEmitter<SharkHeaderFilterChange>();

    @Output()
    columnChange = new EventEmitter<SharkColumn[]>();

    constructor(@Inject(DOCUMENT) private document: any) {}

    dispatchSortChangeEvent(event: SharkSortChangeEvent): void {
      this.sortChange.emit(event);
    }

    fireFilterChange(): void {
        this.filterChange.emit({
          columns: this.allColumns,
          filter: this.filter,
          localPagingSize: this.localPagingSize
        });
    }

    moveColumnForward(index: number, column: SharkColumn): void {
      this.move(index, 1);
      this.notifierService.postMessage('column moved right');

      const newIndex = this.currentColumns.indexOf(column);
      setTimeout(() => {
        if (newIndex === this.currentColumns.length - 1) {
          this.focusButton(column, 'left');
        } else {
          this.focusButton(column, 'right');
        }
      }, 100);
    }

    moveColumnBackward(index: number, column: SharkColumn): void {
      this.move(index, -1);
      this.notifierService.postMessage('column moved left');

      const newIndex = this.currentColumns.indexOf(column);
      setTimeout(() => {
        if (newIndex === 0) {
          this.focusButton(column, 'right');
        } else {
          this.focusButton(column, 'left');
        }
      }, 100);
    }

    private focusButton(column: SharkColumn, dir: string): void {
      const button = document.getElementById(column.property + '-' + dir);
      if (button) {
        button.focus();
      }
    }

    private move(index: number, offset: number): void {
      const newIndex = index + offset;
      if (newIndex > -1 && newIndex < this.allColumns.length) {
        const removedElement = this.allColumns.splice(index, 1)[0];
        this.allColumns.splice(newIndex, 0, removedElement);
        this.columnChange.emit(this.allColumns);
      }

    }
}

export interface SharkHeaderFilterChange {
  columns: SharkColumn[];
  filter: string;
  localPagingSize: number;
}

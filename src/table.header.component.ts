import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SharkColumn } from './column';
import { SharkSortType } from './sort.type';
import { Page } from './page';

@Component({
    selector: '[shark-table-header]',
    template: `
        <tr class="header-row header-border" *ngIf="columns.length > 0">
            <td id="childHeader" *ngIf="childRows" class="child-spacer">
              <span class="screen-reader">Empty column header to offset the child row button.</span>
            </td>
            <ng-container *ngIf="sortable">
                <th class="header-buttons" [ngClass]="{'right': column.alignRight }"
                    *ngFor="let column of columns; let i = index; let f = first; let l = last;" 
                    [attr.id]="column.property">
                    <button *ngIf="columnOrdering && !f" (click)="moveColumnBackward(i)" type="button" class="fa fa-angle-left">
                      <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column left' }}</span>
                    </button>
                    <button [name]="column.header" (click)="changeSort(column.property, column.sortType)" type="button" (focus)="headerFocus($event, column)" (blur)="headerBlur($event)">
                      {{ column.header }}
                      <i class="sorting fas fa-fw" [ngClass]="{ 
                        'unsorted': !column.sortType || column.sortType === 0,
                        'fa-sort': !column.sortType || column.sortType === 0,
                        'asc': column.sortType === 1,
                        'fa-sort-up': column.sortType === 1,                      
                        'desc': column.sortType === 2,
                        'fa-sort-down': column.sortType === 2
                      }"></i>
                      <span class="screen-reader-button-label">
                        {{ ((!column.sortType || column.sortType === 0) ? 'Unsorted' : column.sortType === 1 ? 'Ascending'  : 'Descending') }}
                      </span>
                      <span class="screen-reader-button-label focus-text"></span>
                    </button>
                    <button *ngIf="columnOrdering && !l" (click)="moveColumnForward(i)" type="button" class="fa fa-angle-right">
                      <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column right' }}</span>
                    </button>
                    <div *ngIf="columnFiltering && filterable">
                      <label [for]="'column-' + i" class="screen-reader">{{ column.header }} filter</label>
                      <input type="text" name="column{{i}}" [id]="'column-' + i" [(ngModel)]="column.filter" (ngModelChange)="fireFilterChange()" placeholder="{{ column.header }} filter" />
                    </div>
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
    `
})
export class SharkTableHeaderComponent {

    @Input()
    sortable: boolean;

    @Input()
    columns: SharkColumn[];

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

    headerFocus(event: FocusEvent, column: SharkColumn): void {
      const target: HTMLElement = <HTMLElement>event.target;
      const focusText: Element = target.querySelector('.focus-text');
      const newSort = (!column.sortType || column.sortType === 0) ? 'Ascending' : column.sortType === 1 ? 'Descending'  : 'Unsorted';

      focusText.innerHTML = ', Click to change sort to ' + newSort;
    }

    headerBlur(event: FocusEvent): void {
      const target: HTMLElement = <HTMLElement>event.target;
      const focusText: Element = target.querySelector('.focus-text');

      focusText.innerHTML = '';
    }

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

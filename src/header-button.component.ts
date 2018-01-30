import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharkColumn } from './column';
import { SharkSortType } from './sort.type';

@Component({
  selector: 'shark-table-header-button',
  template: `
    <button [name]="column.header" (click)="changeSort(column.property, column.sortType)" type="button" (focus)="headerFocus()" (blur)="headerBlur()">
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
        {{ ((!column.sortType || column.sortType === 0) ? 'Unsorted' : column.sortType === 1 ? 'Ascending' : 'Descending') }}{{ focusText }}
      </span>
    </button>
  `
})
export class SharkTableHeaderButtonComponent {

  @Input()
  column: SharkColumn;

  @Output()
  sortChange = new EventEmitter<SharkSortChangeEvent>();

  focusText: string;

  changeSort(property: string, sortType: SharkSortType): void {
    this.sortChange.emit({
      property: property,
      sortType: sortType
    })
  }

  headerFocus(): void {
    const newSort = (!this.column.sortType || this.column.sortType === 0) ? 'Ascending' : this.column.sortType === 1 ? 'Descending'  : 'Unsorted';
    this.focusText = ', Click to change sort to ' + newSort;
  }

  headerBlur(): void {
    this.focusText = undefined;
  }
}

export interface SharkSortChangeEvent {
  property: string;
  sortType: SharkSortType;
}

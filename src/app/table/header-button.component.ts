import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharkColumn } from './column';
import { SharkSortType } from './sort.type';

@Component({
  selector: 'shark-table-header-button',
  template: `
    <span class="header-text pointer" (click)="changeSort()" (keyup.enter)="changeSort()">{{ column.header }}</span>
    <button class="sort-button" [name]="column.header" (click)="changeSort()" type="button" aria-label="Change Sorting">
      <i class="sorting fas fa-fw" [ngClass]="{
        'unsorted': !column.sortType || column.sortType === 0,
        'fa-sort': !column.sortType || column.sortType === 0,
        'asc': column.sortType === 1,
        'fa-sort-up': column.sortType === 1,
        'desc': column.sortType === 2,
        'fa-sort-down': column.sortType === 2
      }"></i>
    </button>
  `
})
export class SharkTableHeaderButtonComponent {

  @Input()
  column: SharkColumn;

  @Output()
  sortChange = new EventEmitter<SharkSortChangeEvent>();

  ariaButtonLabel = 'Change Sorting';

  changeSort(): void {
    this.sortChange.emit({
      property: this.column.property,
      sortType: this.column.sortType
    })
  }

}

export interface SharkSortChangeEvent {
  property: string;
  sortType: SharkSortType;
}

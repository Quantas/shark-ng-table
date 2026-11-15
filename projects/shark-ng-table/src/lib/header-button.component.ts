import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { SharkColumn } from './column';
import { SharkSortType } from './sort.type';

@Component({
  selector: 'shark-table-header-button',
  imports: [NgClass],
  template: `
    <!-- Mouse convenience only: keyboard and screen reader users use the sort button below, so this is not a second tab stop. -->
    <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
    <span class="header-text pointer" (click)="changeSort()">{{ column.header }}</span>
    <button class="sort-button" [name]="column.header" (click)="changeSort()" type="button" [attr.aria-label]="'Change sorting for ' + column.header">
      <i class="sorting fas fa-fw" aria-hidden="true" [ngClass]="{
        'unsorted': !column.sortType,
        'fa-sort': !column.sortType,
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

  changeSort(): void {
    this.sortChange.emit({
      property: this.column.property,
      sortType: this.column.sortType as SharkSortType
    });
  }

}

export interface SharkSortChangeEvent {
  property: string;
  sortType: SharkSortType;
}

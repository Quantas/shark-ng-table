import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SharkColumn } from './column';
import { SharkSortType } from './sort.type';
import { Page } from './page';
import { SharkSortChangeEvent } from './header-button.component';
import { NotifierService } from './notifier/notifier.service';

@Component({
    selector: '[shark-table-header]',
    template: `
        <tr class="header-row header-border" *ngIf="columns.length > 0">
            <td id="childHeader" *ngIf="childRows" class="child-spacer">
              <span class="screen-reader">Details Row</span>
            </td>
            <th class="header-buttons" [ngClass]="{'right': column.alignRight }"
                *ngFor="let column of columns; let i = index; let f = first; let l = last;" 
                [attr.id]="column.property">
                <button *ngIf="columnOrdering && !f" (click)="moveColumnBackward(i, column)" type="button" class="fa fa-angle-left">
                  <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column left' }}</span>
                </button>
                <shark-table-header-button *ngIf="sortable" [column]="column" (sortChange)="dispatchSortChangeEvent($event)"></shark-table-header-button>  
                <ng-container *ngIf="!sortable">
                  {{ column.header }}
                </ng-container>
                <button *ngIf="columnOrdering && !l" (click)="moveColumnForward(i, column)" type="button" class="fa fa-angle-right">
                  <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column right' }}</span>
                </button>
                <div *ngIf="columnFiltering && filterable">
                  <label [for]="'column-' + i" class="screen-reader">{{ column.header }} filter</label>
                  <input type="text" name="column{{i}}" [id]="'column-' + i" [(ngModel)]="column.filter" (ngModelChange)="fireFilterChange()" placeholder="{{ column.header }} filter" />
                </div>
            </th>
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
    notifierService: NotifierService;

    @Input()
    localPagingSize: number;

    @Output()
    sortChange = new EventEmitter<SharkSortChangeEvent>();

    @Output()
    filterChange = new EventEmitter<SharkHeaderFilterChange>();

    @Output()
    columnChange = new EventEmitter<SharkColumn[]>();

    dispatchSortChangeEvent(event: SharkSortChangeEvent): void {
      this.sortChange.emit(event);
    }

    fireFilterChange(): void {
        this.filterChange.emit({
          columns: this.columns,
          filter: this.filter,
          localPagingSize: this.localPagingSize
        });
    }

    moveColumnForward(index: number, column: SharkColumn): void {
      this.move(index, 1);
      this.notifierService.postMessage(column.header + ' column moved to the right to position ' + (index + 2));
    }

    moveColumnBackward(index: number, column: SharkColumn): void {
      this.move(index, -1);
      this.notifierService.postMessage(column.header + ' column moved to the left to position ' + index);
    }

    private move(index: number, offset: number): void {
      const newIndex = index + offset;
      if (newIndex > -1 && newIndex < this.columns.length) {
        const removedElement = this.columns.splice(index, 1)[0];
        this.columns.splice(newIndex, 0, removedElement);
      }

    }
}

export interface SharkHeaderFilterChange {
  columns: SharkColumn[];
  filter: string;
  localPagingSize: number;
}

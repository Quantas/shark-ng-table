import { Component, DOCUMENT, EventEmitter, Injector, Input, Output, afterNextRender, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharkColumn } from './column';
import { Page } from './page';
import { SharkSortChangeEvent, SharkTableHeaderButtonComponent } from './header-button.component';
import { NotifierService } from './notifier/notifier.service';

@Component({
    selector: '[shark-table-header]',
    imports: [NgClass, FormsModule, SharkTableHeaderButtonComponent],
    template: `
        @if (currentColumns.length > 0) {
          <tr class="header-row header-border">
            @if (childRows) {
              <th class="childHeader child-spacer">
                <span class="screen-reader">Details</span>
              </th>
            }
            @for (column of currentColumns; track column; let i = $index, f = $first, l = $last) {
              <th class="header-buttons" [ngClass]="{'right': column.alignRight }"
                  [attr.id]="'column' + tableId + '-' + i + '-' + column.property"
                  [attr.aria-sort]="ariaSort(column)">
                  @if (columnOrdering && !f && !column.disableOrdering) {
                    <button (click)="moveColumnBackward(i, column)" type="button" class="ordering-button fa fa-angle-left" [id]="orderButtonId(column, 'left')">
                      <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column left' }}</span>
                    </button>
                  }
                  @if (sortable && !column.unsortable) {
                    <shark-table-header-button [column]="column" (sortChange)="dispatchSortChangeEvent($event)"></shark-table-header-button>
                  } @else {
                    {{ column.header }}
                  }
                  @if (columnOrdering && !l && !column.disableOrdering) {
                    <button (click)="moveColumnForward(i, column)" type="button" class="ordering-button fa fa-angle-right" [id]="orderButtonId(column, 'right')">
                      <span class="screen-reader-button-label">{{ 'Move the ' + column.header + ' column right' }}</span>
                    </button>
                  }
                  @if (columnFiltering && filterable && !column.hideHeaderFilter) {
                    <div>
                      <label [for]="'column-filter-' + tableId + '-' + i" class="screen-reader">{{ column.header }} filter</label>
                      <input type="text" name="column{{i}}" [id]="'column-filter-' + tableId + '-' + i" [(ngModel)]="column.filter" (ngModelChange)="fireFilterChange()" [attr.placeholder]="showFilterPlaceholders ? (column.header + ' filter') : null" />
                    </div>
                  }
              </th>
            }
          </tr>
        }
    `
})
export class SharkTableHeaderComponent {

    private readonly document = inject(DOCUMENT);
    private readonly injector = inject(Injector);

    @Input()
    tableId: string;

    @Input()
    sortable: boolean;

    @Input()
    allColumns: SharkColumn[] = [];

    @Input()
    currentColumns: SharkColumn[] = [];

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

    ariaSort(column: SharkColumn): string | null {
      if (!this.sortable || column.unsortable) {
        return null;
      }
      return !column.sortType ? 'none' : column.sortType === 1 ? 'ascending' : 'descending';
    }

    orderButtonId(column: SharkColumn, dir: 'left' | 'right'): string {
      return 'order-' + this.tableId + '-' + column.property + '-' + dir;
    }

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
      this.move(index, 1, column);
      this.notifierService.postMessage('column moved right');
      this.restoreFocus(column, 'right');
    }

    moveColumnBackward(index: number, column: SharkColumn): void {
      this.move(index, -1, column);
      this.notifierService.postMessage('column moved left');
      this.restoreFocus(column, 'left');
    }

    /**
     * Keeps keyboard focus on the moved column's ordering button. If the column reached the end, the button
     * the user pressed no longer exists, so focus moves to the opposite button.
     */
    private restoreFocus(column: SharkColumn, dir: 'left' | 'right'): void {
      afterNextRender(() => {
        const button = this.document.getElementById(this.orderButtonId(column, dir))
          ?? this.document.getElementById(this.orderButtonId(column, dir === 'left' ? 'right' : 'left'));
        button?.focus();
      }, { injector: this.injector });
    }

    private move(index: number, offset: number, column: SharkColumn): void {
      const newIndex = index + offset;
      if (newIndex > -1 && newIndex < this.currentColumns.length) {
        const allStartIndex = this.allColumns.indexOf(column);
        let start = allStartIndex;
        let adjust: number;

        if (offset < 0) {
          // if going backwards, look backwards for hidden
          adjust = -1;
          while (start >= 0) {
            start--;
            const col = this.allColumns[start];
            if (col && !col.displayed) {
              --adjust;
            } else {
              break;
            }
          }
        } else {
          // else look forwards for hidden
          adjust = 1;
          while (start <= this.allColumns.length) {
            start++;
            const col = this.allColumns[start];
            if (col && !col.displayed) {
              ++adjust;
            } else {
              break;
            }
          }
        }

        const removedElementAll = this.allColumns.splice(allStartIndex, 1)[0];
        this.allColumns.splice(allStartIndex + adjust, 0, removedElementAll);
        this.columnChange.emit(this.allColumns);
      }

    }
}

export interface SharkHeaderFilterChange {
  columns: SharkColumn[];
  filter: string;
  localPagingSize: number;
}

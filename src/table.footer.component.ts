import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from './page';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';

@Component({
  selector: '[shark-table-footer]',
  template: `
  <tr class="info-footer">
    <th *ngIf="childRows" class="child-spacer"></th>
    <th [attr.colspan]="columns.length">
      Showing {{ start }} to {{ end }} of {{ total }} rows {{ filtered ? '(Filtered)' : '' }}
    </th>
  </tr>`
})
export class SharkTableFooterComponent implements OnChanges {

  start = 0;
  end = 0;
  total = 0;
  filtered = false;

  /**
   * The current {@link Page}
   */
  @Input()
  page: Page;

  /**
   * The current {@link SharkColumn}[]
   */
  @Input()
  columns: SharkColumn[];

  /**
   * The current filter string
   */
  @Input()
  filter: string;

  /**
   * Are child rows enabled?
   */
  @Input()
  childRows: boolean;

  constructor(private tableUtils: SharkTableUtils) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.total = this.page.totalElements;

    let newStart = this.page.number * this.page.numberOfElements + 1;

    if (newStart > this.total) {
      this.start = 0;
    } else {
      this.start = newStart;
    }

    let newEnd = this.page.number * this.page.numberOfElements + this.page.numberOfElements;

    if (newEnd > this.total) {
      this.end = this.total;
    } else {
      this.end = newEnd;
    }

    this.filtered = (this.filter && this.filter.length > 0) || this.tableUtils.hasFilter(this.columns);

  }

}

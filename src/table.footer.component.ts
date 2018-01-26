import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Page } from './page';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';
import { SharkHeaderFilterChange } from './table.header.component';
import { SharkTablePaginationComponent } from './table.pagination.component';

@Component({
  selector: 'shark-table-footer',
  template: `
  <div class="info-footer">
    <div class="page-size-controls" *ngIf="localPaging && showLocalPagingOptions && columns.length > 0">
      <label for="local-paging-size" class="local-paging-options">
        Rows per page:
      </label>
      <select [(ngModel)]="localPagingSize" (change)="fireFilterChange()" name="localPagingSize" id="local-paging-size">
        <option *ngFor="let option of localPagingOptions" [value]="option" [attr.selected]="option === localPagingSize ? 'selected' : null">{{ option }}</option>
      </select>
      <span>{{ start }} - {{ end }} of {{ total }} {{ filtered ? '(Filtered)' : '' }}</span>
    </div>
    <shark-table-pagination *ngIf="columns.length > 0" [page]="page" (paginationChange)="changePage($event)"></shark-table-pagination>
  </div>`
})
export class SharkTableFooterComponent implements OnChanges {

  start = 0;
  end = 0;
  total = 0;
  filtered = false;

  @ViewChild(SharkTablePaginationComponent)
  paginationComponent: SharkTablePaginationComponent;

  @Input()
  localPaging: boolean;

  @Input()
  localPagingSize: number;

  @Input()
  localPagingOptions: number[];

  @Input()
  showLocalPagingOptions: boolean;

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

  @Output()
  filterChange = new EventEmitter<SharkHeaderFilterChange>();

  @Output()
  paginationChange = new EventEmitter<number>();

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

  fireFilterChange(): void {
    this.filterChange.emit({
      columns: this.columns,
      filter: this.filter,
      localPagingSize: this.localPagingSize
    });
  }

  changePage(pageNo: number): void {
    this.paginationChange.emit(pageNo);
  }

}

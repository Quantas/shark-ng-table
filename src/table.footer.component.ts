import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Page } from './page';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';
import { SharkHeaderFilterChange } from './table.header.component';
import { SharkTablePaginationComponent } from './table.pagination.component';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-table-footer',
  template: `
  <div class="info-footer">
    <div class="page-size-controls" *ngIf="localPaging && showLocalPagingOptions && columns.length > 0">
      <label for="local-paging-size" class="local-paging-options">
        Rows per page:
      </label>
      <select [(ngModel)]="localPagingSize" (change)="firePageSizeChange()" name="localPagingSize" id="local-paging-size">
        <option *ngFor="let option of localPagingOptions" [value]="option" [attr.selected]="option === localPagingSize ? 'selected' : null">{{ option }}</option>
      </select>
      <span>{{ currentPageInfo }}</span>
    </div>
    <shark-table-pagination *ngIf="columns.length > 0" [page]="page" (paginationChange)="changePage($event)"></shark-table-pagination>
  </div>`
})
export class SharkTableFooterComponent implements OnChanges {

  start = 0;
  end = 0;
  total = 0;
  filtered = false;

  currentPageInfo = '';

  @ViewChild(SharkTablePaginationComponent)
  paginationComponent: SharkTablePaginationComponent;

  @Input()
  notifierService: NotifierService;

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

    const wasFiltered = this.filtered;
    this.filtered = (this.filter && this.filter.length > 0) || this.tableUtils.hasFilter(this.columns);

    this.currentPageInfo = this.start + ' - ' + this.end + ' of ' + this.total + (this.filtered ? ' (filtered)' : '');

    if (changes.hasOwnProperty('page') && !changes['page'].isFirstChange()) {
      const pageChange = changes['page'];
      if (pageChange.previousValue.number !== pageChange.currentValue.number) {
        this.notifierService.postMessage('Page changed to ' + (pageChange.currentValue.number + 1) + ' showing ' + this.currentPageInfo);
      } else if (this.filtered || wasFiltered) {
        this.notifierService.postMessage('Filtering changed, showing ' + this.currentPageInfo);
      }
    }
    if (changes.hasOwnProperty('filter')) {
      const filterChange = changes['filter'];
      if (filterChange.previousValue !== filterChange.currentValue) {
        this.notifierService.postMessage('Filtering changed, showing ' + this.currentPageInfo);
      }
    }
  }

  firePageSizeChange(): void {
    this.filterChange.emit({
      columns: this.columns,
      filter: this.filter,
      localPagingSize: this.localPagingSize
    });
    this.notifierService.postMessage('Page size changed to ' + this.localPagingSize + ', page changed to ' + (this.page.number + 1));
  }

  changePage(pageNo: number): void {
    this.paginationChange.emit(pageNo);
  }

}

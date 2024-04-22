import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
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
    <div class="page-size-controls" *ngIf="localPaging && showLocalPagingOptions && currentColumns.length > 0">
      <label for="local-paging-size-{{ tableId }}" class="local-paging-options">
        Rows per page:
      </label>
      <select [(ngModel)]="localPagingSize" (change)="firePageSizeChange()" name="localPagingSize" class="local-paging-size" id="local-paging-size-{{ tableId }}">
        <option *ngFor="let option of localPagingOptions" [value]="option" [attr.selected]="option === localPagingSize ? 'selected' : null">{{ option }}</option>
      </select>
      <span>{{ currentPageInfo }}</span>
    </div>
    <div *ngIf="leftSideFooterTemplate" class="left-side-template">
      <ng-container *ngTemplateOutlet="leftSideFooterTemplate"></ng-container>
    </div>
    <div class="flex-spacer"></div>
    <div *ngIf="rightSideFooterTemplate" class="right-side-template">
      <ng-container *ngTemplateOutlet="rightSideFooterTemplate"></ng-container>
    </div>
    <div>
      <shark-table-pagination *ngIf="currentColumns.length > 0" [page]="page" [tableId]="tableId" (paginationChange)="changePage($event)"></shark-table-pagination>
    </div>
  </div>`
})
export class SharkTableFooterComponent implements OnChanges {

  start = 0;
  end = 0;
  total = 0;
  filtered = false;

  currentPageInfo = '';

  @ViewChild(SharkTablePaginationComponent, { static: false })
  paginationComponent: SharkTablePaginationComponent;

  @Input()
  leftSideFooterTemplate: TemplateRef<any>;

  @Input()
  rightSideFooterTemplate: TemplateRef<any>;

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
  currentColumns: SharkColumn[];

  /**
   * The current {@link SharkColumn}[]
   */
  @Input()
  allColumns: SharkColumn[];

  /**
   * The current filter string
   */
  @Input()
  filter: string;

  @Input()
  tableId: string;

  @Output()
  filterChange = new EventEmitter<SharkHeaderFilterChange>();

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(private tableUtils: SharkTableUtils) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.total = this.page.totalElements;
    const size = this.page.size ? this.page.size : this.page.numberOfElements;

    let newStart = this.page.number * size + 1;

    if (newStart > this.total) {
      this.start = 0;
    } else {
      this.start = newStart;
    }

    let newEnd = this.page.number * size + this.page.numberOfElements;

    if (newEnd > this.total) {
      this.end = this.total;
    } else {
      this.end = newEnd;
    }

    const wasFiltered = this.filtered;
    this.filtered = (this.filter && this.filter.length > 0) || this.tableUtils.hasFilter(this.currentColumns);

    this.currentPageInfo = this.start + ' - ' + this.end + ' of ' + this.total + (this.filtered ? ' (filtered)' : '');
    const currentPageInfoAria = this.start + ' to ' + this.end + ' of ' + this.total + (this.filtered ? ' (filtered)' : '');

    if (changes.hasOwnProperty('page') && !changes['page'].isFirstChange()) {
      const pageChange = changes['page'];
      if (pageChange.previousValue.number !== pageChange.currentValue.number) {
        this.notifierService.postMessage('Page changed to ' + (pageChange.currentValue.number + 1) + ' showing ' + currentPageInfoAria);
      } else if (this.filtered || wasFiltered) {
        this.notifierService.postMessage('Filtering changed, showing ' + currentPageInfoAria);
      }
    }
    if (changes.hasOwnProperty('filter')) {
      const filterChange = changes['filter'];
      if (filterChange.previousValue !== filterChange.currentValue) {
        this.notifierService.postMessage('Filtering changed, showing ' + currentPageInfoAria);
      }
    }
  }

  firePageSizeChange(): void {
    this.filterChange.emit({
      columns: this.allColumns,
      filter: this.filter,
      localPagingSize: this.localPagingSize
    });
    this.notifierService.postMessage('Page size changed to ' + this.localPagingSize + ', page changed to ' + (this.page.number + 1));
  }

  changePage(pageNo: number): void {
    this.paginationChange.emit(pageNo);
  }

}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Page } from './page';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';
import { SharkHeaderFilterChange } from './table.header.component';
import { SharkTablePaginationComponent } from './table.pagination.component';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-table-footer',
  imports: [FormsModule, NgTemplateOutlet, SharkTablePaginationComponent],
  template: `
  <div class="info-footer">
    @if (localPaging && showLocalPagingOptions && currentColumns.length > 0) {
      <div class="page-size-controls">
        <label for="local-paging-size-{{ tableId }}" class="local-paging-options">
          Rows per page:
        </label>
        <select [(ngModel)]="localPagingSize" (ngModelChange)="firePageSizeChange()" name="localPagingSize" class="local-paging-size" id="local-paging-size-{{ tableId }}">
          @for (option of localPagingOptions; track option) {
            <option [ngValue]="option">{{ option }}</option>
          }
        </select>
        <span>{{ currentPageInfo }}</span>
      </div>
    }
    @if (leftSideFooterTemplate) {
      <div class="left-side-template">
        <ng-container *ngTemplateOutlet="leftSideFooterTemplate"></ng-container>
      </div>
    }
    <div class="flex-spacer"></div>
    @if (rightSideFooterTemplate) {
      <div class="right-side-template">
        <ng-container *ngTemplateOutlet="rightSideFooterTemplate"></ng-container>
      </div>
    }
    <div>
      @if (currentColumns.length > 0) {
        <shark-table-pagination [page]="page" [tableId]="tableId" (paginationChange)="changePage($event)"></shark-table-pagination>
      }
    </div>
  </div>`
})
export class SharkTableFooterComponent implements OnChanges {

  private readonly tableUtils = inject(SharkTableUtils);

  start = 0;
  end = 0;
  total = 0;
  filtered = false;

  currentPageInfo = '';

  @ViewChild(SharkTablePaginationComponent)
  paginationComponent: SharkTablePaginationComponent;

  @Input()
  leftSideFooterTemplate: TemplateRef<unknown>;

  @Input()
  rightSideFooterTemplate: TemplateRef<unknown>;

  @Input()
  notifierService: NotifierService;

  @Input()
  localPaging: boolean;

  @Input()
  localPagingSize: number;

  @Input()
  localPagingOptions: number[] = [];

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
  currentColumns: SharkColumn[] = [];

  /**
   * The current {@link SharkColumn}[]
   */
  @Input()
  allColumns: SharkColumn[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.page) {
      return;
    }

    const pageNumber = this.page.number ?? 0;
    const numberOfElements = this.page.numberOfElements ?? this.page.content?.length ?? 0;
    const size = this.page.size || numberOfElements;
    this.total = this.page.totalElements ?? numberOfElements;

    const newStart = pageNumber * size + 1;
    this.start = this.total === 0 || newStart > this.total ? 0 : newStart;

    const newEnd = pageNumber * size + numberOfElements;
    this.end = Math.min(newEnd, this.total);

    const wasFiltered = this.filtered;
    this.filtered = (!!this.filter && this.filter.length > 0) || this.tableUtils.hasFilter(this.currentColumns);

    this.currentPageInfo = this.start + ' - ' + this.end + ' of ' + this.total + (this.filtered ? ' (filtered)' : '');
    const currentPageInfoAria = this.start + ' to ' + this.end + ' of ' + this.total + (this.filtered ? ' (filtered)' : '');

    const pageChange = changes['page'];
    const filterChange = changes['filter'];

    if (pageChange && !pageChange.isFirstChange()) {
      if (pageChange.previousValue?.number !== pageChange.currentValue?.number) {
        this.notifierService.postMessage('Page changed to ' + (pageNumber + 1) + ' showing ' + currentPageInfoAria);
      } else if (this.filtered || wasFiltered) {
        this.notifierService.postMessage('Filtering changed, showing ' + currentPageInfoAria);
      }
    } else if (filterChange && !filterChange.isFirstChange() && filterChange.previousValue !== filterChange.currentValue) {
      this.notifierService.postMessage('Filtering changed, showing ' + currentPageInfoAria);
    }
  }

  firePageSizeChange(): void {
    this.filterChange.emit({
      columns: this.allColumns,
      filter: this.filter,
      localPagingSize: Number(this.localPagingSize)
    });
    this.notifierService.postMessage('Page size changed to ' + this.localPagingSize);
  }

  changePage(pageNo: number): void {
    this.paginationChange.emit(pageNo);
  }

}

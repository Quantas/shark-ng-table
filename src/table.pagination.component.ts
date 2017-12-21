import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'shark-table-pagination',
  templateUrl: 'table.pagination.component.html',
  styleUrls: [ 'table.pagination.component.less' ]
})
export class SharkTablePaginationComponent implements OnChanges {

  pageCount: number[] = [];

  @Input()
  page: Page;

  @Output()
  paginationChange = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('page') && !changes['page'].isFirstChange()) {
      this.pageCount = Array.from(Array(this.page.totalPages), (x, i) => i);
    }
  }

  changePage(pageNo: number): void {
    this.paginationChange.emit(pageNo);
  }
}

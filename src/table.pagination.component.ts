import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'shark-table-pagination',
  template: `
      <div class="pagination-wrapper">
          <div class="pagination" *ngIf="pageCount.length > 1">
              <a *ngIf="0 !== page.number" (click)="!!changePage(0)">First</a>
              <ng-container *ngFor="let num of pageCount">
                  <a [ngClass]="{'active': num === page.number}" (click)="!!changePage(num)" href>{{ num + 1 }}</a>
              </ng-container>
              <a *ngIf="pageCount.length - 1 !== page.number" (click)="!!changePage(pageCount.length - 1)">Last</a>
          </div>
      </div>
  `,
  styles: [`
      .pagination-wrapper {
          float: left;
      }
      .pagination {
          display: inline-block;
      }
      .pagination a:hover:not(.active) {
          background-color: #ddd;
      }
      .pagination a.active {
          background-color: #4CAF50;
          color: white;
      }
      .pagination a {
          color: black;
          float: left;
          padding: 8px 16px;
          text-decoration: none;
          border: 1px solid #ddd;
          transition: background-color .3s;
      }
  `]
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

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'shark-table-pagination',
  template: `
      <div class="pagination-wrapper">
          <div class="pagination" *ngIf="pageCount.length > 1">
              <a *ngIf="0 !== page.number" (click)="!!changePage(0)" role="button" href>First</a>
              <ng-container *ngFor="let num of pageCount">
                <span *ngIf="num === page.number" [ngClass]="{'active': true}">{{ num + 1 }}</span>
                <a *ngIf="num !== page.number" (click)="!!changePage(num)" role="button" href>{{ num + 1 }}</a>
              </ng-container>
              <a *ngIf="pageCount.length - 1 !== page.number" (click)="!!changePage(pageCount.length - 1)" role="button" href>Last</a>
          </div>
      </div>
  `
})
export class SharkTablePaginationComponent implements OnChanges {

  pageCount: number[] = [];

  @Input()
  page: Page;

  @Output()
  paginationChange = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('page') && this.page) {
      this.pageCount = Array.from(Array(this.page.totalPages), (x, i) => i);
    }
  }

  changePage(pageNo: number): void {
    this.paginationChange.emit(pageNo);
  }
}

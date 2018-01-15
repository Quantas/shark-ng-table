import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'shark-table-pagination',
  template: `
      <div class="pagination-wrapper" *ngIf="pageCount.length > 1">
          <div class="pagination">
              <span *ngIf="first" class="inactive">First</span>
              <a *ngIf="!first" (click)="!!changePage(0)" role="button" href>First</a>
            
              <span *ngIf="!previous" class="inactive">Previous</span>
              <a *ngIf="previous" (click)="!!changePage(page.number - 1)" role="button" href>Previous</a>
            
              <ng-container *ngFor="let num of displayedPages">
                <span *ngIf="num === page.number" [ngClass]="{'active': true}">{{ num + 1 }}</span>
                <a *ngIf="num !== page.number" (click)="!!changePage(num)" role="button" href>{{ num + 1 }}</a>
              </ng-container>
            
              <span *ngIf="!next" class="inactive">Next</span>
              <a *ngIf="next" (click)="!!changePage(page.number + 1)" role="button" href>Next</a>
            
              <span *ngIf="last" class="inactive">Last</span>
              <a *ngIf="!last" (click)="!!changePage(pageCount.length - 1)" role="button" href>Last</a>
          </div>
      </div>
  `
})
export class SharkTablePaginationComponent implements OnChanges {

  pageCount: number[] = [];

  first = false;
  last = false;

  previous = false;
  next = false;

  displayedPages: number[] = [];

  @Input()
  page: Page;

  @Output()
  paginationChange = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('page') && this.page) {
      this.pageCount = Array.from(Array(this.page.totalPages), (x, i) => i);

      this.first = this.page.number === 0;
      this.last = this.page.number === this.pageCount.length - 1;
      this.previous = !this.first;
      this.next = !this.last;

      if (this.pageCount.length > 3) {
        if (this.first) {
          this.displayedPages = [0, 1, 2];
        } else if (this.last) {
          this.displayedPages = [ this.page.number - 2, this.page.number - 1, this.page.number ];
        } else {
          this.displayedPages = [ this.page.number - 1, this.page.number, this.page.number + 1];
        }
      } else {
        this.displayedPages = this.pageCount;
      }

    }
  }

  changePage(pageNo: number): void {
    this.paginationChange.emit(pageNo);
  }
}

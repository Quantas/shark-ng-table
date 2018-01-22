import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'shark-table-pagination',
  template: `
      <div class="pagination-wrapper" *ngIf="pageCount.length > 1">
          <div class="pagination">
              <button [attr.disabled]="first ? 'disabled' : null" [ngClass]="{'inactive': first}" (click)="changePage(0)">First</button>
              <button [attr.disabled]="!previous ? 'disabled' : null" [ngClass]="{'inactive': !previous}" (click)="changePage(page.number - 1)">Previous</button>
            
              <ng-container *ngFor="let num of displayedPages">
                <button [ngClass]="{'active': num === page.number }" (click)="changePage(num)">{{ num + 1 }}</button>
              </ng-container>
            
              <button [attr.disabled]="!next ? 'disabled' : null" [ngClass]="{'inactive': !next}" (click)="changePage(page.number + 1)">Next</button>
              <button [attr.disabled]="last ? 'disabled' : null" [ngClass]="{'inactive': last}" (click)="changePage(pageCount.length - 1)">Last</button>
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

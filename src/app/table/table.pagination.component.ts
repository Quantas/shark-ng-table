import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'shark-table-pagination',
  template: `
      <div class="pagination-wrapper" *ngIf="pageCount.length > 1">
          <div class="pagination">
              <button *ngIf="!first" (click)="changePage(0)" type="button" class="fa fa-angle-double-left first-page-button">
                <span class="screen-reader-button-label">First Page</span>
              </button>
              <button *ngIf="previous" (click)="changePage(page.number - 1)" type="button" class="fa fa-angle-left previous-page-button">
                <span class="screen-reader-button-label">Previous Page</span>
              </button>

              <ng-container *ngFor="let num of displayedPages">
                <button 
                  [attr.id]="num === page.number ? ('active-button-' + tableId) : null"
                  [ngClass]="{'active': num === page.number, 'inactive': num!== page.number }"
                  [attr.aria-current]="num === page.number ? 'true' : null"
                  [attr.aria-disabled]="num === page.number ? 'true' : null"
                  (click)="changePage(num)" type="button">
                  <span class="screen-reader-button-label">Page</span>
                  {{ num + 1 }}
                </button>
              </ng-container>

              <button *ngIf="next" (click)="changePage(page.number + 1)" type="button" class="fa fa-angle-right next-page-button">
                <span class="screen-reader-button-label">Next Page</span>
              </button>
              <button *ngIf="!last" (click)="changePage(pageCount.length - 1)" type="button" class="fa fa-angle-double-right last-page-button">
                <span class="screen-reader-button-label">Last Page</span>
              </button>
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

  @Input()
  tableId: string;

  @Output()
  paginationChange = new EventEmitter<number>();

  private lastButton;

  constructor(private elementRef: ElementRef) {}

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

      // fix focus when a button disappears
      if (this.lastButton) {
        setTimeout(() => {
          if (!this.elementRef.nativeElement.ownerDocument.getElementById(this.lastButton)) {
            const activeButton = this.elementRef.nativeElement.ownerDocument.getElementById('active-button');
            if (activeButton) {
              activeButton.focus();
            }
          }

          this.lastButton = undefined;
        }, 100);
      }
    }
  }

  changePage(pageNo: number): void {
    this.lastButton = this.elementRef.nativeElement.ownerDocument.activeElement.id;
    this.paginationChange.emit(pageNo);
  }
}

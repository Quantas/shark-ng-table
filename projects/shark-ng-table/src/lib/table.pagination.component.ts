import { Component, ElementRef, EventEmitter, Injector, Input, OnChanges, Output, SimpleChanges, afterNextRender, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Page } from './page';

@Component({
  selector: 'shark-table-pagination',
  imports: [NgClass],
  template: `
      @if (pageCount.length > 1) {
        <div class="pagination-wrapper">
            <div class="pagination">
                @if (!first) {
                  <button (click)="changePage(0)" type="button" class="fa fa-angle-double-left first-page-button">
                    <span class="screen-reader-button-label">First Page</span>
                  </button>
                }
                @if (previous) {
                  <button (click)="changePage(currentPage - 1)" type="button" class="fa fa-angle-left previous-page-button">
                    <span class="screen-reader-button-label">Previous Page</span>
                  </button>
                }

                @for (num of displayedPages; track num) {
                  <button
                    [attr.id]="num === currentPage ? ('active-button-' + tableId) : null"
                    [ngClass]="{'active': num === currentPage, 'inactive': num !== currentPage }"
                    [attr.aria-current]="num === currentPage ? 'true' : null"
                    [attr.aria-disabled]="num === currentPage ? 'true' : null"
                    (click)="changePage(num)" type="button">
                    <span class="screen-reader-button-label">Page</span>
                    {{ num + 1 }}
                  </button>
                }

                @if (next) {
                  <button (click)="changePage(currentPage + 1)" type="button" class="fa fa-angle-right next-page-button">
                    <span class="screen-reader-button-label">Next Page</span>
                  </button>
                }
                @if (!last) {
                  <button (click)="changePage(pageCount.length - 1)" type="button" class="fa fa-angle-double-right last-page-button">
                    <span class="screen-reader-button-label">Last Page</span>
                  </button>
                }
            </div>
        </div>
      }
  `
})
export class SharkTablePaginationComponent implements OnChanges {

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  pageCount: number[] = [];

  first = false;
  last = false;

  previous = false;
  next = false;

  displayedPages: number[] = [];

  currentPage = 0;

  @Input()
  page: Page;

  @Input()
  tableId: string;

  @Output()
  paginationChange = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'] && this.page) {
      const totalPages = Number(this.page.totalPages);
      const pages = Number.isFinite(totalPages) && totalPages > 0 ? Math.floor(totalPages) : 0;
      this.pageCount = Array.from({ length: pages }, (_x, i) => i);
      this.currentPage = this.page.number ?? 0;

      this.first = this.currentPage === 0;
      this.last = this.currentPage >= this.pageCount.length - 1;
      this.previous = !this.first;
      this.next = !this.last;

      if (this.pageCount.length > 3) {
        if (this.first) {
          this.displayedPages = [0, 1, 2];
        } else if (this.last) {
          this.displayedPages = [ this.currentPage - 2, this.currentPage - 1, this.currentPage ];
        } else {
          this.displayedPages = [ this.currentPage - 1, this.currentPage, this.currentPage + 1];
        }
      } else {
        this.displayedPages = this.pageCount;
      }
    }
  }

  changePage(pageNo: number): void {
    const host = this.elementRef.nativeElement;
    const focusWasInside = host.contains(host.ownerDocument.activeElement);

    this.paginationChange.emit(pageNo);

    // When the focused button disappears (e.g. "Next" on the last page), move focus to the active page button
    // instead of letting it fall back to <body>.
    if (focusWasInside) {
      afterNextRender(() => {
        const active = host.ownerDocument.activeElement;
        if (!active || active === host.ownerDocument.body || !host.contains(active)) {
          host.ownerDocument.getElementById('active-button-' + this.tableId)?.focus();
        }
      }, { injector: this.injector });
    }
  }
}

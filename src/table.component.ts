import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Page, Sort } from './page';
import { SharkColumn } from './column';
import { SharkPageChangeEvent } from './page.change.event';
import { CurrentSort, SortType } from './sort.type';
import { NgForm } from '@angular/forms';
import { SharkTableUtils } from './table.utils';

@Component({
  selector: 'shark-table',
  template: `
      <div class="table-wrapper">
          <div class="controls">
              <form #filterForm="ngForm">
                  <input *ngIf="filterable" type="text" name="filter" id="filter" [(ngModel)]="filter" placeholder="Filter Results" />
              </form>
              <button *ngIf="serverSide" (click)="refreshPage()">&#x21bb;</button>
          </div>
          <table *ngIf="page">
              <thead>
              <tr>
                  <th [ngClass]="{'pointer': sortable, 'right': column.alignRight }" *ngFor="let column of columns" (click)="changeSort(column.property, column.sortType)" (keyup.enter)="changeSort(column.property, column.sortType)">
                      {{ column.header }} <span [ngClass]="{ 'asc': column.sortType === 1, 'desc': column.sortType === 2 }"></span>
                  </th>
              </tr>
              </thead>
              <tbody>
              <ng-container *ngIf="page.content">
                  <tr *ngFor="let row of page.content | localfilter:columns:localFilter:filter" (click)="rowClick(row)" (keyup.enter)="rowClick(row)" tabindex="0" [ngClass]="{ rowLink: linkTarget }">
                      <ng-container *ngFor="let column of columns">
                          <td [ngClass]="{'right': column.alignRight }" >
                              <shark-table-cell [column]="column" [row]="row"></shark-table-cell>
                          </td>
                      </ng-container>
                  </tr>
              </ng-container>
              <ng-container *ngIf="!page.content || page.content.length == 0">
                  <tr><td [attr.colspan]="columns.length">This table contains no rows</td></tr>
              </ng-container>
              </tbody>
          </table>
          <shark-table-pagination [page]="page" (paginationChange)="changePage($event)"></shark-table-pagination>
      </div>
  `,
  styles: [`
      .rowLink:hover {
          background-color: #ddd;
          cursor: pointer;
      }

      .table-wrapper {
          overflow: auto;
      }

      .controls {
          margin-bottom: 0.5rem;
          overflow: auto;
      }

      .controls button,
      .controls form {
          float: left;
      }

      .controls button {
          margin-left: 0.25rem;
      }

      .controls:after {
          clear: both;
      }

      table {
          margin-bottom: 0.5rem;
      }

      table .right {
          text-align: right;
      }

      table th,
      table td {
          padding: 0.25rem;
      }

      .pointer {
          cursor: pointer;
      }

      .asc:after {
          content: '\\25B2';
      }

      .desc:after {
          content: '\\25BC';
      }
  `]
})
export class SharkTableComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('filterForm')
  filterForm: NgForm;

  @Input()
  data: Page | Observable<Page | any[]> | any[];

  @Input()
  columns: SharkColumn[];

  @Input()
  linkTarget: string;

  @Input()
  linkKey: string;

  @Input()
  sortable = true;

  @Input()
  filterable = true;

  @Input()
  localFilter = false;

  @Input()
  serverSide = true;

  @Input()
  initialSort: string;

  @Output()
  pageChange = new EventEmitter<SharkPageChangeEvent>();

  page: Page;

  @Input()
  filter: string;

  private dataSubscription: Subscription;

  constructor(private router: Router, private tableUtils: SharkTableUtils) {}

  ngOnInit(): void {
    this.updatePage();

    this.filterForm.valueChanges.subscribe((data) => {
      if (data.filter !== undefined && this.page && this.filterable && !this.localFilter) {
        this.updateFilter();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['data'];
    if (change && !change.isFirstChange()) {
      this.updatePage();
    }
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  updateFilter(): void {
    this.pageChange.emit({
      pageNo: this.page.number,
      sortString: this.generateSortString(),
      sorts: this.generateSortArray(),
      filter: this.filter
    });
  }

  refreshPage(): void {
    this.pageChange.emit({
      pageNo: this.page.number,
      sortString: this.generateSortString(),
      sorts: this.generateSortArray(),
      filter: this.filter
    });
  }

  changePage(pageNo: number): void {
    this.pageChange.emit({
      pageNo: pageNo,
      sortString: this.generateSortString(),
      sorts: this.generateSortArray(),
      filter: this.filter
    });
  }

  changeSort(columnProperty: string, sortType: SortType): void {
    if (this.sortable) {
      this.columns.forEach((column: SharkColumn) => {

        if (column.property === columnProperty) {
          // State Machine
          // ASC -> DESC -> NONE -> ASC
          switch (sortType) {
            case SortType.ASC: {
              // -> DESC
              column.sortType = SortType.DESC;
              break;
            }
            case SortType.DESC: {
              // -> NONE
              column.sortType = SortType.NONE;
              break;
            }
            case SortType.NONE:
            default: {
              // -> ASC
              column.sortType = SortType.ASC;
              break;
            }
          }
        }
      });

      const sorts = this.generateSortArray();

      // sort internally
      if (!this.serverSide) {
        this.page.content.sort((a, b) => {
          let result = 0;

          sorts.forEach((sort: CurrentSort) => {
            if ( result === 0 ) {
              const aVal = this.tableUtils.findValue(a, sort.property);
              const bVal = this.tableUtils.findValue(b, sort.property);

              result = (aVal < bVal) ? -1 : (aVal > bVal) ? 1 : 0;

              result *= (sort.sortType === SortType.DESC) ? -1 : 1;
            }
          });

          return result;
        });
      }

      this.pageChange.emit({
        pageNo: this.page.number,
        sortString: this.generateSortString(),
        sorts: sorts,
        filter: this.filter
      });
    }
  }

  rowClick(row: Object): void {
    if (this.linkTarget && this.linkKey) {
      this.router.navigate([this.linkTarget, this.tableUtils.findValue(row, this.linkKey)]);
    }
  }

  private generateSortString(): string {
    let sortString = '';

    this.columns.forEach((column: SharkColumn) => {
      switch (column.sortType) {
        case SortType.ASC: {
          sortString += '' + column.property + ';';
          break;
        }
        case SortType.DESC: {
          sortString += '-' + column.property + ';';
          break;
        }
        case SortType.NONE: {
          break;
        }
      }
    });

    return sortString;
  }

  private generateSortArray(): CurrentSort[] {
    const currentSorts: CurrentSort[] = [];

    this.columns.forEach((column: SharkColumn) => {
      switch (column.sortType) {
        case SortType.ASC:
        case SortType.DESC: {
          currentSorts.push({property: column.property, sortType: column.sortType});
          break;
        }
      }
    });

    return currentSorts;
  }

  private updatePage(): void {
    if (this.data) {

      if (this.data.constructor === Array) {
        this.setupPageArray();
      } else if (this.data.constructor === Observable) {
        this.setupPageSubscription();
      } else {
        this.page = this.data as Page;

        if (!this.page.number) {
          this.page.number = 0;
        }
      }

      this.setupInitialSort();
    }
  }

  private setupPageArray(): void {
    this.page = {content: this.data as any[]};
  }

  private setupPageSubscription(): void {
    // Fix potential memory leak, by unsubscribing to previous subscription if exists
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.dataSubscription = (this.data as Observable<Page | any[]>).subscribe((data: Page | any[]) => {
      if (this.data.constructor === Array) {
        this.page = {content: data as any[]};
      } else {
        this.page = data as Page;
      }
    });
  }

  private setupInitialSort() {

    if (this.initialSort) {
      const sorts = this.initialSort.split(';');

      sorts.forEach((sort: string) => {
        this.columns.forEach((column: SharkColumn) => {
          let type = SortType.NONE;
          let property = sort;

          if (sort.startsWith('-')) {
            type = SortType.DESC;
            property = property.substr(1);
          } else {
            type = SortType.ASC;
          }

          if (property === column.property) {
            column.sortType = type;
          }
        });
      });

      this.changeSort('', undefined);
    }


    if (this.page.sorts && this.page.sorts.length > 0) {
      this.columns.forEach((column: SharkColumn) => {

        this.page.sorts.forEach((sort: Sort) => {
          if (column.property === sort.property) {
            column.sortType = SortType.NONE;

            if (sort.ascending) {
              column.sortType = SortType.ASC;
            } else if (sort.descending) {
              column.sortType = SortType.DESC;
            }
          }
        });
      });
    }
  }
}

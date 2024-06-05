import {
  Component, ContentChild, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, Type,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Page, Sort } from './page';
import { SharkColumn } from './column';
import { SharkPageChangeEvent } from './page.change.event';
import { SharkCurrentSort, SharkSortType } from './sort.type';
import { SharkTableUtils } from './table.utils';
import { SharkDynamicContents } from './dynamic/dynamic.contents';
import { SharkHeaderFilterChange, SharkTableHeaderComponent } from './table.header.component';
import { CellStyleFunction, RowStyleFunction } from './table.body.component';
import { SharkTableFooterComponent } from './table.footer.component';
import { SharkTableInfoHeaderComponent } from './table.info.header.component';
import { NotifierService } from './notifier/notifier.service';
import { SharkTableCurrentDataEvent } from './current.data.event';
import { SharkColumnChangeEvent } from './column-change-event';

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'shark-table',
  template: `
      <div class="shark-table" id="shark-table-{{ tableId }}">
        <ng-container *ngIf="page">
          <shark-table-aria-notifier [notifierService]="notifierService" [tableId]="tableId"></shark-table-aria-notifier>
          <shark-table-info-header *ngIf="(serverSideData || (filterable && !columnFiltering) || columnPicker || headerLeftTemplate || headerRightTemplate)"
                                   [serverSideData]="serverSideData"
                                   [filterable]="filterable"
                                   [columnFiltering]="columnFiltering"
                                   [columnPicker]="columnPicker"
                                   [columns]="currentColumns"
                                   [allColumns]="columns"
                                   [filter]="filter"
                                   [showFilterPlaceholders]="showFilterPlaceholders"
                                   [localPagingSize]="localPagingSize"
                                   [notifierService]="notifierService"
                                   [tableId]="tableId"
                                   [leftSideHeaderTemplate]="headerLeftTemplate"
                                   [rightSideHeaderTemplate]="headerRightTemplate"
                                   (filterChange)="headerChange($event)"
                                   (columnChange)="updateCurrentColumns($event)"
          ></shark-table-info-header>
          <div class="table-wrapper">
            <table>
                <caption [ngClass]="{'screen-reader': hideCaption}">{{ caption }}</caption>
                <thead shark-table-header
                       [tableId]="tableId"
                       [sortable]="sortable"
                       [allColumns]="columns"
                       [currentColumns]="currentColumns"
                       [columnOrdering]="columnOrdering"
                       [childRows]="childRows"
                       [page]="page"
                       [filterable]="filterable"
                       [columnFiltering]="columnFiltering"
                       [localPagingSize]="localPagingSize"
                       [filter]="filter"
                       [showFilterPlaceholders]="showFilterPlaceholders"
                       [notifierService]="notifierService"
                       (sortChange)="changeSort($event.property, $event.sortType)"
                       (filterChange)="headerChange($event)"
                       (columnChange)="updateCurrentColumns($event)"
                ></thead>
                <tbody shark-table-body
                       [currentColumns]="currentColumns"
                       [columns]="columns"
                       [localFilter]="localFilter"
                       [localPaging]="localPaging"
                       [columnFiltering]="columnFiltering"
                       [filter]="filter"
                       [childRows]="childRows"
                       [childComponent]="childComponent"
                       [linkTarget]="linkTarget" [linkKey]="linkKey"
                       [page]="page"
                       [tableEmptyMessage]="tableEmptyMessage"
                       [rowStylingFunction]="rowStylingFunction"
                       [cellStylingFunction]="cellStylingFunction"
                ></tbody>
            </table>
          </div>
          <shark-table-footer *ngIf="footer && currentColumns.length > 0"
                              [page]="page"
                              [currentColumns]="currentColumns"
                              [allColumns]="columns"
                              [filter]="filter"
                              [localPaging]="localPaging"
                              [localPagingSize]="localPagingSize"
                              [localPagingOptions]="localPagingOptions"
                              [showLocalPagingOptions]="showLocalPagingOptions"
                              [notifierService]="notifierService"
                              [tableId]="tableId"
                              [leftSideFooterTemplate]="footerLeftTemplate"
                              [rightSideFooterTemplate]="footerRightTemplate"
                              (filterChange)="headerChange($event)"
                              (paginationChange)="changePage($event)"
          ></shark-table-footer>
        </ng-container>
      </div>
  `
})
export class SharkTableComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(SharkTableInfoHeaderComponent, { static: false })
  headerInfoComponent: SharkTableInfoHeaderComponent;

  @ViewChild(SharkTableHeaderComponent, { static: false })
  headerComponent: SharkTableHeaderComponent;

  @ViewChild(SharkTableFooterComponent, { static: false })
  footerComponent: SharkTableFooterComponent;

  @ContentChild('headerLeft', {static: false})
  headerLeftTemplate: TemplateRef<any>;

  @ContentChild('headerRight', {static: false})
  headerRightTemplate: TemplateRef<any>;

  @ContentChild('footerLeft', {static: false})
  footerLeftTemplate: TemplateRef<any>;

  @ContentChild('footerRight', {static: false})
  footerRightTemplate: TemplateRef<any>;

  notifierService = new NotifierService();

  /**
   * An ID for this table, defaults to `uuid.substring(0, 5)`
   */
  @Input()
  tableId = uuid().substring(0, 5);

  /**
   * The raw table data
   */
  @Input()
  data: Page | Observable<Page | any[]> | any[];

  /**
   * The table column definitions
   */
  @Input()
  columns: SharkColumn[];

  currentColumns: SharkColumn[] = [];

  /**
   * The <caption> text for this table
   */
  @Input()
  caption = 'A Data Table';

  /**
   * Whether or not the table <caption> should be hidden (screen-reader) only.
   */
  @Input()
  hideCaption = false;

  /**
   * Allow users to turn columns on and off
   */
  @Input()
  columnPicker = false;

  /**
   * Allow users to reorder columns with header buttons
   */
  @Input()
  columnOrdering = false;

  /**
   * The destination page for the call to `router.navigate` when the row is clicked.
   */
  @Input()
  linkTarget: string;

  /**
   * The property name from the data object to pass to `router.navigate` when the rows is clicked.
   */
  @Input()
  linkKey: string;

  /**
   * Enables the sorting headers
   */
  @Input()
  sortable = true;

  /**
   * Enables the global filter text box
   */
  @Input()
  filterable = true;

  /**
   * Enables column specific filter boxes
   */
  @Input()
  columnFiltering = false;

  /**
   * Enables client-side filtering as opposed to just emitting a `SharkPageChangeEvent`
   */
  @Input()
  localFilter = true;

  /**
   * Enables the placeholder text for the filter boxes
   */
  @Input()
  showFilterPlaceholders = true;

  /**
   * Enables client-side pagination as opposed to just emitting a `SharkPageChangeEvent`
   */
  @Input()
  localPaging = true;

  /**
   * The size of each page
   */
  @Input()
  localPagingSize = 10;

  /**
   * The supported page sizes
   */
  @Input()
  localPagingOptions: number[] = [ 10, 20, 100 ];

  /**
   * Enables the drop down for changing the page size
   */
  @Input()
  showLocalPagingOptions = true;

  /**
   * Shows a button that when clicked, emits a `SharkPageChangeEvent`
   */
  @Input()
  serverSideData = false;

  /**
   * The initial sortString
   */
  @Input()
  initialSort: string;

  @Input()
  cellStylingFunction: CellStyleFunction;

  /**
   * Enables children rows
   */
  @Input()
  childRows = false;

  /**
   * Your custom component which extends {@link SharkDynamicContents} that will be used
   * to render each child row. Your custom component needs to be registered in your NgModule
   * as an `entryComponent` and in the `declarations` section.
   *
   * The easiest way to specify this component in your HTML template is to create an instance variable
   * and assign it, eg:
   *
   * ```typescript
   * @Component({
   *    template: `
   *      <shark-table
   *          [data]="testData"
   *          [columns]="tableColumns"
   *          [childRows]="true"
   *          [childComponent]="childComponent"
   *      >
   *      </shark-table>
   *    `
   * })
   * export class MyComponent {
   *    childComponent = MyChildComponent
   * }
   *
   * ```
   */
  @Input()
  childComponent?: Type<SharkDynamicContents>;

  /**
   * {@link SharkPageChangeEvent} events are emitted from here
   */
  @Output()
  pageChange = new EventEmitter<SharkPageChangeEvent>();

  /**
   * The column metadata is emitted from here whenever it changes
   */
  @Output()
  columnChange = new EventEmitter<SharkColumnChangeEvent>();

  /**
   * Disable the column change event, if needed, for performance reasons
   */
  @Input()
  disableColumnChangeEvent = false;

  /**
   * The current filter value
   */
  @Input()
  filter: string;

  /**
   * Show the footer with 'Showing x through y of z rows`
   */
  @Input()
  footer = true;

  /**
   * Message to show when the table is empty
   */
  @Input()
  tableEmptyMessage = 'This table contains no rows';

  page: Page;

  private dataSubscription: Subscription;

  private localSubscription: Subscription;

  @Input()
  rowStylingFunction: RowStyleFunction = row => ({})

  constructor(private router: Router, private tableUtils: SharkTableUtils) {}

  ngOnInit(): void {
    this.updatePage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataChange = changes['data'];
    const columnChange = changes['columns'];

    if (columnChange && columnChange.isFirstChange()) {
      this.columns = columnChange.currentValue;

      this.columns.forEach((column: SharkColumn) => {
        if (!column.hasOwnProperty('displayed')) {
          column.displayed = true;
        }
      });

      this.updateCurrentColumns(this.columns, false);
    }

    if (dataChange && !dataChange.isFirstChange()) {
      this.updatePage();
    } else if (columnChange && !columnChange.isFirstChange()) {
      this.updateCurrentColumns(columnChange.currentValue);
    }
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    if (this.localSubscription) {
      this.localSubscription.unsubscribe();
    }
  }

  updateCurrentColumns(newColumns: SharkColumn[], emitPageEvent = true): void {
    this.currentColumns = newColumns.filter((value: SharkColumn) => value.displayed);
    this.columns = newColumns;
    if (emitPageEvent) {
      this.emitCurrent();
    }
    this.publishColumnChangeEvent();
  }

  /**
   * Emits a {@link SharkPageChangeEvent} with the current information. This event should be consumed by the host
   * component and sent to a REST endpoint to update the data.
   */
  emitCurrent(): void {
    this.pageChange.emit({
      pageNo: this.page.number,
      columns: this.currentColumns,
      sortString: this.generateSortString(),
      sorts: this.generateSortArray(),
      filter: this.filter
    });
  }

  headerChange(event: SharkHeaderFilterChange): void {
    this.columns = event.columns;
    this.currentColumns = this.columns.filter((value: SharkColumn) => value.displayed);

    this.filter = event.filter;
    this.localPagingSize = event.localPagingSize;

    this.emitCurrent();
  }

  changePage(pageNo: number): void {
    this.pageChange.emit({
      pageNo: pageNo,
      columns: this.currentColumns,
      sortString: this.generateSortString(),
      sorts: this.generateSortArray(),
      filter: this.filter
    });
  }

  changeSort(columnProperty: string, sortType: SharkSortType): void {
    if (this.sortable) {
      this.currentColumns.forEach((column: SharkColumn) => {

        if (column.property === columnProperty) {
          // State Machine
          // ASC -> DESC -> NONE -> ASC
          switch (sortType) {
            case SharkSortType.ASC: {
              // -> DESC
              column.sortType = SharkSortType.DESC;
              break;
            }
            case SharkSortType.DESC: {
              // -> NONE
              column.sortType = SharkSortType.NONE;
              break;
            }
            case SharkSortType.NONE:
            default: {
              // -> ASC
              column.sortType = SharkSortType.ASC;
              break;
            }
          }

          this.notifierService.postMessage((column.sortType === SharkSortType.DESC ? 'sorted descending' : column.sortType === SharkSortType.ASC ? 'sorted ascending' : 'unsorted'));
        }
      });

      const sorts = this.generateSortArray();

      if (!this.serverSideData) {
        // sort internally
        this.sort(this.page.content, sorts);
      }

      this.pageChange.emit({
        pageNo: this.page.number,
        columns: this.currentColumns,
        sortString: this.generateSortString(),
        sorts: sorts,
        filter: this.filter
      });

      this.publishColumnChangeEvent();
    }
  }

  /**
   * Currently only works if your input is an any[], returns the current "view" into the table with filtering/column selection
   *
   * @param rendered If you would like inline pipes to be applied to the exported data
   */
  exportCurrentData(rendered: boolean = true): SharkTableCurrentDataEvent {
    let currentData: any[];
    if (this.localFilter && (this.columnFiltering && this.tableUtils.hasFilter(this.currentColumns) || (this.filter && this.filter.length > 0))) {
      currentData = this.tableUtils.filter(this.data, this.currentColumns, this.columnFiltering, this.filter);
      this.sort(currentData, this.generateSortArray());
    } else {
      currentData = this.data as any[];
    }

    if (this.currentColumns.length === 0) {
      return {
        data: [],
        columns: []
      };
    }

    return {
      data: currentData.map(row => this.tableUtils.exportRow(row, this.currentColumns, rendered)),
      columns: this.currentColumns
    };
  }

  private publishColumnChangeEvent(): void {
    if (!this.disableColumnChangeEvent) {
      this.columnChange.emit({
        columns: this.columns,
        currentSortString: this.generateSortString()
      });
    }
  }

  private generateSortString(): string {
    let sortString = '';

    this.currentColumns.forEach((column: SharkColumn) => {
      switch (column.sortType) {
        case SharkSortType.ASC: {
          sortString += '' + column.property + ';';
          break;
        }
        case SharkSortType.DESC: {
          sortString += '-' + column.property + ';';
          break;
        }
        case SharkSortType.NONE: {
          break;
        }
      }
    });

    return sortString;
  }

  private generateSortArray(): SharkCurrentSort[] {
    const currentSorts: SharkCurrentSort[] = [];

    this.currentColumns.forEach((column: SharkColumn) => {
      switch (column.sortType) {
        case SharkSortType.ASC:
        case SharkSortType.DESC: {
          currentSorts.push({property: column.property, sortType: column.sortType});
          break;
        }
      }
    });

    return currentSorts;
  }

  private sort(content: any[], sorts: SharkCurrentSort[]): void {
    const columnCache = {};
    this.columns.forEach(column => columnCache[column.property] = column);

    content.sort((a, b) => {
      let result = 0;

      sorts.forEach((sort: SharkCurrentSort) => {
        if ( result === 0 ) {
          const aVal = this.tableUtils.findValue(a, sort.property);
          const bVal = this.tableUtils.findValue(b, sort.property);

          const sortFunction = columnCache[sort.property].ascendingSortFunction;
          if (!!sortFunction) {
            result = sortFunction(aVal, bVal);
          } else if (!isNaN(Number(aVal)) && !isNaN(Number(bVal))) {
            result = aVal - bVal;
          } else {
            result = (aVal < bVal) ? -1 : (aVal > bVal) ? 1 : 0;
          }

          result *= (sort.sortType === SharkSortType.DESC) ? -1 : 1;
        }
      });

      return result;
    });
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

  private createLocalPage(data?: any[]): Page {
    const total = (data ? data : this.data as any[]).length;

    return {
      number: 0,
      totalPages: 1,
      totalElements: total,
      first: true,
      last: true,
      numberOfElements: total,
      content: data ? data : this.data as any[]
    };
  }

  private setupPageArray(): void {
    if (this.localPaging) {
        const total = (this.data as any[]).length;
        const pageCount = Math.ceil(total / this.localPagingSize);

        this.page = {
          number: 0,
          totalPages: pageCount,
          totalElements: total,
          first: true,
          last: false,
          numberOfElements: this.localPagingSize,
          content: (this.data as any[]).slice(0, this.localPagingSize)
        };

        if (this.localSubscription) {
          this.localSubscription.unsubscribe();
        }

        this.localSubscription = this.pageChange.subscribe((event) => this.calculateLocalPage(event));
    } else if (this.localFilter) {
      this.page = this.createLocalPage();

      if (this.localSubscription) {
        this.localSubscription.unsubscribe();
      }

      this.localSubscription = this.pageChange.subscribe((event) => this.calculateLocalPageNoPagination(event));
    } else {
      this.page = this.createLocalPage();
    }
  }

  private calculateLocalPageNoPagination(event: SharkPageChangeEvent): void {
    if (((event.filter && event.filter.length > 0)) || this.tableUtils.hasFilter(event.columns)) {
      const filteredContent = this.tableUtils.filter(this.data, this.currentColumns, this.columnFiltering, event.filter);

      this.page = {
        number: 0,
        totalPages: 1,
        totalElements: filteredContent.length,
        first: true,
        last: false,
        numberOfElements: filteredContent.length,
        content: filteredContent
      };
    } else {
      this.page = this.createLocalPage();
    }
  }

  private calculateLocalPage(event: SharkPageChangeEvent): void {
      let content;

      if (this.localFilter && ((event.filter && event.filter.length > 0)) || this.tableUtils.hasFilter(event.columns)) {
        content = this.tableUtils.filter(this.data, this.currentColumns, this.columnFiltering, event.filter);
      } else {
        content = (this.data as any[]);
      }

      this.sort(content, this.generateSortArray());
      const total = content.length;
      // IntelliJ claims this * 1 call is useless, but we need to make sure it's a number
      const pageSize: number = (this.localPagingSize > content.length ? content.length : this.localPagingSize) * 1;
      const pageCount = total === 0 ? 0 : Math.ceil(total / pageSize);
      const pageNo = event.pageNo > pageCount || content.length <= pageSize ? 0 : event.pageNo;
      const sliceRange = pageSize * pageNo + pageSize;
      const displayedContent = content.slice((pageSize * pageNo), sliceRange);

      this.page = {
        number: pageNo,
        totalPages: pageCount,
        totalElements: total,
        first: pageNo === 0,
        last: pageNo === pageCount,
        numberOfElements: pageSize,
        content: displayedContent
      };
  }

  private setupPageSubscription(): void {
    // Fix potential memory leak, by unsubscribing to previous subscription if exists
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.dataSubscription = (this.data as Observable<Page | any[]>).subscribe((data: Page | any[]) => {
      if (data.constructor === Array) {
        this.page = this.createLocalPage(data as any[]);
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
          let type = SharkSortType.NONE;
          let property = sort;

          if (sort.startsWith('-')) {
            type = SharkSortType.DESC;
            property = property.substr(1);
          } else {
            type = SharkSortType.ASC;
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
            column.sortType = SharkSortType.NONE;

            if (sort.ascending) {
              column.sortType = SharkSortType.ASC;
            } else if (sort.descending) {
              column.sortType = SharkSortType.DESC;
            }
          }
        });
      });

      if (!this.serverSideData) {
        this.changeSort('', undefined);
      }
    }
  }
}

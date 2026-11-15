import {
  ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  TemplateRef, Type, ViewChild, inject
} from '@angular/core';
import { NgClass } from '@angular/common';

import { Observable, Subscription, isObservable } from 'rxjs';

import { Page, Sort } from './page';
import { SharkColumn } from './column';
import { SharkPageChangeEvent } from './page.change.event';
import { SharkCurrentSort, SharkSortType } from './sort.type';
import { SharkTableUtils } from './table.utils';
import { SharkDynamicContents } from './dynamic/dynamic.contents';
import { SharkHeaderFilterChange, SharkTableHeaderComponent } from './table.header.component';
import { CellStyleFunction, RowStyleFunction, SharkTableBodyComponent } from './table.body.component';
import { SharkTableFooterComponent } from './table.footer.component';
import { SharkTableInfoHeaderComponent } from './table.info.header.component';
import { NotifierService } from './notifier/notifier.service';
import { AriaNotifierComponent } from './notifier/aria-notifier.component';
import { SharkTableCurrentDataEvent } from './current.data.event';
import { SharkColumnChangeEvent } from './column-change-event';

let nextTableId = 0;

@Component({
  selector: 'shark-table',
  imports: [
    NgClass,
    AriaNotifierComponent,
    SharkTableInfoHeaderComponent,
    SharkTableHeaderComponent,
    SharkTableBodyComponent,
    SharkTableFooterComponent
  ],
  template: `
      <div class="shark-table" id="shark-table-{{ tableId }}">
        @if (page) {
          <shark-table-aria-notifier [notifierService]="notifierService" [tableId]="tableId"></shark-table-aria-notifier>
          @if (serverSideData || (filterable && !columnFiltering) || columnPicker || headerLeftTemplate || headerRightTemplate) {
            <shark-table-info-header
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
          }
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
          @if (footer && currentColumns.length > 0) {
            <shark-table-footer
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
          }
        }
      </div>
  `
})
export class SharkTableComponent implements OnInit, OnChanges, OnDestroy {

  private readonly tableUtils = inject(SharkTableUtils);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild(SharkTableInfoHeaderComponent)
  headerInfoComponent: SharkTableInfoHeaderComponent;

  @ViewChild(SharkTableHeaderComponent)
  headerComponent: SharkTableHeaderComponent;

  @ViewChild(SharkTableFooterComponent)
  footerComponent: SharkTableFooterComponent;

  @ContentChild('headerLeft')
  headerLeftTemplate: TemplateRef<unknown>;

  @ContentChild('headerRight')
  headerRightTemplate: TemplateRef<unknown>;

  @ContentChild('footerLeft')
  footerLeftTemplate: TemplateRef<unknown>;

  @ContentChild('footerRight')
  footerRightTemplate: TemplateRef<unknown>;

  notifierService = new NotifierService();

  /**
   * An ID for this table, used to build unique element ids. Defaults to a value unique within the page.
   */
  @Input()
  tableId = `st${++nextTableId}`;

  /**
   * The raw table data
   */
  @Input()
  data: Page | Observable<Page | any[]> | any[];

  /**
   * The table column definitions
   */
  @Input()
  columns: SharkColumn[] = [];

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
  linkTarget: string | undefined;

  /**
   * The property name from the data object to pass to `router.navigate` when the rows is clicked.
   */
  @Input()
  linkKey: string | undefined;

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
   * Your custom component which implements {@link SharkDynamicContents} that will be used
   * to render each child row.
   *
   * The easiest way to specify this component in your HTML template is to create an instance variable
   * and assign it, eg:
   *
   * ```typescript
   * @Component({
   *    imports: [SharkTableComponent],
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

  @Input()
  rowStylingFunction: RowStyleFunction = () => ({});

  /**
   * The page currently being displayed.
   */
  page: Page;

  /** Rows supplied as an array (directly or via an Observable); filtered, sorted and paged locally. */
  private localRows: any[] | undefined;

  /** A Page supplied directly or via an Observable; paging is done by the caller. */
  private sourcePage: Page | undefined;

  private initialSortApplied = false;

  private dataSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.updatePage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const columnChange = changes['columns'];
    if (columnChange) {
      const columns: SharkColumn[] = columnChange.currentValue ?? [];
      this.updateCurrentColumns(columns, !columnChange.isFirstChange());
    }

    const dataChange = changes['data'];
    if (dataChange && !dataChange.isFirstChange()) {
      this.updatePage();
    } else if (this.page && ['filter', 'localPaging', 'localPagingSize', 'localFilter', 'columnFiltering']
        .some(key => changes[key] && !changes[key].isFirstChange())) {
      this.recalculate();
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  updateCurrentColumns(newColumns: SharkColumn[], emitPageEvent = true): void {
    newColumns.forEach((column: SharkColumn) => {
      if (column.displayed === undefined) {
        column.displayed = true;
      }
    });

    this.columns = newColumns;
    this.currentColumns = newColumns.filter((value: SharkColumn) => value.displayed);
    if (emitPageEvent && this.page) {
      this.emitCurrent();
      this.recalculate();
    }
    this.publishColumnChangeEvent();
  }

  /**
   * Emits a {@link SharkPageChangeEvent} with the current information. This event should be consumed by the host
   * component and sent to a REST endpoint to update the data.
   */
  emitCurrent(): void {
    this.emitPageChange(this.page?.number ?? 0);
  }

  headerChange(event: SharkHeaderFilterChange): void {
    this.columns = event.columns;
    this.currentColumns = this.columns.filter((value: SharkColumn) => value.displayed);

    this.filter = event.filter;
    this.localPagingSize = Number(event.localPagingSize);

    this.emitCurrent();
    this.recalculate();
  }

  changePage(pageNo: number): void {
    this.emitPageChange(pageNo);
    this.recalculate(pageNo);
  }

  changeSort(columnProperty: string, sortType: SharkSortType | number | undefined): void {
    if (this.sortable) {
      this.currentColumns.forEach((column: SharkColumn) => {

        if (column.property === columnProperty) {
          // State Machine
          // ASC -> DESC -> NONE -> ASC
          switch (sortType) {
            case SharkSortType.ASC: {
              column.sortType = SharkSortType.DESC;
              break;
            }
            case SharkSortType.DESC: {
              column.sortType = SharkSortType.NONE;
              break;
            }
            case SharkSortType.NONE:
            default: {
              column.sortType = SharkSortType.ASC;
              break;
            }
          }

          this.notifierService.postMessage((column.sortType === SharkSortType.DESC ? 'sorted descending' : column.sortType === SharkSortType.ASC ? 'sorted ascending' : 'unsorted'));
        }
      });

      this.emitCurrent();
      this.recalculate();
      this.publishColumnChangeEvent();
    }
  }

  /**
   * Returns the current "view" of the table data: every row (across all pages) that matches the current filters,
   * in the current sort order, containing only the displayed columns.
   *
   * When the data is a {@link Page} (server side paging), only the rows on the current page are available.
   *
   * @param rendered If you would like inline pipes to be applied to the exported data
   */
  exportCurrentData(rendered: boolean = true): SharkTableCurrentDataEvent {
    if (this.currentColumns.length === 0) {
      return {
        data: [],
        columns: []
      };
    }

    const currentData = this.localRows ? this.filterAndSort(this.localRows) : (this.page?.content ?? []);

    return {
      data: currentData.map(row => this.tableUtils.exportRow(row, this.currentColumns, rendered)),
      columns: this.currentColumns
    };
  }

  private emitPageChange(pageNo: number): void {
    this.pageChange.emit({
      pageNo,
      columns: this.currentColumns,
      sortString: this.generateSortString(),
      sorts: this.generateSortArray(),
      filter: this.filter
    });
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
    return this.generateSortArray()
      .map(sort => (sort.sortType === SharkSortType.DESC ? '-' : '') + sort.property + ';')
      .join('');
  }

  private generateSortArray(): SharkCurrentSort[] {
    return this.currentColumns
      .filter(column => column.sortType === SharkSortType.ASC || column.sortType === SharkSortType.DESC)
      .map(column => ({ property: column.property, sortType: column.sortType as SharkSortType }));
  }

  private isFiltering(): boolean {
    return (!!this.filter && this.filter.length > 0) || (this.columnFiltering && this.tableUtils.hasFilter(this.currentColumns));
  }

  /** Returns a new array; never mutates the input. */
  private filterAndSort(rows: any[], sort = true): any[] {
    const result = this.localFilter && this.isFiltering()
      ? this.tableUtils.filter(rows, this.currentColumns, this.columnFiltering, this.filter)
      : rows.slice();

    if (sort) {
      this.sort(result, this.generateSortArray());
    }
    return result;
  }

  private sort(content: any[], sorts: SharkCurrentSort[]): void {
    if (sorts.length === 0) {
      return;
    }

    const columnCache = new Map<string, SharkColumn>();
    this.columns.forEach(column => columnCache.set(column.property, column));

    content.sort((a, b) => {
      for (const sort of sorts) {
        const aVal = this.tableUtils.findValue(a, sort.property);
        const bVal = this.tableUtils.findValue(b, sort.property);

        const sortFunction = columnCache.get(sort.property)?.ascendingSortFunction;
        const result = sortFunction ? sortFunction(aVal, bVal) : this.tableUtils.compare(aVal, bVal);

        if (result !== 0) {
          return sort.sortType === SharkSortType.DESC ? -result : result;
        }
      }
      return 0;
    });
  }

  private updatePage(): void {
    this.dataSubscription?.unsubscribe();
    this.dataSubscription = undefined;

    const data = this.data;
    if (data == null) {
      return;
    }

    if (isObservable(data)) {
      this.dataSubscription = data.subscribe((value: Page | any[]) => {
        this.applyData(value);
        this.cdr.markForCheck();
      });
    } else {
      this.applyData(data);
    }
  }

  private applyData(value: Page | any[] | null | undefined): void {
    if (value == null) {
      return;
    }

    if (Array.isArray(value)) {
      this.localRows = value;
      this.sourcePage = undefined;
    } else {
      this.localRows = undefined;
      this.sourcePage = value;
    }

    const sortsChanged = this.applyInitialSorts();
    this.recalculate(this.sourcePage ? (this.sourcePage.number ?? 0) : 0);

    if (sortsChanged) {
      this.emitCurrent();
      this.publishColumnChangeEvent();
    }
  }

  /**
   * Applies `initialSort` (once) and any `sorts` reported by a {@link Page}.
   * Returns true when column sort state was changed and listeners should be notified.
   */
  private applyInitialSorts(): boolean {
    let changed = false;

    if (!this.initialSortApplied) {
      this.initialSortApplied = true;

      if (this.initialSort) {
        this.initialSort.split(';').filter(sort => sort.length > 0).forEach((sort: string) => {
          const descending = sort.startsWith('-');
          const property = descending ? sort.substring(1) : sort;
          const column = this.columns.find(col => col.property === property);
          if (column) {
            column.sortType = descending ? SharkSortType.DESC : SharkSortType.ASC;
          }
        });
        changed = true;
      }
    }

    const pageSorts = this.sourcePage?.sorts;
    if (pageSorts && pageSorts.length > 0) {
      this.columns.forEach((column: SharkColumn) => {
        pageSorts.forEach((sort: Sort) => {
          if (column.property === sort.property) {
            column.sortType = sort.ascending ? SharkSortType.ASC : sort.descending ? SharkSortType.DESC : SharkSortType.NONE;
          }
        });
      });
      changed = changed || !this.serverSideData;
    }

    return changed;
  }

  /**
   * Rebuilds {@link page} from the current data, filters, sorts and paging settings.
   */
  private recalculate(pageNo: number = this.page?.number ?? 0): void {
    if (this.localRows) {
      this.page = this.localPaging ? this.buildLocalPage(this.filterAndSort(this.localRows), pageNo) : this.buildSinglePage(this.filterAndSort(this.localRows));
    } else if (this.sourcePage) {
      const content = this.filterAndSort(this.sourcePage.content ?? [], !this.serverSideData);
      this.page = { ...this.sourcePage, number: this.sourcePage.number ?? 0, content };
    }
  }

  private buildSinglePage(content: any[]): Page {
    return {
      number: 0,
      size: content.length,
      totalPages: 1,
      totalElements: content.length,
      first: true,
      last: true,
      numberOfElements: content.length,
      content
    };
  }

  private buildLocalPage(rows: any[], requestedPage: number): Page {
    const pageSize = Math.max(1, Math.floor(Number(this.localPagingSize)) || 10);
    const total = rows.length;
    const totalPages = Math.ceil(total / pageSize);
    const pageNo = Math.min(Math.max(0, Math.floor(Number(requestedPage)) || 0), Math.max(totalPages - 1, 0));
    const content = rows.slice(pageNo * pageSize, pageNo * pageSize + pageSize);

    return {
      number: pageNo,
      size: pageSize,
      totalPages,
      totalElements: total,
      first: pageNo === 0,
      last: pageNo >= totalPages - 1,
      numberOfElements: content.length,
      content
    };
  }
}

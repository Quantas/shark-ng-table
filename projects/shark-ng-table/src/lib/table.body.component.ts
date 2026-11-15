import { Component, Input, OnChanges, SimpleChanges, Type, inject } from '@angular/core';
import { LocationStrategy, NgClass, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';
import { SharkDynamicContents } from './dynamic/dynamic.contents';
import { Page } from './page';
import { SharkTableCellComponent } from './table.cell.component';
import { SharkChildComponent } from './child.component';

/** Elements that handle their own clicks; clicks on these never trigger row navigation. */
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, label, [role="button"], [contenteditable="true"]';

/**
 * This component controls each row in the table.
 */
@Component({
    selector: '[shark-table-body]',
    imports: [NgClass, NgStyle, SharkTableCellComponent, SharkChildComponent],
    template: `
        @if (currentColumns.length === 0) {
          <tr><td [attr.colspan]="childRows ? columns.length + 1 : columns.length">There are no columns selected</td></tr>
        } @else if (!page.content || page.content.length === 0) {
          <tr><td [attr.colspan]="childRows ? currentColumns.length + 1 : currentColumns.length">{{ tableEmptyMessage }}</td></tr>
        } @else {
          @for (row of page.content; track $index; let e = $even, o = $odd, i = $index) {
            <tr class="data-row"
                [ngClass]="{ odd: o, even: e, rowLink: isLinked, rowOpen: childOpen(i) }"
                [ngStyle]="rowStylingFunction?.(row)"
                (click)="rowClick(row, $event)"
                (auxclick)="rowAuxClick(row, $event)"
                (mousedown)="preventMiddleClickScroll($event)"
                (keydown.enter)="rowClick(row, $event)"
                [attr.tabindex]="isLinked ? 0 : null"
            >
                @if (childRows) {
                  <td class="header-buttons">
                    <button class="black-arrow fa fa-fw"
                            [attr.aria-expanded]="childOpen(i)"
                            [ngClass]="{ 'open': childOpen(i), 'closed': !childOpen(i), 'fa-caret-down': childOpen(i), 'fa-caret-right': !childOpen(i) }"
                            (click)="toggleChild(i)" type="button" aria-label="Details Row"
                    >
                    </button>
                  </td>
                }
                @for (column of currentColumns; track column) {
                    <td [ngClass]="{'right': column.alignRight }" [ngStyle]="addStyleToCell(row, column)">
                        <shark-table-cell [column]="column" [row]="row"></shark-table-cell>
                    </td>
                }
            </tr>
            @if (childRows) {
              <tr class="data-row child-row" [ngClass]="{ odd: o, even: e, rowOpen: childOpen(i) }" [hidden]="!childOpen(i)">
                  <td></td>
                  <td [attr.colspan]="currentColumns.length">
                      <shark-child [component]="childComponent" [row]="row" [rowIndex]="i" [openChildren]="openChildren"></shark-child>
                  </td>
              </tr>
            }
          }
        }
    `
})
export class SharkTableBodyComponent implements OnChanges {

    private readonly router = inject(Router);
    private readonly locationStrategy = inject(LocationStrategy);
    private readonly tableUtils = inject(SharkTableUtils);

    @Input()
    currentColumns: SharkColumn[] = [];

    @Input()
    columns: SharkColumn[] = [];

    @Input()
    rowStylingFunction: RowStyleFunction | null | undefined;

    @Input()
    cellStylingFunction: CellStyleFunction | null | undefined;

    @Input()
    childRows: boolean;

    @Input()
    childComponent: Type<SharkDynamicContents> | undefined;

    @Input()
    linkTarget: string | undefined;

    @Input()
    linkKey: string | undefined;

    @Input()
    tableEmptyMessage: string;

    @Input()
    page: Page;

    openChildren: number[] = [];

    get isLinked(): boolean {
      return !!this.linkTarget && !!this.linkKey;
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['page'] && !changes['page'].isFirstChange()) {
        this.openChildren = [];
      }
    }

    addStyleToCell(row: any, column: SharkColumn): { [key: string]: string; } | null {
      if (this.cellStylingFunction) {
        const cellData = this.tableUtils.retrieveCell(row, column);
        return this.cellStylingFunction(row, column, cellData);
      }

      return null;
    }

    childOpen(index: number): boolean {
      return this.openChildren.includes(index);
    }

    /**
     * Toggle the show/hide status of the child row
     */
    toggleChild(index: number): void {
      this.openChildren = this.childOpen(index)
        ? this.openChildren.filter(open => open !== index)
        : [...this.openChildren, index];
    }

    /**
     * If provided, navigate to link for this row using the router.
     * Ctrl/Cmd/Shift + click opens the link in a new tab/window, like a normal link.
     */
    rowClick(row: object, event?: Event): void {
      if (!this.isLinked || this.isFromInteractiveElement(event)) {
        return;
      }

      const mouseEvent = event as MouseEvent | KeyboardEvent | undefined;
      if (mouseEvent && (mouseEvent.ctrlKey || mouseEvent.metaKey || mouseEvent.shiftKey)) {
        this.openInNewTab(row);
        return;
      }

      const commands = this.linkCommands(row);
      if (commands) {
        this.router.navigate(commands);
      }
    }

    /**
     * Middle click on a linked row opens it in a new tab.
     */
    rowAuxClick(row: object, event: MouseEvent): void {
      if (event.button === 1 && this.isLinked && !this.isFromInteractiveElement(event)) {
        event.preventDefault();
        this.openInNewTab(row);
      }
    }

    /**
     * Stops the browser's middle-click auto scroll on linked rows so `auxclick` behaves like a link.
     */
    preventMiddleClickScroll(event: MouseEvent): void {
      if (event.button === 1 && this.isLinked && !this.isFromInteractiveElement(event)) {
        event.preventDefault();
      }
    }

    private openInNewTab(row: object): void {
      const commands = this.linkCommands(row);
      if (!commands) {
        return;
      }
      const url = this.router.serializeUrl(this.router.createUrlTree(commands));
      window.open(this.locationStrategy.prepareExternalUrl(url), '_blank', 'noopener');
    }

    private linkCommands(row: object): any[] | null {
      const key = this.tableUtils.findValue(row, this.linkKey ?? "");
      return key == null || key === '' || !this.linkTarget ? null : [this.linkTarget, key];
    }

    private isFromInteractiveElement(event?: Event): boolean {
      const target = event?.target as Element | null | undefined;
      const row = event?.currentTarget as Element | null | undefined;
      const interactive = target?.closest?.(INTERACTIVE_SELECTOR);
      return !!interactive && interactive !== row && !!row?.contains(interactive);
    }
}

export type RowStyleFunction =
  /**
   * Sends in the current row data and returns an object to be
   * used in conjunction with NgStyle with the format like:
   *
   * { 'background-color': 'red' }
   */
  (row: any) => { [key: string]: string; };

export type CellStyleFunction =
  /**
   * Sends in the current row data and returns an object to be
   * used in conjunction with NgStyle with the format like:
   *
   * { 'background-color': 'red' }
   */
  (row: any, column: SharkColumn, cell: any) => { [key: string]: string; };

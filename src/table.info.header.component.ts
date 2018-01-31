import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SharkColumnDropdownComponent } from './column-dropdown.component';
import { SharkColumn } from './column';
import { SharkHeaderFilterChange } from './table.header.component';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-table-info-header',
  template: `
    <div class="info-header">
      <div class="controls header-buttons">
        <button class="server-refresh fa fa-sync" *ngIf="serverSideData" (click)="fireFilterChange()" type="button">
          <span class="screen-reader-button-label">Refresh Server Data</span>
        </button>
        <shark-column-dropdown *ngIf="columnPicker" [columns]="allColumns" [notifierService]="notifierService" (columnChange)="fireColumnChange($event)"></shark-column-dropdown>
        <span class="filter-box" *ngIf="filterable && !columnFiltering && columns.length > 0">
          <label for="filter" class="screen-reader">Filter Results (all column search)</label>
          <input type="text" name="filter" id="filter" [(ngModel)]="filter" (ngModelChange)="fireFilterChange()" placeholder="Filter Results" />
        </span>
      </div>
    </div>
  `
})
export class SharkTableInfoHeaderComponent {

  @ViewChild(SharkColumnDropdownComponent)
  columnPickerComponent: SharkColumnDropdownComponent;

  @Input()
  columns: SharkColumn[];

  @Input()
  allColumns: SharkColumn[];

  @Input()
  columnPicker: boolean;

  @Input()
  serverSideData: boolean;

  @Input()
  filterable: boolean;

  @Input()
  columnFiltering: boolean;

  @Input()
  filter: string;

  @Input()
  localPagingSize: number;

  @Input()
  notifierService: NotifierService;

  @Output()
  filterChange = new EventEmitter<SharkHeaderFilterChange>();

  @Output()
  columnChange = new EventEmitter<SharkColumn[]>();

  fireFilterChange(): void {
    this.filterChange.emit({
      columns: this.columns,
      filter: this.filter,
      localPagingSize: this.localPagingSize
    });
  }

  fireColumnChange(event: SharkColumn[]): void {
    this.columnChange.emit(event);
  }
}

import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { SharkColumn } from './column';
import { SharkHeaderFilterChange } from './table.header.component';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-table-info-header',
  template: `
    <div class="info-header">
      <div class="controls header-buttons">
        <button class="toggle-dropdown" type="button" (click)="showDropDown = !showDropDown" [attr.aria-expanded]="showDropDown" [attr.aria-controls]="'column-picker-dropdown-' + tableId" #dropdownButton>
          <span>Choose Columns<i class="fa fa-fw fa-angle-down"></i></span>
        </button>
        <button class="server-refresh fa fa-sync" *ngIf="serverSideData" (click)="fireFilterChange()" type="button">
          <span class="screen-reader-button-label">Refresh Server Data</span>
        </button>
        <div *ngIf="leftSideHeaderTemplate" class="left-side-template">
          <ng-container *ngTemplateOutlet="leftSideHeaderTemplate"></ng-container>
        </div>
        <div class="flex-spacer"></div>
        <div *ngIf="rightSideHeaderTemplate" class="right-side-template">
          <ng-container *ngTemplateOutlet="rightSideHeaderTemplate"></ng-container>
        </div>
        <span class="filter-box" *ngIf="filterable && !columnFiltering && columns.length > 0">
          <label for="filter" class="screen-reader">Filter Results (all column search)</label>
          <input #filterInput type="text" name="filter" id="filter-{{ tableId }}" [(ngModel)]="filter" (ngModelChange)="fireFilterChange()" [attr.placeholder]="showFilterPlaceholders ? 'Filter Results' : null" />
        </span>
      </div>
      <div [id]="'column-picker-dropdown-' + tableId" class="dropdown" [attr.aria-hidden]="!showDropDown" role="region" tabindex="-1" [hidden]="!showDropDown" [ngStyle]="{'display': !showDropDown ? 'none' : 'block'}">
        <fieldset>
          <legend class="screen-reader">Columns to display</legend>
          <div class="column-wrapper">
            <label *ngFor="let column of allColumns">
              <input type="checkbox" [(ngModel)]="column.displayed" (ngModelChange)="fireColumnChange()" />
              {{ column.header }}
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  `
})
export class SharkTableInfoHeaderComponent {

  @ViewChild('dropdownButton')
  dropdownButton: ElementRef;

  @Input()
  leftSideHeaderTemplate: TemplateRef<any>;

  @Input()
  rightSideHeaderTemplate: TemplateRef<any>;

  @ViewChild('filterInput')
  filterInput: ElementRef;

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
  showFilterPlaceholders: boolean;

  @Input()
  localPagingSize: number;

  @Input()
  notifierService: NotifierService;

  @Input()
  tableId: string;

  @Output()
  filterChange = new EventEmitter<SharkHeaderFilterChange>();

  @Output()
  columnChange = new EventEmitter<SharkColumn[]>();

  showDropDown = false;

  fireFilterChange(): void {
    this.filterChange.emit({
      columns: this.columns,
      filter: this.filter,
      localPagingSize: this.localPagingSize
    });
  }

  fireColumnChange(): void {
    this.columnChange.emit(this.allColumns);
  }

}

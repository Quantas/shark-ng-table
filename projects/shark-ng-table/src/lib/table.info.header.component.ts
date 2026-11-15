import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharkColumn } from './column';
import { SharkHeaderFilterChange } from './table.header.component';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-table-info-header',
  imports: [FormsModule, NgTemplateOutlet],
  template: `
    <div class="info-header">
      <div class="controls header-buttons">
        @if (columnPicker) {
          <button class="toggle-dropdown" type="button" (click)="showDropDown = !showDropDown" [attr.aria-expanded]="showDropDown" [attr.aria-controls]="'column-picker-dropdown-' + tableId">
            <span>Choose Columns<i class="fa fa-fw fa-angle-down" aria-hidden="true"></i></span>
          </button>
        }
        @if (serverSideData) {
          <button class="server-refresh fa fa-sync" (click)="fireFilterChange()" type="button">
            <span class="screen-reader-button-label">Refresh Server Data</span>
          </button>
        }
        @if (leftSideHeaderTemplate) {
          <div class="left-side-template">
            <ng-container *ngTemplateOutlet="leftSideHeaderTemplate"></ng-container>
          </div>
        }
        <div class="flex-spacer"></div>
        @if (rightSideHeaderTemplate) {
          <div class="right-side-template">
            <ng-container *ngTemplateOutlet="rightSideHeaderTemplate"></ng-container>
          </div>
        }
        @if (filterable && !columnFiltering && columns.length > 0) {
          <span class="filter-box">
            <label [for]="'filter-' + tableId" class="screen-reader">Filter Results (all column search)</label>
            <input #filterInput type="text" name="filter" [id]="'filter-' + tableId" [(ngModel)]="filter" (ngModelChange)="fireFilterChange()" [attr.placeholder]="showFilterPlaceholders ? 'Filter Results' : null" />
          </span>
        }
      </div>
      @if (columnPicker) {
        <div [id]="'column-picker-dropdown-' + tableId" class="dropdown" role="region" aria-label="Column picker" tabindex="-1" [hidden]="!showDropDown" [style.display]="showDropDown ? 'block' : 'none'">
          <fieldset>
            <legend class="screen-reader">Columns to display</legend>
            <div class="column-wrapper">
              @for (column of allColumns; track column) {
                <label>
                  <input type="checkbox" [(ngModel)]="column.displayed" (ngModelChange)="fireColumnChange()" />
                  {{ column.header }}
                </label>
              }
            </div>
          </fieldset>
        </div>
      }
    </div>
  `
})
export class SharkTableInfoHeaderComponent {

  @Input()
  leftSideHeaderTemplate: TemplateRef<unknown>;

  @Input()
  rightSideHeaderTemplate: TemplateRef<unknown>;

  @ViewChild('filterInput')
  filterInput: ElementRef<HTMLInputElement>;

  @Input()
  columns: SharkColumn[] = [];

  @Input()
  allColumns: SharkColumn[] = [];

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
      columns: this.allColumns,
      filter: this.filter,
      localPagingSize: this.localPagingSize
    });
  }

  fireColumnChange(): void {
    this.columnChange.emit(this.allColumns);
  }

}

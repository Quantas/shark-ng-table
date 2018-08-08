import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { SharkColumn } from './column';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-column-dropdown',
  template: `
    <span class="column-picker">
        <button class="toggle-dropdown" type="button" (click)="showDropDown = !showDropDown" [attr.aria-expanded]="showDropDown" [attr.aria-controls]="'column-picker-dropdown-' + tableId" #dropdownButton>
          <span>Choose Columns<i class="fa fa-fw fa-angle-down"></i></span>
        </button>
        <div [id]="'column-picker-dropdown-' + tableId" class="dropdown" [attr.aria-hidden]="!showDropDown" role="region" tabindex="-1" [hidden]="!showDropDown" [ngStyle]="{'display': !showDropDown ? 'none' : 'block'}">
          <fieldset>
            <legend class="screen-reader">Columns to display</legend>
            <div class="column-wrapper">
              <label *ngFor="let column of columns">
                <input type="checkbox" [(ngModel)]="column.displayed" (ngModelChange)="emitSelected(column)" />
                {{ column.header }}
              </label>
              </div>
          </fieldset>
        </div>
    </span>
  `
})
export class SharkColumnDropdownComponent {

  @Input()
  columns: SharkColumn[];

  @Input()
  notifierService: NotifierService;

  @Input()
  tableId: string;

  @Output()
  columnChange = new EventEmitter<SharkColumn[]>();

  showDropDown = false;

  emitSelected(): void {
    this.columnChange.emit(this.columns);
  }
}

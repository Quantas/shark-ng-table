import {
  Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild
} from '@angular/core';
import { SharkColumn } from './column';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-column-dropdown',
  template: `
    <div class="column-picker">
        <button class="toggle-dropdown" type="button" (click)="showDropDown = !showDropDown" [attr.aria-expanded]="showDropDown" [attr.aria-controls]="'column-picker-dropdown-' + tableId" #dropdownButton>
          <span>Choose Columns<i class="fa fa-fw fa-angle-down"></i></span>
        </button>
        <div [id]="'column-picker-dropdown-' + tableId" class="dropdown" [attr.aria-hidden]="!showDropDown" aria-label="submenu" [hidden]="!showDropDown" [ngStyle]="{'display': !showDropDown ? 'none' : 'block'}">
          <fieldset>
            <legend class="screen-reader">Columns to display</legend>
            <div class="column-wrapper">
              <label *ngFor="let column of columns">
                <input type="checkbox" [(ngModel)]="column.displayed" (ngModelChange)="emitSelected()" />
                {{ column.header }}
              </label>
              </div>
          </fieldset>
        </div>
    </div>
  `
})
export class SharkColumnDropdownComponent {

  @ViewChild('dropdownButton')
  dropdownButton: ElementRef;

  @Input()
  columns: SharkColumn[];

  @Input()
  notifierService: NotifierService;

  @Input()
  tableId: string;

  @Output()
  columnChange = new EventEmitter<SharkColumn[]>();

  showDropDown = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:keydown.escape', [])
  closeDropDownWithEscape(): void {
    if (this.showDropDown) {
      this.showDropDown = false;
      this.dropdownButton.nativeElement.focus();
    }
  }

  @HostListener('document:click', [ '$event' ])
  @HostListener('document:touchstart', [ '$event' ])
  closeDropDown(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropDown = false;
    }
  }

  emitSelected(): void {
    this.columnChange.emit(this.columns);
  }
}

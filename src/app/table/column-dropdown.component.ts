import {
  Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild
} from '@angular/core';
import { SharkColumn } from './column';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-column-dropdown',
  template: `
    <span class="column-picker">
        <button class="toggle-dropdown" (click)="showDropDown = !showDropDown" [attr.aria-expanded]="showDropDown" aria-controls="column-picker-dropdown" type="button" #dropdownButton>
          <span>Choose Columns<i class="fa fa-fw fa-angle-down"></i></span>
        </button>
        <div id="column-picker-dropdown" class="dropdown" [attr.aria-hidden]="!showDropDown" aria-label="submenu" [ngStyle]="{'display': showDropDown ? 'block': 'none'}">
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
  @ViewChild('dropdownButton')
  dropdownButton: ElementRef;

  @Input()
  columns: SharkColumn[];

  @Input()
  notifierService: NotifierService;

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

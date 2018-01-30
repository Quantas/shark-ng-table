import {
  Component, ElementRef, EventEmitter, HostListener, Input, Output
} from '@angular/core';
import { SharkColumn } from './column';

@Component({
  selector: 'shark-column-dropdown',
  template: `
    <span class="column-picker">
        <button class="toggle-dropdown" (click)="showDropDown = !showDropDown" type="button">
          <span>Choose Columns<i class="fa fa-fw fa-angle-down"></i></span>
        </button>
        <div class="dropdown" *ngIf="showDropDown">
          <span class="screen-reader">Press Escape to close this drop down.</span>
          <label *ngFor="let column of columns">
            <input type="checkbox"
                   [(ngModel)]="column.displayed"
                   (ngModelChange)="emitSelected()"
                   [title]="'Click to ' + (column.displayed ? 'hide' : 'show') + ' the ' + column.header + ' column'" 
            />
            <span>{{ column.header }}</span>
          </label>
        </div>
    </span>
  `
})
export class SharkColumnDropdownComponent {
  @Input()
  columns: SharkColumn[];

  @Output()
  columnChange = new EventEmitter<SharkColumn[]>();

  showDropDown = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:keydown.escape', [])
  closeDropDownWithEscape(): void {
    if (this.showDropDown) {
      this.showDropDown = false;
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

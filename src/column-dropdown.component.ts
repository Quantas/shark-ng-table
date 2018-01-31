import {
  Component, ElementRef, EventEmitter, HostListener, Input, Output
} from '@angular/core';
import { SharkColumn } from './column';
import { NotifierService } from './notifier/notifier.service';

@Component({
  selector: 'shark-column-dropdown',
  template: `
    <span class="column-picker">
        <button class="toggle-dropdown" (click)="showDropDown = !showDropDown" aria-haspopup="true" type="button">
          <span>Choose Columns<i class="fa fa-fw fa-angle-down"></i></span>
        </button>
        <ul id="column-picker-dropdown" class="dropdown" [attr.aria-hidden]="!showDropDown" aria-label="submenu" [ngStyle]="{'display': showDropDown ? 'block': 'none'}">
          <li *ngFor="let column of columns">
            <label>
              <input type="checkbox"
                     [(ngModel)]="column.displayed"
                     (ngModelChange)="emitSelected(column)"
                     [title]="'Click to ' + (column.displayed ? 'hide' : 'show') + ' the ' + column.header + ' column'" 
              />
              <span>{{ column.header }}</span>
            </label>
          </li>
        </ul>
    </span>
  `
})
export class SharkColumnDropdownComponent {
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
    }
  }

  @HostListener('document:click', [ '$event' ])
  @HostListener('document:touchstart', [ '$event' ])
  closeDropDown(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropDown = false;
    }
  }

  emitSelected(column: SharkColumn): void {
    this.notifierService.postMessage(column.header + ' column changed to ' + (column.displayed ? 'shown' : 'hidden'));
    this.columnChange.emit(this.columns);
  }
}

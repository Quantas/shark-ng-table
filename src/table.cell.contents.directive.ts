import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTableCellContents]'
})
export class TableCellContentsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

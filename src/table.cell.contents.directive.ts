import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sharkTableCellContents]'
})
export class SharkTableCellContentsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

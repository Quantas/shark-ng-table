import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sharkChildContents]'
})
export class SharkChildContentsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

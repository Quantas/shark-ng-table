import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sharkDynamicContents]'
})
export class SharkDynamicContentsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

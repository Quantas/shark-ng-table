import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, Type, ViewChild } from '@angular/core';
import { SharkTableUtils } from './table.utils';
import { SharkDynamicContents } from './dynamic/dynamic.contents';
import { SharkDynamicContentsDirective } from './dynamic/dynamic.contents.directive';

/**
 * This Component is used to render your custom child row component.
 */
@Component({
  selector: 'shark-child',
  template: `
      <ng-template sharkDynamicContents></ng-template>
  `
})
export class SharkChildComponent implements AfterViewInit {

  /**
   * Your custom component which extends {@link SharkDynamicContents} that will be used
   * to render each child row. Your custom component needs to be registerd in your NgModule
   * as an `entryComponent` and in the `declarations` section.
   */
  @Input()
  component: Type<SharkDynamicContents>;

  /**
   * The entire row, you can display anything from this row in your child component.
   */
  @Input()
  row: any;

  @ViewChild(SharkDynamicContentsDirective)
  childContentsDirective: SharkDynamicContentsDirective;

  constructor(private tableUtils: SharkTableUtils, private componentFactoryResolver: ComponentFactoryResolver,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    const viewContainerRef = this.childContentsDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<SharkDynamicContents>componentRef.instance).data = this.row;

    // without this, everything went boom
    this.changeDetectorRef.detectChanges();
  }
}

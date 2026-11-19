import { ChangeDetectorRef, Component, ComponentRef, Input, OnChanges, OnDestroy, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { SharkDynamicContents } from './dynamic/dynamic.contents';
import { setDynamicInput } from './dynamic/dynamic.inputs';

/**
 * This Component is used to render your custom child row component.
 */
@Component({
  selector: 'shark-child',
  template: `<ng-container #dynamicHost></ng-container>`
})
export class SharkChildComponent implements OnChanges, OnDestroy {

  /**
   * Your custom component which implements {@link SharkDynamicContents} that will be used
   * to render each child row.
   */
  @Input()
  component: Type<SharkDynamicContents> | undefined;

  /**
   * The entire row, you can display anything from this row in your child component.
   */
  @Input()
  row: any;

  @Input()
  rowIndex: number;

  @Input()
  openChildren: number[] = [];

  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true })
  dynamicHost: ViewContainerRef;

  childOpen = false;

  componentRef: ComponentRef<SharkDynamicContents> | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['component'] || changes['row']) {
      this.loadComponent();
    }

    const openChange = changes['openChildren'];
    if (openChange && !openChange.isFirstChange()) {
      const open = (openChange.currentValue ?? []).includes(this.rowIndex);
      if (open !== this.childOpen) {
        this.childOpen = open;
        this.componentRef?.instance.childOpen?.(open);
        this.componentRef?.injector.get(ChangeDetectorRef).detectChanges();
      }
    }
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }

  private loadComponent(): void {
    if (!this.component) {
      return;
    }

    if (this.componentRef?.componentType !== this.component) {
      this.dynamicHost.clear();
      this.componentRef = this.dynamicHost.createComponent(this.component);
    }

    setDynamicInput(this.componentRef!, 'data', this.row);
    this.componentRef!.injector.get(ChangeDetectorRef).detectChanges();
  }
}

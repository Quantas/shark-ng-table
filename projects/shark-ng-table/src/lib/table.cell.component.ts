import { ChangeDetectorRef, Component, ComponentRef, Input, OnChanges, OnDestroy, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';
import { SharkDynamicContents } from './dynamic/dynamic.contents';

@Component({
  selector: 'shark-table-cell',
  template: `<ng-container #dynamicHost></ng-container>@if (!column.component) { {{ contents ?? '' }} }`
})
export class SharkTableCellComponent implements OnChanges, OnDestroy {

  private readonly tableUtils = inject(SharkTableUtils);

  @Input()
  column: SharkColumn;

  @Input()
  row: any;

  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true })
  dynamicHost: ViewContainerRef;

  contents: any;

  private componentRef: ComponentRef<SharkDynamicContents> | undefined;

  ngOnChanges(): void {
    this.contents = this.tableUtils.retrieveCell(this.row, this.column);

    if (this.column.component) {
      if (this.componentRef?.componentType !== this.column.component) {
        this.dynamicHost.clear();
        this.componentRef = this.dynamicHost.createComponent(this.column.component);
      }
      this.componentRef.instance.data = this.contents;
      this.componentRef.instance.row = this.row;
      this.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    } else if (this.componentRef) {
      this.dynamicHost.clear();
      this.componentRef = undefined;
    }
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }
}

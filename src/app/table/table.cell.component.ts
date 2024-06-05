import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';
import { SharkDynamicContentsDirective } from './dynamic/dynamic.contents.directive';
import { SharkDynamicContents } from './dynamic/dynamic.contents';

@Component({
  selector: 'shark-table-cell',
  template: `
      <ng-container *ngIf="column.component">
          <ng-template sharkDynamicContents></ng-template>
      </ng-container>

      <ng-container *ngIf="noComponentContents">
          {{ noComponentContents }}
      </ng-container>
  `
})
export class SharkTableCellComponent implements AfterViewInit {

  @Input()
  column: SharkColumn;

  @Input()
  row: any;

  @ViewChild(SharkDynamicContentsDirective, { static: false })
  tableCellContentsDirective: SharkDynamicContentsDirective;

  noComponentContents: any;

  constructor(private tableUtils: SharkTableUtils, private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  private retrieveCell(row: Object, column: SharkColumn): string {
    return this.tableUtils.retrieveCell(row, column);
  }

  private loadComponent(): void {
    if (this.column.component) {
      const contents = this.retrieveCell(this.row, this.column);

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.column.component);

      const viewContainerRef = this.tableCellContentsDirective.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<SharkDynamicContents>componentRef.instance).data = contents;
      (<SharkDynamicContents>componentRef.instance).row = this.row;
    } else {
      this.noComponentContents = this.retrieveCell(this.row, this.column);
    }

    // without this, everything went boom
    this.cdr.detectChanges();
  }
}

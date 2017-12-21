import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';
import { SharkTableCellContentsDirective } from './table.cell.contents.directive';
import { SharkTableCellContents } from './table.cell.contents';

@Component({
  selector: 'shark-table-cell',
  template: `
      <ng-container *ngIf="column.component">
          <ng-template sharkTableCellContents></ng-template>
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
  row: any[];

  @ViewChild(SharkTableCellContentsDirective)
  tableCellContentsDirective: SharkTableCellContentsDirective;

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
      (<SharkTableCellContents>componentRef.instance).data = contents;
    } else {
      this.noComponentContents = this.retrieveCell(this.row, this.column);
    }

    // without this, everything went boom
    this.cdr.detectChanges();
  }
}

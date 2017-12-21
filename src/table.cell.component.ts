import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { Column } from './column';
import { TableUtils } from './table.utils';
import { TableCellContentsDirective } from './table.cell.contents.directive';
import { TableCellContents } from './table.cell.contents';

@Component({
  selector: 'app-table-cell',
  templateUrl: 'table.cell.component.html'
})
export class TableCellComponent implements AfterViewInit {

  @Input()
  column: Column;

  @Input()
  row: any[];

  @ViewChild(TableCellContentsDirective)
  tableCellContentsDirective: TableCellContentsDirective;

  noComponentContents: any;

  constructor(private tableUtils: TableUtils, private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  private retrieveCell(row: Object, column: Column): string {
    return this.tableUtils.retrieveCell(row, column);
  }

  private loadComponent(): void {
    if (this.column.component) {
      const contents = this.retrieveCell(this.row, this.column);

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.column.component);

      const viewContainerRef = this.tableCellContentsDirective.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<TableCellContents>componentRef.instance).data = contents;
    } else {
      this.noComponentContents = this.retrieveCell(this.row, this.column);
    }

    // without this, everything went boom
    this.cdr.detectChanges();
  }
}

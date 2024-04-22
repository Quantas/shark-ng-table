import { Component, ViewChild } from '@angular/core';
import { SharkColumn, SharkTableComponent } from '../table';
import { ChildRowRenderingComponent } from './shared/child-rows-rendering.component';
import { MakeComponent } from './custom-cell.component';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Two Tables" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table #sharkTable
         [data]="parent.testData"
         [columns]="tableColumns"
         [columnPicker]="true"
         [columnOrdering]="true"
         [columnFiltering]="true"
         [childRows]="true"
         [childComponent]="childComponent"
      >
      </shark-table>
      <br />
      <shark-table #sharkTable
         [data]="parent.testData"
         [columns]="tableColumnsTwo"
         [columnPicker]="true"
         [columnOrdering]="true"
         [columnFiltering]="true"
         [childRows]="true"
         [childComponent]="childComponent"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class TwoTablesComponent {

  @ViewChild(SharkTableComponent, { static: true })
  sharkTable: SharkTableComponent;

  htmlSample = `
    &lt;shark-table
      [data]="testData"
      [columns]="tableColumns"
      [columnPicker]="true"
      [columnOrdering]="true"
      [columnFiltering]="true"
      [childRows]="true"
      [childComponent]="childComponent"
    &gt;
    &lt;/shark-table&gt;
    &lt;shark-table
      [data]="testData"
      [columns]="tableColumnsTwo"
      [columnPicker]="true"
      [columnOrdering]="true"
      [columnFiltering]="true"
      [childRows]="true"
      [childComponent]="childComponent"
    &gt;
    &lt;/shark-table&gt;
  `;

  tsSample = `
    // Please see other samples for more detail.
  `;

  childComponent = ChildRowRenderingComponent;

  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make', component: MakeComponent },
    { header: 'Model', property: 'model' }
  ];

  tableColumnsTwo: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make', component: MakeComponent },
    { header: 'Model', property: 'model' }
  ];

  exportData(): void {
    console.log(this.sharkTable.exportCurrentData());
  }

}

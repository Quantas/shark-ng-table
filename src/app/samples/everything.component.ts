import { Component, ViewChild } from '@angular/core';
import { SharkColumn, SharkTableComponent } from '../table';
import { ChildRowRenderingComponent } from './shared/child-rows-rendering.component';
import { MakeComponent } from './custom-cell.component';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Everything (except row links)" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
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
      <button mat-raised-button (click)="exportData()">Export Data (Check Console)</button>
    </shark-table-code-sample>
  `
})
export class EverythingComponent {

  @ViewChild(SharkTableComponent)
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

  exportData(): void {
      console.log(this.sharkTable.exportCurrentData());
  }

}

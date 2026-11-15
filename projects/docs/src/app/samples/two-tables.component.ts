import { Component } from '@angular/core';
import { CodeSampleComponent } from './shared/code-sample.component';
import { SharkColumn, SharkTableComponent } from 'shark-ng-table';
import { ChildRowRenderingComponent } from './shared/child-rows-rendering.component';
import { MakeComponent } from './custom-cell.component';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Two independent tables on one page." pageTitle="Two Tables" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
         caption="First table"
         [data]="parent.testData"
         [columns]="tableColumns"
         [columnPicker]="true"
         [columnOrdering]="true"
         [columnFiltering]="true"
         [childRows]="true"
         [childComponent]="childComponent"
      >
      </shark-table>
      <shark-table
         caption="Second table"
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

  htmlSample = `
    <shark-table
      [data]="testData"
      [columns]="tableColumns"
      [columnPicker]="true"
      [columnOrdering]="true"
      [columnFiltering]="true"
      [childRows]="true"
      [childComponent]="childComponent"
    ></shark-table>

    <shark-table
      [data]="testData"
      [columns]="tableColumnsTwo"
      [columnPicker]="true"
      [columnOrdering]="true"
      [columnFiltering]="true"
      [childRows]="true"
      [childComponent]="childComponent"
    ></shark-table>
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

}

import { Component } from '@angular/core';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Column Ordering" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [columnOrdering]="true"
        [filterable]="false"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class ColumnOrderingComponent {

  htmlSample = `
    &lt;shark-table
      [data]="testData"
      [columns]="tableColumns"
      [columnOrdering]="true"
      [filterable]="false"
      [hideCaption]="true"
    &gt;
    &lt;/shark-table&gt;
  `;

  tsSample = `
    // Populate with objects matching the column properties
    testData = [];

    tableColumns: SharkColumn[] = [
      { header: 'Year', property: 'year' },
      { header: 'Make', property: 'make' },
      { header: 'Model', property: 'model' }
    ];
  `;

}

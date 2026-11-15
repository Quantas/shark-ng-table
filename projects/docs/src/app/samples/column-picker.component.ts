import { Component } from '@angular/core';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Column Picker" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [columnPicker]="true"
        [filterable]="false"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class ColumnPickerComponent {

  htmlSample = `
    <shark-table
      [data]="testData"
      [columns]="tableColumns"
      [columnPicker]="true"
      [filterable]="false"
      [hideCaption]="true"
    ></shark-table>
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

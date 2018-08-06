import { Component } from '@angular/core';
import { CellStyleFunction, SharkColumn } from '../table';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Cell Styling" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [cellStylingFunction]="cellStylingFunction"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class CellStyleComponent {

  htmlSample = `
    &lt;shark-table
      [data]="testData"
      [columns]="tableColumns"
      [filterable]="false"
      [localPaging]="false"
      [cellStylingFunction]="cellStylingFunction"
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

    cellStylingFunction: CellStyleFunction = (row: any, column: SharkColumn,  cell: any) => {
      const color = column.property === 'year' ? 'red' : column.property === 'make' ? 'white' : 'blue';
      return {'background-color': color };
    };
  `;

  cellStylingFunction: CellStyleFunction = (row: any, column: SharkColumn,  cell: any) => {

    const color = column.property === 'year' ? 'red' : column.property === 'make' ? 'white' : 'blue';
    return {'background-color': color };
  };

}

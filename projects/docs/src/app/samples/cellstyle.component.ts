import { Component } from '@angular/core';
import { CodeSampleComponent } from './shared/code-sample.component';
import { CellStyleFunction, SharkColumn, SharkTableComponent } from 'shark-ng-table';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Style individual cells or rows from a function." pageTitle="Cell Styling" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
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
    <shark-table
      [data]="testData"
      [columns]="tableColumns"
      [filterable]="false"
      [localPaging]="false"
      [cellStylingFunction]="cellStylingFunction"
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

    cellStylingFunction: CellStyleFunction = (row: any, column: SharkColumn) => {
      // Set the text color too, so the cell keeps enough contrast in any theme.
      const background = column.property === 'year' ? '#fde2e1' : column.property === 'make' ? '#ffffff' : '#dbe8fb';
      return { 'background-color': background, 'color': '#17212b' };
    };
  `;

  cellStylingFunction: CellStyleFunction = (row: any, column: SharkColumn) => {

    // Set the text color too, so the cell keeps enough contrast in any theme.
    const background = column.property === 'year' ? '#fde2e1' : column.property === 'make' ? '#ffffff' : '#dbe8fb';
    return { 'background-color': background, 'color': '#17212b' };
  };

}

import {Component, OnInit} from '@angular/core';
import {TableDataService} from '../data.service';
import {CellStyleFunction, SharkColumn} from '../table';

@Component({
  template: `
    <h1>Cell Styling</h1>
    <div style="width: 35rem">
      <shark-table
        [data]="testData"
        [columns]="tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [cellStylingFunction]="cellStylingFunction"
        [hideCaption]="true"
      >
      </shark-table>
    </div>

    <h2>HTML</h2>
    <pre>
      &lt;shark-table
        [data]="testData"
        [columns]="tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [cellStylingFunction]="cellStylingFunction"
        [hideCaption]="true"
      &gt;
      &lt;/shark-table&gt;
    </pre>
  `
})
export class CellStyleComponent implements OnInit {

  testData = [];

  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make' },
    { header: 'Model', property: 'model' }
  ];

  constructor(private tableDataService: TableDataService) {}

  ngOnInit(): void {
    this.testData = this.tableDataService.getTestData();
  }

  cellStylingFunction: CellStyleFunction = (row: any, column: SharkColumn,  cell: any) => {

    const color = column.property === 'year' ? 'red' : column.property === 'make' ? 'white' : 'blue';
    return {'background-color': color };
  };

}

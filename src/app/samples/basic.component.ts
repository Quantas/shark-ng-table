import {Component, OnInit} from '@angular/core';
import {TableDataService} from '../data.service';
import {SharkColumn} from '../table';

@Component({
  template: `
    <h1>Basic Table</h1>
    <div style="width: 37rem">
      <shark-table
        [data]="testData"
        [columns]="tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [hideCaption]="true"
      >
      </shark-table>
    </div>

    <mat-tab-group>
      <mat-tab label="HTML">
        <div highlight-js-content=".highlight">
          <pre [innerHTML]="htmlSample" class="highlight"></pre>
        </div>
      </mat-tab>
      <mat-tab label="TS">
        <div highlight-js-content=".highlight">
          <pre [innerHTML]="tsSample" class="highlight typescript"></pre>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [
    `
      mat-tab-group {
        height: 250px
      }
    `
  ]
})
export class BasicComponent implements OnInit {

  htmlSample = `
    &lt;shark-table
      [data]="testData"
      [columns]="tableColumns"
      [filterable]="false"
      [localPaging]="false"
      [hideCaption]="true"
    &gt;&lt;/shark-table&gt;
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

}

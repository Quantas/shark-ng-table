import {Component, OnInit} from '@angular/core';
import {TableDataService} from '../data.service';
import {SharkColumn} from '../table';
import {ChildRowRenderingComponent} from './child-rows-rendering.component';

@Component({
  template: `
    <h1>Child Rows</h1>
    <div style="width: 55rem">
      <shark-table
        [data]="testData"
        [columns]="tableColumns"
        [columnFiltering]="true"
        [childRows]="true"
        [childComponent]="childComponent"
        [hideCaption]="true"
      >
      </shark-table>
    </div>

    <h2>HTML</h2>
    <pre>
      &lt;shark-table
        [data]="testData"
        [columns]="tableColumns"
        [columnFiltering]="true"
        [childRows]="true"
        [childComponent]="childComponent"
        [hideCaption]="true"
      &gt;&lt;/shark-table&gt;
    </pre>
  `
})
export class ChildRowsComponent implements OnInit {

  childComponent = ChildRowRenderingComponent;

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

import {Component, OnInit, ViewChild} from '@angular/core';
import {TableDataService} from '../data.service';
import {SharkColumn, SharkTableComponent} from '../table';
import {ChildRowRenderingComponent} from './shared/child-rows-rendering.component';
import {MakeComponent} from './custom-cell.component';

@Component({
  template: `
    <h1>Everything (except row links)</h1>
    <div style="width: 55rem">
      <shark-table #sharkTable
        [data]="testData"
        [columns]="tableColumns"
        [columnPicker]="true"
        [columnOrdering]="true"
        [columnFiltering]="true"
        [childRows]="true"
        [childComponent]="childComponent"
      >
      </shark-table>
    </div>
    <br />
    <button (click)="exportData()">Export Data (Check Console)</button>

    <h2>HTML</h2>
    <pre>
      &lt;shark-table
        [data]="testData"
        [columns]="tableColumns"
        [columnPicker]="true"
        [columnOrdering]="true"
        [columnFiltering]="true"
        [childRows]="true"
        [childComponent]="childComponent"
      &lt;/shark-table&gt;
    </pre>
  `
})
export class EverythingComponent implements OnInit {

  @ViewChild(SharkTableComponent)
  sharkTable: SharkTableComponent;

  testData = [];

  childComponent = ChildRowRenderingComponent;

  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make', component: MakeComponent },
    { header: 'Model', property: 'model' }
  ];

  constructor(private tableDataService: TableDataService) {}

  ngOnInit(): void {
    this.testData = this.tableDataService.getTestData();
  }
  
  exportData(): void {
      console.log(this.sharkTable.exportCurrentData());
  }

}

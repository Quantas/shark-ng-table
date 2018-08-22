import { Component, ViewChild } from '@angular/core';
import { SharkTableComponent } from '../table';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Data Export" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <button mat-raised-button (click)="exportData()">Export Data (Check Console)</button>
      <shark-table #sharkTable
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class DataExportComponent {

  @ViewChild(SharkTableComponent)
  sharkTable: SharkTableComponent;

  htmlSample = `
    &lt;button (click)="exportData()"&gt;Export Data (Check Console)&lt;/button&gt;
    &lt;shark-table #sharkTable
      [data]="testData"
      [columns]="tableColumns"
      [filterable]="false"
      [localPaging]="false"
      [hideCaption]="true"
    &gt;
    &lt;/shark-table&gt;
  `;

  tsSample = `
    // Get a reference to the table
    @ViewChild(SharkTableComponent)
    sharkTable: SharkTableComponent;

    // Populate with objects matching the column properties
    testData = [];

    tableColumns: SharkColumn[] = [
      { header: 'Year', property: 'year' },
      { header: 'Make', property: 'make' },
      { header: 'Model', property: 'model' }
    ];

    exportData(): void {
      console.log(this.sharkTable.exportCurrentData());
    }
  `;

  exportData(): void {
    console.log(this.sharkTable.exportCurrentData());
  }

}

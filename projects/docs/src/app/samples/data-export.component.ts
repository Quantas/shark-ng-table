import { Component, ViewChild, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CodeSampleComponent } from './shared/code-sample.component';
import { SharkTableComponent, SharkTableCurrentDataEvent } from 'shark-ng-table';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent, JsonPipe],
  template: `
    <shark-table-code-sample description="Get the filtered and sorted rows, with the visible columns, for export." pageTitle="Data Export" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <button type="button" (click)="exportData()">Export data</button>
      <shark-table #sharkTable
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [localPagingSize]="5"
        [hideCaption]="true"
      >
      </shark-table>
      @if (exported()) {
        <h3>Exported rows ({{ exported()!.data.length }})</h3>
        <pre class="output">{{ exported()!.data | json }}</pre>
      }
    </shark-table-code-sample>
  `
})
export class DataExportComponent {

  @ViewChild(SharkTableComponent, { static: true })
  sharkTable: SharkTableComponent;

  htmlSample = `
    <button type="button" (click)="exportData()">Export data</button>
    <shark-table #sharkTable
      [data]="testData"
      [columns]="tableColumns"
      [localPagingSize]="5"
      [hideCaption]="true"
    ></shark-table>
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
      // Every row that matches the current filters, in the current sort order,
      // with only the visible columns. Pass false to skip column pipes.
      const { data, columns } = this.sharkTable.exportCurrentData();
      // e.g. turn data + columns into CSV here
    }
  `;

  readonly exported = signal<SharkTableCurrentDataEvent | undefined>(undefined);

  exportData(): void {
    this.exported.set(this.sharkTable.exportCurrentData());
  }

}

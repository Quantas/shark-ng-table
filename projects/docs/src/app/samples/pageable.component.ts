import { Component } from '@angular/core';
import { CodeSampleComponent } from './shared/code-sample.component';
import { SharkTableComponent } from 'shark-ng-table';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Client-side paging with a page size picker." pageTitle="Pageable Table" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [filterable]="false"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class PageableComponent {

  htmlSample = `
    <shark-table
      [data]="testData"
      [columns]="tableColumns"
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

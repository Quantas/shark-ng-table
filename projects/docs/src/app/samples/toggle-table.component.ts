import { Component } from '@angular/core';
import { CodeSampleComponent } from './shared/code-sample.component';
import { SharkTableComponent } from 'shark-ng-table';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Create and destroy a table on demand." pageTitle="Toggle Table" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <button type="button" [attr.aria-expanded]="displayed" (click)="displayed = !displayed">{{ displayed ? 'Hide' : 'Show' }} the table</button>
      @if (displayed) {
        <shark-table
          [data]="parent.testData"
          [columns]="parent.tableColumns"
          [columnPicker]="true"
          [filterable]="false"
          [localPaging]="false"
          [hideCaption]="true"
        >
        </shark-table>
      }
    </shark-table-code-sample>
  `
})
export class ToggleTableComponent {

  displayed = false;

  htmlSample = `
    <button type="button" [attr.aria-expanded]="displayed" (click)="displayed = !displayed">
      {{ displayed ? 'Hide' : 'Show' }} the table
    </button>
    @if (displayed) {
      <shark-table
        [data]="testData"
        [columns]="tableColumns"
        [columnPicker]="true"
        [filterable]="false"
        [localPaging]="false"
        [hideCaption]="true"
      ></shark-table>
    }
  `;

  tsSample = `
    displayed = false;

    // Populate with objects matching the column properties
    testData = [];

    tableColumns: SharkColumn[] = [
      { header: 'Year', property: 'year' },
      { header: 'Make', property: 'make' },
      { header: 'Model', property: 'model' }
    ];
  `;

}

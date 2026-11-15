import {Component} from '@angular/core';
import { CodeSampleComponent } from './shared/code-sample.component';
import { SharkTableComponent } from 'shark-ng-table';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Whole rows link to another route. Middle click or Ctrl/Cmd click opens a new tab." pageTitle="Row Linking" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [linkTarget]="'/link-target'"
        [linkKey]="'id'"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class RowLinkComponent {

  htmlSample = `
    <!-- linkTarget is a router path in your app; linkKey is a property of each row -->
    <shark-table
        [data]="testData"
        [columns]="tableColumns"
        [linkTarget]="'/link-target'"
        [linkKey]="'id'"
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

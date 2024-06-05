import {Component} from '@angular/core';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Row Linking" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
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
    // linkTarget should be an Angular router path in your app
    // linkKey should be a property name from your data
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

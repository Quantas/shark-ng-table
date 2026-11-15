import { Component } from '@angular/core';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Content Projection" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [hideCaption]="true"
      >
        <ng-template #headerLeft>
          Left Side!
        </ng-template>
        <ng-template #headerRight>
          Right Side!
        </ng-template>

        <ng-template #footerLeft>
          Left Side!
        </ng-template>
        <ng-template #footerRight>
          Right Side!
        </ng-template>
      </shark-table>
    </shark-table-code-sample>
  `
})
export class ContentProjectionComponent {

  htmlSample = `
    <shark-table
      [data]="testData"
      [columns]="tableColumns"
      [filterable]="false"
      [localPaging]="false"
      [hideCaption]="true"
    >
      <ng-template #headerLeft>
        Left Side!
      </ng-template>
      <ng-template #headerRight>
        Right Side!
      </ng-template>

      <ng-template #footerLeft>
        Left Side!
      </ng-template>
      <ng-template #footerRight>
        Right Side!
      </ng-template>
    </shark-table>
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

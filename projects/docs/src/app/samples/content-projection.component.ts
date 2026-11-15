import { Component } from '@angular/core';
import { CodeSampleComponent } from './shared/code-sample.component';
import { SharkTableComponent } from 'shark-ng-table';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Put your own content on the left and right of the header and footer." pageTitle="Content Projection" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [hideCaption]="true"
      >
        <ng-template #headerLeft>
          Left content
        </ng-template>
        <ng-template #headerRight>
          Right content
        </ng-template>

        <ng-template #footerLeft>
          Left content
        </ng-template>
        <ng-template #footerRight>
          Right content
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
        Left content
      </ng-template>
      <ng-template #headerRight>
        Right content
      </ng-template>

      <ng-template #footerLeft>
        Left content
      </ng-template>
      <ng-template #footerRight>
        Right content
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

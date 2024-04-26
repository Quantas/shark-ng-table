import { Component } from '@angular/core';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Toggle Table" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <br />
      <button mat-button (click)="displayed = !displayed">Click to Show the Table</button>
      <ng-container *ngIf="displayed">
        <shark-table
          [data]="parent.testData"
          [columns]="parent.tableColumns"
          [columnPicker]="true"
          [filterable]="false"
          [localPaging]="false"
          [hideCaption]="true"
        >
        </shark-table>
      </ng-container>
    </shark-table-code-sample>
  `
})
export class ToggleTableComponent {

  displayed = false;

  htmlSample = `
    <button mat-button (click)="displayed = !displayed">Click to Show the Table</button>
    <ng-container *ngIf="displayed">
      <shark-table
        [data]="testData"
        [columns]="tableColumns"
        [columnPicker]="true"
        [filterable]="false"
        [localPaging]="false"
        [hideCaption]="true"
      ></shark-table>
    </ng-container>
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

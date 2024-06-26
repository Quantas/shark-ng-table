import { Component, Input, OnInit } from '@angular/core';
import { SharkColumn } from '../../table';
import { TableDataService } from '../../data.service';

@Component({
  selector: 'shark-table-code-sample',
  template: `
    <h1>{{ pageTitle }}</h1>
    <mat-tab-group>
      <mat-tab label="HTML" *ngIf="htmlSample">
        <pre [highlight]="htmlSample" [languages]="html"></pre>
      </mat-tab>
      <mat-tab label="TS" *ngIf="tsSample">
        <pre [highlight]="tsSample" [languages]="typescript"></pre>
      </mat-tab>
      <mat-tab label="CSS" *ngIf="cssSample">
        <pre [highlight]="cssSample" [languages]="css"></pre>
      </mat-tab>
    </mat-tab-group>
    <ng-content></ng-content>
  `,
  styles: [
    `
      h1 {
        margin-top: 0;
      }

      mat-tab-group {
        min-height: 250px;
        border: 1px solid gray;
      }
    `
  ]
})
export class CodeSampleComponent implements OnInit {

  @Input()
  pageTitle: string;

  @Input()
  htmlSample;

  @Input()
  tsSample;

  @Input()
  cssSample;

  size: string;

  testData = [];

  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make' },
    { header: 'Model', property: 'model' }
  ];

  constructor(private tableDataService: TableDataService) {}

  ngOnInit(): void {
    this.testData = this.tableDataService.getTestData();
  }
}

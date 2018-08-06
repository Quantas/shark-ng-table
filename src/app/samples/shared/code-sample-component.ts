import { Component, Input, OnInit } from '@angular/core';
import { SharkColumn } from '../../table';
import { TableDataService } from '../../data.service';

import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'shark-table-code-sample',
  template: `
    <h1>{{ pageTitle }}</h1>
    <mat-tab-group>
      <mat-tab label="HTML" *ngIf="htmlSample">
        <div highlight-js-content=".highlight">
          <pre [innerHTML]="htmlSample" class="highlight html"></pre>
        </div>
      </mat-tab>
      <mat-tab label="TS" *ngIf="tsSample">
        <div highlight-js-content=".highlight">
          <pre [innerHTML]="tsSample" class="highlight typescript"></pre>
        </div>
      </mat-tab>
      <mat-tab label="CSS" *ngIf="cssSample">
        <div highlight-js-content=".highlight">
          <pre [innerHTML]="cssSample" class="highlight css"></pre>
        </div>
      </mat-tab>
    </mat-tab-group>
    <div class="table-wrapper">
      <ng-content></ng-content>
    </div>
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

import { Component, Input, OnInit } from '@angular/core';
import { SharkColumn } from '../../table';
import { TableDataService } from '../../data.service';

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
      mat-tab-group {
        min-height: 250px
      }

      .table-wrapper {
        min-width: 55rem;
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

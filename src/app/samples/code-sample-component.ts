import { Component, Input } from '@angular/core';

@Component({
  selector: 'shark-table-code-sample',
  template: `
    <h1>{{ pageTitle }}</h1>
    <mat-tab-group>
      <mat-tab label="HTML" *ngIf="htmlSample">
        <div highlight-js-content=".highlight">
          <pre [innerHTML]="htmlSample" class="highlight"></pre>
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
export class CodeSampleComponent {

  @Input()
  pageTitle: string;

  @Input()
  htmlSample;

  @Input()
  tsSample;

  @Input()
  cssSample;

}

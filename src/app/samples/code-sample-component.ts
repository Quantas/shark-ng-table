import { Component, Input } from '@angular/core';

@Component({
  selector: 'shark-table-code-sample',
  template: `
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
  `,
  styles: [
    `
      mat-tab-group {
        height: 250px
      }
    `
  ]
})
export class CodeSampleComponent {

  @Input()
  htmlSample;

  @Input()
  tsSample;

  @Input()
  cssSample;

}

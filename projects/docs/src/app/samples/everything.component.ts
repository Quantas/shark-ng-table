import { Component, ViewChild, signal } from '@angular/core';
import { CodeSampleComponent } from './shared/code-sample.component';
import { SharkColumn, SharkColumnChangeEvent, SharkTableComponent } from 'shark-ng-table';
import { ChildRowRenderingComponent } from './shared/child-rows-rendering.component';
import { MakeComponent } from './custom-cell.component';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Most features enabled at once." pageTitle="Everything (except row links)" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table #sharkTable
         [data]="parent.testData"
         [columns]="tableColumns"
         [columnPicker]="true"
         [columnOrdering]="true"
         [columnFiltering]="true"
         [childRows]="true"
         [childComponent]="childComponent"
         (columnChange)="columnChange($event)"
      >
        <ng-template #headerLeft>
          Left content
        </ng-template>
        <ng-template #headerRight>
          <button type="button" (click)="exportData()">Export data</button>
        </ng-template>

        <ng-template #footerLeft>
          Left content
        </ng-template>
        <ng-template #footerRight>
          Right content
        </ng-template>
      </shark-table>
      <p role="status" class="output-status">{{ status() }}</p>
    </shark-table-code-sample>
  `
})
export class EverythingComponent {

  @ViewChild(SharkTableComponent, { static: true })
  sharkTable: SharkTableComponent;

  htmlSample = `
    <shark-table
      [data]="testData"
      [columns]="tableColumns"
      [columnPicker]="true"
      [columnOrdering]="true"
      [columnFiltering]="true"
      [childRows]="true"
      [childComponent]="childComponent"
    >
      <ng-template #headerLeft>
        Left content
      </ng-template>
      <ng-template #headerRight>
        <button type="button" (click)="exportData()">Export data</button>
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
    // Please see other samples for more detail.
  `;

  childComponent = ChildRowRenderingComponent;

  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year', hideHeaderFilter: true, disableOrdering: true, unsortable: true },
    { header: 'Make', property: 'make', component: MakeComponent },
    { header: 'Model', property: 'model' }
  ];

  readonly status = signal('');

  exportData(): void {
    const exported = this.sharkTable.exportCurrentData();
    this.status.set(`Exported ${exported.data.length} rows with ${exported.columns.length} columns.`);
  }

  columnChange(event: SharkColumnChangeEvent): void {
    this.status.set(`Visible columns: ${event.columns.filter(c => c.displayed).map(c => c.header).join(', ')}.`);
  }

}

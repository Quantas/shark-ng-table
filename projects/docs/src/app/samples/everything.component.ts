import { Component, ViewChild } from '@angular/core';
import { SharkColumn, SharkTableComponent } from '../table';
import { ChildRowRenderingComponent } from './shared/child-rows-rendering.component';
import { MakeComponent } from './custom-cell.component';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Everything (except row links)" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
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
          Left Side!
        </ng-template>
        <ng-template #headerRight>
          <button (click)="exportData()">Export Data (Check Console)</button>
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
        Left Side!
      </ng-template>
      <ng-template #headerRight>
        <button (click)="exportData()">Export Data (Check Console)</button>
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
    // Please see other samples for more detail.
  `;

  childComponent = ChildRowRenderingComponent;

  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year', hideHeaderFilter: true, disableOrdering: true, unsortable: true },
    { header: 'Make', property: 'make', component: MakeComponent },
    { header: 'Model', property: 'model' }
  ];

  exportData(): void {
    console.log(this.sharkTable.exportCurrentData());
  }

  columnChange(newColumns: SharkColumn[]): void {
    console.log(newColumns);
  }

}

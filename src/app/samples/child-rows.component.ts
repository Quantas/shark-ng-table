import { Component, OnInit } from '@angular/core';
import { TableDataService } from '../data.service';
import { SharkColumn } from '../table';
import { ChildRowRenderingComponent } from './child-rows-rendering.component';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Child Rows" [htmlSample]="htmlSample" [tsSample]="tsSample">
      <shark-table
        [data]="testData"
        [columns]="tableColumns"
        [columnFiltering]="true"
        [childRows]="true"
        [childComponent]="childComponent"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class ChildRowsComponent implements OnInit {

  htmlSample = `
    &lt;shark-table
        [data]="testData"
        [columns]="tableColumns"
        [columnFiltering]="true"
        [childRows]="true"
        [childComponent]="childComponent"
        [hideCaption]="true"
      &gt;&lt;/shark-table&gt;
  `;

  tsSample = `
    // 1. Create a SharkDynamicContents Component

    import { Component } from '@angular/core';
    import { SharkDynamicContents } from '../table';

    @Component({
      template: \`
        VIN: {{ data.vin }}
      \`
    })
    export class ChildRowRenderingComponent implements SharkDynamicContents {
      data: any;

      childOpen(value: boolean): void {
        console.log(value);
      }
    }

    // 2. Add Component to "entryComponents" and "declarations" in your NgModule
    // 3. Store a reference in your Component where you use &lt;shark-table&gt;
    childComponent = ChildRowRenderingComponent;

    // 4. Use "childComponent" as a prameter to your shark-table as seen in the HTML portion of the sample

  `;

  childComponent = ChildRowRenderingComponent;

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

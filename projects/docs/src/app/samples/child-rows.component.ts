import { Component } from '@angular/core';
import { SharkTableComponent } from 'shark-ng-table';
import { CodeSampleComponent } from './shared/code-sample.component';
import { ChildRowRenderingComponent } from './shared/child-rows-rendering.component';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Expandable detail rows rendered by your own component." pageTitle="Child Rows" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="parent.tableColumns"
        [columnFiltering]="true"
        [childRows]="true"
        [childComponent]="childComponent"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class ChildRowsComponent {

  htmlSample = `
    <shark-table
      [data]="testData"
      [columns]="tableColumns"
      [columnFiltering]="true"
      [childRows]="true"
      [childComponent]="childComponent"
      [hideCaption]="true"
    ></shark-table>
  `;

  tsSample = `
    // 1. Create a SharkDynamicContents Component

    import { Component } from '@angular/core';
    import { SharkDynamicContents } from 'shark-ng-table';

    @Component({
      template: \`
        VIN: {{ data.vin }}
      \`
    })
    export class ChildRowRenderingComponent implements SharkDynamicContents {
      data: any;

      childOpen(value: boolean): void {
        // Load more data here when the row opens, if needed.
      }
    }

    // 2. Standalone components need no registration.
    // 3. Store a reference in your Component where you use <shark-table&gt;
    childComponent = ChildRowRenderingComponent;

    // 4. Use "childComponent" as a prameter to your shark-table as seen in the HTML portion of the sample

  `;

  childComponent = ChildRowRenderingComponent;

}

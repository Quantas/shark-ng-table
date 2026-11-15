import { Component } from '@angular/core';
import { SharkColumn, SharkDynamicContents } from '../table';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Custom Cells" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="parent.testData"
        [columns]="tableColumns"
        [columnFiltering]="true"
        [hideCaption]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class CustomCellsComponent {

  htmlSample = `
    <shark-table
      [data]="testData"
      [columns]="tableColumns"
      [columnFiltering]="true"
      [hideCaption]="true"
    ></shark-table>
  `;

  tsSample = `
    // 1. Create a SharkDynamicContents Component

    @Component({
    template: \`
      &lt;span [ngClass]="data">{{ data }}&lt;/span>
    \`,
    styles: [
      \`
        .Subaru {
          color: darkblue;
        }

        .Honda {
          color: gray;
        }

        .Toyota {
          color: red;
        }
      \`
    ]
  })
  export class MakeComponent implements SharkDynamicContents {
    data: any;

    childOpen(value: boolean): void {
    }
  }

  // 2. Add Component to "entryComponents" and "declarations" in your NgModule
  // 3. Use in your column definition
  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make', component: MakeComponent },
    { header: 'Model', property: 'model' }
  ];
  `;

  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make', component: MakeComponent },
    { header: 'Model', property: 'model' }
  ];

}

@Component({
  template: `
    <span [ngClass]="data">{{ data }}</span>
  `,
  styles: [
    `
      .Subaru {
        color: darkblue;
      }

      .Honda {
        color: gray;
      }

      .Toyota {
        color: red;
      }
    `
  ]
})
export class MakeComponent implements SharkDynamicContents {
  data: any;

  childOpen(value: boolean): void {
  }
}

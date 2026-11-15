import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CodeSampleComponent } from './shared/code-sample.component';
import { SharkColumn, SharkDynamicContents, SharkTableComponent } from 'shark-ng-table';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Render a cell with your own component." pageTitle="Custom Cells" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
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
  imports: [NgClass],
    template: \`
      &lt;span [ngClass]="data">{{ data }}&lt;/span>
    \`,
    styles: [
      \`
        .Subaru {
          color: light-dark(#1f4e9c, #8cbcff);
        }

        .Honda {
          color: light-dark(#4a5a6a, #b8c4cf);
        }

        .Toyota {
          color: light-dark(#b3261e, #ff8a80);
        }
      \`
    ]
  })
  export class MakeComponent implements SharkDynamicContents {
    data: any;

    childOpen(value: boolean): void {
    }
  }

  // 2. Standalone components need no registration.
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
  imports: [NgClass],
  template: `
    <span [ngClass]="data">{{ data }}</span>
  `,
  styles: [
    `
      .Subaru {
        color: light-dark(#1f4e9c, #8cbcff);
      }

      .Honda {
        color: light-dark(#4a5a6a, #b8c4cf);
      }

      .Toyota {
        color: light-dark(#b3261e, #ff8a80);
      }
    `
  ]
})
export class MakeComponent implements SharkDynamicContents {
  data: any;

  childOpen(): void {
  }
}

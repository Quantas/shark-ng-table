import { Component } from '@angular/core';
import { SharkDynamicContents } from 'shark-ng-table';

@Component({
  template: `
    VIN: {{ data.vin }}
  `
})
export class ChildRowRenderingComponent implements SharkDynamicContents {
  data: any;

  childOpen(): void {
    // Load more data here when the row opens, if needed.
  }
}

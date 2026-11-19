import { Component, input } from '@angular/core';
import { SharkDynamicContents } from 'shark-ng-table';

@Component({
  template: `
    VIN: {{ data().vin }}
  `
})
export class ChildRowRenderingComponent implements SharkDynamicContents {
  readonly data = input.required<{ vin: string }>();

  childOpen(): void {
    // Load more data here when the row opens, if needed.
  }
}

import { Component } from '@angular/core';
import { SharkDynamicContents } from '../../table';

@Component({
  template: `
    VIN: {{ data.vin }}
  `
})
export class ChildRowRenderingComponent implements SharkDynamicContents {
  data: any;

  childOpen(value: boolean): void {
    console.log(value);
  }
}

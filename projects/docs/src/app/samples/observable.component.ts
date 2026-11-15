import { Component, inject } from '@angular/core';
import { CodeSampleComponent } from './shared/code-sample.component';
import { BehaviorSubject } from 'rxjs';
import { TableDataService } from '../data.service';
import { Page, SharkTableComponent } from 'shark-ng-table';

@Component({
  imports: [CodeSampleComponent, SharkTableComponent],
  template: `
    <shark-table-code-sample description="Feed the table from an Observable of a Page or an array." pageTitle="Observable Data" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="dataObservable"
        [columns]="parent.tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [hideCaption]="true"
      >
      </shark-table>
      <button type="button" (click)="refreshData()">Load data</button>
    </shark-table-code-sample>
  `
})
export class ObservableComponent {

  private dataSubject = new BehaviorSubject<Page>({});
  dataObservable = this.dataSubject.asObservable();

  htmlSample = `
    <shark-table
      [data]="dataObservable"
      [columns]="tableColumns"
      [filterable]="false"
      [localPaging]="false"
      [hideCaption]="true"
    ></shark-table>
    <button type="button" (click)="refreshData()">Load data</button>
  `;

  tsSample = `
    private dataSubject = new BehaviorSubject<Page>({});
    dataObservable = this.dataSubject.asObservable();

    tableColumns: SharkColumn[] = [
      { header: 'Year', property: 'year' },
      { header: 'Make', property: 'make' },
      { header: 'Model', property: 'model' }
    ];

    refreshData(): void {
      const newPage: Page = {
        content: /* Populate with array of data */,
        first: true,
        last: true,
        number: 0,
        totalPages: 1,
        numberOfElements: 29,
        size: 29
      };
      this.dataSubject.next(newPage);
    }
  `;

  private readonly tableDataService = inject(TableDataService);

  refreshData(): void {
    const newPage: Page = {
      content: this.tableDataService.getTestData(),
      first: true,
      last: true,
      number: 0,
      totalPages: 1,
      numberOfElements: 29,
      size: 29
    };
    this.dataSubject.next(newPage);
  }

}

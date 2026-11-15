import { provideRouter } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn } from '../public-api';
import { Page, Sort } from '../lib/page';

describe('SharkTableComponentPageInit', () => {

  const expectedData = [
    {year: '2015', make: 'Subaru', model: 'WRX'},
    {year: '2015', make: 'Honda', model: 'Accord'},
    {year: '2016', make: 'Subaru', model: 'WRX'},
    {year: '2016', make: 'Honda', model: 'Accord'},
    {year: '2017', make: 'Subaru', model: 'WRX'},
    {year: '2017', make: 'Honda', model: 'Accord'}
  ];

  it('should sort ASC col1 and DESC col2 on start', async () => {

    await TestBed.configureTestingModule({
      imports: [TableTestNoPagingComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture: ComponentFixture<TableTestNoPagingComponent> = TestBed.createComponent(TableTestNoPagingComponent);
    const component: TableTestNoPagingComponent = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    expect(component.sharkTable.page.number).toEqual(0);
    expect(component.sharkTable.page.content).toEqual(expectedData);
  });

});

@Component({
  imports: [SharkTableModule],
  template: `
        <shark-table #sharkTable
             [data]="testPage"
             [columns]="tableColumns"
             [localPaging]="false"
        ></shark-table>
    `
})
export class TableTestNoPagingComponent {

  initialSort = '';

  testData = [
    {year: '2017', make: 'Honda', model: 'Accord'},
    {year: '2016', make: 'Honda', model: 'Accord'},
    {year: '2015', make: 'Honda', model: 'Accord'},
    {year: '2017', make: 'Subaru', model: 'WRX'},
    {year: '2016', make: 'Subaru', model: 'WRX'},
    {year: '2015', make: 'Subaru', model: 'WRX'}
  ];

  testSorts: Sort[] = [
    { property: 'year', ascending: true, descending: false, direction: 'ASC' },
    { property: 'make', ascending: false, descending: true, direction: 'DESC' },
    { property: 'model', ascending: false, descending: false, direction: '' }
  ];

  testPage: Page = {
    number: 0,
    totalElements: 10,
    numberOfElements: 10,
    first: true,
    last: false,
    size: 10,
    sorts: this.testSorts,
    content: this.testData
  };

  tableColumns: SharkColumn[] = [
    { header: 'Col 1', property: 'year'},
    { header: 'Col 2', property: 'make'},
    { header: 'Col 3', property: 'model'}
  ];

  @ViewChild('sharkTable', {static: false})
  sharkTable: SharkTableComponent;
}


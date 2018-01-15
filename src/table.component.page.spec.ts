import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharkTableComponent } from './table.component';
import { SharkTableModule } from './table.module';
import { Component, ViewChild } from '@angular/core';
import { SharkColumn } from './column';
import { Page, Sort } from './page';

describe('SharkTableComponentPageInit', () => {

  let expectedData = [
    {year: '2015', make: 'Subaru', model: 'WRX'},
    {year: '2015', make: 'Honda', model: 'Accord'},
    {year: '2016', make: 'Subaru', model: 'WRX'},
    {year: '2016', make: 'Honda', model: 'Accord'},
    {year: '2017', make: 'Subaru', model: 'WRX'},
    {year: '2017', make: 'Honda', model: 'Accord'}
  ];

  it('should sort ASC col1 and DESC col2 on start', async(() => {
    let fixture: ComponentFixture<TableTestNoPagingComponent>;
    let component: TableTestNoPagingComponent;

    TestBed.configureTestingModule({
      imports: [
        SharkTableModule,
        RouterTestingModule
      ],
      declarations: [
        TableTestNoPagingComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestNoPagingComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    expect(component.sharkTable.page.number).toEqual(0);
    expect(component.sharkTable.page.content).toEqual(expectedData);
  }));

});

@Component({
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

  @ViewChild('sharkTable')
  sharkTable: SharkTableComponent;

}

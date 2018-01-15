import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn } from '../src';

describe('SharkTableComponentNoPaging', () => {

  let fixture: ComponentFixture<TableTestNoPagingComponent>;
  let component: TableTestNoPagingComponent;

  beforeEach(async(() => {
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
  }));

  it('should filter results down to 1', async(() => {
    expect(component.sharkTable.page.number).toEqual(0);

    component.sharkTable.filterForm.setValue({filter: '10'});
    fixture.detectChanges();

    expect(component.sharkTable.page.number).toEqual(0);
    expect(component.sharkTable.page.content).toEqual([{col1: '10', col2: 'j', col3: 'c' }]);
  }));

  it('should filter the same', async(() => {

    const testPage = [
      {col1: '1', col2: 'a', col3: 'c' },
      {col1: '2', col2: 'b', col3: 'c' },
      {col1: '3', col2: 'c', col3: 'c' },
      {col1: '4', col2: 'd', col3: 'c' },
      {col1: '5', col2: 'e', col3: 'c' },
      {col1: '6', col2: 'f', col3: 'c' },
      {col1: '7', col2: 'g', col3: 'c' },
      {col1: '8', col2: 'h', col3: 'c' },
      {col1: '9', col2: 'i', col3: 'c' },
      {col1: '10', col2: 'j', col3: 'c' }
    ];

    expect(component.sharkTable.page.number).toEqual(0);

    component.sharkTable.filterForm.setValue({filter: 'c'});
    fixture.detectChanges();

    expect(component.sharkTable.page.number).toEqual(0);
    expect(component.sharkTable.page.content).toEqual(testPage);
  }));

});

@Component({
  template: `
        <shark-table #sharkTable
             [data]='testData'
             [columns]='tableColumns'
             [initialSort]="'col1'"
             [localPaging]="false"
        ></shark-table>
    `
})
export class TableTestNoPagingComponent {

  testData = [
    {col1: '1', col2: 'a', col3: 'c' },
    {col1: '2', col2: 'b', col3: 'c' },
    {col1: '3', col2: 'c', col3: 'c' },
    {col1: '4', col2: 'd', col3: 'c' },
    {col1: '5', col2: 'e', col3: 'c' },
    {col1: '6', col2: 'f', col3: 'c' },
    {col1: '7', col2: 'g', col3: 'c' },
    {col1: '8', col2: 'h', col3: 'c' },
    {col1: '9', col2: 'i', col3: 'c' },
    {col1: '10', col2: 'j', col3: 'c' }
  ];

  tableColumns: SharkColumn[] = [
    { header: 'Col 1', property: 'col1'},
    { header: 'Col 2', property: 'col2'},
    { header: 'Col 3', property: 'col3'}
  ];

  @ViewChild('sharkTable')
  sharkTable: SharkTableComponent;

}

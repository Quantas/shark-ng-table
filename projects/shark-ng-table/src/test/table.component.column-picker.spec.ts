import { provideRouter } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn } from '../public-api';

describe('SharkTableComponentColumnPicker', () => {

  let fixture: ComponentFixture<TableTestColumnPickerComponent>;
  let component: TableTestColumnPickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTestColumnPickerComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestColumnPickerComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it('should disable the middle column', async () => {
    expect(component.sharkTable.page.number).toEqual(0);
    fixture.detectChanges();

    component.sharkTable.headerInfoComponent.columns[1].displayed = false;
    component.sharkTable.headerInfoComponent.fireColumnChange();
    fixture.detectChanges();

    expect(component.sharkTable.currentColumns).toEqual([
      { header: 'Col 1', property: 'col1', displayed: true, sortType: 1},
      { header: 'Col 3', property: 'col3', displayed: true}
    ]);

  });

});

@Component({
  imports: [SharkTableModule],
  template: `
        <shark-table #sharkTable
             [data]='testData'
             [columns]='tableColumns'
             [columnPicker]="true"
             [initialSort]="'col1'"
             [localPaging]="false"
        ></shark-table>
    `
})
export class TableTestColumnPickerComponent {

  testData = [
    {col1: '1', col2: 'a', col3: 'c' },
    {col1: '2', col2: 'b', col3: 'c' }
  ];

  tableColumns: SharkColumn[] = [
    { header: 'Col 1', property: 'col1'},
    { header: 'Col 2', property: 'col2'},
    { header: 'Col 3', property: 'col3'}
  ];

  @ViewChild('sharkTable', {static: false})
  sharkTable: SharkTableComponent;
}


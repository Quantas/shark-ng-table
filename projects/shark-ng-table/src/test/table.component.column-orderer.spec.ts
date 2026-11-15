import { provideRouter } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn } from '../public-api';

describe('SharkTableComponentColumnOrderer', () => {

  let fixture: ComponentFixture<TableTestColumnOrdererComponent>;
  let component: TableTestColumnOrdererComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTestColumnOrdererComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestColumnOrdererComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it('should move the columns', async () => {
    component.sharkTable.headerComponent.moveColumnForward(0, component.sharkTable.columns[0]);
    fixture.detectChanges();

    expect(component.sharkTable.columns).toEqual([
      { header: 'Col 2', property: 'col2', displayed: false},
      { header: 'Col 3', property: 'col3', displayed: true},
      { header: 'Col 1', property: 'col1', displayed: true}
    ]);

    component.sharkTable.headerComponent.moveColumnBackward(2, component.sharkTable.columns[2]);
    fixture.detectChanges();

    expect(component.sharkTable.columns).toEqual([
      { header: 'Col 2', property: 'col2', displayed: false},
      { header: 'Col 1', property: 'col1', displayed: true},
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
             [columnOrdering]="true"
             [localPaging]="false"
        ></shark-table>
    `
})
export class TableTestColumnOrdererComponent {

  testData = [
    {col1: '1', col2: 'a', col3: 'c' },
    {col1: '2', col2: 'b', col3: 'c' }
  ];

  tableColumns: SharkColumn[] = [
    { header: 'Col 1', property: 'col1'},
    { header: 'Col 2', property: 'col2', displayed: false},
    { header: 'Col 3', property: 'col3'}
  ];

  @ViewChild('sharkTable', {static: false})
  sharkTable: SharkTableComponent;
}


import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NgModule, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn } from '../table';

describe('SharkTableComponentColumnPicker', () => {

  let fixture: ComponentFixture<TableTestColumnPickerComponent>;
  let component: TableTestColumnPickerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestColumnPickerComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should disable the middle column', async(() => {
    expect(component.sharkTable.page.number).toEqual(0);
    fixture.detectChanges();

    component.sharkTable.headerInfoComponent.columns[1].displayed = false;
    component.sharkTable.headerInfoComponent.fireColumnChange();
    fixture.detectChanges();

    expect(component.sharkTable.currentColumns).toEqual([
      { header: 'Col 1', property: 'col1', displayed: true, sortType: 1},
      { header: 'Col 3', property: 'col3', displayed: true}
    ]);

  }));

});

@Component({
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

  @ViewChild('sharkTable')
  sharkTable: SharkTableComponent;
}

@NgModule({
  imports: [
    SharkTableModule,
    RouterTestingModule
  ],
  declarations: [
    TableTestColumnPickerComponent
  ]
})
export class TestModule {}

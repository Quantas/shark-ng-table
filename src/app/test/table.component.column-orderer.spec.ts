import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NgModule, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn } from '../table';

describe('SharkTableComponentColumnOrderer', () => {

  let fixture: ComponentFixture<TableTestColumnOrdererComponent>;
  let component: TableTestColumnOrdererComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestColumnOrdererComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should move the columns', async(() => {
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

  }));

});

@Component({
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

  @ViewChild('sharkTable')
  sharkTable: SharkTableComponent;
}

@NgModule({
  imports: [
    SharkTableModule,
    RouterTestingModule
  ],
  declarations: [
    TableTestColumnOrdererComponent
  ]
})
export class TestModule {}

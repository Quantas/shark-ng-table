import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn } from '../src';

describe('SharkTableComponentColumnPicker', () => {

  let fixture: ComponentFixture<TableTestColumnPickerComponent>;
  let component: TableTestColumnPickerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharkTableModule,
        RouterTestingModule
      ],
      declarations: [
        TableTestColumnPickerComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestColumnPickerComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should disable the middle column', async(() => {
    expect(component.sharkTable.page.number).toEqual(0);
    fixture.detectChanges();

    component.sharkTable.headerComponent.columnPickerComponent.columns[1].displayed = false;
    component.sharkTable.headerComponent.columnPickerComponent.emitSelected();
    fixture.detectChanges();

    expect(component.sharkTable.currentColumns).toEqual([
      { header: 'Col 1', property: 'col1', displayed: true, sortType: 1},
      { header: 'Col 3', property: 'col3', displayed: true}
    ]);

  }));

  it ('should open the dropdown', async(() => {
    component.sharkTable.headerComponent.columnPickerComponent.showDropDown = true;
    fixture.detectChanges();

    const eventTarget: EventTarget = {
      addEventListener: () => {},
      removeEventListener: () =>  {},
      dispatchEvent: () => true
    };

    component.sharkTable.headerComponent.columnPickerComponent.closeDropDown({
      bubbles: true,
      target: eventTarget,
      cancelable: false,
      cancelBubble: false,
      currentTarget: undefined,
      defaultPrevented: false,
      eventPhase: undefined,
      isTrusted: true,
      returnValue: undefined,
      srcElement: undefined,
      timeStamp: 123123123123,
      type: undefined,
      scoped: false,
      initEvent: undefined,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {},
      deepPath: undefined,
      AT_TARGET: 1,
      BUBBLING_PHASE: 1,
      CAPTURING_PHASE: 1
    });

    fixture.detectChanges();

    expect(component.sharkTable.headerComponent.columnPickerComponent.showDropDown).toEqual(false);
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

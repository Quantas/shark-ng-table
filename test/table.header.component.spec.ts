import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn, SharkSortType } from '../src';
import { By } from '@angular/platform-browser';

describe('SharkTableComponent', () => {

  let fixture: ComponentFixture<TableHeaderTestComponent>;
  let component: TableHeaderTestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharkTableModule,
        RouterTestingModule
      ],
      declarations: [
        TableHeaderTestComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableHeaderTestComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should create the TableHeaderTestComponent', async(() => {
    expect(component).toBeTruthy();
    expect(component.sharkTable.page.totalElements).toEqual(10);
  }));

  it('should call focus', async(() => {

    const headerComponent = component.sharkTable.headerComponent;

    spyOn(headerComponent, 'headerFocus');

    const buttonDe = fixture.debugElement.query(By.css('button[name="Col 1"]'));
    const buttonEl = buttonDe.nativeElement;

    buttonEl.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(component.sharkTable.headerComponent.headerFocus).toHaveBeenCalled();
  }));

  it('should call blur', async(() => {

    const headerComponent = component.sharkTable.headerComponent;

    spyOn(headerComponent, 'headerBlur');

    const buttonDe = fixture.debugElement.query(By.css('button[name="Col 1"]'));
    const buttonEl = buttonDe.nativeElement;

    buttonEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.sharkTable.headerComponent.headerBlur).toHaveBeenCalled();
  }));

});

@Component({
  template: `
        <shark-table #sharkTable
             [data]='testData'
             [columns]='tableColumns'
             [initialSort]="'col1'"
             [localPagingSize]="5"
             [localPagingOptions]="[ 5, 10 ]"
        ></shark-table>
    `
})
export class TableHeaderTestComponent {

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

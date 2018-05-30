import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn, SharkSortType } from '../src';

describe('SharkTableComponent', () => {

  let fixture: ComponentFixture<TableTestComponent>;
  let component: TableTestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharkTableModule,
        RouterTestingModule
      ],
      declarations: [
        TableTestComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should sort custom array ASC', async(() => {
    const testPage = [
      { col1: [ 2016, 7, 27, 7, 12 ] },
      { col1: [ 2016, 7, 27, 19, 12 ] }
    ];

    // NONE -> ASC
    component.sharkTable.changeSort('col1', SharkSortType.NONE);
    fixture.detectChanges();
    expect(component.sharkTable.page.content).toEqual(testPage);

    // ASC -> DESC
    component.sharkTable.changeSort('col1', SharkSortType.ASC);
    fixture.detectChanges();
    expect(component.sharkTable.page.content).toEqual(testPage.reverse());
  }));
});

@Component({
  template: `
        <shark-table #sharkTable
             [data]='testData'
             [columns]='tableColumns'
             [localPagingOptions]="[ 5, 10 ]"
        ></shark-table>
    `
})
export class TableTestComponent {

  testData = [
    { col1: [ 2016, 7, 27, 19, 12 ] },
    { col1: [ 2016, 7, 27, 7, 12 ] }
  ];

  tableColumns: SharkColumn[] = [
    {
      header: 'Col 1',
      property: 'col1',
      ascendingSortFunction: (left, right) => {
        return new Date(left[0], left[1], left[2], left[3], left[4]).getTime() - new Date(right[0], right[1], right[2], right[3], right[4]).getTime();
      }
    }
  ];

  @ViewChild('sharkTable')
  sharkTable: SharkTableComponent;

}

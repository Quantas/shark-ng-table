import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NgModule, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn, SharkSortType } from '../table';

describe('SharkTableComponent', () => {

  let fixture: ComponentFixture<TableTestComponent>;
  let component: TableTestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should sort', async(() => {
    const testData = [
      { col1: [ 2018, 6, 1, 14, 4 ] },
      { col1: [ 2018, 5, 31, 15, 51 ] },
      { col1: [ 2018, 5, 31, 15, 52 ] },
      { col1: [ 2018, 6, 4, 12, 0 ] },
      { col1: [ 2018, 6, 5, 13, 29 ] }
    ];

    testData.sort((left, right) => {
      const leftCol = left['col1'];
      const rightCol = right['col1'];

      const leftDate = new Date(leftCol[0], leftCol[1] - 1, leftCol[2], leftCol[3], leftCol[4]);
      const rightDate = new Date(rightCol[0], rightCol[1] - 1, rightCol[2], rightCol[3], rightCol[4]);

      return leftDate.getTime() - rightDate.getTime();
    });

    expect(testData).toEqual([
      { col1: [ 2018, 5, 31, 15, 51 ] },
      { col1: [ 2018, 5, 31, 15, 52 ] },
      { col1: [ 2018, 6, 1, 14, 4 ] },
      { col1: [ 2018, 6, 4, 12, 0 ] },
      { col1: [ 2018, 6, 5, 13, 29 ] }
    ]);

  }));

  it('should sort custom array ASC', async(() => {
    const testPage = [
      { col1: [ 2018, 5, 31, 15, 51 ] },
      { col1: [ 2018, 5, 31, 15, 52 ] },
      { col1: [ 2018, 6, 1, 14, 4 ] },
      { col1: [ 2018, 6, 4, 12, 0 ] },
      { col1: [ 2018, 6, 5, 13, 29 ] }
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
    { col1: [ 2018, 6, 1, 14, 4 ] },
    { col1: [ 2018, 5, 31, 15, 51 ] },
    { col1: [ 2018, 5, 31, 15, 52 ] },
    { col1: [ 2018, 6, 4, 12, 0 ] },
    { col1: [ 2018, 6, 5, 13, 29 ] }
  ];

  tableColumns: SharkColumn[] = [
    {
      header: 'Col 1',
      property: 'col1',
      ascendingSortFunction: (left, right) => {
        return new Date(left[0], left[1] - 1, left[2], left[3], left[4]).getTime() - new Date(right[0], right[1] - 1, right[2], right[3], right[4]).getTime();
      }
    }
  ];

  @ViewChild('sharkTable', {static: false})
  sharkTable: SharkTableComponent;
}

@NgModule({
  imports: [
    SharkTableModule,
    RouterTestingModule
  ],
  declarations: [
    TableTestComponent
  ]
})
export class TestModule {}

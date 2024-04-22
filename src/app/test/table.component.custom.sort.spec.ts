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

  it('should sort custom ASC', async(() => {
    const testPage = [
      { col3: 'Wed, 27 July 2016 07:45:00 CDT' },
      { col3: 'Wed, 27 July 2016 08:15:00 CDT' },
      { col3: 'Wed, 27 July 2016 08:30:00 CDT' },
      { col3: 'Wed, 28 July 2016 07:45:00 CDT' },
      { col3: 'Wed, 28 July 2016 08:45:00 CDT' }
    ];

    // NONE -> ASC
    component.sharkTable.changeSort('col3', SharkSortType.NONE);
    fixture.detectChanges();
    expect(component.sharkTable.page.content).toEqual(testPage);

    // ASC -> DESC
    component.sharkTable.changeSort('col3', SharkSortType.ASC);
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
    { col3: 'Wed, 27 July 2016 08:30:00 CDT' },
    { col3: 'Wed, 27 July 2016 07:45:00 CDT' },
    { col3: 'Wed, 27 July 2016 08:15:00 CDT' },
    { col3: 'Wed, 28 July 2016 08:45:00 CDT' },
    { col3: 'Wed, 28 July 2016 07:45:00 CDT' }
  ];

  tableColumns: SharkColumn[] = [
    {
      header: 'Col 3',
      property: 'col3',
      ascendingSortFunction: (left, right) => {
        return new Date(left).getTime() - new Date(right).getTime();
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

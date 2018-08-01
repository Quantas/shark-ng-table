import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NgModule, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn, SharkSortType } from '../table';
import { By } from '@angular/platform-browser';

describe('SharkTableComponent', () => {

    let fixture: ComponentFixture<TableTestComponent>;
    let component: TableTestComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ TestModule ]
        }).compileComponents();

        fixture = TestBed.createComponent(TableTestComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    }));

    it('should create the TableTestComponent', async(() => {
        expect(component).toBeTruthy();
        expect(component.sharkTable.page.totalElements).toEqual(10);
    }));

    it('should navigate to the Second Page', async(() => {
        expect(component.sharkTable.page.number).toEqual(0);

        component.sharkTable.changePage(1);
        fixture.detectChanges();

        expect(component.sharkTable.page.number).toEqual(1);
    }));

    it('should navigate to the Second Page via the pagination component', async(() => {
        expect(component.sharkTable.page.number).toEqual(0);

        component.sharkTable.footerComponent.paginationComponent.changePage(1);
        fixture.detectChanges();

        expect(component.sharkTable.page.number).toEqual(1);
    }));

    it('should filter results down to 1', async(() => {
        expect(component.sharkTable.page.number).toEqual(0);

        const inputDe = fixture.debugElement.query(By.css('input[name="filter"]'));
        const inputEl = inputDe.nativeElement;

        inputEl.value = '10';
        inputEl.dispatchEvent(new Event('input'));
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
            {col1: '5', col2: 'e', col3: 'c' }
        ];

        expect(component.sharkTable.page.number).toEqual(0);

        const inputDe = fixture.debugElement.query(By.css('input[name="filter"]'));
        const inputEl = inputDe.nativeElement;

        inputEl.value = 'c';
        inputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.sharkTable.page.number).toEqual(0);
        expect(component.sharkTable.page.content).toEqual(testPage);
    }));

    it('should change sorts', async(() => {
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

        component.sharkTable.changeSort('col1', SharkSortType.NONE);
        fixture.detectChanges();
        expect(component.sharkTable.page.content).toEqual(testPage.slice(0, 5));

        component.sharkTable.changeSort('col1', SharkSortType.ASC);
        fixture.detectChanges();
        expect(component.sharkTable.page.content).toEqual(testPage.reverse().slice(0, 5));

        component.sharkTable.changeSort('col1', SharkSortType.DESC);
        fixture.detectChanges();
        expect(component.sharkTable.page.content).toEqual(testPage.slice(0, 5));
    }));

    it('should sort ASC', async(() => {
        const testPage = [
            {col1: '1', col2: 'a', col3: 'c' },
            {col1: '2', col2: 'b', col3: 'c' },
            {col1: '3', col2: 'c', col3: 'c' },
            {col1: '4', col2: 'd', col3: 'c' },
            {col1: '5', col2: 'e', col3: 'c' }
        ];

        // NONE -> ASC
        component.sharkTable.changeSort('col1', SharkSortType.NONE);
        fixture.detectChanges();

        expect(component.sharkTable.page.content).toEqual(testPage);
    }));

    it('should sort DESC', async(() => {
        const testPage = [
            {col1: '6', col2: 'f', col3: 'c' },
            {col1: '7', col2: 'g', col3: 'c' },
            {col1: '8', col2: 'h', col3: 'c' },
            {col1: '9', col2: 'i', col3: 'c' },
            {col1: '10', col2: 'j', col3: 'c' }
        ];

        // ASC -> DESC
        component.sharkTable.changeSort('col1', SharkSortType.ASC);
        fixture.detectChanges();
        expect(component.sharkTable.page.content).toEqual(testPage.slice().reverse());

        component.sharkTable.changeSort('col1', SharkSortType.DESC);
        component.sharkTable.changeSort('col2', SharkSortType.ASC);
        fixture.detectChanges();
        expect(component.sharkTable.page.content).toEqual(testPage.reverse());
    }));

    it('should sort NONE', async(() => {
        const testPage = [
            {col1: '1', col2: 'a', col3: 'c' },
            {col1: '2', col2: 'b', col3: 'c' },
            {col1: '3', col2: 'c', col3: 'c' },
            {col1: '4', col2: 'd', col3: 'c' },
            {col1: '5', col2: 'e', col3: 'c' }
        ];

        // DESC -> NONE
        component.sharkTable.changeSort('col1', SharkSortType.DESC);
        fixture.detectChanges();
        expect(component.sharkTable.page.content).toEqual(testPage);

        component.sharkTable.changeSort('col2', SharkSortType.DESC);
        fixture.detectChanges();
        expect(component.sharkTable.page.content).toEqual(testPage);
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
export class TableTestComponent {

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

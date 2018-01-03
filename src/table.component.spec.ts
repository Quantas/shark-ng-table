import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharkTableComponent } from './table.component';
import { SharkTableModule } from './table.module';
import {Component, ViewChild} from '@angular/core';
import {SharkColumn} from './column';

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

    it('should create the TableTestComponent', async(() => {
        expect(component).toBeTruthy();
        expect(component.sharkTable.page.totalElements).toEqual(10);
    }));

    it('should  Navigate to the Second Page', async(() => {
        expect(component.sharkTable.page.number).toEqual(0);

        component.sharkTable.changePage(1);
        fixture.detectChanges();

        expect(component.sharkTable.page.number).toEqual(1);
    }));

});

@Component({
    template: `
        <shark-table #sharkTable
             [data]='testData'
             [localFilter]='true'
             [columns]='tableColumns'
             [localPaging]='true'
             [localPagingSize]='50'
        ></shark-table>
    `
})
export class TableTestComponent {

    testData = [
        {col1: '1', col2: 'b', col3: 'c' },
        {col1: '2', col2: 'b', col3: 'c' },
        {col1: '3', col2: 'b', col3: 'c' },
        {col1: '4', col2: 'b', col3: 'c' },
        {col1: '5', col2: 'b', col3: 'c' },
        {col1: '6', col2: 'b', col3: 'c' },
        {col1: '7', col2: 'b', col3: 'c' },
        {col1: '8', col2: 'b', col3: 'c' },
        {col1: '9', col2: 'b', col3: 'c' },
        {col1: '10', col2: 'b', col3: 'c' }
    ];

    tableColumns: SharkColumn[] = [
        { header: 'Col 1', property: 'col1'},
        { header: 'Col 2', property: 'col2'},
        { header: 'Col 3', property: 'col3'}
    ];

    @ViewChild('sharkTable')
    sharkTable: SharkTableComponent;

}
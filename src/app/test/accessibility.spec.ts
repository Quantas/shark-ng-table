import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NgModule, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkTableModule, SharkColumn } from '../table';

import { AxeResults, run } from 'axe-core';

describe('SharkTableAccessibilityComponent', () => {

    let fixture: ComponentFixture<TableTestAccessibilityComponent>;
    let component: TableTestAccessibilityComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
              TestModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TableTestAccessibilityComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    }));

    it('should create the TableTestAccessibilityComponent', async(() => {
        expect(component).toBeTruthy();
        expect(component.sharkTable.page.totalElements).toEqual(10);
    }));

    it('should have no accessibility violations', async(() => {
      run(fixture.nativeElement, (error: Error, results: AxeResults) => {
        console.log('Accessibility Violations: ', results.violations);
        expect(error).toBe(null);
        expect(results.violations.length).toBe(0);
      });
    }));
});

@Component({
    template: `
        <shark-table #sharkTable
             [data]='testData'
             [columns]='tableColumns'
             [columnFiltering]="true"
             [initialSort]="'col1'"
             [localPagingSize]="5"
             [localPagingOptions]="[ 5, 10 ]"
        ></shark-table>
    `
})
export class TableTestAccessibilityComponent {

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
    TableTestAccessibilityComponent
  ]
})
export class TestModule {}

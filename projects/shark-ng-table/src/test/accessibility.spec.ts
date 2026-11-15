import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { SharkTableComponent, SharkColumn } from '../public-api';

import axe from 'axe-core';

@Component({
  template: `child for {{ data.col1 }}`
})
class ChildRowComponent {
  data: any;
  childOpen(): void {}
}

@Component({
  imports: [SharkTableComponent],
  template: `
    <main>
      <shark-table #sharkTable
           [data]="testData"
           [columns]="tableColumns"
           [columnFiltering]="columnFiltering"
           [columnPicker]="columnPicker"
           [columnOrdering]="columnOrdering"
           [childRows]="childRows"
           [childComponent]="childComponent"
           [linkTarget]="linkTarget"
           [linkKey]="linkKey"
           [initialSort]="'col1'"
           [localPagingSize]="5"
           [localPagingOptions]="[ 5, 10 ]"
      ></shark-table>
    </main>
  `
})
class TableTestAccessibilityComponent {

  testData = Array.from({ length: 12 }, (_x, i) => ({ col1: String(i + 1), col2: String.fromCharCode(97 + i), col3: 'c' }));

  tableColumns: SharkColumn[] = [
    { header: 'Col 1', property: 'col1'},
    { header: 'Col 2', property: 'col2'},
    { header: 'Col 3', property: 'col3'}
  ];

  columnFiltering = false;
  columnPicker = false;
  columnOrdering = false;
  childRows = false;
  childComponent = ChildRowComponent;
  linkTarget: string | undefined;
  linkKey: string | undefined;

  @ViewChild('sharkTable')
  sharkTable: SharkTableComponent;
}

describe('SharkTable accessibility (axe-core)', () => {

  async function violationsFor(setup: Partial<TableTestAccessibilityComponent>) {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(TableTestAccessibilityComponent);
    Object.assign(fixture.componentInstance, setup);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.sharkTable.page.totalElements).toEqual(12);

    const results = await axe.run(fixture.nativeElement, {
      rules: {
        // jsdom has no layout or canvas, so contrast cannot be computed here.
        'color-contrast': { enabled: false }
      }
    });

    return results.violations.map(v => `${v.id}: ${v.help} (${v.nodes.map(n => n.target.join(' ')).join(', ')})`);
  }

  it('has no violations with the default options', async () => {
    expect(await violationsFor({})).toEqual([]);
  });

  it('has no violations with column filtering', async () => {
    expect(await violationsFor({ columnFiltering: true })).toEqual([]);
  });

  it('has no violations with the column picker and column ordering', async () => {
    expect(await violationsFor({ columnPicker: true, columnOrdering: true })).toEqual([]);
  });

  it('has no violations with child rows', async () => {
    expect(await violationsFor({ childRows: true })).toEqual([]);
  });

  it('has no violations with linked rows', async () => {
    expect(await violationsFor({ linkTarget: '/detail', linkKey: 'col1' })).toEqual([]);
  });
});

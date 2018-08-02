import { async } from '@angular/core/testing';
import { SharkTablePaginationComponent, SharkTableUtils } from '../table';
import { ElementRef } from '@angular/core';

describe('SharkTableUtils', () => {

  it('should have 2 pages, first page', async(() => {

    const paginationComponent = new SharkTablePaginationComponent(new MockElementRef());

    paginationComponent.page = {
      number: 0,
      totalPages: 2
    };

    paginationComponent.ngOnChanges({
      page: {
        previousValue: {},
        currentValue: {},
        firstChange: true,
        isFirstChange() { return true; }
      }
    });

    expect(paginationComponent.pageCount)
      .toEqual([0, 1]);

    expect(paginationComponent.first).toEqual(true);

    // test change not page
    paginationComponent.ngOnChanges({});

    expect(paginationComponent.pageCount)
      .toEqual([0, 1]);

    expect(paginationComponent.first).toEqual(true);

  }));

  it('should have 2 pages, last page', async(() => {

    const paginationComponent = new SharkTablePaginationComponent(new MockElementRef());

    paginationComponent.page = {
      number: 1,
      totalPages: 2
    };

    paginationComponent.ngOnChanges({
      page: {
        previousValue: {},
        currentValue: {},
        firstChange: true,
        isFirstChange() { return true; }
      }
    });

    expect(paginationComponent.displayedPages)
      .toEqual([0, 1]);

    expect(paginationComponent.last).toEqual(true);
  }));

  it('should have 5 pages, first page', async(() => {
    const paginationComponent = new SharkTablePaginationComponent(new MockElementRef());

    paginationComponent.page = {
      number: 0,
      totalPages: 5
    };

    paginationComponent.ngOnChanges({
      page: {
        previousValue: {},
        currentValue: {},
        firstChange: true,
        isFirstChange() { return true; }
      }
    });

    expect(paginationComponent.displayedPages)
      .toEqual([0, 1, 2]);

    expect(paginationComponent.first).toEqual(true);
  }));

  it('should have 5 pages, middle page', async(() => {
    const paginationComponent = new SharkTablePaginationComponent(new MockElementRef());

    paginationComponent.page = {
      number: 3,
      totalPages: 5
    };

    paginationComponent.ngOnChanges({
      page: {
        previousValue: {},
        currentValue: {},
        firstChange: true,
        isFirstChange() { return true; }
      }
    });

    expect(paginationComponent.displayedPages)
      .toEqual([2, 3, 4]);

    expect(paginationComponent.first).toEqual(false);
    expect(paginationComponent.last).toEqual(false);
  }));

  it('should have 5 pages, last page', async(() => {
    const paginationComponent = new SharkTablePaginationComponent(new MockElementRef());

    paginationComponent.page = {
      number: 4,
      totalPages: 5
    };

    paginationComponent.ngOnChanges({
      page: {
        previousValue: {},
        currentValue: {},
        firstChange: true,
        isFirstChange() { return true; }
      }
    });

    expect(paginationComponent.displayedPages)
      .toEqual([2, 3, 4]);

    expect(paginationComponent.last).toEqual(true);
  }));

});

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

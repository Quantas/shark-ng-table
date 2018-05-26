import { Page, SharkTableUtils } from '../src';
import { SharkTableFooterComponent } from '../src/table.footer.component';

describe('SharkTableFooterComponent', () => {

  it('should show proper footer page 2', () => {
    const page: Page = {
      first: false,
      last: true,
      number: 1,
      numberOfElements: 17,
      size: 20,
      totalElements: 37,
      totalPages: 2
    };

    const comp = new SharkTableFooterComponent(new SharkTableUtils());
    comp.page = page;
    comp.columns = [];
    comp.localPagingSize = 20;
    comp.localPaging = false;
    comp.localPagingOptions = [ 10, 20, 100 ];
    comp.ngOnChanges({});

    expect(comp.start).toBe(21);
    expect(comp.end).toBe(37);
    expect(comp.total).toBe(37);

  });

  it('should show proper footer page 1', () => {
    const page: Page = {
      first: true,
      last: false,
      number: 0,
      numberOfElements: 20,
      size: 20,
      totalElements: 37,
      totalPages: 2
    };

    const comp = new SharkTableFooterComponent(new SharkTableUtils());
    comp.page = page;
    comp.columns = [];
    comp.localPagingSize = 20;
    comp.localPaging = false;
    comp.localPagingOptions = [ 10, 20, 100 ];
    comp.ngOnChanges({});

    expect(comp.start).toBe(1);
    expect(comp.end).toBe(20);
    expect(comp.total).toBe(37);
  });

  it('should show proper footer page 2 - no size', () => {
    const page: Page = {
      first: false,
      last: true,
      number: 1,
      numberOfElements: 20,
      totalElements: 37,
      totalPages: 2
    };

    const comp = new SharkTableFooterComponent(new SharkTableUtils());
    comp.page = page;
    comp.columns = [];
    comp.localPagingSize = 20;
    comp.localPaging = false;
    comp.localPagingOptions = [ 10, 20, 100 ];
    comp.ngOnChanges({});

    expect(comp.start).toBe(21);
    expect(comp.end).toBe(37);
    expect(comp.total).toBe(37);

  });

});

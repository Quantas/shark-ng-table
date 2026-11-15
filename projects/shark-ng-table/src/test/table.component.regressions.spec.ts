import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Page, SharkColumn, SharkPageChangeEvent, SharkSortType, SharkTableComponent } from '../public-api';

const rows = (count: number) => Array.from({ length: count }, (_x, i) => ({ id: i + 1, name: 'row' + (i + 1) }));

@Component({
  imports: [SharkTableComponent],
  template: `
    <shark-table #table
      [data]="data"
      [columns]="columns"
      [localPagingSize]="pageSize"
      [localPagingOptions]="[10, 20]"
      [localFilter]="localFilter"
      [columnFiltering]="columnFiltering"
      [childRows]="childRows"
      [childComponent]="childComponent"
      [linkTarget]="linkTarget"
      [linkKey]="linkKey"
      (pageChange)="events.push($event)"
    ></shark-table>
  `
})
class HostComponent {
  @ViewChild('table') table: SharkTableComponent;
  data: any = rows(25);
  columns: SharkColumn[] = [
    { header: 'Id', property: 'id' },
    { header: 'Name', property: 'name' }
  ];
  pageSize = 10;
  localFilter = true;
  columnFiltering = false;
  childRows = false;
  childComponent: any;
  linkTarget: string | undefined;
  linkKey: string | undefined;
  events: SharkPageChangeEvent[] = [];
}

describe('SharkTableComponent regressions', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
  });

  const table = () => host.table;

  /**
   * Host properties are plain fields. Zoneless change detection only refreshes dirty views, so mark the host
   * component's own view (not the fixture's host view) before checking.
   */
  const update = () => {
    fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
  };

  describe('paging', () => {
    it('clamps to the last page when the page size grows while on a late page', () => {
      fixture.detectChanges();
      table().changePage(2);
      fixture.detectChanges();
      expect(table().page.number).toBe(2);
      expect(table().page.content!.length).toBe(5);
      expect(table().page.last).toBe(true);

      table().headerChange({ columns: table().columns, filter: '', localPagingSize: 20 });
      fixture.detectChanges();

      expect(table().page.number).toBe(1);
      expect(table().page.totalPages).toBe(2);
      expect(table().page.content!.map(r => r.id)).toEqual([21, 22, 23, 24, 25]);
    });

    it('marks only the final page as last and reports the real element count', () => {
      fixture.detectChanges();
      expect(table().page.last).toBe(false);
      expect(table().page.numberOfElements).toBe(10);

      table().changePage(2);
      expect(table().page.last).toBe(true);
      expect(table().page.numberOfElements).toBe(5);
    });

    it('handles empty data', () => {
      host.data = [];
      fixture.detectChanges();
      expect(table().page.totalPages).toBe(0);
      expect(table().page.content).toEqual([]);
      expect(fixture.nativeElement.textContent).toContain('This table contains no rows');
    });

    it('accepts a page size from the select as a string', () => {
      fixture.detectChanges();
      table().headerChange({ columns: table().columns, filter: '', localPagingSize: '20' as any });
      expect(table().page.content!.length).toBe(20);
    });
  });

  describe('sorting', () => {
    it('never mutates the caller\'s array', () => {
      const data = rows(5);
      host.data = data;
      fixture.detectChanges();

      table().changeSort('id', SharkSortType.ASC); // -> DESC
      expect(table().page.content!.map(r => r.id)).toEqual([5, 4, 3, 2, 1]);
      expect(data.map(r => r.id)).toEqual([1, 2, 3, 4, 5]);
    });

    it('sorts null/undefined last and numeric strings numerically', () => {
      host.data = [{ id: '10' }, { id: null }, { id: '9' }, { id: undefined }, { id: '100' }];
      host.columns = [{ header: 'Id', property: 'id' }];
      fixture.detectChanges();

      table().changeSort('id', SharkSortType.NONE); // -> ASC
      expect(table().page.content!.map(r => r.id)).toEqual(['9', '10', '100', null, undefined]);
    });
  });

  describe('filtering', () => {
    it('does not filter locally when localFilter is false', () => {
      host.localFilter = false;
      host.columnFiltering = true;
      fixture.detectChanges();

      table().columns[1].filter = 'row1';
      table().headerChange({ columns: table().columns, filter: '', localPagingSize: 10 });

      expect(table().page.totalElements).toBe(25);
    });

    it('does not match the text "null" or "undefined" for empty cells', () => {
      host.data = [{ id: 1, name: null }, { id: 2, name: undefined }, { id: 3, name: 'nullable' }];
      fixture.detectChanges();

      table().headerChange({ columns: table().columns, filter: 'null', localPagingSize: 10 });
      expect(table().page.content!.map(r => r.id)).toEqual([3]);

      table().headerChange({ columns: table().columns, filter: 'undef', localPagingSize: 10 });
      expect(table().page.content!.length).toBe(0);
    });

    it('applies a programmatic [filter] change', () => {
      fixture.detectChanges();
      fixture.componentRef.changeDetectorRef.detectChanges();
      table().filter = 'row2';
      table().ngOnChanges({ filter: { previousValue: undefined, currentValue: 'row2', firstChange: false, isFirstChange: () => false } });
      expect(table().page.totalElements).toBe(7); // row2, row20..row25
    });
  });

  describe('data sources', () => {
    it('supports Subjects and piped Observables', () => {
      const subject = new Subject<any[]>();
      host.data = subject.pipe(map(data => data.slice(0, 3)));
      fixture.detectChanges();
      expect(table().page).toBeUndefined();

      subject.next(rows(10));
      fixture.detectChanges();
      expect(table().page.content!.map(r => r.id)).toEqual([1, 2, 3]);
    });

    it('does not crash when an async source has not emitted yet, and applies initialSort once it does', () => {
      const subject = new Subject<Page>();
      host.data = subject;
      fixture.detectChanges();
      table().initialSort = '-id';

      subject.next({ number: 0, totalPages: 1, totalElements: 3, content: rows(3) });
      fixture.detectChanges();

      expect(table().page.content!.map(r => r.id)).toEqual([3, 2, 1]);
    });

    it('defaults page.number for an emitted Page', () => {
      host.data = new BehaviorSubject<Page>({ totalPages: 1, totalElements: 1, content: rows(1) });
      fixture.detectChanges();
      expect(table().page.number).toBe(0);
    });

    it('unsubscribes from the previous Observable when data is replaced', () => {
      const subject = new BehaviorSubject<any[]>(rows(3));
      host.data = subject;
      fixture.detectChanges();

      host.data = rows(1);
      update();
      expect(subject.observed).toBe(false);

      subject.next(rows(20));
      expect(table().page.totalElements).toBe(1);
    });

    it('defaults displayed for columns supplied after the first change', () => {
      fixture.detectChanges();
      host.columns = [{ header: 'Name', property: 'name' }];
      update();

      expect(table().currentColumns.length).toBe(1);
      expect(fixture.nativeElement.textContent).not.toContain('There are no columns selected');
    });
  });

  describe('export', () => {
    it('exports every filtered and sorted row, not just the current page', () => {
      fixture.detectChanges();
      table().changeSort('id', SharkSortType.ASC); // -> DESC
      const exported = table().exportCurrentData();
      expect(exported.data.length).toBe(25);
      expect(exported.data[0]).toEqual({ id: 25, name: 'row25' });
    });

    it('exports the current page for Page data', () => {
      host.data = { number: 0, totalPages: 5, totalElements: 50, content: rows(10) } as Page;
      fixture.detectChanges();
      expect(table().exportCurrentData().data.length).toBe(10);
    });
  });

  describe('row links (#124)', () => {
    let router: Router;
    let openSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      host.linkTarget = '/detail';
      host.linkKey = 'id';
      router = TestBed.inject(Router);
      vi.spyOn(router, 'navigate').mockResolvedValue(true);
      openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
      fixture.detectChanges();
    });

    afterEach(() => vi.restoreAllMocks());

    const firstRow = (): HTMLElement => fixture.debugElement.query(By.css('tr.data-row')).nativeElement;

    it('navigates on click', () => {
      firstRow().click();
      expect(router.navigate).toHaveBeenCalledWith(['/detail', 1]);
      expect(openSpy).not.toHaveBeenCalled();
    });

    it('opens a new tab on middle click', () => {
      const event = new MouseEvent('auxclick', { button: 1, bubbles: true, cancelable: true });
      firstRow().dispatchEvent(event);

      expect(openSpy).toHaveBeenCalledWith('/detail/1', '_blank', 'noopener');
      expect(router.navigate).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it('ignores right click (auxclick button 2)', () => {
      firstRow().dispatchEvent(new MouseEvent('auxclick', { button: 2, bubbles: true }));
      expect(openSpy).not.toHaveBeenCalled();
    });

    it('opens a new tab on ctrl/cmd click', () => {
      firstRow().dispatchEvent(new MouseEvent('click', { ctrlKey: true, bubbles: true }));
      firstRow().dispatchEvent(new MouseEvent('click', { metaKey: true, bubbles: true }));
      expect(openSpy).toHaveBeenCalledTimes(2);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('navigates on Enter', () => {
      firstRow().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(router.navigate).toHaveBeenCalledWith(['/detail', 1]);
    });

    it('does not navigate when the row has no link key value', () => {
      host.data = [{ name: 'no id' }];
      update();
      firstRow().click();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('is not focusable or styled as a link without a linkKey', () => {
      host.linkKey = undefined;
      update();
      expect(firstRow().getAttribute('tabindex')).toBeNull();
      expect(firstRow().classList).not.toContain('rowLink');
    });
  });

  describe('child rows', () => {
    @Component({ template: `child {{ data.id }}` })
    class ChildComponent {
      data: any;
      childOpen(): void {}
    }

    it('toggling a child row does not trigger row navigation', () => {
      host.childRows = true;
      host.childComponent = ChildComponent;
      host.linkTarget = '/detail';
      host.linkKey = 'id';
      const router = TestBed.inject(Router);
      const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
      fixture.detectChanges();

      const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('button.black-arrow');
      toggle.click();
      fixture.detectChanges();

      expect(navigate).not.toHaveBeenCalled();
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('accessibility', () => {
    it('associates the global filter label with its input', () => {
      fixture.detectChanges();
      const input: HTMLInputElement = fixture.nativeElement.querySelector('input[name="filter"]');
      const label: HTMLLabelElement = fixture.nativeElement.querySelector(`label[for="${input.id}"]`);
      expect(label).not.toBeNull();
    });

    it('gives each table a unique default id', () => {
      fixture.detectChanges();
      const other = TestBed.createComponent(HostComponent);
      other.detectChanges();
      expect(other.componentInstance.table.tableId).not.toBe(table().tableId);
    });
  });
});

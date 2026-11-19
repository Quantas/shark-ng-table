import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, Input, Type, input } from '@angular/core';
import { SharkChildComponent, SharkColumn, SharkDynamicContents, SharkTableCellComponent, SharkTableComponent } from '../public-api';

/*
 * Custom cell and child row components can receive `data` and `row` in three ways:
 * a plain property, an `@Input()`, or a signal `input()`. Each style must render,
 * update when the row changes, and (for child rows) be told when the row opens.
 */

// --- Cell components, one per style -----------------------------------------------------------

@Component({
  selector: 'plain-cell',
  template: `<span class="cell">{{ data }}|{{ row?.id }}</span>`,
  changeDetection: ChangeDetectionStrategy.Eager
})
class PlainPropertyCell implements SharkDynamicContents {
  data: any;
  row?: any;
}

@Component({
  selector: 'decorator-cell',
  template: `<span class="cell">{{ data }}|{{ row?.id }}</span>`
})
class DecoratorInputCell implements SharkDynamicContents {
  @Input() data: any;
  @Input() row?: any;
}

@Component({
  selector: 'signal-cell',
  template: `<span class="cell">{{ data() }}|{{ row()?.id }}</span>`
})
class SignalInputCell implements SharkDynamicContents {
  readonly data = input<any>();
  readonly row = input<any>();
}

@Component({
  selector: 'required-signal-cell',
  template: `<span class="cell">{{ data() }}|{{ row().id }}</span>`
})
class RequiredSignalInputCell implements SharkDynamicContents {
  readonly data = input.required<any>();
  readonly row = input.required<any>();
}

@Component({
  selector: 'mixed-cell',
  template: `<span class="cell">{{ data() }}|{{ row?.id }}</span>`
})
class MixedCell implements SharkDynamicContents {
  readonly data = input<any>();
  row?: any;
}

@Component({
  selector: 'aliased-cell',
  template: `<span class="cell">{{ value() }}|{{ source()?.id }}</span>`
})
class AliasedSignalInputCell implements SharkDynamicContents {
  readonly value = input<any>(undefined, { alias: 'data' });
  readonly source = input<any>(undefined, { alias: 'row' });
  // SharkDynamicContents asks for a `data` member; the aliased input above is what Angular sets.
  data: any;
}

@Component({
  selector: 'data-only-cell',
  template: `<span class="cell">{{ data() }}</span>`
})
class DataOnlySignalCell implements SharkDynamicContents {
  readonly data = input<any>();
}

const cellStyles: [string, Type<SharkDynamicContents>][] = [
  ['a plain property', PlainPropertyCell],
  ['@Input()', DecoratorInputCell],
  ['input()', SignalInputCell],
  ['input.required()', RequiredSignalInputCell],
  ['input() for data and a plain property for row', MixedCell],
  ['aliased input()', AliasedSignalInputCell]
];

describe('Custom cell components', () => {

  let fixture: ComponentFixture<SharkTableCellComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SharkTableCellComponent);
  });

  function render(component: Type<SharkDynamicContents>, row: object): string {
    fixture.componentRef.setInput('column', { header: 'Name', property: 'name', component });
    fixture.componentRef.setInput('row', row);
    fixture.detectChanges();
    return (fixture.nativeElement as HTMLElement).querySelector('.cell')!.textContent!;
  }

  for (const [style, component] of cellStyles) {
    describe(`using ${style}`, () => {

      it('renders the cell value and the row', () => {
        expect(render(component, { id: 1, name: 'shark' })).toBe('shark|1');
      });

      it('updates when the row changes', () => {
        render(component, { id: 1, name: 'shark' });
        expect(render(component, { id: 2, name: 'ray' })).toBe('ray|2');
        expect(fixture.nativeElement.querySelectorAll('.cell').length).toBe(1);
      });

      it('renders falsy cell values', () => {
        expect(render(component, { id: 3, name: 0 })).toBe('0|3');
      });

    });
  }

  it('renders a signal component that only declares a data input', () => {
    expect(render(DataOnlySignalCell, { id: 1, name: 'shark' })).toBe('shark');
  });

  it('replaces the component when the column changes to another style', () => {
    render(PlainPropertyCell, { id: 1, name: 'shark' });
    expect(render(SignalInputCell, { id: 1, name: 'shark' })).toBe('shark|1');
    expect(fixture.nativeElement.querySelectorAll('.cell').length).toBe(1);
  });

});

// --- Child row components, one per style ------------------------------------------------------

@Component({
  selector: 'plain-child',
  template: `<p class="child">{{ data.vin }}</p>`,
  changeDetection: ChangeDetectionStrategy.Eager
})
class PlainPropertyChild implements SharkDynamicContents {
  data: any;
  openCalls: boolean[] = [];
  childOpen(value: boolean): void { this.openCalls.push(value); }
}

@Component({
  selector: 'decorator-child',
  template: `<p class="child">{{ data.vin }}</p>`
})
class DecoratorInputChild implements SharkDynamicContents {
  @Input() data: any;
  openCalls: boolean[] = [];
  childOpen(value: boolean): void { this.openCalls.push(value); }
}

@Component({
  selector: 'signal-child',
  template: `<p class="child">{{ data().vin }}</p>`
})
class SignalInputChild implements SharkDynamicContents {
  readonly data = input.required<any>();
  openCalls: boolean[] = [];
  childOpen(value: boolean): void { this.openCalls.push(value); }
}

@Component({
  selector: 'no-open-child',
  template: `<p class="child">{{ data().vin }}</p>`
})
class SignalChildWithoutOpenHook implements SharkDynamicContents {
  readonly data = input<any>();
}

type ChildWithCalls = SharkDynamicContents & { openCalls: boolean[] };

const childStyles: [string, Type<ChildWithCalls>][] = [
  ['a plain property', PlainPropertyChild],
  ['@Input()', DecoratorInputChild],
  ['input.required()', SignalInputChild]
];

describe('Custom child row components', () => {

  let fixture: ComponentFixture<SharkChildComponent>;

  function create(component: Type<SharkDynamicContents>, row: object): void {
    fixture = TestBed.createComponent(SharkChildComponent);
    fixture.componentRef.setInput('component', component);
    fixture.componentRef.setInput('row', row);
    fixture.componentRef.setInput('rowIndex', 0);
    fixture.detectChanges();
  }

  const text = () => (fixture.nativeElement as HTMLElement).querySelector('.child')!.textContent;

  for (const [style, component] of childStyles) {
    describe(`using ${style}`, () => {

      it('renders the row', () => {
        create(component, { vin: 'A1' });
        expect(text()).toBe('A1');
      });

      it('updates when the row changes', () => {
        create(component, { vin: 'A1' });
        fixture.componentRef.setInput('row', { vin: 'B2' });
        fixture.detectChanges();
        expect(text()).toBe('B2');
      });

      it('is told when the row opens and closes', () => {
        create(component, { vin: 'A1' });
        const child = fixture.componentInstance.componentRef!.instance as ChildWithCalls;

        fixture.componentRef.setInput('openChildren', [0]);
        fixture.detectChanges();
        fixture.componentRef.setInput('openChildren', []);
        fixture.detectChanges();

        expect(child.openCalls).toEqual([true, false]);
      });

    });
  }

  it('opens a child row whose component has no childOpen method', () => {
    create(SignalChildWithoutOpenHook, { vin: 'A1' });
    fixture.componentRef.setInput('openChildren', [0]);
    fixture.detectChanges();
    expect(fixture.componentInstance.childOpen).toBe(true);
    expect(text()).toBe('A1');
  });

});

// --- Through the whole table ------------------------------------------------------------------

@Component({
  selector: 'table-host',
  imports: [SharkTableComponent],
  template: `
    <shark-table [data]="data" [columns]="columns" [childRows]="true" [childComponent]="child" [localPaging]="false"></shark-table>
  `
})
class TableHostComponent {
  data = [{ id: 1, name: 'shark', vin: 'A1' }, { id: 2, name: 'ray', vin: 'B2' }];
  columns: SharkColumn[] = [
    { header: 'Id', property: 'id' },
    { header: 'Name', property: 'name', component: SignalInputCell }
  ];
  child: Type<SharkDynamicContents> = SignalInputChild;
}

describe('SharkTableComponent with signal-input custom components', () => {

  it('renders signal-input cells and child rows for every row', () => {
    const fixture = TestBed.createComponent(TableHostComponent);
    fixture.detectChanges();

    const cells = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.cell')).map(c => c.textContent);
    const children = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.child')).map(c => c.textContent);

    expect(cells).toEqual(['shark|1', 'ray|2']);
    expect(children).toEqual(['A1', 'B2']);
  });

});

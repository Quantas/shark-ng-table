import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { SharkDynamicContents, SharkTableCellComponent } from '../public-api';

describe('SharkTableCellComponent', () => {

  let fixture: ComponentFixture<SharkTableCellComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SharkTableCellComponent);
  });

  function render(column: object, row: object): string {
    fixture.componentRef.setInput('column', column);
    fixture.componentRef.setInput('row', row);
    fixture.detectChanges();
    return (fixture.nativeElement as HTMLElement).textContent!.trim();
  }

  it('should contain custom rendering for table cell', () => {
    render({ header: 'Col 1', property: 'col1', component: TestTableCellComponent }, { col1: '1', col2: 'b', col3: 'c' });

    expect(fixture.nativeElement.querySelector('span').innerHTML).toEqual('<span style="color: red;">1</span>');
  });

  it('should update a custom component when the row changes', () => {
    render({ header: 'Col 1', property: 'col1', component: TestTableCellComponent }, { col1: '1' });
    render({ header: 'Col 1', property: 'col1', component: TestTableCellComponent }, { col1: '2' });

    expect(fixture.nativeElement.querySelectorAll('span span').length).toBe(1);
    expect(fixture.nativeElement.querySelector('span span').textContent).toBe('2');
  });

  it('should render plain values, including falsy ones', () => {
    expect(render({ header: 'Col 1', property: 'col1' }, { col1: 'text' })).toBe('text');
    expect(render({ header: 'Col 1', property: 'col1' }, { col1: 0 })).toBe('0');
    expect(render({ header: 'Col 1', property: 'col1' }, { col1: false })).toBe('false');
    expect(render({ header: 'Col 1', property: 'col1' }, { col1: null })).toBe('');
  });

  it('should render nested properties through a pipe', () => {
    expect(render({ header: 'Name', property: 'person.name', pipe: UpperCasePipe }, { person: { name: 'shark' } })).toBe('SHARK');
  });

});

@Component({
  template: `<span><span style="color: red;">{{ data }}</span></span>`
})
export class TestTableCellComponent implements SharkDynamicContents {
  data: any;

  childOpen(): void {}
}

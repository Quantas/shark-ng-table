import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SharkDynamicContents, SharkChildComponent } from '../public-api';

describe('SharkChildComponent', () => {

  let fixture: ComponentFixture<SharkChildComponent>;
  let component: SharkChildComponent;

  const row = { col1: '1', col2: 'b', col3: 'c' };

  beforeEach(() => {
    fixture = TestBed.createComponent(SharkChildComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('component', ChildDataComponent);
    fixture.componentRef.setInput('row', row);
    fixture.componentRef.setInput('rowIndex', 0);
    fixture.detectChanges();
  });

  it('should contain custom rendering for child row', () => {
    expect(fixture.nativeElement.querySelector('tr').innerHTML).toEqual('<td>1</td><td>b</td><td>c</td>');
  });

  it('should open the child row and notify the child component', () => {
    const child = component.componentRef!.instance as ChildDataComponent;

    fixture.componentRef.setInput('openChildren', [0]);
    fixture.detectChanges();

    expect(component.childOpen).toBe(true);
    expect(child.openCalls).toEqual([true]);

    fixture.componentRef.setInput('openChildren', []);
    fixture.detectChanges();

    expect(component.childOpen).toBe(false);
    expect(child.openCalls).toEqual([true, false]);
  });

  it('should not open on firstChange', () => {
    expect(component.childOpen).toBe(false);
    expect((component.componentRef!.instance as ChildDataComponent).openCalls).toEqual([]);
  });

  it('should not open on wrong index', () => {
    fixture.componentRef.setInput('openChildren', [1]);
    fixture.detectChanges();

    expect(component.childOpen).toBe(false);
  });

  it('should re-render when the row changes', () => {
    fixture.componentRef.setInput('row', { col1: '9', col2: 'y', col3: 'z' });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('tr').innerHTML).toEqual('<td>9</td><td>y</td><td>z</td>');
  });

});

@Component({
  template: `
    <table>
      <tr><td>{{ data.col1 }}</td><td>{{ data.col2 }}</td><td>{{ data.col3 }}</td></tr>
    </table>
  `
})
export class ChildDataComponent implements SharkDynamicContents {
  data: any;
  openCalls: boolean[] = [];

  childOpen(value: boolean): void {
    this.openCalls.push(value);
  }
}

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharkDynamicContents, SharkTableCellComponent, SharkTableModule } from '../table';

describe('SharkTableCellComponent', () => {

  let fixture: ComponentFixture<SharkTableCellComponent>;
  let component: SharkTableCellComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TableCellTestingModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(SharkTableCellComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should contain custom rendering for table cell', () => {
    component.column = {
      header: 'Col 1',
      property: 'col1',
      component: TestBed.createComponent(TestTableCellComponent).componentRef.componentType
    };

    component.row = {col1: '1', col2: 'b', col3: 'c' };

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').innerHTML).toEqual('<span style="color: red;">1</span>');
  });

});

@Component({
  template: `<span><span style="color: red;">{{ data }}</span></span>`
})
export class TestTableCellComponent implements SharkDynamicContents {
  data: any;

  childOpen(value: boolean): void {
    console.log(value);
  }
}

@NgModule({
    imports: [CommonModule, SharkTableModule],
    exports: [TestTableCellComponent],
    declarations: [TestTableCellComponent]
})
export class TableCellTestingModule {
}

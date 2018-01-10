import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { SharkDynamicContents } from './dynamic/dynamic.contents';
import { SharkDynamicContentsDirective } from './dynamic/dynamic.contents.directive';
import { SharkTableUtils } from './table.utils';
import { SharkTableCellComponent } from './table.cell.component';
import { CommonModule } from '@angular/common';

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
      component: TestBed.createComponent(TableCellComponent).componentRef.componentType
    };

    component.row = {col1: '1', col2: 'b', col3: 'c' };

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').innerHTML).toEqual('<span style="color: red">1</span>');
  });

});

@Component({
  template: `<span><span style="color: red">{{ data }}</span></span>`
})
export class TableCellComponent implements SharkDynamicContents {
  data: any;
}

@NgModule({
  imports: [ CommonModule ],
  exports: [ TableCellComponent, SharkTableCellComponent, SharkDynamicContentsDirective ],
  declarations: [ TableCellComponent, SharkTableCellComponent, SharkDynamicContentsDirective ],
  providers: [ SharkTableUtils ],
  entryComponents: [ TableCellComponent ]
})
export class TableCellTestingModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharkTablePaginationComponent } from './table.pagination.component';
import { SharkTableComponent } from './table.component';
import { LocalFilterPipe } from './localfilter.pipe';
import { TableUtils } from './table.utils';
import { TableCellComponent } from './table.cell.component';
import { TableCellContentsDirective } from './table.cell.contents.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SharkTableComponent,
    TableCellComponent,
    TableCellContentsDirective,
    SharkTablePaginationComponent,
    LocalFilterPipe
  ],
  exports: [
    SharkTableComponent,
    SharkTablePaginationComponent
  ],
  providers: [
    TableUtils
  ]
})
export class SharkTableModule { }

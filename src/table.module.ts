import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharkTablePaginationComponent } from './table.pagination.component';
import { SharkTableComponent } from './table.component';
import { LocalFilterPipe } from './localfilter.pipe';
import { SharkTableUtils } from './table.utils';
import { SharkTableCellComponent } from './table.cell.component';
import { SharkTableCellContentsDirective } from './table.cell.contents.directive';
import { SharkChildComponent } from './child/child.component';
import { SharkChildContentsDirective } from './child/child.component.directive';
import { SharkTableRowComponent } from './table.row.component';
import { SharkTableHeaderComponent } from './table.header.component';
import { SharkTableFooterComponent } from './table.footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SharkTableComponent,
    SharkChildComponent,
    SharkChildContentsDirective,
    SharkTableCellComponent,
    SharkTableCellContentsDirective,
    SharkTableHeaderComponent,
    SharkTableFooterComponent,
    SharkTablePaginationComponent,
    SharkTableRowComponent,
    LocalFilterPipe
  ],
  exports: [
    SharkTableComponent,
    SharkTablePaginationComponent
  ],
  providers: [
    SharkTableUtils
  ]
})
export class SharkTableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharkTablePaginationComponent } from './table.pagination.component';
import { SharkTableComponent } from './table.component';
import { LocalFilterPipe } from './localfilter.pipe';
import { SharkTableUtils } from './table.utils';
import { SharkTableCellComponent } from './table.cell.component';
import { SharkChildComponent } from './child.component';
import { SharkTableBodyComponent } from './table.body.component';
import { SharkTableHeaderComponent } from './table.header.component';
import { SharkTableFooterComponent } from './table.footer.component';
import { SharkDynamicContentsDirective } from './dynamic/dynamic.contents.directive';
import { SharkColumnDropdownComponent } from './column-dropdown.component';
import { SharkTableInfoHeaderComponent } from './table.info.header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SharkTableComponent,
    SharkChildComponent,
    SharkDynamicContentsDirective,
    SharkTableCellComponent,
    SharkTableHeaderComponent,
    SharkTableInfoHeaderComponent,
    SharkTableFooterComponent,
    SharkTablePaginationComponent,
    SharkTableBodyComponent,
    LocalFilterPipe,
    SharkColumnDropdownComponent
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

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
import { SharkTableInfoHeaderComponent } from './table.info.header.component';
import { SharkTableHeaderButtonComponent } from './header-button.component';
import { AriaNotifierComponent } from './notifier/aria-notifier.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    AriaNotifierComponent,
    SharkTableComponent,
    SharkChildComponent,
    SharkDynamicContentsDirective,
    SharkTableCellComponent,
    SharkTableHeaderComponent,
    SharkTableHeaderButtonComponent,
    SharkTableInfoHeaderComponent,
    SharkTableFooterComponent,
    SharkTablePaginationComponent,
    SharkTableBodyComponent,
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

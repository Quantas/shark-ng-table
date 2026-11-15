import { NgModule } from '@angular/core';

import { SharkTablePaginationComponent } from './table.pagination.component';
import { SharkTableComponent } from './table.component';

/**
 * Kept for backwards compatibility with NgModule based applications.
 *
 * All shark-ng-table components are standalone, so new code can import {@link SharkTableComponent} directly.
 */
@NgModule({
  imports: [
    SharkTableComponent,
    SharkTablePaginationComponent
  ],
  exports: [
    SharkTableComponent,
    SharkTablePaginationComponent
  ]
})
export class SharkTableModule { }

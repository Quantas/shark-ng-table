import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './samples/basic.component';
import { ColumnFilteringComponent } from './samples/column-filtering.component';
import { ChildRowsComponent } from './samples/child-rows.component';
import { CustomCellsComponent } from './samples/custom-cell.component';
import { FilterableComponent } from './samples/filterable.component';
import { PageableComponent } from './samples/pageable.component';
import { PagingAndFilteringComponent } from './samples/paging-filtering.component';
import { ColumnOrderingComponent } from './samples/column-ordering.component';
import { ColumnPickerComponent } from './samples/column-picker.component';
import { EverythingComponent } from './samples/everything.component';
import { CellStyleComponent } from './samples/cellstyle.component';
import { DataExportComponent } from './samples/data-export.component';
import { LargeComponent } from './samples/large.component';
import { TwoTablesComponent } from './samples/two-tables.component';
import { ContentProjectionComponent } from './samples/content-projection.component';
import { ObservableComponent } from './samples/observable.component';
import { RowLinkComponent } from './samples/row-link.component';
import { LinkTargetComponent } from './samples/link-target.component';
import { ToggleTableComponent } from './samples/toggle-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full' },

  { path: 'basic', component: BasicComponent },
  { path: 'cellstyle', component: CellStyleComponent },
  { path: 'data-export', component: DataExportComponent },
  { path: 'everything', component: EverythingComponent },
  { path: 'filterable', component: FilterableComponent },
  { path: 'pageable', component: PageableComponent },
  { path: 'paging-filtering', component: PagingAndFilteringComponent },
  { path: 'column-filtering', component: ColumnFilteringComponent },
  { path: 'column-ordering', component: ColumnOrderingComponent },
  { path: 'column-picker', component: ColumnPickerComponent },
  { path: 'content-projection', component: ContentProjectionComponent },
  { path: 'child-rows', component: ChildRowsComponent },
  { path: 'custom-cells', component: CustomCellsComponent },
  { path: 'large', component: LargeComponent },
  { path: 'observable', component: ObservableComponent },
  { path: 'two-tables', component: TwoTablesComponent },
  { path: 'row-link', component: RowLinkComponent },
  { path: 'toggle-table', component: ToggleTableComponent },
  { path: 'link-target/:id', component: LinkTargetComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

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

const routes: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full' },

  { path: 'basic', component: BasicComponent },
  { path: 'cellstyle', component: CellStyleComponent },
  { path: 'everything', component: EverythingComponent },
  { path: 'filterable', component: FilterableComponent },
  { path: 'pageable', component: PageableComponent },
  { path: 'paging-filtering', component: PagingAndFilteringComponent },
  { path: 'column-filtering', component: ColumnFilteringComponent },
  { path: 'column-ordering', component: ColumnOrderingComponent },
  { path: 'column-picker', component: ColumnPickerComponent },
  { path: 'child-rows', component: ChildRowsComponent },
  { path: 'custom-cells', component: CustomCellsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

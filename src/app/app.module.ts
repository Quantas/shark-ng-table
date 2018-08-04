import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BasicComponent } from './samples/basic.component';
import { FilterableComponent } from './samples/filterable.component';
import { PageableComponent } from './samples/pageable.component';
import { SharkTableModule } from './table';
import { TableDataService } from './data.service';
import { ColumnFilteringComponent } from './samples/column-filtering.component';
import { ChildRowsComponent } from './samples/child-rows.component';
import { ChildRowRenderingComponent } from './samples/child-rows-rendering.component';
import { CustomCellsComponent, MakeComponent } from './samples/custom-cell.component';
import { PagingAndFilteringComponent } from './samples/paging-filtering.component';
import { ColumnOrderingComponent } from './samples/column-ordering.component';
import { ColumnPickerComponent } from './samples/column-picker.component';
import { EverythingComponent } from './samples/everything.component';
import { CellStyleComponent } from './samples/cellstyle.component';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,

    BasicComponent,
    CellStyleComponent,
    EverythingComponent,
    FilterableComponent,
    PageableComponent,
    PagingAndFilteringComponent,
    ColumnFilteringComponent,
    ColumnOrderingComponent,
    ColumnPickerComponent,
    ChildRowsComponent,
    ChildRowRenderingComponent,
    CustomCellsComponent,
    MakeComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharkTableModule,

    MatToolbarModule
  ],
  entryComponents: [ ChildRowRenderingComponent, MakeComponent ],
  providers: [ TableDataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

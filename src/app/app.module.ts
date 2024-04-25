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
import { ChildRowRenderingComponent } from './samples/shared/child-rows-rendering.component';
import { CustomCellsComponent, MakeComponent } from './samples/custom-cell.component';
import { PagingAndFilteringComponent } from './samples/paging-filtering.component';
import { ColumnOrderingComponent } from './samples/column-ordering.component';
import { ColumnPickerComponent } from './samples/column-picker.component';
import { EverythingComponent } from './samples/everything.component';
import { CellStyleComponent } from './samples/cellstyle.component';
import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';


import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { CodeSampleComponent } from './samples/shared/code-sample-component';
import { DataExportComponent } from './samples/data-export.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LargeComponent } from './samples/large.component';
import { TwoTablesComponent } from './samples/two-tables.component';
import { ContentProjectionComponent } from './samples/content-projection.component';
import { ObservableComponent } from './samples/observable.component';
import { RowLinkComponent } from './samples/row-link.component';
import { LinkTargetComponent } from './samples/link-target.component';
import { ToggleTableComponent } from './samples/toggle-table.component';

@NgModule({
    declarations: [
        AppComponent,
        CodeSampleComponent,
        BasicComponent,
        CellStyleComponent,
        DataExportComponent,
        EverythingComponent,
        FilterableComponent,
        PageableComponent,
        PagingAndFilteringComponent,
        ColumnFilteringComponent,
        ColumnOrderingComponent,
        ColumnPickerComponent,
        ChildRowsComponent,
        ChildRowRenderingComponent,
        ContentProjectionComponent,
        LargeComponent,
        ObservableComponent,
        CustomCellsComponent,
        MakeComponent,
        TwoTablesComponent,
        RowLinkComponent,
        LinkTargetComponent,
        ToggleTableComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        AppRoutingModule,
        SharkTableModule,
        HighlightJsModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule
    ],
    providers: [TableDataService, HighlightJsService],
    bootstrap: [AppComponent]
})
export class AppModule { }

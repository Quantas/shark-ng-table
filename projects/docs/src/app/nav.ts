import { Type } from '@angular/core';

import setup from '../../../../usage/setup.md';
import styling from '../../../../usage/styling.md';
import options from '../../../../usage/shark-table-options.md';
import columns from '../../../../usage/column-options.md';
import childRows from '../../../../usage/child-rows.md';
import migrating from '../../../../usage/migrating.md';
import developers from '../../../../usage/developers.md';

export interface GuideEntry {
  path: string;
  title: string;
  file: string;
  markdown: string;
}

export interface ExampleEntry {
  path: string;
  title: string;
  load: () => Promise<Type<unknown>>;
}

export const GUIDES: GuideEntry[] = [
  { path: 'setup', title: 'Getting started', file: 'setup.md', markdown: setup },
  { path: 'styling', title: 'Styling', file: 'styling.md', markdown: styling },
  { path: 'table-options', title: 'Table options', file: 'shark-table-options.md', markdown: options },
  { path: 'column-options', title: 'Column options', file: 'column-options.md', markdown: columns },
  { path: 'child-rows', title: 'Child rows', file: 'child-rows.md', markdown: childRows },
  { path: 'migrating', title: 'Upgrading to 8.0', file: 'migrating.md', markdown: migrating },
  { path: 'developers', title: 'Contributing', file: 'developers.md', markdown: developers }
];

// Paths match the previous site so existing links (#/basic, #/row-link, ...) keep working.
export const EXAMPLES: ExampleEntry[] = [
  { path: 'basic', title: 'Basic', load: () => import('./samples/basic.component').then(m => m.BasicComponent) },
  { path: 'pageable', title: 'Paging', load: () => import('./samples/pageable.component').then(m => m.PageableComponent) },
  { path: 'filterable', title: 'Filtering', load: () => import('./samples/filterable.component').then(m => m.FilterableComponent) },
  { path: 'paging-filtering', title: 'Paging and filtering', load: () => import('./samples/paging-filtering.component').then(m => m.PagingAndFilteringComponent) },
  { path: 'column-filtering', title: 'Column filtering', load: () => import('./samples/column-filtering.component').then(m => m.ColumnFilteringComponent) },
  { path: 'column-ordering', title: 'Column ordering', load: () => import('./samples/column-ordering.component').then(m => m.ColumnOrderingComponent) },
  { path: 'column-picker', title: 'Column picker', load: () => import('./samples/column-picker.component').then(m => m.ColumnPickerComponent) },
  { path: 'custom-cells', title: 'Custom cells', load: () => import('./samples/custom-cell.component').then(m => m.CustomCellsComponent) },
  { path: 'cellstyle', title: 'Cell styling', load: () => import('./samples/cellstyle.component').then(m => m.CellStyleComponent) },
  { path: 'child-rows', title: 'Child rows', load: () => import('./samples/child-rows.component').then(m => m.ChildRowsComponent) },
  { path: 'row-link', title: 'Row links', load: () => import('./samples/row-link.component').then(m => m.RowLinkComponent) },
  { path: 'content-projection', title: 'Header and footer content', load: () => import('./samples/content-projection.component').then(m => m.ContentProjectionComponent) },
  { path: 'observable', title: 'Observable data', load: () => import('./samples/observable.component').then(m => m.ObservableComponent) },
  { path: 'data-export', title: 'Data export', load: () => import('./samples/data-export.component').then(m => m.DataExportComponent) },
  { path: 'large', title: 'Large data set', load: () => import('./samples/large.component').then(m => m.LargeComponent) },
  { path: 'two-tables', title: 'Two tables', load: () => import('./samples/two-tables.component').then(m => m.TwoTablesComponent) },
  { path: 'toggle-table', title: 'Toggling a table', load: () => import('./samples/toggle-table.component').then(m => m.ToggleTableComponent) },
  { path: 'everything', title: 'Everything at once', load: () => import('./samples/everything.component').then(m => m.EverythingComponent) }
];

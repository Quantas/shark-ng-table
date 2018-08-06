import { Component } from '@angular/core';
import { SharkColumn } from '../table';

@Component({
  template: `
    <shark-table-code-sample pageTitle="Large Table" [htmlSample]="htmlSample" [tsSample]="tsSample" #parent>
      <shark-table
        [data]="testData"
        [columns]="tableColumns"
        [filterable]="false"
        [localPaging]="false"
        [hideCaption]="true"
        [columnPicker]="true"
      >
      </shark-table>
    </shark-table-code-sample>
  `
})
export class LargeComponent {

  htmlSample = `
    &lt;shark-table
      [data]="testData"
      [columns]="tableColumns"
      [filterable]="false"
      [localPaging]="false"
      [hideCaption]="true"
      [columnPicker]="true"
    &gt;
    &lt;/shark-table&gt;
  `;

  tsSample = `
    tableColumns: SharkColumn[] = [
      { header: 'Huge Column Name', property: 'col1' },
      { header: 'Col 2', property: 'col1' },
      { header: 'Col 3', property: 'col1' },
      { header: 'Col 4', property: 'col1' },
      { header: 'Col 5', property: 'col1' },
      { header: 'Col 6', property: 'col1' },
      { header: 'Col 7', property: 'col1' },
      { header: 'Col 8', property: 'col1' },
      { header: 'Large Column Name', property: 'col1' },
      { header: 'Col 10', property: 'col1' },
      { header: 'Col 11', property: 'col1' },
      { header: 'Col 12', property: 'col1' },
      { header: 'Col 13', property: 'col1' },
      { header: 'Col 14', property: 'col1' },
      { header: 'Col 15', property: 'col1' },
      { header: 'Col 16', property: 'col1' },
      { header: 'Col 17', property: 'col1' },
      { header: 'Col 18', property: 'col1' },
      { header: 'Col 19', property: 'col1' },
      { header: 'Col 20', property: 'col1' }
    ];

    testData = [
      {col1: '1234'},
      {col1: '1234'},
      {col1: '1234'},
      {col1: '1234'},
      {col1: '1234'},
      {col1: '1234'},
      {col1: '1234'},
      {col1: '1234'}
    ];
  `;

  tableColumns: SharkColumn[] = [
    { header: 'Huge Column Name', property: 'col1' },
    { header: 'Col 2', property: 'col1' },
    { header: 'Col 3', property: 'col1' },
    { header: 'Col 4', property: 'col1' },
    { header: 'Col 5', property: 'col1' },
    { header: 'Col 6', property: 'col1' },
    { header: 'Col 7', property: 'col1' },
    { header: 'Col 8', property: 'col1' },
    { header: 'Large Column Name', property: 'col1' },
    { header: 'Col 10', property: 'col1' },
    { header: 'Col 11', property: 'col1' },
    { header: 'Col 12', property: 'col1' },
    { header: 'Col 13', property: 'col1' },
    { header: 'Col 14', property: 'col1' },
    { header: 'Col 15', property: 'col1' },
    { header: 'Col 16', property: 'col1' },
    { header: 'Col 17', property: 'col1' },
    { header: 'Col 18', property: 'col1' },
    { header: 'Col 19', property: 'col1' },
    { header: 'Col 20', property: 'col1' }
  ];

  testData = [
    {col1: '1234'},
    {col1: '1234'},
    {col1: '1234'},
    {col1: '1234'},
    {col1: '1234'},
    {col1: '1234'},
    {col1: '1234'},
    {col1: '1234'}
  ];

}

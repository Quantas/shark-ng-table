[![Build Status](https://travis-ci.org/Quantas/shark-ng-table.svg?branch=master)](https://travis-ci.org/Quantas/shark-ng-table)
[![CircleCI](https://circleci.com/gh/Quantas/shark-ng-table.svg?style=shield)](https://circleci.com/gh/Quantas/shark-ng-table)
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]

[![npm version](https://badge.fury.io/js/shark-ng-table.svg)][npm-badge-url]
[![npm](https://img.shields.io/npm/l/shark-ng-table.svg)][npm-badge-url]
[![npm](https://img.shields.io/npm/dm/shark-ng-table.svg)][npm-badge-url]

# shark-ng-table

A Table for Angular that supports filtering/sorting/pagination

## Installing

```bash
npm install --save shark-ng-table
```

This will install the latest version of `shark-ng-table`.

## Import our NgModule

Add `SharkTableModule` to your module's `import` section as below:

```typescript
import {NgModule} from '@angular/core';
import {SharkTableModule} from 'shark-ng-table';


@NgModule({
  imports: [
    SharkTableModule,
  ]
})
export class MyAngularModule {}
```

## Setup Some Data

In your Component add a `SharkColumn` definition and some test data:

```typescript
import { Component } from '@angular/core';

import { SharkColumn } from 'shark-ng-table';

@Component({
  templateUrl: './tabletest.component.html',
  styleUrls: ['./tabletest.component.css']
})
export class TableTestComponent {

  testData = [
    {col1: '1', col2: 'b', col3: 'c' },
    {col1: '2', col2: 'b', col3: 'c' },
    {col1: '3', col2: 'b', col3: 'c' },
    {col1: '4', col2: 'b', col3: 'c' },
    {col1: '5', col2: 'b', col3: 'c' },
    {col1: '6', col2: 'b', col3: 'c' },
    {col1: '7', col2: 'b', col3: 'c' },
    {col1: '8', col2: 'b', col3: 'c' },
    {col1: '9', col2: 'b', col3: 'c' },
    {col1: '10', col2: 'b', col3: 'c' },
    {col1: '11', col2: 'b', col3: 'c' },
    {col1: '12', col2: 'b', col3: 'c' },
    {col1: '13', col2: 'b', col3: 'c' },
    {col1: '14', col2: 'b', col3: 'c' }
  ];

  tableColumns: SharkColumn[] = [
    { header: 'Col 1', property: 'col1'},
    { header: 'Col 2', property: 'col2'},
    { header: 'Col 3', property: 'col3'}
  ];
}
```

Then in your HTML for your component add the following:

```html
<shark-table
  [data]="testData"
  [serverSide]="false"
  [localFilter]="true"
  [columns]="tableColumns"
  [localPaging]="true"
  [localPagingSize]="50"
>
</shark-table>
```

This will create the table with the `tableColumns` definitions and the `testData` as the source.

## TODO - More Documentation!

[david-badge]: https://david-dm.org/quantas/shark-ng-table.svg
[david-badge-url]: https://david-dm.org/quantas/shark-ng-table
[david-dev-badge]: https://david-dm.org/quantas/shark-ng-table/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/quantas/shark-ng-table?type=dev
[npm-badge-url]: https://www.npmjs.com/package/shark-ng-table
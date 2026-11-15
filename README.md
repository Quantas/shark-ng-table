# shark-ng-table

[![CI](https://github.com/Quantas/shark-ng-table/actions/workflows/ci.yml/badge.svg)](https://github.com/Quantas/shark-ng-table/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/Quantas/shark-ng-table/badge.svg?branch=master)](https://coveralls.io/github/Quantas/shark-ng-table?branch=master)
[![npm version](https://img.shields.io/npm/v/shark-ng-table.svg)][npm-badge-url]
[![npm license](https://img.shields.io/npm/l/shark-ng-table.svg)][npm-badge-url]
[![npm downloads](https://img.shields.io/npm/dm/shark-ng-table.svg)][npm-badge-url]

[npm-badge-url]: https://www.npmjs.com/package/shark-ng-table

An Angular data table built for keyboard and screen reader users. Section 508 and WCAG 2 AA compliant.

**Docs and live examples: https://www.quantasnet.com/shark-ng-table/**

## Features

- Filtering, global or per column
- Sorting, including multiple columns and custom sort functions
- Client-side or server-side paging
- Column reordering and a column picker
- Expandable child rows
- Custom cell rendering with your own component or pipe
- Row links, including middle click and Ctrl/Cmd click to open a new tab
- Every change announced to screen readers through a live region

## Versions

| Angular         | shark-ng-table |
| --------------- | -------------- |
| 21 and 22       | 8.x            |
| 16 to 20        | 7.x            |
| 6 to 15         | 6.x            |

## Install

```bash
npm install shark-ng-table
```

```typescript
import { Component } from '@angular/core';
import { SharkColumn, SharkTableComponent } from 'shark-ng-table';

@Component({
  selector: 'app-cars',
  imports: [SharkTableComponent],
  template: `<shark-table caption="Cars" [data]="cars" [columns]="columns"></shark-table>`
})
export class CarsComponent {
  cars = [{ year: 2017, make: 'Subaru', model: 'WRX' }];
  columns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make' },
    { header: 'Model', property: 'model' }
  ];
}
```

Then add `node_modules/shark-ng-table/shark-ng-table.min.css` to the `styles` in your `angular.json`.

## Documentation

The guides are on the [docs site](https://www.quantasnet.com/shark-ng-table/) and in this repository:

- [Getting started](usage/setup.md)
- [Styling](usage/styling.md)
- [Table options](usage/shark-table-options.md)
- [Column options](usage/column-options.md)
- [Child rows](usage/child-rows.md)
- [Upgrading to 8.0](usage/migrating.md)
- [Contributing](usage/developers.md) and [releasing](RELEASING.md)
- [Change log](CHANGELOG.md)

## Development

```bash
npm ci
npm start      # docs site at http://localhost:4200, using the library source
npm test       # unit and accessibility tests
npm run lint
npm run build  # package in dist/shark-ng-table
```

A [dev container](.devcontainer/devcontainer.json) is included for VS Code and GitHub Codespaces.

## Attribution

- Developed and tested in collaboration with Great Lakes Higher Education Corporation and Nelnet Inc. and Affiliates
- Icons from [Font Awesome](https://fontawesome.com/), see their [license](https://fontawesome.com/license)

# shark-ng-table

![Build Status](https://github.com/Quantas/shark-ng-table/actions/workflows/node.js.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/Quantas/shark-ng-table/badge.svg?branch=master)](https://coveralls.io/github/Quantas/shark-ng-table?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/Quantas/shark-ng-table/badge.svg)](https://snyk.io/test/github/Quantas/shark-ng-table)

[![npm version](https://badge.fury.io/js/shark-ng-table.svg)][npm-badge-url]
[![npm](https://img.shields.io/npm/l/shark-ng-table.svg)][npm-badge-url]
[![npm](https://img.shields.io/npm/dm/shark-ng-table.svg)][npm-badge-url]

[npm-badge-url]: https://www.npmjs.com/package/shark-ng-table

A robust table for Angular built with Accessibility in mind.

Section508 and WCAG 2.0 AA compliant.

## Versions

| Angular Version | shark-ng-table Version |
| --------------- | ---------------------- |
| &gt;= 6.0.0     | >= 6.0.0               |
| &gt;= 16.0.0    | >= 7.0.0               |

## Samples

There are a number of samples available that can be viewed here: https://www.quantasnet.com/shark-ng-table/

We also have a running example over on [Stackblitz](https://stackblitz.com/edit/shark-ng-table-demo)

## Features

- Filtering (Global and Column Specific)
- Sorting
- Pagination
- Footer Headers
- Informational Footer
- Column reordering
- Column hide/show
- Custom cell rendering with user provided Component or Pipe

## Installing

```bash
npm install --save shark-ng-table
```

This will install the latest version of `shark-ng-table`.

## Documentation

 - [Setup <shark-table>](usage/setup.md)
 - [Styling <shark-table>](usage/styling.md)
 - [<shark-table> Options](usage/shark-table-options.md)
 - [Column Options](usage/column-options.md)
 - [Child Rows](usage/child-rows.md)
 - [Developer Guide](usage/developers.md)
 - [Change Log](CHANGELOG.md)

## Dev Environment

shark-ng-table also provides a `.devcontainer` folder for support of Visual Studio Code's Remote-Container support. This will setup a full shark-ng-table dev
environment automatically. You should be able to run `npm run start` inside the dev enviornment and expose the port, 4200, and be able to do live development
on the table.

## Publishing a new version
 - Make sure all tests are passing
 - Make sure the sample site works in the VSCode devcontainer, open the container, run `npm start` and make sure the app at https://localhost:4200 works
 - `npm run clean && npm run build`
 - Make sure the dist directory looks good by running `npm publish dist/ --dry-run`, there should be folders like `fesm2022`, `esm2022` etc.
 - Run `npm publish dist/`
 - Make sure to run the npm script for deploying to GitHub pages as well. TODO: make this automated

## Attribution

 - Developed and tested in collaboration with Great Lakes Higher Education Corporation and Nelnet Inc. and Affiliates
 - We use the classes provided by [Font Awesome](https://fontawesome.com/) to add icons to a few parts of the table, their License is [here](https://fontawesome.com/license).

# Getting started

## Install

```bash
npm install shark-ng-table
```

shark-ng-table 8.x supports Angular 21 and 22. See the [README](https://github.com/Quantas/shark-ng-table#versions) for older Angular versions.

## Import the component

`SharkTableComponent` is a standalone component. Add it to the `imports` of the component that uses it:

```typescript
import { Component } from '@angular/core';
import { SharkColumn, SharkTableComponent } from 'shark-ng-table';

@Component({
  selector: 'app-cars',
  imports: [SharkTableComponent],
  templateUrl: './cars.component.html'
})
export class CarsComponent {

  cars = [
    { year: 2017, make: 'Subaru', model: 'WRX' },
    { year: 2017, make: 'Honda', model: 'Civic' },
    { year: 2016, make: 'Toyota', model: 'Camry' }
  ];

  columns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make' },
    { header: 'Model', property: 'model' }
  ];
}
```

Still using NgModules? Import `SharkTableModule` instead; it exports the same components.

## Add the table to your template

```html
<shark-table
  caption="Cars"
  [data]="cars"
  [columns]="columns"
  [localPagingSize]="25"
></shark-table>
```

Give every table a meaningful `caption`. Screen readers announce it when someone reaches the table. Use `[hideCaption]="true"` to hide it visually and keep it for assistive technology.

## Add the stylesheet

The table needs its stylesheet. See [Styling](styling.md).

## Row links need a router

Row links (`linkTarget` / `linkKey`) navigate with the Angular router, so your application needs `provideRouter(...)`. Tables without row links work without a router.

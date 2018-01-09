# Setup

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
    {col1: '10', col2: 'b', col3: 'c' }
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
  [localFilter]="true"
  [columns]="tableColumns"
  [localPaging]="true"
  [localPagingSize]="50"
>
</shark-table>
```

This will create the table with the `tableColumns` definitions and the `testData` as the source.

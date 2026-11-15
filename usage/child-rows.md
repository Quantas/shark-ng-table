# Child rows

Child rows are rendered with a user-provided custom Component that implements `SharkDynamicContents`. An example of a custom component could be as simple as:

```typescript
import { Component } from '@angular/core';
import { SharkDynamicContents } from 'shark-ng-table';

@Component({
  template: `
    <table>
      <tr>
        <td>{{ data.col1 }}</td>
        <td>{{ data.col2 }}</td>
        <td>{{ data.col3 }}</td>
      </tr>
    </table>
  `
})
export class ChildDataComponent implements SharkDynamicContents {
  data: any;
  
  childOpen(open: boolean): void {
    // load more data when open is true, if needed
  }
}
```

This example would render your entire row as a table inside the child row.

To enable child rows, set `childRows` and `childComponent` on `<shark-table>`. Assign the component class to a field so the template can bind it. Standalone components need no registration.

The table calls `childOpen(true)` when the row opens and `childOpen(false)` when it closes, so you can load more data on demand.

```typescript
import { SharkTableComponent } from 'shark-ng-table';
import { MyChildComponent } from './child.component';

@Component({
   imports: [SharkTableComponent],
   template: `
     <shark-table
         [data]="testData"
         [columns]="tableColumns"
         [childRows]="true"
         [childComponent]="childComponent"
     >
     </shark-table>
   `
})
export class MyComponent {
   childComponent = MyChildComponent
}
```

# Child Row Setup and Usage

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
  
  childOpen(value: boolean): void {
  }
}
```

This example would render your entire row as a table inside the child row.

To enable child rows, you will need to set 2 properties to your `<shark-table>` declaration, `childRows` and `childComponent`. To set `childComponent` we need to add an instance variable to the Component that is rendering this template:

There is also a function, childOpen, that will be called by the table when your child row is open, if you need to call a service or something to get more data.

```typescript

import { MyChildComponent } from './child.component';

@Component({
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

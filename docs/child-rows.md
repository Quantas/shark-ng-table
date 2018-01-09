# Child Row Setup and Usage

Child rows are rendered with a user-provided custom Component that implements `SharkChildContents`. An example of a custom component could be as simple as:

```typescript
import { Component } from '@angular/core';
import { SharkChildContents } from '../table';

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
export class ChildDataComponent implements SharkChildContents {
  data: any;
}
```

This example would render your entire row as a table inside the child row.

To enable child rows, you will need to set 2 properties to your `<shark-table>` declaration, `childRows` and `childComponent`. To set `childComponent` we need to add an instance variable to the Component that is rendering this template:

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

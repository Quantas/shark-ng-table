import { Component } from '@angular/core';

@Component({
  selector: 'shark-root',
  template: `
    <mat-toolbar color="primary">
      <span>shark-ng-table Samples</span>
    </mat-toolbar>
    <div class="wrapper">
      <div class="menu">
        <ul>
          <li><a [routerLink]="['basic']">Basic</a></li>
          <li><a [routerLink]="['everything']">Everything</a></li>
          <li><a [routerLink]="['cellstyle']">Cell Styling</a></li>
          <li><a [routerLink]="['filterable']">Filterable</a></li>
          <li><a [routerLink]="['pageable']">Pageable</a></li>
          <li><a [routerLink]="['paging-filtering']">Paging and Filtering</a></li>
          <li><a [routerLink]="['column-filtering']">Column Filtering</a></li>
          <li><a [routerLink]="['column-ordering']">Column Ordering</a></li>
          <li><a [routerLink]="['column-picker']">Column Picker</a></li>
          <li><a [routerLink]="['child-rows']">Child Rows</a></li>
          <li><a [routerLink]="['custom-cells']">Custom Cells</a></li>
        </ul>
      </div>
      <div class="main">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      li {
        list-style: none;
      }
      ul {
        padding-left: 1rem;
      }
      .wrapper {
        margin-top: 1rem;
        display: flex;
      }
      .menu {
        margin-right: 2rem;
        height: 100%;
        width: 12rem;
      }
    `
  ]
})
export class AppComponent {}

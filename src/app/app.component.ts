import { Component } from '@angular/core';

@Component({
  selector: 'shark-root',
  template: `
    <header>
      <div class="title">
        shark-ng-table Samples
      </div>
    </header>
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
      header {
        width: 99%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
        padding-top: 0.5rem;
        padding-left: 0.5rem;
      }
      .title {
        padding: 8px 16px;
        font-size: 1.5rem;
      }
      li {
        list-style: none;
      }
      ul {
        padding-left: 1rem;
      }
      .wrapper {
        margin-top: 4rem;
      }
      .menu {
        float: left;
        margin-right: 2rem;
        height: 100%;
        width: 12rem;
      }
      .main {
        float: left;
      }
    `
  ]
})
export class AppComponent {}

import { Component } from '@angular/core';

@Component({
  selector: 'shark-root',
  template: `
    <mat-toolbar color="primary">
      <span>shark-ng-table Samples</span>
    </mat-toolbar>
    <div class="wrapper">
      <div class="menu">
        <mat-nav-list>
          <a mat-list-item [routerLink]="['basic']">Basic</a>
          <a mat-list-item [routerLink]="['everything']">Everything</a>
          <a mat-list-item [routerLink]="['cellstyle']">Cell Styling</a>
          <a mat-list-item [routerLink]="['filterable']">Filterable</a>
          <a mat-list-item [routerLink]="['pageable']">Pageable</a>
          <a mat-list-item [routerLink]="['paging-filtering']">Paging and Filtering</a>
          <a mat-list-item [routerLink]="['column-filtering']">Column Filtering</a>
          <a mat-list-item [routerLink]="['column-ordering']">Column Ordering</a>
          <a mat-list-item [routerLink]="['column-picker']">Column Picker</a>
          <a mat-list-item [routerLink]="['child-rows']">Child Rows</a>
          <a mat-list-item [routerLink]="['custom-cells']">Custom Cells</a>
        </mat-nav-list>
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

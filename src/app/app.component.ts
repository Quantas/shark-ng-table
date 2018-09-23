import { Component } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'shark-root',
  template: `
    <mat-toolbar class="header" color="primary">
      <button mat-icon-button (click)="sidenav.toggle()" fxShow.sm="true" fxShow.gt-sm="false">
        <mat-icon>menu</mat-icon>
      </button>
      <span>shark-ng-table samples</span>
      <span class="toolbar-filler"></span>
      <a href="https://github.com/Quantas/shark-ng-table" target="_blank" mat-button>
        <span>
          <img class="header-logo" src="assets/github-circle-white-transparent.svg">
          <span fxShow.lt-md="false" fxShow.gt-sm="true">GitHub</span>
        </span>
      </a>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav [(mode)]="over" [(opened)]="opened" class="bottom-to-top">
        <mat-nav-list (click)="closeNav()">
          <a mat-list-item [routerLink]="['basic']">Basic</a>
          <a mat-list-item [routerLink]="['cellstyle']">Cell Styling</a>
          <a mat-list-item [routerLink]="['child-rows']">Child Rows</a>
          <a mat-list-item [routerLink]="['column-filtering']">Column Filtering</a>
          <a mat-list-item [routerLink]="['column-ordering']">Column Ordering</a>
          <a mat-list-item [routerLink]="['column-picker']">Column Picker</a>
          <a mat-list-item [routerLink]="['content-projection']">Content Projection</a>
          <a mat-list-item [routerLink]="['custom-cells']">Custom Cells</a>
          <a mat-list-item [routerLink]="['data-export']">Data Export</a>
          <a mat-list-item [routerLink]="['everything']">Everything</a>
          <a mat-list-item [routerLink]="['filterable']">Filterable</a>
          <a mat-list-item [routerLink]="['large']">Large</a>
          <a mat-list-item [routerLink]="['pageable']">Pageable</a>
          <a mat-list-item [routerLink]="['paging-filtering']">Paging and Filtering</a>
          <a mat-list-item [routerLink]="['two-tables']">Two Tables</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="wrapper">
          <div class="main">
            <router-outlet></router-outlet>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <mat-toolbar class="footer" color="primary">
      &copy; 2018 Andrew Landsverk and Nelnet Inc. and Affiliates.
    </mat-toolbar>
  `,
  styles: [
    `
      .wrapper {
        margin: 1rem 2rem 2rem 2rem;
      }

      .header {
        font-family: Roboto,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
      }

      .header-logo {
        height: 26px;
        margin: 0 4px 3px 0;
        vertical-align: middle;
      }

      .toolbar-filler {
        flex: 1 1 auto;
      }

      .footer {
        font-size: 12px;
        font-weight: normal;
        height: 2rem;
      }
    `
  ]
})
export class AppComponent {

  opened = false;
  over: string;

  constructor(media: ObservableMedia) {
    media.asObservable().subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  closeNav(): void {
    if (this.over === 'over') {
      this.opened = false;
    }
  }
}

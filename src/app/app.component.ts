import { Component, OnDestroy } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs';

import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'shark-root',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()" fxShow.sm="true" fxShow.gt-sm="false">
        <mat-icon>menu</mat-icon>
      </button>
      <span>shark-ng-table samples</span>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav [(mode)]="over" [(opened)]="opened" class="bottom-to-top">
        <mat-nav-list>
          <a mat-list-item [routerLink]="['basic']">Basic</a>
          <a mat-list-item [routerLink]="['cellstyle']">Cell Styling</a>
          <a mat-list-item [routerLink]="['child-rows']">Child Rows</a>
          <a mat-list-item [routerLink]="['column-filtering']">Column Filtering</a>
          <a mat-list-item [routerLink]="['column-ordering']">Column Ordering</a>
          <a mat-list-item [routerLink]="['column-picker']">Column Picker</a>
          <a mat-list-item [routerLink]="['custom-cells']">Custom Cells</a>
          <a mat-list-item [routerLink]="['data-export']">Data Export</a>
          <a mat-list-item [routerLink]="['everything']">Everything</a>
          <a mat-list-item [routerLink]="['filterable']">Filterable</a>
          <a mat-list-item [routerLink]="['pageable']">Pageable</a>
          <a mat-list-item [routerLink]="['paging-filtering']">Paging and Filtering</a>
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
  `,
  styles: [
    `
      .wrapper {
        margin-top: 1rem;
        margin-left: 1rem;
        margin-bottom: 2rem;
        display: flex;
      }
    `
  ]
})
export class AppComponent implements OnDestroy {

  destroy = new Subject<boolean>();
  opened = false;
  over: string;

  constructor(media: ObservableMedia) {
    media.asObservable().takeUntil(this.destroy).subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}

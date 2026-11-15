/*
 * Test fixture for the Playwright accessibility suite (e2e/).
 *
 * Renders shark-ng-table with ONLY the library's default stylesheet, so axe checks
 * (including color contrast) and keyboard tests run against what users get out of the box.
 * Each table has a fixed tableId so tests can target it.
 */
import { Component, input } from '@angular/core';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';
import { Page, SharkColumn, SharkDynamicContents, SharkTableComponent } from 'shark-ng-table';

const MAKES = ['Subaru', 'Honda', 'Toyota'];
const MODELS = ['WRX', 'Civic', 'Camry', 'Outback', 'Accord', 'Corolla'];

function cars(count: number) {
  return Array.from({ length: count }, (_x, i) => ({
    id: i + 1,
    year: 2015 + (i % 4),
    make: MAKES[i % MAKES.length],
    model: MODELS[i % MODELS.length]
  }));
}

function columns(): SharkColumn[] {
  return [
    { header: 'Id', property: 'id' },
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make' },
    { header: 'Model', property: 'model' }
  ];
}

@Component({
  selector: 'fixture-child',
  template: `<p>Details for car {{ data.id }}: {{ data.year }} {{ data.make }} {{ data.model }}</p>`
})
export class ChildDetailsComponent implements SharkDynamicContents {
  data: any;
  childOpen(): void {}
}

@Component({
  selector: 'fixture-tables',
  imports: [SharkTableComponent],
  template: `
    <h1>shark-ng-table accessibility fixture</h1>

    <section aria-labelledby="h-default">
      <h2 id="h-default">Default options</h2>
      <shark-table tableId="default" caption="Cars with paging and filtering"
                   [data]="paged" [columns]="defaultColumns" [columnPicker]="true"
                   [localPagingSize]="5" [localPagingOptions]="[5, 10, 25]"></shark-table>
    </section>

    <section aria-labelledby="h-ordering">
      <h2 id="h-ordering">Column ordering and column filtering</h2>
      <shark-table tableId="ordering" caption="Cars with column ordering"
                   [data]="small" [columns]="orderingColumns" [columnOrdering]="true" [columnFiltering]="true"></shark-table>
    </section>

    <section aria-labelledby="h-children">
      <h2 id="h-children">Child rows</h2>
      <shark-table tableId="children" caption="Cars with details"
                   [data]="small" [columns]="childColumns" [childRows]="true" [childComponent]="child"></shark-table>
    </section>

    <section aria-labelledby="h-links">
      <h2 id="h-links">Row links</h2>
      <shark-table tableId="links" caption="Cars that link to a detail page"
                   [data]="small" [columns]="linkColumns" linkTarget="/detail" linkKey="id"></shark-table>
    </section>

    <section aria-labelledby="h-server">
      <h2 id="h-server">Server side page</h2>
      <shark-table tableId="server" caption="Cars from the server"
                   [data]="serverPage" [columns]="serverColumns" [serverSideData]="true" [localPaging]="false"></shark-table>
    </section>

    <section aria-labelledby="h-empty">
      <h2 id="h-empty">Empty table</h2>
      <shark-table tableId="empty" caption="Cars (none yet)" [data]="[]" [columns]="emptyColumns"></shark-table>
    </section>
  `
})
export class FixtureTablesComponent {
  readonly paged = cars(23);
  readonly small = cars(4);
  readonly serverPage: Page = { number: 1, size: 4, totalPages: 3, totalElements: 12, numberOfElements: 4, content: cars(4) };
  readonly child = ChildDetailsComponent;

  // Each table gets its own column objects: the table stores sort/filter state on them.
  readonly defaultColumns = columns();
  readonly orderingColumns = columns();
  readonly childColumns = columns();
  readonly linkColumns = columns();
  readonly serverColumns = columns();
  readonly emptyColumns = columns();
}

@Component({
  selector: 'fixture-detail',
  imports: [RouterLink],
  template: `<h1>Car {{ id() }}</h1><p><a routerLink="/">Back to the tables</a></p>`
})
export class DetailComponent {
  readonly id = input<string>();
}

@Component({
  selector: 'fixture-root',
  imports: [RouterOutlet],
  template: `<main><router-outlet /></main>`
})
export class FixtureRootComponent {}

export const routes: Routes = [
  { path: '', component: FixtureTablesComponent, title: 'shark-ng-table accessibility fixture' },
  { path: 'detail/:id', component: DetailComponent, title: 'Car detail' }
];

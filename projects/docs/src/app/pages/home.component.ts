import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharkColumn, SharkTableComponent } from 'shark-ng-table';
import { TableDataService } from '../data.service';
import { highlight } from '../shared/highlight';

@Component({
  selector: 'docs-home',
  imports: [SharkTableComponent, RouterLink],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">An Angular data table that works with a keyboard and a screen reader.</h1>
      <p class="lede">
        Sorting, filtering, paging, column picking and child rows, with every change announced to assistive technology.
        Built to meet WCAG 2.2 AA, and <a routerLink="/guide/accessibility">tested</a> with axe and keyboard tests in a real browser on every change.
      </p>
    </section>

    <section class="demo" aria-labelledby="demo-title">
      <h2 id="demo-title">Try it without a mouse</h2>
      <p>Press <kbd>Tab</kbd> to reach the filter, the sort buttons and the page buttons below.</p>
      <div class="demo-grid">
        <div class="demo-table">
          <shark-table
            tableId="home"
            caption="Cars by year, make and model"
            [data]="cars"
            [columns]="columns"
            [columnPicker]="true"
            [localPagingSize]="5"
            [localPagingOptions]="[5, 10, 20]"
          ></shark-table>
        </div>
        <aside class="announcer" aria-labelledby="announcer-title">
          <h3 id="announcer-title">What a screen reader hears</h3>
          @if (announcements().length === 0) {
            <p class="announcer-empty">Sort a column, type in the filter or change the page. The table's announcements appear here.</p>
          } @else {
            <ul class="announcer-log">
              @for (message of announcements(); track $index) {
                <li>{{ message }}</li>
              }
            </ul>
          }
        </aside>
      </div>
    </section>

    <section class="install" aria-labelledby="install-title">
      <h2 id="install-title">Install</h2>
      <pre tabindex="0"><code [innerHTML]="installHtml"></code></pre>
      <p>Then import the standalone component and add the stylesheet. <a routerLink="/guide/setup">Read the setup guide</a>.</p>
      <pre tabindex="0"><code [innerHTML]="usageHtml"></code></pre>
    </section>

    <section class="versions" aria-labelledby="versions-title">
      <h2 id="versions-title">Which version do I need?</h2>
      <table class="plain">
        <thead><tr><th scope="col">Angular</th><th scope="col">shark-ng-table</th></tr></thead>
        <tbody>
          <tr><td>21 and 22</td><td>8.x</td></tr>
          <tr><td>16 to 20</td><td>7.x</td></tr>
          <tr><td>6 to 15</td><td>6.x</td></tr>
        </tbody>
      </table>
      <p>Coming from 7.x? <a routerLink="/guide/migrating">See what changed in 8.0</a>.</p>
    </section>
  `
})
export class HomeComponent implements AfterViewInit {

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly cars = inject(TableDataService).getTestData();

  readonly columns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make' },
    { header: 'Model', property: 'model' },
    { header: 'VIN', property: 'vin' }
  ];

  readonly announcements = signal<string[]>([]);

  readonly installHtml = highlight('npm install shark-ng-table', 'bash');

  readonly usageHtml = highlight(`import { Component } from '@angular/core';
import { SharkColumn, SharkTableComponent } from 'shark-ng-table';

@Component({
  selector: 'app-cars',
  imports: [SharkTableComponent],
  template: \`<shark-table [data]="cars" [columns]="columns" caption="Cars"></shark-table>\`
})
export class CarsComponent {
  cars = [{ year: 2017, make: 'Subaru', model: 'WRX' }];
  columns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make' },
    { header: 'Model', property: 'model' }
  ];
}`, 'typescript');

  /** Mirrors the table's (visually hidden) aria-live region so sighted visitors can see what is announced. */
  ngAfterViewInit(): void {
    const region = this.host.nativeElement.querySelector('#shark-table-aria-notifier-home');
    if (!region) {
      return;
    }
    const observer = new MutationObserver(() => {
      const message = region.textContent?.trim();
      if (message) {
        this.announcements.update(list => [message, ...list].slice(0, 5));
      }
    });
    observer.observe(region, { characterData: true, childList: true, subtree: true });
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}

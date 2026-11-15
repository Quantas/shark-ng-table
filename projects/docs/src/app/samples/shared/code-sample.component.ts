import { Component, ElementRef, Input, OnInit, computed, inject, signal, viewChildren } from '@angular/core';
import { SharkColumn } from 'shark-ng-table';
import { TableDataService } from '../../data.service';
import { dedent, highlight } from '../../shared/highlight';

interface CodeTab {
  id: string;
  label: string;
  language: string;
  html: string;
}

let nextId = 0;

/**
 * Frame for every example page: a title, the live example (projected content) and the source as tabs.
 */
@Component({
  selector: 'shark-table-code-sample',
  template: `
    <header class="example-header">
      <h1>{{ pageTitle }}</h1>
      @if (description) {
        <p class="lede">{{ description }}</p>
      }
    </header>

    <section class="live" [attr.aria-labelledby]="uid + '-live'">
      <h2 [id]="uid + '-live'">Live example</h2>
      <ng-content></ng-content>
    </section>

    @if (tabs().length > 0) {
      <section class="source" [attr.aria-labelledby]="uid + '-source'">
        <h2 [id]="uid + '-source'">Source</h2>
        <div role="tablist" aria-label="Source files" class="tabs">
          @for (tab of tabs(); track tab.id; let i = $index) {
            <button #tabButton role="tab" type="button"
                    [id]="tab.id + '-tab'"
                    [attr.aria-selected]="i === selected()"
                    [attr.aria-controls]="tab.id + '-panel'"
                    [tabIndex]="i === selected() ? 0 : -1"
                    (click)="selected.set(i)" (keydown)="onTabKey($event)">{{ tab.label }}</button>
          }
        </div>
        @for (tab of tabs(); track tab.id; let i = $index) {
          <div role="tabpanel" class="code-panel" tabindex="0"
               [id]="tab.id + '-panel'"
               [attr.aria-labelledby]="tab.id + '-tab'"
               [hidden]="i !== selected()">
            <pre><code [innerHTML]="tab.html"></code></pre>
          </div>
        }
      </section>
    }
  `
})
export class CodeSampleComponent implements OnInit {

  private readonly tableDataService = inject(TableDataService);
  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  readonly uid = `example-${++nextId}`;

  @Input()
  pageTitle: string;

  @Input()
  description: string;

  @Input()
  htmlSample: string;

  @Input()
  tsSample: string;

  @Input()
  cssSample: string;

  readonly selected = signal(0);

  private readonly sources = signal<{ label: string; language: string; code?: string }[]>([]);

  readonly tabs = computed<CodeTab[]>(() => this.sources()
    .filter(source => !!source.code && source.code.trim().length > 0)
    .map(source => ({
      id: `${this.uid}-${source.language}`,
      label: source.label,
      language: source.language,
      html: highlight(dedent(source.code!), source.language)
    })));

  testData: any[] = [];

  tableColumns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make' },
    { header: 'Model', property: 'model' }
  ];

  ngOnInit(): void {
    this.testData = this.tableDataService.getTestData();
    this.sources.set([
      { label: 'HTML', language: 'html', code: this.htmlSample },
      { label: 'TypeScript', language: 'typescript', code: this.tsSample },
      { label: 'CSS', language: 'css', code: this.cssSample }
    ]);
  }

  /** Arrow keys, Home and End move between tabs, following the WAI-ARIA tabs pattern. */
  onTabKey(event: KeyboardEvent): void {
    const count = this.tabs().length;
    const moves: Record<string, number> = {
      ArrowRight: (this.selected() + 1) % count,
      ArrowLeft: (this.selected() - 1 + count) % count,
      Home: 0,
      End: count - 1
    };
    if (event.key in moves) {
      event.preventDefault();
      this.selected.set(moves[event.key]);
      this.tabButtons()[this.selected()]?.nativeElement.focus();
    }
  }
}

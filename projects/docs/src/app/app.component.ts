import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { EXAMPLES, GUIDES } from './nav';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'docs-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <a class="skip-link" href="#main" (click)="skipToMain($event)">Skip to content</a>

    <header class="site-header">
      <a routerLink="/" class="wordmark" aria-label="shark-ng-table home">
        <svg class="fin" viewBox="0 0 32 24" aria-hidden="true"><path d="M2 22 C10 20 16 12 18 2 C21 9 25 16 30 22 Z"/></svg>
        <span>shark-ng-table</span>
      </a>
      <nav class="header-links" aria-label="Project">
        <a href="https://www.npmjs.com/package/shark-ng-table" rel="noopener">npm</a>
        <a href="https://github.com/sharkops-io/shark-ng-table" rel="noopener">
          <img src="github.svg" alt="" width="18" height="18"> GitHub
        </a>
      </nav>
      <button type="button" class="theme-toggle" (click)="themes.toggle()"
              [attr.aria-label]="themes.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'">
        @if (themes.theme() === 'dark') {
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <span class="theme-label">Light theme</span>
        } @else {
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5 8.5 8.5 0 1 0 20.5 14.6Z"/></svg>
          <span class="theme-label">Dark theme</span>
        }
      </button>
      <button type="button" class="menu-toggle" [attr.aria-expanded]="menuOpen()" aria-controls="site-nav" (click)="menuOpen.set(!menuOpen())">
        {{ menuOpen() ? 'Close menu' : 'Menu' }}
      </button>
    </header>

    <div class="layout">
      <nav id="site-nav" class="sidebar" [class.open]="menuOpen()" aria-label="Documentation">
        <h2 id="nav-guide">Guide</h2>
        <ul aria-labelledby="nav-guide">
          @for (guide of guides; track guide.path) {
            <li><a [routerLink]="'/guide/' + guide.path" routerLinkActive="active" ariaCurrentWhenActive="page">{{ guide.title }}</a></li>
          }
        </ul>
        <h2 id="nav-examples">Examples</h2>
        <ul aria-labelledby="nav-examples">
          @for (example of examples; track example.path) {
            <li><a [routerLink]="'/' + example.path" routerLinkActive="active" ariaCurrentWhenActive="page">{{ example.title }}</a></li>
          }
        </ul>
        <ul class="mobile-links" aria-label="Project">
          <li><a href="https://www.npmjs.com/package/shark-ng-table" rel="noopener">npm</a></li>
          <li><a href="https://github.com/sharkops-io/shark-ng-table" rel="noopener">GitHub</a></li>
        </ul>
      </nav>

      <main id="main" tabindex="-1">
        <router-outlet />
      </main>
    </div>

    <footer class="site-footer">
      <p>MIT licensed. &copy; Andrew Landsverk and Nelnet Inc. and Affiliates.</p>
      <p>Icons from <a href="https://fontawesome.com/license" rel="noopener">Font Awesome</a>.</p>
    </footer>
  `
})
export class AppComponent {
  readonly guides = GUIDES;
  readonly examples = EXAMPLES;
  readonly menuOpen = signal(false);
  readonly themes = inject(ThemeService);

  constructor() {
    inject(Router).events
      .pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.menuOpen.set(false));
  }

  /** With hash routing a plain "#main" link would be treated as a route, so move focus manually. */
  skipToMain(event: Event): void {
    event.preventDefault();
    document.getElementById('main')?.focus();
  }
}

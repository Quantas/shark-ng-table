import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'shark-docs-theme';

/**
 * Light/dark theme for the docs site.
 *
 * With no saved choice the site follows the operating system. Choosing the theme the OS already uses clears the
 * saved choice, so the site goes back to following the system. index.html applies the saved theme before Angular
 * starts, so there is no flash of the wrong theme.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly media = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');

  private readonly saved = signal<Theme | null>(readSaved());
  private readonly systemDark = signal(this.media?.matches ?? false);

  readonly theme = computed<Theme>(() => this.saved() ?? (this.systemDark() ? 'dark' : 'light'));

  constructor() {
    this.media?.addEventListener('change', event => this.systemDark.set(event.matches));

    effect(() => {
      const saved = this.saved();
      const root = this.document.documentElement;
      if (saved) {
        root.setAttribute('data-theme', saved);
      } else {
        root.removeAttribute('data-theme');
      }
      try {
        if (saved) {
          localStorage.setItem(STORAGE_KEY, saved);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // Storage can be unavailable (private mode, blocked site data); the theme still applies for this visit.
      }
    });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    const system: Theme = this.systemDark() ? 'dark' : 'light';
    this.saved.set(next === system ? null : next);
  }
}

function readSaved(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

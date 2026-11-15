import { Component, computed, input } from '@angular/core';
import { Marked } from 'marked';
import { highlight } from '../shared/highlight';
import { GUIDES } from '../nav';

const marked = new Marked({
  gfm: true,
  renderer: {
    code({ text, lang }) {
      const language = (lang ?? '').trim().split(/\s+/)[0];
      return `<pre tabindex="0"><code class="hljs language-${language}">${highlight(text, language)}</code></pre>`;
    },
    link({ href, text }) {
      // Links between guides point at the .md files (so they work on GitHub); map them to routes here.
      const file = href.split('/').pop()!.replace(/#.*$/, '');
      const guide = GUIDES.find(g => g.file === file);
      if (guide) {
        return `<a href="#/guide/${guide.path}">${text}</a>`;
      }
      const external = /^https?:/.test(href);
      return `<a href="${href}"${external ? ' rel="noopener"' : ''}>${text}</a>`;
    }
  }
});

/**
 * Renders one of the markdown guides from /usage. The markdown stays the single source of truth for both
 * GitHub and this site.
 */
@Component({
  selector: 'docs-guide-page',
  template: `<article class="prose" [innerHTML]="html()"></article>`
})
export class GuidePageComponent {
  /** Bound from the route data via withComponentInputBinding(). */
  readonly markdown = input.required<string>();

  readonly html = computed(() => marked.parse(this.markdown(), { async: false }) as string);
}

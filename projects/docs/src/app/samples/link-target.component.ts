import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <h1>Row {{ id() }}</h1>
    <p>You followed a row link. The table passed this row's <code>id</code> to <code>router.navigate</code>.</p>
    <p><a routerLink="/row-link">Back to the row links example</a></p>
  `
})
export class LinkTargetComponent {
  /** Bound from the :id route parameter via withComponentInputBinding(). */
  readonly id = input<string>();
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div>
      <h1>Sample for Row Link</h1>
      
      <p>This row is ID {{ id }}</p>
      
      <a routerLink="/row-link">Return to Row Link Example</a>
    </div>
  `,
  styles: [
    `
      div {
        min-height: 75vh;
      }
    
    `
  ]
})
export class LinkTargetComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
}

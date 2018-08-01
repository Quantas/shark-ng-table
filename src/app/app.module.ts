import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from "./app.component";
import { SharkTableModule } from "./table";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    SharkTableModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

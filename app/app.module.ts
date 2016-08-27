import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }   from './app.component';

import { GameComponent }      from './game.component';

import { CardService }  from './card.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    GameComponent
  ],
  providers: [
    CardService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
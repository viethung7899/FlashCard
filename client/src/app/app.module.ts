import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListOfSetsComponent } from './list-of-sets/list-of-sets.component';
import { ListOfCardsComponent } from './list-of-cards/list-of-cards.component';
import { CardComponent } from './list-of-cards/card/card.component';
import { SetComponent } from './list-of-sets/set/set.component';
import { AddModalComponent } from './list-of-cards/add-modal/add-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListOfSetsComponent,
    ListOfCardsComponent,
    CardComponent,
    SetComponent,
    AddModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

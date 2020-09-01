import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'

import { AppRoutingModule } from './app-routing.module'
import { SetListComponent } from './flashcards-component/sets/set-list/set-list.component'
import { SetItemComponent } from './flashcards-component/sets/set-item/set-item.component'
import { CardsDetailComponent } from './flashcards-component/cards/cards-detail/cards-detail.component'
import { CardItemComponent } from './flashcards-component/cards/card-item/card-item.component'
import { AddCardFormComponent } from './flashcards-component/cards/add-card-form/add-card-form.component'
import { RegisterFormComponent } from './users-component/register-form/register-form.component'
import { LogInFormComponent } from './users-component/log-in-form/log-in-form.component'
import { AuthInterceptor } from './_services/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SetListComponent,
    SetItemComponent,
    CardsDetailComponent,
    CardItemComponent,
    AddCardFormComponent,
    RegisterFormComponent,
    LogInFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

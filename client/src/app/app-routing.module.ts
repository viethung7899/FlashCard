import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SetListComponent } from './flashcards-component/sets/set-list/set-list.component'
import { CardsDetailComponent } from './flashcards-component/cards/cards-detail/cards-detail.component'
import { RegisterFormComponent } from './users-component/register-form/register-form.component'
import { LogInFormComponent } from './users-component/log-in-form/log-in-form.component'
import { AuthGuard } from './_guards/auth.guard'

const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'login',
    component: LogInFormComponent,
  },
  {
    path: 'sets',
    children: [
      { path: '', component: SetListComponent },
      { path: ':id', component: CardsDetailComponent },
    ],
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

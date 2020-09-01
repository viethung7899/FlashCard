import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SetListComponent } from './flashcards-component/sets/set-list/set-list.component'
import { CardsDetailComponent } from './flashcards-component/cards/cards-detail/cards-detail.component'
import { RegisterFormComponent } from './users-component/register-form/register-form.component'
import { LogInFormComponent } from './users-component/log-in-form/log-in-form.component'
import { AuthGuard } from './_guards/auth.guard'
import {ErrorComponent} from "./shared/error/error.component";
import {SetResolverService} from "./_resolvers/set-resolver.service";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/sets',
    pathMatch: 'full'
  },
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
      { path: ':id', component: CardsDetailComponent, resolve: [SetResolverService] },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

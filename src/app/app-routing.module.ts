import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { LogInComponent } from "./pages/log-in/log-in.component";
import { SignUpComponent} from "./pages/sign-up/sign-up.component";
import { NewReservationComponent} from "./pages/new-reservation/new-reservation.component";
import { UserReservationsComponent} from "./pages/user-reservations/user-reservations.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'tabTitles.home',
    component: HomeComponent,
    children: [
      {
        path: 'menu',
        component: HomeComponent
      },
      {
        path: 'about-us',
        component: HomeComponent
      }
    ]
  },
  { path: 'sign-up', title: 'tabTitles.signup', component: SignUpComponent },
  { path: 'log-in', title: 'tabTitles.login', component: LogInComponent },
  { path: 'user-reservations', title: 'tabTitles.reservations', component: UserReservationsComponent },
  { path: 'new-reservation', title: 'tabTitles.newReservation', component: NewReservationComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

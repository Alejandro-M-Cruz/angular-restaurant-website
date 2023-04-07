import {Injectable, NgModule} from '@angular/core';
import {RouterModule, RouterStateSnapshot, Routes, TitleStrategy} from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { LogInComponent } from "./pages/log-in/log-in.component";
import { SignUpComponent} from "./pages/sign-up/sign-up.component";
import { NewReservationComponent} from "./pages/new-reservation/new-reservation.component";
import { UserReservationsComponent} from "./pages/user-reservations/user-reservations.component";
import {MenuComponent} from "./pages/home/components/menu/menu.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ComplaintsComponent} from "./pages/complaints/complaints.component";
import {Title} from "@angular/platform-browser";
import {TranslocoService} from "@ngneat/transloco";
import {MyAccountComponent} from "./pages/my-account/my-account.component";
import {AdminReservationsComponent} from "./pages/reservations-admin/admin-reservations.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', title: 'home', component: HomeComponent, children: [
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'about-us',
        component: HomeComponent
      },
      {
        path: 'contact',
        component: FooterComponent
      }
    ]
  },
  { path: 'my-account', title: 'myAccount', component: MyAccountComponent },
  { path: 'sign-up', title: 'signup', component: SignUpComponent },
  { path: 'log-in', title: 'login', component: LogInComponent },
  { path: 'user-reservations', title: 'reservations', component: AdminReservationsComponent },
  { path: 'new-reservation', title: 'admin', component: AdminReservationsComponent },
  { path: 'new-reservation', title: 'newReservation', component: NewReservationComponent },
  { path: 'complaints', title: 'complaints', component: ComplaintsComponent },
  { path: '**', redirectTo: '/home' }
];

@Injectable({providedIn: 'root'})
export class MultiLanguageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, private readonly translateService: TranslocoService) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.translateService.selectTranslate('tabTitles.' + title).subscribe((t: string) => {
        this.title.setTitle(t)
      })
    } else {
      this.title.setTitle('La Nostra Casa')
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: TitleStrategy, useClass: MultiLanguageTitleStrategy},
  ]
})
export class AppRoutingModule {
}

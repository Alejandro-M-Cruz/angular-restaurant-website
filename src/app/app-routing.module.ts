import {inject, Injectable, NgModule} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn, Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy, UrlTree
} from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { LogInComponent } from "./pages/log-in/log-in.component";
import { SignUpComponent} from "./pages/sign-up/sign-up.component";
import { NewReservationComponent} from "./pages/new-reservation/new-reservation.component";
import { UserReservationsComponent} from "./pages/user-reservations/user-reservations.component";
import {ComplaintsComponent} from "./pages/complaints/complaints.component";
import {Title} from "@angular/platform-browser";
import {TranslocoService} from "@ngneat/transloco";
import {MyAccountComponent} from "./pages/my-account/my-account.component";
import {AdminReservationsComponent} from "./pages/reservations-admin/admin-reservations.component";
import {MenuSectionsAdminComponent} from "./pages/menu-sections-admin/menu-sections-admin.component";
import {ComplaintsAdminComponent} from "./pages/complaints-admin/complaints-admin.component";
import {MenuItemsAdminComponent} from "./pages/menu-items-admin/menu-items-admin.component";
import {PermissionsService} from "./services/permissions.service";

const canActivateLoggedIn: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const isLoggedIn = inject(PermissionsService).isLoggedIn()
  isLoggedIn.subscribe(async (isLoggedIn) => {
    if (!isLoggedIn) await inject(Router).navigate(['/log-in'])
  })
  return isLoggedIn
}

const canActivateAdmin: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const isAdmin = inject(PermissionsService).isAdmin()
  isAdmin.subscribe(async (isAdmin) => {
    if (!isAdmin) await inject(Router).navigate(['/home'])
  })
  return isAdmin
}

const routes: Routes = [
  // NOT LOGGED IN
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'home', component: HomeComponent },
  { path: 'sign-up', title: 'signup', component: SignUpComponent },
  { path: 'log-in', title: 'login', component: LogInComponent },
  { path: 'complaints', title: 'complaints', component: ComplaintsComponent },

  // LOGGED IN
  { path: 'my-account', title: 'myAccount', component: MyAccountComponent, canActivate: [canActivateLoggedIn] },
  { path: 'user-reservations', title: 'reservations', component: UserReservationsComponent, canActivate: [canActivateLoggedIn] },
  { path: 'new-reservation', title: 'newReservation', component: NewReservationComponent, canActivate: [canActivateLoggedIn] },

  // ADMIN
  { path: 'reservations-admin', title: 'reservationsAdmin', component: AdminReservationsComponent, canActivate: [canActivateAdmin] },
  { path: 'complaints-admin', title: 'complaintsAdmin', component: ComplaintsAdminComponent, canActivate: [canActivateAdmin] },
  { path: 'menu-sections-admin', title: 'menuSectionsAdmin', component: MenuSectionsAdminComponent, canActivate: [canActivateAdmin] },
  { path: 'menu-items-admin', title: 'menuItemsAdmin', component: MenuItemsAdminComponent, canActivate: [canActivateAdmin] },

  { path: '**', redirectTo: '/home' },
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

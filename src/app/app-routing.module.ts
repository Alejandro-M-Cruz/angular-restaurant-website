import {inject, Injectable, NgModule} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn, Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy
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
import {PermissionsService} from "./services/user/permissions.service";
import { UserOrderComponent } from './pages/user-order/user-order.component';
import { CartComponent } from './components/cart/cart.component';
import {UserOrderHistoryComponent} from './pages/user-orderhistory/user-orderhistory.component';
import { SuccessComponent } from './pages/success/success.component';


const canActivateLoggedIn: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const isLoggedIn = inject(PermissionsService).isLoggedIn()
  const router = inject(Router)
  isLoggedIn.subscribe(async (isLoggedIn) => {
    if (!isLoggedIn) await router.navigate(['log-in'])
  })
  return isLoggedIn
}

const canActivateLoggedOut: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const isLoggedOut = inject(PermissionsService).isLoggedOut()
  const router = inject(Router)
  isLoggedOut.subscribe(async (isLoggedOut) => {
    if (!isLoggedOut) await router.navigate(['/home'])
  })
  return isLoggedOut
}

const canActivateAdmin: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const isAdmin = inject(PermissionsService).isAdmin()
  const router = inject(Router)
  isAdmin.subscribe(async (isAdmin) => {
    if (!isAdmin) await router.navigate(['/home'])
  })
  return isAdmin
}

const routes: Routes = [
  // ALL
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'home', component: HomeComponent },
  { path: 'complaints', title: 'complaints', component: ComplaintsComponent },

  // LOGGED OUT
  { path: 'sign-up', title: 'signup', component: SignUpComponent, canActivate: [canActivateLoggedOut] },
  { path: 'log-in', title: 'login', component: LogInComponent, canActivate: [canActivateLoggedOut] },

  // LOGGED IN
  { path: 'my-account', title: 'myAccount', component: MyAccountComponent, canActivate: [canActivateLoggedIn] },
  { path: 'user-reservations', title: 'reservations', component: UserReservationsComponent, canActivate: [canActivateLoggedIn] },
  { path: 'new-reservation', title: 'newReservation', component: NewReservationComponent, canActivate: [canActivateLoggedIn] },
  { path: 'user-order', title: 'order', component: UserOrderComponent, canActivate: [canActivateLoggedIn] },
  { path: 'user-orderhistory', title: 'previousOrder', component: UserOrderHistoryComponent, canActivate: [canActivateLoggedIn] },
  { path: 'cart', title: 'shoppingCart', component: CartComponent, canActivate: [canActivateLoggedIn] },
  { path: 'success' , title: 'success', component: SuccessComponent},

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

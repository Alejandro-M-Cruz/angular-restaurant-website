import { Injectable } from '@angular/core';
import {PermissionsService} from "./user/permissions.service";
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TranslocoService} from "@ngneat/transloco";

export interface NavbarLink {
  name: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private readonly links: NavbarLink[] = [
    {name: 'navbarLinks.home', route: '/home'},
    {name: 'navbarLinks.menu', route: '/home/menu'},
    {name: 'navbarLinks.reservations', route: '/user-reservations'},
    {name: 'navbarLinks.order', route: '/user-order'},
    {name: 'navbarLinks.reviews', route: '/reviews'},
    {name: 'navbarLinks.complaintForm', route: '/complaints'},
    {name: 'navbarLinks.jobApplication', route: '/job-application'},
    {name: 'navbarLinks.cart', route: '/cart'},
    {name: 'navbarLinks.myAccount', route: '/my-account'}
  ]
  private readonly adminLinks: NavbarLink[] = [
    {name: 'navbarLinks.home', route: '/home'},
    {name: 'navbarLinks.reservations', route: '/reservations-admin'},
    {name: 'navbarLinks.order', route:'/order-history-admin'},
    {name: 'navbarLinks.editMenu', route: '/menu-sections-admin'},
    {name: 'navbarLinks.reviews', route: '/reviews'},
    {name: 'navbarLinks.complaints', route: '/complaints-admin'},
    {name: 'navbarLinks.jobApplications', route: '/job-applications-admin'},
    {name: 'navbarLinks.myAccount', route: '/my-account'}
  ]

  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly breakPointObserver: BreakpointObserver,
    private readonly translateService:  TranslocoService
  ) {}

  getLinks(): Observable<NavbarLink[]> {
    return this.permissionsService.isAdmin().pipe(map(isAdmin => {
      return isAdmin ? this.adminLinks : this.links
    }))
  }

  mobileQueryMatches(): Observable<boolean> {
    return this.breakPointObserver
      .observe('(max-width: 600px)')
      .pipe(map(result => result.matches))
  }

  tabletQueryMatches(): Observable<boolean> {
    return this.breakPointObserver
      .observe('(max-width: 1268px) and (min-width: 601px)')
      .pipe(map(result => result.matches))
  }

  toggleLanguage() {
    this.translateService.setActiveLang(this.translateService.getActiveLang() === 'en' ? 'es' : 'en')
  }
}

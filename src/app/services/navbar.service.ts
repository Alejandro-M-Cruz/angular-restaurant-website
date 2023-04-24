import { Injectable } from '@angular/core';
import {PermissionsService} from "./permissions.service";
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TranslocoService} from "@ngneat/transloco";

export interface NavbarLink {
  name: string,
  route: string
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private readonly links: NavbarLink[] = [
    {name: 'navbarLinks.home', route: '/home'},
    {name: 'navbarLinks.menu', route: '/home/menu'},
    {name: 'navbarLinks.reservations', route: '/user-reservations'},
    {name: 'navbarLinks.aboutUs', route: '/home/about-us'},
    {name: 'navbarLinks.cart', route: '/cart'}
  ]
  private readonly adminLinks: NavbarLink[] = [
    {name: 'navbarLinks.home', route: '/home'},
    {name: 'navbarLinks.reservations', route: '/reservations-admin'},
    {name: 'navbarLinks.editMenu', route: '/menu-sections-admin'},
    {name: 'navbarLinks.complaints', route: '/complaints-admin'}
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

  toggleLanguage() {
    this.translateService.setActiveLang(this.translateService.getActiveLang() === 'en' ? 'es' : 'en')
  }
}

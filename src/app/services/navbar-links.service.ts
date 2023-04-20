import { Injectable } from '@angular/core';
import {PermissionsService} from "./permissions.service";
import {map, Observable} from "rxjs";

export interface Link {
  name: string,
  route: string
}

@Injectable({
  providedIn: 'root'
})
export class NavbarLinksService {
  links: Link[] = [
    {name: 'home', route: '/home'},
    {name: 'menu', route: '/home/menu'},
    {name: 'reservations', route: '/user-reservations'},
    {name: 'aboutUs', route: '/home/about-us'},
    {name: 'cart', route: '/cart'}
  ]

  adminLinks: Link[] = [
    {name: 'home', route: '/home'},
    {name: 'reservations', route: '/reservations-admin'},
    {name: 'editMenu', route: '/menu-sections-admin'},
    {name: 'complaints', route: '/complaints-admin'}
  ]

  constructor(private readonly permissionsService: PermissionsService) {}

  getLinks(): Observable<Link[]> {
    return this.permissionsService.isAdmin().pipe(map(isAdmin => {
      return isAdmin ? this.adminLinks : this.links
    }))
  }

  showUserIcon(): Observable<boolean> {
    return this.permissionsService.isLoggedIn()
  }
}

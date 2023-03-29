import { Component } from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  items = [
    {name: 'home', link: 'home'},
    {name: 'menu', link: 'menu'},
    {name: 'aboutUs', link: 'aboutUs'},
    {name: 'contact', link: 'contact'},
    {name: 'reservations', link: 'reservations'},
    {name: 'login', link: 'log-in'}
  ]
  showUserIcon = false;
  private translateService: TranslocoService;
  showSidenav = false;

  constructor(translateService: TranslocoService) {
    this.translateService = translateService;
  }

  onChangeLanguage() {
    this.translateService.setActiveLang(this.translateService.getActiveLang() === 'en' ? 'es' : 'en');
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }
}

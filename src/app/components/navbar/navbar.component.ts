import {Component} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  items = [
    {name: 'home', link: '/home'},
    {name: 'menu', link: '/home/menu'},
    {name: 'aboutUs', link: 'about-us'},
    {name: 'contact', link: '/home/contact'},
    {name: 'reservations', link: '/user-reservations'},
    {name: 'login', link: '/log-in'}
  ]
  showUserIcon = false;
  showSidenav = false;

  constructor(private readonly translateService: TranslocoService) {
  }

  onChangeLanguage() {
    this.translateService.setActiveLang(this.translateService.getActiveLang() === 'en' ? 'es' : 'en');
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }
}

import {Component, EventEmitter, Output} from '@angular/core';
import {translate, TranslocoService} from '@ngneat/transloco';
import {Alert} from "../alert/alert.component";

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
    {name: 'reservations', link: 'user-reservations'},
    {name: 'login', link: 'log-in'}
  ]
  showUserIcon = false;
  private translateService: TranslocoService;
  showSidenav = false;
  @Output() showAlert = new EventEmitter<Alert>();

  constructor(translateService: TranslocoService) {
    this.translateService = translateService;
  }

  onChangeLanguage() {
    this.translateService.setActiveLang(this.translateService.getActiveLang() === 'en' ? 'es' : 'en');
    this.showAlert.emit({type: 'success', message: translate('successAlerts.languageChanged')});
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }
}

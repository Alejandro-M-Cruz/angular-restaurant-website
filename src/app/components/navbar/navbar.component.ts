import {Component, Input} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() showUserIcon!: boolean
  items = [
    {name: 'home', link: '/home'},
    {name: 'menu', link: '/home/menu'},
    {name: 'aboutUs', link: 'about-us'},
    {name: 'contact', link: '/home/contact'},
    {name: 'reservations', link: '/user-reservations'},
    // {name: 'login', link: '/log-in'}
  ]

  constructor(private readonly translateService: TranslocoService) { }

  onChangeLanguage() {
    this.translateService.setActiveLang(this.translateService.getActiveLang() === 'en' ? 'es' : 'en');
  }

}

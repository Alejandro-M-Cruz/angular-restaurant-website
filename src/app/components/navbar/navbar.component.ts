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
    {name: 'menu', link: '/home#menu-section'},
    {name: 'aboutUs', link: '/home/about-us'},
    {name: 'contact', link: '/home/contact'},
    {name: 'reservations', link: '/user-reservations'}
  ]

  constructor(private readonly translateService: TranslocoService) { }

  onChangeLanguage() {
    this.translateService.setActiveLang(this.translateService.getActiveLang() === 'en' ? 'es' : 'en');
  }

}

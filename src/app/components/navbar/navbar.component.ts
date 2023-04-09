import {Component} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {Link, NavbarLinksService} from "../../services/navbar-links.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  links$: Observable<Link[]> = this.navbarLinksService.getLinks()
  showUserIcon$: Observable<boolean> = this.navbarLinksService.showUserIcon()

  constructor(
    private readonly translateService: TranslocoService,
    readonly navbarLinksService: NavbarLinksService
  ) { }

  onChangeLanguage() {
    this.translateService.setActiveLang(this.translateService.getActiveLang() === 'en' ? 'es' : 'en');
  }
}

import {Component} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {Link, NavbarService} from "../../services/navbar.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  links$: Observable<Link[]> = this.navbarService.getLinks()
  mobileQueryMatches$: Observable<boolean> = this.navbarService.mobileQueryMatches()

  constructor(
    private readonly navbarService: NavbarService
  ) { }

  changeLanguage() {
    this.navbarService.toggleLanguage()
  }
}

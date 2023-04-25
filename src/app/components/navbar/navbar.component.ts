import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavbarLink, NavbarService} from "../../services/navbar.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  links$: Observable<NavbarLink[]> = this.navbarService.getLinks()
  mobileQueryMatches: boolean
  tabletQueryMatches: boolean
  mobileQuerySubscription: Subscription
  tabletQuerySubscription: Subscription
  @ViewChild('sidenav') sidenav: any

  constructor(private readonly navbarService: NavbarService) { }

  ngOnInit() {
    this.mobileQuerySubscription = this.navbarService.mobileQueryMatches().subscribe(matches => {
      this.mobileQueryMatches = matches
    })
    this.tabletQuerySubscription = this.navbarService.tabletQueryMatches().subscribe(matches => {
      this.tabletQueryMatches = matches
    })
  }

  changeLanguage() {
    this.navbarService.toggleLanguage()
  }

  ngOnDestroy(): void {
    this.mobileQuerySubscription.unsubscribe()
    this.tabletQuerySubscription.unsubscribe()
  }
}

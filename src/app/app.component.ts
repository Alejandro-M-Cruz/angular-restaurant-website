import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-restaurant-website';

  constructor(private modalService: NgbModal, private readonly authService: AuthenticationService) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }
}

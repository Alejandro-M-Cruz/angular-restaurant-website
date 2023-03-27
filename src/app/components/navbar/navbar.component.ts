import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
	  items = [{ link: "home", label: "Inicio" }, {link: "reservations", label: "Reservas" }, {link: "about-us", label: "Sobre nosotros" }];
    showUserIcon = true;
}

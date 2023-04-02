import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {addDoc, collection, deleteDoc, Firestore, getDocs} from "@angular/fire/firestore";
import {MenuItem} from "./model/menu-item.model";
import {Alert} from "./components/alert/alert.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-restaurant-website';
  alertType: string = 'success';
  alertMessage: string = '';
  showAlert = false

  constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  onShowAlert(alert: Alert) {
    this.alertType = alert.type;
    this.alertMessage = alert.message;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 5000)
  }
}

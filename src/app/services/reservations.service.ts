import { Injectable } from '@angular/core';
import {addDoc, collection, doc, getFirestore, setDoc} from "@angular/fire/firestore";
import {MenuSection} from "../model/menu-section.model";
import {MenuItem} from "../model/menu-item.model";
import {getAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private auth = getAuth()
  private firestore = getFirestore()

  addReservation(menuSection: MenuSection) {
    return addDoc(collection(this.firestore, 'menu_sections'), menuSection)
  }

  updateMenuSection(id: string, menuSection: MenuSection) {
    return setDoc(doc(this.firestore, 'menu_sections', id), menuSection)
  }

  addMenuItem(menuItem: MenuItem) {
    return addDoc(collection(this.firestore, 'menu_items'), menuItem)
  }

  updateMenuItem(id: string, menuItem: MenuItem) {
    return setDoc(doc(this.firestore, 'menu_items'), menuItem)
  }
}

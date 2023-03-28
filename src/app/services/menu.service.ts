import { Injectable } from '@angular/core';
import {addDoc, collection, deleteDoc, doc, getFirestore, setDoc} from "@angular/fire/firestore";
import {MenuSection} from "../model/menu-section.model";
import {MenuItem} from "../model/menu-item.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private firestore = getFirestore()

  addMenuSection(menuSection: MenuSection) {
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

  deleteMenuItem(id: string) {
    return deleteDoc(doc(this.firestore, "menu_items", id))
  }
}

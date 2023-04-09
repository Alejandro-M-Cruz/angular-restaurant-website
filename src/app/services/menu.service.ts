import { Injectable } from '@angular/core';
import {
  collection,
  Firestore, getDocs, orderBy, query
} from "@angular/fire/firestore";
import {MenuSection} from "../model/menu-section.model";
import {MenuItem} from "../model/menu-item.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private readonly firestore: Firestore) {}

  async getMenuSections() {
    const q = query(
      collection(this.firestore, 'menu_sections'),
      orderBy('name.es')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}
    }) as MenuSection[]
  }

  async getMenuItems() {
    const querySnapshot = await getDocs(
      collection(this.firestore, 'menu_items')
    )
    return querySnapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}
    }) as MenuItem[]
  }

  async getMenuItemsBySectionId(sectionId: string) {
    const querySnapshot = await getDocs(
      collection(this.firestore, 'menu_items')
    )
    return querySnapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()} as MenuItem
    }).filter(item => item.sectionId === sectionId) as MenuItem[]
  }
}

import { Injectable } from '@angular/core';
import {
  addDoc, collection, collectionData,
  deleteDoc,
  doc, Firestore, getDocs, orderBy, query,
  setDoc
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
    const querySnapshot = await getDocs(collection(this.firestore, 'menu_items'))
    return querySnapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}
    }) as MenuItem[]
  }

  async addMenuSection(menuSection: MenuSection) {
    await addDoc(collection(this.firestore, 'menu'), menuSection)
  }

  async updateMenuSection(id: string, menuSection: MenuSection) {
    await setDoc(doc(this.firestore, 'menu', id), menuSection)
  }

  async deleteMenuSection(id: string) {
    await deleteDoc(doc(this.firestore, 'menu', id))
  }
}

import { Injectable } from '@angular/core';
import {
  addDoc, collection,
  deleteDoc,
  doc, Firestore, getDocs, orderBy, query,
  setDoc
} from "@angular/fire/firestore";
import {MenuSection} from "../model/menu-section.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private readonly firestore: Firestore) {}

  async getMenu(): Promise<MenuSection[]> {
    const q = query(
      collection(this.firestore, 'menu'),
      orderBy('name.es')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => doc.data() as MenuSection)
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

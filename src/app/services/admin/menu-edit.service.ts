import { Injectable } from '@angular/core';
import {MenuSection} from "../../model/menu-section.model";
import {addDoc, collection, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {MenuItem} from "../../model/menu-item.model";

@Injectable({
  providedIn: 'root'
})
export class MenuEditService {
  private readonly sectionsCollection = collection(this.firestore, 'menu_sections')
  private readonly itemsCollection = collection(this.firestore, 'menu_items')
  private sectionBeingEdited: MenuSection | null = null

  constructor(private readonly firestore: Firestore) {}

  addSection(menuSection: MenuSection): Promise<any> {
    return addDoc(this.sectionsCollection, menuSection)
  }

  deleteSection(id: string): Promise<void> {
    return deleteDoc(doc(this.sectionsCollection, id))
  }

  updateSection(id: string, menuSection: MenuSection): Promise<void> {
    return setDoc(doc(this.sectionsCollection, id), menuSection)
  }

  sectionIsBeingEdited(menuSection: MenuSection) {
    this.sectionBeingEdited = menuSection
  }

  getSectionBeingEdited(): MenuSection | null {
    return this.sectionBeingEdited
  }

  addItem(menuItem: MenuItem): Promise<any> {
    return addDoc(this.itemsCollection, menuItem)
  }

  deleteItem(id: string): Promise<void> {
    return deleteDoc(doc(this.itemsCollection, id))
  }

  updateItem(id: string, menuItem: MenuItem): Promise<void> {
    return setDoc(doc(this.itemsCollection, id), menuItem)
  }

}

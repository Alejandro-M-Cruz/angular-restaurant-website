import { Injectable } from '@angular/core';
import {MenuSection} from "../../model/menu-section.model";
import {addDoc, collection, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {MenuItem} from "../../model/menu-item.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuEditService {
  private sectionBeingEdited: MenuSection | null = null

  constructor(private readonly firestore: Firestore) {}

  addSection(menuSection: MenuSection): Promise<any> {
    return addDoc(collection(this.firestore, 'menu_sections'), menuSection)
  }

  deleteSection(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'menu_sections', id))
  }

  updateSection(id: string, menuSection: MenuSection): Promise<void> {
    return setDoc(doc(this.firestore, 'menu_sections', id), menuSection)
  }

  sectionIsBeingEdited(menuSection: MenuSection) {
    this.sectionBeingEdited = menuSection
  }

  getSectionBeingEdited(): MenuSection | null {
    return this.sectionBeingEdited
  }

  addItem(menuItem: MenuItem): Promise<any> {
    return addDoc(collection(this.firestore, 'menu_items'), menuItem)
  }

  deleteItem(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'menu_items', id))
  }

  updateItem(id: string, menuItem: MenuItem): Promise<void> {
    return setDoc(doc(this.firestore, 'menu_items', id), menuItem)
  }

}

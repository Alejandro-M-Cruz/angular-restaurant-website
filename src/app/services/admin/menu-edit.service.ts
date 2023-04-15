import { Injectable } from '@angular/core';
import {MenuSection} from "../../model/menu-section.model";
import {addDoc, collection, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {MenuItem} from "../../model/menu-item.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuEditService {
  editedSection: MenuSection | null = null

  constructor(private readonly firestore: Firestore) {}

  addSection(menuSection: MenuSection): Promise<any> {
    return addDoc(collection(this.firestore, 'menu_sections'), menuSection)
  }

  deleteSection(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'menu_sections', id))
  }

  editingSection(menuSection: MenuSection) {
    this.editedSection = menuSection
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

  /*addSection(menuSection: MenuSection): Observable<any> {
    return this.http.post(`${environment.apiUrl}/menu/sections/new`, menuSection)
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/menu/sections/${id}`)
  }

  editingSection(menuSection: MenuSection) {
    this.editedSection = menuSection
  }

  addItem(menuItem: MenuItem): Observable<any> {
    console.log(menuItem)
    return this.http.post(`${environment.apiUrl}/menu/items/new`, menuItem)
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/menu/items/${id}`)
  }

  updateItem(id: string, menuItem: MenuItem): Observable<any> {
    return this.http.put(`${environment.apiUrl}/menu/items/${id}`, menuItem)
  }*/
}

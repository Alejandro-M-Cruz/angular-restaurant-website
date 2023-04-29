import { Injectable } from '@angular/core';
import {
  collection, collectionData,
  Firestore, orderBy, query, where
} from "@angular/fire/firestore";
import {MenuSection} from "../../model/menu-section.model";
import {MenuItem} from "../../model/menu-item.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly itemsCollection = collection(this.firestore, 'menu_items')
  private readonly sectionsCollection = collection(this.firestore, 'menu_sections')

  constructor(private readonly firestore: Firestore) {}

  getMenuSections(): Observable<MenuSection[]> {
    const q = query(this.sectionsCollection, orderBy('name.es'))
    return collectionData(q, {idField: 'id'}) as Observable<MenuSection[]>
  }

  getMenuItems(): Observable<MenuItem[]> {
    const q = query(this.itemsCollection, orderBy('name.es'))
    return collectionData(q, {idField: 'id'}) as Observable<MenuItem[]>
  }

  getMenuItemsBySectionId(sectionId: string): Observable<MenuItem[]> {
    const q = query(
      this.itemsCollection,
      where('sectionId', '==', sectionId),
      orderBy('name.es')
    )
    return collectionData(q, {idField: 'id'}) as Observable<MenuItem[]>
  }
}

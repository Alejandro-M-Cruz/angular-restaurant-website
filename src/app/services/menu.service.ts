import { Injectable } from '@angular/core';
import {
  collection, collectionData,
  Firestore, orderBy, query, where
} from "@angular/fire/firestore";
import {MenuSection} from "../model/menu-section.model";
import {MenuItem} from "../model/menu-item.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private readonly firestore: Firestore) {}

  getMenuSections(): Observable<MenuSection[]> {
    const q = query(
      collection(this.firestore, 'menu_sections'),
      orderBy('name.es')
    )
    return collectionData(q, {idField: 'id'}) as Observable<MenuSection[]>
  }

  getMenuItems(): Observable<MenuItem[]> {
    const q = query(
      collection(this.firestore, 'menu_items'),
      orderBy('name.es')
    )
    return collectionData(q, {idField: 'id'}) as Observable<MenuItem[]>
  }

  getMenuItemsBySectionId(sectionId: string): Observable<MenuItem[]> {
    const q = query(
      collection(this.firestore, 'menu_items'),
      where('sectionId', '==', sectionId),
      orderBy('name.es')
    )
    return collectionData(q, {idField: 'id'}) as Observable<MenuItem[]>
  }
}

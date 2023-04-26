import { Injectable } from '@angular/core';
import {MenuSection} from "../../model/menu-section.model";
import {addDoc, collection, deleteDoc, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {MenuItem} from "../../model/menu-item.model";
import { StripeStoreService } from 'src/app/services/stripe-store.service';

@Injectable({
  providedIn: 'root'
})
export class MenuEditService {
  private readonly sectionsCollection = collection(this.firestore, 'menu_sections')
  private readonly itemsCollection = collection(this.firestore, 'menu_items')
  private sectionBeingEdited: MenuSection | null = null

  constructor(private readonly firestore: Firestore,
              private stripePlatform: StripeStoreService) {}

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

  async addItem(menuItem: MenuItem): Promise<any> {
    try {
      const product = await this.stripePlatform.createProduct(menuItem.name.en!,
        menuItem.ingredients.en!,
        menuItem.price * 100,
        'EUR',
        menuItem.imageUrl!);
      menuItem.idStripe = product.id;
      return await addDoc(this.itemsCollection, menuItem);
    } catch (error) {
      console.log('Error creating product:', error);
    }
  }

  async deleteItem(id: string, idStripe: string): Promise<void> {
    try {
      const product = await this.stripePlatform.deleteProduct(idStripe);
      console.log('Whether the product is currently available for purchase:', product.active);
      return await deleteDoc(doc(this.itemsCollection, id))
    } catch (error) {
      console.log('Error deleting product:', error);
    }
    
  }

  updateItem(id: string, menuItem: MenuItem): Promise<void> {
    return setDoc(doc(this.itemsCollection, id), menuItem)
  }

}

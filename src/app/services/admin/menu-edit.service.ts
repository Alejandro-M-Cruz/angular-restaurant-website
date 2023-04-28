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
      const price = await this.stripePlatform.createProduct(menuItem.name.en!,
        menuItem.ingredients.en!,
        menuItem.price * 100,
        'EUR',
        menuItem.imageUrl!
        );
      menuItem.productIdStripe = price.product;
      menuItem.priceIdStripe = price.id;
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

  async updateItem(id: string, priceId: string, productId: string, menuItem: MenuItem): Promise<void> {
    try {
      console.log('El ID del producto es: + ' + productId)
      console.log('El ID del precio es: + ' + priceId)
      const price = await this.stripePlatform.createProduct(menuItem.name.en!,
        menuItem.ingredients.en!,
        menuItem.price * 100,
        'EUR',
        menuItem.imageUrl!,
        productId,
        priceId
        );
      menuItem.priceIdStripe = price.id;
      menuItem.productIdStripe = price.product;
      
      return setDoc(doc(this.itemsCollection, id), menuItem)
    } catch (error) {
      console.log('Error creating product:', error);
    }
  }

}

import { MenuItem } from '../model/menu-item.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: MenuItem[] = [];
  constructor() { } 

  addToCart(item: MenuItem) {
    this.items.push(item);
  }
  
  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

}

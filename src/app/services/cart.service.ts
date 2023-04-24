import { Injectable } from '@angular/core';
import {MenuItem} from "../model/menu-item.model";

export interface CartItem {
  menuItem: MenuItem;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  addToCart(menuItem: MenuItem) {
    const includedItemWithSameMenuItem = this.cartItems.find(cartItem => cartItem.menuItem.id === menuItem.id);
    includedItemWithSameMenuItem ?
      includedItemWithSameMenuItem.amount++ :
      this.cartItems.push({ menuItem, amount: 1 });
  }

  deleteFromCart(menuItem: MenuItem) {
    const cartItemIndex = this.cartItems.findIndex(cartItem => cartItem.menuItem.id === menuItem.id);
    if (cartItemIndex === -1) throw new Error();
    this.cartItems.splice(cartItemIndex,1);
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }

}

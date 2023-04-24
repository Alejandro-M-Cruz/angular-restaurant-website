import { Injectable } from '@angular/core';
import {MenuItem} from "../model/menu-item.model";
import {CartItem} from "../model/cart-item.model";
import {Order} from "../model/order.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  private getTotalMenuItems(): number {
    let totalMenuItems = 0;
    this.cartItems.forEach(cartItem => totalMenuItems += cartItem.amount);
    return totalMenuItems;
  }

  private isFull(): boolean {
    return this.getTotalMenuItems() > Order.MAX_TOTAL_ITEMS
  }

  addToCart(menuItem: MenuItem) {
    if (this.isFull()) throw new Error()
    const includedCartItemWithSameMenuItem = this.cartItems.find(cartItem => cartItem.menuItem.id === menuItem.id);
    includedCartItemWithSameMenuItem ?
      includedCartItemWithSameMenuItem.amount++ :
      this.cartItems.push({ menuItem, amount: 1 });
  }

  deleteFromCart(menuItem: MenuItem) {
    const cartItemIndex = this.cartItems.findIndex(cartItem => cartItem.menuItem.id === menuItem.id);
    if (cartItemIndex === -1) throw new Error();
    this.cartItems[cartItemIndex].amount > 1 ?
      this.cartItems[cartItemIndex].amount -- :
      this.cartItems.splice(cartItemIndex, 1);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

}

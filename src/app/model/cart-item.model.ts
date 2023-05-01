import {MenuItem} from "./menu-item.model";

export class CartItem {
  menuItem: MenuItem;
  quantity: number;

  constructor(menuItem: MenuItem, quantity: number) {
    this.menuItem = menuItem;
    this.quantity = quantity;
  }

  get subtotalPrice() {
    return this.menuItem.price * this.quantity;
  }

}

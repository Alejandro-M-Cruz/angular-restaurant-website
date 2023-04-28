import {MenuItem} from "./menu-item.model";

export class CartItem {
  menuItem: MenuItem;
  amount: number;

  constructor(menuItem: MenuItem, amount: number) {
    this.menuItem = menuItem;
    this.amount = amount;
  }

  get subtotalPrice() {
    return this.menuItem.price * this.amount;
  }

}

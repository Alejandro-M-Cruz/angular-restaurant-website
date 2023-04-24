import {CartItem} from "./cart-item.model";

export class Order {
  static readonly MAX_TOTAL_ITEMS = 30
  id?: string;
  cartItems: CartItem[];
  creationTimestamp: Date;
  userId: string;
}

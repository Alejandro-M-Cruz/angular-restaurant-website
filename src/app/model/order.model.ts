import {CartItem} from "./cart-item.model";

export class Order {
  static readonly MAX_TOTAL_ITEMS = 30
  items: CartItem[];
  creationTimestamp: Date;
  userId: string;

}

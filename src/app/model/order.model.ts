import {CartItem} from "./cart-item.model";

export interface Order {
  items: CartItem[];
  creationTimestamp: Date;
  userId: string;
}

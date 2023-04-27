import {CartItem} from "./cart-item.model";

export class Order {
  static readonly MAX_TOTAL_ITEMS = 30
  static readonly HOME_DELIVERY_FEE = 2.99
  id: string;
  cartItems: CartItem[];
  tip?: number | null;
  creationTimestamp: Date;
  isFinished: boolean;
  isHomeDelivery: boolean;
  deliveryAddress?: string;
  userId: string;

  get totalPriceNotIncludingTip(): number {
    let totalPrice = 0
    this.cartItems.forEach(cartItem => totalPrice += cartItem.menuItem.price * cartItem.amount)
    return this.isHomeDelivery ? totalPrice + Order.HOME_DELIVERY_FEE : totalPrice
  }

  get totalPriceIncludingTip(): number {
    return this.totalPriceNotIncludingTip + (this.tip ?? 0)
  }
}

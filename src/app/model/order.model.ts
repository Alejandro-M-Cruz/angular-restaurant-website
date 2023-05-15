import {CartItem} from "./cart-item.model";

export interface Address {
  city: string
  country: string
  line1: string
  line2: string
  postalCode: string
  state: string
}

/*
interface Address {
  city: string
  street: string
  streetNumber: number
  postalCode: string
  additionalData?: {
    storey: number
    doorNumber: number
    comments: string
  }
}
*/

export class Order {
  static readonly MAX_TOTAL_ITEMS = 30
  static readonly HOME_DELIVERY_FEE = 2.99
  static readonly TIP_OPTIONS = [0, 1, 2, 5]
  static readonly MAX_TIP = 100
  id?: string;
  cartItems: CartItem[];
  tip?: number | null;
  creationTimestamp?: Date;
  isFinished: boolean = false;
  isHomeDelivery: boolean;
  deliveryAddress?: Address;
  userId?: string;

  get totalPriceNotIncludingTip(): number {
    let totalPrice = 0
    this.cartItems.forEach(cartItem => totalPrice += cartItem.subtotalPrice)
    return this.isHomeDelivery ? totalPrice + Order.HOME_DELIVERY_FEE : totalPrice
  }

  get totalPriceIncludingTip(): number {
    return this.totalPriceNotIncludingTip + (this.tip ?? 0)
  }

}

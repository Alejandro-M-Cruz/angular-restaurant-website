import {CartItem} from "./cart-item.model";

export interface Address {
  city: string
  country: string
  line1: string
  line2: string
  postalCode: string
  state: string
}

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

  /*constructor(cartItems: CartItem[], isHomeDelivery: boolean, deliveryAddress?: string, tip?: number | null) {
    this.cartItems = cartItems
    this.isHomeDelivery = isHomeDelivery
    this.deliveryAddress = deliveryAddress
    this.tip = tip
    this.isFinished = false
  }*/

  get totalPriceNotIncludingTip(): number {
    let totalPrice = 0
    this.cartItems.forEach(cartItem => totalPrice += cartItem.subtotalPrice)
    return this.isHomeDelivery ? totalPrice + Order.HOME_DELIVERY_FEE : totalPrice
  }

  get totalPriceIncludingTip(): number {
    return this.totalPriceNotIncludingTip + (this.tip ?? 0)
  }

  // updateTotalPrice(): void {
  //   const tipAmounts = [0, 1, 2, 3]; // The available tip amounts
  //   const tipIndex = tipAmounts.indexOf(Number(this.orderForm.get('tip').value)); // Get the index of the selected tip amount
  //   const tip = tipIndex >= 0 ? tipAmounts[tipIndex] : 0; // Get the selected tip amount, or 0 if the index is invalid

  //   this.order.tip = tip; // Set the tip property of the order object
  //   this.order.totalPriceIncludingTip = this.order.totalPriceNotIncludingTip + tip; // Calculate the total price including tip
  // }

  // get totalPriceIncludingTip(): number {
  //   return this.order.totalPriceIncludingTip;
  // }

}

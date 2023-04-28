import {CartItem} from "./cart-item.model";

export class Order {
  static readonly MAX_TOTAL_ITEMS = 30
  static readonly HOME_DELIVERY_FEE = 2.99
  id: string;
  cartItems: CartItem[];
  tip?: number | null;
  creationTimestamp: Date;
  isFinished: boolean = false;
  isHomeDelivery: boolean;
  deliveryAddress?: string;
  userId: string;

  /*
  constructor(
    cartItems: CartItem[],
    isHomeDelivery: boolean,
    creationTimestamp: Date,
    userId: string,
    deliveryAddress?: string,
    tip?: number | null
  ) {
    this.cartItems = cartItems
    this.isHomeDelivery = isHomeDelivery
    this.creationTimestamp = creationTimestamp
    this.userId = userId
    this.deliveryAddress = deliveryAddress
    this.tip = tip
  }
  */

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

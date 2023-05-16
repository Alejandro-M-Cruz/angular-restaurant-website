import { Component } from '@angular/core';
import { CartService } from 'src/app/services/orders/cart.service';
import { TranslocoService } from '@ngneat/transloco';
import {OrderCheckoutService} from "../../services/orders/order-checkout.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = this.cartService.getCartItems();

  constructor(
    private readonly cartService: CartService,
    private readonly orderCheckoutService: OrderCheckoutService,
    private readonly translationService: TranslocoService,
    public readonly location: Location,
  ) { }

  getActiveLanguage() {
    return this.translationService.getActiveLang()
  }

  clearCart(){
    this.cartService.clearCart()
  }

  async goToCheckout(){
    this.orderCheckoutService.goToCheckout()
  }



}

import { Component } from '@angular/core';
import { CartService } from 'src/app/services/orders/cart.service';
import { TranslocoService } from '@ngneat/transloco';
import {OrderCheckoutService} from "../../services/orders/order-checkout.service";

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
    private readonly translationService: TranslocoService
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

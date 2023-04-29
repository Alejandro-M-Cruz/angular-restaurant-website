import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/orders/cart.service';
import { TranslocoService } from '@ngneat/transloco';
import { StripeCheckoutService } from 'src/app/services/orders/stripe-checkout.service';
import { StripeStoreService } from 'src/app/services/orders/stripe-store.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() homeDeliveryButtonSelected: FormControl<boolean | null>;
  cartItems = this.cartService.getCartItems();

  constructor(
    private cartService: CartService,
    private readonly translationService: TranslocoService,
    private stripeCheckoutService: StripeCheckoutService,
    private stripeStoreService: StripeStoreService
  ) { }

  getActiveLanguage() {
    return this.translationService.getActiveLang()
  }

  clearCart(){
    this.cartService.clearCart()
  }

  async buy(){
    try {
      if (this.homeDeliveryButtonSelected.value === true) {
        const shippingRate = await this.createShippingRate();
        const session = await this.stripeCheckoutService.createCheckoutSession(
          this.cartService.getCartItems(),
          'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
          'http://localhost:4200/cancel',
          shippingRate.id
          
        );
        window.location.href=session.url;
      } else {
        const session = await this.stripeCheckoutService.createCheckoutSession(
          this.cartService.getCartItems(),
          'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
          'http://localhost:4200/cancel'
        );
        window.location.href=session.url;
      }
      
    } catch (error) {
      console.log('Error creating checkout session:', error);
    }
  }

  private async createShippingRate(){
    const shippingRate = await this.stripeCheckoutService.createShippingRate(
      'Home Delivery',
      {amount: 299, currency: 'eur'}
    );
    return shippingRate;
  }


}

import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TranslocoService } from '@ngneat/transloco';
import { StripeCheckoutService } from 'src/app/services/stripe-checkout.service';
import { StripeStoreService } from 'src/app/services/stripe-store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() availableLanguages!: string[]
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
    type line_items = {price: string, quantity: number}
    let line_items: line_items[] = []
    try {
      await Promise.all(
            this.cartService.getCartItems().map(async (cartItem) => {
              const product = await this.stripeStoreService.retrieveProductInformationById(cartItem.menuItem.idStripe!);
              line_items.push({
                price: product.default_price,
                quantity: cartItem.amount,
              });
            })
      );

      const session = await this.stripeCheckoutService.createCheckoutSession(
        line_items,
        'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
        'http://localhost:4200/cart/cancel',
      );
        
      window.location.href=session.url;
    } catch (error) {
      console.log('Error creating checkout session:', error);
    }
  }

}

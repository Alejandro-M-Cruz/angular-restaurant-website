import { Injectable } from '@angular/core';
import Stripe from 'stripe';
import { StripeConfigService } from './stripe-config.service';
import { CartItem } from 'src/app/model/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class StripeCheckoutService {
  private stripe: Stripe;
  constructor(private configService: StripeConfigService) {
    const apiKey = this.configService.getApiKey();
    const config = this.configService.getConfig();
    this.stripe = new Stripe(apiKey, config);
  }

  async createCheckoutSession(
    cartItems: CartItem[],
    successUrl: string,
    cancelUrl: string,
    shipping_id?: string
  ): Promise<any> {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(this.cartItemToLineItem),
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_options : [{
        shipping_rate: shipping_id,
      }]
    });
  }

  private cartItemToLineItem(cartItem: CartItem): Stripe.Checkout.SessionCreateParams.LineItem  {
    return {price: cartItem.menuItem.priceIdStripe, quantity: cartItem.amount }
  }

  async retrieveCheckoutSession(sessionId: string): Promise<any> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    const customer_info = session.customer_details;
    return customer_info;
  }

  async createShippingRate(
    display_name: string,
    fixed_amount: Stripe.Checkout.SessionCreateParams.ShippingOption.ShippingRateData.FixedAmount){
    return this.stripe.shippingRates.create({
      display_name: display_name,
      type: "fixed_amount",
      fixed_amount: fixed_amount,
      delivery_estimate: {
        minimum: {
          unit: 'hour',
          value: 1
        },
        maximum: {
          unit: 'hour',
          value: 2
        }
      },
    });
    }




}

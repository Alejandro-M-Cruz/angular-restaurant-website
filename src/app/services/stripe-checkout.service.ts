import { Injectable } from '@angular/core';
import Stripe from 'stripe';
import { StripeConfigService } from './stripe-config.service';

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

  createCheckoutSession(
    line_items: {price: string, quantity: number}[],
    successUrl: string,
    cancelUrl: string
  ): Promise<any> {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl
    });
  }

  /*    SUGGESTED REFACTORING
  async createCheckoutSession(
    cartItems: CartItem[],
    successUrl: string,
    cancelUrl: string
  ): Promise<any> {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(this.cartItemToLineItem),
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl
    });
  }

  private cartItemToLineItem(cartItem: CartItem): Stripe.Checkout.SessionCreateParams.LineItem  {
    return {price: (cartItem.menuItem.price * cartItem.amount).toString(), quantity: cartItem.amount }
  }*/

  async retrieveCheckoutSession(sessionId: string): Promise<any> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    const customer_info = session.customer_details;
    return customer_info;
  }



}

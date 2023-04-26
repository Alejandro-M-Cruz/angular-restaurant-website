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

  async createCheckoutSession(
                                line_items: {price: string, quantity: number}[],
                                successUrl: string, 
                                cancelUrl: string): Promise<any> {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl
    });
  }
}

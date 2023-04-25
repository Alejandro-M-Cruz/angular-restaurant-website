import { Injectable } from '@angular/core';
import Stripe from 'stripe';
import { StripeConfigService } from './stripe-config.service';

@Injectable({
  providedIn: 'root'
})
export class StripeStoreService {
  private stripe: Stripe;

  constructor(private configService: StripeConfigService) {
    const apiKey = this.configService.getApiKey();
    const config = this.configService.getConfig();
    this.stripe = new Stripe(apiKey, config);
  }

  async createProduct(name: string, description: string, price: number, currency: string, image: string): Promise<any> {
    return this.stripe.products.create({
      name: name,
      description: description,
      images: [image],
      default_price_data: {
        currency: currency,
        unit_amount: price,
      },
    });
  }

  retrieveProductInformationById(id: string): Promise<any> {
    return this.stripe.products.retrieve(id);
  }

  // updateProduct(id: string, name: string, description: string, price: number, currency: string, image: string): Promise<any> {
  //   return this.stripe.products.update(id, {
  //     name: name,
  //     description: description,
  //     images: [image],
  //     default_price: {
  //       currency: currency,
  //       unit_amount: price,
  //     },
  //   });
  // }

  async deleteProduct(id: string): Promise<any> {
    return this.stripe.products.update(id, {
      active: false
    });
  }

}

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

  async createProduct(name: string, description: string, price: number, currency: string, image?: string, productId?: string, priceId?: string): Promise<any> {
    const productUpdateParams: Stripe.ProductUpdateParams = {
      name: name,
      description: description,
      images: image ? [image] : undefined,
    };

    const productCreateParams: Stripe.ProductCreateParams = {
      name: name,
      description: description,
      images: image ? [image] : undefined,
    };

    let product: Stripe.Product;
    if (productId) {
      product = await this.stripe.products.update(productId, productUpdateParams);
      console.log("Se esta actualizando un producto con las propiedades: " + product.name);
    } else {
      product = await this.stripe.products.create(productCreateParams);
      console.log("Se esta creando un nuevo producto con las propiedades: " + product.name);
    }

    const priceParams: Stripe.PriceCreateParams = {
      currency: currency,
      unit_amount: price,
      product: product.id,
    };

    if (priceId) {
      const updatePrice = await this.stripe.prices.create(priceParams)
      console.log("Se esta actualizando un precio existente con las propiedades: " + updatePrice.unit_amount);
      return updatePrice;
    } else {
      const price = await this.stripe.prices.create(priceParams);
      console.log("Se esta creando un nuevo precio con las propiedades: " + price.unit_amount);
      return price;
    }
  }

  async retrieveProductInformationById(id: string): Promise<any> {
    console.log('El ID del precio del producto es' + id);
    const product = await this.stripe.prices.retrieve(id);
    return product;
  }

  async deleteProduct(id: string): Promise<any> {
    return this.stripe.products.update(id, {
      active: false
    });
  }

}

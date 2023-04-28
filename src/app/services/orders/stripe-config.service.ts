import { Injectable } from '@angular/core';
import Stripe from 'stripe';

@Injectable({
  providedIn: 'root'
})
export class StripeConfigService {

  private readonly apiKey: string;
  private readonly config: Stripe.StripeConfig;

  constructor() {
    this.apiKey = 'sk_test_51MyyGlAwqI0tPo96rPSHQYi4GUSHwWVL0Xqkwvq8bbNLMOivhdIrEt1PaK6YCQ4Q40KNC8BxpDBvwfGTvCicFCEL00yFjBED2C';
    this.config = {
      timeout: 30000 // 30 seconds in milliseconds
      ,
      apiVersion: '2022-11-15'
    };
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getConfig(): Stripe.StripeConfig {
    return this.config;
  }
}

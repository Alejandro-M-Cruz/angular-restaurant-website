import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import {TranslocoService} from '@ngneat/transloco';
import { createProduct } from 'src/app/api/stripe';

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
  ) { }

  getActiveLanguage() {
    return this.translationService.getActiveLang()
  }

  clearCart(){
    this.cartService.clearCart()
  }

  createProduct(){
    for(let i = 0; i <= this.cartItems.length; i++){
      createProduct(
        this.cartItems[i].menuItem.name,
        this.cartItems[i].menuItem.ingredients,
        this.cartItems[i].menuItem.price,
        'EUR',
        this.cartItems[i].menuItem.imageUrl
      );
    }
  }

}

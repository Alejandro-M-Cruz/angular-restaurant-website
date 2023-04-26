import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import {TranslocoService} from '@ngneat/transloco';

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

}

import { Component } from '@angular/core';
import { CartService } from 'src/app/services/orders/cart.service';
import { TranslocoService } from '@ngneat/transloco';
import {OrderCheckoutService} from "../../services/orders/order-checkout.service";
import {Location} from "@angular/common";
import {Address} from 'src/app/model/order.model';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = this.cartService.getCartItems()
  addressForm = this.formBuilder.group({
    city: ['', [Validators.maxLength(Address.CITY_MAX_LENGTH), Validators.required]],
    street: ['', [Validators.maxLength(Address.STREET_MAX_LENGTH), Validators.required]],
    streetNumber: new FormControl<number | null>(null, [
      Validators.min(0),
      Validators.max(Address.MAX_STREET_NUMBER),
      Validators.required
    ]),
    postalCode: new FormControl<number | null>(null, [
      Validators.min(Address.MIN_POSTAL_CODE),
      Validators.max(Address.MAX_POSTAL_CODE),
      Validators.required
    ]),
    additionalData: this.formBuilder.group({
      storey: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      doorNumber: new FormControl(null, [Validators.min(0), Validators.max(10000)]),
      comments: ['', Validators.maxLength(100)]
    })
  })
  isHomeDelivery = false

  constructor(
    private readonly cartService: CartService,
    private readonly orderCheckoutService: OrderCheckoutService,
    private readonly translationService: TranslocoService,
    private readonly formBuilder: FormBuilder,
    public readonly location: Location
  ) { }

  getActiveLanguage() {
    return this.translationService.getActiveLang()
  }

  clearCart() {
    this.cartService.clearCart()
  }

  async onBuyButtonClicked(){
    // TODO VALIDATE ADDRESS
  }

  private goToCheckout() {
    this.orderCheckoutService.goToCheckout(
      this.isHomeDelivery ? this.addressForm.value as Address : undefined
    )
  }

  onDeliveryOptionChanged(isHomeDelivery: boolean) {
    this.isHomeDelivery = isHomeDelivery
  }
}

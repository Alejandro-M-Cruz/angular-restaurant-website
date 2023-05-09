import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {TranslocoService} from "@ngneat/transloco";
import {CartService} from "./cart.service";
import {AlertsService} from "../alerts.service";
import {ErrorAlert} from "../../alerts/error-alert.alerts";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class OrderCheckoutService {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly cartService: CartService,
    private readonly translateService: TranslocoService,
    private readonly alertsService: AlertsService
  ) { }

  goToCheckout() {
    this.http.post(environment.apiUrl + '/orders/checkout', {
      cartItems: this.cartService
        .getCartItems()
        .map(cartItem => ({...cartItem, subtotalPrice: cartItem.subtotalPrice})),
      userId: this.userService.currentUser!.uid,
      activeLanguage: this.translateService.getActiveLang()
    }).subscribe(response => this.redirectToCheckoutUrl(response))
  }

  private async redirectToCheckoutUrl(response: any): Promise<void> {
    if (response.error)
      return this.alertsService.showErrorAlert(ErrorAlert.ORDER_CHECKOUT_CREATION_FAILED)
    window.location.href = response.url
  }
}

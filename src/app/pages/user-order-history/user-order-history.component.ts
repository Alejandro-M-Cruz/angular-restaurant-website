import { Component } from '@angular/core';
import {OrdersService} from "../../services/orders/orders.service";
import {TranslocoService} from "@ngneat/transloco";
import {CartService} from "../../services/orders/cart.service";
import {Order} from "../../model/order.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent {
  readonly userOrders = this.ordersService.getAllUserOrders()

  constructor(
    private readonly ordersService: OrdersService,
    private readonly translateService: TranslocoService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  get activeLanguage(): string {
    return this.translateService.getActiveLang()
  }

  async repeatOrder(order: Order) {
    this.cartService.setPreviousOrderItems(order)
    await this.router.navigate(['/user-order'])
  }
}

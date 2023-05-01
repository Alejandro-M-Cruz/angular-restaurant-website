import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/services/orders/cart.service';
import { CurrentOrderService } from 'src/app/services/orders/current-order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {
  cartItems = this.cartService.getCartItems()

  constructor(
    private readonly fb:FormBuilder,
    private readonly currentOrderService:CurrentOrderService,
    private readonly user:UserService,
    private readonly cartService:CartService
  ){}

  get totalPrice(){
    return this.cartItems.reduce((total, cartItem) => total + cartItem.subtotalPrice, 0)
  }
}

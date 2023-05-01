import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { CartService } from 'src/app/services/orders/cart.service';
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
    private readonly user:UserService,
    private readonly cartService:CartService
  ){}

  get totalPrice(){
    return this.cartItems.reduce((total, cartItem) => total + cartItem.subtotalPrice, 0)
  }
}

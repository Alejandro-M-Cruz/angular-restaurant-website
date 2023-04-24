import { Component } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {

  constructor(private cartService: CartService) { }

  clearCart(){
    this.cartService.clearCart()
  }
}

import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})

export class UserOrderComponent {

  constructor(private cartService: CartService) { }

}

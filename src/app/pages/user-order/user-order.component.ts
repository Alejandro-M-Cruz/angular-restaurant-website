import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {


  order:Order;
  form = this.fb.group({
    isHomeDelivery: [false, [Validators.required]],
    deliveryAddress: ['']
  })


  constructor(private cartService: CartService,private readonly fb:FormBuilder) {
    this.order = new Order();
    this.order.cartItems = this.cartService.getCartItems();
  }

  ngOnInit(){
    this.form.controls.isHomeDelivery.valueChanges.subscribe(isHomeDelivery => {
        this.form.controls.deliveryAddress.setValidators(isHomeDelivery ? [Validators.required] : []);
        this.order.isHomeDelivery = isHomeDelivery!;
     })
  }
}

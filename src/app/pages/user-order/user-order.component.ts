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
export class UserOrderComponent implements OnInit {
  newOrder: Order = new Order();
  form = this.fb.group({
    isHomeDelivery: [false],
    deliveryAddress: [''],
    tip:[0]
  });

  constructor(
    private readonly fb:FormBuilder,
    private readonly currentOrderService:CurrentOrderService,
    private readonly user:UserService,
    private readonly cartService:CartService
  ){
    this.newOrder.cartItems = this.cartService.getCartItems();
  }

  ngOnInit(){
    this.form.controls.isHomeDelivery.valueChanges.subscribe(isHomeDelivery => {
        this.form.controls.deliveryAddress.setValidators(isHomeDelivery ? [Validators.required] : []);
        this.newOrder.isHomeDelivery = isHomeDelivery!;
     })
     this.form.controls.tip.valueChanges.subscribe(tipValue =>{
      this.newOrder.tip = tipValue;
     })
     this.currentOrderService.currentOrder = this.newOrder;
  }

  get totalPrice(){
    return this.currentOrderService.totalPrice;
  }

}

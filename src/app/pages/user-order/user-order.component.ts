import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  order: Order = new Order(this.cartService.getCartItems(), false);
  tipOptions = Order.TIP_OPTIONS;
  form = this.fb.group({
    isHomeDelivery: [false, [Validators.required]],
    deliveryAddress: [''],
    tip:[0]
  });
  customTipFormControl = new FormControl<number>(
    0,
    [Validators.min(0), Validators.max(Order.MAX_TIP)]
  );

  constructor(private readonly cartService: CartService, private readonly fb:FormBuilder) {}

  ngOnInit(){
    this.customTipFormControl.disable()
    this.form.controls.isHomeDelivery.valueChanges.subscribe(isHomeDelivery => {
        this.form.controls.deliveryAddress.setValidators(isHomeDelivery ? [Validators.required] : []);
        this.order.isHomeDelivery = isHomeDelivery!;
     })
  }

  onCustomTipOptionSelected() {
    this.customTipFormControl.enable()
    this.form.controls.tip.setValue(this.customTipFormControl.value ?? 0)
  }

  onCustomTipOptionDeselected() {
    this.customTipFormControl.disable()
  }

}

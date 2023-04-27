import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CurrentOrderService } from 'src/app/services/current-order.service';



@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  form = this.fb.group({
    isHomeDelivery: [false, [Validators.required]],
    deliveryAddress: ['']
  })

  constructor(
    private readonly fb:FormBuilder,
    private readonly order:CurrentOrderService) {

  }

  ngOnInit(){
    this.form.controls.isHomeDelivery.valueChanges.subscribe(isHomeDelivery => {
        this.form.controls.deliveryAddress.setValidators(isHomeDelivery ? [Validators.required] : []);
        this.order.isHomeDelivery = isHomeDelivery!;
        this.order.deliveryAddress= isHomeDelivery? this.form.controls.deliveryAddress.value!: "";
     })

  }

  get totalPrice(){
    return this.order.currentOrder.totalPriceIncludingTip;
  }
}

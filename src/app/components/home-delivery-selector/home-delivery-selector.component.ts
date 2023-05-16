import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../model/order.model";

@Component({
  selector: 'app-home-delivery-selector',
  templateUrl: './home-delivery-selector.component.html',
  styleUrls: ['./home-delivery-selector.component.css']
})
export class HomeDeliverySelectorComponent implements OnInit {
  readonly homeDeliveryFee = Order.HOME_DELIVERY_FEE
  @Input() default!: boolean
  isHomeDelivery?: boolean
  @Output() deliveryOptionChanged = new EventEmitter<boolean>()

  ngOnInit() {
    this.isHomeDelivery = this.default
  }

  onDeliveryOptionChanged(isHomeDelivery: boolean) {
    this.deliveryOptionChanged.emit(this.isHomeDelivery = isHomeDelivery)
  }
}

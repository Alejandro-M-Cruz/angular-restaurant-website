import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { CartService } from './cart.service';
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentOrderService {
  currentOrder=new Order;
  constructor(
    private cart:CartService,
    private orderService:OrdersService
    ) {
    this.currentOrder.id = "!!!"
    this.currentOrder.cartItems = this.cart.getCartItems();
    this.currentOrder.isFinished = false;
  }
  set id(id:string){
    this.currentOrder.id = id;
  }
  set tip(tip: number | null){
    this.currentOrder.tip = tip;
  }
  set creationTimestamp(creationTimestamp: Date){
    this.currentOrder.creationTimestamp = creationTimestamp;
  }
  public set isHomeDelivery(isHomeDelivery: boolean) {
    this.currentOrder.isHomeDelivery = isHomeDelivery;
  }
  set deliveryAddress(deliveryAddress: string) {
    this.currentOrder.deliveryAddress = deliveryAddress;
  }

  confirmOrder(){
    this.currentOrder.creationTimestamp = new Date();
    this.orderService.addOrder(this.currentOrder);
  }

}

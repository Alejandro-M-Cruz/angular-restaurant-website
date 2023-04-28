import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { OrdersService } from './orders.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentOrderService {
  private _currentOrder=new Order();

  constructor(
    private orderService:OrdersService,
    private readonly userService: UserService
  ) {}

  set currentOrder(order: Order) {
    this._currentOrder = order
    this._currentOrder.userId = this.userService.getCurrentUser()!.uid;
  }

  get totalPrice(){
    return this._currentOrder.totalPriceIncludingTip;
  }

  confirmOrder(){

    this._currentOrder.creationTimestamp = new Date();
    console.log(this._currentOrder);

    this.orderService.addOrder(this._currentOrder);
  }

}

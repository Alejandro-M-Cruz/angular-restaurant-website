import { Component, OnInit } from '@angular/core';
import {translate, TranslocoService} from '@ngneat/transloco';
import {Address, Order} from 'src/app/model/order.model';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-history-admin',
  templateUrl: './order-history-admin.component.html',
  styleUrls: ['./order-history-admin.component.css']
})
export class OrderHistoryAdminComponent implements OnInit{
  private orders: Order[] = []
  allOrders= {orders:[...this.orders]};
  activeOrders =  {orders:[...this.orders]};

  constructor(private readonly orderService:OrdersService,private readonly translationService:TranslocoService){}

  ngOnInit(){
    this.orderService.getAllOrders().subscribe(orders => (this.allOrders.orders as Order[]) = orders);
    this.orderService.getActiveOrders().subscribe(orders => (this.activeOrders.orders as Order[])=orders);
  }

  async completeOrder(id:string){
    await this.orderService.completeOrder(id);
  }

  get activeLanguage() {
    return this.translationService.getActiveLang()
  }

  deliveryAddressToString(address: Address) {
    let addressString = `${address.street}/${address.streetNumber}, ${address.postalCode}, ${address.city}`
    if (address.additionalData.storey)
      addressString += `, ${translate('homeDeliveryAddress.additionalData.storey') + ': ' + address.additionalData.storey}`
    if (address.additionalData.doorNumber)
      addressString += `, ${translate('homeDeliveryAddress.additionalData.doorNumber') + ': ' + address.additionalData.doorNumber}`
    if (address.additionalData.comments)
      addressString += `, ${translate('homeDeliveryAddress.additionalData.comments') + ': ' + address.additionalData.comments}`
    return addressString
  }

}

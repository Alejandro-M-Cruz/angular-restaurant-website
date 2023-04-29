import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, Firestore, orderBy, query, where} from "@angular/fire/firestore";
import {Order} from "../../model/order.model";
import {map, Observable} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly ordersCollection = collection(this.firestore, 'orders')
  constructor(private readonly firestore: Firestore, private readonly userService: UserService) { }

  getAllOrders(): Observable<Order[]> {
    const q = query(this.ordersCollection, orderBy('creationTimestamp', 'desc'))
    return collectionData(q, {idField: 'id'})
      .pipe(map(orders => orders.map((order: any) => {
        order.creationtimestamp = order.creationTimestamp.toDate()
        return order
      }))) as Observable<Order[]>
  }

  getActiveOrders(): Observable<Order[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const q = query(
      this.ordersCollection,
      where('creationTimestamp', '>=', today),
      where('isFinished', '==', false),
      orderBy('creationTimestamp', 'asc')
    )
    return collectionData(q, {idField: 'id'})
      .pipe(map(orders => orders.map((order: any) => {
        order.creationtimestamp = order.creationTimestamp.toDate()
        return order
      }))) as Observable<Order[]>
  }

  getAllUserOrders(): Observable<Order[]> {
    const q = query(
      this.ordersCollection,
      where('userId', '==', this.userService.getCurrentUser()!.uid),
      orderBy('creationTimestamp', 'desc')
    )
    return collectionData(q, {idField: 'id'})
      .pipe(map(orders => orders.map((order: any) => {
        order.creationtimestamp = order.creationTimestamp.toDate()
        return order
      }))) as Observable<Order[]>
  }

  async addOrder(order: Order): Promise<void> {
    await addDoc(this.ordersCollection, {...order})
  }

}

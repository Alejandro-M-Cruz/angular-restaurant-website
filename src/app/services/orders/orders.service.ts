import { Injectable } from '@angular/core';
import {collection, collectionData, doc, Firestore, orderBy, query, updateDoc, where} from "@angular/fire/firestore";
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
        order.creationTimestamp = order.creationTimestamp.toDate()
        return order
      }))) as Observable<Order[]>
  }

  getActiveOrders(): Observable<Order[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const q = query(
      this.ordersCollection,
      where('isFinished', '==', false),
      orderBy('creationTimestamp', 'asc')
    )
    return collectionData(q, {idField: 'id'})
      .pipe(map(orders => orders.map((order: any) => {
        order.creationTimestamp = order.creationTimestamp.toDate()
        return order
      }))) as Observable<Order[]>
  }

  getAllUserOrders(user?:any): Observable<Order[]> {
    const q = query(
      this.ordersCollection,
      where('userId', '==', user ? user.uid :this.userService.currentUser!.uid),
      orderBy('creationTimestamp', 'desc')
    )
    return collectionData(q, {idField: 'id'})
      .pipe(map(orders => orders.map((order: any) => {
        order.creationTimestamp = order.creationTimestamp.toDate()
        return order
      }))) as Observable<Order[]>
  }

  completeOrder(orderId: string): Promise<void> {
    return updateDoc(doc(this.ordersCollection, orderId), {isFinished: true})
  }

}

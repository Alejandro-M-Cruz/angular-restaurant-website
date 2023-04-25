import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, Firestore, orderBy, query, where} from "@angular/fire/firestore";
import {Order} from "../model/order.model";
import {Observable} from "rxjs";
import {Auth} from "@angular/fire/auth";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly ordersCollection = collection(this.firestore, 'orders')
  constructor(private readonly firestore: Firestore, private readonly userService: UserService) { }

  getOrders(): Observable<Order[]> {
    const q = query(this.ordersCollection, orderBy('creationTimestamp'))
    return collectionData(q, {idField: 'id'}) as Observable<Order[]>
  }

  getUserOrders(): Observable<Order[]> {
    const q = query(
      this.ordersCollection,
      where('userId', '==', this.userService.getCurrentUser()!.uid),
      orderBy('creationTimestamp')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Order[]>
  }

  async addOrder(order: Order): Promise<void> {
    await addDoc(this.ordersCollection, order)
  }

}

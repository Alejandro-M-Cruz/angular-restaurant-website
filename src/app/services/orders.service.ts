import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, Firestore, orderBy, query} from "@angular/fire/firestore";
import {Order} from "../model/order.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly ordersCollection = collection(this.firestore, 'orders')
  constructor(private readonly firestore: Firestore) { }

  getOrders(): Observable<Order[]> {
    const q = query(this.ordersCollection, orderBy('creationTimestamp'))
    return collectionData(q, {idField: 'id'}) as Observable<Order[]>
  }

  async addOrder(order: Order): Promise<void> {
    await addDoc(this.ordersCollection, order)
  }


}

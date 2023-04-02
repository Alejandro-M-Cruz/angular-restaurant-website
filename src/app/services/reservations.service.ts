import { Injectable } from '@angular/core'
import {
  addDoc,
  collection, collectionData,
  deleteDoc,
  doc, Firestore,
  orderBy,
  query,
  where
} from "@angular/fire/firestore"
import {Reservation} from "../model/reservation.model"
import {Auth, getAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private readonly firestore: Firestore, private readonly auth: Auth) {
  }

  getReservations() {
    const q = query(
      collection(this.firestore, 'reservations'),
      orderBy('date'),
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  getCurrentReservations() {
    const q = query(
      collection(this.firestore, 'reservations'),
      where('date', '>=', new Date()),    // TODO: fix this
      orderBy('date')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  getUserCurrentReservations() {
    if (!this.auth.currentUser) return new Observable() as Observable<Reservation[]>
    const q = query(
      collection(this.firestore, 'reservations'),
      where('userId', '==', this.auth.currentUser.uid),
      where('date', '>=', new Date()),
      orderBy('date')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  addReservation(reservation: Reservation) {
    return addDoc(collection(this.firestore, 'reservations'), reservation)
  }

  deleteReservation(id: string) {
    return deleteDoc(doc(this.firestore, 'reservations', id))
  }

  isDateWithinRange(date: Date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const min = today.getTime() + 1000 * 60 * 60 * 24 * 2
    const max = today.getTime() + 1000 * 60 * 60 * 24 * 30
    return date.getTime() >= min && date.getTime() <= max
  }
}

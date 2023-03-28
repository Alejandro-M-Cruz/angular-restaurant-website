import { Injectable } from '@angular/core'
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where} from "@angular/fire/firestore"
import {Reservation} from "../model/reservation.model"

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private firestore = getFirestore()

  getReservations() {
    return getDocs(collection(this.firestore, 'reservations'))
  }

  getCurrentReservations() {
    const reservations = collection(this.firestore, 'reservations')
    return getDocs(query(reservations, where('date', '>=', new Date())))
  }

  getUserCurrentReservations(userId: string) {
    const reservations = collection(this.firestore, 'reservations')
    const q = query(reservations, where('userId', '==', userId), where('date', '>=', new Date()))
    return getDocs(q)
  }

  addReservation(reservation: Reservation) {
    return addDoc(collection(this.firestore, 'reservations'), reservation)
  }

  deleteReservation(id: string) {
    return deleteDoc(doc(this.firestore, 'reservations', id))
  }
}

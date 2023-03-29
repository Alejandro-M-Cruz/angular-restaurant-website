import { Injectable } from '@angular/core'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore"
import {Reservation} from "../model/reservation.model"
import {getAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private readonly openingHour = 12
  private readonly closingHour = 22
  private readonly reservationInterval = 30
  private readonly reservationTimes: string[] = []
  private readonly firestore = getFirestore()
  private readonly auth = getAuth()

  constructor() {
    for (let hour = this.openingHour; hour <= this.closingHour; hour++) {
      for (let minute = 0; minute < 60; minute += this.reservationInterval) {
        this.reservationTimes.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
  }

  getReservations() {
    const q = query(
      collection(this.firestore, 'reservations'),
      orderBy('date')
    )
    return getDocs(q)
  }

  getCurrentReservations() {
    const q = query(
      collection(this.firestore, 'reservations'),
      where('date', '>=', new Date()),
      orderBy('date')
    )
    return getDocs(q)
  }

  getUserCurrentReservations() {
    const q = query(
      collection(this.firestore, 'reservations'),
      where('userId', '==', this.auth.currentUser!.uid),
      where('date', '>=', new Date()),
      orderBy('date')
    )
    return getDocs(q)
  }

  async addReservation(reservation: Reservation) {
    return addDoc(collection(this.firestore, 'reservations'), reservation)
  }

  deleteReservation(id: string) {
    return deleteDoc(doc(this.firestore, 'reservations', id))
  }

  isDateAvailable(date: Date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const min = today.getTime() + 1000 * 60 * 60 * 24 * 2
    const max = today.getTime() + 1000 * 60 * 60 * 24 * 30
    return date.getTime() >= min && date.getTime() <= max
  }
}

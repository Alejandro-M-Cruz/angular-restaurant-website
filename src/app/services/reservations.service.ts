import {Injectable} from "@angular/core";
import {Reservation} from "../model/reservation.model";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  where
} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {Observable} from "rxjs";

const MIN_DAYS_BEFOREHAND = 2
const MAX_DAYS_BEFOREHAND = 30
const MAX_CUSTOMERS = 30
const RESERVATION_TIMES = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
  '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
]

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private currentReservations: Reservation[] = []

  constructor(private readonly firestore: Firestore, private readonly auth: Auth) {
    this.getCurrentReservations().subscribe(currentReservations => {
      this.currentReservations = currentReservations
    })
  }

  getReservations() {
    const q = query(
      collection(this.firestore, 'reservations'),
      orderBy('date'),
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  getCurrentReservations() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const q = query(
      collection(this.firestore, 'reservations'),
      where('date', '>=', today),
      orderBy('date')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  getUserCurrentReservations() {
    if (!this.auth.currentUser) return new Observable() as Observable<Reservation[]>    // TODO: fix this
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const q = query(
      collection(this.firestore, 'reservations'),
      where('userId', '==', this.auth.currentUser.uid),
      where('date', '>=', today),
      orderBy('date')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  addReservation(reservation: Reservation) {
    reservation.userId = this.auth.currentUser!.uid
    return addDoc(collection(this.firestore, 'reservations'), reservation)
  }

  deleteReservation(id: string) {
    return deleteDoc(doc(this.firestore, 'reservations', id))
  }

  getAvailableDates() {
    const availableDates: Date[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(today.getTime() + 1000 * 60 * 60 * 24 * MIN_DAYS_BEFOREHAND)
    const maxTime = today.getTime() + 1000 * 60 * 60 * 24 * MAX_DAYS_BEFOREHAND
    while (date.getTime() <= maxTime) {
      if (this.getAvailableTimes(date).length > 0) availableDates.push(new Date(date.getTime()))
      date.setTime(date.getTime() + 1000 * 60 * 60 * 24)
    }
    return availableDates
  }

  getAvailableTimes(date: Date) {
    const availableTimes = [...RESERVATION_TIMES]
    availableTimes.forEach(time => {
      if (this.getAvailableSeats(date, time) <= 0)
        availableTimes.splice(availableTimes.indexOf(time), 1)
    })
    return availableTimes
  }

  getAvailableSeats(date: Date, time: string) {
    let totalCustomers = 0
    this.currentReservations
      .filter(r => r.date.getTime() === date.getTime() && r.time === time)
      .forEach(reservation => totalCustomers += reservation.customers)
    return MAX_CUSTOMERS - totalCustomers
  }

  getMaxCustomers() {
    return MAX_CUSTOMERS
  }
}

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
import {BehaviorSubject, map, Observable} from "rxjs";

const MAX_RESERVATIONS = 5
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
  private readonly currentReservations$ = new BehaviorSubject<Reservation[]>([])

  constructor(private readonly firestore: Firestore, private readonly auth: Auth) {
    this.getCurrentReservationsFromFirestore().subscribe(this.currentReservations$)
  }

  getReservations(): Observable<Reservation[]> {
    const q = query(
      collection(this.firestore, 'reservations'),
      orderBy('date', 'desc')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  private getCurrentReservationsFromFirestore(): Observable<Reservation[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const q = query(
      collection(this.firestore, 'reservations'),
      where('date', '>=', today.getTime()),
      orderBy('date')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  getCurrentReservations(): Observable<Reservation[]> {
    return this.currentReservations$
  }

  getUserCurrentReservations(): Observable<Reservation[]> {
    return this.currentReservations$.pipe(map(reservations =>
      reservations.filter(r => r.userId === this.auth.currentUser!.uid)))
  }

  getMaxReservations() {
    return MAX_RESERVATIONS
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
    const subscription = this.currentReservations$.subscribe(reservations => {
      reservations.filter(r => r.date === date.getTime() && r.time === time)
        .forEach(reservation => totalCustomers += reservation.customers)
      subscription.unsubscribe()
    })
    return MAX_CUSTOMERS - totalCustomers
  }

  getMaxCustomers() {
    return MAX_CUSTOMERS
  }
}

import {Injectable} from "@angular/core";
import {Reservation} from "../model/reservation.model";
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  orderBy,
  query, updateDoc,
  where
} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {BehaviorSubject, first, map, Observable} from "rxjs";

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
  private readonly reservationsCollection = collection(this.firestore, 'reservations')
  private readonly activeReservations$ = new BehaviorSubject<Reservation[]>([])

  constructor(private readonly firestore: Firestore, private readonly auth: Auth) {
    this.loadActiveReservationsFromFirestore().subscribe(this.activeReservations$)
  }

  getAllReservations(): Observable<Reservation[]> {
    const q = query(
      this.reservationsCollection,
      orderBy('date', 'desc')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  private loadActiveReservationsFromFirestore(): Observable<Reservation[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const q = query(
      this.reservationsCollection,
      where('date', '>=', today.getTime()),
      where('isCancelled', '==', false),
      orderBy('date')
    )
    return collectionData(q, {idField: 'id'}) as Observable<Reservation[]>
  }

  getActiveReservations(): Observable<Reservation[]> {
    return this.activeReservations$
  }

  getUserActiveReservations(): Observable<Reservation[]> {
    return this.activeReservations$.pipe(map(reservations =>
      reservations.filter(r => r.userId === this.auth.currentUser!.uid)))
  }

  getMaxReservations() {
    return MAX_RESERVATIONS
  }

  addReservation(reservation: Reservation) {
    reservation.userId = this.auth.currentUser!.uid
    reservation.isCancelled = false
    return addDoc(collection(this.firestore, 'reservations'), reservation)
  }

  cancelReservation(id: string) {
    return updateDoc(doc(this.firestore, 'reservations', id), {isCancelled: true})
  }

  private getAvailableDates(reservations: Reservation[]): Date[] {
    const availableDates: Date[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(today.getTime() + 1000 * 60 * 60 * 24 * MIN_DAYS_BEFOREHAND)
    const maxTime = today.getTime() + 1000 * 60 * 60 * 24 * MAX_DAYS_BEFOREHAND
    while (date.getTime() <= maxTime) {
      if (this.getAvailableTimes(reservations, date).length > 0)
        availableDates.push(new Date(date.getTime()))
      date.setTime(date.getTime() + 1000 * 60 * 60 * 24)
    }
    return availableDates
  }

  getAvailableDatesObservable(): Observable<Date[]> {
    return this.activeReservations$.pipe(map(reservations =>
      this.getAvailableDates(reservations)))
  }

  private getAvailableTimes(reservations: Reservation[], date: Date): string[] {
    const availableTimes = [...RESERVATION_TIMES]
    availableTimes.forEach(time => {
      if (this.getAvailableSeats(reservations, date, time) <= 0)
        availableTimes.splice(availableTimes.indexOf(time), 1)
    })
    return availableTimes
  }

  getAvailableTimesObservable(date: Date): Observable<string[]> {
    return this.activeReservations$.pipe(map(reservations =>
      this.getAvailableTimes(reservations, date)))
  }

  private getAvailableSeats(reservations: Reservation[], date: Date, time: string): number {
    let totalCustomers = 0
    reservations.filter(r => r.date === date.getTime() && r.time === time)
      .forEach(reservation => totalCustomers += reservation.customers)
    return MAX_CUSTOMERS - totalCustomers
  }

  getAvailableSeatsObservable(date: Date, time: string): Observable<number> {
    return this.activeReservations$.pipe(map(reservations =>
      this.getAvailableSeats(reservations, date, time)))
  }

}

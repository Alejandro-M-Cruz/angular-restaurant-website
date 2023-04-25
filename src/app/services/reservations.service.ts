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
import {BehaviorSubject, first, map, Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private readonly reservationsCollection = collection(this.firestore, 'reservations')
  private readonly activeReservations$ = new BehaviorSubject<Reservation[]>([])

  constructor(private readonly firestore: Firestore, private readonly userService: UserService) {
    this.loadActiveReservationsFromFirestore().subscribe(this.activeReservations$)
  }

  getAllReservations(): Observable<Reservation[]> {
    const q = query(this.reservationsCollection, orderBy('date', 'desc'))
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
    console.log(this.userService.getCurrentUser()?.uid)
    return this.activeReservations$.pipe(map(reservations =>
      reservations.filter(r => r.userId === this.userService.getCurrentUser()!.uid)))
  }

  private reservationIsValid(reservation: Reservation): Observable<void> {
    return this.getUserActiveReservations().pipe(map(reservations => {
      if (reservations.find(r => r.date === reservation.date && r.time === reservation.time))
        throw new Error()
      if (reservations.filter(r => r.date === reservation.date).length < Reservation.USER_MAX_RES_IN_SAME_DAY)
        throw new Error()
    }))
  }

  async addReservation(reservation: Reservation) {
    this.reservationIsValid(reservation).pipe(first()).subscribe({
      next: () => {
        reservation.userId = this.userService.getCurrentUser()!.uid
        reservation.isCancelled = false
        addDoc(collection(this.firestore, 'reservations'), reservation)
      },
      error: error => {
        switch(error) {

        }
      }
    })
  }

  cancelReservation(id: string): Promise<void> {
    return updateDoc(doc(this.firestore, 'reservations', id), {isCancelled: true})
  }

  private getAvailableDates(reservations: Reservation[]): Date[] {
    const availableDates: Date[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(today.getTime() + 1000 * 60 * 60 * 24 * Reservation.MIN_DAYS_BEFOREHAND)
    const maxTime = today.getTime() + 1000 * 60 * 60 * 24 * Reservation.MAX_DAYS_BEFOREHAND
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
    const availableTimes = [...Reservation.RESERVATION_TIMES]
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
    return Reservation.MAX_CUSTOMERS - totalCustomers
  }

  getAvailableSeatsObservable(date: Date, time: string): Observable<number> {
    return this.activeReservations$.pipe(map(reservations =>
      this.getAvailableSeats(reservations, date, time)))
  }


}

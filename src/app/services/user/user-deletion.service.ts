import { Injectable } from '@angular/core';
import {first} from "rxjs";
import {AlertError} from "../../errors/alert-error.errors";
import {Auth} from "@angular/fire/auth";
import {ReservationsService} from "../reservations/reservations.service";
import {Reservation} from "../../model/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class UserDeletionService {

  constructor(private readonly auth: Auth, private readonly reservationsService: ReservationsService) { }

  private async deleteCurrentUserAndCancelTheirReservations(reservations: Reservation[]) {
    for (const reservation of reservations)
      await this.reservationsService.cancelReservation(reservation.id!)
    await this.auth.currentUser!.delete()
  }

  async deleteCurrentUser() {
    if (!this.auth.currentUser) return
    let reservations: Reservation[] = []
    this.reservationsService.getUserActiveReservations().pipe(first())
      .subscribe(userReservations => {
        reservations = userReservations
      })
    try {
      await this.deleteCurrentUserAndCancelTheirReservations(reservations)
    } catch (e: any) {
      const error = new Error()
      switch(e.code) {
        case 'auth/requires-recent-login':
          error.name = AlertError.RECENT_LOGIN_REQUIRED
          break
        default:
          error.name = AlertError.UNKNOWN
      }
      throw error
    }

  }
}

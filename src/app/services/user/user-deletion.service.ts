import { Injectable } from '@angular/core';
import {first} from "rxjs";
import {ErrorAlert} from "../../alerts/error-alert.alerts";
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
    this.reservationsService.getUserActiveReservations().pipe(first())
      .subscribe(async userReservations => {
        try {
          await this.deleteCurrentUserAndCancelTheirReservations(userReservations)
          location.reload()
        } catch (e: any) {
          const error = new Error()
          switch(e.code) {
            case 'auth/requires-recent-login':
              error.name = ErrorAlert.RECENT_LOGIN_REQUIRED
              break
            default:
              error.name = ErrorAlert.UNKNOWN
          }
          throw error
        }
      })
  }
}

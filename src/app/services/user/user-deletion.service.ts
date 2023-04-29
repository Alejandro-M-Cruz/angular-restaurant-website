import { Injectable } from '@angular/core';
import {first} from "rxjs";
import {AlertError} from "../../errors/alert-error.errors";
import {Auth} from "@angular/fire/auth";
import {ReservationsService} from "../reservations/reservations.service";

@Injectable({
  providedIn: 'root'
})
export class UserDeletionService {

  constructor(private readonly auth: Auth, private readonly reservationsService: ReservationsService) { }

  private deleteCurrentUserAndTheirReservations() {
    this.reservationsService.getUserActiveReservations().pipe(first()).subscribe(async reservations => {
      reservations.forEach(reservation => {
        this.reservationsService.cancelReservation(reservation.id!)
      })
      await this.auth.currentUser!.delete()
    })
  }

  async deleteCurrentUser(): Promise<void> {
    if (!this.auth.currentUser) return
    try {
      this.deleteCurrentUserAndTheirReservations()
    } catch (e: any) {
      const error = new Error()
      switch(e.code) {
        case 'auth/requires':
          error.name = AlertError.RECENT_LOGIN_REQUIRED
          break
        default:
          error.name = AlertError.UNKNOWN
      }
      throw error
    }
  }
}

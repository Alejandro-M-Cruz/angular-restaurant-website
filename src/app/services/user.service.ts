import { Injectable } from '@angular/core';
import {Auth, authState} from "@angular/fire/auth";
import {User} from "../model/user";
import {Firestore} from "@angular/fire/firestore";
import {BehaviorSubject, first, map, Observable} from "rxjs";
import {ReservationsService} from "./reservations.service";
import {AlertError} from "../errors/alert-error.errors";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly authState$ = new BehaviorSubject<any>(null)

  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore,
    private readonly reservationsService: ReservationsService
  ) {
    authState(this.auth).subscribe(this.authState$)
  }

  private extractUserInfo(user: any): User | null {
    return user ? {
      username: user.displayName,
      email: user.email,
      creationDate: user.metadata.creationTime ? new Date(user.metadata.creationTime) : undefined,
      lastLogInDate: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : undefined
    } as User : null
  }

  getUserInfo(): Observable<User | null> {
    return this.authState$.pipe(map(user => this.extractUserInfo(user)))
  }

  private deleteUserAndTheirReservations() {
    this.reservationsService.getUserActiveReservations().pipe(first()).subscribe(async reservations => {
      reservations.forEach(reservation => {
        this.reservationsService.cancelReservation(reservation.id!)
      })
      await this.auth.currentUser!.delete()
    })
  }

  async deleteUser() {
    if (!this.auth.currentUser) return
    try {
      this.deleteUserAndTheirReservations()
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

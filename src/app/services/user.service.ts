import { Injectable } from '@angular/core';
import {Auth, authState} from "@angular/fire/auth";
import {User} from "../model/user";
import {BehaviorSubject, first, map, Observable} from "rxjs";
import {AlertError} from "../errors/alert-error.errors";
import {ReservationsService} from "./reservations.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly authState$ = new BehaviorSubject<any>(null)

  constructor(private readonly auth: Auth, private readonly reservationsService: ReservationsService) {
    authState(this.auth).subscribe(this.authState$)
  }

  private extractUserInfo(user: any): User | null {
    return user ? {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      creationDate: user.metadata.creationTime ? new Date(user.metadata.creationTime) : undefined,
      lastLogInDate: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : undefined
    } as User : null
  }

  getCurrentUser(): User | null {
    return this.extractUserInfo(this.auth.currentUser)
  }

  getCurrentUserObservable(): Observable<User | null> {
    return this.authState$.pipe(map(user => this.extractUserInfo(user)))
  }

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

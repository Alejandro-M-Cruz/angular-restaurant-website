import { Injectable } from '@angular/core';
import {Auth, authState} from "@angular/fire/auth";
import {UserInfo} from "../model/user-info.model";
import {Firestore} from "@angular/fire/firestore";
import {BehaviorSubject, first, map, Observable} from "rxjs";
import {ReservationsService} from "./reservations.service";
import {AlertErrorCode} from "../errors/alert-error.errors";

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

  private extractUserInfo(user: any): UserInfo | null {
    return user ? {
      username: user.displayName,
      email: user.email,
      creationDate: user.metadata.creationTime ? new Date(user.metadata.creationTime) : undefined,
      lastLogInDate: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : undefined
    } as UserInfo : null
  }

  getUserInfo(): Observable<UserInfo | null> {
    return this.authState$.pipe(map(user => this.extractUserInfo(user)))
  }

  private deleteUserAndTheirReservations() {
    this.reservationsService.getUserCurrentReservations().pipe(first()).subscribe(async reservations => {
      reservations.forEach(reservation => {
        this.reservationsService.deleteReservation(reservation.id!)
      })
      await this.auth.currentUser!.delete()
    })
  }

  async deleteUser() {
    if (!this.auth.currentUser) return
    try {
      this.deleteUserAndTheirReservations()
    } catch (e: any) {
      if (e.code === 'auth/requires-recent-login') {
        const recentLoginRequiredError = new Error()
        recentLoginRequiredError.name = AlertErrorCode.RECENT_LOGIN_REQUIRED
        throw recentLoginRequiredError
      }
    }
  }
}

import { Injectable } from '@angular/core';
import {Auth, authState} from "@angular/fire/auth";
import {UserInfo} from "../model/user-info.model";
import {Firestore} from "@angular/fire/firestore";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ReservationsService} from "./reservations.service";

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
      email: user.email,
      creationDate: user.metadata.creationTime ? new Date(user.metadata.creationTime) : undefined,
      lastLogInDate: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : undefined
    } as UserInfo : null
  }

  getUserInfo(): Observable<UserInfo | null> {
    return this.authState$.pipe(map(user => this.extractUserInfo(user)))
  }

  private deleteUserReservations() {
    const subscription = this.reservationsService.getUserCurrentReservations()
      .subscribe(reservations => {
        reservations.forEach(async reservation => {
          await this.reservationsService.deleteReservation(reservation.id!)
        })
        subscription.unsubscribe()
      })
  }

  async deleteUser() {
    if (this.auth.currentUser === null) return
    try {
      await this.auth.currentUser.delete()
      this.deleteUserReservations()
    } catch (e: any) {
      if (e.code === 'auth/requires-recent-login') throw Error('redirect-to-login')
    }
  }
}

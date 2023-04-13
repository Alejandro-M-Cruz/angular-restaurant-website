import { Injectable } from '@angular/core';
import {Auth, onAuthStateChanged} from "@angular/fire/auth";
import {UserInfo} from "../model/user-info.model";
import {collection, deleteDoc, Firestore, getDocs, query, where} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly auth: Auth, private readonly firestore: Firestore) {}

  private extractUserInfo(user: any): UserInfo {
    return {
      email: user.email,
      creationDate: user.metadata.creationTime ? new Date(user.metadata.creationTime) : undefined,
      lastLogInDate: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : undefined
    } as UserInfo
  }

  getUserInfo(): UserInfo | null {
    if (this.auth.currentUser === null) return null
    return this.extractUserInfo(this.auth.currentUser)
  }

  getUserInfoObservable(): Observable<UserInfo> {
    return new Observable<UserInfo>(subscriber => {
      onAuthStateChanged(this.auth, user => {
        if (user) subscriber.next(this.extractUserInfo(user))
      })
    })
  }

  async deleteUser() {
    if (this.auth.currentUser === null) return
    try {
      await this.auth.currentUser.delete()
      const q = query(
        collection(this.firestore, 'reservations'),
        where('userId', '==', this.auth.currentUser.uid)
      )
      const userReservations = await getDocs(q)
      userReservations.forEach(reservation => deleteDoc(reservation.ref))
    } catch (e: any) {
      if (e.code === 'auth/requires-recent-login') throw Error('redirect-to-login')
    }
  }
}

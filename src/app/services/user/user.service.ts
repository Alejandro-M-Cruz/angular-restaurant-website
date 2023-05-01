import { Injectable } from '@angular/core';
import {Auth, authState} from "@angular/fire/auth";
import {User} from "../../model/user";
import {BehaviorSubject, map, Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly authState$ = new BehaviorSubject<any>(null)
  private authStateSubscription?: Subscription

  constructor(private readonly auth: Auth) {
    this.reloadAuthState()
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

  get currentUser(): User | null {
    return this.extractUserInfo(this.auth.currentUser)
  }

  get currentUser$(): Observable<User | null> {
    return this.authState$.pipe(map(user => this.extractUserInfo(user)))
  }

  reloadAuthState() {
    this.authStateSubscription?.unsubscribe()
    this.authStateSubscription = authState(this.auth).subscribe(this.authState$)
  }
}

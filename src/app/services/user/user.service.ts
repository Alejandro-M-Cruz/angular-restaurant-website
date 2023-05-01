import { Injectable } from '@angular/core';
import {Auth, authState, onAuthStateChanged} from "@angular/fire/auth";
import {User} from "../../model/user";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly authState$ = new BehaviorSubject<any>(null)

  constructor(private readonly auth: Auth) {
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

  get currentUser(): User | null {
    return this.extractUserInfo(this.auth.currentUser)
  }

  get currentUser$(): Observable<User | null> {
    return this.authState$.pipe(map(user => this.extractUserInfo(user)))
  }
}

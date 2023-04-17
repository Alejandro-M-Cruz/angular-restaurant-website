import {Injectable} from '@angular/core';
import {Auth, onAuthStateChanged} from "@angular/fire/auth";
import {collection, Firestore, getDocs, query, where} from "@angular/fire/firestore";
import {BehaviorSubject, map, Observable} from "rxjs";

enum UserStatus {
  LOGGED_OUT,
  LOGGED_IN,
  ADMIN
}

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private readonly userStatus$ = new BehaviorSubject(UserStatus.LOGGED_OUT)

  constructor(private readonly auth: Auth, private readonly firestore: Firestore) {
    onAuthStateChanged(this.auth, user => {
      if (user === null) {
        this.userStatus$.next(UserStatus.LOGGED_OUT)
        return
      }
      this.isUserInAdminsCollection(user.uid).then(isAdmin => {
        isAdmin ? this.userStatus$.next(UserStatus.ADMIN) : this.userStatus$.next(UserStatus.LOGGED_IN)
      })
    })
  }

  private isUserInAdminsCollection(uid: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'admins'),
      where('uid', '==', uid)
    )
    return getDocs(q).then(querySnapshot => querySnapshot.size > 0)
  }

  isLoggedOut(): Observable<boolean> {
    return this.userStatus$.pipe(map(userStatus => userStatus === UserStatus.LOGGED_OUT))
  }

  isLoggedIn(): Observable<boolean> {
    return this.userStatus$.pipe(map(userStatus => userStatus !== UserStatus.LOGGED_OUT))
  }

  isAdmin(): Observable<boolean> {
    return this.userStatus$.pipe(map(userStatus => userStatus === UserStatus.ADMIN))
  }
}

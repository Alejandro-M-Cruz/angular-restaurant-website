import {Injectable} from '@angular/core';
import {collection, doc, Firestore, getDoc} from "@angular/fire/firestore";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserService} from "./user.service";
import {UserStatus} from "../../model/user-status.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private readonly adminsCollection = collection(this.firestore, 'admins')
  private readonly userStatus$ = new BehaviorSubject(UserStatus.UNKNOWN)

  constructor(
    private readonly userService: UserService,
    private readonly firestore: Firestore
  ) {
    this.subscribeToCurrentUser$()
  }

  private subscribeToCurrentUser$() {
    this.userService.currentUser$.subscribe(user => {
      if (user === null)
        return this.userStatus$.next(UserStatus.LOGGED_OUT)
      this.userStatus$.next(UserStatus.UNKNOWN)
      this.adminsCollectionIncludesUser(user.uid).then(isAdmin => {
        isAdmin ? this.userStatus$.next(UserStatus.ADMIN) : this.userStatus$.next(UserStatus.LOGGED_IN)
      })
    })
  }

  getUserStatus$(): Observable<UserStatus> {
    return this.userStatus$
  }

  private adminsCollectionIncludesUser(uid: string): Promise<boolean> {
    return getDoc(doc(this.adminsCollection, uid)).then(doc => doc.exists())
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

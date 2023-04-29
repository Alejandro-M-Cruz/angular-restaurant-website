import {Injectable} from '@angular/core';
import {collection, doc, Firestore, getDoc} from "@angular/fire/firestore";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserService} from "./user.service";

enum UserStatus {
  LOGGED_OUT,
  LOGGED_IN,
  ADMIN
}

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private readonly adminsCollection = collection(this.firestore, 'admins')
  private readonly userStatus$ = new BehaviorSubject(UserStatus.LOGGED_OUT)

  constructor(private readonly userService: UserService, private readonly firestore: Firestore) {
    this.userService.getCurrentUserObservable().subscribe(user => {
      if (user === null)
        return this.userStatus$.next(UserStatus.LOGGED_OUT)
      this.adminsCollectionIncludesUser(user.uid).then(isAdmin => {
        isAdmin ? this.userStatus$.next(UserStatus.ADMIN) : this.userStatus$.next(UserStatus.LOGGED_IN)
      })
    })
  }

  private adminsCollectionIncludesUser(uid: string): Promise<boolean> {
    return getDoc(doc(this.adminsCollection, uid)).then(documentSnapshot => documentSnapshot.exists())
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

import {Injectable} from '@angular/core';
import {Auth, onAuthStateChanged} from "@angular/fire/auth";
import {collection, collectionData, Firestore, getDocs, query, where} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private readonly auth: Auth, private readonly firestore: Firestore) {}

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      onAuthStateChanged(this.auth, user => {
        subscriber.next(user !== null)
      })
    })
  }

  isAdmin(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      onAuthStateChanged(this.auth, user => {
        if (user === null) return subscriber.next(false)
        const q = query(
          collection(this.firestore, 'admins'),
          where('uid', '==', user.uid)
        )
        getDocs(q).then(querySnapshot => {
          subscriber.next(querySnapshot.size > 0)
        })
      })
    })
  }

}

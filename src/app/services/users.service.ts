import { Injectable } from '@angular/core';
import {getFirestore} from "@angular/fire/firestore";
import {getAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private auth = getAuth()
  private firestore = getFirestore()

  getUser() {
    return this.auth.currentUser
  }

  deleteUser() {
    return this.auth.currentUser?.delete()
  }
}

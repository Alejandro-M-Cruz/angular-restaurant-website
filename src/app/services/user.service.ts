import { Injectable } from '@angular/core';
import {Auth, getAuth} from "@angular/fire/auth";
import {UserInfo} from "../model/user-info.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly auth: Auth) {}

  getUserInfo() {
    if (this.auth.currentUser  === null) return null
    return {
      email: this.auth.currentUser.email,
      creationDate: new Date(this.auth.currentUser.metadata.creationTime ?? Date.now()),
      lastLogInDate: new Date(this.auth.currentUser.metadata.lastSignInTime ?? Date.now())
    } as UserInfo
  }

  deleteUser() {
    this.auth.currentUser?.delete()
  }
}

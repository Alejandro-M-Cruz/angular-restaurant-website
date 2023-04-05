import { Injectable } from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {UserInfo} from "../model/user-info.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly auth: Auth) {}

  getUserInfo() {
    const user = this.auth.currentUser
    if (user === null) return null
    return {
      email: user.email,
      creationDate: user.metadata.creationTime ? new Date(user.metadata.creationTime) : undefined,
      lastLogInDate: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : undefined
    } as UserInfo
  }

  deleteUser() {
    this.auth.currentUser?.delete()
  }
}

import { Injectable } from '@angular/core';
import {Auth, getAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly auth: Auth) {}

  getUser() {
    return this.auth.currentUser
  }

  deleteUser() {
    return this.auth.currentUser?.delete()
  }
}

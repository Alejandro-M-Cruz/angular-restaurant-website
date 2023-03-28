import { Injectable } from '@angular/core';
import {getAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private auth = getAuth()

  getUser() {
    return this.auth.currentUser
  }

  deleteUser() {
    return this.auth.currentUser?.delete()
  }
}

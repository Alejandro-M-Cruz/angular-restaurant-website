import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from '@angular/fire/auth';


const PASSWORD_MIN_LENGTH = 4
const PASSWORD_MAX_LENGTH = 16

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private readonly auth: Auth) {}

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
    // await updateProfile(userCredential.user, { displayName: username })
  }

  logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut() {
    return this.auth.signOut()
  }

  getPasswordMinLength() {
    return PASSWORD_MIN_LENGTH
  }

  getPasswordMaxLength() {
    return PASSWORD_MAX_LENGTH
  }
}

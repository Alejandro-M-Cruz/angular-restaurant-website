import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from '@angular/fire/auth';
import {FormError} from "../errors/form-error.errors";
import {AlertError} from "../errors/alert-error.errors";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private readonly auth: Auth) {}

  async signUp(username: string, email: string, password: string): Promise<void> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password)
      await updateProfile(result.user, { displayName: username })
    } catch (e: any) {
      const error = new Error()
      switch(e.code) {
        case 'auth/email-already-in-use':
          error.name = FormError.EMAIL_ALREADY_IN_USE
          break
        default:
          error.name = AlertError.UNKNOWN
          break
      }
      throw error
    }
  }

  async logIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e: any) {
      const error = new Error()
      switch(e.code) {
        case 'auth/wrong-password':
          error.name = FormError.WRONG_EMAIL_OR_PASSWORD
          break
        case 'auth/user-not-found':
          error.name = FormError.WRONG_EMAIL_OR_PASSWORD
          break
        case 'auth/too-many-requests':
          error.name = AlertError.TOO_MANY_LOGIN_REQUESTS
          break
        default:
          error.name = AlertError.UNKNOWN
          break
      }
      throw error
    }
  }

  logOut(): Promise<void> {
    return this.auth.signOut()
  }

  getUsernameMaxLength(): number {
    return User.USERNAME_MAX_LENGTH
  }

  getPasswordMinLength(): number {
    return User.PASSWORD_MIN_LENGTH
  }

  getPasswordMaxLength(): number {
    return User.PASSWORD_MAX_LENGTH
  }
}

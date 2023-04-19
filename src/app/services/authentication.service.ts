import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from '@angular/fire/auth';
import {FormErrorCode} from "../errors/form-error.errors";
import {AlertErrorCode} from "../errors/alert-error.errors";

const USERNAME_MAX_LENGTH = 32
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 16

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private readonly auth: Auth) {}

  async signUp(username: string, email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password)
      await updateProfile(result.user, { displayName: username })
    } catch (e: any) {
      const error = new Error()
      switch(e.code) {
        case 'auth/email-already-in-use':
          error.name = FormErrorCode.EMAIL_ALREADY_IN_USE
          break
        default:
          error.name = AlertErrorCode.UNKNOWN
          break
      }
      throw error
    }
  }

  async logIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e: any) {
      const error = new Error()
      switch(e.code) {
        case 'auth/wrong-password':
          error.name = FormErrorCode.WRONG_EMAIL_OR_PASSWORD
          break
        case 'auth/user-not-found':
          error.name = FormErrorCode.WRONG_EMAIL_OR_PASSWORD
          break
        case 'auth/too-many-requests':
          error.name = AlertErrorCode.TOO_MANY_LOGIN_REQUESTS
          break
        default:
          error.name = AlertErrorCode.UNKNOWN
          break
      }
      throw error
    }
  }

  logOut() {
    return this.auth.signOut()
  }

  getUsernameMaxLength(): number {
    return USERNAME_MAX_LENGTH
  }

  getPasswordMinLength(): number {
    return PASSWORD_MIN_LENGTH
  }

  getPasswordMaxLength(): number {
    return PASSWORD_MAX_LENGTH
  }
}

import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from '@angular/fire/auth';
import {FormErrorName} from "../errors/form-error.errors";
import {ActionErrorName} from "../errors/action-error.errors";

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
      console.error(e)
      if (e.code === 'auth/email-already-in-use') {
        const emailAlreadyInUseError = new Error()
        emailAlreadyInUseError.name = FormErrorName.EMAIL_ALREADY_IN_USE
        throw emailAlreadyInUseError
      }
    }
  }

  async logIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e: any) {
      if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
        const wrongEmailOrPasswordError = new Error()
        wrongEmailOrPasswordError.name = FormErrorName.WRONG_EMAIL_OR_PASSWORD as string
        throw wrongEmailOrPasswordError
      }
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

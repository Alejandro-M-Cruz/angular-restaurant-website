import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from '@angular/fire/auth';
import firebase from "firebase/compat";


const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 16

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private readonly auth: Auth) {}

  async signUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        const error = new Error('Email already in use')
        error.name = 'emailAlreadyInUse'
        throw error
      }
      throw new Error()
    }
  }

  async logIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);

    } catch (e: any) {
      if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
        const error = new Error('Wrong password')
        error.name = 'wrongEmailOrPassword'
        throw error
      }
      throw new Error()
    }
  }

  isLoggedIn() {
    return !!this.auth.currentUser
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

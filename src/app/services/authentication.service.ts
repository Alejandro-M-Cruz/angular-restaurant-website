import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private readonly auth: Auth) {
  }

  async logIn(email: string, password: string) {
      try {
          const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
          return userCredential.user;
      } catch (error) {
          console.error(error);
          return { error: "FAILED_LOGIN" }
      }
  }

  async signUp(username:string, email: string, password: string) {
      try {
          const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
          await updateProfile(userCredential.user, { displayName: username })
          return userCredential.user;
      } catch (error) {
          console.error(error);
          return { error: "DUPLICATE_USER" }
      }
  }

}

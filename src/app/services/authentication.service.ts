import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    auth = getAuth();

    constructor() {

    }

    async login(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error(error);
            return { error: "FAILED_LOGIN" }
        }
    }

    async signup(email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error(error);
            return { error: "DUPLICATE_USER" }
        }
    }
}

import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    auth = getAuth();

    constructor() {

    }

    async signup(email: string, password: string) {
        try {
            const response = await createUserWithEmailAndPassword(this.auth, email, password);
            return response.user;
        } catch (error) {
            console.error(error);
            return { error: "DUPLICATE_USER" }
        }
    }
}

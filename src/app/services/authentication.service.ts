import { Injectable } from '@angular/core';
import {getAuth, updateProfile} from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import {addDoc, collection, getFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    auth = getAuth();
    firestore = getFirestore();

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

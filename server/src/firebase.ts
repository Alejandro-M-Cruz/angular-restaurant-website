import dotenv from 'dotenv'
dotenv.config()
import {applicationDefault, initializeApp} from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'
import {getAuth} from 'firebase-admin/auth'

const app = initializeApp({
  credential: applicationDefault()
})

export const auth = getAuth(app)
export const firestore = getFirestore(app)

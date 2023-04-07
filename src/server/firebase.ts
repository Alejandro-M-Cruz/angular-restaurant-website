import dotenv from 'dotenv'
dotenv.config()
import {applicationDefault, initializeApp} from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'

initializeApp({
  credential: applicationDefault()
})

const db = getFirestore()

export default db

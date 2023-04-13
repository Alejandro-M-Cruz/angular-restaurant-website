import express from 'express'
const router = express.Router()
import {Complaint} from "../../../src/app/model/complaint.model";
import {firestore} from "../firebase";

router.get('/', async (_req, res) => {
  const querySnapshot = await firestore.collection('complaints').get()
  res.json(querySnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  }) as Complaint[])
})

export default router

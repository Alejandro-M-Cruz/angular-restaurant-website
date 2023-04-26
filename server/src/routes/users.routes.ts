import express from 'express'
const router = express.Router()
import {auth} from '../firebase'

/*router
  .get('/', (_req, res) => res.send(Users.getUsers()))
  .get('/:uid', (req, res) => res.send(Users.getUserById(req.params.uid)))*/

function firestoreUserRecordToUser(user: any) {
  return {
    uid: user.uid,
    username: user.displayName,
    email: user.email,
    creationDate: new Date(user.metadata.creationTime),
    lastLogInDate: new Date(user.metadata.lastSignInTime)
  }
}

router.get('/', async (_req, res) => {
  try {
    const usersList = await auth.listUsers()
    res.json(usersList.users.map(firestoreUserRecordToUser))
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

router.get('/:uid', async (req, res) => {
  try {
    const user = await auth.getUser(req.params.uid)
    res.json(firestoreUserRecordToUser(user))
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

export default router

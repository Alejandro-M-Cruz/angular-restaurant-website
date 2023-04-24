import express from 'express'
const router = express.Router()
import {auth} from '../firebase'
import {User} from "../../../src/app/model/user";

router.get('/', async (req, res) => {
  const usersList = await auth.listUsers()
  res.json(usersList.users.map(user => ({
    uid: user.uid,
    email: user.email,
    creationDate: new Date(user.metadata.creationTime),
    lastLogInDate: new Date(user.metadata.lastSignInTime)
  })) as User[])
})

router.get('/:uid', async (req, res) => {
  const user = await auth.getUser(req.params.uid)
  res.json({
    uid: req.params.uid,
    email: user.email,
    creationDate: new Date(user.metadata.creationTime),
    lastLogInDate: new Date(user.metadata.lastSignInTime)
  } as User)
})

export default router

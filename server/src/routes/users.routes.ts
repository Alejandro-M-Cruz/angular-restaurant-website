import express from 'express'
import UsersController from '../controllers/users.controller'

const router = express.Router()

/*router
  .get('/', (_req, res) => res.send(Users.getUsers()))
  .get('/:uid', (req, res) => res.send(Users.getUserById(req.params.uid)))*/

router.get('/', UsersController.getUsers)

router.get('/:uid', UsersController.getUserById)

export default router

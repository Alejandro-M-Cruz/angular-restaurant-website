import express from 'express'
import EmailConfirmationsController from '../controllers/email-confirmations.controller'

const router = express.Router()

router.post('/', EmailConfirmationsController.sendMessage)

export default router

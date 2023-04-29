import express from 'express'
import StripeController from "../controllers/stripe.controller";
const router = express.Router()

router
  .post('/checkout', StripeController.createCheckoutSession)
  .post('/webhook', StripeController.webhook)

export default router

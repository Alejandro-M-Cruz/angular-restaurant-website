import express from 'express'
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51MyyGlAwqI0tPo96rPSHQYi4GUSHwWVL0Xqkwvq8bbNLMOivhdIrEt1PaK6YCQ4Q40KNC8BxpDBvwfGTvCicFCEL00yFjBED2C', {
  timeout: 60000,
  apiVersion: '2022-11-15'
})
const router = express.Router()

const cartItemToLineItem = (cartItem: any, activeLang: string): Stripe.Checkout.SessionCreateParams.LineItem =>  {
  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    price: cartItem.menuItem.priceIdStripe,
    quantity: cartItem.amount,
    price_data: {
      currency: 'eur',
      product_data: {
        name: cartItem.menuItem.name[activeLang],
        description: cartItem.menuItem.ingredients[activeLang]
      },
      unit_amount: Math.round(cartItem.menuItem.price * 100)
    }
  }
  if (cartItem.menuItem.imageUrl)
    lineItem.price_data!.product_data!.images = [cartItem.menuItem.imageUrl]
  return lineItem
}

const shippingOptions = (activeLang: string): any => {
  return {
    shipping_address_collection: {
      allowed_countries: ['ES']
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'eur',
          },
          display_name: activeLang === 'es' ? 'A recoger en el restaurante' : 'Order to pick up'
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 399,
            currency: 'eur',
          },
          display_name: activeLang === 'es' ? 'Pedido a domicilio' : 'Home delivery'
        }
      }
    ]
  }
}

router.post('/checkout', async (req, res, next) => {
  try {
    let sessionParams: Stripe.Checkout.SessionCreateParams = {
      locale: ['en', 'es'].includes(req.body.activeLanguage) ? req.body.activeLanguage : 'en',
      payment_method_types: ['card'],
        line_items: req.body.order.cartItems
      .map(cartItem => cartItemToLineItem(cartItem, req.body.activeLanguage)),
      mode: 'payment',
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:3000/cancel.html'
    }
    if (req.body.order.isHomeDelivery) {
      sessionParams = {
        ...sessionParams,
        ...shippingOptions(req.body.activeLanguage)
      }
    }
    const session = await stripe.checkout.sessions.create(sessionParams)
    res.status(200).json(session)
  } catch (error: any) {
    res.status(500).json({error: error.code, message: error.message})
  }
})

export default router

import Stripe from 'stripe'
import OrdersDao from '../dao/orders.dao'
import OrderPaymentsDao from '../dao/order-payments.dao'

export default class StripeController {
  private static readonly stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    timeout: 60000,
    apiVersion: '2022-11-15'
  })

  static async createCheckoutSession(req, res) {
    try {
      const sessionParams = this.sessionParams(req.body.order, req.body.activeLanguage)
      const session = await this.stripe.checkout.sessions.create(sessionParams)
      await OrderPaymentsDao.add(session.id, req.body.order)
      res.status(200).send(session.url)
    } catch (error: any) {
      res.status(400).json({error: error.code, message: error.message})
    }
  }

  static async webhook(req, res) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature']!,
        process.env.STRIPE_ENDPOINT_SECRET!
      )
      switch(event.type) {
        case 'payment_intent.succeeded':
          await this.onPaymentSucceeded(event.data.object as Stripe.PaymentIntent)
          break
        case 'payment_intent.payment_failed':
          await this.onPaymentFailed(event.data.object as Stripe.PaymentIntent)
          break
        default:
          res.sendStatus(200)
      }
      res.sendStatus(200)
    } catch (error: any) {
      res.status(400).json({error: error.code, message: error.message})
    }
  }

  private static async onPaymentSucceeded(successfulPayment: Stripe.PaymentIntent) {
    const order = await OrderPaymentsDao.getOrderFromPaymentId(successfulPayment.id)
    await OrdersDao.addOrder(order)
    await OrderPaymentsDao.delete(successfulPayment.id)
  }

  private static onPaymentFailed(failedPayment: Stripe.PaymentIntent) {
    return OrderPaymentsDao.delete(failedPayment.id)
  }

  private static sessionParams(order, activeLanguage: string): Stripe.Checkout.SessionCreateParams {
    return {
      ...this.shippingOptions(activeLanguage),
      locale: ['en', 'es'].includes(activeLanguage) ? activeLanguage : 'en',
      payment_method_types: ['card'],
      line_items: order.cartItems
        .map(cartItem => this.cartItemToLineItem(cartItem, activeLanguage)),
      mode: 'payment',
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:3000/cancel.html'
    }
  }

  private static shippingOptions(activeLang: string): any {
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

  private static cartItemToLineItem(cartItem: any, activeLang: string): Stripe.Checkout.SessionCreateParams.LineItem {
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
}

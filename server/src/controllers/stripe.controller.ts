import Stripe from 'stripe'
import OrdersDao from '../dao/orders.dao'
import CheckoutSessionsDao, {CheckoutSessionStatus} from '../dao/checkout-sessions.dao'
import UsersController from "./users.controller";

export default class StripeController {
  private static readonly HOME_DELIVERY_FEE_IN_EUR_CENTS = 399
  private static readonly DELIVERY_OPTIONS = {
    homeDelivery: {
      es: 'Pedido a domicilio',
      en: 'Home delivery'
    },
    pickUpOrder: {
      es: 'Recogida en local',
      en: 'Pick up order'
    },
  }

  private static readonly TIP = {
    tip: {
      es: 'Propina por los servicios',
      en: 'Tip for the services'
    },
  }

  private static readonly stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    timeout: 60000,
    apiVersion: '2022-11-15'
  })

  static async createCheckoutSession(req, res) {
    try {
      const userExists = await UsersController.userExists(req.body.userId)
      if (!userExists) return res.json({error: 'user-not-found', message: 'User not found'})
      const session = await StripeController.stripe.checkout.sessions
        .create(StripeController.sessionParams(req.body.cartItems, !!req.body.deliveryAddress, req.body.activeLanguage, req.body.tip))
      await StripeController.onCheckoutSessionCreated(
        session,
        req.body.userId,
        req.body.cartItems,
        req.body.deliveryAddress,
        req.body.tip
      )
      res.status(200).json({url: session.url})
    } catch (error: any) {
      console.error(error)
      res.status(400).json({error: error.code, message: error.message})
    }
  }

  static async webhook(req, res) {
    try {
      const event = req.body
      switch(event.type) {
        case 'checkout.session.completed':
          await StripeController.onCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
          break
        case 'checkout.session.expired':
          await StripeController.onCheckoutSessionExpired(event.data.object as Stripe.Checkout.Session)
          break
        default:
          res.sendStatus(200)
      }
    } catch (error: any) {
      console.error(error)
      res.status(400).json({error: error.code, message: error.message})
    }
  }

  private static async onCheckoutSessionCreated(
    session: Stripe.Checkout.Session,
    userId: string,
    cartItems: any[],
    deliveryAddress: any,
    tip?: number
  ) {
    await CheckoutSessionsDao.add(session.id, userId, cartItems, deliveryAddress, tip)
  }

  private static async onCheckoutSessionExpired(session: Stripe.Checkout.Session) {
    await CheckoutSessionsDao.setStatus(session.id, CheckoutSessionStatus.EXPIRED)
  }

  private static async onCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    if (session.payment_status === 'paid') {
      await CheckoutSessionsDao.setStatus(session.id, CheckoutSessionStatus.SUCCEEDED)
      await OrdersDao.addOrder(await StripeController.extractOrderDataFromCheckoutSession(session))
    } else {
      await CheckoutSessionsDao.setStatus(session.id, CheckoutSessionStatus.FAILED)
    }
  }

  private static async extractOrderDataFromCheckoutSession(stripeSession: Stripe.Checkout.Session): Promise<any> {
    const checkoutSession = await CheckoutSessionsDao.getCheckoutSessionById(stripeSession.id)
    return {
      cartItems: checkoutSession.cartItems,
      creationTimestamp: new Date(stripeSession.created * 1000),
      deliveryAddress: checkoutSession.deliveryAddress ?? null,
      isHomeDelivery: !!checkoutSession.deliveryAddress,
      tip: checkoutSession.tip ?? null,
      isFinished: false,
      userId: checkoutSession.userId
    }
  }

  private static sessionParams(cartItems: any[], isHomeDelivery: boolean, activeLanguage: string, tip?: number): Stripe.Checkout.SessionCreateParams {
    const line_items = cartItems.map(cartItem => StripeController.cartItemToLineItem(cartItem, activeLanguage))
    if (tip != 0) line_items.push({
      quantity: 1,
      price_data: {
        currency: 'eur',
        product_data: {
          name: StripeController.TIP.tip[activeLanguage],
        },
        unit_amount: Math.round((tip || 0) * 100)
      }
    });

    return {
      ...StripeController.shippingOptions(isHomeDelivery, activeLanguage),
      locale: ['en', 'es'].includes(activeLanguage) ? activeLanguage : 'en',
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:4200/user-order'
    }
  }

  private static shippingOptions(isHomeDelivery: boolean, activeLang: string): any {
    return isHomeDelivery ?
      {
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: StripeController.HOME_DELIVERY_FEE_IN_EUR_CENTS,
                currency: 'eur',
              },
              display_name: StripeController.DELIVERY_OPTIONS.homeDelivery[activeLang]
            }
          }
        ]
      } :
      {
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'eur',
              },
              display_name: StripeController.DELIVERY_OPTIONS.pickUpOrder[activeLang]
            }
          },
        ]
      }
  }

  private static cartItemToLineItem(cartItem: any, activeLang: string): Stripe.Checkout.SessionCreateParams.LineItem {
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      quantity: cartItem.quantity,
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

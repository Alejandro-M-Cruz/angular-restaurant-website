import {firestore} from '../firebase'

export enum CheckoutSessionStatus {
  OPEN = 'open',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  EXPIRED = 'expired'
}

interface CheckoutSession {
  cartItems: any[]
  status: CheckoutSessionStatus
  userId: string
}

export default class CheckoutSessionsDao {
  private static readonly checkoutSessionsCollection = firestore.collection('order_checkout_sessions')

  static add(sessionId: string, userId: string, cartItems: any[], deliveryAddress: any, tip?: number) {
    return CheckoutSessionsDao.checkoutSessionsCollection
      .doc(sessionId)
      .set({
        cartItems,
        userId,
        deliveryAddress: deliveryAddress ?? null,
        tip: tip ?? null,
        status: CheckoutSessionStatus.OPEN,
        creationTimestamp: new Date()
      } as CheckoutSession)
  }

  static setStatus(sessionId: string, status: CheckoutSessionStatus) {
    return CheckoutSessionsDao.checkoutSessionsCollection.doc(sessionId).update({status})
  }

  static getCheckoutSessionById(sessionId: string): Promise<any> {
    return CheckoutSessionsDao.checkoutSessionsCollection.doc(sessionId).get().then(doc => {
      return doc.data()
    })
  }

}

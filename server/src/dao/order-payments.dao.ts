import {firestore} from '../firebase'

export default class OrderPaymentsDao {
  private static readonly orderPaymentsCollection = firestore.collection('order_payments')

  static add(paymentId, order) {
    return this.orderPaymentsCollection.doc(paymentId).set(order)
  }

  static delete(paymentId: string) {
    return this.orderPaymentsCollection.doc(paymentId).delete()
  }

  static getOrderFromPaymentId(paymentId: string) {
    return this.orderPaymentsCollection.doc(paymentId).get()
  }
}

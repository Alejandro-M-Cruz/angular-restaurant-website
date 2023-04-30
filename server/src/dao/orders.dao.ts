import {firestore} from '../firebase'

export default class OrdersDao {
  private static readonly ordersCollection = firestore.collection('orders')

  static addOrder(order) {
    return OrdersDao.ordersCollection.add(order)
  }
}

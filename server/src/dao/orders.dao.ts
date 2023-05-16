import {firestore} from '../firebase'

export default class OrdersDao {
  static readonly HOME_DELIVERY_FEE = 3.99
  private static readonly ordersCollection = firestore.collection('orders')

  private static getCartItemSubtotalPrice(cartItem) {
    return cartItem.quantity * cartItem.price
  }

  private static getOrderTotalPriceNotIncludingTip(order): number {
    let totalPrice = 0
    order.cartItems.forEach(cartItem => totalPrice += cartItem.subtotalPrice)
    return order.isHomeDelivery ? totalPrice + OrdersDao.HOME_DELIVERY_FEE : totalPrice
  }

  private static getOrderTotalPriceIncludingTip(order): number {
    return OrdersDao.getOrderTotalPriceNotIncludingTip(order) + (order.tip ?? 0)
  }

  static addOrder(order) {
    return OrdersDao.ordersCollection.add({
      ...order,
      totalPriceIncludingTip: OrdersDao.getOrderTotalPriceIncludingTip(order)
    })
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
class OrdersDao {
    static getCartItemSubtotalPrice(cartItem) {
        return cartItem.quantity * cartItem.price;
    }
    static getOrderTotalPriceNotIncludingTip(order) {
        let totalPrice = 0;
        order.cartItems.forEach(cartItem => totalPrice += cartItem.subtotalPrice);
        return order.isHomeDelivery ? totalPrice + OrdersDao.HOME_DELIVERY_FEE : totalPrice;
    }
    static getOrderTotalPriceIncludingTip(order) {
        var _a;
        return OrdersDao.getOrderTotalPriceNotIncludingTip(order) + ((_a = order.tip) !== null && _a !== void 0 ? _a : 0);
    }
    static addOrder(order) {
        return OrdersDao.ordersCollection.add(Object.assign(Object.assign({}, order), { totalPriceIncludingTip: OrdersDao.getOrderTotalPriceIncludingTip(order) }));
    }
}
OrdersDao.HOME_DELIVERY_FEE = 3.99;
OrdersDao.ordersCollection = firebase_1.firestore.collection('orders');
exports.default = OrdersDao;

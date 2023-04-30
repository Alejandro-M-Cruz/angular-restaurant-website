"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
class OrdersDao {
    static addOrder(order) {
        return OrdersDao.ordersCollection.add(order);
    }
}
OrdersDao.ordersCollection = firebase_1.firestore.collection('orders');
exports.default = OrdersDao;

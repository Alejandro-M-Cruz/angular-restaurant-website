"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
class OrderPaymentsDao {
    static add(paymentId, order) {
        return this.orderPaymentsCollection.doc(paymentId).set(order);
    }
    static delete(paymentId) {
        return this.orderPaymentsCollection.doc(paymentId).delete();
    }
    static getOrderFromPaymentId(paymentId) {
        return this.orderPaymentsCollection.doc(paymentId).get();
    }
}
OrderPaymentsDao.orderPaymentsCollection = firebase_1.firestore.collection('order_payments');
exports.default = OrderPaymentsDao;

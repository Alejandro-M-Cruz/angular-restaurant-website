"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
class OrderCheckoutSessionsDao {
    static add(sessionId, order) {
        return this.sessionsCollection.doc(sessionId).set(order);
    }
    static delete(sessionId) {
        return this.sessionsCollection.doc(sessionId).delete();
    }
    static getOrderFromSessionId(sessionId) {
        return this.sessionsCollection.doc(sessionId).get();
    }
}
OrderCheckoutSessionsDao.sessionsCollection = firebase_1.firestore.collection('order_checkout_sessions');
exports.default = OrderCheckoutSessionsDao;

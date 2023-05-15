"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutSessionStatus = void 0;
const firebase_1 = require("../firebase");
var CheckoutSessionStatus;
(function (CheckoutSessionStatus) {
    CheckoutSessionStatus["OPEN"] = "open";
    CheckoutSessionStatus["SUCCEEDED"] = "succeeded";
    CheckoutSessionStatus["FAILED"] = "failed";
    CheckoutSessionStatus["EXPIRED"] = "expired";
})(CheckoutSessionStatus = exports.CheckoutSessionStatus || (exports.CheckoutSessionStatus = {}));
class CheckoutSessionsDao {
    static add(sessionId, userId, cartItems, deliveryAddress) {
        return CheckoutSessionsDao.checkoutSessionsCollection
            .doc(sessionId)
            .set({
            cartItems,
            userId,
            deliveryAddress: deliveryAddress !== null && deliveryAddress !== void 0 ? deliveryAddress : null,
            status: CheckoutSessionStatus.OPEN,
            creationTimestamp: new Date()
        });
    }
    static setStatus(sessionId, status) {
        return CheckoutSessionsDao.checkoutSessionsCollection.doc(sessionId).update({ status });
    }
    static getCheckoutSessionById(sessionId) {
        return CheckoutSessionsDao.checkoutSessionsCollection.doc(sessionId).get().then(doc => {
            return doc.data();
        });
    }
}
CheckoutSessionsDao.checkoutSessionsCollection = firebase_1.firestore.collection('order_checkout_sessions');
exports.default = CheckoutSessionsDao;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const orders_dao_1 = __importDefault(require("../dao/orders.dao"));
const order_payments_dao_1 = __importDefault(require("../dao/order-payments.dao"));
class StripeController {
    static createCheckoutSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionParams = this.sessionParams(req.body.order, req.body.activeLanguage);
                const session = yield this.stripe.checkout.sessions.create(sessionParams);
                yield order_payments_dao_1.default.add(session.id, req.body.order);
                res.status(200).send(session.url);
            }
            catch (error) {
                res.status(400).json({ error: error.code, message: error.message });
            }
        });
    }
    static webhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = this.stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_ENDPOINT_SECRET);
                switch (event.type) {
                    case 'payment_intent.succeeded':
                        yield this.onPaymentSucceeded(event.data.object);
                        break;
                    case 'payment_intent.payment_failed':
                        yield this.onPaymentFailed(event.data.object);
                        break;
                    default:
                        res.sendStatus(200);
                }
                res.sendStatus(200);
            }
            catch (error) {
                res.status(400).json({ error: error.code, message: error.message });
            }
        });
    }
    static onPaymentSucceeded(successfulPayment) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_payments_dao_1.default.getOrderFromPaymentId(successfulPayment.id);
            yield orders_dao_1.default.addOrder(order);
            yield order_payments_dao_1.default.delete(successfulPayment.id);
        });
    }
    static onPaymentFailed(failedPayment) {
        return order_payments_dao_1.default.delete(failedPayment.id);
    }
    static sessionParams(order, activeLanguage) {
        return Object.assign(Object.assign({}, this.shippingOptions(activeLanguage)), { locale: ['en', 'es'].includes(activeLanguage) ? activeLanguage : 'en', payment_method_types: ['card'], line_items: order.cartItems
                .map(cartItem => this.cartItemToLineItem(cartItem, activeLanguage)), mode: 'payment', success_url: 'http://localhost:4200/success', cancel_url: 'http://localhost:3000/cancel.html' });
    }
    static shippingOptions(activeLang) {
        return {
            shipping_address_collection: {
                allowed_countries: ['ES']
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'eur',
                        },
                        display_name: activeLang === 'es' ? 'A recoger en el restaurante' : 'Order to pick up'
                    }
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 399,
                            currency: 'eur',
                        },
                        display_name: activeLang === 'es' ? 'Pedido a domicilio' : 'Home delivery'
                    }
                }
            ]
        };
    }
    static cartItemToLineItem(cartItem, activeLang) {
        const lineItem = {
            price: cartItem.menuItem.priceIdStripe,
            quantity: cartItem.amount,
            price_data: {
                currency: 'eur',
                product_data: {
                    name: cartItem.menuItem.name[activeLang],
                    description: cartItem.menuItem.ingredients[activeLang]
                },
                unit_amount: Math.round(cartItem.menuItem.price * 100)
            }
        };
        if (cartItem.menuItem.imageUrl)
            lineItem.price_data.product_data.images = [cartItem.menuItem.imageUrl];
        return lineItem;
    }
}
StripeController.stripe = new stripe_1.default(process.env.STRIPE_API_KEY, {
    timeout: 60000,
    apiVersion: '2022-11-15'
});
exports.default = StripeController;

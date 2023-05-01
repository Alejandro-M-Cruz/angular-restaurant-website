"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const checkout_sessions_dao_1 = __importStar(require("../dao/checkout-sessions.dao"));
const users_controller_1 = __importDefault(require("./users.controller"));
class StripeController {
    static createCheckoutSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield users_controller_1.default.userExists(req.body.userId);
                if (!userExists)
                    return res.json({ error: 'user-not-found', message: 'User not found' });
                const session = yield StripeController.stripe.checkout.sessions
                    .create(StripeController.sessionParams(req.body.cartItems, req.body.activeLanguage));
                yield StripeController.onCheckoutSessionCreated(session, req.body.userId, req.body.cartItems);
                res.status(200).json({ url: session.url });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error.code, message: error.message });
            }
        });
    }
    static webhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = req.body;
                switch (event.type) {
                    case 'checkout.session.completed':
                        yield StripeController.onCheckoutSessionCompleted(event.data.object);
                        break;
                    case 'checkout.session.expired':
                        yield StripeController.onCheckoutSessionExpired(event.data.object);
                        break;
                    default:
                        res.sendStatus(200);
                }
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error.code, message: error.message });
            }
        });
    }
    static onCheckoutSessionCreated(session, userId, cartItems) {
        return __awaiter(this, void 0, void 0, function* () {
            yield checkout_sessions_dao_1.default.add(session.id, userId, cartItems);
        });
    }
    static onCheckoutSessionExpired(session) {
        return __awaiter(this, void 0, void 0, function* () {
            yield checkout_sessions_dao_1.default.setStatus(session.id, checkout_sessions_dao_1.CheckoutSessionStatus.EXPIRED);
        });
    }
    static onCheckoutSessionCompleted(session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (session.payment_status === 'paid') {
                yield checkout_sessions_dao_1.default.setStatus(session.id, checkout_sessions_dao_1.CheckoutSessionStatus.SUCCEEDED);
                yield orders_dao_1.default.addOrder(yield StripeController.extractOrderDataFromCheckoutSession(session));
            }
            else {
                yield checkout_sessions_dao_1.default.setStatus(session.id, checkout_sessions_dao_1.CheckoutSessionStatus.FAILED);
            }
        });
    }
    static extractOrderDataFromCheckoutSession(stripeSession) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkoutSession = yield checkout_sessions_dao_1.default.getCheckoutSessionById(stripeSession.id);
            return {
                cartItems: checkoutSession.cartItems,
                creationTimestamp: new Date(stripeSession.created * 1000),
                deliveryAddress: stripeSession.shipping_details.address,
                isHomeDelivery: stripeSession.shipping_details.name === 'b',
                isFinished: false,
                userId: checkoutSession.userId
            };
        });
    }
    static sessionParams(cartItems, activeLanguage) {
        return Object.assign(Object.assign({}, StripeController.shippingOptions(activeLanguage)), { locale: ['en', 'es'].includes(activeLanguage) ? activeLanguage : 'en', payment_method_types: ['card'], line_items: cartItems
                .map(cartItem => StripeController.cartItemToLineItem(cartItem, activeLanguage)), mode: 'payment', success_url: 'http://localhost:4200/success', cancel_url: 'http://localhost:4200/user-order' });
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
                        display_name: StripeController.DELIVERY_OPTIONS.pickUpOrder[activeLang]
                    }
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: StripeController.HOME_DELIVERY_FEE_IN_EUR_CENTS,
                            currency: 'eur',
                        },
                        display_name: StripeController.DELIVERY_OPTIONS.homeDelivery[activeLang]
                    }
                }
            ]
        };
    }
    static cartItemToLineItem(cartItem, activeLang) {
        const lineItem = {
            quantity: cartItem.quantity,
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
StripeController.HOME_DELIVERY_FEE_IN_EUR_CENTS = 399;
StripeController.DELIVERY_OPTIONS = {
    homeDelivery: {
        es: 'Pedido a domicilio',
        en: 'Home delivery'
    },
    pickUpOrder: {
        es: 'Recogida en local',
        en: 'Pick up order'
    }
};
StripeController.stripe = new stripe_1.default(process.env.STRIPE_API_KEY, {
    timeout: 60000,
    apiVersion: '2022-11-15'
});
exports.default = StripeController;
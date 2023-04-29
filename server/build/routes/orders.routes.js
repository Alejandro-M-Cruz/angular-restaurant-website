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
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51MyyGlAwqI0tPo96rPSHQYi4GUSHwWVL0Xqkwvq8bbNLMOivhdIrEt1PaK6YCQ4Q40KNC8BxpDBvwfGTvCicFCEL00yFjBED2C', {
    timeout: 60000,
    apiVersion: '2022-11-15'
});
const router = express_1.default.Router();
const cartItemToLineItem = (cartItem, activeLang) => {
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
};
const shippingOptions = (activeLang) => {
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
};
router.post('/checkout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sessionParams = {
            locale: ['en', 'es'].includes(req.body.activeLanguage) ? req.body.activeLanguage : 'en',
            payment_method_types: ['card'],
            line_items: req.body.order.cartItems
                .map(cartItem => cartItemToLineItem(cartItem, req.body.activeLanguage)),
            mode: 'payment',
            success_url: 'http://localhost:4200/success',
            cancel_url: 'http://localhost:3000/cancel.html'
        };
        if (req.body.order.isHomeDelivery) {
            sessionParams = Object.assign(Object.assign({}, sessionParams), shippingOptions(req.body.activeLanguage));
        }
        const session = yield stripe.checkout.sessions.create(sessionParams);
        res.status(200).json(session);
    }
    catch (error) {
        res.status(500).json({ error: error.code, message: error.message });
    }
}));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const email_confirmations_routes_1 = __importDefault(require("./routes/email-confirmations.routes"));
const API = '/api/v1';
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Welcome');
});
app.use(API + '/users', users_routes_1.default);
app.use(API + '/orders', orders_routes_1.default);
app.use(API + "/email-confirmations", email_confirmations_routes_1.default);
app.get('*', (req, res) => {
    res.sendStatus(404);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
/*functions.https.onRequest(app)*/

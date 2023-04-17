"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const API = '/api/v1';
const PORT = 3000;
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const complaints_routes_1 = __importDefault(require("./routes/complaints.routes"));
const menu_routes_1 = __importDefault(require("./routes/menu.routes"));
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(API + '/users', users_routes_1.default);
app.use(API + '/complaints', complaints_routes_1.default);
app.use(API + '/menu', menu_routes_1.default);
app.get('/', (_req, res) => {
    res.send('Welcome, admin...');
});
app.get('*', (_req, res) => {
    res.sendStatus(404);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const API = '/api/v1';
const PORT = 3000;
const users_routes_1 = __importDefault(require("./routes/users.routes"));
app.use(express_1.default.json());
app.use(API + '/users', users_routes_1.default);
app.get('*', (_req, res) => {
    res.sendStatus(404);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

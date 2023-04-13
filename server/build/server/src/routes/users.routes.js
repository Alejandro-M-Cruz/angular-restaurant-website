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
const router = express_1.default.Router();
const firebase_1 = require("../firebase");
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersList = yield firebase_1.auth.listUsers();
    res.json(usersList.users.map(user => ({
        uid: user.uid,
        email: user.email,
        creationDate: new Date(user.metadata.creationTime),
        lastLogInDate: new Date(user.metadata.lastSignInTime)
    })));
}));
router.get('/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield firebase_1.auth.getUser(req.params.uid);
    res.json({
        email: user.email,
        creationDate: new Date(user.metadata.creationTime),
        lastLogInDate: new Date(user.metadata.lastSignInTime)
    });
}));
exports.default = router;

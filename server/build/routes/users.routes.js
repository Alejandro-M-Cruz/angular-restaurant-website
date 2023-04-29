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
const firebase_1 = require("../firebase");
const router = express_1.default.Router();
/*router
  .get('/', (_req, res) => res.send(Users.getUsers()))
  .get('/:uid', (req, res) => res.send(Users.getUserById(req.params.uid)))*/
function firestoreUserRecordToUser(user) {
    return {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        creationDate: new Date(user.metadata.creationTime),
        lastLogInDate: new Date(user.metadata.lastSignInTime)
    };
}
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersList = yield firebase_1.auth.listUsers();
        res.json(usersList.users.map(firestoreUserRecordToUser));
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.get('/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield firebase_1.auth.getUser(req.params.uid);
        res.json(firestoreUserRecordToUser(user));
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
exports.default = router;

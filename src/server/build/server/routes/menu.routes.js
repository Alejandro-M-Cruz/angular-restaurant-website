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
router.get('/sections', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const querySnapshot = yield firebase_1.firestore.collection('menu_sections').get();
    res.json(querySnapshot.docs.map(doc => {
        return Object.assign({ id: doc.id }, doc.data());
    }));
}));
router.get('/items', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const querySnapshot = yield firebase_1.firestore.collection('menu_items').get();
    res.json(querySnapshot.docs.map(doc => {
        return Object.assign({ id: doc.id }, doc.data());
    }));
}));
router.post('/sections/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menuSection = {
        name: req.body.name
    };
    yield firebase_1.firestore.collection('menu_sections').add(menuSection);
    res.json({});
}));
router.put('/sections/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menuSection = {
        name: req.body.name
    };
    yield firebase_1.firestore.doc(`menu_sections/${req.params.id}`).set(menuSection);
    res.json({});
}));
exports.default = router;

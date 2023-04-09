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
router.delete('/sections/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield firebase_1.firestore.doc(`menu_sections/${req.params.id}`).delete();
    const querySnapshot = yield firebase_1.firestore.collection('menu_items')
        .where('sectionId', '==', req.params.id).get();
    querySnapshot.forEach(doc => doc.ref.delete());
    res.json({});
}));
router.post('/items/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menuItem = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        price: req.body.price,
        sectionId: req.body.sectionId,
        imageUrl: req.body.imageUrl
    };
    yield firebase_1.firestore.collection('menu_items').add(menuItem);
    res.json({});
}));
router.put('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menuItem = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        price: req.body.price,
        sectionId: req.body.sectionId,
        imageUrl: req.body.imageUrl
    };
    yield firebase_1.firestore.collection('menu_items').add(menuItem);
    res.json({});
}));
router.delete('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield firebase_1.firestore.doc(`menu_items/${req.params.id}`).delete();
    res.json({});
}));
exports.default = router;

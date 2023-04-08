"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.firestore = exports.auth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const auth_1 = require("firebase-admin/auth");
const storage_1 = require("firebase-admin/storage");
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)()
});
exports.auth = (0, auth_1.getAuth)(app);
exports.firestore = (0, firestore_1.getFirestore)(app);
exports.storage = (0, storage_1.getStorage)(app);

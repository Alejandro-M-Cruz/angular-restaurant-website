"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const email_confirmations_controller_1 = __importDefault(require("../controllers/email-confirmations.controller"));
const router = express_1.default.Router();
router.post('/', email_confirmations_controller_1.default.sendMessage);
exports.default = router;

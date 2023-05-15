"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configMsj_1 = __importDefault(require("../smtp/configMsj"));
class EmailConfirmationsController {
    static sendMessage(req, res) {
        (0, configMsj_1.default)(req.body);
        res.status(200).send();
    }
}
exports.default = EmailConfirmationsController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LastOrderController {
    static getLastOrder(req, res) {
        res.send(this.lastOrder[req.user.id]);
        this.lastOrder[req.user.id] = req.order.id;
    }
}
LastOrderController.lastOrder = {};
exports.default = LastOrderController;

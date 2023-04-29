"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const router = express_1.default.Router();
/*router
  .get('/', (_req, res) => res.send(Users.getUsers()))
  .get('/:uid', (req, res) => res.send(Users.getUserById(req.params.uid)))*/
router.get('/', users_controller_1.default.getUsers);
router.get('/:uid', users_controller_1.default.getUserById);
exports.default = router;

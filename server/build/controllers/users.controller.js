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
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
class UsersController {
    static userExists(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRecord = yield firebase_1.auth.getUser(uid);
                return !!userRecord;
            }
            catch (e) {
                return false;
            }
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersList = yield firebase_1.auth.listUsers();
                res.json(usersList.users.map(UsersController.firestoreUserRecordToUser));
            }
            catch (e) {
                res.json({ error: e.message });
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRecord = yield firebase_1.auth.getUser(req.params.uid);
                res.json(UsersController.firestoreUserRecordToUser(userRecord));
            }
            catch (e) {
                res.json({ error: e.message });
            }
        });
    }
    static firestoreUserRecordToUser(userRecord) {
        return {
            uid: userRecord.uid,
            username: userRecord.displayName,
            email: userRecord.email,
            creationDate: new Date(userRecord.metadata.creationTime),
            lastLogInDate: new Date(userRecord.metadata.lastSignInTime)
        };
    }
}
exports.default = UsersController;

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
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    constructor(secret) {
        this.secret = secret;
    }
    verifyJWT(jwt, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.verify)(jwt, secret, (err, payload) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(payload);
                });
            });
        });
    }
    execute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers.authorization) {
                const [, jwt] = req.headers.authorization.split(' ');
                const payload = yield this.verifyJWT(jwt, this.secret);
                req.user = payload.email;
                next();
            }
            next();
        });
    }
    ;
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map
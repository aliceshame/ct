"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const auth_1 = require('../schemas/auth');
const user = require('../mongo/user');
const compare_1 = require('./compare');
function login(login_, password_, req_) {
    return __awaiter(this, void 0, void 0, function* () {
        let error_;
        let byName_ = yield user.getUser.byName(login_);
        let byEmail_ = yield user.getUser.byEmail(login_);
        let user_ = byName_ || byEmail_;
        if (!user_) {
            error_ = auth_1.AuthError.InvalidLoginOrPassword;
        }
        else {
            const check_ = yield compare_1.compare(user_, password_);
            if (check_) {
                req_.session.u = user_.id;
                error_ = auth_1.AuthError.Success;
            }
            else {
                error_ = auth_1.AuthError.InvalidLoginOrPassword;
            }
        }
        return error_;
    });
}
exports.login = login;
//# sourceMappingURL=login.js.map
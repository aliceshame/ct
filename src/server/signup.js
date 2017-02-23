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
const encrypt_1 = require('./encrypt');
const re = {
    password: /.{6,}/,
    username: /^[A-Z-a-z0-9\-._]+$/,
    name: /^\S.*/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
};
function signup(username_, email_, name_, password_, req_) {
    return __awaiter(this, void 0, void 0, function* () {
        let error_;
        const check = {
            password: re.password.test(password_),
            name: re.name.test(name_),
            username: re.username.test(username_),
            email: re.email.test(email_)
        };
        let user_;
        if (!check.password) {
            error_ = auth_1.AuthError.WeakPassword;
        }
        else if (!check.name) {
            error_ = auth_1.AuthError.InvalidName;
        }
        else if (!check.username) {
            error_ = auth_1.AuthError.InvalidUsername;
        }
        else if (!check.email) {
            error_ = auth_1.AuthError.InvalidMail;
        }
        else {
            let byName_ = yield user.getUser.byName(username_);
            let byEmail_ = yield user.getUser.byEmail(email_);
            if (byName_ != null) {
                error_ = auth_1.AuthError.InvalidUsername;
            }
            else if (byEmail_ != null) {
                error_ = auth_1.AuthError.InvalidMail;
            }
            else {
                user_ = {
                    id: yield user.createUser(),
                    password: yield encrypt_1.encrypt(password_),
                    email: email_,
                    name: name_,
                    username: username_,
                    capsules: [],
                    tokens: {}
                };
                yield user.setUser(user_);
                req_.session.u = user_.id;
                error_ = auth_1.AuthError.Success;
            }
        }
        return error_;
    });
}
exports.signup = signup;
//# sourceMappingURL=signup.js.map
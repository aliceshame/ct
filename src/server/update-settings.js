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
const user_1 = require('../mongo/user');
const compare_1 = require('./compare');
const re = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    username: /^[A-Za-z][A-Z-a-z0-9\-._]{0,29}$/,
    name: /^\S.*/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
};
function update(username_, email_, name_, password_, old_, req_) {
    return __awaiter(this, void 0, void 0, function* () {
        let error_;
        const check = {
            password: re.password.test(password_),
            name: re.name.test(name_),
            username: re.username.test(username_),
            email: re.email.test(email_)
        };
        let user_ = yield user_1.getUser.byId(req_.session.u);
        if (!check.name) {
            error_ = auth_1.AuthError.InvalidName;
        }
        else if (!check.username) {
            error_ = auth_1.AuthError.InvalidUsername;
        }
        else if (!check.email) {
            error_ = auth_1.AuthError.InvalidMail;
        }
        else {
            if (username_ !== user_.username) {
                let byName_ = yield user.getUser.byName(username_);
                if (byName_) {
                    return auth_1.AuthError.InvalidUsername;
                }
                else {
                    user_.username = username_;
                    error_ = auth_1.AuthError.Success;
                }
            }
            if (email_ !== user_.email) {
                let byEmail_ = yield user.getUser.byEmail(email_);
                if (byEmail_) {
                    return auth_1.AuthError.InvalidMail;
                }
                else {
                    user_.email = email_;
                    error_ = auth_1.AuthError.Success;
                }
            }
            if (name_ !== user_.name) {
                user_.name = name_;
                error_ = auth_1.AuthError.Success;
            }
            if (password_ !== '') {
                const check_ = yield compare_1.compare(user_, old_);
                if (!check_) {
                    return auth_1.AuthError.InvalidLoginOrPassword;
                }
                else {
                    user_.password = yield encrypt_1.encrypt(password_);
                    error_ = auth_1.AuthError.Success;
                }
            }
            user.setUser(user_);
        }
        return error_;
    });
}
exports.update = update;
//# sourceMappingURL=update-settings.js.map
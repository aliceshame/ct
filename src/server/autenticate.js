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
const signup_1 = require('./signup');
const login_1 = require('./login');
const update_settings_1 = require('./update-settings');
const restore_1 = require('./restore');
function authenticate(request_, req_) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let error_;
                switch (request_.method) {
                    case auth_1.AuthMethod.Login:
                        error_ = yield login_1.login(request_.login, request_.password, req_);
                        break;
                    case auth_1.AuthMethod.Signup:
                        error_ = yield signup_1.signup(request_.login, request_.email, request_.name, request_.password, req_);
                        break;
                    case auth_1.AuthMethod.Restore:
                        error_ = yield restore_1.restore(request_.login, req_);
                        break;
                    case auth_1.AuthMethod.Update:
                        error_ = yield update_settings_1.update(request_.login, request_.email, request_.name, request_.password, request_.old, req_);
                        break;
                }
                const response_ = {
                    error: error_
                };
                resolve(response_);
            }
            catch (_) {
                reject(_);
            }
        }));
    });
}
exports.authenticate = authenticate;
//# sourceMappingURL=autenticate.js.map
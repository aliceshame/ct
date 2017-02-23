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
const crypto = require('crypto');
const user = require('../mongo/user');
const encrypt_1 = require('./encrypt');
const send_1 = require('./send');
const l10n_1 = require('../l10n');
const detect_language_1 = require('../util/detect-language');
const config_1 = require('../data/config');
const user_1 = require('../mongo/user');
function random() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            crypto.randomBytes(9, (error_, buffer_) => {
                if (error_) {
                    reject(error_);
                }
                else {
                    resolve(buffer_.toString('base64'));
                }
            });
        });
    });
}
exports.random = random;
function restore(login_, req_) {
    return __awaiter(this, void 0, void 0, function* () {
        let byName_ = yield user.getUser.byName(login_);
        let byEmail_ = yield user.getUser.byEmail(login_);
        let user_ = byName_ || byEmail_;
        if (!user_) {
            return auth_1.AuthError.UserNotFound;
        }
        const plain_ = yield random();
        user_.password = yield encrypt_1.encrypt(plain_);
        user_1.setUser(user_);
        const tl_ = l10n_1.init(detect_language_1.detectLanguage(req_));
        try {
            yield send_1.send(user_.email, '', config_1.tl('Password recovery'), `${tl_('Your new password: ')}${plain_}`, 'noreply');
            return auth_1.AuthError.Success;
        }
        catch (_) {
            return auth_1.AuthError.UnknownError;
        }
    });
}
exports.restore = restore;
//# sourceMappingURL=restore.js.map
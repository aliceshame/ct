"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const crypto = require('crypto');
function random() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            crypto.randomBytes(12, (error_, buffer_) => {
                if (error_) {
                    reject(error_);
                }
                else {
                    resolve(buffer_.toString('hex'));
                }
            });
        });
    });
}
exports.random = random;
function paymentId() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            crypto.randomBytes(4, (error_, buffer_) => {
                if (error_) {
                    reject(error_);
                }
                else {
                    resolve(buffer_.readUInt32BE(0));
                }
            });
        });
    });
}
exports.paymentId = paymentId;
//# sourceMappingURL=random.js.map
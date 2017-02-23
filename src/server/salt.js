"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const bcrypt = require('bcrypt-nodejs');
function salt() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (error_, result_) => {
                if (error_) {
                    reject(error_);
                }
                else {
                    resolve(result_);
                }
            });
        });
    });
}
exports.salt = salt;
//# sourceMappingURL=salt.js.map
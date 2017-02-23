"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const querystring = require('querystring');
function body(req_) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            let body_ = '';
            req_.on('data', (data_) => {
                body_ += data_.toString();
            });
            req_.on('end', () => {
                try {
                    resolve(JSON.parse(body_));
                }
                catch (_) {
                    reject(_);
                }
            });
        });
    });
}
exports.body = body;
function qs(req_) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            let body_ = '';
            req_.on('data', (data_) => {
                body_ += data_.toString();
            });
            req_.on('end', () => {
                try {
                    resolve(querystring.parse(body_));
                }
                catch (_) {
                    reject(_);
                }
            });
        });
    });
}
exports.qs = qs;
//# sourceMappingURL=parse-body.js.map
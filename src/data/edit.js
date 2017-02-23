"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const capsulePatterns = require('../patterns/capsule');
const view = require('./view');
function get(user_, id_, req_) {
    return __awaiter(this, void 0, void 0, function* () {
        const view_ = yield view.get(user_, id_, req_);
        const patterns_ = {
            capsule: capsulePatterns
        };
        const friends_ = [];
        return {
            capsule: user_.capsules.find(_ => _.id.toString() === id_),
            icon: view_.icon,
            meta: view_.meta,
            tl: view_.tl,
            user: user_,
            friends: friends_,
            patterns: patterns_
        };
    });
}
exports.get = get;
//# sourceMappingURL=edit.js.map
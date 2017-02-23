"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const moment = require('moment');
function get(capsuleId_) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve) => {
            const capsule_ = {
                id: capsuleId_,
                title: 'Оленю Лёхе',
                date: moment('2020-10-10'),
                sealed: false,
                unsealed: false,
                cost: 200,
                size: 0,
                parts: [],
                receivers: []
            };
            resolve(capsule_);
        });
    });
}
exports.get = get;
//# sourceMappingURL=capsule.js.map
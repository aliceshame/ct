"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require('express');
const check_rights_1 = require('../src/server/check-rights');
const locals = require('../src');
const user_1 = require('../src/mongo/user');
const payment_1 = require('../src/mongo/payment');
const router = express.Router();
router.get('/:user/:capsule', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user_ = yield user_1.getUser.byName(req_.params['user']);
        const loggedIn_ = yield user_1.getUser.byId(req_.session.u);
        const rights_ = yield check_rights_1.rights(req_, req_.params['capsule'], user_, loggedIn_);
        if (rights_.write) {
            const capsule_ = user_.capsules.find(_ => _.id.toString() === req_.params['capsule']);
            const pay_ = yield payment_1.createPayment(user_, capsule_);
            const expired_ = capsule_.date.valueOf() <= (new Date().valueOf() + 1000 * 3600 * 12);
            const data_ = yield locals.edit.get(user_, req_.params['capsule'], req_);
            const locals_ = {
                capsule: data_,
                pay: pay_,
                tl: data_.tl,
                meta: data_.meta,
                expired: expired_
            };
            yield payment_1.savePayment(pay_);
            res_.render('pay', locals_);
        }
        else {
            res_.redirect('/');
        }
    }
    catch (_) {
        res_.redirect('/');
    }
}));
module.exports = router;
//# sourceMappingURL=pay.js.map
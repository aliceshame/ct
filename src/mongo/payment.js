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
const mongoose = require('mongoose');
const moment = require('moment');
const iconv_1 = require('iconv');
const parse_body_1 = require('../server/parse-body');
const random_1 = require('../server/random');
const config_1 = require('../data/config');
const user_1 = require('./user');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const iconv = new iconv_1.Iconv('UTF-8', 'CP1251');
const schema_ = {
    _id: ObjectId,
    paymentId: String,
    amount: Number,
    user: String,
    capsule: String,
    created: Number,
    expired: Number,
    service: Number,
    currency: Number,
    signature: String,
    secret: String,
    completed: Boolean,
    failed: Boolean,
    created2: Number,
    success: Number,
    commission: Number,
    orderId: String,
};
const paymentSchema = new Schema(schema_);
exports.PaymentModel = mongoose.model('PaymentModel', paymentSchema);
function createPayment(user_, capsule_) {
    return __awaiter(this, void 0, void 0, function* () {
        let paymentId_;
        let payment_;
        do {
            paymentId_ = (yield random_1.paymentId()).toString();
            payment_ = exports.PaymentModel.findOne({ paymentId: paymentId_ }).exec();
        } while (!payment_);
        const model_ = {
            _id: mongoose.Types.ObjectId.createFromHexString(yield random_1.random()),
            paymentId: paymentId_,
            amount: capsule_.cost,
            user: user_.id,
            capsule: capsule_.id,
            created: moment(),
            expired: moment().add(29, 'days'),
            service: 0,
            currency: 0,
            signature: '',
            secret: yield random_1.random()
        };
        const fields_ = [
            'WMI_AUTO_LOCATION',
            'WMI_EXPIRED_DATE',
            'WMI_CURRENCY_ID',
            'WMI_DESCRIPTION',
            'WMI_FAIL_URL',
            'WMI_MERCHANT_ID',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PTENABLED',
            'WMI_PAYMENT_AMOUNT',
            'WMI_PAYMENT_NO',
            'WMI_SUCCESS_URL',
            model_.secret
        ].sort(function (a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a > b ? 1 : a < b ? -1 : 0;
        });
        model_.signature = crypto
            .createHash('md5')
            .update(iconv
            .convert(fields_.join('')
            + config_1.walletOneSecret)
            .toString())
            .digest('base64');
        return model_;
    });
}
exports.createPayment = createPayment;
function savePayment(model_) {
    return __awaiter(this, void 0, void 0, function* () {
        model_ = JSON.parse(JSON.stringify(model_));
        model_._id = mongoose.Types.ObjectId.createFromHexString(model_._id);
        let entry_ = yield exports.PaymentModel.findOne({ paymentId: model_.paymentId }).exec();
        model_.created = moment(model_.created).valueOf();
        model_.expired = moment(model_.expired).valueOf();
        if (model_.created2) {
            model_.created2 = moment(model_.created2).valueOf();
        }
        if (model_.success) {
            model_.success = moment(model_.success).valueOf();
        }
        if (entry_) {
            Object.keys(model_).forEach((key_) => {
                entry_[key_] = model_[key_];
            });
            yield entry_.save();
        }
        else {
            entry_ = new exports.PaymentModel(model_);
            yield entry_.save();
        }
    });
}
exports.savePayment = savePayment;
function getPayment(id_) {
    return __awaiter(this, void 0, void 0, function* () {
        const payment_ = yield exports.PaymentModel.findOne({ paymentId: id_ }).exec();
        payment_.created = moment(payment_.created);
        payment_.expired = moment(payment_.expired);
        if (payment_.created2) {
            payment_.created2 = moment(payment_.created2);
        }
        if (payment_.success) {
            payment_.success = moment(payment_.success);
        }
        return payment_;
    });
}
exports.getPayment = getPayment;
function handleResponse(req_, res_, fail_ = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const qs_ = yield parse_body_1.qs(req_);
        const payment_ = yield getPayment(qs_.WMI_PAYMENT_NO);
        if (payment_) {
            const valid_ = qs_.WMI_MERCHANT_ID === config_1.walletOneId
                && parseInt(qs_.WMI_PAYMENT_AMOUNT) === payment_.amount
                && payment_.signature === qs_.WMI_SIGNATURE;
            if (valid_ && !fail_) {
                payment_.orderId = qs_.WMI_ORDER_ID;
                payment_.completed = true;
                payment_.failed = false;
                payment_.success = moment();
                payment_.commission = parseInt(qs_.WMI_COMMISSION_AMOUNT);
                const user_ = yield user_1.getUser.byId(payment_.user);
                const capsule_ = user_.capsules.find(_ => _.id.toString() === payment_.capsule);
                capsule_.sealed = true;
                user_1.setUser(user_);
                yield savePayment(payment_);
            }
            else if (valid_ && fail_) {
                payment_.orderId = qs_.WMI_ORDER_ID;
                payment_.completed = true;
                payment_.failed = true;
                yield savePayment(payment_);
            }
        }
        res_.send('WMI_RESULT=OK');
    });
}
exports.handleResponse = handleResponse;
//# sourceMappingURL=payment.js.map
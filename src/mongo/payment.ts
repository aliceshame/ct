import crypto = require('crypto');

import mongoose = require('mongoose');
import moment   = require('moment');

import { Iconv } from 'iconv';

import { Payment } from '../schemas/payment';
import { qs } from '../server/parse-body';


import Moment = moment.Moment;


import { random, paymentId } from '../server/random';
import { Capsule } from '../schemas/capsule';
import { User } from '../schemas/user';


import { walletOneSecret, walletOneId } from '../data/config';


import { getUser, setUser } from './user';


const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const iconv = new Iconv('UTF-8', 'CP1251');


const schema_ = {
    _id : ObjectId,               // From scratch

    paymentId : String,           // From scratch
    amount    : Number,           // From scratch
    user      : String,           // From scratch
    capsule   : String,           // From scratch
    created   : Number, // Date.  // From scratch
    expired   : Number, // Date.  // From scratch
    service   : Number,           // From scratch
    currency  : Number,           // From scratch
    signature : String,           // From scratch
    secret    : String,           // From scratch

    completed  : Boolean,         // From service
    failed     : Boolean,         // From service
    created2   : Number, // Date. // From service
    success    : Number, // Date. // From service
    commission : Number,          // From service
    orderId    : String,          // From service
};


const paymentSchema       = new Schema(schema_);
export const PaymentModel = mongoose.model('PaymentModel', paymentSchema);


export async function createPayment (user_ : User, capsule_ : Capsule) : Promise<Payment> {
    let paymentId_ : string;
    let payment_ : any;

    do {
        paymentId_ = (await paymentId()).toString();
        payment_   = PaymentModel.findOne({ paymentId : paymentId_ }).exec();
    } while (!payment_);

    const model_ = {
        _id       : mongoose.Types.ObjectId.createFromHexString(await random()),
        paymentId : paymentId_,
        amount    : capsule_.cost,
        user      : user_.id,
        capsule   : capsule_.id,
        created   : moment(),
        expired   : moment().add(29, 'days'),
        service   : 0,
        currency  : 0,
        signature : '',
        secret    : await random()
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
    ].sort(function (a : string, b : string) {
        a = a.toLowerCase();
        b = b.toLowerCase();

        return a > b ? 1 : a < b ? -1 : 0;
    });

    model_.signature = crypto
        .createHash('md5')
        .update(iconv
            .convert(
                fields_.join('')
                + walletOneSecret
            )
            .toString()
        )
        .digest('base64')
    ;

    return model_;
}


export async function savePayment (model_ : any) {
    model_ = JSON.parse(JSON.stringify(model_));

    model_._id = mongoose.Types.ObjectId.createFromHexString(model_._id);

    let entry_ : any = await PaymentModel.findOne({ paymentId : model_.paymentId }).exec();

    model_.created = moment(model_.created).valueOf();
    model_.expired = moment(model_.expired).valueOf();

    if (model_.created2) {
        model_.created2 = moment(model_.created2).valueOf()
    }

    if (model_.success) {
        model_.success = moment(model_.success).valueOf()
    }

    if (entry_) {
        Object.keys(model_).forEach((key_) => {
            entry_[ key_ ] = model_[ key_ ];
        });

        await entry_.save();
    } else {
        entry_ = new PaymentModel(model_);
        await entry_.save();
    }
}


export async function getPayment (id_ : string) : Promise<Payment> {
    const payment_ : Payment = (await PaymentModel.findOne({ paymentId : id_ }).exec() as any) as Payment;

    payment_.created = moment(payment_.created);
    payment_.expired = moment(payment_.expired);

    if (payment_.created2) {
        payment_.created2 = moment(payment_.created2);
    }

    if (payment_.success) {
        payment_.success = moment(payment_.success);
    }

    return payment_;
}


export async function handleResponse (req_ : any, res_ : any, fail_ = false) {
    const qs_ = await qs(req_);

    const payment_ = await getPayment(qs_.WMI_PAYMENT_NO);

    if (payment_) {
        const valid_ =
                  qs_.WMI_MERCHANT_ID === walletOneId
                  && parseInt(qs_.WMI_PAYMENT_AMOUNT) === payment_.amount
                  && payment_.signature === qs_.WMI_SIGNATURE;

        if (valid_ && !fail_) {
            payment_.orderId    = qs_.WMI_ORDER_ID;
            payment_.completed  = true;
            payment_.failed     = false;
            payment_.success    = moment();
            payment_.commission = parseInt(qs_.WMI_COMMISSION_AMOUNT);

            // TODO: Get and seal capsule.

            const user_ = await getUser.byId(payment_.user);

            const capsule_ = user_.capsules.find(_ => _.id.toString() === payment_.capsule);

            capsule_.sealed = true;

            setUser(user_);

            await savePayment(payment_);
        } else if (valid_ && fail_) {
            payment_.orderId   = qs_.WMI_ORDER_ID;
            payment_.completed = true;
            payment_.failed    = true;

            await savePayment(payment_);
        }
    }

    res_.send('WMI_RESULT=OK');
}

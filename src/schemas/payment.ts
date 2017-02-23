import moment = require('moment');
import mongoose = require('mongoose');
import Moment = moment.Moment;

import ObjectId = mongoose.Types.ObjectId;

export interface Payment {
    _id         : ObjectId;

    paymentId   : string;          // From scratch
    amount      : number;          // From scratch
    user        : string;          // From scratch
    capsule     : string;          // From scratch
    created     : Moment; // Date. // From scratch
    expired     : Moment; // Date. // From scratch
    service     : number;          // From scratch
    currency    : number;          // From scratch
    signature   : string;          // From scratch
    secret      : string;          // From scratch

    completed?  : Boolean;         // From service
    failed?     : Boolean;         // From service
    created2?   : Moment; // Date. // From service
    success?    : Moment; // Date. // From service
    commission? : number;          // From service
    orderId?    : string;          // From service
}
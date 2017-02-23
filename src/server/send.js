"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
exports.send = (to_, name_, subject_, text_, from_) => __awaiter(this, void 0, void 0, function* () {
    return yield new Promise((resolve, reject) => {
        const ses_ = new AWS.SES();
        const params_ = {
            Destination: {
                ToAddresses: [to_]
            },
            Message: {
                Subject: {
                    Data: subject_,
                    Charset: 'utf-8'
                },
                Body: {
                    Text: {
                        Data: text_,
                        Charset: 'utf-8'
                    }
                }
            },
            Source: `${from_}@capsulatime.com`
        };
        ses_.sendEmail(params_, (error_) => {
            if (error_) {
                reject(error_);
            }
            else {
                resolve();
            }
        });
    });
});
//# sourceMappingURL=send.js.map
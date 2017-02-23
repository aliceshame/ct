"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment');
const part_1 = require('../schemas/part');
const detect_language_1 = require('../util/detect-language');
const l10n_1 = require('../l10n');
const oid_1 = require('../server/oid');
const unicode = require('../util/unicode');
const user_1 = require('../mongo/user');
function createCapsule(req_) {
    return __awaiter(this, void 0, void 0, function* () {
        const tl_ = l10n_1.init(detect_language_1.detectLanguage(req_));
        const text_ = tl_(`<p>Capsule text.</p>`);
        const capsule_ = {
            id: yield oid_1.oid(),
            title: '',
            date: moment().add(1, 'year'),
            created: moment(),
            sealed: false,
            unsealed: false,
            cost: 0,
            size: 0,
            parts: [
                {
                    type: part_1.PartType.Text,
                    id: yield oid_1.oid(),
                    content: text_,
                    size: unicode.b64EncodeUnicode(text_).length
                }
            ],
            receivers: [],
            sent: false
        };
        capsule_.size = capsule_.parts.reduce((sum_, part_) => sum_ + part_.size, 0);
        return capsule_;
    });
}
exports.createCapsule = createCapsule;
function writeFile(name_, data_) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            fs.writeFile(name_, data_, (error_) => {
                if (error_) {
                    reject(error_);
                }
                else {
                    resolve();
                }
            });
        });
    });
}
function md5(data_) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve) => {
            const hash_ = crypto.createHash('md5');
            hash_.update(data_);
            resolve(hash_.digest('hex'));
        });
    });
}
function saveCapsule(body_, user_) {
    return __awaiter(this, void 0, void 0, function* () {
        const index_ = user_.capsules.findIndex(_ => _.id.toString() === body_.id);
        body_.date = moment(body_.date);
        body_.created = user_.capsules[index_].created;
        body_.sent = false;
        yield Promise.all(body_.parts.map((_) => __awaiter(this, void 0, void 0, function* () {
            if (((_.type === part_1.PartType.Attachment) || (_.type === part_1.PartType.Image)) && (_.changed)) {
                const data_ = Buffer.from(_.file, 'base64');
                const name_ = yield md5(data_);
                _.hash = name_;
                yield writeFile(`uploads/${name_}`, data_);
                delete _.file;
            }
        })));
        body_.receivers = body_.receivers.map((_) => {
            _.sent = false;
            return _;
        });
        user_.capsules.splice(index_, 1, body_);
        user_.remaining = true;
        user_1.setUser(user_);
    });
}
exports.saveCapsule = saveCapsule;
//# sourceMappingURL=capsule.js.map
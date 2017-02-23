"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mongoose = require('mongoose');
const moment = require('moment');
const random_1 = require('../server/random');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const schema_ = {
    _id: ObjectId,
    username: String,
    email: String,
    name: String,
    password: String,
    balance: Number,
    tokens: {
        telegram: String,
        twitter: String,
        vk: String,
        facebook: String,
        ok: String
    },
    capsules: [
        {
            _id: ObjectId,
            title: String,
            date: Number,
            created: Number,
            sealed: Boolean,
            unsealed: Boolean,
            cost: Number,
            size: Number,
            receivers: String,
            parts: String,
            sent: Boolean
        }
    ],
    remaining: Boolean,
    lang: String
};
const userSchema = new Schema(schema_);
exports.UserModel = mongoose.model('UserModel', userSchema);
function documentToUser(document_) {
    return {
        id: document_._id,
        password: document_.password,
        username: document_.username,
        email: document_.email,
        name: document_.name,
        tokens: document_.tokens,
        balance: document_.balance,
        capsules: document_.capsules.map((capsule_) => {
            return {
                id: capsule_._id,
                date: moment(capsule_.date),
                created: moment(capsule_.created),
                title: capsule_.title,
                sealed: capsule_.sealed,
                unsealed: capsule_.unsealed,
                cost: 50,
                size: capsule_.size,
                receivers: JSON.parse(capsule_.receivers),
                parts: JSON.parse(capsule_.parts)
            };
        }),
        remaining: document_.balance,
        lang: document_.lang
    };
}
exports.getUser = {
    byName: (name_) => __awaiter(this, void 0, void 0, function* () {
        const document_ = yield exports.UserModel.findOne({ username: name_ }).exec();
        if (document_) {
            return documentToUser(document_);
        }
        else {
            return null;
        }
    }),
    byEmail: (email_) => __awaiter(this, void 0, void 0, function* () {
        const document_ = yield exports.UserModel.findOne({ email: email_ }).exec();
        if (document_) {
            return documentToUser(document_);
        }
        else {
            return null;
        }
    }),
    byId: (id_) => __awaiter(this, void 0, void 0, function* () {
        const document_ = yield exports.UserModel.findById(id_).exec();
        if (document_) {
            return documentToUser(document_);
        }
        else {
            return null;
        }
    })
};
function setUser(user_) {
    return __awaiter(this, void 0, void 0, function* () {
        const document_ = yield exports.UserModel.findById(user_.id).exec();
        document_.username = user_.username;
        document_.password = user_.password;
        document_.name = user_.name;
        document_.email = user_.email;
        document_.tokens = user_.tokens;
        document_.capsules = user_.capsules.map((capsule_) => {
            return {
                _id: capsule_.id,
                date: capsule_.date.valueOf(),
                created: capsule_.created.valueOf(),
                title: capsule_.title,
                sealed: capsule_.sealed,
                unsealed: capsule_.unsealed,
                cost: 50,
                size: capsule_.size,
                receivers: JSON.stringify(capsule_.receivers),
                parts: JSON.stringify(capsule_.parts),
                sent: capsule_.sent
            };
        });
        document_.remaining = user_.remaining;
        document_.lang = user_.lang;
        yield document_.save();
    });
}
exports.setUser = setUser;
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const id_ = yield random_1.random();
        yield (new exports.UserModel({
            _id: mongoose.Types.ObjectId.createFromHexString(id_)
        })).save();
        return id_;
    });
}
exports.createUser = createUser;
//# sourceMappingURL=user.js.map
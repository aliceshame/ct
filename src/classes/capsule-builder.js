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
const part_builder_1 = require('./part-builder');
const l10n_1 = require('../l10n');
const detect_language_1 = require('../util/detect-language');
const receiver_1 = require('../schemas/receiver');
const receiver_builder_1 = require('./receiver-builder');
(function (SaveAction) {
    SaveAction[SaveAction["Save"] = 0] = "Save";
    SaveAction[SaveAction["Seal"] = 1] = "Seal";
})(exports.SaveAction || (exports.SaveAction = {}));
var SaveAction = exports.SaveAction;
function readFile(file_) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve) => {
            const worker_ = new Worker('/static/reader.js');
            worker_.addEventListener('message', (event_) => {
                resolve(event_.data);
                worker_.terminate();
            });
            worker_.postMessage(file_);
        });
    });
}
function listener(element_, handler_) {
    element_.addEventListener('input', handler_);
    element_.addEventListener('change', handler_);
    element_.addEventListener('keyup', handler_);
    element_.addEventListener('keydown', handler_);
    element_.addEventListener('click', handler_);
    element_.addEventListener('mousedown', handler_);
    element_.addEventListener('mouseup', handler_);
    element_.addEventListener('mousemove', handler_);
    element_.addEventListener('mouseout', handler_);
    element_.addEventListener('paste', handler_);
    element_.addEventListener('cut', handler_);
}
class CapsuleBuilder {
    constructor(capsule_) {
        this.owner = '';
        this.parts = [];
        this.tl = l10n_1.init(detect_language_1.detectLanguage());
        this.receivers = [];
        this.friends = [];
        this.stats = document.querySelector('.stats pre code');
        this.id = capsule_.dataset['id'];
        this.sealed = capsule_.dataset['sealed'] === 'true';
        this.unsealed = capsule_.dataset['unsealed'] === 'true';
        this._cost = 50;
        this.owned = true;
        this.date = moment(capsule_.dataset['date']);
        this.title = capsule_.querySelector('#editorForm__title').value;
        this.sizeText = this.tl.bytes(this._size);
        this.costText = this.tl.currency(this._cost);
        this.owner = capsule_.dataset['username'];
        const parts_ = Array.prototype.slice.call(capsule_.querySelectorAll('.capsule-part'));
        parts_.forEach((part_) => {
            this.parts.push(part_builder_1.PartBuilder.fromDiv(this, part_));
        });
        this.size = parseInt(capsule_.dataset['size']);
        const addImage_ = document.querySelector('#addImage');
        addImage_.addEventListener('click', () => {
            part_builder_1.PartBuilder.fromZero(this);
        });
        const titleField_ = capsule_.querySelector('#editorForm__title');
        const titleHandler_ = () => {
            this.title = titleField_.value;
            this.updateStats();
        };
        listener(titleField_, titleHandler_);
        const receiversDialog_ = document.querySelector('.receivers-dialog');
        const receiversHandler_ = () => {
            receiversDialog_.showModal();
        };
        const receiversTop_ = capsule_.querySelector('#receiversTop');
        const receiversBottom_ = capsule_.querySelector('#receiversBottom');
        receiversTop_.addEventListener('click', receiversHandler_);
        receiversBottom_.addEventListener('click', receiversHandler_);
        const receivers_ = Array.prototype.slice.call(document.querySelectorAll('.receivers-dialog .mdl-chip'));
        receivers_.forEach((receiver_) => {
            this.receivers.push(receiver_builder_1.ReceiverBuilder.fromSpan(this, receiver_));
        });
        this.updateStats();
        const receiversAddEmailInput_ = document.querySelector('.receivers-dialog__email-input input');
        const receiversAddEmailButton_ = document.querySelector('.receivers-dialog__email-input button');
        const receiversAddEmailHandler_ = () => {
            if ((this.receivers.length >= 20) || (!receiversAddEmailInput_.validity.valid) || (receiversAddEmailInput_.value === '')) {
                return;
            }
            else {
                receiver_builder_1.ReceiverBuilder.fromZero(this, receiver_1.ReceiverService.Email, receiversAddEmailInput_.value);
                receiversAddEmailInput_.value = '';
                receiversAddEmailInput_.scrollIntoView();
            }
        };
        receiversAddEmailButton_.addEventListener('click', receiversAddEmailHandler_);
        receiversAddEmailInput_.addEventListener('keypress', (event_) => {
            if (event_.key === 'Enter') {
                receiversAddEmailHandler_();
            }
        });
        const saveHandler = () => {
            this.save(SaveAction.Save);
        };
        const saveTopButton_ = document.querySelector('#saveTop');
        const saveBottomButton_ = document.querySelector('#saveBottom');
        saveTopButton_.addEventListener('click', saveHandler);
        saveBottomButton_.addEventListener('click', saveHandler);
        const sealHandler = () => {
            this.save(SaveAction.Seal);
        };
        const sealTopButton_ = document.querySelector('#sealTop');
        const sealBottomButton_ = document.querySelector('#sealBottom');
        sealTopButton_.addEventListener('click', sealHandler);
        sealBottomButton_.addEventListener('click', sealHandler);
        const editorForm__date_year = document.querySelector('#editorForm__date_year');
        const editorForm__date_month = document.querySelector('#editorForm__date_month');
        const editorForm__date_day = document.querySelector('#editorForm__date_day');
        const zero_ = (i_) => {
            const a_ = i_.value;
            const b_ = parseInt(a_);
            if (b_ <= 9)
                return `0${b_}`;
            else
                return `${b_}`;
        };
        const updateDate_ = () => {
            this.date = moment(new Date(`${editorForm__date_year.value}-${zero_(editorForm__date_month)}-${zero_(editorForm__date_day)}`));
            this.updateStats();
        };
        listener(editorForm__date_year, updateDate_);
        listener(editorForm__date_month, updateDate_);
        listener(editorForm__date_day, updateDate_);
        const yesNoCancel_ = document.querySelector('.yes-no-cancel');
        const times_ = document.querySelector('.editor-times');
        times_.addEventListener('click', () => {
            try {
                yesNoCancel_.showModal();
            }
            catch (_) {
            }
        });
        const yes_ = document.querySelector('.yes');
        yes_.addEventListener('click', saveHandler);
    }
    get size() {
        return this._size;
    }
    set size(size_) {
        this._size = size_;
        this.sizeText = this.tl.bytes(size_);
        this.updateStats();
    }
    get cost() {
        return this._cost;
    }
    set cost(cost_) {
        this._cost = cost_;
        this.costText = this.tl.currency(cost_);
    }
    toJSON() {
        const simplified_ = {};
        simplified_.title = this.title;
        simplified_.date = this.date.valueOf();
        simplified_.id = this.id;
        simplified_.sealed = this.sealed;
        simplified_.unsealed = this.unsealed;
        simplified_.size = this.size;
        simplified_.cost = this.cost;
        simplified_.receivers = this.receivers.map((receiver_) => receiver_.toJSON());
        simplified_.parts = this.parts.map((part_) => part_.toJSON());
        return simplified_;
    }
    updateStats() {
        if (this.stats) {
            this.stats.innerText = JSON.stringify(this, null, 2);
        }
    }
    getJson() {
        return __awaiter(this, void 0, void 0, function* () {
            const toJson_ = this.toJSON();
            toJson_.parts = yield Promise.all(toJson_.parts.map((part_) => __awaiter(this, void 0, void 0, function* () {
                if (part_.file) {
                    part_.file = yield readFile(part_.file.file);
                }
                return part_;
            })));
            return toJson_;
        });
    }
    save(action_) {
        return __awaiter(this, void 0, void 0, function* () {
            const json_ = yield this.getJson();
            const saveDialog_ = document.querySelector('.save-dialog');
            saveDialog_.showModal();
            const progress_ = saveDialog_.querySelector('.mdl-progress');
            const xhr_ = new XMLHttpRequest();
            xhr_.open('POST', '/save', true);
            xhr_.addEventListener('progress', (event_) => {
                if (progress_.MaterialProgress) {
                    progress_.MaterialProgress.setProgress(event_.loaded / event_.total);
                }
            });
            xhr_.addEventListener('load', () => {
                try {
                    saveDialog_.close();
                }
                catch (_) {
                }
                if (action_ === SaveAction.Save) {
                    location.href = '/';
                }
                else {
                    location.href = `/pay/${this.owner}/${this.id}`;
                }
            });
            xhr_.send(JSON.stringify(json_));
        });
    }
}
exports.CapsuleBuilder = CapsuleBuilder;
//# sourceMappingURL=capsule-builder.js.map
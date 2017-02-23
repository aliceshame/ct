var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function q(sel_) {
    return document.querySelector(sel_);
}
function wait(time_ = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            const timer_ = setTimeout(() => {
                resolve();
                clearTimeout(timer_);
            }, time_);
        });
    });
}
function rest(method_, path_, type_ = 'json', data_ = {}, ...files_) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            const xhr_ = new XMLHttpRequest();
            const load_ = () => {
                resolve(xhr_.response);
            };
            const error_ = (event_) => {
                reject(event_);
            };
            xhr_.addEventListener('load', load_);
            xhr_.addEventListener('error', error_);
            xhr_.addEventListener('abort', error_);
            xhr_.responseType = type_;
            xhr_.open(method_, path_);
            xhr_.send(method_ === 'POST' ? JSON.stringify(data_) : null);
        });
    });
}
class Message {
    constructor(sel_) {
        this._element = q(sel_);
        this._shown = this._element.classList.contains('message_shown');
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._shown) {
                this._element.classList.remove('message_animating');
                this._element.classList.remove('message_flash');
                yield wait(1000 / 60);
            }
            this._element.classList.add('message_shown');
            this._element.classList.add('message_animating');
            yield wait(1000 / 60);
            this._element.classList.add('message_flash');
            this._shown = true;
        });
    }
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            this._element.classList.remove('message_shown');
            this._element.classList.remove('message_animating');
            this._element.classList.remove('message_flash');
            this._shown = false;
        });
    }
}
class Restore {
    constructor() {
        this.__step1 = q('.restore__step_1');
        this.__toggle = q('.restore__toggle a');
        this.__submit = q('.restore__step_1 .button');
        this.__input = q('.restore__step_1 input');
        this.__messageSent = new Message('.restore__message_sent .message');
        this.__toggle.addEventListener('click', (event_) => {
            this._formToggle();
            event_.preventDefault();
        });
        this.__submit.addEventListener('click', () => {
            this._submit();
        });
        this.__input.addEventListener('keypress', (event_) => {
            if (event_.key === 'Enter') {
                this._submit();
            }
        });
    }
    _formToggle() {
        this.__step1.classList.toggle('hidden');
    }
    _submit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield rest('POST', '/auth', 'json', {
                    login: this.__input.value
                });
                yield this.__messageSent.show();
            }
            catch (_) {
            }
        });
    }
}
class Signup {
    constructor() {
        this.__name = q('.signup__name');
        this.__username = q('.signup__username');
        this.__mail = q('.signup__mail');
        this.__password = q('.signup__password');
        this.__repeat = q('.signup__repeat');
        this.__proceed = q('.signup__step_1 .button');
        this.__finish = q('.signup__step_2 .button');
        this.__step2 = q('.signup__step_2');
        this._messages = {
            badInput: new Message('.signup__message_bad-input     .message'),
            weakPassword: new Message('.signup__message_weak-password .message'),
            notMatch: new Message('.signup__message_not-match     .message'),
            notice: new Message('.signup__message_notice        .message')
        };
        this.__proceed.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const valid_ = yield this._validate(1);
            if (valid_) {
                this.__step2.classList.remove('hidden');
                yield this._messages.notice.show();
                this.__password.focus();
            }
        }));
        this.__finish.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const valid_ = yield this._validate(2);
        }));
    }
    _validate(step_ = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (step_ === 1) {
                const valid_ = this.__name.value !== '' && this.__mail.validity.valid && /^[a-z\d\-_.]+/i.test(this.__username.value);
                if (valid_) {
                    yield this._messages.badInput.hide();
                }
                else {
                    yield this._messages.badInput.show();
                }
                return valid_;
            }
            else {
                let valid1_ = this.__password.value.length >= 8;
                if (valid1_) {
                    this._messages.weakPassword.hide();
                }
                else {
                    this._messages.weakPassword.show();
                }
                let valid2_ = this.__password.value === this.__repeat.value;
                if (valid2_) {
                    this._messages.notMatch.hide();
                }
                else {
                    this._messages.notMatch.show();
                }
                return valid1_ && valid2_;
            }
        });
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        new Restore();
        new Signup();
    });
}
document.addEventListener('DOMContentLoaded', main);
//# sourceMappingURL=landing.js.map
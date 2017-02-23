"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const auth_1 = require('../schemas/auth');
class UpdateBuilder {
    constructor() {
        this.method = auth_1.AuthMethod.Update;
        this.login = '';
        this.password = '';
        this.oldPassword = '';
        this.passwordConfirm = '';
        this.name = '';
        this.email = '';
        const loginField_ = document.querySelector('#signup__login');
        const nameField_ = document.querySelector('#signup__name');
        const emailField_ = document.querySelector('#signup__email');
        const oldPasswordField_ = document.querySelector('#signup__oldPassword');
        const passwordField_ = document.querySelector('#signup__password');
        const passwordConfirmField_ = document.querySelector('#signup__passwordConfirm');
        const proceedButton_ = document.querySelector('#signup__proceed');
        const updateLogin_ = () => {
            this.login = loginField_.value;
        };
        updateLogin_();
        loginField_.addEventListener('input', updateLogin_);
        loginField_.addEventListener('keypress', updateLogin_);
        loginField_.addEventListener('click', updateLogin_);
        loginField_.addEventListener('cut', updateLogin_);
        loginField_.addEventListener('paste', updateLogin_);
        const updateName_ = () => {
            this.name = nameField_.value;
        };
        updateName_();
        nameField_.addEventListener('input', updateName_);
        nameField_.addEventListener('keypress', updateName_);
        nameField_.addEventListener('click', updateName_);
        nameField_.addEventListener('cut', updateName_);
        nameField_.addEventListener('paste', updateName_);
        const updateEmail_ = () => {
            this.email = emailField_.value;
        };
        updateEmail_();
        emailField_.addEventListener('input', updateEmail_);
        emailField_.addEventListener('keypress', updateEmail_);
        emailField_.addEventListener('click', updateEmail_);
        emailField_.addEventListener('cut', updateEmail_);
        emailField_.addEventListener('paste', updateEmail_);
        const updateOldPassword_ = () => {
            this.oldPassword = oldPasswordField_.value;
        };
        oldPasswordField_.addEventListener('input', updateOldPassword_);
        oldPasswordField_.addEventListener('keypress', updateOldPassword_);
        oldPasswordField_.addEventListener('click', updateOldPassword_);
        oldPasswordField_.addEventListener('cut', updateOldPassword_);
        oldPasswordField_.addEventListener('paste', updateOldPassword_);
        const updatePassword_ = () => {
            this.password = passwordField_.value;
        };
        passwordField_.addEventListener('input', updatePassword_);
        passwordField_.addEventListener('keypress', updatePassword_);
        passwordField_.addEventListener('click', updatePassword_);
        passwordField_.addEventListener('cut', updatePassword_);
        passwordField_.addEventListener('paste', updatePassword_);
        const updatePasswordConfirm_ = () => {
            this.passwordConfirm = passwordConfirmField_.value;
        };
        passwordConfirmField_.addEventListener('input', updatePasswordConfirm_);
        passwordConfirmField_.addEventListener('keypress', updatePasswordConfirm_);
        passwordConfirmField_.addEventListener('click', updatePasswordConfirm_);
        passwordConfirmField_.addEventListener('cut', updatePasswordConfirm_);
        passwordConfirmField_.addEventListener('paste', updatePasswordConfirm_);
        const badInputDialog_ = document.querySelector('.bad-input');
        const handleProceed_ = (event_) => {
            if ((!event_.key) || (event_.key === 'Enter')) {
                if ((this.login !== '')
                    && loginField_.validity.valid
                    && (this.name !== '')
                    && nameField_.validity.valid
                    && (this.email !== '')
                    && emailField_.validity.valid) {
                    try {
                        handleFinish_();
                    }
                    catch (_) {
                    }
                }
                else {
                    try {
                        badInputDialog_.showModal();
                    }
                    catch (_) {
                    }
                }
            }
        };
        proceedButton_.addEventListener('click', handleProceed_);
        proceedButton_.addEventListener('keypress', handleProceed_);
        loginField_.addEventListener('keypress', handleProceed_);
        nameField_.addEventListener('keypress', handleProceed_);
        emailField_.addEventListener('keypress', handleProceed_);
        const handleFinish_ = () => __awaiter(this, void 0, void 0, function* () {
            if (this.password === this.passwordConfirm) {
                const error_ = yield this.submit();
                switch (error_) {
                    case auth_1.AuthError.InvalidUsername:
                        try {
                            document.querySelector('.invalid-username').showModal();
                        }
                        catch (_) {
                        }
                        break;
                    case auth_1.AuthError.InvalidMail:
                        try {
                            document.querySelector('.invalid-email').showModal();
                        }
                        catch (_) {
                        }
                        break;
                    case auth_1.AuthError.InvalidName:
                        try {
                            document.querySelector('.invalid-name').showModal();
                        }
                        catch (_) {
                        }
                        break;
                    case auth_1.AuthError.WeakPassword:
                        try {
                            document.querySelector('.weak-password').showModal();
                        }
                        catch (_) {
                        }
                        break;
                    case auth_1.AuthError.InvalidLoginOrPassword:
                        try {
                            document.querySelector('.invalid-login-or-password').showModal();
                        }
                        catch (_) {
                        }
                        break;
                    case auth_1.AuthError.Success:
                        try {
                            document.querySelector('.success-dialog').showModal();
                        }
                        catch (_) {
                        }
                        break;
                }
            }
            else {
                try {
                    try {
                        document.querySelector('.bad-password-confirm').showModal();
                    }
                    catch (_) {
                    }
                }
                catch (_) {
                }
            }
        });
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                const xhr_ = new XMLHttpRequest();
                xhr_.open('POST', '/auth');
                xhr_.responseType = 'json';
                xhr_.addEventListener('load', () => {
                    resolve(xhr_.response.error);
                });
                const data_ = JSON.stringify(this);
                xhr_.send(data_);
            });
        });
    }
    toJSON() {
        return {
            method: this.method,
            login: this.login,
            password: this.password,
            email: this.email,
            name: this.name,
            old: this.oldPassword
        };
    }
}
exports.UpdateBuilder = UpdateBuilder;
new UpdateBuilder();
//# sourceMappingURL=profile.js.map
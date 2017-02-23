/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const auth_1 = __webpack_require__(1);
	class LoginBuilder {
	    constructor() {
	        this.method = auth_1.AuthMethod.Login;
	        this.login = '';
	        this.password = '';
	        const loginField_ = document.querySelector('#login__login');
	        const passwordField_ = document.querySelector('#login__password');
	        const loginButton_ = document.querySelector('#login__button');
	        const updateLogin_ = () => {
	            this.login = loginField_.value;
	        };
	        loginField_.value = '';
	        updateLogin_();
	        loginField_.addEventListener('input', updateLogin_);
	        loginField_.addEventListener('keypress', updateLogin_);
	        loginField_.addEventListener('click', updateLogin_);
	        loginField_.addEventListener('cut', updateLogin_);
	        loginField_.addEventListener('paste', updateLogin_);
	        const updatePassword_ = () => {
	            this.password = passwordField_.value;
	        };
	        passwordField_.value = '';
	        updatePassword_();
	        passwordField_.addEventListener('input', updatePassword_);
	        passwordField_.addEventListener('keypress', updatePassword_);
	        passwordField_.addEventListener('click', updatePassword_);
	        passwordField_.addEventListener('cut', updatePassword_);
	        passwordField_.addEventListener('paste', updatePassword_);
	        const loginErrorDialog_ = document.querySelector('.invalid-login-or-password');
	        const doSubmit_ = () => __awaiter(this, void 0, void 0, function* () {
	            try {
	                const error_ = yield this.submit();
	                if (error_ !== auth_1.AuthError.Success) {
	                    loginErrorDialog_.showModal();
	                }
	                else {
	                    location.reload();
	                }
	            }
	            catch (_) {
	                try {
	                    loginErrorDialog_.showModal();
	                }
	                catch (_) {
	                }
	            }
	        });
	        const handleSubmit_ = (event_) => __awaiter(this, void 0, void 0, function* () {
	            if ((!event_.key) || (event_.key === 'Enter')) {
	                yield doSubmit_();
	            }
	        });
	        const handleSubmitField_ = (event_) => __awaiter(this, void 0, void 0, function* () {
	            if (event_.key === 'Enter') {
	                yield doSubmit_();
	            }
	        });
	        loginButton_.addEventListener('click', handleSubmit_);
	        loginButton_.addEventListener('keypress', handleSubmit_);
	        loginField_.addEventListener('keypress', handleSubmitField_);
	        passwordField_.addEventListener('keypress', handleSubmitField_);
	    }
	    submit() {
	        return __awaiter(this, void 0, Promise, function* () {
	            return yield new Promise((resolve) => {
	                const xhr_ = new XMLHttpRequest();
	                xhr_.open('POST', '/auth');
	                xhr_.responseType = 'json';
	                xhr_.addEventListener('load', () => {
	                    resolve(xhr_.response.error);
	                });
	                xhr_.send(JSON.stringify(this));
	            });
	        });
	    }
	    toJSON() {
	        return {
	            method: this.method,
	            login: this.login,
	            password: this.password
	        };
	    }
	}
	exports.LoginBuilder = LoginBuilder;
	class SignupBuilder {
	    constructor() {
	        this.method = auth_1.AuthMethod.Signup;
	        this.login = '';
	        this.password = '';
	        this.passwordConfirm = '';
	        this.name = '';
	        this.email = '';
	        const loginField_ = document.querySelector('#signup__login');
	        const nameField_ = document.querySelector('#signup__name');
	        const emailField_ = document.querySelector('#signup__email');
	        const passwordField_ = document.querySelector('#signup__password');
	        const passwordConfirmField_ = document.querySelector('#signup__passwordConfirm');
	        const proceedButton_ = document.querySelector('#signup__proceed');
	        const finishButton_ = document.querySelector('#signup__finish');
	        const updateLogin_ = () => {
	            this.login = loginField_.value;
	        };
	        loginField_.value = '';
	        updateLogin_();
	        loginField_.addEventListener('input', updateLogin_);
	        loginField_.addEventListener('keypress', updateLogin_);
	        loginField_.addEventListener('click', updateLogin_);
	        loginField_.addEventListener('cut', updateLogin_);
	        loginField_.addEventListener('paste', updateLogin_);
	        const updateName_ = () => {
	            this.name = nameField_.value;
	        };
	        nameField_.value = '';
	        updateName_();
	        nameField_.addEventListener('input', updateName_);
	        nameField_.addEventListener('keypress', updateName_);
	        nameField_.addEventListener('click', updateName_);
	        nameField_.addEventListener('cut', updateName_);
	        nameField_.addEventListener('paste', updateName_);
	        const updateEmail_ = () => {
	            this.email = emailField_.value;
	        };
	        emailField_.value = '';
	        updateEmail_();
	        emailField_.addEventListener('input', updateEmail_);
	        emailField_.addEventListener('keypress', updateEmail_);
	        emailField_.addEventListener('click', updateEmail_);
	        emailField_.addEventListener('cut', updateEmail_);
	        emailField_.addEventListener('paste', updateEmail_);
	        const updatePassword_ = () => {
	            this.password = passwordField_.value;
	        };
	        passwordField_.value = '';
	        updatePassword_();
	        passwordField_.addEventListener('input', updatePassword_);
	        passwordField_.addEventListener('keypress', updatePassword_);
	        passwordField_.addEventListener('click', updatePassword_);
	        passwordField_.addEventListener('cut', updatePassword_);
	        passwordField_.addEventListener('paste', updatePassword_);
	        const updatePasswordConfirm_ = () => {
	            this.passwordConfirm = passwordConfirmField_.value;
	        };
	        passwordConfirmField_.value = '';
	        updatePasswordConfirm_();
	        passwordConfirmField_.addEventListener('input', updatePasswordConfirm_);
	        passwordConfirmField_.addEventListener('keypress', updatePasswordConfirm_);
	        passwordConfirmField_.addEventListener('click', updatePasswordConfirm_);
	        passwordConfirmField_.addEventListener('cut', updatePasswordConfirm_);
	        passwordConfirmField_.addEventListener('paste', updatePasswordConfirm_);
	        const badInputDialog_ = document.querySelector('.bad-input');
	        const nextStepDialog_ = document.querySelector('.next-step');
	        const doProceed_ = () => __awaiter(this, void 0, void 0, function* () {
	            if ((this.login !== '') && loginField_.validity.valid && (this.name !== '') && nameField_.validity.valid && (this.email !== '') && emailField_.validity.valid) {
	                try {
	                    nextStepDialog_.showModal();
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
	        });
	        const handleProceed_ = (event_) => __awaiter(this, void 0, void 0, function* () {
	            if ((!event_.key) || (event_.key === 'Enter')) {
	                yield doProceed_();
	            }
	        });
	        const handleProceedFiled_ = (event_) => __awaiter(this, void 0, void 0, function* () {
	            if (event_.key === 'Enter') {
	                yield doProceed_();
	            }
	        });
	        proceedButton_.addEventListener('click', handleProceed_);
	        proceedButton_.addEventListener('keypress', handleProceed_);
	        loginField_.addEventListener('keypress', handleProceedFiled_);
	        nameField_.addEventListener('keypress', handleProceedFiled_);
	        emailField_.addEventListener('keypress', handleProceedFiled_);
	        const doFinish_ = () => __awaiter(this, void 0, void 0, function* () {
	            if ((this.password !== '') && passwordField_.validity.valid && (this.passwordConfirm !== '') && passwordConfirmField_.validity.valid && (this.password === this.passwordConfirm)) {
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
	                    case auth_1.AuthError.Success:
	                        location.reload();
	                        break;
	                }
	            }
	            else {
	                try {
	                    badInputDialog_.showModal();
	                }
	                catch (_) {
	                }
	            }
	        });
	        const handleFinish_ = (event_) => __awaiter(this, void 0, void 0, function* () {
	            if ((!event_.key) || (event_.key === 'Enter')) {
	                yield doFinish_();
	            }
	        });
	        const handleFinishField_ = (event_) => __awaiter(this, void 0, void 0, function* () {
	            if (event_.key === 'Event') {
	                yield doFinish_();
	            }
	        });
	        finishButton_.addEventListener('click', handleFinish_);
	        finishButton_.addEventListener('keypress', handleFinish_);
	        passwordField_.addEventListener('keypress', handleFinishField_);
	        passwordConfirmField_.addEventListener('keypress', handleFinishField_);
	    }
	    submit() {
	        return __awaiter(this, void 0, Promise, function* () {
	            return yield new Promise((resolve) => {
	                const xhr_ = new XMLHttpRequest();
	                xhr_.open('POST', '/auth');
	                xhr_.responseType = 'json';
	                xhr_.addEventListener('load', () => {
	                    resolve(xhr_.response.error);
	                });
	                xhr_.send(JSON.stringify(this));
	            });
	        });
	    }
	    toJSON() {
	        return {
	            method: this.method,
	            login: this.login,
	            password: this.password,
	            email: this.email,
	            name: this.name
	        };
	    }
	}
	exports.SignupBuilder = SignupBuilder;
	class RestoreBuilder {
	    constructor() {
	        this.method = auth_1.AuthMethod.Restore;
	        this.login = '';
	        const loginField_ = document.querySelector('#restore__login');
	        const proceedButton_ = document.querySelector('#restore__proceed');
	        const finishButton_ = document.querySelector('#restore__finish');
	        const updateLogin_ = () => {
	            this.login = loginField_.value;
	        };
	        loginField_.value = '';
	        updateLogin_();
	        loginField_.addEventListener('input', updateLogin_);
	        loginField_.addEventListener('keypress', updateLogin_);
	        loginField_.addEventListener('click', updateLogin_);
	        loginField_.addEventListener('cut', updateLogin_);
	        loginField_.addEventListener('paste', updateLogin_);
	        const handleProceed_ = () => {
	            document.querySelector('.restore').showModal();
	        };
	        proceedButton_.addEventListener('click', handleProceed_);
	        proceedButton_.addEventListener('keypress', handleProceed_);
	        const handleFinish_ = (event_) => __awaiter(this, void 0, void 0, function* () {
	            if ((!event_.key) || (event_.key === 'Enter')) {
	                if ((this.login !== '') && (loginField_.validity.valid)) {
	                    try {
	                        const error_ = yield this.submit();
	                        switch (error_) {
	                            case auth_1.AuthError.Success:
	                                try {
	                                    document.querySelector('.restore-success').showModal();
	                                }
	                                catch (_) {
	                                }
	                                break;
	                            default:
	                                try {
	                                    document.querySelector('.bad-input').showModal();
	                                }
	                                catch (_) {
	                                }
	                        }
	                    }
	                    catch (_) {
	                    }
	                }
	                else {
	                    document.querySelector('.bad-input').showModal();
	                }
	            }
	        });
	        finishButton_.addEventListener('click', handleFinish_);
	        finishButton_.addEventListener('keypress', handleFinish_);
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
	                xhr_.send(JSON.stringify(this));
	            });
	        });
	    }
	    toJSON() {
	        return {
	            method: this.method,
	            login: this.login
	        };
	    }
	}
	exports.RestoreBuilder = RestoreBuilder;
	new LoginBuilder();
	new SignupBuilder();
	new RestoreBuilder();
	//# sourceMappingURL=signup.js.map

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	(function (AuthMethod) {
	    AuthMethod[AuthMethod["Login"] = 0] = "Login";
	    AuthMethod[AuthMethod["Signup"] = 1] = "Signup";
	    AuthMethod[AuthMethod["Restore"] = 2] = "Restore";
	    AuthMethod[AuthMethod["Update"] = 3] = "Update";
	})(exports.AuthMethod || (exports.AuthMethod = {}));
	var AuthMethod = exports.AuthMethod;
	(function (AuthError) {
	    AuthError[AuthError["Success"] = 0] = "Success";
	    AuthError[AuthError["InvalidLoginOrPassword"] = 1] = "InvalidLoginOrPassword";
	    AuthError[AuthError["WeakPassword"] = 2] = "WeakPassword";
	    AuthError[AuthError["InvalidUsername"] = 3] = "InvalidUsername";
	    AuthError[AuthError["InvalidMail"] = 4] = "InvalidMail";
	    AuthError[AuthError["InvalidName"] = 5] = "InvalidName";
	    AuthError[AuthError["InvalidCaptcha"] = 6] = "InvalidCaptcha";
	})(exports.AuthError || (exports.AuthError = {}));
	var AuthError = exports.AuthError;
	//# sourceMappingURL=auth.js.map

/***/ }
/******/ ]);
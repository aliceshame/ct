import {
    AuthRequest, AuthMethod, AuthResponse, AuthError
} from '../schemas/auth';

export class LoginBuilder implements AuthRequest {
    method : AuthMethod = AuthMethod.Login;
    login : string      = '';
    password : string   = '';

    constructor () {
        const loginField_    = document.querySelector('#login__login') as HTMLInputElement;
        const passwordField_ = document.querySelector('#login__password') as HTMLInputElement;
        const loginButton_   = document.querySelector('#login__button') as HTMLInputElement;

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

        const loginErrorDialog_ = document.querySelector('.invalid-login-or-password') as any;

        const doSubmit_ = async () => {
            try {
                const error_ = await this.submit();

                if (error_ !== AuthError.Success) {
                    loginErrorDialog_.showModal();
                } else {
                    location.reload();
                }
            } catch (_) {
                try {
                    loginErrorDialog_.showModal();
                } catch (_) {
                    //
                }
            }
        };

        const handleSubmit_ = async (event_? : KeyboardEvent) => {
            if ((!event_.key) || (event_.key === 'Enter')) {
                await doSubmit_();
            }
        };

        const handleSubmitField_ = async (event_ : KeyboardEvent) => {
            if (event_.key === 'Enter') {
                await doSubmit_();
            }
        };

        loginButton_.addEventListener('click', handleSubmit_);
        loginButton_.addEventListener('keypress', handleSubmit_);

        loginField_.addEventListener('keypress', handleSubmitField_);
        passwordField_.addEventListener('keypress', handleSubmitField_);
    }

    async submit () : Promise<AuthError> {
        return await new Promise<AuthError>((resolve) => {
            const xhr_ = new XMLHttpRequest();

            xhr_.open('POST', '/auth');

            xhr_.responseType = 'json';

            xhr_.addEventListener('load', () => {
                resolve((xhr_.response as AuthResponse).error);
            });

            xhr_.send(JSON.stringify(this));
        });
    }

    toJSON () {
        return {
            method   : this.method,
            login    : this.login,
            password : this.password
        };
    }
}

export class SignupBuilder implements AuthRequest {
    method : AuthMethod      = AuthMethod.Signup;
    login : string           = '';
    password : string        = '';
    passwordConfirm : string = '';
    name : string            = '';
    email : string           = '';

    constructor () {
        const loginField_           = document.querySelector('#signup__login') as HTMLInputElement;
        const nameField_            = document.querySelector('#signup__name') as HTMLInputElement;
        const emailField_           = document.querySelector('#signup__email') as HTMLInputElement;
        const passwordField_        = document.querySelector('#signup__password') as HTMLInputElement;
        const passwordConfirmField_ = document.querySelector('#signup__passwordConfirm') as HTMLInputElement;
        const proceedButton_        = document.querySelector('#signup__proceed') as HTMLButtonElement;
        const finishButton_         = document.querySelector('#signup__finish') as HTMLButtonElement;

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

        const badInputDialog_ = document.querySelector('.bad-input') as any;
        const nextStepDialog_ = document.querySelector('.next-step') as any;

        const doProceed_ = async () => {
            if ((this.login !== '') && loginField_.validity.valid && (this.name !== '') && nameField_.validity.valid && (this.email !== '') && emailField_.validity.valid) {
                try {
                    nextStepDialog_.showModal();
                } catch (_) {
                    //
                }
            } else {
                try {
                    badInputDialog_.showModal();
                } catch (_) {
                    //
                }
            }
        };

        const handleProceed_ = async (event_ : KeyboardEvent) => {
            if ((!event_.key) || (event_.key === 'Enter')) {
                await doProceed_();
            }
        };

        const handleProceedFiled_ = async (event_ : KeyboardEvent) => {
            if (event_.key === 'Enter') {
                await doProceed_();
            }
        };

        proceedButton_.addEventListener('click', handleProceed_);
        proceedButton_.addEventListener('keypress', handleProceed_);

        loginField_.addEventListener('keypress', handleProceedFiled_);
        nameField_.addEventListener('keypress', handleProceedFiled_);
        emailField_.addEventListener('keypress', handleProceedFiled_);



        const doFinish_ = async () => {
            if ((this.password !== '') && passwordField_.validity.valid && (this.passwordConfirm !== '') && passwordConfirmField_.validity.valid && (this.password === this.passwordConfirm)) {
                const error_ = await this.submit();

                switch (error_) {
                    case AuthError.InvalidUsername:
                        try {
                            (document.querySelector('.invalid-username') as any).showModal();
                        } catch (_) {
                            //
                        }
                        break;
                    case AuthError.InvalidMail:
                        try {
                            (document.querySelector('.invalid-email') as any).showModal();
                        } catch (_) {
                            //
                        }
                        break;
                    case AuthError.InvalidName:
                        try {
                            (document.querySelector('.invalid-name') as any).showModal();
                        } catch (_) {
                            //
                        }
                        break;
                    case AuthError.WeakPassword:
                        try {
                            (document.querySelector('.weak-password') as any).showModal();
                        } catch (_) {
                            //
                        }
                        break;
                    case AuthError.Success:
                        location.reload();
                        break;
                }
            } else {
                try {
                    badInputDialog_.showModal();
                } catch (_) {
                    //
                }
            }
        };



        const handleFinish_ = async (event_ : KeyboardEvent) => {
            if ((!event_.key) || (event_.key === 'Enter')) {
                await doFinish_();
            }
        };

        const handleFinishField_ = async (event_ : KeyboardEvent) => {
            if (event_.key === 'Event') {
                await doFinish_();
            }
        };

        finishButton_.addEventListener('click', handleFinish_);
        finishButton_.addEventListener('keypress', handleFinish_);

        passwordField_.addEventListener('keypress', handleFinishField_);
        passwordConfirmField_.addEventListener('keypress', handleFinishField_);
    }

    async submit () : Promise<AuthError> {
        return await new Promise<AuthError>((resolve) => {
            const xhr_ = new XMLHttpRequest();

            xhr_.open('POST', '/auth');

            xhr_.responseType = 'json';

            xhr_.addEventListener('load', () => {
                resolve((xhr_.response as AuthResponse).error);
            });

            xhr_.send(JSON.stringify(this));
        });
    }

    toJSON () {
        return {
            method   : this.method,
            login    : this.login,
            password : this.password,
            email    : this.email,
            name     : this.name
        };
    }
}

export class RestoreBuilder implements AuthRequest {
    method : AuthMethod = AuthMethod.Restore;
    login : string      = '';

    constructor () {
        const loginField_    = document.querySelector('#restore__login') as HTMLInputElement;
        const proceedButton_ = document.querySelector('#restore__proceed') as HTMLButtonElement;
        const finishButton_  = document.querySelector('#restore__finish') as HTMLButtonElement;

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
            (document.querySelector('.restore') as any).showModal();
        };

        proceedButton_.addEventListener('click', handleProceed_);
        proceedButton_.addEventListener('keypress', handleProceed_);

        const handleFinish_ = async (event_ : KeyboardEvent) => {
            if ((!event_.key) || (event_.key === 'Enter')) {
                if ((this.login !== '') && (loginField_.validity.valid)) {
                    try {
                        const error_ = await this.submit();

                        switch (error_) {
                            case AuthError.Success:
                                try {
                                    (document.querySelector('.restore-success') as any).showModal();
                                } catch (_) {
                                    //
                                }
                                break;
                            default:
                                try {
                                    (document.querySelector('.bad-input') as any).showModal();
                                } catch (_) {
                                    //
                                }
                        }
                    } catch (_) {
                        //
                    }
                } else {
                    (document.querySelector('.bad-input') as any).showModal();
                }
            }
        };

        finishButton_.addEventListener('click', handleFinish_);
        finishButton_.addEventListener('keypress', handleFinish_);
    }

    async submit () {
        return await new Promise<AuthError>((resolve) => {
            const xhr_ = new XMLHttpRequest();

            xhr_.open('POST', '/auth');

            xhr_.responseType = 'json';

            xhr_.addEventListener('load', () => {
                resolve((xhr_.response as AuthResponse).error);
            });

            xhr_.send(JSON.stringify(this));
        });
    }

    toJSON () {
        return {
            method : this.method,
            login  : this.login
        };
    }
}

new LoginBuilder();
new SignupBuilder();
new RestoreBuilder();

import {
    AuthRequest, AuthMethod, AuthResponse, AuthError
} from '../schemas/auth';

export class UpdateBuilder implements AuthRequest {
    method : AuthMethod      = AuthMethod.Update;
    login : string           = '';
    password : string        = '';
    oldPassword : string     = '';
    passwordConfirm : string = '';
    name : string            = '';
    email : string           = '';

    constructor () {
        const loginField_           = document.querySelector('#signup__login') as HTMLInputElement;
        const nameField_            = document.querySelector('#signup__name') as HTMLInputElement;
        const emailField_           = document.querySelector('#signup__email') as HTMLInputElement;
        const oldPasswordField_     = document.querySelector('#signup__oldPassword') as HTMLInputElement;
        const passwordField_        = document.querySelector('#signup__password') as HTMLInputElement;
        const passwordConfirmField_ = document.querySelector('#signup__passwordConfirm') as HTMLInputElement;
        const proceedButton_        = document.querySelector('#signup__proceed') as HTMLButtonElement;

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

        const badInputDialog_ = document.querySelector('.bad-input') as any;

        const handleProceed_ = (event_ : KeyboardEvent) => {
            if ((!event_.key) || (event_.key === 'Enter')) {
                if (
                    (this.login !== '')
                    && loginField_.validity.valid
                    && (this.name !== '')
                    && nameField_.validity.valid
                    && (this.email !== '')
                    && emailField_.validity.valid
                ) {
                    try {
                        handleFinish_();
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
            }
        };

        proceedButton_.addEventListener('click', handleProceed_);
        proceedButton_.addEventListener('keypress', handleProceed_);

        loginField_.addEventListener('keypress', handleProceed_);
        nameField_.addEventListener('keypress', handleProceed_);
        emailField_.addEventListener('keypress', handleProceed_);


        const handleFinish_ = async () => {
            if (this.password === this.passwordConfirm) {
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
                    case AuthError.InvalidLoginOrPassword:
                        try {
                            (document.querySelector('.invalid-login-or-password') as any).showModal();
                        } catch (_) {
                            //
                        }
                        break;
                    case AuthError.Success:
                        try {
                            (document.querySelector('.success-dialog') as any).showModal();
                        } catch (_) {
                            //
                        }
                        break;
                }
            } else {
                try {
                    try {
                        (document.querySelector('.bad-password-confirm') as any).showModal();
                    } catch (_) {
                        //
                    }
                } catch (_) {
                    //
                }
            }
        };

        // const vkButton = document.querySelector('.sns-grid__button_vk') as HTMLDivElement;

        // const vkIframe = document.querySelector('.authenticate-vk iframe') as HTMLIFrameElement;

        // vkButton.addEventListener('click', () => {
        //     try {
        //         (document.querySelector('.authenticate-vk') as any).showModal();
        //         // document.domain = 'oauth.vk.com';
        //         vkIframe.src = 'https://oauth.vk.com/authorize?' +
        //             'client_id=5586017&' +
        //             'display=page&' +
        //             'redirect_uri=https://oauth.vk.com/blank.html&' +
        //             'scope=friends,messages&' +
        //             'response_type=token&' +
        //             'display=touch';
        //     } catch (_) {
        //         //
        //     }
        // });

        // vkIframe.addEventListener('load', () => {
        //     console.log(vkIframe.contentWindow.location.href);
        //     if (vkIframe.src.match(/^https?:\/\/oauth\.vk\.com\/blank\.html/)) {
        //         console.log(vkIframe.src);
        //     }
        // });
    }

    async submit () : Promise<AuthError> {
        return await new Promise<AuthError>((resolve) => {
            const xhr_ = new XMLHttpRequest();

            xhr_.open('POST', '/auth');

            xhr_.responseType = 'json';

            xhr_.addEventListener('load', () => {
                resolve((xhr_.response as AuthResponse).error);
            });

            const data_ = JSON.stringify(this);
            xhr_.send(data_);
        });
    }

    toJSON () {
        return {
            method   : this.method,
            login    : this.login,
            password : this.password,
            email    : this.email,
            name     : this.name,
            old      : this.oldPassword
        };
    }
}

new UpdateBuilder();

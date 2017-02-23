function q<Type extends Element> (sel_ : string) : Type {
    return document.querySelector(sel_) as Type;
}

async function wait (time_ = 0) : Promise<void> {
    return await new Promise<void>((resolve, reject) => {
        const timer_ = setTimeout(() => {
            resolve();
            clearTimeout(timer_);
        }, time_);
    });
}

async function rest<Type> (method_ : string, path_ : string, type_ = 'json', data_ : any = {}, ...files_ : File[]) : Promise<Type> {
    return await new Promise<Type>((resolve, reject) => {
        const xhr_ = new XMLHttpRequest();

        const load_ = () => {
            resolve(xhr_.response);
        };

        const error_ = (event_ : Event | UIEvent) => {
            reject(event_);
        };

        xhr_.addEventListener('load', load_);
        xhr_.addEventListener('error', error_);
        xhr_.addEventListener('abort', error_);

        xhr_.responseType = type_;

        xhr_.open(method_, path_);
        xhr_.send(method_ === 'POST' ? JSON.stringify(data_) : null);
    });
}

class Message {
    private _element : HTMLDivElement;
    private _shown : boolean;

    async show () : Promise<void> {
        if (this._shown) {
            this._element.classList.remove('message_animating');
            this._element.classList.remove('message_flash');
            await wait(1000 / 60);
        }

        this._element.classList.add('message_shown');
        this._element.classList.add('message_animating');
        await wait(1000 / 60);
        this._element.classList.add('message_flash');
        this._shown = true;
    }

    async hide () : Promise<void> {
        this._element.classList.remove('message_shown');
        this._element.classList.remove('message_animating');
        this._element.classList.remove('message_flash');
        this._shown = false;
    }

    constructor (sel_ : string) {
        this._element = q<HTMLDivElement>(sel_);
        this._shown   = this._element.classList.contains('message_shown');
    }
}

class Restore {
    private __step1       = q<HTMLDivElement>('.restore__step_1');
    private __toggle      = q<HTMLDivElement>('.restore__toggle a');
    private __submit      = q<HTMLDivElement>('.restore__step_1 .button');
    private __input       = q<HTMLInputElement>('.restore__step_1 input');
    private __messageSent = new Message('.restore__message_sent .message');

    private _formToggle () {
        this.__step1.classList.toggle('hidden');
    }

    private async _submit () {
        try {
            await rest('POST', '/auth', 'json', {
                login : this.__input.value
            });
            await this.__messageSent.show();
        } catch (_) {
        }
    }

    constructor () {
        this.__toggle.addEventListener('click', (event_ : MouseEvent) => {
            this._formToggle();
            event_.preventDefault();
        });

        this.__submit.addEventListener('click', () => {
            this._submit();
        });

        this.__input.addEventListener('keypress', (event_ : KeyboardEvent) => {
            if (event_.key === 'Enter') {
                this._submit();
            }
        });
    }
}

class Signup {
    private __name     = q<HTMLInputElement>('.signup__name');
    private __username = q<HTMLInputElement>('.signup__username');
    private __mail     = q<HTMLInputElement>('.signup__mail');
    private __password = q<HTMLInputElement>('.signup__password');
    private __repeat   = q<HTMLInputElement>('.signup__repeat');
    private __proceed  = q<HTMLDivElement>('.signup__step_1 .button');
    private __finish   = q<HTMLDivElement>('.signup__step_2 .button');
    private __step2    = q<HTMLDivElement>('.signup__step_2');
    private _messages  = {
        badInput     : new Message('.signup__message_bad-input     .message'),
        weakPassword : new Message('.signup__message_weak-password .message'),
        notMatch     : new Message('.signup__message_not-match     .message'),
        notice       : new Message('.signup__message_notice        .message')
    };

    private async _validate (step_ = 1) : Promise<boolean> {
        if (step_ === 1) {
            const valid_ = this.__name.value !== '' && this.__mail.validity.valid && /^[a-z\d\-_.]+/i.test(this.__username.value);

            if (valid_) {
                await this._messages.badInput.hide();
            } else {
                await this._messages.badInput.show();
            }

            return valid_;
        } else {
            let valid1_ = this.__password.value.length >= 8;

            if (valid1_) {
                this._messages.weakPassword.hide();
            } else {
                this._messages.weakPassword.show();
            }

            let valid2_ = this.__password.value === this.__repeat.value;

            if (valid2_) {
                this._messages.notMatch.hide();
            } else {
                this._messages.notMatch.show();
            }

            return valid1_ && valid2_;
        }
    }

    constructor () {
        this.__proceed.addEventListener('click', async () => {
            const valid_ = await this._validate(1);

            if (valid_) {
                this.__step2.classList.remove('hidden');
                await this._messages.notice.show();
                this.__password.focus();
            }
        });

        this.__finish.addEventListener('click', async () => {
            const valid_ = await this._validate(2);

            // TODO: Send request.
        });
    }
}

async function main () {
    new Restore();
    new Signup();
}

document.addEventListener('DOMContentLoaded', main);

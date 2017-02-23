import { AuthError } from '../schemas/auth';



import user = require('../mongo/user');



import { encrypt } from './encrypt';
import { getUser } from '../mongo/user';
import { compare } from './compare';



const re = {
    password : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    username : /^[A-Za-z][A-Z-a-z0-9\-._]{0,29}$/,
    name     : /^\S.*/,
    email    : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
};



export async function update (username_ : string, email_ : string, name_ : string, password_ : string, old_ : string, req_ : any) : Promise<AuthError> {
    let error_ : AuthError;

    const check = {
        password : re.password.test(password_),
        name     : re.name.test(name_),
        username : re.username.test(username_),
        email    : re.email.test(email_)
    };

    let user_ = await getUser.byId(req_.session.u);

    if (!check.name) {
        error_ = AuthError.InvalidName
    } else if (!check.username) {
        error_ = AuthError.InvalidUsername;
    } else if (!check.email) {
        error_ = AuthError.InvalidMail;
    } else {
        if (username_ !== user_.username) {
            let byName_  = await user.getUser.byName(username_);

            if (byName_) {
                return AuthError.InvalidUsername;
            } else {
                user_.username = username_;
                error_ = AuthError.Success;
            }
        }

        if (email_ !== user_.email) {
            let byEmail_ = await user.getUser.byEmail(email_);

            if (byEmail_) {
                return AuthError.InvalidMail;
            } else {
                user_.email = email_;
                error_ = AuthError.Success;
            }
        }

        if (name_ !== user_.name) {
            user_.name = name_;
            error_= AuthError.Success;
        }

        if (password_ !== '') {
            const check_ = await compare(user_, old_);

            if (!check_) {
                return AuthError.InvalidLoginOrPassword;
            } else {
                user_.password = await encrypt(password_);
                error_ = AuthError.Success;
            }
        }

        user.setUser(user_);
    }

    return error_;
}

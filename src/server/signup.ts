import { AuthError } from '../schemas/auth';



import user = require('../mongo/user');



import { User } from '../schemas/user';



import { encrypt } from './encrypt';



const re = {
    password : /.{6,}/,
    username : /^[A-Z-a-z0-9\-._]+$/,
    name     : /^\S.*/,
    email    : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
};



export async function signup (username_ : string, email_ : string, name_ : string, password_ : string, req_ : any) : Promise<AuthError> {
    let error_ : AuthError;

    const check = {
        password : re.password.test(password_),
        name     : re.name.test(name_),
        username : re.username.test(username_),
        email    : re.email.test(email_)
    };

    let user_ : User;

    if (!check.password) {
        error_ = AuthError.WeakPassword;
    } else if (!check.name) {
        error_ = AuthError.InvalidName
    } else if (!check.username) {
        error_ = AuthError.InvalidUsername;
    } else if (!check.email) {
        error_ = AuthError.InvalidMail;
    } else {
        let byName_  = await user.getUser.byName(username_);
        let byEmail_ = await user.getUser.byEmail(email_);

        if (byName_ != null) {
            error_ = AuthError.InvalidUsername;
        } else if (byEmail_ != null) {
            error_ = AuthError.InvalidMail;
        } else {
            user_ = {
                id       : await user.createUser(),
                password : await encrypt(password_),
                email    : email_,
                name     : name_,
                username : username_,
                capsules : [],
                tokens   : {}
            };

            await user.setUser(user_);

            req_.session.u = user_.id;

            error_ = AuthError.Success;
        }
    }

    return error_;
}

import { AuthError } from '../schemas/auth';



import user = require('../mongo/user');



import { compare } from './compare';



export async function login (login_ : string, password_ : string, req_ : any) : Promise<AuthError> {
    let error_ : AuthError;

    let byName_  = await user.getUser.byName(login_);
    let byEmail_ = await user.getUser.byEmail(login_);

    let user_ = byName_ || byEmail_;

    if (!user_) {
        error_ = AuthError.InvalidLoginOrPassword
    } else {
        const check_ = await compare(user_, password_);

        if (check_) {
            req_.session.u = user_.id;
            error_         = AuthError.Success;
        } else {
            error_ = AuthError.InvalidLoginOrPassword;
        }
    }

    return error_;
}



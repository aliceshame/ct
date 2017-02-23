import { AuthError } from '../schemas/auth';

import crypto = require('crypto');

import user = require('../mongo/user');

import { encrypt } from './encrypt';
import { send } from './send';

import { init } from '../l10n';
import { detectLanguage } from '../util/detect-language';
import { tl } from '../data/config';
import { setUser } from '../mongo/user';

export async function random () : Promise<string> {
    return await new Promise<string>((resolve, reject) => {
        crypto.randomBytes(9, (error_ : any, buffer_ : Buffer) => {
            if (error_) {
                reject(error_);
            } else {
                resolve(buffer_.toString('base64'));
            }
        });
    });
}

export async function restore (login_ : string, req_ : any) : Promise<AuthError> {
    let byName_  = await user.getUser.byName(login_);
    let byEmail_ = await user.getUser.byEmail(login_);

    let user_ = byName_ || byEmail_;

    if (!user_) {
        return AuthError.UserNotFound
    }

    const plain_ = await random();

    user_.password = await encrypt(plain_);

    setUser(user_);

    const tl_ = init(detectLanguage(req_));

    try {
        await send(user_.email, '', tl('Password recovery'), `${tl_('Your new password: ')}${plain_}`, 'noreply');
        return AuthError.Success;
    } catch (_) {
        return AuthError.UnknownError;
    }
}



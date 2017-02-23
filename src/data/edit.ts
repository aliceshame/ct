import * as capsulePatterns from '../patterns/capsule';
import * as view from './view';
import { Friend } from '../schemas/friend';
import { User } from '../schemas/user';

export async function get (user_ : User, id_ : string, req_ : any) {
    const view_ = await view.get(user_, id_, req_);

    const patterns_ = {
        capsule : capsulePatterns
    };

    const friends_ : Friend[] = [];

    return {
        capsule  : user_.capsules.find(_ => _.id.toString() === id_),
        icon     : view_.icon,
        meta     : view_.meta,
        tl       : view_.tl,
        user     : user_,
        friends  : friends_,
        patterns : patterns_
    }
}

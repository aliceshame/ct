import { Meta } from '../schemas/meta';
import * as config from './config';
import { User } from '../schemas/user';
import { icon } from '../util/icon';
import { init } from '../l10n';
import { detectLanguage } from '../util/detect-language';

export async function get (user_ : User, req_ : any) {
    const tl_ = init(detectLanguage(req_));

    const meta_ : Meta = {
        title       : `${tl_('Profile')} — ${config.title}`,
        menu        : [
            {
                url  : '/library',
                text : tl_('Capsules'),
                icon : 'th-large'
            },
            {
                url  : '/profile',
                text : tl_('Profile'),
                icon : 'user'
            },
            {
                url  : '/logout',
                text : tl_('Log out'),
                icon : 'sign-out'
            }
        ],
        fixedDrawer : false
    };

    return {
        icon   : icon,
        meta   : meta_,
        tl     : tl_,
        user   : user_,
        fields : {
            signup : {
                userName : (/^[A-Z-a-z0-9\-._]+$/).source,
                realName : (/^\S.*/).source,
                email    : (/.+/).source,
                password : (/.{6,}/).source
            }
        }
    }
}

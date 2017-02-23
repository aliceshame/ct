import * as config from './config';
import { User } from '../schemas/user';
import { init as l10n } from '../l10n';
import { detectLanguage } from '../util/detect-language';

export async function get (user_ : User, req_ : any) {
    const tl_ = l10n(detectLanguage(req_));

    return {
        meta     : {
            title       : `${tl_('My capsules')} — ${config.title}`,
            menu        : [
                // {
                //     url  : '/create',
                //     text : tl_('Create'),
                //     icon : 'plus'
                // },
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
                // {
                //     url  : '/language',
                //     text : tl_('Language'),
                //     icon : 'globe'
                // },
                {
                    url  : '/logout',
                    text : tl_('Log out'),
                    icon : 'sign-out'
                }
            ],
            fixedDrawer : false
        },
        tl       : tl_,
        user     : user_,
        capsules : user_.capsules
    }
}

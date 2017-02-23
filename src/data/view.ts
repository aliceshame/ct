import { PartIcon, PartType } from '../schemas/part';
import { Meta } from '../schemas/meta';
import * as config from './config';
import moment = require('moment');
import Moment = moment.Moment;
import { ReceiverService } from '../schemas/receiver';
import { User } from '../schemas/user';
import { icon } from '../util/icon';
import { init } from '../l10n';
import { detectLanguage } from '../util/detect-language';

export async function get (user_ : User, id_ : string, req_ : any) {
    const tl_ = init(detectLanguage(req_));

    const capsule_ = user_.capsules.find(_ => _.id.toString() === id_);

    const meta_ : Meta = {
        title           : `${capsule_.title} — ${config.title}`,
        menu            : [
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
        fixedDrawer     : false,
        PartType        : PartType,
        PartIcon        : PartIcon,
        ReceiverService : ReceiverService
    };

    return {
        capsule : capsule_,
        icon    : icon,
        meta    : meta_,
        tl      : tl_,
        user    : user_
    }
}

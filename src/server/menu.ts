import { MenuItem } from '../schemas/menu-item';

import { init as l10n } from '../l10n';
import { detectLanguage } from '../util/detect-language';


export function menu (req_ : any, private_ : boolean) : MenuItem[] {
    const tl_ = l10n(detectLanguage(req_));

    if (private_) {
        return [
            {
                url  : '/create',
                text : tl_('Create'),
                icon : 'plus'
            },
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
                url  : '/news',
                text : tl_('News'),
                icon : 'rss'
            },
            {
                url  : '/language',
                text : tl_('Language'),
                icon : 'globe'
            },
            {
                url  : '/logout',
                text : tl_('Log out'),
                icon : 'sign-out'
            }
        ];
    } else {
        return [
            {
                url  : '/news',
                text : tl_('News'),
                icon : 'rss'
            },
            {
                url  : '/language',
                text : tl_('Language'),
                icon : 'globe'
            }
        ];
    }
}

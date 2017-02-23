"use strict";
const l10n_1 = require('../l10n');
const detect_language_1 = require('../util/detect-language');
function menu(req_, private_) {
    const tl_ = l10n_1.init(detect_language_1.detectLanguage(req_));
    if (private_) {
        return [
            {
                url: '/create',
                text: tl_('Create'),
                icon: 'plus'
            },
            {
                url: '/library',
                text: tl_('Capsules'),
                icon: 'th-large'
            },
            {
                url: '/profile',
                text: tl_('Profile'),
                icon: 'user'
            },
            {
                url: '/news',
                text: tl_('News'),
                icon: 'rss'
            },
            {
                url: '/language',
                text: tl_('Language'),
                icon: 'globe'
            },
            {
                url: '/logout',
                text: tl_('Log out'),
                icon: 'sign-out'
            }
        ];
    }
    else {
        return [
            {
                url: '/news',
                text: tl_('News'),
                icon: 'rss'
            },
            {
                url: '/language',
                text: tl_('Language'),
                icon: 'globe'
            }
        ];
    }
}
exports.menu = menu;
//# sourceMappingURL=menu.js.map
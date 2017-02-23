"use strict";
const config = require('./config');
const l10n_1 = require('../l10n');
const detect_language_1 = require('../util/detect-language');
function get(req_) {
    const tl_ = l10n_1.init(detect_language_1.detectLanguage(req_));
    return {
        tl: tl_,
        meta: {
            title: config.title,
            menu: [
                {
                    text: tl_('Language'),
                    icon: 'globe',
                    id: 'lang'
                }
            ],
            fixedDrawer: false,
            index: true
        },
        fields: {
            signup: {
                userName: (/^[A-Z-a-z0-9\-._]+$/).source,
                realName: (/^\S.*/).source,
                email: (/.+/).source,
                password: (/.{6,}/).source
            }
        }
    };
}
exports.get = get;
//# sourceMappingURL=index.js.map
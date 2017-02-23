"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const part_1 = require('../schemas/part');
const config = require('./config');
const receiver_1 = require('../schemas/receiver');
const icon_1 = require('../util/icon');
const l10n_1 = require('../l10n');
const detect_language_1 = require('../util/detect-language');
function get(user_, id_, req_) {
    return __awaiter(this, void 0, void 0, function* () {
        const tl_ = l10n_1.init(detect_language_1.detectLanguage(req_));
        const capsule_ = user_.capsules.find(_ => _.id.toString() === id_);
        const meta_ = {
            title: `${capsule_.title} — ${config.title}`,
            menu: [
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
                    url: '/logout',
                    text: tl_('Log out'),
                    icon: 'sign-out'
                }
            ],
            fixedDrawer: false,
            PartType: part_1.PartType,
            PartIcon: part_1.PartIcon,
            ReceiverService: receiver_1.ReceiverService
        };
        return {
            capsule: capsule_,
            icon: icon_1.icon,
            meta: meta_,
            tl: tl_,
            user: user_
        };
    });
}
exports.get = get;
//# sourceMappingURL=view.js.map
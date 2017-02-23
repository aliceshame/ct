import * as config from './config';
import { init } from '../l10n';
import { detectLanguage } from '../util/detect-language';

export function get (req_ : any) {
    const tl_ = init(detectLanguage(req_));

    return {
        tl     : tl_,
        meta   : {
            title       : config.title,
            menu        : [
                // {
                //     url  : '/news',
                //     text : tl_('News'),
                //     icon : 'rss'
                // },
                {
                    text : tl_('Language'),
                    icon : 'globe',
                    id   : 'lang'
                }
            ],
            fixedDrawer : false,
            index       : true
        },
        fields : {
            signup : {
                userName : (/^[A-Z-a-z0-9\-._]+$/).source,
                realName : (/^\S.*/).source,
                email    : (/.+/).source,
                password : (/.{6,}/).source
            }
        }
    };
}

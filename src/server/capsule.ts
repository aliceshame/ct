import fs = require('fs');
import crypto = require('crypto');


import moment = require('moment');


import { Capsule } from '../schemas/capsule';
import { PartType } from '../schemas/part';


import { detectLanguage } from '../util/detect-language'
import { init as l10n } from '../l10n';


import { oid } from '../server/oid';


import * as unicode from '../util/unicode';
import { User } from '../schemas/user';
import { setUser } from '../mongo/user';


export async function createCapsule (req_ : any) : Promise<Capsule> {
    const tl_ = l10n(detectLanguage(req_));

    const text_ = tl_(`<p>Capsule text.</p>`);

    const capsule_ : Capsule = {
        id        : await oid(),
        title     : '',
        date      : moment().add(1, 'year'),
        created   : moment(),
        sealed    : false,
        unsealed  : false,
        cost      : 0,
        size      : 0,
        parts     : [
            {
                type    : PartType.Text,
                id      : await oid(),
                content : text_,
                size    : unicode.b64EncodeUnicode(text_).length
            }
        ],
        receivers : [],
        sent      : false
    };

    capsule_.size = capsule_.parts.reduce((sum_, part_) => sum_ + part_.size, 0);

    return capsule_;
}

async function writeFile (name_ : string, data_ : Buffer) {
    return await new Promise((resolve, reject) => {
        fs.writeFile(name_, data_, (error_) => {
            if (error_) {
                reject(error_);
            } else {
                resolve();
            }
        });
    });
}

async function md5 (data_ : Buffer) : Promise<string> {
    return await new Promise<string>((resolve) => {
        const hash_ = crypto.createHash('md5');
        hash_.update(data_);
        resolve(hash_.digest('hex'));
    });
}

export async function saveCapsule (body_ : any, user_ : User) {
    const index_ = user_.capsules.findIndex(_ => _.id.toString() === body_.id);

    body_.date = moment(body_.date);

    body_.created = user_.capsules[ index_ ].created;
    body_.sent = false;

    await Promise.all(body_.parts.map(async (_ : any) => {
        if (((_.type === PartType.Attachment) || (_.type === PartType.Image)) && (_.changed)) {
            const data_ = Buffer.from(_.file, 'base64');
            const name_ = await md5(data_);
            _.hash      = name_;
            await writeFile(`uploads/${name_}`, data_);
            delete _.file;
        }
    }));

    body_.receivers = body_.receivers.map((_ : any) => {
        _.sent = false;
        return _;
    });

    user_.capsules.splice(index_, 1, body_);
    user_.remaining = true;

    setUser(user_);
}

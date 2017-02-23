import express = require('express');


import Request  = express.Request;
import Response = express.Response;

import { rights } from '../src/server/check-rights';
import * as locals from '../src';

import { getUser } from '../src/mongo/user';
import { createPayment, savePayment } from '../src/mongo/payment';

const router = express.Router();

router.get('/:user/:capsule', async (req_ : Request, res_ : Response) => {
    try {
        const user_     = await getUser.byName(req_.params[ 'user' ]);
        const loggedIn_ = await getUser.byId((req_ as any).session.u);
        const rights_   = await rights(req_ as any, req_.params[ 'capsule' ], user_, loggedIn_);

        if (rights_.write) {
            const capsule_ = user_.capsules.find(_ => _.id.toString() === req_.params[ 'capsule' ]);
            const pay_     = await createPayment(user_, capsule_);

            const expired_ = capsule_.date.valueOf() <= (new Date().valueOf() + 1000 * 3600 * 12);

            const data_ = await locals.edit.get(user_, req_.params[ 'capsule' ], req_);

            const locals_ = {
                capsule : data_,
                pay     : pay_,
                tl      : data_.tl,
                meta    : data_.meta,
                expired : expired_
            };

            await savePayment(pay_);

            // capsule_.sealed = true;
            // await setUser(user_);

            res_.render('pay', locals_);
        } else {
            res_.redirect('/');
        }
    } catch (_) {
        // console.log(_);
        res_.redirect('/');
    }
});

export = router;

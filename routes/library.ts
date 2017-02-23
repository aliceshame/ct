import express = require('express');


import Request  = express.Request;
import Response = express.Response;

import { rights } from '../src/server/check-rights';
import * as locals from '../src';

import { getUser } from '../src/mongo/user';

const router = express.Router();

router.get('/', async (req_ : Request, res_ : Response) => {
    if (!(await rights(req_ as any)).write) {
        res_.redirect('/');
    } else {
        try {
            const user_ = await getUser.byId((req_ as any).session.u);
            res_.render('library', await locals.library.get(user_, req_));
        } catch (_) {
            res_.redirect('/');
        }
    }
});

export = router;

import express = require('express');


import Request  = express.Request;
import Response = express.Response;

import { rights } from '../src/server/check-rights';
import * as locals from '../src';

const router = express.Router();

router.get('/', async (req_ : Request, res_ : Response) => {
    if ((await rights(req_ as any)).write) {
        res_.redirect('/library');
    } else {
        res_.render('index', locals.index.get(req_));
    }
});

export = router;

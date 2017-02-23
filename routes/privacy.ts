import express = require('express');


import Request  = express.Request;
import Response = express.Response;

import * as locals from '../src';

const router = express.Router();

router.get('/', async (req_ : Request, res_ : Response) => {
    res_.render('privacy', locals.index.get(req_));
});

export = router;

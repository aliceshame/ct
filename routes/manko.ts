import express = require('express');


import Request  = express.Request;
import Response = express.Response;

import { handleResponse } from '../src/mongo/payment';

const router = express.Router();

router.get('/', async (req_ : Request, res_ : Response) => {
    handleResponse(req_, res_, true);
});

export = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require('express');
const check_rights_1 = require('../src/server/check-rights');
const locals = require('../src');
const router = express.Router();
router.get('/', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    if ((yield check_rights_1.rights(req_)).write) {
        res_.redirect('/library');
    }
    else {
        res_.render('index', locals.index.get(req_));
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map
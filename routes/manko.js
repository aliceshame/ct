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
const payment_1 = require('../src/mongo/payment');
const router = express.Router();
router.get('/', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    payment_1.handleResponse(req_, res_, true);
}));
module.exports = router;
//# sourceMappingURL=manko.js.map
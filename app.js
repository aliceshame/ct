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
const cookie = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const less = require('less-middleware');
const check_rights_1 = require('./src/server/check-rights');
const autenticate_1 = require('./src/server/autenticate');
const parse_body_1 = require('./src/server/parse-body');
const user_1 = require('./src/mongo/user');
const capsule_1 = require('./src/server/capsule');
const locals = require('./src');
const config = require('./src/data/config');
const index = require('./routes/index');
const license = require('./routes/license');
const privacy = require('./routes/privacy');
const library = require('./routes/library');
const pay = require('./routes/pay');
const tinpo = require('./routes/tinpo');
const manko = require('./routes/manko');
mongoose.Promise = Promise;
mongoose.connect('mongodb://huyapsula:GregoryProofNineDead@127.0.0.1:27017/capsules');
const app = express();
app.use(compression());
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(helmet());
app.use(session(config.session()));
app.use(cookie(config.secret));
app.set('view engine', 'pug');
app.use(express.static('static'));
app.use(less('static'));
app.use('/', index);
app.use('/static/license', license);
app.use('/static/privacy', privacy);
app.use('/static/contacts', privacy);
app.use('/library', library);
app.use('/pay', pay);
app.use('/tinpo', tinpo);
app.use('/manko', manko);
app.get('/language', (req_, res_) => {
    res_.render('language', locals.index.get(req_));
});
app.get('/language/:lang', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    res_.cookie('l', req_.params['lang']);
    if (req_.session.u) {
        const user_ = yield user_1.getUser.byId(req_.session.u);
        if (user_) {
            user_.lang = req_.params['lang'];
            yield user_1.setUser(user_);
        }
    }
    res_.redirect('/');
}));
app.get('/profile', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    if (!(yield check_rights_1.rights(req_)).write) {
        res_.redirect('/');
    }
    else {
        try {
            const user_ = yield user_1.getUser.byId(req_.session.u);
            let data_ = yield locals.profile.get(user_, req_);
            res_.render('profile', data_);
        }
        catch (_) {
            res_.redirect('/');
        }
    }
}));
app.get('/view/:user/:capsule', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user_ = yield user_1.getUser.byName(req_.params['user']);
        const loggedIn_ = yield user_1.getUser.byId(req_.session.u);
        const rights_ = yield check_rights_1.rights(req_, req_.params['capsule'], user_, loggedIn_);
        if (rights_.read) {
            const locals_ = yield locals.view.get(user_, req_.params['capsule'], req_);
            if (rights_.write) {
                locals_.capsule.owned = true;
            }
            res_.render('view', locals_);
        }
        else {
            res_.redirect('/');
        }
    }
    catch (_) {
        res_.redirect('/');
    }
}));
app.get('/edit/:user/:capsule', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user_ = yield user_1.getUser.byName(req_.params['user']);
        const loggedIn_ = yield user_1.getUser.byId(req_.session.u);
        const rights_ = yield check_rights_1.rights(req_, req_.params['capsule'], user_, loggedIn_);
        if (rights_.write) {
            const locals_ = yield locals.edit.get(user_, req_.params['capsule'], req_);
            res_.render('edit', locals_);
        }
        else {
            res_.redirect('/');
        }
    }
    catch (_) {
        res_.redirect('/');
    }
}));
app.get('/delete/:user/:capsule', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user_ = yield user_1.getUser.byName(req_.params['user']);
        const loggedIn_ = yield user_1.getUser.byId(req_.session.u);
        const rights_ = yield check_rights_1.rights(req_, req_.params['capsule'], user_, loggedIn_);
        if (rights_.write) {
            loggedIn_.capsules.splice(loggedIn_.capsules.findIndex(_ => _.id.toString() === req_.params['capsule']), 1);
            user_1.setUser(loggedIn_);
            res_.redirect('/');
        }
        else {
            res_.redirect('/');
        }
    }
    catch (_) {
        res_.redirect('/');
    }
}));
app.get('/image/:user/:capsule/:hash', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user_ = yield user_1.getUser.byName(req_.params['user']);
        const loggedIn_ = yield user_1.getUser.byId(req_.session.u);
        const rights_ = yield check_rights_1.rights(req_, req_.params['capsule'], user_, loggedIn_);
        if (rights_.read) {
            res_.sendFile(`${config.root}/uploads/${req_.params['hash']}`);
        }
        else {
            res_.redirect('/');
        }
    }
    catch (_) {
        res_.redirect('/');
    }
}));
app.post('/save', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    try {
        const body_ = yield parse_body_1.body(req_);
        const user_ = yield user_1.getUser.byId(req_.session.u);
        const rights_ = yield check_rights_1.rights(req_, body_.id, user_, user_);
        if (rights_.write) {
            yield capsule_1.saveCapsule(body_, user_);
            res_.end();
        }
        else {
            res_.redirect('/');
        }
        res_.end();
    }
    catch (_) {
        res_.redirect('/');
    }
}));
app.post('/auth', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    try {
        res_.json(yield autenticate_1.authenticate(yield parse_body_1.body(req_), req_));
    }
    catch (_) {
        res_.status(500).end();
    }
}));
app.get('/logout', (req_, res_) => {
    delete req_.session.u;
    res_.redirect('/');
});
app.get('/create', (req_, res_) => __awaiter(this, void 0, void 0, function* () {
    if (!(yield check_rights_1.rights(req_)).write) {
        res_.redirect('/');
    }
    else {
        try {
            const user_ = yield user_1.getUser.byId(req_.session.u);
            const capsule_ = yield capsule_1.createCapsule(req_);
            user_.capsules.push(capsule_);
            yield user_1.setUser(user_);
            res_.redirect(`/edit/${user_.username}/${capsule_.id}`);
        }
        catch (_) {
            res_.redirect('/');
        }
    }
}));
process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
    process.exit(0);
}));
app.listen(8080, () => __awaiter(this, void 0, void 0, function* () {
    console.log('Server started at http://localhost/');
}));
//# sourceMappingURL=app.js.map
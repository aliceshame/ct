import express     = require('express');
import cookie      = require('cookie-parser');
import session     = require('express-session');
import helmet      = require('helmet');
// import redis    = require('connect-redis');
import morgan      = require('morgan');
import mongoose    = require('mongoose');
import moment      = require('moment');
import compression = require('compression');
import less        = require('less-middleware');


import Request  = express.Request;
import Response = express.Response;


import { AuthRequest } from './src/schemas/auth';


import { rights } from './src/server/check-rights';
import { authenticate } from './src/server/autenticate';
import { body } from './src/server/parse-body';
import { getUser, setUser } from './src/mongo/user';
import { createCapsule, saveCapsule } from './src/server/capsule';


import * as locals from './src';
import * as config from './src/data/config';

import https = require('https');
import fs = require('fs');

import index    = require('./routes/index');
import license  = require('./routes/license');
import privacy  = require('./routes/privacy');
import contacts = require('./routes/contacts');
import library  = require('./routes/library');
import pay      = require('./routes/pay');
import tinpo    = require('./routes/tinpo');
import manko    = require('./routes/manko');


// const RedisStore = redis(session);


(mongoose as any).Promise = Promise;
mongoose.connect('mongodb://huyapsula:GregoryProofNineDead@127.0.0.1:27017/capsules');


const app = express();

app.use(compression());
app.use(morgan('dev'));


app.disable('x-powered-by');
app.use(helmet());
// TODO: Configure Helmet.


app.use(session(config.session()));


app.use(cookie(config.secret));


app.set('view engine', 'pug');


app.use(express.static('static'));
app.use(less('static'));


app.use('/',                index);
app.use('/static/license',  license);
app.use('/static/privacy',  privacy);
app.use('/static/contacts', privacy);
app.use('/library',         library);
app.use('/pay',             pay);
app.use('/tinpo',           tinpo);
app.use('/manko',           manko);


app.get('/language', (req_ : Request, res_ : Response) => {
    res_.render('language', locals.index.get(req_));
});


app.get('/language/:lang', async (req_ : Request, res_ : Response) => {
    (res_ as any).cookie('l', req_.params[ 'lang' ]);
    if ((req_ as any).session.u) {
        const user_ = await getUser.byId((req_ as any).session.u);
        if (user_) {
            user_.lang = req_.params[ 'lang' ];
            await setUser(user_);
        }
    }
    res_.redirect('/');
});


app.get('/profile', async (req_ : Request, res_ : Response) => {
    if (!(await rights(req_ as any)).write) {
        res_.redirect('/');
    } else {
        try {
            const user_ = await getUser.byId((req_ as any).session.u);
            let data_   = await locals.profile.get(user_, req_);
            // console.log(data_);
            res_.render('profile', data_);
        } catch (_) {
            res_.redirect('/');
        }
    }
});


app.get('/view/:user/:capsule', async (req_ : Request, res_ : Response) => {
    try {
        const user_     = await getUser.byName(req_.params[ 'user' ]);
        const loggedIn_ = await getUser.byId((req_ as any).session.u);
        const rights_   = await rights(req_ as any, req_.params[ 'capsule' ], user_, loggedIn_);

        if (rights_.read) {
            const locals_ = await locals.view.get(user_, req_.params[ 'capsule' ], req_);

            if (rights_.write) {
                (locals_.capsule as any).owned = true;
            }

            res_.render('view', locals_);
        } else {
            res_.redirect('/');
        }
    } catch (_) {
        res_.redirect('/');
    }
});


app.get('/edit/:user/:capsule', async (req_ : Request, res_ : Response) => {
    try {
        const user_     = await getUser.byName(req_.params[ 'user' ]);
        const loggedIn_ = await getUser.byId((req_ as any).session.u);
        const rights_   = await rights(req_ as any, req_.params[ 'capsule' ], user_, loggedIn_);

        if (rights_.write) {
            const locals_ = await locals.edit.get(user_, req_.params[ 'capsule' ], req_);
            res_.render('edit', locals_);
        } else {
            res_.redirect('/');
        }
    } catch (_) {
        res_.redirect('/');
    }
});


app.get('/delete/:user/:capsule', async (req_ : Request, res_ : Response) => {
    try {
        const user_     = await getUser.byName(req_.params[ 'user' ]);
        const loggedIn_ = await getUser.byId((req_ as any).session.u);
        const rights_   = await rights(req_ as any, req_.params[ 'capsule' ], user_, loggedIn_);

        if (rights_.write) {
            loggedIn_.capsules.splice(loggedIn_.capsules.findIndex(_ => _.id.toString() === req_.params[ 'capsule' ]), 1);
            setUser(loggedIn_);
            res_.redirect('/');
        } else {
            res_.redirect('/');
        }
    } catch (_) {
        res_.redirect('/');
    }
});


app.get('/image/:user/:capsule/:hash', async (req_ : Request, res_ : Response) => {
    try {

        const user_     = await getUser.byName(req_.params[ 'user' ]);
        const loggedIn_ = await getUser.byId((req_ as any).session.u);
        const rights_   = await rights(req_ as any, req_.params[ 'capsule' ], user_, loggedIn_);

        if (rights_.read) {
            res_.sendFile(`${config.root}/uploads/${req_.params[ 'hash' ]}`);
        } else {
            res_.redirect('/');
        }
    } catch (_) {
        res_.redirect('/');
    }
});


app.post('/save', async (req_ : Request, res_ : Response) => {
    try {
        const body_ = await body<any>(req_);

        const user_   = await getUser.byId((req_ as any).session.u);
        const rights_ = await rights(req_ as any, body_.id, user_, user_);

        if (rights_.write) {
            await saveCapsule(body_, user_);
            res_.end();
        } else {
            res_.redirect('/');
        }

        res_.end();
    } catch (_) {
        res_.redirect('/');
    }
});


app.post('/auth', async (req_ : Request, res_ : Response) => {
    try {
        res_.json(await authenticate(await body<AuthRequest>(req_), req_));
    } catch (_) {
        res_.status(500).end();
    }
});


app.get('/logout', (req_ : Request, res_ : Response) => {
    delete (req_ as any).session.u;
    res_.redirect('/');
});


app.get('/create', async (req_ : Request, res_ : Response) => {
    if (!(await rights(req_ as any)).write) {
        res_.redirect('/');
    } else {
        try {
            const user_    = await getUser.byId((req_ as any).session.u);
            const capsule_ = await createCapsule(req_);
            user_.capsules.push(capsule_);
            await setUser(user_);
            res_.redirect(`/edit/${user_.username}/${capsule_.id}`);
        } catch (_) {
            res_.redirect('/');
        }
    }
});


process.on('SIGINT', async () => {
    process.exit(0);
});


// https.createServer({
//     key                : fs.readFileSync('mongodb.key'),
//     cert               : fs.readFileSync('mongodb.crt'),
//     ca                 : fs.readFileSync('/etc/ssh/KlipperSubsCA.pem'),
//     requestCert        : true,
//     rejectUnauthorized : false
// }, app).listen('443', function () {
//     console.log('Server started at https://localhost/');
// });


app.listen(8080, async () => {
    console.log('Server started at http://localhost/');
});



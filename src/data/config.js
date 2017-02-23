"use strict";
const l10n = require('../l10n');
exports.tl = l10n.init('en');
exports.title = 'CapsulaTime';
exports.root = process.cwd();
exports.secret = 'Sed dictum. Class ad per, per1.';
exports.walletOneSecret = '74434948695d4d4b62516e7a477b606f7476757965604936303860';
exports.walletOneId = '120958794124';
function session() {
    return {
        secret: exports.secret,
        name: 'sid-huid',
        resave: false,
        saveUninitialized: true
    };
}
exports.session = session;
//# sourceMappingURL=config.js.map
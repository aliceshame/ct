import * as l10n from '../l10n';

export const tl    = l10n.init('en');
export const title = 'CapsulaTime';
export const root  = process.cwd();

export const secret = 'Sed dictum. Class ad per, per1.';

export const walletOneSecret = '74434948695d4d4b62516e7a477b606f7476757965604936303860';
export const walletOneId     = '120958794124';

export function session () {
    return {
        secret            : secret,
        name              : 'sid-huid',
        resave            : false,
        saveUninitialized : true
    };
}

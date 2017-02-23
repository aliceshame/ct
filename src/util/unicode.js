"use strict";
function btoa_(string_) {
    try {
        return btoa(string_);
    }
    catch (_) {
        return Buffer.from(string_).toString('base64');
    }
}
exports.btoa_ = btoa_;
function atob_(string_) {
    try {
        return atob(string_);
    }
    catch (_) {
        return Buffer.from(string_, 'base64').toString();
    }
}
exports.atob_ = atob_;
function b64EncodeUnicode(string_) {
    return btoa_(encodeURIComponent(string_)
        .replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(`0x${p1}`));
    }));
}
exports.b64EncodeUnicode = b64EncodeUnicode;
function b64DecodeUnicode(string_) {
    return decodeURIComponent(Array.prototype.map.call(atob_(string_), (character_) => {
        return '%' + ('00' + character_.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
exports.b64DecodeUnicode = b64DecodeUnicode;
//# sourceMappingURL=unicode.js.map
export function btoa_ (string_ : string) : string {
    try {
        return btoa(string_);
    } catch (_) {
        return Buffer.from(string_).toString('base64');
    }
}

export function atob_ (string_ : string) : string {
    try {
        return atob(string_);
    } catch (_) {
        return Buffer.from(string_, 'base64').toString();
    }
}

export function b64EncodeUnicode (string_ : string) : string {
    return btoa_(encodeURIComponent(string_)
                    .replace(/%([0-9A-F]{2})/g, (match, p1) : string => {
                        return String.fromCharCode(parseInt(`0x${p1}`));
                    }));
}

export function b64DecodeUnicode (string_ : string) : string {
    return decodeURIComponent(Array.prototype.map.call(atob_(string_), (character_ : string) : string => {
        return '%' + ('00' + character_.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
export function detectLanguage (req_? : any) : string {
    try {
        return navigator.language.substring(0, 2);
    } catch (_) {
        if (req_.cookies && req_.cookies.l)
            return req_.cookies.l;
        if (req_.get('Accept-Language')) {
            return req_.get('Accept-Language').substring(0, 2);
        }
        return 'en';
    }
}

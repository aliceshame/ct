"use strict";
(function (AuthMethod) {
    AuthMethod[AuthMethod["Login"] = 0] = "Login";
    AuthMethod[AuthMethod["Signup"] = 1] = "Signup";
    AuthMethod[AuthMethod["Restore"] = 2] = "Restore";
    AuthMethod[AuthMethod["Update"] = 3] = "Update";
})(exports.AuthMethod || (exports.AuthMethod = {}));
var AuthMethod = exports.AuthMethod;
(function (AuthError) {
    AuthError[AuthError["Success"] = 0] = "Success";
    AuthError[AuthError["InvalidLoginOrPassword"] = 1] = "InvalidLoginOrPassword";
    AuthError[AuthError["WeakPassword"] = 2] = "WeakPassword";
    AuthError[AuthError["InvalidUsername"] = 3] = "InvalidUsername";
    AuthError[AuthError["InvalidMail"] = 4] = "InvalidMail";
    AuthError[AuthError["InvalidName"] = 5] = "InvalidName";
    AuthError[AuthError["InvalidCaptcha"] = 6] = "InvalidCaptcha";
    AuthError[AuthError["UserNotFound"] = 7] = "UserNotFound";
    AuthError[AuthError["UnknownError"] = 8] = "UnknownError";
})(exports.AuthError || (exports.AuthError = {}));
var AuthError = exports.AuthError;
//# sourceMappingURL=auth.js.map
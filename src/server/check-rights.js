"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function checkLibraryRights(req_) {
    if (req_.session.u) {
        return {
            read: true,
            write: true
        };
    }
    else {
        return {
            read: false,
            write: false
        };
    }
}
function checkUnsealed(capsule_) {
    if (capsule_.unsealed) {
        return {
            read: true,
            write: false
        };
    }
    else {
        return {
            read: false,
            write: false
        };
    }
}
function checkCapsuleRights(capsuleId_, user_, loggedIn_) {
    let capsule_ = user_.capsules.find(_ => _.id.toString() === capsuleId_);
    if (!capsule_) {
        return {
            read: false,
            write: false
        };
    }
    if (loggedIn_) {
        if (user_.id.toString() === loggedIn_.id.toString()) {
            if (capsule_.sealed) {
                return {
                    read: true,
                    write: false
                };
            }
            else {
                return {
                    read: true,
                    write: true
                };
            }
        }
        else {
            return checkUnsealed(capsule_);
        }
    }
    else {
        return checkUnsealed(capsule_);
    }
}
function rights(req_, capsuleId_, user_, loggedIn_) {
    return __awaiter(this, void 0, void 0, function* () {
        let rights_;
        if (!capsuleId_) {
            rights_ = checkLibraryRights(req_);
        }
        else {
            rights_ = checkCapsuleRights(capsuleId_, user_, loggedIn_);
        }
        return rights_;
    });
}
exports.rights = rights;
//# sourceMappingURL=check-rights.js.map
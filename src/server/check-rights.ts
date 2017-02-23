import express = require('express');


import Request = express.Request;


import { Rights } from '../schemas/rights';
import { User } from '../schemas/user';
import { Capsule } from '../schemas/capsule';


interface SessionRequest extends Request {
    session : any;
}


function checkLibraryRights (req_ : SessionRequest) : Rights {
    if (req_.session.u) {
        return {
            read  : true,
            write : true
        };
    } else {
        return {
            read  : false,
            write : false
        };
    }
}


function checkUnsealed (capsule_ : Capsule) : Rights {
    if (capsule_.unsealed) {
        return {
            read  : true,
            write : false
        };
    } else {
        return {
            read  : false,
            write : false
        };
    }
}


function checkCapsuleRights (capsuleId_ : string, user_ : User, loggedIn_? : User) : Rights {
    let capsule_ = user_.capsules.find(_ => _.id.toString() === capsuleId_);

    if (!capsule_) {
        return {
            read  : false,
            write : false
        }
    }

    if (loggedIn_) { // If there is logged in user.
        if (user_.id.toString() === loggedIn_.id.toString()) { // If logged in user is owner
            if (capsule_.sealed) {
                return {
                    read  : true,
                    write : false
                };
            } else {
                return {
                    read  : true,
                    write : true
                };
            }
        } else { // If logged in user isn't owner
            return checkUnsealed(capsule_);
        }
    } else {
        return checkUnsealed(capsule_);
    }
}


export async function rights (req_ : SessionRequest, capsuleId_? : string, user_? : User, loggedIn_? : User) : Promise<Rights> {
    let rights_ : Rights;

    if (!capsuleId_) {
        rights_ = checkLibraryRights(req_);
    } else {
        rights_ = checkCapsuleRights(capsuleId_, user_, loggedIn_);
    }

    // else {
    //     let capsule_ = user_.capsules.find(_ => _.id.toString() === capsuleId_);
    //
    //     if (owner_) {
    //         //
    //     } else {
    //         //
    //     }
    //
    //     if (capsule_) {
    //         if (capsule_.sealed) {
    //             rights_ = {
    //                 read  : true,
    //                 write : false
    //             };
    //         } else {
    //             rights_ = {
    //                 read  : true,
    //                 write : true
    //             };
    //         }
    //     } else {
    //         let capsule_ = owner_.capsules.find(_ => _.id.toString() === capsuleId_);
    //
    //         if (!capsule_) {
    //             rights_ = {
    //                 read  : false,
    //                 write : false
    //             };
    //         } else {
    //             if (capsule_.unsealed) {
    //                 rights_ = {
    //                     read  : true,
    //                     write : false
    //                 };
    //             } else {
    //                 rights_ = {
    //                     read  : true,
    //                     write : false
    //                 };
    //             }
    //         }
    //     }
    // }

    return rights_;
}

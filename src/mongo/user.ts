import mongoose = require('mongoose');
import moment = require('moment');


import Moment = moment.Moment;


import { User } from '../schemas/user';


import { random } from '../server/random';


const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const schema_ = {
    _id       : ObjectId,
    username  : String,
    email     : String,
    name      : String,
    password  : String,
    balance   : Number,
    tokens    : {
        telegram : String,
        twitter  : String,
        vk       : String,
        facebook : String,
        ok       : String
    },
    capsules  : [
        {
            _id       : ObjectId,
            title     : String,
            date      : Number,
            created   : Number,
            sealed    : Boolean,
            unsealed  : Boolean,
            cost      : Number,
            size      : Number,
            receivers : String,
            parts     : String,
            sent      : Boolean
        }
    ],
    remaining : Boolean,
    lang      : String
};


const userSchema       = new Schema(schema_);
export const UserModel = mongoose.model('UserModel', userSchema);


function documentToUser (document_ : any) : User {
    return {
        id        : document_._id,
        password  : document_.password,
        username  : document_.username,
        email     : document_.email,
        name      : document_.name,
        tokens    : document_.tokens,
        balance   : document_.balance,
        capsules  : document_.capsules.map((capsule_ : any) => {
            return {
                id        : capsule_._id,
                date      : moment(capsule_.date),
                created   : moment(capsule_.created),
                title     : capsule_.title,
                sealed    : capsule_.sealed,
                unsealed  : capsule_.unsealed,
                cost      : 50,
                size      : capsule_.size,
                receivers : JSON.parse(capsule_.receivers),
                parts     : JSON.parse(capsule_.parts)
            };
        }),
        remaining : document_.balance,
        lang      : document_.lang
    };
}


export const getUser = {
    byName  : async (name_ : string) : Promise<User> => {
        const document_ = await UserModel.findOne({ username : name_ }).exec();

        if (document_) {
            return documentToUser(document_);
        } else {
            return null;
        }
    },
    byEmail : async (email_ : string) : Promise<User> => {
        const document_ = await UserModel.findOne({ email : email_ }).exec();

        if (document_) {
            return documentToUser(document_);
        } else {
            return null;
        }
    },
    byId    : async (id_ : string) : Promise<User> => {
        const document_ = await UserModel.findById(id_).exec();

        if (document_) {
            return documentToUser(document_);
        } else {
            return null;
        }
    }
};

export async function setUser (user_ : User) : Promise<void> {
    const document_ = await UserModel.findById(user_.id).exec() as any;

    document_.username  = user_.username;
    document_.password  = user_.password;
    document_.name      = user_.name;
    document_.email     = user_.email;
    document_.tokens    = user_.tokens;
    document_.capsules  = user_.capsules.map((capsule_) => {
        return {
            _id       : capsule_.id,
            date      : capsule_.date.valueOf(),
            created   : capsule_.created.valueOf(),
            title     : capsule_.title,
            sealed    : capsule_.sealed,
            unsealed  : capsule_.unsealed,
            cost      : 50,
            size      : capsule_.size,
            receivers : JSON.stringify(capsule_.receivers),
            parts     : JSON.stringify(capsule_.parts),
            sent      : capsule_.sent
        };
    });
    document_.remaining = user_.remaining;
    document_.lang      = user_.lang;

    await document_.save();
}

export async function createUser () : Promise<string> {
    const id_ = await random();

    await (new UserModel({
        _id : mongoose.Types.ObjectId.createFromHexString(id_)
    })).save();

    return id_;
}

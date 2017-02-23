import mongoose = require('mongoose');



import { random } from '../server/random';



export async function oid () : Promise<mongoose.Types.ObjectId> {
    return mongoose.Types.ObjectId.createFromHexString(await random());
}



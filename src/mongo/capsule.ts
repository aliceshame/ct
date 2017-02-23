import moment = require('moment');



import { Capsule } from '../schemas/capsule';



import Moment = moment.Moment;



export async function get (capsuleId_ : string) : Promise<Capsule> {
    return await new Promise<Capsule>((resolve) => {
        const capsule_ : Capsule = {
            id        : capsuleId_,
            title     : 'Оленю Лёхе',
            date      : moment('2020-10-10'),
            sealed    : false,
            unsealed  : false,
            cost      : 200,
            size      : 0,
            parts     : [],
            receivers : []
        };

        resolve(capsule_);
    });
}

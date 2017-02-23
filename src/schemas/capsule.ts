import moment = require('moment');
import Moment = moment.Moment;

import { PartAny } from './part';
import { Receiver } from './receiver';

export interface Capsule {
    id : string | any;
    title : string;
    date : Moment;
    sealed : boolean;
    unsealed : boolean;
    cost : number;
    size : number;
    created? : Moment;
    parts : PartAny[];
    receivers : Receiver[];
    sent? : boolean;
}

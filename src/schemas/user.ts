import { Capsule } from './capsule';

export interface User {
    id : string;
    password : string;
    email : string;
    name : string;
    username : string;
    capsules : Capsule[];
    balance? : number;
    tokens : {
        telegram? : string,
        twitter? : string,
        vk? : string,
        facebook? : string,
        ok? : string
    },
    remaining? : boolean;
    lang? : string;
}

import moment = require('moment');
import Moment = moment.Moment;

import fs = require('fs');

import { formatBytes } from '../util/bytes';

import { ru } from './ru';
import { en } from './en';

const languages : { [ key : string ] : any } = { ru, en };

export interface Tl {
    (phrase_ : string) : string;
    currency : (value_ : number) => string;
    date : (date_ : Moment) => string;
    bytes : (value_ : number) => string
}

export function init (language_ : string) : Tl {
    const dictionary_ = languages[ language_ ];

    const tl_ = (phrase_ : string) : string => {
        const json_ = JSON.parse(fs.readFileSync('en.json').toString());

        if (!dictionary_[ phrase_ ]) {
            json_[ phrase_ ] = phrase_;
        }

        fs.writeFileSync('en.json', JSON.stringify(json_));

        return (dictionary_ && dictionary_[ phrase_ ]) || phrase_;
    };

    Object.defineProperty(tl_, 'date', {
        value : (date_ : Moment) : string => {
            return date_.locale(language_).format('l');
        }
    });

    Object.defineProperty(tl_, 'currency', {
        value : (value_ : number) : string => {
            return `${value_} RUB`;
        }
    });

    Object.defineProperty(tl_, 'bytes', {
        value : (value_ : number) : string => {
            const pretty_ = formatBytes(value_);
            return `${pretty_.value} ${tl_(pretty_.unit)}`;
        }
    });

    return tl_ as Tl;
}

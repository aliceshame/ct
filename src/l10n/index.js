"use strict";
const fs = require('fs');
const bytes_1 = require('../util/bytes');
const ru_1 = require('./ru');
const en_1 = require('./en');
const languages = { ru: ru_1.ru, en: en_1.en };
function init(language_) {
    const dictionary_ = languages[language_];
    const tl_ = (phrase_) => {
        const json_ = JSON.parse(fs.readFileSync('en.json').toString());
        if (!dictionary_[phrase_]) {
            json_[phrase_] = phrase_;
        }
        fs.writeFileSync('en.json', JSON.stringify(json_));
        return (dictionary_ && dictionary_[phrase_]) || phrase_;
    };
    Object.defineProperty(tl_, 'date', {
        value: (date_) => {
            return date_.locale(language_).format('l');
        }
    });
    Object.defineProperty(tl_, 'currency', {
        value: (value_) => {
            return `${value_} RUB`;
        }
    });
    Object.defineProperty(tl_, 'bytes', {
        value: (value_) => {
            const pretty_ = bytes_1.formatBytes(value_);
            return `${pretty_.value} ${tl_(pretty_.unit)}`;
        }
    });
    return tl_;
}
exports.init = init;
//# sourceMappingURL=index.js.map
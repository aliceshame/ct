import moment = require('moment');
import Moment = moment.Moment;
import { Capsule } from '../schemas/capsule';
import { PartAny, PartType } from '../schemas/part';
import { PartBuilder } from './part-builder';
import { init as l10n, Tl } from '../l10n';
import { detectLanguage } from '../util/detect-language';
import { Receiver, ReceiverService } from '../schemas/receiver';
import { ReceiverBuilder } from './receiver-builder';
import { FriendBuilder } from './friend-builder';

export enum SaveAction { Save, Seal }

async function readFile (file_ : File) : Promise<string> {
    return await new Promise<string>((resolve) => {
        const worker_ : Worker = new Worker('/static/reader.js');

        worker_.addEventListener('message', (event_) => {
            resolve(event_.data);
            worker_.terminate();
        });

        worker_.postMessage(file_);
    });
}

function listener (element_ : any, handler_ : any) {
    element_.addEventListener('input', handler_);
    element_.addEventListener('change', handler_);
    element_.addEventListener('keyup', handler_);
    element_.addEventListener('keydown', handler_);
    element_.addEventListener('click', handler_);
    element_.addEventListener('mousedown', handler_);
    element_.addEventListener('mouseup', handler_);
    element_.addEventListener('mousemove', handler_);
    element_.addEventListener('mouseout', handler_);
    element_.addEventListener('paste', handler_);
    element_.addEventListener('cut', handler_);
}

export class CapsuleBuilder implements Capsule {
    id : string;
    title : string;
    date : Moment;
    sealed : boolean;
    unsealed : boolean;
    created : Moment;
    _cost : number;
    owned : boolean;
    _size : number;
    sizeText : string;
    costText : string;
    stats : HTMLElement;
    owner : string            = '';
    parts : PartAny[]         = [];
    tl : Tl                   = l10n(detectLanguage());
    receivers : Receiver[]    = [];
    friends : FriendBuilder[] = [];

    get size () : number {
        return this._size;
    }

    set size (size_ : number) {
        this._size    = size_;
        this.sizeText = this.tl.bytes(size_);
        this.updateStats();
    }

    get cost () : number {
        return this._cost;
    }

    set cost (cost_ : number) {
        this._cost    = cost_;
        this.costText = this.tl.currency(cost_);
    }

    constructor (capsule_ : HTMLDivElement) {
        this.stats    = document.querySelector('.stats pre code') as HTMLElement;
        this.id       = capsule_.dataset[ 'id' ];
        this.sealed   = capsule_.dataset[ 'sealed' ] === 'true';
        this.unsealed = capsule_.dataset[ 'unsealed' ] === 'true';
        this._cost    = 50; // parseInt(capsule_.dataset[ 'cost' ]);
        this.owned    = true;
        this.date     = moment(capsule_.dataset[ 'date' ]);
        this.title    = (capsule_.querySelector('#editorForm__title') as HTMLInputElement).value;
        this.sizeText = this.tl.bytes(this._size);
        this.costText = this.tl.currency(this._cost);
        this.owner    = capsule_.dataset[ 'username' ];

        const parts_ = Array.prototype.slice.call(capsule_.querySelectorAll('.capsule-part')) as HTMLDivElement[];

        parts_.forEach((part_ : HTMLDivElement) => {
            this.parts.push(PartBuilder.fromDiv(this, part_));
        });

        this.size = parseInt(capsule_.dataset[ 'size' ]);

        const addImage_      = document.querySelector('#addImage');

        addImage_.addEventListener('click', () => {
            PartBuilder.fromZero(this);
        });

        const titleField_ : HTMLInputElement = capsule_.querySelector('#editorForm__title') as HTMLInputElement;

        const titleHandler_ = () : void => {
            this.title = titleField_.value;
            this.updateStats();
        };

        listener(titleField_, titleHandler_);

        // const updateStatsHandler_ = () : void => {
        //     this.getJson();
        // };

        // const updateStatsTop_ : HTMLButtonElement    = capsule_.querySelector('#updateStatsTop') as HTMLButtonElement;
        // const updateStatsBottom_ : HTMLButtonElement = capsule_.querySelector('#updateStatsBottom') as HTMLButtonElement;

        // if (updateStatsTop_ && updateStatsBottom_) {
        //     updateStatsTop_.addEventListener('click', updateStatsHandler_);
        //     updateStatsBottom_.addEventListener('click', updateStatsHandler_);
        // }

        const receiversDialog_ : any = document.querySelector('.receivers-dialog');

        const receiversHandler_ = () : void => {
            receiversDialog_.showModal();
        };

        const receiversTop_ : HTMLButtonElement    = capsule_.querySelector('#receiversTop') as HTMLButtonElement;
        const receiversBottom_ : HTMLButtonElement = capsule_.querySelector('#receiversBottom') as HTMLButtonElement;
        receiversTop_.addEventListener('click', receiversHandler_);
        receiversBottom_.addEventListener('click', receiversHandler_);

        const receivers_ = Array.prototype.slice.call(document.querySelectorAll('.receivers-dialog .mdl-chip')) as HTMLSpanElement[];

        receivers_.forEach((receiver_ : HTMLSpanElement) => {
            this.receivers.push(ReceiverBuilder.fromSpan(this, receiver_));
        });

        this.updateStats();

        const receiversAddEmailInput_  = document.querySelector('.receivers-dialog__email-input input') as HTMLInputElement;
        const receiversAddEmailButton_ = document.querySelector('.receivers-dialog__email-input button') as HTMLButtonElement;

        const receiversAddEmailHandler_ = () => {
            if ((this.receivers.length >= 20) || (!receiversAddEmailInput_.validity.valid) || (receiversAddEmailInput_.value === '')) {
                return;
            } else {
                ReceiverBuilder.fromZero(this, ReceiverService.Email, receiversAddEmailInput_.value);
                receiversAddEmailInput_.value = '';
                receiversAddEmailInput_.scrollIntoView();
            }
        };

        receiversAddEmailButton_.addEventListener('click', receiversAddEmailHandler_);
        receiversAddEmailInput_.addEventListener('keypress', (event_ : KeyboardEvent) => {
            if (event_.key === 'Enter') {
                receiversAddEmailHandler_();
            }
        });

        // const friends_ : HTMLDivElement[] = Array.prototype.slice.call(document.querySelectorAll('.mdl-list__item')) as HTMLDivElement[];
        //
        // this.friends = friends_.map((friend_ : HTMLDivElement) => new FriendBuilder(this, friend_));

        const saveHandler = () => {
            this.save(SaveAction.Save);
        };

        const saveTopButton_ : HTMLButtonElement    = document.querySelector('#saveTop') as HTMLButtonElement;
        const saveBottomButton_ : HTMLButtonElement = document.querySelector('#saveBottom') as HTMLButtonElement;

        saveTopButton_.addEventListener('click', saveHandler);
        saveBottomButton_.addEventListener('click', saveHandler);

        const sealHandler = () => {
            this.save(SaveAction.Seal);
        };

        const sealTopButton_ : HTMLButtonElement    = document.querySelector('#sealTop') as HTMLButtonElement;
        const sealBottomButton_ : HTMLButtonElement = document.querySelector('#sealBottom') as HTMLButtonElement;

        sealTopButton_.addEventListener('click', sealHandler);
        sealBottomButton_.addEventListener('click', sealHandler);

        const editorForm__date_year  = document.querySelector('#editorForm__date_year') as HTMLInputElement;
        const editorForm__date_month = document.querySelector('#editorForm__date_month') as HTMLInputElement;
        const editorForm__date_day   = document.querySelector('#editorForm__date_day') as HTMLInputElement;

        const zero_ = (i_ : HTMLInputElement) => {
            const a_ = i_.value;
            const b_ = parseInt(a_);
            if (b_ <= 9) return `0${b_}`;
            else return `${b_}`;
        };

        const updateDate_ = () => {
            this.date = moment(new Date(`${
                editorForm__date_year.value}-${
                zero_(editorForm__date_month)}-${
                zero_(editorForm__date_day)}`));
            this.updateStats();
        };

        listener(editorForm__date_year, updateDate_);
        listener(editorForm__date_month, updateDate_);
        listener(editorForm__date_day, updateDate_);

        const yesNoCancel_ = document.querySelector('.yes-no-cancel') as any;
        const times_ = document.querySelector('.editor-times') as HTMLDivElement;

        times_.addEventListener('click', () => {
            try {
                yesNoCancel_.showModal();
            } catch (_) {
                //
            }
        });

        const yes_ = document.querySelector('.yes') as HTMLDivElement;

        yes_.addEventListener('click', saveHandler);
    }

    toJSON () : any {
        const simplified_ : any = {};

        simplified_.title     = this.title;
        simplified_.date      = this.date.valueOf();
        simplified_.id        = this.id;
        simplified_.sealed    = this.sealed;
        simplified_.unsealed  = this.unsealed;
        simplified_.size      = this.size;
        simplified_.cost      = this.cost;
        simplified_.receivers = this.receivers.map((receiver_ : ReceiverBuilder) => receiver_.toJSON());
        simplified_.parts     = this.parts.map((part_ : PartBuilder) => part_.toJSON());

        return simplified_;
    }

    updateStats () {
        if (this.stats) {
            this.stats.innerText = JSON.stringify(this, null, 2);
        }
    }

    async getJson () : Promise<any> {
        const toJson_ : any = this.toJSON();

        toJson_.parts = await Promise.all<any>(toJson_.parts.map(async (part_ : any) : Promise<any> => {
            if (part_.file) {
                part_.file = await readFile(part_.file.file);
            }
            return part_;
        }));

        return toJson_;
    }

    async save (action_ : SaveAction) : Promise<void> {
        const json_ : any = await this.getJson();

        const saveDialog_ : any = document.querySelector('.save-dialog');
        saveDialog_.showModal();

        const progress_ : any = saveDialog_.querySelector('.mdl-progress');

        const xhr_ : XMLHttpRequest = new XMLHttpRequest();

        xhr_.open('POST', '/save', true);

        xhr_.addEventListener('progress', (event_) => {
            if (progress_.MaterialProgress) {
                progress_.MaterialProgress.setProgress(event_.loaded / event_.total);
            }
        });

        xhr_.addEventListener('load', () => {
            try {
                saveDialog_.close();
            } catch (_) {
            }

            if (action_ === SaveAction.Save) {
                location.href = '/';
            } else {
                location.href = `/pay/${this.owner}/${this.id}`;
            }
        });

        xhr_.send(JSON.stringify(json_));
    }
}

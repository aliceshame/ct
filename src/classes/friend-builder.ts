import { Friend } from '../schemas/friend';
import { ReceiverService } from '../schemas/receiver';
import { CapsuleBuilder } from './capsule-builder';
import { ReceiverBuilder } from './receiver-builder';
import { Tl } from '../l10n';

export class FriendBuilder implements Friend {
    service : ReceiverService;
    address : string;
    name : string;
    photo : string;
    added : boolean;
    div : HTMLDivElement;
    capsuleBuilder : CapsuleBuilder;
    tl : Tl;

    constructor (capsuleBuilder_ : CapsuleBuilder, div_ : HTMLDivElement) {
        this.capsuleBuilder = capsuleBuilder_;
        this.tl             = capsuleBuilder_.tl;

        this.div = div_;

        this.service = parseInt(div_.dataset[ 'service' ]) as ReceiverService;
        this.address = div_.dataset[ 'address' ];
        this.photo   = div_.dataset[ 'photo' ];
        this.name    = div_.dataset[ 'name' ];

        this.added = !!capsuleBuilder_.receivers.find((receiver_ : ReceiverBuilder) => receiver_.address === this.address && receiver_.service === this.service);

        this.registerHandlers();
    }

    registerHandlers () {
        this.div.addEventListener('click', () => {
            if (!this.added) {
                ReceiverBuilder.fromZero(this.capsuleBuilder, this.service, this.address, this.photo, this.name);
                this.hide();
            }
        });
    }

    hide () {
        this.div.classList.add('hidden');
        this.added = true;
    }

    show () {
        this.div.classList.remove('hidden');
        this.added = false;
    }
}

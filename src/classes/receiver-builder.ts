import { Receiver, ReceiverService } from '../schemas/receiver';
import { CapsuleBuilder } from './capsule-builder';
import { Tl } from '../l10n';
import { FriendBuilder } from './friend-builder';

export class ReceiverBuilder implements Receiver {
    address : string;
    service : ReceiverService;
    photo : string;
    name : string;
    span : HTMLSpanElement;
    capsuleBuilder : CapsuleBuilder;
    tl : Tl;

    exists () : boolean {
        return !!this.capsuleBuilder.receivers.find((receiverBuilder_ : ReceiverBuilder) : boolean => {
            return receiverBuilder_.service === this.service && receiverBuilder_.address === this.address;
        });
    }

    remove () {
        const capsuleBuilder_ = this.capsuleBuilder;
        capsuleBuilder_.receivers.splice(capsuleBuilder_.receivers.indexOf(this), 1);
        this.span.parentElement.removeChild(this.span);

        const friend_ : FriendBuilder = this.capsuleBuilder.friends.find((friend_ : FriendBuilder) => friend_.service === this.service && friend_.address === this.address);
        if (friend_) {
            friend_.show();
        }

        capsuleBuilder_.updateStats();
    }

    registerHandlers () {
        const rm_ : HTMLButtonElement = this.span.querySelector('.mdl-chip__action') as HTMLButtonElement;

        rm_.addEventListener('click', () => {
            this.remove();
        });
    }

    static fromSpan (capsuleBuilder_ : CapsuleBuilder, receiver_ : HTMLSpanElement) : ReceiverBuilder {
        const receiverBuilder_ = new ReceiverBuilder();

        receiverBuilder_.capsuleBuilder = capsuleBuilder_;
        receiverBuilder_.tl             = capsuleBuilder_.tl;
        receiverBuilder_.span           = receiver_;
        receiverBuilder_.service        = parseInt(receiver_.dataset[ 'service' ]) as ReceiverService;
        receiverBuilder_.address        = receiver_.dataset[ 'address' ];


        const photo_ : HTMLSpanElement = receiver_.querySelector('.mdl-chip__contact') as HTMLSpanElement;
        const text_ : HTMLSpanElement  = receiver_.querySelector('.mdl-chip__text') as HTMLSpanElement;


        if (receiverBuilder_.service !== ReceiverService.Email) {
            receiverBuilder_.photo = receiver_.dataset[ 'photo' ] || undefined;
            receiverBuilder_.name  = receiver_.dataset[ 'name' ] || undefined;

            photo_.style.backgroundImage = `url(${receiverBuilder_.photo})`;
            text_.innerText              = receiverBuilder_.name;
        }

        receiverBuilder_.registerHandlers();

        receiverBuilder_.updateInfo();

        return receiverBuilder_;
    }

    updateInfo () {
        //
    }

    static fromZero (capsuleBuilder_ : CapsuleBuilder, receiverService_ : ReceiverService, address_ : string, photo_? : string, name_? : string) : ReceiverBuilder {
        const receiverBuilder_ = new ReceiverBuilder();

        receiverBuilder_.capsuleBuilder = capsuleBuilder_;
        receiverBuilder_.tl             = capsuleBuilder_.tl;
        receiverBuilder_.service        = receiverService_;
        receiverBuilder_.address        = address_;

        if (receiverBuilder_.exists()) {
            return null;
        }

        if (receiverBuilder_.service !== ReceiverService.Email) {
            receiverBuilder_.photo = photo_;
            receiverBuilder_.name  = name_;
        }

        const span_ = document.querySelector('.part-templates .mdl-chip')
                              .cloneNode(true) as HTMLSpanElement;

        receiverBuilder_.span = span_;

        let container_ : HTMLDivElement;

        if (receiverService_ === ReceiverService.Email) {
            (span_.querySelector('.mdl-chip__text') as HTMLSpanElement).innerText    = address_;
            (span_.querySelector('.mdl-chip__contact') as HTMLSpanElement).innerText = address_[ 0 ];
        } else {
            (span_.querySelector('.mdl-chip__text') as HTMLSpanElement).innerText                = name_;
            (span_.querySelector('.mdl-chip__contact') as HTMLSpanElement).style.backgroundImage = `url(${photo_})`;
        }

        switch (receiverService_) {
            case ReceiverService.Email:
                container_ = document.querySelector('#email-panel .receivers-dialog__chips') as HTMLDivElement;
                container_.appendChild(span_);
                break;
            case ReceiverService.Vk:
                container_ = document.querySelector('#vk-panel .receivers-dialog__chips') as HTMLDivElement;
                container_.appendChild(span_);
                break;
            case ReceiverService.Telegram:
                container_ = document.querySelector('#telegram-panel .receivers-dialog__chips') as HTMLDivElement;
                container_.appendChild(span_);
                break;
            case ReceiverService.Facebook:
                container_ = document.querySelector('#facebook-panel .receivers-dialog__chips') as HTMLDivElement;
                container_.appendChild(span_);
                break;
            case ReceiverService.Twitter:
                container_ = document.querySelector('#twitter-panel .receivers-dialog__chips') as HTMLDivElement;
                container_.appendChild(span_);
                break;
            case ReceiverService.Ok:
                container_ = document.querySelector('#ok-panel .receivers-dialog__chips') as HTMLDivElement;
                container_.appendChild(span_);
                break;
        }

        capsuleBuilder_.receivers.push(receiverBuilder_);
        capsuleBuilder_.updateStats();

        receiverBuilder_.registerHandlers();
        receiverBuilder_.updateInfo();

        return receiverBuilder_;
    }

    toJSON () : any {
        const simplified_ : any = {};

        simplified_.service = this.service;
        simplified_.address = this.address;

        if (this.photo) {
            simplified_.photo = this.photo;
        }

        if (this.name) {
            simplified_.name = this.name;
        }

        return simplified_;
    }
}

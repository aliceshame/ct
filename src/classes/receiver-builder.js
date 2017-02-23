"use strict";
const receiver_1 = require('../schemas/receiver');
class ReceiverBuilder {
    exists() {
        return !!this.capsuleBuilder.receivers.find((receiverBuilder_) => {
            return receiverBuilder_.service === this.service && receiverBuilder_.address === this.address;
        });
    }
    remove() {
        const capsuleBuilder_ = this.capsuleBuilder;
        capsuleBuilder_.receivers.splice(capsuleBuilder_.receivers.indexOf(this), 1);
        this.span.parentElement.removeChild(this.span);
        const friend_ = this.capsuleBuilder.friends.find((friend_) => friend_.service === this.service && friend_.address === this.address);
        if (friend_) {
            friend_.show();
        }
        capsuleBuilder_.updateStats();
    }
    registerHandlers() {
        const rm_ = this.span.querySelector('.mdl-chip__action');
        rm_.addEventListener('click', () => {
            this.remove();
        });
    }
    static fromSpan(capsuleBuilder_, receiver_) {
        const receiverBuilder_ = new ReceiverBuilder();
        receiverBuilder_.capsuleBuilder = capsuleBuilder_;
        receiverBuilder_.tl = capsuleBuilder_.tl;
        receiverBuilder_.span = receiver_;
        receiverBuilder_.service = parseInt(receiver_.dataset['service']);
        receiverBuilder_.address = receiver_.dataset['address'];
        const photo_ = receiver_.querySelector('.mdl-chip__contact');
        const text_ = receiver_.querySelector('.mdl-chip__text');
        if (receiverBuilder_.service !== receiver_1.ReceiverService.Email) {
            receiverBuilder_.photo = receiver_.dataset['photo'] || undefined;
            receiverBuilder_.name = receiver_.dataset['name'] || undefined;
            photo_.style.backgroundImage = `url(${receiverBuilder_.photo})`;
            text_.innerText = receiverBuilder_.name;
        }
        receiverBuilder_.registerHandlers();
        receiverBuilder_.updateInfo();
        return receiverBuilder_;
    }
    updateInfo() {
    }
    static fromZero(capsuleBuilder_, receiverService_, address_, photo_, name_) {
        const receiverBuilder_ = new ReceiverBuilder();
        receiverBuilder_.capsuleBuilder = capsuleBuilder_;
        receiverBuilder_.tl = capsuleBuilder_.tl;
        receiverBuilder_.service = receiverService_;
        receiverBuilder_.address = address_;
        if (receiverBuilder_.exists()) {
            return null;
        }
        if (receiverBuilder_.service !== receiver_1.ReceiverService.Email) {
            receiverBuilder_.photo = photo_;
            receiverBuilder_.name = name_;
        }
        const span_ = document.querySelector('.part-templates .mdl-chip')
            .cloneNode(true);
        receiverBuilder_.span = span_;
        let container_;
        if (receiverService_ === receiver_1.ReceiverService.Email) {
            span_.querySelector('.mdl-chip__text').innerText = address_;
            span_.querySelector('.mdl-chip__contact').innerText = address_[0];
        }
        else {
            span_.querySelector('.mdl-chip__text').innerText = name_;
            span_.querySelector('.mdl-chip__contact').style.backgroundImage = `url(${photo_})`;
        }
        switch (receiverService_) {
            case receiver_1.ReceiverService.Email:
                container_ = document.querySelector('#email-panel .receivers-dialog__chips');
                container_.appendChild(span_);
                break;
            case receiver_1.ReceiverService.Vk:
                container_ = document.querySelector('#vk-panel .receivers-dialog__chips');
                container_.appendChild(span_);
                break;
            case receiver_1.ReceiverService.Telegram:
                container_ = document.querySelector('#telegram-panel .receivers-dialog__chips');
                container_.appendChild(span_);
                break;
            case receiver_1.ReceiverService.Facebook:
                container_ = document.querySelector('#facebook-panel .receivers-dialog__chips');
                container_.appendChild(span_);
                break;
            case receiver_1.ReceiverService.Twitter:
                container_ = document.querySelector('#twitter-panel .receivers-dialog__chips');
                container_.appendChild(span_);
                break;
            case receiver_1.ReceiverService.Ok:
                container_ = document.querySelector('#ok-panel .receivers-dialog__chips');
                container_.appendChild(span_);
                break;
        }
        capsuleBuilder_.receivers.push(receiverBuilder_);
        capsuleBuilder_.updateStats();
        receiverBuilder_.registerHandlers();
        receiverBuilder_.updateInfo();
        return receiverBuilder_;
    }
    toJSON() {
        const simplified_ = {};
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
exports.ReceiverBuilder = ReceiverBuilder;
//# sourceMappingURL=receiver-builder.js.map
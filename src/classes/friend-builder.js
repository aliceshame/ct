"use strict";
const receiver_builder_1 = require('./receiver-builder');
class FriendBuilder {
    constructor(capsuleBuilder_, div_) {
        this.capsuleBuilder = capsuleBuilder_;
        this.tl = capsuleBuilder_.tl;
        this.div = div_;
        this.service = parseInt(div_.dataset['service']);
        this.address = div_.dataset['address'];
        this.photo = div_.dataset['photo'];
        this.name = div_.dataset['name'];
        this.added = !!capsuleBuilder_.receivers.find((receiver_) => receiver_.address === this.address && receiver_.service === this.service);
        this.registerHandlers();
    }
    registerHandlers() {
        this.div.addEventListener('click', () => {
            if (!this.added) {
                receiver_builder_1.ReceiverBuilder.fromZero(this.capsuleBuilder, this.service, this.address, this.photo, this.name);
                this.hide();
            }
        });
    }
    hide() {
        this.div.classList.add('hidden');
        this.added = true;
    }
    show() {
        this.div.classList.remove('hidden');
        this.added = false;
    }
}
exports.FriendBuilder = FriendBuilder;
//# sourceMappingURL=friend-builder.js.map
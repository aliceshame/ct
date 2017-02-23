"use strict";
(function (ReceiverService) {
    ReceiverService[ReceiverService["Email"] = 0] = "Email";
    ReceiverService[ReceiverService["Telegram"] = 1] = "Telegram";
    ReceiverService[ReceiverService["Twitter"] = 2] = "Twitter";
    ReceiverService[ReceiverService["Vk"] = 3] = "Vk";
    ReceiverService[ReceiverService["Facebook"] = 4] = "Facebook";
    ReceiverService[ReceiverService["Ok"] = 5] = "Ok";
})(exports.ReceiverService || (exports.ReceiverService = {}));
var ReceiverService = exports.ReceiverService;
//# sourceMappingURL=receiver.js.map
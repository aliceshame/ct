export enum ReceiverService { Email, Telegram, Twitter, Vk, Facebook, Ok }

export interface Receiver {
    service : ReceiverService;
    address : string;
    photo? : string;
    name?  : string;
    sent? : boolean;
}

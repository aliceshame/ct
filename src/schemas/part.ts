export enum PartType { Text, Image, Attachment }

export enum PartIcon { Pdf, Archive, Text, Word, Excel, Powerpoint, Audio, Video, Other }

export interface Part {
    id   : string | any;
    type : PartType
    size : number;
}

export interface PartText extends Part {
    content : string;
}

export interface PartImage extends Part {
    hash : string;
}

export interface PartAttachment extends PartImage {
    name : string;
    icon : PartIcon;
}

export type PartAny = PartText | PartImage | PartAttachment;

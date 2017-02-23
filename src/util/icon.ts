import { PartIcon } from '../schemas/part';

export function icon (icon_ : PartIcon) : string {
    switch (icon_) {
        case PartIcon.Text:
            return 'file-text-o';
        case PartIcon.Pdf:
            return 'file-pdf-o';
        case PartIcon.Archive:
            return 'file-archive-o';
        case PartIcon.Word:
            return 'file-word-o';
        case PartIcon.Excel:
            return 'file-excel-o';
        case PartIcon.Powerpoint:
            return 'file-powerpoint-o';
        case PartIcon.Audio:
            return 'file-audio-o';
        case PartIcon.Video:
            return 'file-video-o';
        default:
            return 'file-o';
    }
}

"use strict";
const part_1 = require('../schemas/part');
function icon(icon_) {
    switch (icon_) {
        case part_1.PartIcon.Text:
            return 'file-text-o';
        case part_1.PartIcon.Pdf:
            return 'file-pdf-o';
        case part_1.PartIcon.Archive:
            return 'file-archive-o';
        case part_1.PartIcon.Word:
            return 'file-word-o';
        case part_1.PartIcon.Excel:
            return 'file-excel-o';
        case part_1.PartIcon.Powerpoint:
            return 'file-powerpoint-o';
        default:
            return 'file-o';
    }
}
exports.icon = icon;
//# sourceMappingURL=icon.js.map